interface LiquidityBarsProps {
    bidStrength: number;
    askStrength: number;
  }
  
  export default function LiquidityBars({
    bidStrength,
    askStrength
  }: LiquidityBarsProps) {
  
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
  
      <group
        position={[0, -1.7, 0]}
      >
  
        {levels.map(level => {
  
          const bid =
            Math.max(
              0.15,
              bidStrength / 100 -
              level * 0.05
            );
  
          const ask =
            Math.max(
              0.15,
              askStrength / 100 -
              level * 0.05
            );
  
          return (
  
            <group
              key={level}
              position={[
                0,
                level * 0.25,
                0
              ]}
            >
  
              {/* SELL */}
  
              <mesh
                position={[
                  -1.7,
                  0,
                  0
                ]}
              >
  
                <boxGeometry
                  args={[
                    ask * 3,
                    0.16,
                    0.25
                  ]}
                />
  
                <meshStandardMaterial
                  color="#a85360"
                  emissive="#35171d"
                  emissiveIntensity={0.5}
                />
  
              </mesh>
  
  
              {/* BUY */}
  
              <mesh
                position={[
                  1.7,
                  0,
                  0
                ]}
              >
  
                <boxGeometry
                  args={[
                    bid * 3,
                    0.16,
                    0.25
                  ]}
                />
  
                <meshStandardMaterial
                  color="#63bd8d"
                  emissive="#183d2b"
                  emissiveIntensity={0.5}
                />
  
              </mesh>
  
            </group>
  
          );
        })}
  
  
        {/* Center price line */}
  
        <mesh>
  
          <boxGeometry
            args={[
              0.04,
              2,
              0.04
            ]}
          />
  
          <meshBasicMaterial
            color="#aeb8c8"
          />
  
        </mesh>
  
      </group>
    );
  }