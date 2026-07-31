import mediapipe as mp



hands=mp.solutions.hands.Hands()



def extract_landmarks(frame):


    result=hands.process(frame)



    landmarks=[]


    if result.multi_hand_landmarks:


        for hand in result.multi_hand_landmarks:


            for point in hand.landmark:


                landmarks.extend(

                [

                point.x,

                point.y,

                point.z

                ]

                )


    return landmarks