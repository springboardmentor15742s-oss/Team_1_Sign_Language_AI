from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.course import Course

from app.schemas.course_schema import *

from app.utils.auth import get_current_user

from fastapi_cache.decorator import cache

from app.utils.roles import check_role




router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)



@router.get("/")
@cache(expire=300)
def get_courses():

    return courses

# Create Course
# Only Instructor and Admin can create courses

@router.post("/")
def create_course(

    course: CourseCreate,

    current_user=Depends(get_current_user),

    db: Session = Depends(get_db)

):

    check_role(

        current_user,

        [
            "instructor",
            "admin"
        ]

    )


    obj = Course(

        **course.dict()

    )


    db.add(obj)

    db.commit()

    db.refresh(obj)


    return obj



# Get All Courses
# Accessible for logged-in users

from sqlalchemy import desc



@router.get("/")
def get_courses(

    skip:int=0,

    limit:int=20,

    db:Session=Depends(get_db)

):


    courses = db.query(

        Course

    ).offset(

        skip

    ).limit(

        limit

    ).all()


    return courses