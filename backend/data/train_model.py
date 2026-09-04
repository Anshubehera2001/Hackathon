import os

import pandas as pd

import joblib

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    classification_report,
    accuracy_score
)


DATA = "data/processed/features.csv"

MODEL_PATH = "models/trading_model.pkl"


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
    DATA
)


# ---------------------------------------------
# TIME-BASED SPLIT
# ---------------------------------------------

df = df.sort_values(
    "timestamp"
)


split = int(
    len(df) * 0.8
)


train = df.iloc[
    :split
]


test = df.iloc[
    split:
]


X_train = train[
    FEATURES
]


y_train = train[
    "target"
]


X_test = test[
    FEATURES
]


y_test = test[
    "target"
]


# ---------------------------------------------
# MODEL
# ---------------------------------------------

model = RandomForestClassifier(

    n_estimators=250,

    max_depth=10,

    min_samples_leaf=20,

    random_state=42,

    n_jobs=-1

)


model.fit(
    X_train,
    y_train
)


# ---------------------------------------------
# EVALUATION
# ---------------------------------------------

predictions = model.predict(
    X_test
)


accuracy = accuracy_score(
    y_test,
    predictions
)


print(
    "Accuracy:",
    round(accuracy, 4)
)


print(
    classification_report(
        y_test,
        predictions
    )
)


# ---------------------------------------------
# SAVE
# ---------------------------------------------

os.makedirs(
    "models",
    exist_ok=True
)


joblib.dump(
    model,
    MODEL_PATH
)


print(
    f"Model saved to {MODEL_PATH}"
)