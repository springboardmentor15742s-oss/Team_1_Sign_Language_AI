from sqlalchemy import Column,Integer,String
from app.database import Base


class Course(Base):

    __tablename__="courses"


    id=Column(
        Integer,
        primary_key=True
    )


    title=Column(
        String,
        index=True
    )


    category=Column(
        String
    )


    description=Column(
        String
    )


    level=Column(
        String
    )