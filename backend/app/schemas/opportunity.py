"""
Pydantic schemas for Research Opportunity API.
These define the shape of data going in and out of the API.
"""
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class OpportunityBase(BaseModel):
    """Shared fields between create and response."""
    title: str = Field(..., min_length=1, max_length=255, description="Research title")
    description: str = Field(..., min_length=1, description="Full description")
    research_area: str = Field(..., min_length=1, max_length=150)
    faculty_name: str = Field(..., min_length=1, max_length=150)
    department: str = Field(..., min_length=1, max_length=150)
    required_skills: str = Field(..., min_length=1, description="Comma-separated skills")
    available_positions: int = Field(..., ge=1, description="Must be at least 1")
    application_deadline: date = Field(..., description="Deadline (YYYY-MM-DD)")


class OpportunityCreate(OpportunityBase):
    """Schema for creating a new opportunity (POST body)."""
    status: Optional[str] = Field("Open", pattern="^(Open|Closed)$")


class OpportunityUpdate(BaseModel):
    """Schema for updating (PUT). All fields optional for partial updates."""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, min_length=1)
    research_area: Optional[str] = Field(None, min_length=1, max_length=150)
    faculty_name: Optional[str] = Field(None, min_length=1, max_length=150)
    department: Optional[str] = Field(None, min_length=1, max_length=150)
    required_skills: Optional[str] = Field(None, min_length=1)
    available_positions: Optional[int] = Field(None, ge=1)
    application_deadline: Optional[date] = None
    status: Optional[str] = Field(None, pattern="^(Open|Closed)$")


class OpportunityResponse(OpportunityBase):
    """Schema for returning an opportunity (response body)."""
    id: int
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    # Allow ORM mode — read from SQLAlchemy objects, not just dicts
    model_config = ConfigDict(from_attributes=True)
    