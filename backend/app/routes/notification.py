from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.notification import Notification

from app.schemas.notification_schema import NotificationCreate



router=APIRouter(

prefix="/notifications",

tags=["Notifications"]

)



@router.post("/")
def send_notification(

    data:NotificationCreate,

    db:Session=Depends(get_db)

):


    notification=Notification(

        **data.dict()

    )


    db.add(notification)

    db.commit()

    db.refresh(notification)


    return notification




@router.get("/{user_id}")
def get_notifications(

    user_id:int,

    db:Session=Depends(get_db)

):


    return db.query(

        Notification

    ).filter(

        Notification.user_id==user_id

    ).all()