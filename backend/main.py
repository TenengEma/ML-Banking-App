import uuid
from datetime import date
from fastapi import Depends, FastAPI, Header, HTTPException, WebSocket
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .fraud import aggregate_risk
from .models import AuditLog, Session as SessionModel, User
from .security import create_access_token, create_csrf_token, encrypt_pii, hash_password, verify_password

Base.metadata.create_all(bind=engine)

app = FastAPI(title='ML Banking API', version='0.1.0')


class RegisterIn(BaseModel):
  first_name: str
  last_name: str
  email: str
  date_of_birth: date
  national_id: str
  password: str


class LoginIn(BaseModel):
  identifier: str
  password: str
  device_id: str


@app.get('/health')
def health():
  return {'status': 'ok'}


@app.post('/auth/register')
def register(payload: RegisterIn, db: Session = Depends(get_db)):
  existing = db.query(User).filter(User.email == payload.email).first()
  if existing:
    raise HTTPException(status_code=409, detail='Email already registered')
  user = User(
    first_name=payload.first_name,
    last_name=payload.last_name,
    email=payload.email,
    date_of_birth=payload.date_of_birth,
    national_id_encrypted=encrypt_pii(payload.national_id),
    password_hash=hash_password(payload.password),
  )
  db.add(user)
  db.commit()
  return {'message': 'registered'}


@app.post('/auth/login')
def login(payload: LoginIn, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.email == payload.identifier).first()
  if not user or not verify_password(payload.password, user.password_hash):
    raise HTTPException(status_code=401, detail='Invalid credentials')

  jwt_id = str(uuid.uuid4())
  csrf = create_csrf_token()
  token = create_access_token(subject=payload.identifier, jwt_id=jwt_id)
  db.add(SessionModel(user_id=user.id, device_id=payload.device_id, jwt_id=jwt_id, csrf_token=csrf))
  db.add(AuditLog(actor_user_id=user.id, action='login', payload={'identifier': payload.identifier}))
  db.commit()
  return {'access_token': token, 'token_type': 'bearer', 'csrf_token': csrf}


def csrf_guard(
  db: Session = Depends(get_db),
  csrf_token: str = Header(..., alias='X-CSRF-Token'),
):
  session = db.query(SessionModel).filter(SessionModel.csrf_token == csrf_token).first()
  if not session:
    raise HTTPException(status_code=403, detail='CSRF validation failed')
  return session


@app.post('/fraud/risk-score')
def fraud_risk(context: dict, behavior: dict, transaction: dict):
  return aggregate_risk(context, behavior, transaction)


@app.post('/webhooks/transaction-event')
def transaction_webhook(event: dict, db: Session = Depends(get_db)):
  db.add(AuditLog(actor_user_id=None, action='webhook.transaction_event', payload=event))
  db.commit()
  return {'received': True}


@app.post('/transactions/submit')
def submit_transaction(transaction: dict, _: SessionModel = Depends(csrf_guard)):
  return {'accepted': True, 'transaction': transaction}


@app.websocket('/ws/admin/global-overview')
async def admin_feed(socket: WebSocket):
  await socket.accept()
  sample_event = {'type': 'transaction', 'severity': 'medium', 'message': 'Unusual transfer flagged for review'}
  await socket.send_json(sample_event)
  await socket.close()
