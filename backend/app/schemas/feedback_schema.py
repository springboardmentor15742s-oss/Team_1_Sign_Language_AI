from pydantic import BaseModel



class FeedbackResponse(BaseModel):

    error_type:str

    suggestion:str