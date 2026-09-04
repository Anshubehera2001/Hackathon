MARKET_DATA = {

    "ES": {
        "name": "E-mini S&P 500",
        "price": 6012.25,
        "change": "+0.82%",
        "volume": 79,
        "volatility": 67,
        "bid_liquidity": 34,
        "ask_liquidity": 72,
        "risk": "HIGH",

        "relationships": {
            "NQ": 0.87,
            "ZN": -0.19,
            "GC": -0.04,
            "CL": 0.18
        }
    },

    "NQ": {
        "name": "E-mini Nasdaq 100",
        "price": 21480.50,
        "change": "+1.14%",
        "volume": 83,
        "volatility": 71,
        "bid_liquidity": 48,
        "ask_liquidity": 61,
        "risk": "HIGH",

        "relationships": {
            "ES": 0.87,
            "ZN": -0.12,
            "GC": 0.03,
            "CL": 0.11
        }
    },

    "GC": {
        "name": "Gold Futures",
        "price": 3421.80,
        "change": "-0.21%",
        "volume": 58,
        "volatility": 54,
        "bid_liquidity": 63,
        "ask_liquidity": 49,
        "risk": "MEDIUM",

        "relationships": {
            "ES": -0.04,
            "NQ": 0.03,
            "ZN": 0.31,
            "CL": 0.22
        }
    },

    "CL": {
        "name": "Crude Oil",
        "price": 68.42,
        "change": "+0.64%",
        "volume": 71,
        "volatility": 64,
        "bid_liquidity": 51,
        "ask_liquidity": 67,
        "risk": "MEDIUM",

        "relationships": {
            "ES": 0.18,
            "NQ": 0.11,
            "GC": 0.22,
            "ZN": -0.08
        }
    },

    "ZN": {
        "name": "10-Year Treasury Note",
        "price": 111.15625,
        "change": "-0.08%",
        "volume": 64,
        "volatility": 43,
        "bid_liquidity": 72,
        "ask_liquidity": 55,
        "risk": "LOW",

        "relationships": {
            "ES": -0.19,
            "NQ": -0.12,
            "GC": 0.31,
            "CL": -0.08
        }
    }
}