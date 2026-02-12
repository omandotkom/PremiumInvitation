'use client';

import { Clone, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

interface AssetKitChurchClassicProps {
  aisleWidth: number;
  countPerSide: number;
  spacing: number;
  altarZ: number;
}

export function AssetKitChurchClassic({
  aisleWidth,
  countPerSide,
  spacing,
  altarZ,
}: AssetKitChurchClassicProps) {
  const chairAsset = useGLTF('/models/church-classic/chair.glb');
  const lampAsset = useGLTF('/models/church-classic/lamp.glb');

  const chairPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const seatX = aisleWidth / 2 + 1.1;
    const startZ = -((countPerSide - 1) * spacing) / 2;

    for (let i = 0; i < countPerSide; i++) positions.push([-seatX, 0, startZ + i * spacing]);
    for (let i = 0; i < countPerSide; i++) positions.push([seatX, 0, startZ + i * spacing]);

    return positions;
  }, [aisleWidth, countPerSide, spacing]);

  const lampPositions: Array<[number, number, number]> = useMemo(() => {
    return [
      [-3.3, 0, altarZ + 0.8],
      [3.3, 0, altarZ + 0.8],
      [-3.3, 0, altarZ + 3.6],
      [3.3, 0, altarZ + 3.6],
    ];
  }, [altarZ]);

  return (
    <group>
      {chairPositions.map((position, i) => (
        <group key={`chair-${i}`} position={position} rotation={[0, Math.PI, 0]} scale={0.78}>
          <Clone object={chairAsset.scene} castShadow receiveShadow />
        </group>
      ))}

      {lampPositions.map((position, i) => (
        <group key={`lamp-${i}`} position={position} scale={0.52}>
          <Clone object={lampAsset.scene} castShadow receiveShadow />
          <pointLight
            position={[0, 1.3, 0]}
            intensity={0.22}
            distance={4}
            color="#ffdca8"
          />
        </group>
      ))}
    </group>
  );
}

useGLTF.preload('/models/church-classic/chair.glb');
useGLTF.preload('/models/church-classic/lamp.glb');
