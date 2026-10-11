"""
API routes for research opportunities.
"""
from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityUpdate,
    OpportunityResponse,
)
from app.controllers import opportunity_controller as controller


router = APIRouter(
    prefix="/api/opportunities",
    tags=["Opportunities"],
)


@router.post(
    "",
    response_model=OpportunityResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new research opportunity",
)
def create_opportunity(
    payload: OpportunityCreate,
    db: Session = Depends(get_db),
):
    return controller.create_opportunity(db, payload)


@router.get(
    "",
    response_model=List[OpportunityResponse],
    summary="Get all research opportunities",
)
def get_all_opportunities(db: Session = Depends(get_db)):
    return controller.get_all_opportunities(db)


@router.get(
    "/{opp_id}",
    response_model=OpportunityResponse,
    summary="Get a single research opportunity by ID",
)
def get_opportunity(opp_id: int, db: Session = Depends(get_db)):
    return controller.get_opportunity_by_id(db, opp_id)


@router.put(
    "/{opp_id}",
    response_model=OpportunityResponse,
    summary="Update a research opportunity",
)
def update_opportunity(
    opp_id: int,
    payload: OpportunityUpdate,
    db: Session = Depends(get_db),
):
    return controller.update_opportunity(db, opp_id, payload)


@router.delete(
    "/{opp_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a research opportunity",
)
def delete_opportunity(opp_id: int, db: Session = Depends(get_db)):
    controller.delete_opportunity(db, opp_id)
    return {"success": True, "message": f"Opportunity {opp_id} deleted"}
