from sqlalchemy import Column,Integer,String,ForeignKey

from app.database import Base


class LearningPath(Base):

    __tablename__="learning_paths"


    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )


    recommended_course=Column(
        String
    )


    status=Column(
        String,
        default="started"
    )