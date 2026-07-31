def calculate_learning_score(

    gesture_accuracy,

    assessment_score,

    lesson_completion,

    practice_consistency,

    improvement_rate

):


    score=(

        gesture_accuracy*0.40

        +

        assessment_score*0.25

        +

        lesson_completion*0.15

        +

        practice_consistency*0.10

        +

        improvement_rate*0.10

    )


    return round(score,2)



def calculate_mastery(score):


    if score >=90:

        return "Professional"


    elif score >=75:

        return "Advanced"


    elif score >=50:

        return "Intermediate"


    else:

        return "Beginner"