import { useState } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface MarketIntelligenceProps {
  position?: [number, number, number];
  symbol?: string;
  risk?: number;
}

export default function MarketIntelligence({
  position = [0, 0.8, 0],
  symbol = "ES",
  risk = 82
}: MarketIntelligenceProps) {

  const [expanded, setExpanded] =
    useState(false);

  const [selectedSignal, setSelectedSignal] =
    useState<string | null>(null);

  const signals = [
    {
      name: "Liquidity",
      value: "-53%",
      direction: "↓",
      description:
        "Bid-side liquidity has decreased significantly around the current ES price."
    },
    {
      name: "Volume",
      value: "+79%",
      direction: "↑",
      description:
        "Trading volume has increased sharply compared with the demo baseline."
    },
    {
      name: "Volatility",
      value: "+67%",
      direction: "↑",
      description:
        "Short-term volatility has increased, indicating higher market uncertainty."
    }
  ];

  return (
    <group position={position}>

      {/* =========================
          CONNECTION TO ASSET
          ========================= */}

      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geometry) => {

            const points = [
              new THREE.Vector3(
                0,
                -0.5,
                0
              ),

              new THREE.Vector3(
                0,
                -1.3,
                0
              )
            ];

            geometry.setFromPoints(points);

          }}
        />

        <lineBasicMaterial
          color="#58728d"
          transparent
          opacity={0.5}
        />

      </line>


      {/* =========================
          INTELLIGENCE ORB
          ========================= */}

      <mesh
        onClick={(event) => {

          event.stopPropagation();

          setExpanded(
            previous => !previous
          );

        }}
      >

        <sphereGeometry
          args={[
            0.42,
            32,
            32
          ]}
        />

        <meshStandardMaterial
          color="#172c35"
          emissive="#183d35"
          emissiveIntensity={1.5}
          metalness={0.6}
          roughness={0.25}
        />

      </mesh>


      {/* OUTER RING */}

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0
        ]}
      >

        <torusGeometry
          args={[
            0.55,
            0.025,
            16,
            64
          ]}
        />

        <meshBasicMaterial
          color="#63d6a0"
          transparent
          opacity={0.8}
        />

      </mesh>


      {/* =========================
          ORB LABEL
          ========================= */}

      <Html
        position={[
          0,
          0,
          0.45
        ]}
        center
        distanceFactor={7}
      >

        <div
          className="intelligenceOrbLabel"
        >

          <div className="orbRisk">
            {risk}
          </div>

          <div className="orbSymbol">
            {symbol}
          </div>

        </div>

      </Html>


      {/* =========================
          EXPANDED VIEW
          ========================= */}

      {expanded && (

        <group>

          {/* RISK LABEL */}

          <Html
            position={[
              0,
              -0.9,
              0
            ]}
            center
            distanceFactor={6}
          >

            <div
              className="riskCard"
            >

              <div className="riskTitle">
                MARKET RISK
              </div>

              <div className="riskNumber">
                {risk}
              </div>

              <div className="riskStatus">
                HIGH
              </div>

            </div>

          </Html>


          {/* SIGNAL CARDS */}

          {signals.map(
            (signal, index) => {

              const positions = [
                [-2.0, 0.3, 0],
                [2.0, 0.3, 0],
                [0, 1.7, 0]
              ];

              return (

                <Html
                  key={signal.name}
                  position={
                    positions[index] as [
                      number,
                      number,
                      number
                    ]
                  }
                  center
                  distanceFactor={6}
                >

                  <button
                    className={
                      selectedSignal ===
                      signal.name
                        ? "signalCard active"
                        : "signalCard"
                    }

                    onClick={() =>
                      setSelectedSignal(
                        signal.name
                      )
                    }
                  >

                    <div className="signalName">
                      {signal.name}
                    </div>

                    <div className="signalValue">

                      <span>
                        {signal.direction}
                      </span>

                      {signal.value}

                    </div>

                  </button>

                </Html>

              );
            }
          )}


          {/* EXPLANATION */}

          {selectedSignal && (

            <Html
              position={[
                0,
                -2.0,
                0
              ]}
              center
              distanceFactor={6}
            >

              <div
                className="signalExplanation"
              >

                <div
                  className="explanationTitle"
                >
                  {selectedSignal}
                </div>

                <div>
                  {
                    signals.find(
                      signal =>
                        signal.name ===
                        selectedSignal
                    )?.description
                  }
                </div>

              </div>

            </Html>

          )}

        </group>

      )}

    </group>
  );
}