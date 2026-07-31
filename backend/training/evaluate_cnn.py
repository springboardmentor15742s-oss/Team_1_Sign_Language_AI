from tensorflow.keras.models import load_model

from sklearn.metrics import classification_report


model=load_model("models/asl_cnn.h5")



loss,accuracy=model.evaluate(X_test,y_test)



print("Accuracy:",accuracy)