import tensorflow as tf

from preprocess import load_dataset

from sklearn.model_selection import train_test_split

from tensorflow.keras.utils import to_categorical



DATASET_PATH="backend/app/datasets/asl_alphabet"



X,y,label_map=load_dataset(
    DATASET_PATH
)



y=to_categorical(
    y,
    len(label_map)
)



X_train,X_test,y_train,y_test=train_test_split(

    X,

    y,

    test_size=0.2,

    random_state=42

)



model=tf.keras.Sequential([


tf.keras.layers.Conv2D(

32,

(3,3),

activation="relu",

input_shape=(224,224,3)

),


tf.keras.layers.MaxPooling2D(),



tf.keras.layers.Conv2D(

64,

(3,3),

activation="relu"

),


tf.keras.layers.MaxPooling2D(),



tf.keras.layers.Conv2D(

128,

(3,3),

activation="relu"

),



tf.keras.layers.Flatten(),



tf.keras.layers.Dense(

256,

activation="relu"

),



tf.keras.layers.Dropout(0.5),



tf.keras.layers.Dense(

len(label_map),

activation="softmax"

)

])




model.compile(

optimizer="adam",

loss="categorical_crossentropy",

metrics=["accuracy"]

)



history=model.fit(

X_train,

y_train,

epochs=30,

validation_data=(

X_test,

y_test

)

)



model.save(

"models/asl_cnn.h5"

)