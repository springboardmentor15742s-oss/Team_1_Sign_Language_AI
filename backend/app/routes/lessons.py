from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.lesson import Lesson
from app.schemas.lesson_schema import LessonCreate


router=APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)



@router.post("/")
def add_lesson(
    lesson:LessonCreate,
    db:Session=Depends(get_db)
):

    obj=Lesson(
        **lesson.dict()
    )


    db.add(obj)

    db.commit()

    db.refresh(obj)

    return obj




@router.get("/{course_id}")
def course_lessons(
    course_id:int,
    db:Session=Depends(get_db)
):

    return db.query(
        Lesson
    ).filter(
        Lesson.course_id==course_id
    ).all()