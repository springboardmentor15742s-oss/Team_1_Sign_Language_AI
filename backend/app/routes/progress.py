from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.progress import Progress



router=APIRouter(
    prefix="/progress",
    tags=["Progress Tracking"]
)



@router.post("/")
def update_progress(
    user_id:int,
    lessons:int,
    accuracy:float,
    level:str,
    db:Session=Depends(get_db)
):


    data=Progress(

        user_id=user_id,

        completed_lessons=lessons,

        accuracy_score=accuracy,

        skill_level=level

    )


    db.add(data)

    db.commit()

    return data



@router.get("/{user_id}")
def get_progress(
    user_id:int,
    db:Session=Depends(get_db)
):

    return db.query(
        Progress
    ).filter(
        Progress.user_id==user_id
    ).all()