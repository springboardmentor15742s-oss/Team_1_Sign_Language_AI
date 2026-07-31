from sqlalchemy import Column,Integer,Float,String,DateTime
from datetime import datetime

from app.database import Base


class Assessment(Base):

    __tablename__="assessments"


    id = Column(
        Integer,
        primary_key=True
    )


    user_id = Column(
        Integer
    )


    gesture_name = Column(
        String
    )


    hand_shape_accuracy = Column(
        Float
    )


    motion_accuracy = Column(
        Float
    )


    timing_accuracy = Column(
        Float
    )


    position_accuracy = Column(
        Float
    )


    overall_accuracy = Column(
        Float
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )