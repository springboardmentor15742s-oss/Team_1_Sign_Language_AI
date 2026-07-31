import cv2
import mediapipe as mp


BaseOptions = mp.tasks.BaseOptions

VisionRunningMode = mp.tasks.vision.RunningMode

HandLandmarker = mp.tasks.vision.HandLandmarker

HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions



MODEL_PATH = "app/ai_models/hand_landmarker.task"



options = HandLandmarkerOptions(

    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    ),

    running_mode=VisionRunningMode.IMAGE,

    num_hands=2

)



detector = HandLandmarker.create_from_options(
    options
)



def detect_hands(image):


    rgb_image = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )


    mp_image = mp.Image(

        image_format=mp.ImageFormat.SRGB,

        data=rgb_image

    )


    result = detector.detect(
        mp_image
    )


    landmarks=[]


    if result.hand_landmarks:


        for hand in result.hand_landmarks:


            points=[]


            for landmark in hand:


                points.append(

                    {

                    "x": landmark.x,

                    "y": landmark.y,

                    "z": landmark.z

                    }

                )


            landmarks.append(points)



    return landmarks