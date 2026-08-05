const API_URL =
import.meta.env.VITE_API_URL;


export async function apiCall(
    endpoint,
    method="GET",
    body=null
){

    const token =
    localStorage.getItem("token");


    const headers={

        "Content-Type":
        "application/json"

    };


    if(token){

        headers[
            "Authorization"
        ] =
        `Bearer ${token}`;

    }


    const response =
    await fetch(

        `${API_URL}${endpoint}`,

        {

        method,

        headers,

        body:
        body?
        JSON.stringify(body):
        null

        }

    );


    return response.json();

}