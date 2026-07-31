from fastapi import APIRouter,UploadFile,File

import shutil


from app.services.prediction_service import predict_static_sign



router=APIRouter(

prefix="/prediction",

tags=[
"AI Prediction"
]

)



@router.post("/sign")
async def predict_sign(

file:UploadFile=File(...)

):


    path="uploads/"+file.filename



    with open(
        path,
        "wb"
    ) as buffer:


        shutil.copyfileobj(
            file.file,
            buffer
        )



    result=predict_static_sign(
        path
    )



    return result