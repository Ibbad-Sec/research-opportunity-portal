"""
SQLAlchemy model for the opportunities table.
"""
from sqlalchemy import Column, Integer, String, Text, Date, Enum, TIMESTAMP
from sqlalchemy.sql import func

from app.core.database import Base


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    research_area = Column(String(150), nullable=False)
    faculty_name = Column(String(150), nullable=False)
    department = Column(String(150), nullable=False)
    required_skills = Column(Text, nullable=False)
    available_positions = Column(Integer, nullable=False, default=1)
    application_deadline = Column(Date, nullable=False)
    status = Column(Enum("Open", "Closed", name="status_enum"), nullable=False, default="Open")
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
