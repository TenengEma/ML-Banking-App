from datetime import datetime
from sqlalchemy import JSON, Boolean, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pgvector.sqlalchemy import Vector
from .database import Base


class User(Base):
  __tablename__ = 'users'

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  first_name: Mapped[str] = mapped_column(String(80), nullable=False)
  last_name: Mapped[str] = mapped_column(String(80), nullable=False)
  email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
  date_of_birth: Mapped[datetime] = mapped_column(Date, nullable=False)
  national_id_encrypted: Mapped[str] = mapped_column(Text, nullable=False)
  password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
  accounts: Mapped[list['Account']] = relationship(back_populates='user')


class Account(Base):
  __tablename__ = 'accounts'

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
  account_number: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
  account_type: Mapped[str] = mapped_column(String(40), default='wallet')
  balance: Mapped[float] = mapped_column(Numeric(14, 2), default=0)
  user: Mapped['User'] = relationship(back_populates='accounts')


class Transaction(Base):
  __tablename__ = 'transactions'

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  sender_account_id: Mapped[int] = mapped_column(ForeignKey('accounts.id'), nullable=False)
  receiver_account_id: Mapped[int] = mapped_column(ForeignKey('accounts.id'), nullable=False)
  amount: Mapped[float] = mapped_column(Numeric(14, 2), nullable=False)
  merchant_name: Mapped[str] = mapped_column(String(120), default='')
  status: Mapped[str] = mapped_column(String(30), default='pending')
  transactional_risk: Mapped[float] = mapped_column(Numeric(5, 2), default=0)
  context_payload: Mapped[dict] = mapped_column(JSON, default=dict)
  behavior_embedding: Mapped[list[float]] = mapped_column(Vector(8), nullable=True)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Session(Base):
  __tablename__ = 'sessions'

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
  device_id: Mapped[str] = mapped_column(String(120), nullable=False)
  jwt_id: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
  csrf_token: Mapped[str] = mapped_column(String(120), nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class AuditLog(Base):
  __tablename__ = 'audit_logs'

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  actor_user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
  action: Mapped[str] = mapped_column(String(120), nullable=False)
  payload: Mapped[dict] = mapped_column(JSON, default=dict)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Device(Base):
  __tablename__ = 'devices'

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
  device_id: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
  trusted: Mapped[bool] = mapped_column(Boolean, default=False)
  typing_signature: Mapped[dict] = mapped_column(JSON, default=dict)
  mouse_signature: Mapped[dict] = mapped_column(JSON, default=dict)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
