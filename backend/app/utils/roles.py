from fastapi import HTTPException



def check_role(
    user,
    allowed_roles
):


    if user["role"] not in allowed_roles:

        raise HTTPException(

            status_code=403,

            detail="Permission denied"

        )


    return True