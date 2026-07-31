import time



from fastapi import Request



async def log_requests(

request:Request,

call_next

):


    start=time.time()



    response=await call_next(

        request

    )



    duration=time.time()-start



    print(

    request.method,

    request.url,

    duration

    )


    return response