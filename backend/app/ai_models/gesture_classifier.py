import numpy as np



GESTURES=[

"hello",

"thank_you",

"yes",

"no",

"welcome",

"good"

]



def predict_gesture(
        landmarks
):


    if len(landmarks)==0:

        return {

        "gesture":"unknown",

        "confidence":0

        }



    features=np.array(
        landmarks
    ).flatten()



    index=int(
        sum(features)*100
    ) % len(GESTURES)



    return {


        "gesture":
        GESTURES[index],


        "confidence":
        0.85

    }