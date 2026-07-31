from pydantic import BaseModel


class ProfileCreate(BaseModel):

    user_id:int

    learning_level:str

    preferred_language:str

    learning_goal:str



class ProfileResponse(BaseModel):

    id:int

    user_id:int

    learning_level:str

    preferred_language:str

    learning_goal:str

    skill_level:str


    class Config:
        from_attributes=True