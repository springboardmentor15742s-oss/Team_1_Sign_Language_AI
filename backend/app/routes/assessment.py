from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session


from app.database import get_db

from app.models.assessment import Assessment

from app.schemas.assessment_schema import AssessmentRequest

from app.services.assessment_service import calculate_accuracy



router=APIRouter(

prefix="/assessment",

tags=["Assessment"]

)



@router.post("/evaluate")
def evaluate_sign(
    data:AssessmentRequest,
    db:Session=Depends(get_db)
):


    accuracy=calculate_accuracy(

        data.hand_shape_score,

        data.motion_score,

        data.timing_score,

        data.position_score

    )



    assessment=Assessment(

        user_id=data.user_id,

        gesture_name=data.gesture_name,

        hand_shape_accuracy=data.hand_shape_score,

        motion_accuracy=data.motion_score,

        timing_accuracy=data.timing_score,

        position_accuracy=data.position_score,

        overall_accuracy=accuracy

    )


    db.add(assessment)

    db.commit()

    db.refresh(assessment)



    return {


        "gesture":
        data.gesture_name,


        "overall_accuracy":
        accuracy,


        "status":
        "completed"

    }