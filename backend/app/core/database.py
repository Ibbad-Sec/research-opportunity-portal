"""
SQLAlchemy database setup — engine, session, and base model.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings

# Create the SQLAlchemy engine
engine = create_engine(
    settings.database_url,
    echo=settings.DEBUG,        # Log SQL queries when DEBUG=True
    pool_pre_ping=True,          # Verify connections before using them
    pool_recycle=3600,           # Recycle connections every hour
)

# Session factory — creates a new session per request
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models
Base = declarative_base()


def get_db():
    """
    Dependency for FastAPI routes: yields a DB session, then closes it.
    Usage in routes: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
