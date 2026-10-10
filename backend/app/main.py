"""
Research Opportunity Portal - FastAPI Application
Entry point for the backend API.
"""
from fastapi import FastAPI

app = FastAPI(
    title="Research Opportunity Portal API",
    description="REST API for managing university research opportunities",
    version="1.0.0",
)


@app.get("/")
def root():
    """Health check endpoint."""
    return {
        "message": "Research Opportunity Portal API is running",
        "version": "1.0.0",
        "docs": "/docs",
    }
