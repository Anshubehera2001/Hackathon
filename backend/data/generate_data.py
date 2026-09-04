import os
import numpy as np
import pandas as pd


np.random.seed(42)


OUTPUT_DIR = "data/raw"

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

N_BARS = 50000

ASSETS = {

    "ES": {
        "start": 6000,
        "vol": 0.0008
    },

    "NQ": {
        "start": 21000,
        "vol": 0.0011
    },

    "ZN": {
        "start": 112,
        "vol": 0.00035
    },

    "GC": {
        "start": 2500,
        "vol": 0.0007
    },

    "CL": {
        "start": 70,
        "vol": 0.0012
    }

}


# --------------------------------------------------
# TIME
# --------------------------------------------------

dates = pd.date_range(

    start="2026-01-01",

    periods=N_BARS,

    freq="5min"

)


# --------------------------------------------------
# MARKET REGIMES
# --------------------------------------------------

regime = np.zeros(N_BARS)

regime_length = 2500

for start in range(
    0,
    N_BARS,
    regime_length
):

    end = min(
        start + regime_length,
        N_BARS
    )

    regime[start:end] = np.random.choice(
        [-1, 0, 1]
    )


# smooth regime

regime_signal = pd.Series(
    regime
).rolling(
    500,
    min_periods=1
).mean().values


# --------------------------------------------------
# COMMON MARKET FACTOR
# --------------------------------------------------

common_factor = (

    regime_signal * 0.00015

    + np.random.normal(
        0,
        0.00035,
        N_BARS
    )

)


all_data = []


# --------------------------------------------------
# GENERATE EACH ASSET
# --------------------------------------------------

for symbol, config in ASSETS.items():

    start_price = config["start"]

    volatility = config["vol"]


    # asset-specific noise

    noise = np.random.normal(
        0,
        volatility,
        N_BARS
    )


    # different correlations

    if symbol == "ES":

        asset_return = (
            common_factor
            + noise
        )

    elif symbol == "NQ":

        asset_return = (
            common_factor * 1.15
            + noise
        )

    elif symbol == "ZN":

        asset_return = (
            -common_factor * 0.35
            + noise
        )

    elif symbol == "GC":

        asset_return = (
            common_factor * 0.15
            + noise
        )

    else:

        asset_return = (
            common_factor * 0.30
            + noise
        )


    # ----------------------------------------------
    # VOLATILITY EVENTS
    # ----------------------------------------------

    event_probability = 0.002

    events = (
        np.random.random(N_BARS)
        < event_probability
    )


    shock = np.where(

        events,

        np.random.normal(
            0,
            volatility * 8,
            N_BARS
        ),

        0

    )


    returns = (
        asset_return
        + shock
    )


    # ----------------------------------------------
    # PRICE
    # ----------------------------------------------

    close = (
        start_price
        * np.exp(
            np.cumsum(returns)
        )
    )


    previous_close = np.concatenate(
        [[start_price], close[:-1]]
    )


    # ----------------------------------------------
    # OHLC
    # ----------------------------------------------

    high = close * (
        1
        + np.abs(
            np.random.normal(
                0,
                volatility * 1.5,
                N_BARS
            )
        )
    )


    low = close * (
        1
        - np.abs(
            np.random.normal(
                0,
                volatility * 1.5,
                N_BARS
            )
        )
    )


    open_price = (
        previous_close
        * (
            1
            + np.random.normal(
                0,
                volatility * 0.3,
                N_BARS
            )
        )
    )


    # ----------------------------------------------
    # VOLUME
    # ----------------------------------------------

    base_volume = {

        "ES": 150000,
        "NQ": 100000,
        "ZN": 80000,
        "GC": 60000,
        "CL": 90000

    }[symbol]


    volume = (
        base_volume
        * (
            1
            + np.abs(returns) * 500
        )
        * np.random.lognormal(
            0,
            0.25,
            N_BARS
        )
    )


    df = pd.DataFrame({

        "timestamp": dates,

        "symbol": symbol,

        "open": open_price,

        "high": high,

        "low": low,

        "close": close,

        "volume": volume.astype(int),

        "return": returns,

        "market_regime": regime_signal,

        "event": events.astype(int)

    })


    all_data.append(df)


# --------------------------------------------------
# COMBINE
# --------------------------------------------------

final_df = pd.concat(
    all_data,
    ignore_index=True
)


final_df = final_df.sort_values(
    [
        "timestamp",
        "symbol"
    ]
)


path = (
    f"{OUTPUT_DIR}/market_data.csv"
)


final_df.to_csv(
    path,
    index=False
)


print(
    f"Generated {len(final_df):,} rows"
)

print(
    f"Saved to {path}"
)

print(
    final_df.groupby(
        "symbol"
    ).size()
)