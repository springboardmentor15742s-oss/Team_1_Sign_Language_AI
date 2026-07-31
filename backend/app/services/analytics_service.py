def analyze_progress(
    accuracy,
    practice_count
):


    if accuracy >=90:

        level="Professional"


    elif accuracy >=75:

        level="Advanced"


    elif accuracy >=50:

        level="Intermediate"


    else:

        level="Beginner"



    if accuracy <70:

        weak_area="Gesture Accuracy"

    else:

        weak_area="No Major Weak Area"



    improvement_rate = (

        accuracy * practice_count

    ) / 100



    return {

        "skill_level":level,

        "weak_area":weak_area,

        "improvement_rate":
        round(improvement_rate,2)

    }