from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph
)

from reportlab.lib.styles import getSampleStyleSheet



def generate_pdf(
    filename,
    title,
    content
):


    doc=SimpleDocTemplate(
        filename
    )


    styles=getSampleStyleSheet()


    elements=[]


    elements.append(
        Paragraph(
            title,
            styles["Title"]
        )
    )


    elements.append(
        Paragraph(
            content,
            styles["BodyText"]
        )
    )


    doc.build(elements)


    return filename