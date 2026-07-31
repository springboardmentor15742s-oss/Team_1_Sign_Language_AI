import cv2
import mediapipe as mp



BaseOptions = mp.tasks.BaseOptions

PoseLandmarker = mp.tasks.vision.PoseLandmarker

PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions

VisionRunningMode = mp.tasks.vision.RunningMode



MODEL_PATH="app/ai_models/pose_landmarker.task"



options=PoseLandmarkerOptions(

    base_options=BaseOptions(
        model_asset_path=MODEL_PATH
    ),

    running_mode=VisionRunningMode.IMAGE

)



pose_detector=PoseLandmarker.create_from_options(
    options
)



def detect_pose(image):


    rgb=cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )


    mp_image=mp.Image(

        image_format=mp.ImageFormat.SRGB,

        data=rgb

    )


    result=pose_detector.detect(
        mp_image
    )


    landmarks=[]


    if result.pose_landmarks:


        for pose in result.pose_landmarks:


            for point in pose:

                landmarks.append(

                    {

                    "x":point.x,

                    "y":point.y,

                    "z":point.z

                    }

                )


    return landmarks