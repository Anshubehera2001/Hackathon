# Trader Intelligence — Spatial Market Experience

> **An AI-assisted trading intelligence prototype combining multi-asset market analytics, machine-learning signals, backtesting, and 3D spatial visualization.**

![Status](https://img.shields.io/badge/status-demo%20prototype-blue)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python\&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react\&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)
![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi\&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local%20LLM-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

**Trader Intelligence — Spatial Market Experience** is a demonstration platform designed around a simple question:

> **How can market information be presented to traders in a way that makes relationships, risk, liquidity, and trading signals easier to understand?**

Traditional trading interfaces primarily present market information through charts, tables, order books, and numerical indicators.

This prototype explores a different approach:

* Multi-asset market intelligence
* AI-generated market explanations
* Machine-learning BUY / HOLD / SELL signals
* Historical backtesting
* Cross-asset relationship visualization
* Liquidity visualization
* Market-event awareness
* Interactive 3D spatial market view
* Floating AI trading assistant
* Local LLM inference using Ollama

The project is designed as a **demo environment using synthetic market data**. No real-time market data or live trading is involved.

---

# Key Concept

The application combines traditional quantitative analysis with an interactive spatial interface.

Instead of looking at each market independently, the system represents relationships between assets as a connected market environment.

Example:

```text
                    NQ
                   ↗
                  /
             ┌── ES ──┐
             │        │
            ZN       GC
             │        │
             └── CL ──┘
```

The spatial representation can help a trader visually identify:

* Strong relationships
* Weak relationships
* Positive / negative correlations
* Liquidity concentration
* Market stress
* Cross-asset movements
* AI-generated market intelligence

---

# Supported Demo Assets

The current prototype uses multiple futures-style assets:

| Symbol | Asset                         |
| ------ | ----------------------------- |
| ES     | S&P 500 Futures               |
| NQ     | Nasdaq Futures                |
| ZN     | 10-Year Treasury Note Futures |
| GC     | Gold Futures                  |
| CL     | Crude Oil Futures             |

The data is **synthetically generated** for demonstration purposes.

---

# Core Features

## 1. Multi-Asset Market Dashboard

The dashboard provides a unified view of multiple markets.

Each market includes:

* Current simulated price
* Percentage change
* Asset class
* Market pulse
* Liquidity
* Volume
* Volatility
* Market regime

The selected market dynamically updates the intelligence view.

---

## 2. Market Pulse

The Market Pulse provides a simplified view of current market conditions.

Example:

```text
MARKET PULSE

82

Elevated Risk

Liquidity      76
Volume         84
Volatility     71
```

The objective is to surface information that may require trader attention without forcing the user to interpret multiple indicators independently.

---

## 3. Spatial Liquidity Map

Liquidity is represented visually rather than only through numerical values.

The application separates:

```text
SELL LIQUIDITY       PRICE       BUY LIQUIDITY

███████████          6013.00       ████████
█████████            6012.75       ██████████
███████              6012.50       ███████████
██████               6012.25       ███████
```

This same concept is extended into the 3D environment using spatial liquidity bars.

---

# 4. Cross-Asset Intelligence

The system represents relationships between assets.

Example:

```text
ES ───────── NQ
0.87

ES ───────── ZN
-0.19

ES ───────── GC
-0.04

ES ───────── CL
0.18
```

Positive relationships and negative relationships are visually represented in the spatial environment.

This allows users to explore market behavior as a **network of connected assets** instead of isolated instruments.

---

# 5. Machine Learning Trading Model

The project includes a machine-learning pipeline that produces:

```text
BUY
HOLD
SELL
```

signals.

The current implementation uses a **Random Forest classifier**.

The model is trained using features derived from the synthetic market dataset.

### Features include

* Short-term returns
* Medium-term returns
* Long-term returns
* Moving-average relationship
* Volatility
* Volume ratio
* Price range
* Momentum

Example:

```text
Input

Momentum          +0.34%
Volume Ratio       1.37
Volatility         0.48
MA Ratio           +0.21%
Short Return       +0.12%

          ↓

Random Forest

          ↓

BUY
Confidence: 73%
```

---

# 6. Backtesting Engine

The model is evaluated using historical simulated data before being used for prediction.

The backtesting pipeline calculates metrics such as:

* Total return
* Sharpe ratio
* Maximum drawdown
* Number of trades
* Win rate

Example:

```text
==============================
BACKTEST RESULTS
==============================

Total Return:   +18.40%
Sharpe Ratio:     1.42
Max Drawdown:    -7.20%
Trades:             842
Win Rate:         61.20%
```

> These numbers are examples from the demonstration concept. Results will vary depending on the generated dataset and model configuration.

---

# 7. Synthetic Market Data Generator

The project intentionally generates its own dataset.

The generator simulates:

* OHLC prices
* Volume
* Market regimes
* Volatility
* Market shocks
* Cross-asset relationships
* Returns
* Event periods

The current configuration generates approximately:

```text
50,000 bars × 5 assets

≈ 250,000 market records
```

This provides enough data to demonstrate the complete ML and backtesting workflow without requiring external market-data APIs.

---

# 8. Market Scenarios

The dashboard supports multiple simulated market conditions.

### Normal

Represents relatively stable market conditions.

### Liquidity Withdrawal

Simulates a reduction in available liquidity.

### Volatility Spike

Simulates a sudden increase in market volatility.

### Cross-Asset Shock

Simulates abnormal movement across related assets.

These scenarios allow the application to demonstrate how the Trader Intelligence layer reacts to changing market conditions.

---

# 9. Local AI Trader Assistant

The application includes a floating AI assistant.

The assistant runs locally using:

**Ollama + Qwen2.5:3B**

Architecture:

```text
React Chatbot
       │
       ▼
FastAPI
       │
       ▼
Ollama
       │
       ▼
Qwen2.5:3B
```

The goal is to allow traders to ask questions such as:

```text
Why is ES showing BUY?

What is causing the current risk level?

How is NQ affecting ES?

What happens during a liquidity withdrawal?

What does the backtest show?

Which asset has the strongest relationship with ES?
```

The long-term design allows the LLM to receive structured market context from the analytics and ML layers rather than generating trading information independently.

---

# 10. 3D Spatial Market View

The application includes an interactive 3D visualization built with:

* React Three Fiber
* Three.js
* Drei

Markets are represented as spatial nodes.

Example:

```text
                       NQ
                      /
                     /
                    ES
                  /    \
                 /      \
               ZN        GC
                          \
                           CL
```

Users can:

* Rotate the environment
* Zoom in/out
* Select different markets
* Explore relationships
* View liquidity structures
* Inspect market intelligence
* Observe simulated market events

The spatial environment is designed as a foundation for a future **Apple Vision Pro / visionOS experience**.

---

# Architecture

```text
                        ┌──────────────────────┐
                        │      React UI        │
                        │   TypeScript/Vite     │
                        └──────────┬───────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
              Market UI      Spatial View    AI Chatbot
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │       FastAPI        │
                        │      Python API      │
                        └──────────┬───────────┘
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
                 ▼                 ▼                 ▼
           Market Data       ML Prediction      Backtesting
                 │                 │                 │
                 └─────────────────┼─────────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │       Ollama         │
                        │      Qwen2.5:3B       │
                        └──────────────────────┘
```

---

# Project Structure

```text
trader-intelligence/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── SpatialScene.tsx
│   │   │   ├── MarketNode.tsx
│   │   │   ├── RelationshipLine.tsx
│   │   │   ├── LiquidityBars.tsx
│   │   │   └── MarketIntelligence.tsx
│   │   │
│   │   ├── data/
│   │   │   ├── markets.ts
│   │   │   └── scenarios.ts
│   │   │
│   │   └── App.tsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── data/
│   │   ├── raw/
│   │   │   └── market_data.csv
│   │   │
│   │   └── processed/
│   │       └── features.csv
│   │
│   ├── models/
│   │   └── trading_model.pkl
│   │
│   ├── generate_data.py
│   ├── features.py
│   ├── train_model.py
│   ├── backtest.py
│   ├── predict.py
│   ├── chatbot.py
│   └── main.py
│
└── README.md
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Three.js
* React Three Fiber
* Drei
* Lucide Icons

## Backend

* Python
* FastAPI
* Pandas
* NumPy
* Scikit-learn
* Joblib

## AI

* Ollama
* Qwen2.5:3B

## Machine Learning

* Random Forest
* Classification
* Feature engineering
* Time-based train/test split
* Backtesting

---

# Getting Started

## Prerequisites

Install:

* Python 3.11+
* Node.js
* npm
* Ollama

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install pandas numpy scikit-learn joblib matplotlib fastapi uvicorn requests
```

---

# Generate Market Data

Run:

```bash
python generate_data.py
```

This creates:

```text
data/raw/market_data.csv
```

---

# Create Features

Run:

```bash
python features.py
```

This creates:

```text
data/processed/features.csv
```

---

# Train the Model

Run:

```bash
python train_model.py
```

The trained model will be stored at:

```text
models/trading_model.pkl
```

---

# Run the Backtest

Run:

```bash
python backtest.py
```

Results are written to:

```text
data/backtest_results.csv
```

---

# Start Ollama

Install Ollama and pull the lightweight model:

```bash
ollama pull qwen2.5:3b
```

Start Ollama:

```bash
ollama serve
```

The default Ollama endpoint is:

```text
http://127.0.0.1:11434
```

---

# Start FastAPI

From the backend directory:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will typically be available at:

```text
http://localhost:5173
```

or another available Vite port.

---

# Example API

## Market Prediction

```http
GET /prediction/ES
```

Example response:

```json
{
  "symbol": "ES",
  "price": 6124.52,
  "signal": "BUY",
  "confidence": 73.41,
  "probabilities": {
    "-1": 0.11,
    "0": 0.15,
    "1": 0.7341
  }
}
```

---

# Example AI Workflow

A trader asks:

```text
Why is ES showing BUY?
```

The application can combine:

```text
ES price
+
Momentum
+
Volume
+
Volatility
+
Cross-asset relationships
+
ML prediction
+
Backtest statistics
```

and provide the context to the local LLM.

Example:

```text
ES SIGNAL: BUY

Confidence: 73%

Supporting factors:

• Positive short-term momentum
• Elevated volume
• Positive NQ relationship
• Stable liquidity
• Favorable model probability

Historical simulation:

Win Rate: 61%
Sharpe: 1.42
Max Drawdown: -7.2%
```

The LLM's role is to **explain the available quantitative information**, not independently invent a trading signal.

---

# Why This Approach?

The project focuses on three layers of trader intelligence.

### Layer 1 — Observe

```text
What is happening?
```

Market pulse, liquidity, volatility, volume and relationships.

### Layer 2 — Predict

```text
What might happen?
```

Machine-learning BUY / HOLD / SELL classification.

### Layer 3 — Explain

```text
Why is the system showing this signal?
```

Local AI assistant using Ollama and Qwen.

Combined:

```text
OBSERVE
   ↓
ANALYZE
   ↓
PREDICT
   ↓
EXPLAIN
```

---

# Future Roadmap

## Quantitative Improvements

* [ ] Walk-forward validation
* [ ] More sophisticated feature engineering
* [ ] XGBoost / LightGBM comparison
* [ ] Ensemble models
* [ ] Position sizing
* [ ] Risk-adjusted signals
* [ ] Slippage modelling
* [ ] Transaction-cost modelling
* [ ] Monte Carlo simulation

## Market Intelligence

* [ ] Order-book simulation
* [ ] Market depth imbalance
* [ ] Volume profile
* [ ] VWAP
* [ ] Volatility surface visualization
* [ ] Correlation matrix
* [ ] Regime detection
* [ ] Anomaly detection

## AI

* [ ] Connect LLM to real model outputs
* [ ] Context-aware market conversations
* [ ] Explainable AI signals
* [ ] Scenario analysis
* [ ] Trade-risk summaries
* [ ] Automated market briefings

## Spatial Experience

* [ ] Spatial annotations
* [ ] Gesture-based interaction
* [ ] 3D order-book visualization
* [ ] Spatial alerts
* [ ] Multi-market spatial comparison
* [ ] visionOS native implementation
* [ ] Apple Vision Pro integration

---

# Apple Vision Pro Direction

The current spatial interface is implemented as a browser-based 3D experience.

This provides a foundation for eventually translating the concept into a native spatial computing experience.

Potential future interaction:

```text
              NQ
             ╱
            ╱
       ES ───────── ZN
       │
       │
       GC ───────── CL

      ↑
  Spatial Alert

"Liquidity withdrawal detected"
```

A future visionOS implementation could allow traders to:

* Move around the market environment
* Inspect individual assets
* Manipulate relationships spatially
* Pin market intelligence panels
* View liquidity in 3D
* Receive spatial alerts
* Compare multiple markets simultaneously

---

# Demo Data Disclaimer

This project currently uses **synthetically generated market data**.

The dataset is intended only for:

* Demonstration
* UI development
* Machine-learning experimentation
* Backtesting workflow demonstration
* Spatial visualization
* Hackathon / portfolio presentation

It is **not real CME market data** and should not be used for actual trading decisions.

The BUY / HOLD / SELL predictions are also experimental and should not be interpreted as financial advice.

---

# Project Vision

The long-term goal is to explore a more intuitive way of interacting with complex financial markets.

Instead of:

```text
Charts
Tables
Numbers
Alerts
```

the proposed experience becomes:

```text
                    MARKET
                       │
          ┌────────────┼────────────┐
          │            │            │
       Observe       Predict      Explain
          │            │            │
       Spatial       ML Model       AI
       View          Signals      Assistant
          │            │            │
          └────────────┼────────────┘
                       │
                       ▼
                TRADER INTELLIGENCE
```

The objective is not to replace a trader.

It is to **reduce information overload and make relationships, risks, and market conditions easier to interpret.**

---

## Disclaimer

This is an experimental software prototype for educational and demonstration purposes.

It does not provide financial advice, execute trades, or guarantee the accuracy of predictions. Synthetic data is used throughout the current implementation.
