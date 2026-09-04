import { Html } from "@react-three/drei";
import { useState } from "react";

interface MarketNodeProps {
  symbol: string;
  name: string;
  position: [number, number, number];
  price: number;
  pulse: number;
  selected?: boolean;
  onClick?: () => void;
}

export default function MarketNode({
  symbol,
  name,
  position,
  price,
  pulse,
  selected = false,
  onClick
}: MarketNodeProps) {

  const [hovered, setHovered] =
    useState(false);

  const scale =
    hovered || selected
      ? 1.15
      : 1;

  return (
    <group
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      onPointerOver={() =>
        setHovered(true)
      }
      onPointerOut={() =>
        setHovered(false)
      }
    >

      {/* Main sphere */}

      <mesh>

        <sphereGeometry
          args={[0.65, 32, 32]}
        />

        <meshStandardMaterial
          color={
            selected
              ? "#7ee2ae"
              : "#263449"
          }

          emissive={
            selected
              ? "#234d3a"
              : "#101722"
          }

          emissiveIntensity={0.8}

          roughness={0.35}
        />

      </mesh>


      {/* Outer ring */}

      <mesh rotation={[Math.PI / 2, 0, 0]}>

        <torusGeometry
          args={[
            0.82,
            0.025,
            12,
            48
          ]}
        />

        <meshBasicMaterial
          color={
            selected
              ? "#7ee2ae"
              : "#43536b"
          }
        />

      </mesh>


      {/* Information */}

      <Html
        center
        distanceFactor={8}
      >

        <div
          style={{
            width: "150px",
            padding: "10px",
            borderRadius: "8px",
            background:
              "rgba(8,12,20,0.92)",
            border:
              "1px solid rgba(130,150,180,.35)",
            color: "white",
            textAlign: "center",
            pointerEvents: "none",
            fontFamily:
              "Inter, Arial, sans-serif"
          }}
        >

          <div
            style={{
              fontSize: "18px",
              fontWeight: 800
            }}
          >
            {symbol}
          </div>


          <div
            style={{
              fontSize: "10px",
              color: "#7e899c",
              marginTop: "3px"
            }}
          >
            {name}
          </div>


          <div
            style={{
              fontSize: "14px",
              marginTop: "8px"
            }}
          >
            {price}
          </div>


          <div
            style={{
              fontSize: "10px",
              color: "#7ee2ae",
              marginTop: "4px"
            }}
          >
            Pulse {pulse}
          </div>

        </div>

      </Html>

    </group>
  );
}