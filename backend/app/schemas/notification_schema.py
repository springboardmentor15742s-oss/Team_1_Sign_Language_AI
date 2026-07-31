from pydantic import BaseModel



class NotificationCreate(BaseModel):

    user_id:int

    title:str

    message:str

    notification_type:str