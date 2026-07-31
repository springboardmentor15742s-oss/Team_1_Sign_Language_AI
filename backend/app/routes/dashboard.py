from fastapi import APIRouter,Depends

from sqlalchemy.orm import Session


from app.database import get_db

from app.models.score import PerformanceScore

from app.utils.auth import get_current_user



router=APIRouter(

prefix="/dashboard",

tags=["Dashboards"]

)

@router.get("/learner/{user_id}")
def learner_dashboard(

    user_id:int,

    current_user=Depends(get_current_user),

    db:Session=Depends(get_db)

):


    score=db.query(
        PerformanceScore
    ).filter(
        PerformanceScore.user_id==user_id
    ).order_by(
        PerformanceScore.id.desc()
    ).first()



    return {


        "learning_progress":

        score.overall_score
        if score else 0,


        "accuracy_score":

        score.gesture_accuracy
        if score else 0,


        "skill_mastery":

        score.mastery_level
        if score else "Beginner",


        "recommended_lessons":

        [

        "Hand Shape Practice",

        "Advanced Gestures"

        ]

    }

@router.get("/instructor")
def instructor_dashboard(

db:Session=Depends(get_db)

):


    students=db.query(
        PerformanceScore
    ).all()



    return {


    "total_students":

    len(students),


    "assessment_reports":

    [

    {

    "student_id":x.user_id,

    "score":x.overall_score

    }

    for x in students

    ]

    }

@router.get("/trainer")
def trainer_dashboard(

db:Session=Depends(get_db)

):


    data=db.query(
        PerformanceScore
    ).all()



    return {


    "learner_engagement":

    len(data),


    "skill_reports":

    data

    }

@router.get("/admin")
def admin_dashboard(

db:Session=Depends(get_db)

):


    users=db.query(
        PerformanceScore
    ).count()



    return {


    "platform_users":

    users,


    "system_status":

    "Running",


    "content_management":

    "Available"

    }