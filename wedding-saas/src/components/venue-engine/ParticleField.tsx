'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleConfig } from '@/types';

interface ParticleFieldProps {
  config: ParticleConfig;
  isMobile?: boolean;
}

function seededNoise(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField({ config, isMobile = false }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const count = isMobile ? Math.floor(config.count / 2) : config.count;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const n1 = seededNoise(i * 11 + 1);
      const n2 = seededNoise(i * 17 + 2);
      const n3 = seededNoise(i * 23 + 3);
      const n4 = seededNoise(i * 29 + 4);
      const n5 = seededNoise(i * 31 + 5);
      const n6 = seededNoise(i * 37 + 6);

      pos[i * 3] = (n1 - 0.5) * 10;
      pos[i * 3 + 1] = n2 * 5;
      pos[i * 3 + 2] = (n3 - 0.5) * 20;

      vel[i * 3] = (n4 - 0.5) * 0.008;
      vel[i * 3 + 1] = n5 * 0.009 + 0.002;
      vel[i * 3 + 2] = (n6 - 0.5) * 0.008;
    }

    return [pos, vel];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!meshRef.current) return;

    const positionAttribute = meshRef.current.geometry.attributes.position;
    const positionArray = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (positionArray[i * 3 + 1] > 5) {
        positionArray[i * 3 + 1] = 0;
        const n1 = seededNoise(i * 41 + positionArray[i * 3 + 1] + 7);
        const n2 = seededNoise(i * 43 + positionArray[i * 3 + 2] + 9);
        positionArray[i * 3] = (n1 - 0.5) * 10;
        positionArray[i * 3 + 2] = (n2 - 0.5) * 20;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={isMobile ? 0.045 : 0.06}
        color={config.color}
        transparent
        opacity={0.72}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
