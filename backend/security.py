import os
import secrets
from datetime import datetime, timedelta, timezone
from cryptography.fernet import Fernet
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'replace-me-jwt-secret')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
DEFAULT_FERNET_KEY = 'QFXfpp8fKJ9ww2PdKWVjYoxFq8NAtnN8fD1C1BMrB-c='


def _fernet():
  key = os.getenv('PII_ENCRYPTION_KEY', DEFAULT_FERNET_KEY)
  return Fernet(key.encode())


def hash_password(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, jwt_id: str) -> str:
  expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  payload = {'sub': subject, 'jti': jwt_id, 'exp': expire}
  return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_csrf_token() -> str:
  return secrets.token_urlsafe(32)


def encrypt_pii(value: str) -> str:
  return _fernet().encrypt(value.encode()).decode()


def decrypt_pii(value: str) -> str:
  return _fernet().decrypt(value.encode()).decode()
