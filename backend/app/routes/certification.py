from fastapi import APIRouter

from app.services.certification_service import evaluate_certificate



router=APIRouter(

prefix="/certificate",

tags=["Certification"]

)



@router.post("/evaluate")
def certification(

    user_id:int,

    score:int

):


    level=evaluate_certificate(
        score
    )


    return {


        "user_id":user_id,

        "certificate_level":level,

        "status":"Eligible"

    }