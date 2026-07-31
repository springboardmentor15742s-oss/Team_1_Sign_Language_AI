from fastapi import APIRouter,UploadFile,File

import shutil
import os


from app.services.gesture_service import process_image



router=APIRouter(

prefix="/gesture",

tags=["Gesture Recognition"]

)



UPLOAD="uploads"



os.makedirs(
    UPLOAD,
    exist_ok=True
)




@router.post("/recognize")
async def recognize_gesture(
    file:UploadFile=File(...)
):


    path=f"{UPLOAD}/{file.filename}"



    with open(path,"wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )



    result=process_image(
        path
    )



    return result