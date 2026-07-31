from pydantic import BaseModel


class CourseCreate(BaseModel):

    title:str

    category:str

    description:str

    level:str



class CourseResponse(CourseCreate):

    id:int


    class Config:
        from_attributes=True