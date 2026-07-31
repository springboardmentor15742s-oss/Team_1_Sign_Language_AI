import numpy as np


from app.ai_models.model_manager import get_cnn_model

from app.ai_models.preprocessing import preprocess_image

from app.ai_models.lstm.gesture_lstm import load_lstm_model



WORDS=[

"HELLO",

"THANK YOU",

"YES",

"NO",

"WELCOME"

]



def predict_sequence(
    sequence
):


    model=load_lstm_model()


    sequence=np.array(
        sequence
    )


    sequence=np.expand_dims(
        sequence,
        axis=0
    )



    output=model.predict(
        sequence
    )



    index=np.argmax(
        output
    )



    return {


    "gesture":

    WORDS[index],


    "confidence":

    float(
        np.max(output)
    )

    }


LABELS=[

"A","B","C","D",
"E","F","G",
"H","I","J","E","F","G",
"H","I","J","K","L","M",
"N","O","P","Q","R",
"S","T","U","V","W","X","Y"

]



def predict_static_sign(
    image_path
):


    model = get_cnn_model()



    image=preprocess_image(
        image_path
    )



    prediction=model.predict(
        image
    )



    index=np.argmax(
        prediction
    )



    confidence=float(
        np.max(prediction)
    )



    return {


        "sign":
        LABELS[index],


        "confidence":
        round(
            confidence*100,
            2
        )

    }