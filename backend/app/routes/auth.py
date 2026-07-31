from fastapi import APIRouter,Depends,HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User

from app.schemas.user_schema import *

from app.security import (
    hash_password,
    verify_password
)

from app.utils.jwt import create_access_token



router=APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post("/register")
def register(
    user:UserCreate,
    db:Session=Depends(get_db)
):


    existing=db.query(User).filter(
        User.email==user.email
    ).first()


    if existing:

        raise HTTPException(
            400,
            "Email already registered"
        )



    new_user=User(

        full_name=user.full_name,

        email=user.email,

        hashed_password=
        hash_password(user.password),

        role=user.role
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return new_user




@router.post("/login")
def login(
    user:UserLogin,
    db:Session=Depends(get_db)
):


    db_user=db.query(User).filter(
        User.email==user.email
    ).first()



    if not db_user:

        raise HTTPException(
            401,
            "Invalid credentials"
        )



    if not verify_password(
        user.password,
        db_user.hashed_password
    ):

        raise HTTPException(
            401,
            "Invalid credentials"
        )



    token=create_access_token(
        {
            "sub":db_user.email,
            "role":db_user.role
        }
    )


    return {

        "access_token":token,

        "token_type":"bearer",

        "role":db_user.role

    }