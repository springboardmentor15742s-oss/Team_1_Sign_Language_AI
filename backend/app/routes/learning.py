from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.learning_path import LearningPath


router=APIRouter(
    prefix="/learning-path",
    tags=["Learning Path"]
)



@router.post("/")
def create_path(
    user_id:int,
    course:str,
    db:Session=Depends(get_db)
):

    path=LearningPath(

        user_id=user_id,

        recommended_course=course
    )


    db.add(path)

    db.commit()

    return path




@router.get("/{user_id}")
def get_path(
    user_id:int,
    db:Session=Depends(get_db)
):

    return db.query(
        LearningPath
    ).filter(
        LearningPath.user_id==user_id
    ).all()