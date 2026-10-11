"""
Research Opportunity Portal - FastAPI Application
Entry point for the backend API.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import settings
from app.core.database import engine
from app.routes import opportunity_router 


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup / shutdown lifecycle.
    Tests the DB connection when the server starts.
    """
    print("🚀 Starting Research Opportunity Portal API...")
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT DATABASE();"))
            db_name = result.scalar()
        print(f"✅ Connected to MySQL database: {db_name}")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
    yield
    print("🛑 Shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    description="REST API for managing university research opportunities",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

# CORS — allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(opportunity_router)

@app.get("/")
def root():
    """Health check endpoint."""
    return {
        "message": "Research Opportunity Portal API is running",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }


@app.get("/api/health")
def health():
    """Health check that also tests the database connection."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}
