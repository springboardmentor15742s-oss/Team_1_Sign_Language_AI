def calculate_accuracy(
    hand_shape,
    motion,
    timing,
    position
):


    overall=(

        hand_shape*0.35 +

        motion*0.30 +

        timing*0.15 +

        position*0.20

    )


    return round(
        overall,
        2
    )