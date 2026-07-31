from fastapi import APIRouter

from app.exports.pdf_generator import generate_pdf

from app.exports.excel_generator import generate_excel



router=APIRouter(

prefix="/reports",

tags=["Reports"]

)



@router.get("/learning/pdf")
def learning_report_pdf():


    file=generate_pdf(

        "learning_report.pdf",

        "Learning Report",

        "Learner progress and performance details."

    )


    return {

        "file":file

    }




@router.get("/assessment/excel")
def assessment_report_excel():


    file=generate_excel(

        "assessment_report.xlsx",

        [

        ["Student","Accuracy"],

        ["User 1","90"]

        ]

    )


    return {

        "file":file

    }