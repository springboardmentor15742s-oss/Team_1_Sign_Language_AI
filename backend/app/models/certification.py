from sqlalchemy import Column,Integer,String

from app.database import Base



class Certification(Base):

    __tablename__="certifications"



    id=Column(
        Integer,
        primary_key=True
    )


    user_id=Column(
        Integer
    )


    level=Column(
        String
    )


    score=Column(
        Integer
    )


    status=Column(
        String
    )