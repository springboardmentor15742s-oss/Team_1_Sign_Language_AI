from fastapi import APIRouter

from app.services.analytics_service import analyze_progress



router=APIRouter(

prefix="/analytics",

tags=["Learning Intelligence"]

)



@router.post("/progress")
def learning_progress(

    accuracy:float,

    practice_count:int

):


    result=analyze_progress(

        accuracy,

        practice_count

    )


    return result