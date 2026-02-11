'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleConfig } from '@/types';

interface ParticleFieldProps {
  config: ParticleConfig;
  isMobile?: boolean;
}

export function ParticleField({ config, isMobile = false }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const count = isMobile ? Math.floor(config.count / 2) : config.count;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.01 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
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
        positionArray[i * 3] = (Math.random() - 0.5) * 10;
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={config.color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
