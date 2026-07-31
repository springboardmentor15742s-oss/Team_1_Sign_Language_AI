from openpyxl import Workbook



def generate_excel(
    filename,
    data
):


    workbook=Workbook()


    sheet=workbook.active


    sheet.title="Learning Report"



    for row in data:

        sheet.append(row)



    workbook.save(filename)


    return filename