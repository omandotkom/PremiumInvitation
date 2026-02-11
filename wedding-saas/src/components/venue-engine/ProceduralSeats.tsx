'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { SeatsConfig } from '@/types';

interface ProceduralSeatsProps {
  config: SeatsConfig;
  aisleWidth: number;
  isMobile?: boolean;
}

export function ProceduralSeats({ config, aisleWidth, isMobile = false }: ProceduralSeatsProps) {
  const [leftSeats, rightSeats] = useMemo(() => {
    const geometry = new THREE.BoxGeometry(0.8, 1, 0.8);
    const material = new THREE.MeshStandardMaterial({ color: config.color });

    const totalSeats = config.countPerSide * 2;
    const mesh = new THREE.InstancedMesh(geometry, material, totalSeats);
    mesh.castShadow = !isMobile;
    mesh.receiveShadow = !isMobile;

    const dummy = new THREE.Object3D();
    let index = 0;

    const seatX = aisleWidth / 2 + 0.8;
    const startZ = -((config.countPerSide - 1) * config.spacing) / 2;

    for (let i = 0; i < config.countPerSide; i++) {
      dummy.position.set(-seatX, 0.5, startZ + i * config.spacing);
      dummy.updateMatrix();
      mesh.setMatrixAt(index++, dummy.matrix);
    }

    for (let i = 0; i < config.countPerSide; i++) {
      dummy.position.set(seatX, 0.5, startZ + i * config.spacing);
      dummy.updateMatrix();
      mesh.setMatrixAt(index++, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return [mesh, mesh];
  }, [config, aisleWidth, isMobile]);

  return <primitive object={leftSeats} />;
}
