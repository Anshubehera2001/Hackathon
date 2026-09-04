import {
    Canvas
} from "@react-three/fiber";

import {
    OrbitControls,
    Stars,
    Html
} from "@react-three/drei";

import MarketNode from "./MarketNode";

import RelationshipLine
    from "./RelationshipLine";

import LiquidityBars
    from "./LiquidityBars";

import { markets } from "../data/markets";

import {
    scenarios
} from "../data/scenarios";

import MarketIntelligence from "./MarketIntelligence";

interface SpatialSceneProps {

    selectedMarket: string;

    selectedScenario: string;

    onMarketSelect:
    (symbol: string) => void;
}


export default function SpatialScene({
    selectedMarket,
    selectedScenario,
    onMarketSelect
}: SpatialSceneProps) {


    const scenario =
        scenarios[selectedScenario];


    const es =
        markets.find(
            market =>
                market.symbol === "ES"
        )!;


    const nq =
        markets.find(
            market =>
                market.symbol === "NQ"
        )!;


    const zn =
        markets.find(
            market =>
                market.symbol === "ZN"
        )!;


    const gc =
        markets.find(
            market =>
                market.symbol === "GC"
        )!;


    const cl =
        markets.find(
            market =>
                market.symbol === "CL"
        )!;


    return (

        <div
            style={{
                position: "relative",
                width: "100%",
                height: "650px",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#050810",
                border:
                    "1px solid #252d3b"
            }}
        >

            {/* TITLE */}

            <div
                style={{
                    position: "absolute",
                    zIndex: 10,
                    top: 20,
                    left: 25,
                    color: "white",
                    fontFamily:
                        "Inter, Arial, sans-serif"
                }}
            >

                <div
                    style={{
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        color: "#758195"
                    }}
                >
                    SPATIAL MARKET VIEW
                </div>


                <div
                    style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        marginTop: "4px"
                    }}
                >
                    Market Intelligence
                </div>

            </div>


            {/* PULSE */}

            <div
                style={{
                    position: "absolute",
                    zIndex: 10,
                    top: 20,
                    right: 25,
                    textAlign: "right",
                    fontFamily:
                        "Inter, Arial, sans-serif"
                }}
            >

                <div
                    style={{
                        fontSize: "9px",
                        color: "#758195",
                        letterSpacing: "1px"
                    }}
                >
                    MARKET PULSE
                </div>


                <div
                    style={{
                        fontSize: "30px",
                        fontWeight: 800,
                        color: "#7ee2ae"
                    }}
                >
                    {scenario.pulse}
                </div>


                <div
                    style={{
                        fontSize: "9px",
                        color: "#8d98aa"
                    }}
                >
                    {scenario.state}
                </div>

            </div>


            <Canvas
                camera={{
                    position: [
                        0,
                        3,
                        9
                    ],
                    fov: 50
                }}
            >

                {/* LIGHTING */}

                <ambientLight
                    intensity={0.5}
                />

                <pointLight
                    position={[0, 5, 4]}
                    intensity={2}
                />

                <pointLight
                    position={[-5, 2, -3]}
                    intensity={1}
                />


                {/* BACKGROUND */}

                <Stars
                    radius={40}
                    depth={20}
                    count={1500}
                    factor={2}
                    saturation={0}
                    fade
                />


                {/* FLOOR */}

                <gridHelper
                    args={[
                        20,
                        20,
                        "#1c2635",
                        "#101620"
                    ]}
                    position={[
                        0,
                        -2,
                        0
                    ]}
                />


                {/* CENTRAL ES */}

                <MarketNode
                    symbol="ES"
                    name={es.name}
                    position={[0, 1, 0]}
                    price={es.price}
                    pulse={scenario.pulse}
                    selected={
                        selectedMarket === "ES"
                    }
                    onClick={() =>
                        onMarketSelect("ES")
                    }
                />
                <mesh
                    rotation={[
                        Math.PI / 2,
                        0,
                        0
                    ]}
                    position={[
                        0,
                        1,
                        0
                    ]}
                >

                    <torusGeometry
                        args={[
                            1.15,
                            0.035,
                            16,
                            64
                        ]}
                    />

                    <meshBasicMaterial
                        color="#7ee2ae"
                        transparent
                        opacity={
                            scenario.pulse / 100
                        }
                    />

                </mesh>

                {/* NQ */}

                <MarketNode
                    symbol="NQ"
                    name={nq.name}
                    position={[-4, 2, -1]}
                    price={nq.price}
                    pulse={nq.pulse}
                    selected={
                        selectedMarket === "NQ"
                    }
                    onClick={() =>
                        onMarketSelect("NQ")
                    }
                />


                {/* ZN */}

                <MarketNode
                    symbol="ZN"
                    name={zn.name}
                    position={[4, 2, -1]}
                    price={zn.price}
                    pulse={zn.pulse}
                    selected={
                        selectedMarket === "ZN"
                    }
                    onClick={() =>
                        onMarketSelect("ZN")
                    }
                />


                {/* GC */}

                <MarketNode
                    symbol="GC"
                    name={gc.name}
                    position={[-3, -0.5, -2]}
                    price={gc.price}
                    pulse={gc.pulse}
                    selected={
                        selectedMarket === "GC"
                    }
                    onClick={() =>
                        onMarketSelect("GC")
                    }
                />


                {/* CL */}

                <MarketNode
                    symbol="CL"
                    name={cl.name}
                    position={[3, -0.5, -2]}
                    price={cl.price}
                    pulse={cl.pulse}
                    selected={
                        selectedMarket === "CL"
                    }
                    onClick={() =>
                        onMarketSelect("CL")
                    }
                />


                {/* RELATIONSHIPS */}

                <RelationshipLine
                    start={[0, 1, 0]}
                    end={[-4, 2, -1]}
                    strength={0.87}
                />


                <RelationshipLine
                    start={[0, 1, 0]}
                    end={[4, 2, -1]}
                    strength={-0.19}
                />


                <RelationshipLine
                    start={[0, 1, 0]}
                    end={[-3, -0.5, -2]}
                    strength={-0.04}
                />


                <RelationshipLine
                    start={[0, 1, 0]}
                    end={[3, -0.5, -2]}
                    strength={0.18}
                />

                <MarketIntelligence
                    position={[
                        0,
                        1.5,
                        0
                    ]}
                    symbol="ES"
                    risk={82}
                />

                {/* LIQUIDITY */}

                <LiquidityBars
                    bidStrength={
                        scenario.liquidity.bid
                    }
                    askStrength={
                        scenario.liquidity.ask
                    }
                />


                {/* LIQUIDITY LABEL */}

                <Html
                    position={[
                        -3.8,
                        -1.2,
                        0
                    ]}
                >

                    <div
                        style={{
                            color: "#a85360",
                            fontSize: "10px",
                            fontFamily:
                                "Inter, Arial"
                        }}
                    >
                        SELL LIQUIDITY
                    </div>

                </Html>


                <Html
                    position={[
                        3.1,
                        -1.2,
                        0
                    ]}
                >

                    <div
                        style={{
                            color: "#63bd8d",
                            fontSize: "10px",
                            fontFamily:
                                "Inter, Arial"
                        }}
                    >
                        BUY LIQUIDITY
                    </div>

                </Html>


                {/* EVENT */}

                {scenario.event && (

                    <Html
                        position={[
                            0,
                            3.1,
                            0
                        ]}
                    >

                        <div
                            style={{
                                width: "220px",
                                padding: "10px 14px",
                                borderRadius: "7px",
                                background:
                                    "rgba(55,20,25,.95)",
                                border:
                                    "1px solid #8c4d57",
                                color: "#f0c4c9",
                                textAlign: "center",
                                fontFamily:
                                    "Inter, Arial"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "9px",
                                    letterSpacing: "1px"
                                }}
                            >
                                MARKET EVENT
                            </div>


                            <strong
                                style={{
                                    display: "block",
                                    fontSize: "13px",
                                    marginTop: "4px"
                                }}
                            >
                                {scenario.event.title}
                            </strong>

                        </div>

                    </Html>

                )}


                {/* CONTROLS */}

                <OrbitControls
                    enableDamping
                    dampingFactor={0.08}
                    minDistance={5}
                    maxDistance={16}
                />

            </Canvas>


            {/* LEGEND */}

            <div
                style={{
                    position: "absolute",
                    left: 25,
                    bottom: 20,
                    zIndex: 10,
                    display: "flex",
                    gap: "18px",
                    fontFamily:
                        "Inter, Arial",
                    fontSize: "9px",
                    color: "#788497"
                }}
            >

                <span>
                    🟢 Positive relationship
                </span>

                <span>
                    🔴 Negative relationship
                </span>

                <span>
                    Drag to rotate
                </span>

            </div>

        </div>
    );
}