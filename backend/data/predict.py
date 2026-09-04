import pandas as pd
import joblib


MODEL_PATH = (
    "models/trading_model.pkl"
)


FEATURES = [

    "return_1",

    "return_3",

    "return_12",

    "return_48",

    "ma_ratio",

    "volatility",

    "volume_ratio",

    "range",

    "momentum"

]


model = joblib.load(
    MODEL_PATH
)


def predict_market(
    symbol: str
):

    df = pd.read_csv(
        "data/processed/features.csv"
    )


    df = df[
        df["symbol"] == symbol
    ]


    df = df.sort_values(
        "timestamp"
    )


    latest = df.iloc[
        -1
    ]


    X = pd.DataFrame(
        [
            latest[FEATURES]
        ]
    )


    prediction = model.predict(
        X
    )[0]


    probabilities = (
        model.predict_proba(X)[0]
    )


    classes = (
        model.classes_
    )


    probability_map = {

        str(int(cls)):
        float(prob)

        for cls, prob
        in zip(
            classes,
            probabilities
        )

    }


    signal_map = {

        1: "BUY",

        0: "HOLD",

        -1: "SELL"

    }


    return {

        "symbol": symbol,

        "price": float(
            latest["close"]
        ),

        "signal":
            signal_map[
                int(prediction)
            ],

        "confidence":
            round(
                max(probabilities)
                * 100,
                2
            ),

        "probabilities":
            probability_map,

        "timestamp":
            str(
                latest["timestamp"]
            )

    }