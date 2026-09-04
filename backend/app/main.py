# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from pydantic import BaseModel

# from chatbot import ask_ollama

# app = FastAPI(
#     title="CME Trader AI Demo"
# )


# # Allow React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# class ChatRequest(BaseModel):

#     message: str
    
# @app.get("/")
# def root():

#     return {
#         "status": "running",
#         "application": "CME Trader AI Demo",
#         "mode": "simulated"
#     }


# @app.get("/markets")
# def get_markets():

#     return MARKET_DATA


# @app.post("/chat")
# def chat(data: dict):

#     question = data.get(
#         "question",
#         ""
#     )

#     symbol = data.get(
#         "symbol",
#         "ES"
#     )

#     return chatbot(
#         question,
#         symbol
#     )
    
# @app.post("/chat")
# def chat(request: ChatRequest):

#     response = ask_ollama(
#         request.message
#     )

#     return {

#         "response": response

#     }




from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests


app = FastAPI(
    title="CME Trader Intelligence Demo"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


OLLAMA_URL = "http://127.0.0.1:11434/api/chat"
MODEL = "qwen2.5:3b"


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():

    return {
        "status": "running",
        "service": "CME Trader Intelligence Demo"
    }


@app.get("/health")
def health():

    try:

        response = requests.get(
            "http://127.0.0.1:11434/api/tags",
            timeout=5
        )

        response.raise_for_status()

        return {
            "fastapi": "ok",
            "ollama": "ok"
        }

    except Exception as error:

        return {
            "fastapi": "ok",
            "ollama": "error",
            "message": str(error)
        }


@app.post("/chat")
def chat(request: ChatRequest):

    print(
        "CHAT REQUEST:",
        request.message
    )

    payload = {

        "model": MODEL,

        "messages": [

            {
                "role": "system",
                "content": """
You are Trader Intelligence.

You are an assistant inside a CME
trading demonstration application.

This is DEMO data only.

Explain ES, NQ, ZN, GC and CL,
market conditions, liquidity,
volatility, momentum and
BUY/HOLD/SELL signals.

Never guarantee a trading result.

Keep responses concise.
"""
            },

            {
                "role": "user",
                "content": request.message
            }

        ],

        "stream": False,

        "options": {

            "temperature": 0.2,

            "num_predict": 200

        }

    }


    try:

        response = requests.post(

            OLLAMA_URL,

            json=payload,

            timeout=120

        )


        print(
            "OLLAMA STATUS:",
            response.status_code
        )

        print(
            "OLLAMA RESPONSE:",
            response.text
        )


        response.raise_for_status()


        result = response.json()


        answer = result[
            "message"
        ][
            "content"
        ]


        return {

            "response": answer

        }


    except requests.exceptions.RequestException as error:

        print(
            "OLLAMA REQUEST ERROR:",
            repr(error)
        )

        raise HTTPException(

            status_code=500,

            detail=f"Ollama error: {error}"

        )


    except Exception as error:

        print(
            "CHAT ERROR:",
            repr(error)
        )

        raise HTTPException(

            status_code=500,

            detail=str(error)

        )