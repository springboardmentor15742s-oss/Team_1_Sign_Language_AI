def generate_recommendation(
    weak_area,
    skill_level
):


    recommendations=[]


    if weak_area=="Gesture Accuracy":

        recommendations.append(
            "Practice hand shape exercises"
        )


        recommendations.append(
            "Repeat beginner gesture lessons"
        )



    if skill_level=="Beginner":

        recommendations.append(
            "Complete alphabet lessons"
        )


    elif skill_level=="Intermediate":

        recommendations.append(
            "Practice word-level signs"
        )


    else:

        recommendations.append(
            "Practice continuous signing"
        )


    return recommendations