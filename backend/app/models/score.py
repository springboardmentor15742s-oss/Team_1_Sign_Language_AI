from sqlalchemy import Column,Integer,Float,String

from app.database import Base



class PerformanceScore(Base):

    __tablename__="performance_scores"


    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer
    )


    gesture_accuracy=Column(
        Float
    )


    assessment_score=Column(
        Float
    )


    lesson_completion=Column(
        Float
    )


    practice_consistency=Column(
        Float
    )


    improvement_rate=Column(
        Float
    )


    overall_score=Column(
        Float
    )


    mastery_level=Column(
        String
    )