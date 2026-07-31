from sqlalchemy import Column,Integer,String

from app.database import Base



class Quiz(Base):

    __tablename__="quizzes"


    id=Column(
        Integer,
        primary_key=True
    )


    question=Column(
        String
    )


    answer=Column(
        String
    )


    level=Column(
        String
    )