"""
Business logic for Research Opportunity CRUD operations.
"""
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityUpdate,
)


def create_opportunity(db: Session, data: OpportunityCreate) -> Opportunity:
    """Create a new research opportunity."""
    new_opp = Opportunity(
        title=data.title,
        description=data.description,
        research_area=data.research_area,
        faculty_name=data.faculty_name,
        department=data.department,
        required_skills=data.required_skills,
        available_positions=data.available_positions,
        application_deadline=data.application_deadline,
        status=data.status or "Open",
    )
    db.add(new_opp)
    db.commit()
    db.refresh(new_opp)
    return new_opp


def get_all_opportunities(db: Session) -> List[Opportunity]:
    """Return all opportunities, newest first."""
    return (
        db.query(Opportunity)
        .order_by(Opportunity.created_at.desc())
        .all()
    )


def get_opportunity_by_id(db: Session, opp_id: int) -> Opportunity:
    """Return one opportunity or raise 404."""
    opp = db.query(Opportunity).filter(Opportunity.id == opp_id).first()
    if not opp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Opportunity with id {opp_id} not found",
        )
    return opp


def update_opportunity(
    db: Session, opp_id: int, data: OpportunityUpdate
) -> Opportunity:
    """Update fields provided; ignore None values (partial update)."""
    opp = get_opportunity_by_id(db, opp_id)

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(opp, field, value)

    db.commit()
    db.refresh(opp)
    return opp


def delete_opportunity(db: Session, opp_id: int) -> None:
    """Delete an opportunity or raise 404."""
    opp = get_opportunity_by_id(db, opp_id)
    db.delete(opp)
    db.commit()
    