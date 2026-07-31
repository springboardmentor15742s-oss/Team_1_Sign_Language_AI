from sqlalchemy import Column,Integer,String,Float

from app.database import Base



class LearningAnalytics(Base):

    __tablename__="learning_analytics"


    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer
    )


    total_practice=Column(
        Integer,
        default=0
    )


    average_accuracy=Column(
        Float,
        default=0
    )


    weak_area=Column(
        String
    )


    skill_level=Column(
        String
    )