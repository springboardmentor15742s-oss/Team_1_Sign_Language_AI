from fastapi import APIRouter

from app.services.recommendation_service import generate_recommendation



router=APIRouter(

prefix="/recommendation",

tags=["Recommendations"]

)



@router.post("/")
def recommend(

    weak_area:str,

    skill_level:str

):


    return {

        "recommendations":

        generate_recommendation(

            weak_area,

            skill_level

        )

    }