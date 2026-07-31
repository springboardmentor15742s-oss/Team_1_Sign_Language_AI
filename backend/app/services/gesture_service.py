import cv2

from app.ai_models.hand_tracker import detect_hands

from app.ai_models.pose_tracker import detect_pose

from app.ai_models.gesture_classifier import predict_gesture



def process_image(path):


    image=cv2.imread(path)


    hands=detect_hands(
        image
    )


    pose=detect_pose(
        image
    )


    prediction=predict_gesture(
        hands
    )


    return {


    "hands_detected":
    len(hands),


    "hand_landmarks":
    hands,


    "pose_landmarks":
    pose,


    "prediction":
    prediction

    }