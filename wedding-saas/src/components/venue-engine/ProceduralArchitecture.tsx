'use client';

import { useMemo } from 'react';

interface ProceduralArchitectureProps {
  width: number;
  length: number;
  altarZ: number;
  isMobile?: boolean;
}

export function ProceduralArchitecture({
  width,
  length,
  altarZ,
  isMobile = false,
}: ProceduralArchitectureProps) {
  const wallY = 3.2;
  const wallHeight = 6.4;
  const sideX = width / 2 + 1.15;
  const hallCenterZ = (altarZ + length / 2) / 2;
  const hallDepth = length / 2 - altarZ + 1.2;

  const archPositions = useMemo(() => {
    const positions: number[] = [];
    const start = altarZ + 1.4;
    const end = length / 2 - 0.6;
    for (let z = start; z <= end; z += 2.2) positions.push(z);
    return positions;
  }, [altarZ, length]);

  const columnPositions = useMemo(() => {
    const positions: number[] = [];
    const start = altarZ + 1.2;
    const end = length / 2 - 0.6;
    for (let z = start; z <= end; z += 3.1) positions.push(z);
    return positions;
  }, [altarZ, length]);

  const stainedGlassZ = useMemo(() => {
    const positions: number[] = [];
    const start = altarZ + 2;
    const end = length / 2 - 1.5;
    for (let z = start; z <= end; z += 4.2) positions.push(z);
    return positions;
  }, [altarZ, length]);

  return (
    <group>
      <mesh position={[0, wallY, hallCenterZ]} receiveShadow>
        <boxGeometry args={[0.22, wallHeight, hallDepth]} />
        <meshStandardMaterial color="#d9c7ad" roughness={0.85} metalness={0.03} />
      </mesh>

      <mesh position={[-sideX, wallY, hallCenterZ]} receiveShadow>
        <boxGeometry args={[0.28, wallHeight, hallDepth]} />
        <meshStandardMaterial color="#c7ae8d" roughness={0.82} metalness={0.04} />
      </mesh>
      <mesh position={[sideX, wallY, hallCenterZ]} receiveShadow>
        <boxGeometry args={[0.28, wallHeight, hallDepth]} />
        <meshStandardMaterial color="#c7ae8d" roughness={0.82} metalness={0.04} />
      </mesh>

      <mesh position={[0, wallHeight, hallCenterZ]} receiveShadow>
        <boxGeometry args={[width + 2.6, 0.25, hallDepth]} />
        <meshStandardMaterial color="#b59674" roughness={0.72} metalness={0.05} />
      </mesh>

      {archPositions.map((z, i) => (
        <mesh key={`arch-${i}`} position={[0, 4.45, z]} rotation={[0, 0, Math.PI / 2]} castShadow={!isMobile}>
          <torusGeometry args={[sideX + 0.06, 0.1, 12, 48, Math.PI]} />
          <meshStandardMaterial color="#9a7c5a" roughness={0.75} metalness={0.08} />
        </mesh>
      ))}

      {columnPositions.map((z, i) => (
        <group key={`col-${i}`}>
          <mesh position={[-sideX + 0.18, 1.55, z]} castShadow={!isMobile} receiveShadow>
            <cylinderGeometry args={[0.13, 0.16, 3.1, 12]} />
            <meshStandardMaterial color="#8f6b49" roughness={0.78} metalness={0.05} />
          </mesh>
          <mesh position={[sideX - 0.18, 1.55, z]} castShadow={!isMobile} receiveShadow>
            <cylinderGeometry args={[0.13, 0.16, 3.1, 12]} />
            <meshStandardMaterial color="#8f6b49" roughness={0.78} metalness={0.05} />
          </mesh>
        </group>
      ))}

      {stainedGlassZ.map((z, i) => (
        <group key={`glass-${i}`}>
          <mesh position={[-sideX + 0.16, 3.35, z]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.25, 1.8]} />
            <meshBasicMaterial color="#6ea4ff" transparent opacity={0.22} />
          </mesh>
          <mesh position={[sideX - 0.16, 3.35, z]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[1.25, 1.8]} />
            <meshBasicMaterial color="#f39bd4" transparent opacity={0.22} />
          </mesh>
          {!isMobile && (
            <>
              <pointLight position={[-sideX + 0.55, 3.35, z]} intensity={0.14} color="#8bb7ff" />
              <pointLight position={[sideX - 0.55, 3.35, z]} intensity={0.14} color="#ffc0e9" />
            </>
          )}
        </group>
      ))}
    </group>
  );
}
