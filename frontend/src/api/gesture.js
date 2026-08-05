export async function recognizeGesture(
file
){


const formData=
new FormData()


formData.append(
"file",
file
)



const response=
await fetch(

"http://localhost:8000/gesture/recognize",

{

method:"POST",

body:formData

}

)



return response.json()

}