from pydantic import BaseModel



class AssessmentRequest(BaseModel):

    user_id:int

    gesture_name:str

    hand_shape_score:float

    motion_score:float

    timing_score:float

    position_score:float