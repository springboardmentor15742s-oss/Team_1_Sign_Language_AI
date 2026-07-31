from app.ai_models.cnn.asl_cnn import load_cnn_model
from app.ai_models.lstm.gesture_lstm import load_lstm_model


cnn_model = None
lstm_model = None



def load_models():

    global cnn_model
    global lstm_model


    print("Loading AI models...")


    cnn_model = load_cnn_model()

    lstm_model = load_lstm_model()


    print("AI models loaded successfully")



def get_cnn_model():

    return cnn_model



def get_lstm_model():

    return lstm_model