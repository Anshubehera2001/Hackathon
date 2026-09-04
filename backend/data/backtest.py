import pandas as pd
import numpy as np
import joblib


DATA = "data/processed/features.csv"

MODEL = "models/trading_model.pkl"


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


df = pd.read_csv(
    DATA,
    parse_dates=["timestamp"]
)


df = df.sort_values(
    "timestamp"
)


split = int(
    len(df) * 0.8
)


test = df.iloc[
    split:
].copy()


model = joblib.load(
    MODEL
)


test["signal"] = model.predict(
    test[FEATURES]
)


# ---------------------------------------------
# STRATEGY RETURN
# ---------------------------------------------

# Signal is:
# +1 BUY
#  0 HOLD
# -1 SELL


test["strategy_return"] = (
    test["signal"]
    *
    test["future_return"]
)


# ---------------------------------------------
# TRANSACTION COST
# ---------------------------------------------

transaction_cost = 0.0001


test["trade"] = (
    test["signal"]
    !=
    test["signal"].shift(1)
)


test["strategy_return"] -= (
    test["trade"]
    *
    transaction_cost
)


# ---------------------------------------------
# EQUITY
# ---------------------------------------------

test["equity"] = (

    1
    +
    test["strategy_return"]

).cumprod()


# ---------------------------------------------
# METRICS
# ---------------------------------------------

total_return = (
    test["equity"].iloc[-1]
    - 1
)


returns = test[
    "strategy_return"
]


sharpe = (

    returns.mean()
    /
    returns.std()
    *
    np.sqrt(252)

)


running_max = (
    test["equity"]
    .cummax()
)


drawdown = (
    test["equity"]
    /
    running_max
    - 1
)


max_drawdown = drawdown.min()


trades = test[
    test["trade"]
]


win_rate = (
    test.loc[
        test["trade"],
        "strategy_return"
    ] > 0
).mean()


print()
print("==============================")
print("BACKTEST RESULTS")
print("==============================")

print(
    "Total Return:",
    f"{total_return * 100:.2f}%"
)

print(
    "Sharpe Ratio:",
    f"{sharpe:.2f}"
)

print(
    "Max Drawdown:",
    f"{max_drawdown * 100:.2f}%"
)

print(
    "Trades:",
    len(trades)
)

print(
    "Win Rate:",
    f"{win_rate * 100:.2f}%"
)


# ---------------------------------------------
# SAVE RESULTS
# ---------------------------------------------

test.to_csv(
    "data/backtest_results.csv",
    index=False
)


print()
print(
    "Saved results to "
    "data/backtest_results.csv"
)