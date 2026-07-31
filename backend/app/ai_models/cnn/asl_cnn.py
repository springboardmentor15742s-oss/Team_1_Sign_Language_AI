import os

from tensorflow.keras.models import load_model


MODEL_PATH = "app/ai_models/cnn/asl_model.h5"


model = None



def load_cnn_model():

    global model


    if model is None:

        if not os.path.exists(MODEL_PATH):

            print(
                "CNN model not found. "
                "Train model before prediction."
            )

            return None


        model = load_model(
            MODEL_PATH
        )


        print(
            "CNN model loaded successfully"
        )


    return model