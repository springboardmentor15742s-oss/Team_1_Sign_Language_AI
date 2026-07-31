from pydantic import BaseModel


class LessonCreate(BaseModel):

    course_id:int

    title:str

    content:str

    video_url:str