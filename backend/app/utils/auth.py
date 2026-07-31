from fastapi import Depends,HTTPException,status

from fastapi.security import OAuth2PasswordBearer

from jose import jwt,JWTError

from app.config import settings



oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="/auth/login"

)



def get_current_user(

    token:str=Depends(oauth2_scheme)

):


    try:

        payload=jwt.decode(

            token,

            settings.SECRET_KEY,

            algorithms=[
                settings.ALGORITHM
            ]

        )


        email=payload.get(
            "sub"
        )


        role=payload.get(
            "role"
        )


        if email is None:

            raise HTTPException(
                401,
                "Invalid token"
            )


        return {

            "email":email,

            "role":role

        }


    except JWTError:


        raise HTTPException(

            status_code=401,

            detail="Token expired or invalid"

        )