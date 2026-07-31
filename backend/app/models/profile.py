from sqlalchemy import Column,Integer,String,ForeignKey
from app.database import Base


class LearnerProfile(Base):

    __tablename__="learner_profiles"


    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )


    learning_level=Column(
        String,
        default="Beginner"
    )


    preferred_language=Column(
        String
    )


    learning_goal=Column(
        String
    )


    skill_level=Column(
        String,
        default="Beginner"
    )