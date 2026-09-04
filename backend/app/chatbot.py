import requests


OLLAMA_URL = "http://localhost:11434/api/chat"

MODEL = "qwen2.5:3b"


SYSTEM_PROMPT = """
You are Trader Intelligence, a market analysis assistant
for a CME trading demonstration application.

This is a DEMO environment.

You analyze simulated market data and explain:
- ES
- NQ
- ZN
- GC
- CL
- liquidity
- volatility
- momentum
- cross-asset relationships
- BUY/HOLD/SELL model signals
- backtesting results

Important:
Never claim that a prediction is guaranteed.

When discussing trading signals, clearly state that
the signals are simulated and for demonstration only.

Keep responses concise and useful to a trader.
"""


def ask_ollama(message: str):

    payload = {

        "model": MODEL,

        "messages": [

            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },

            {
                "role": "user",
                "content": message
            }

        ],

        "stream": False,

        "options": {

            "temperature": 0.2,

            "num_predict": 250

        }

    }


    response = requests.post(

        OLLAMA_URL,

        json=payload,

        timeout=120

    )


    response.raise_for_status()


    result = response.json()


    return result["message"]["content"]