'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { AltarConfig } from '@/types';

interface ProceduralAltarProps {
  config: AltarConfig;
  position: [number, number, number];
}

export function ProceduralAltar({ config, position }: ProceduralAltarProps) {
  const altarGroup = useMemo(() => {
    const group = new THREE.Group();

    if (config.type === 'arch-with-cross') {
      const pillarGeo = new THREE.CylinderGeometry(0.15, 0.15, config.height, 16);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: config.color,
        metalness: 0.6,
        roughness: 0.3,
      });

      const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
      leftPillar.position.set(-config.width / 2, config.height / 2, 0);
      leftPillar.castShadow = true;
      group.add(leftPillar);

      const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
      rightPillar.position.set(config.width / 2, config.height / 2, 0);
      rightPillar.castShadow = true;
      group.add(rightPillar);

      const archGeo = new THREE.TorusGeometry(config.width / 2, 0.15, 16, 100, Math.PI);
      const arch = new THREE.Mesh(archGeo, pillarMat);
      arch.position.set(0, config.height, 0);
      arch.castShadow = true;
      group.add(arch);

      const crossV = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 1, 0.1),
        pillarMat
      );
      crossV.position.set(0, config.height - 0.5, -0.2);
      group.add(crossV);

      const crossH = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.1, 0.1),
        pillarMat
      );
      crossH.position.set(0, config.height - 0.3, -0.2);
      group.add(crossH);
    } else if (config.type === 'floral-arch') {
      const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, config.height, 16);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: '#8D6E63',
        roughness: 0.8,
      });

      const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
      leftPillar.position.set(-config.width / 2, config.height / 2, 0);
      group.add(leftPillar);

      const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
      rightPillar.position.set(config.width / 2, config.height / 2, 0);
      group.add(rightPillar);

      const archGeo = new THREE.TorusGeometry(config.width / 2, 0.25, 16, 100, Math.PI);
      const flowerMat = new THREE.MeshStandardMaterial({
        color: config.color,
        roughness: 0.6,
      });
      const arch = new THREE.Mesh(archGeo, flowerMat);
      arch.position.set(0, config.height, 0);
      group.add(arch);
    }

    return group;
  }, [config]);

  return <primitive object={altarGroup} position={position} />;
}
