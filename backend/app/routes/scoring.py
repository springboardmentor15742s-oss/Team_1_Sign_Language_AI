from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session


from app.database import get_db

from app.models.score import PerformanceScore

from app.services.scoring_service import (
    calculate_learning_score,
    calculate_mastery
)



router=APIRouter(

prefix="/scoring",

tags=["Performance Scoring"]

)



@router.post("/calculate")
def calculate_score(

    user_id:int,

    gesture_accuracy:float,

    assessment_score:float,

    lesson_completion:float,

    practice_consistency:float,

    improvement_rate:float,

    db:Session=Depends(get_db)

):


    overall=calculate_learning_score(

        gesture_accuracy,

        assessment_score,

        lesson_completion,

        practice_consistency,

        improvement_rate

    )


    mastery=calculate_mastery(
        overall
    )



    result=PerformanceScore(

        user_id=user_id,

        gesture_accuracy=gesture_accuracy,

        assessment_score=assessment_score,

        lesson_completion=lesson_completion,

        practice_consistency=practice_consistency,

        improvement_rate=improvement_rate,

        overall_score=overall,

        mastery_level=mastery

    )


    db.add(result)

    db.commit()

    db.refresh(result)



    return {


        "overall_score":overall,

        "mastery_level":mastery

    }