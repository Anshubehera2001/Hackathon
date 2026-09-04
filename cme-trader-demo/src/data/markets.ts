export interface Market {
    symbol: string;
    name: string;
    assetClass: string;
    price: number;
    change: number;
    pulse: number;
    state: string;
    liquidity: number;
    volume: number;
    volatility: number;
  }
  
  export const markets: Market[] = [
    {
      symbol: "ES",
      name: "E-mini S&P 500",
      assetClass: "Equity Index",
      price: 6012.25,
      change: 0.42,
      pulse: 74,
      state: "BUY PRESSURE",
      liquidity: 72,
      volume: 68,
      volatility: 54
    },
  
    {
      symbol: "NQ",
      name: "E-mini Nasdaq-100",
      assetClass: "Equity Index",
      price: 21842.5,
      change: 0.71,
      pulse: 82,
      state: "STRONG BUY",
      liquidity: 78,
      volume: 84,
      volatility: 61
    },
  
    {
      symbol: "CL",
      name: "WTI Crude Oil",
      assetClass: "Energy",
      price: 64.25,
      change: -0.31,
      pulse: 51,
      state: "SELL PRESSURE",
      liquidity: 63,
      volume: 57,
      volatility: 72
    },
  
    {
      symbol: "GC",
      name: "Gold",
      assetClass: "Metals",
      price: 3425.6,
      change: 0.18,
      pulse: 43,
      state: "BALANCED",
      liquidity: 74,
      volume: 48,
      volatility: 39
    },
  
    {
      symbol: "6E",
      name: "Euro FX",
      assetClass: "FX",
      price: 1.1715,
      change: 0.11,
      pulse: 39,
      state: "BALANCED",
      liquidity: 69,
      volume: 44,
      volatility: 35
    },
  
    {
      symbol: "ZN",
      name: "10-Year Treasury",
      assetClass: "Interest Rates",
      price: 111.125,
      change: -0.08,
      pulse: 57,
      state: "SELL PRESSURE",
      liquidity: 66,
      volume: 53,
      volatility: 46
    }
  ];