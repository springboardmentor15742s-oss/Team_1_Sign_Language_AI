import {
apiRequest
}
from "../api/api"



export async function login(

email,

password

){


const result=
await apiRequest(

"/auth/login",

"POST",

{

email,

password

}

)



localStorage.setItem(

"token",

result.access_token

)



localStorage.setItem(

"role",

result.role

)


return result

}