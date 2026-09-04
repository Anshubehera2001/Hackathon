export interface Scenario {
    id: string;
    title: string;
    description: string;
    pulse: number;
    state: string;
  
    liquidity: {
      bid: number;
      ask: number;
    };
  
    volume: number;
    volatility: number;
  
    event?: {
      title: string;
      description: string;
      severity: string;
    };
  }
  
  export const scenarios: Record<string, Scenario> = {
  
    normal: {
      id: "normal",
  
      title: "Normal Market",
  
      description:
        "Market conditions remain balanced with normal liquidity.",
  
      pulse: 48,
  
      state: "BALANCED",
  
      liquidity: {
        bid: 72,
        ask: 68
      },
  
      volume: 52,
  
      volatility: 41
    },
  
  
    liquidityWithdrawal: {
      id: "liquidityWithdrawal",
  
      title: "Liquidity Withdrawal",
  
      description:
        "Large bid-side liquidity disappears near the current price.",
  
      pulse: 82,
  
      state: "HIGH RISK",
  
      liquidity: {
        bid: 34,
        ask: 72
      },
  
      volume: 79,
  
      volatility: 67,
  
      event: {
        title: "Liquidity Withdrawal Detected",
  
        description:
          "Significant liquidity disappeared near the current market price.",
  
        severity: "HIGH"
      }
    },
  
  
    volatilitySpike: {
      id: "volatilitySpike",
  
      title: "Volatility Spike",
  
      description:
        "Trading activity and price movement increase significantly.",
  
      pulse: 91,
  
      state: "EXTREME ACTIVITY",
  
      liquidity: {
        bid: 48,
        ask: 51
      },
  
      volume: 96,
  
      volatility: 94,
  
      event: {
        title: "Volatility Spike",
  
        description:
          "Market activity has increased significantly.",
  
        severity: "HIGH"
      }
    },
  
  
    crossAssetShock: {
      id: "crossAssetShock",
  
      title: "Cross-Asset Shock",
  
      description:
        "Multiple related markets move simultaneously.",
  
      pulse: 88,
  
      state: "RISK-OFF",
  
      liquidity: {
        bid: 39,
        ask: 67
      },
  
      volume: 91,
  
      volatility: 87,
  
      event: {
        title: "Cross-Asset Movement",
  
        description:
          "ES and NQ move lower while rates strengthen.",
  
        severity: "HIGH"
      }
    }
  };