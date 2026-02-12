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
  const [seatMesh, backrestMesh, legMesh] = useMemo(() => {
    const seatGeometry = new THREE.BoxGeometry(0.9, 0.12, 0.9);
    const backrestGeometry = new THREE.BoxGeometry(0.9, 0.55, 0.11);
    const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: config.color,
      roughness: 0.7,
      metalness: 0.08,
    });
    const legMaterial = new THREE.MeshStandardMaterial({
      color: '#4a2a16',
      roughness: 0.85,
      metalness: 0.03,
    });

    const totalSeats = config.countPerSide * 2;
    const seat = new THREE.InstancedMesh(seatGeometry, woodMaterial, totalSeats);
    const backrest = new THREE.InstancedMesh(backrestGeometry, woodMaterial, totalSeats);
    const leg = new THREE.InstancedMesh(legGeometry, legMaterial, totalSeats * 4);
    seat.castShadow = !isMobile;
    seat.receiveShadow = !isMobile;
    backrest.castShadow = !isMobile;
    backrest.receiveShadow = !isMobile;
    leg.castShadow = !isMobile;
    leg.receiveShadow = !isMobile;

    const dummy = new THREE.Object3D();
    let seatIndex = 0;
    let legIndex = 0;

    const seatX = aisleWidth / 2 + 0.95;
    const startZ = -((config.countPerSide - 1) * config.spacing) / 2;
    const legOffsets: [number, number][] = [
      [-0.35, -0.35],
      [0.35, -0.35],
      [-0.35, 0.35],
      [0.35, 0.35],
    ];

    const placeBench = (x: number, z: number) => {
      dummy.position.set(x, 0.6, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      seat.setMatrixAt(seatIndex, dummy.matrix);

      dummy.position.set(x, 0.95, z - 0.38);
      dummy.updateMatrix();
      backrest.setMatrixAt(seatIndex, dummy.matrix);

      for (const [ox, oz] of legOffsets) {
        dummy.position.set(x + ox, 0.31, z + oz);
        dummy.updateMatrix();
        leg.setMatrixAt(legIndex++, dummy.matrix);
      }

      seatIndex += 1;
    };

    for (let i = 0; i < config.countPerSide; i++) {
      placeBench(-seatX, startZ + i * config.spacing);
    }
    for (let i = 0; i < config.countPerSide; i++) {
      placeBench(seatX, startZ + i * config.spacing);
    }

    seat.instanceMatrix.needsUpdate = true;
    backrest.instanceMatrix.needsUpdate = true;
    leg.instanceMatrix.needsUpdate = true;

    return [seat, backrest, leg];
  }, [config, aisleWidth, isMobile]);

  return (
    <group>
      <primitive object={seatMesh} />
      <primitive object={backrestMesh} />
      <primitive object={legMesh} />
    </group>
  );
}
