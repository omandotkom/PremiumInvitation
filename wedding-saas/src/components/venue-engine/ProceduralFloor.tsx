'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { FloorConfig } from '@/types';

interface ProceduralFloorProps {
  config: FloorConfig;
  width: number;
  length: number;
}

export function ProceduralFloor({ config, width, length }: ProceduralFloorProps) {
  const material = useMemo(() => {
    if (config.type === 'checkerboard' && config.colors) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      const size = 64;
      for (let y = 0; y < 512; y += size) {
        for (let x = 0; x < 512; x += size) {
          ctx.fillStyle = ((x + y) / size) % 2 === 0 ? config.colors![0] : config.colors![1];
          ctx.fillRect(x, y, size, size);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(width / 2, length / 2);

      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
      });
    }

    return new THREE.MeshStandardMaterial({
      color: config.color || '#FFFFFF',
      roughness: 0.9,
    });
  }, [config, width, length]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[width, length]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
