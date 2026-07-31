from sqlalchemy import Column,Integer,String

from app.database import Base



class Feedback(Base):

    __tablename__="feedback"



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


    error_type=Column(
        String
    )


    suggestion=Column(
        String
    )