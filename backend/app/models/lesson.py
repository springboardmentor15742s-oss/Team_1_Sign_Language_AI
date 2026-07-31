from sqlalchemy import Column,Integer,String,ForeignKey

from app.database import Base


class Lesson(Base):

    __tablename__="lessons"


    id=Column(
        Integer,
        primary_key=True
    )


    course_id=Column(
        Integer,
        ForeignKey("courses.id")
    )


    title=Column(
        String
    )


    content=Column(
        String
    )


    video_url=Column(
        String
    )