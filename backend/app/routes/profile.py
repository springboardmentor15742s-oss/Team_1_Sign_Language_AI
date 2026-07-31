from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.profile import LearnerProfile
from app.schemas.profile_schema import *


router=APIRouter(
    prefix="/profiles",
    tags=["Learner Profile"]
)



@router.post("/")
def create_profile(
    data:ProfileCreate,
    db:Session=Depends(get_db)
):

    profile=LearnerProfile(
        **data.dict()
    )


    db.add(profile)
    db.commit()
    db.refresh(profile)


    return profile




@router.get("/{user_id}")
def get_profile(
    user_id:int,
    db:Session=Depends(get_db)
):

    return db.query(
        LearnerProfile
    ).filter(
        LearnerProfile.user_id==user_id
    ).first()