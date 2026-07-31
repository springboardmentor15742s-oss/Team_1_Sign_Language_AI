from sqlalchemy import Column,Integer,Float,String

from app.database import Base



class Progress(Base):

    __tablename__="progress"



    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer
    )


    completed_lessons=Column(
        Integer,
        default=0
    )


    accuracy_score=Column(
        Float,
        default=0
    )


    skill_level=Column(
        String,
        default="Beginner"
    )