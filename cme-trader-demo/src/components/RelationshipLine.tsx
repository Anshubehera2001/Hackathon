import { Line } from "@react-three/drei";

interface RelationshipLineProps {
  start: [number, number, number];
  end: [number, number, number];
  strength: number;
}

export default function RelationshipLine({
  start,
  end,
  strength
}: RelationshipLineProps) {

  const opacity =
    Math.min(
      0.9,
      Math.abs(strength)
    );

  return (

    <Line
      points={[
        start,
        end
      ]}
      color={
        strength >= 0
          ? "#6fdaa0"
          : "#d66f7b"
      }
      lineWidth={
        Math.max(
          1,
          Math.abs(strength) * 4
        )
      }
      transparent
      opacity={opacity}
    />

  );
}