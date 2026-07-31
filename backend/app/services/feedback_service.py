def generate_feedback(
    hand_shape,
    motion,
    timing,
    position
):


    feedback=[]



    if hand_shape < 70:

        feedback.append({

        "error":
        "Incorrect Hand Shape",

        "suggestion":
        "Adjust finger positions and hand configuration."

        })



    if motion < 70:

        feedback.append({

        "error":
        "Incorrect Motion",

        "suggestion":
        "Practice the movement direction and speed."

        })



    if position < 70:

        feedback.append({

        "error":
        "Incorrect Position",

        "suggestion":
        "Move your hand to the correct body position."

        })



    if timing < 70:

        feedback.append({

        "error":
        "Timing Issues",

        "suggestion":
        "Improve gesture timing consistency."

        })



    if len(feedback)==0:

        feedback.append({

        "error":
        "No Errors",

        "suggestion":
        "Excellent sign execution."

        })



    return feedback