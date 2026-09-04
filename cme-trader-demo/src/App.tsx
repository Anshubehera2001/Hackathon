import { useState } from "react";
import SpatialScene from "./components/SpatialScene";
import FloatingChatbot from "./components/FloatingChatbot";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Eye,
  Layers,
  TrendingDown,
  TrendingUp,
  Zap
} from "lucide-react";

import { markets } from "./data/markets";

import {
  scenarios
} from "./data/scenarios";


function App() {

  const [
    selectedMarket,
    setSelectedMarket
  ] = useState("ES");


  const [
    selectedScenario,
    setSelectedScenario
  ] = useState("normal");

  const [
    showSpatial,
    setShowSpatial
  ] = useState(false);

  const market = markets.find(
    item =>
      item.symbol === selectedMarket
  )!;


  const scenario =
    scenarios[selectedScenario];


  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="brand">

          <div className="logo">
            CME
          </div>

          <div>

            <h1>
              Trader Intelligence
            </h1>

            <p>
              Spatial Market Experience
            </p>

          </div>

        </div>


        <div className="headerRight">

          <span className="demoBadge">
            ● DEMO MODE
          </span>

          <span>
            Market Intelligence Prototype
          </span>

        </div>

      </header>


      {/* MAIN */}

      <main className="dashboard">


        {/* LEFT SIDEBAR */}

        <aside className="sidebar">

          <div className="sectionTitle">
            MY MARKETS
          </div>


          {markets.map(item => (

            <button
              key={item.symbol}

              className={
                selectedMarket === item.symbol
                  ? "marketCard active"
                  : "marketCard"
              }

              onClick={() =>
                setSelectedMarket(
                  item.symbol
                )
              }
            >

              <div className="marketTop">

                <strong>
                  {item.symbol}
                </strong>

                {item.change >= 0
                  ? <TrendingUp size={16} />
                  : <TrendingDown size={16} />
                }

              </div>


              <span>
                {item.name}
              </span>


              <div className="marketPrice">

                {item.price}

              </div>


              <small>
                {item.change >= 0
                  ? "+"
                  : ""}
                {item.change}%
              </small>

            </button>

          ))}


          <div className="sidebarBottom">

            <Eye size={18} />

            <div>

              <strong>
                Spatial View
              </strong>

              <span>
                Vision Pro Ready
              </span>

            </div>

          </div>

        </aside>


        {/* CENTER */}

        <section className="content">


          {/* MARKET HEADER */}

          <div className="marketHeader">

            <div>

              <div className="marketSymbol">

                {market.symbol}

                <span>
                  {market.assetClass}
                </span>

              </div>


              <h2>
                {market.name}
              </h2>

            </div>


            <div className="priceBlock">

              <strong>
                {market.price}
              </strong>

              <span>
                {market.change >= 0
                  ? "+"
                  : ""}
                {market.change}%
              </span>

            </div>

          </div>


          {/* MARKET PULSE */}

          <section className="panel pulsePanel">

            <div className="panelHeader">

              <div>

                <div className="eyebrow">
                  <Activity size={15} />
                  MARKET PULSE
                </div>

                <h3>
                  Current Market Condition
                </h3>

              </div>


              <div className="pulseNumber">

                {scenario.pulse}

              </div>

            </div>


            <div className="pulseBody">

              <div className="pulseState">

                {scenario.state}

              </div>


              <p>
                {scenario.description}
              </p>


              <div className="metrics">

                <Metric
                  name="Liquidity"
                  value={
                    scenario.liquidity.bid
                  }
                />

                <Metric
                  name="Volume"
                  value={
                    scenario.volume
                  }
                />

                <Metric
                  name="Volatility"
                  value={
                    scenario.volatility
                  }
                />

              </div>

            </div>

          </section>


          {/* LIQUIDITY */}

          <section className="panel">

            <div className="panelHeader">

              <div>

                <div className="eyebrow">
                  <Layers size={15} />
                  MARKET DEPTH
                </div>

                <h3>
                  Spatial Liquidity Map
                </h3>

              </div>

              <span className="liveIndicator">
                SIMULATED
              </span>

            </div>


            <LiquidityMap
              bidStrength={
                scenario.liquidity.bid
              }

              askStrength={
                scenario.liquidity.ask
              }

            />

          </section>


          {/* EVENT */}

          {scenario.event && (

            <section className="eventPanel">

              <div className="eventIcon">

                <AlertTriangle />

              </div>


              <div>

                <span>
                  MARKET EVENT
                </span>

                <h3>
                  {scenario.event.title}
                </h3>

                <p>
                  {scenario.event.description}
                </p>

              </div>


              <div className="severity">

                {scenario.event.severity}

              </div>

            </section>

          )}


          {/* CROSS ASSET */}

          <section className="panel">

            <div className="panelHeader">

              <div>

                <div className="eyebrow">
                  <BarChart3 size={15} />
                  MARKET CONTEXT
                </div>

                <h3>
                  Cross-Asset Relationships
                </h3>

              </div>

            </div>


            <div className="relationships">

              <Relationship
                left="ES"
                right="NQ"
                value="0.87"
              />

              <Relationship
                left="ES"
                right="ZN"
                value="-0.19"
              />

              <Relationship
                left="ES"
                right="GC"
                value="-0.04"
              />

              <Relationship
                left="ES"
                right="CL"
                value="0.18"
              />

            </div>

          </section>

        </section>


        {/* RIGHT PANEL */}

        <aside className="rightPanel">

          <div className="sectionTitle">
            TRADER CONTEXT
          </div>


          <div className="contextCard">

            <Zap size={22} />

            <h3>
              Attention Engine
            </h3>

            <p>
              Highlights information that
              may require trader attention.
            </p>

          </div>


          <div className="contextCard">

            <Layers size={22} />

            <h3>
              Spatial Mode
            </h3>

            <p>
              Converts market relationships
              into a spatial environment.
            </p>

            <button
              className="spatialButton"
              onClick={() =>
                setShowSpatial(true)
              }
            >

              <Eye size={16} />

              Preview Spatial View

            </button>

          </div>


          <div className="contextCard">

            <h3>
              Selected Market
            </h3>

            <div className="selectedLarge">
              {market.symbol}
            </div>

            <p>
              {market.name}
            </p>

          </div>

        </aside>

      </main>

      {showSpatial && (

        <div
          className="spatialOverlay"
        >

          <div
            className="spatialWindow"
          >

            <div
              className="spatialWindowHeader"
            >

              <div>

                <strong>
                  Spatial Trading Environment
                </strong>

                <span>
                  CME Trader Intelligence
                </span>

              </div>


              <button
                onClick={() =>
                  setShowSpatial(false)
                }
              >
                Close
              </button>

            </div>


            <SpatialScene
              selectedMarket={
                selectedMarket
              }

              selectedScenario={
                selectedScenario
              }

              onMarketSelect={
                setSelectedMarket
              }
            />

          </div>

        </div>

      )}

      <FloatingChatbot />

      {/* SCENARIO CONTROLLER */}

      <footer className="scenarioBar">

        <div>

          <strong>
            DEMO SCENARIOS
          </strong>

          <span>
            Trigger market conditions
          </span>

        </div>


        <div className="scenarioButtons">

          <ScenarioButton
            active={
              selectedScenario === "normal"
            }
            onClick={() =>
              setSelectedScenario(
                "normal"
              )
            }
          >
            Normal
          </ScenarioButton>


          <ScenarioButton
            active={
              selectedScenario ===
              "liquidityWithdrawal"
            }
            onClick={() =>
              setSelectedScenario(
                "liquidityWithdrawal"
              )
            }
          >
            Liquidity Withdrawal
          </ScenarioButton>


          <ScenarioButton
            active={
              selectedScenario ===
              "volatilitySpike"
            }
            onClick={() =>
              setSelectedScenario(
                "volatilitySpike"
              )
            }
          >
            Volatility Spike
          </ScenarioButton>


          <ScenarioButton
            active={
              selectedScenario ===
              "crossAssetShock"
            }
            onClick={() =>
              setSelectedScenario(
                "crossAssetShock"
              )
            }
          >
            Cross-Asset Shock
          </ScenarioButton>

        </div>

      </footer>

    </div>
  );
}


function Metric({
  name,
  value
}: {
  name: string;
  value: number;
}) {

  return (

    <div className="metric">

      <div className="metricHeader">

        <span>
          {name}
        </span>

        <strong>
          {value}
        </strong>

      </div>


      <div className="metricBar">

        <div
          style={{
            width: `${value}%`
          }}
        />

      </div>

    </div>
  );
}


function LiquidityMap({
  bidStrength,
  askStrength
}: {
  bidStrength: number;
  askStrength: number;
}) {

  const levels = [
    0,
    1,
    2,
    3,
    4,
    5,
    6
  ];


  return (

    <div className="liquidityMap">

      <div className="liquidityLabels">

        <span>
          SELL LIQUIDITY
        </span>

        <span>
          BUY LIQUIDITY
        </span>

      </div>


      {levels.map(level => {

        const ask =
          Math.max(
            10,
            askStrength -
            level * 6
          );

        const bid =
          Math.max(
            10,
            bidStrength -
            level * 6
          );


        return (

          <div
            className="liquidityRow"
            key={level}
          >

            <div className="ask">

              <div
                style={{
                  width: `${ask}%`
                }}
              />

            </div>


            <div className="priceLevel">

              {(
                6013 -
                level * 0.25
              ).toFixed(2)}

            </div>


            <div className="bid">

              <div
                style={{
                  width: `${bid}%`
                }}
              />

            </div>

          </div>

        );

      })}

    </div>
  );
}


function Relationship({
  left,
  right,
  value
}: {
  left: string;
  right: string;
  value: string;
}) {

  return (

    <div className="relationship">

      <strong>
        {left}
      </strong>

      <div className="connection">
        ─────────
      </div>

      <strong>
        {right}
      </strong>

      <span>
        {value}
      </span>

    </div>
  );
}


function ScenarioButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {

  return (

    <button
      className={
        active
          ? "scenario active"
          : "scenario"
      }

      onClick={onClick}
    >

      {children}

    </button>

  );
}


export default App;