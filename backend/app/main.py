
from fastapi import FastAPI

from app.ai_models.cnn.asl_cnn import load_cnn_model

from app.ai_models.lstm.gesture_lstm import load_lstm_model

from fastapi.middleware.gzip import GZipMiddleware

from app.middleware.error_handler import global_exception_handler

from fastapi.middleware.cors import CORSMiddleware

from app.database import Base,engine

from app.routes import auth

from app.ai_models.model_manager import load_models

from app.routes import prediction



Base.metadata.create_all(
    bind=engine
)



app=FastAPI(

    title="AI Sign Language Learning Platform",

    version="1.0"

)

@app.on_event("startup")
def load_models():

    print("Loading AI Models...")

    load_cnn_model()

    load_lstm_model()

    print("AI Models Loaded Successfully")

    

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=[
        "*"
    ],

    allow_headers=[
        "*"
    ]

)

from app.routes import (
    auth,
    profile,
    courses,
    lessons,
    learning,
    practice,
    progress,
    gesture,
    assessment,
    feedback,
    analytics,
    recommendation,
    quiz,
    certification,
    scoring,
    dashboard,
    notification,
    reports
)



app.include_router(auth.router)

app.include_router(profile.router)

app.include_router(courses.router)

app.include_router(lessons.router)

app.include_router(learning.router)

app.include_router(practice.router)

app.include_router(progress.router)

app.include_router(gesture.router)

app.include_router(assessment.router)

app.include_router(feedback.router)

app.include_router(analytics.router)

app.include_router(recommendation.router)

app.include_router(quiz.router)

app.include_router(certification.router)

app.include_router(scoring.router)


app.include_router(dashboard.router)

app.include_router(notification.router)


app.include_router(reports.router)

app.include_router(prediction.router)

app.add_exception_handler(Exception,global_exception_handler)

app.add_middleware(GZipMiddleware,minimum_size=1000)


@app.get("/")
def home():

    return {

        "message":
        "Sign Language Platform Backend Running"

    }

@app.on_event("startup")
def startup_event():

    load_models()

