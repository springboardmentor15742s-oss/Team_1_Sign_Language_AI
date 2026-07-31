import tensorflow as tf



model=tf.keras.Sequential([



tf.keras.layers.LSTM(

128,

return_sequences=True,

input_shape=(30,63)

),



tf.keras.layers.LSTM(

64

),



tf.keras.layers.Dense(

64,

activation="relu"

),



tf.keras.layers.Dense(

10,

activation="softmax"

)


])



model.compile(

optimizer="adam",

loss="categorical_crossentropy",

metrics=["accuracy"]

)



model.fit(X_train,y_train,epochs=50,validation_data=(X_test,y_test))



model.save("models/gesture_lstm.h5")