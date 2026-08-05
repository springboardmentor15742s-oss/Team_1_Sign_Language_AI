const API_URL =
"http://localhost:8000"



export async function apiRequest(
    endpoint,
    method="GET",
    data=null,
    token=null
){

    const headers={

        "Content-Type":
        "application/json"

    }



    if(token){

        headers[
        "Authorization"
        ]=
        `Bearer ${token}`

    }



    const response=
    await fetch(

        API_URL+endpoint,

        {

        method,

        headers,

        body:
        data?
        JSON.stringify(data):
        null

        }

    )


    return response.json()

}