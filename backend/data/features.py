import pandas as pd
import numpy as np


INPUT = "data/raw/market_data.csv"

OUTPUT = "data/processed/features.csv"


def create_features():

    df = pd.read_csv(
        INPUT,
        parse_dates=["timestamp"]
    )


    df = df.sort_values(
        ["symbol", "timestamp"]
    )


    grouped = df.groupby(
        "symbol"
    )


    # --------------------------------------------
    # RETURNS
    # --------------------------------------------

    df["return_1"] = grouped["close"].pct_change(1)

    df["return_3"] = grouped["close"].pct_change(3)

    df["return_12"] = grouped["close"].pct_change(12)

    df["return_48"] = grouped["close"].pct_change(48)


    # --------------------------------------------
    # MOVING AVERAGES
    # --------------------------------------------

    df["ma_12"] = grouped["close"].transform(
        lambda x:
        x.rolling(12).mean()
    )


    df["ma_48"] = grouped["close"].transform(
        lambda x:
        x.rolling(48).mean()
    )


    df["ma_ratio"] = (
        df["ma_12"]
        /
        df["ma_48"]
        - 1
    )


    # --------------------------------------------
    # VOLATILITY
    # --------------------------------------------

    df["volatility"] = grouped[
        "return_1"
    ].transform(
        lambda x:
        x.rolling(24).std()
    )


    # --------------------------------------------
    # VOLUME
    # --------------------------------------------

    df["volume_ma"] = grouped[
        "volume"
    ].transform(
        lambda x:
        x.rolling(24).mean()
    )


    df["volume_ratio"] = (
        df["volume"]
        /
        df["volume_ma"]
    )


    # --------------------------------------------
    # HIGH / LOW RANGE
    # --------------------------------------------

    df["range"] = (
        df["high"]
        -
        df["low"]
    ) / df["close"]


    # --------------------------------------------
    # MOMENTUM
    # --------------------------------------------

    df["momentum"] = (
        df["close"]
        /
        df["close"].shift(12)
        - 1
    )


    # --------------------------------------------
    # FUTURE RETURN
    # --------------------------------------------

    df["future_return"] = grouped[
        "close"
    ].shift(-12) / df["close"] - 1


    # --------------------------------------------
    # TARGET
    # --------------------------------------------

    threshold = 0.001


    df["target"] = np.select(

        [

            df["future_return"] > threshold,

            df["future_return"] < -threshold

        ],

        [

            1,

            -1

        ],

        default=0

    )


    # --------------------------------------------
    # CLEAN
    # --------------------------------------------

    df = df.replace(
        [np.inf, -np.inf],
        np.nan
    )


    df = df.dropna()


    import os

    os.makedirs(
        "data/processed",
        exist_ok=True
    )


    df.to_csv(
        OUTPUT,
        index=False
    )


    print(
        f"Saved {len(df):,} feature rows"
    )


if __name__ == "__main__":

    create_features()