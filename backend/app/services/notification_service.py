def create_message(event):


    messages={


        "practice":

        "Your daily sign practice reminder is scheduled.",


        "assessment":

        "Your assessment is available now.",


        "course_complete":

        "Congratulations! You completed the course.",


        "achievement":

        "You unlocked a new achievement.",


        "announcement":

        "New platform announcement available."

    }



    return messages.get(
        event,
        "New notification"
    )