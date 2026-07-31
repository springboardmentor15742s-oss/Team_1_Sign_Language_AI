from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.practice import PracticeHistory


router=APIRouter(
    prefix="/practice",
    tags=["Practice History"]
)



@router.post("/")
def save_practice(
    user_id:int,
    gesture:str,
    accuracy:float,
    duration:float,
    db:Session=Depends(get_db)
):


    record=PracticeHistory(

        user_id=user_id,

        gesture_name=gesture,

        accuracy=accuracy,

        duration=duration
    )


    db.add(record)

    db.commit()


    return record



@router.get("/{user_id}")
def history(
    user_id:int,
    db:Session=Depends(get_db)
):

    return db.query(
        PracticeHistory
    ).filter(
        PracticeHistory.user_id==user_id
    ).all()