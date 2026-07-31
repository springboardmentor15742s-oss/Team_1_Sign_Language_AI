from jose import jwt
from datetime import datetime,timedelta

from app.config import settings



def create_access_token(data):


    expire=datetime.utcnow()+timedelta(
        minutes=
        settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )


    payload=data.copy()

    payload.update(
        {
            "exp":expire
        }
    )


    token=jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


    return token