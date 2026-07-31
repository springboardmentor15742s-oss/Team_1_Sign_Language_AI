from fastapi import APIRouter



router=APIRouter(

prefix="/quiz",

tags=["Quiz"]

)



questions=[

{

"question":
"What hand shape represents A sign?",

"answer":
"Closed fist"

},

{

"question":
"Which movement is required for hello sign?",

"answer":
"Hand movement near forehead"

}

]



@router.get("/generate")
def generate_quiz(

level:str

):


    return {

        "level":level,

        "questions":questions

    }