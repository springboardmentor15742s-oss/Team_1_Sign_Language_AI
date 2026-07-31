import cv2
import os
import numpy as np



IMAGE_SIZE=224



def preprocess_image(path):


    img=cv2.imread(path)


    img=cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )


    img=cv2.resize(
        img,
        (
        IMAGE_SIZE,
        IMAGE_SIZE
        )
    )


    img=img/255.0


    return img




def load_dataset(folder):


    images=[]

    labels=[]


    classes=os.listdir(folder)


    label_map={

        cls:i

        for i,cls in enumerate(classes)

    }



    for cls in classes:


        class_path=os.path.join(
            folder,
            cls
        )


        for file in os.listdir(class_path):


            path=os.path.join(
                class_path,
                file
            )


            images.append(
                preprocess_image(path)
            )


            labels.append(
                label_map[cls]
            )



    return (

        np.array(images),

        np.array(labels),

        label_map

    )