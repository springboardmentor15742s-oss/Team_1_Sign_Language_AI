import os

from tensorflow.keras.models import load_model



MODEL_PATH = "app/ai_models/lstm/gesture_model.h5"


model = None



def load_lstm_model():

    global model


    if model is None:


        if not os.path.exists(MODEL_PATH):

            print(
                "LSTM model not found. "
                "Train model before prediction."
            )

            return None


        model = load_model(
            MODEL_PATH
        )


        print(
            "LSTM model loaded successfully"
        )


    return model