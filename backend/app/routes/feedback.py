from fastapi import APIRouter

from app.services.feedback_service import generate_feedback



router=APIRouter(

prefix="/feedback",

tags=["AI Feedback"]

)



@router.post("/generate")
def create_feedback(

    hand_shape:float,

    motion:float,

    timing:float,

    position:float

):


    result=generate_feedback(

        hand_shape,

        motion,

        timing,

        position

    )


    return {

        "feedback":
        result

    }