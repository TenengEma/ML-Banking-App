# ML Banking App

Full-stack scaffold for a Digital Banking platform:
- Frontend: React (Vite), Tailwind CSS, Framer Motion, Lucide, React Router (18 pages)
- Backend: FastAPI + SQLAlchemy + PostgreSQL models + websocket/webhook endpoints
- Security/Fraud: JWT, CSRF guard, encrypted National ID storage, risk scoring engine

## Frontend
```bash
npm install
npm run dev
npm run build
```

## Backend
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload
```
