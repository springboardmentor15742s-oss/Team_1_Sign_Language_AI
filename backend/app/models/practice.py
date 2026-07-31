from sqlalchemy import Column,Integer,String,Float

from app.database import Base



class PracticeHistory(Base):

    __tablename__="practice_history"


    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer
    )


    gesture_name=Column(
        String
    )


    accuracy=Column(
        Float
    )


    duration=Column(
        Float
    )