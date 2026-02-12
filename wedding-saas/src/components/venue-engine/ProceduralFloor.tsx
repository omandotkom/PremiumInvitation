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
  const geometry = useMemo(() => new THREE.PlaneGeometry(width, length), [width, length]);

  const material = useMemo(() => {
    // 1. CHECKERBOARD TEXTURE
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
    
    // 2. WOOD TEXTURE (Procedural Plank Pattern)
    if (config.type === 'wood') {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Background
      const baseColor = config.color || '#8B4513';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 1024, 1024);

      // Add grain noise
      // Simple noise function
      for (let i = 0; i < 50000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const w = Math.random() * 100 + 20; // Stretched width for grain
        const h = Math.random() * 2 + 1;    // Thin height
        
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
        ctx.fillRect(x, y, w, h);
      }

      // Add planks lines
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      const plankWidth = 128; // 8 planks across texture
      
      for (let x = 0; x <= 1024; x += plankWidth) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(width / 2, length / 2);
      
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.6,
        metalness: 0.1,
        color: config.color || '#8B4513'
      });
    }

    // 3. SAND TEXTURE (Procedural Noise)
    if (config.type === 'sand') {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Base color
      const baseColor = config.color || '#F4E4C1';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 512, 512);
      
      // Noise pass 1 (Small grains)
      const imageData = ctx.getImageData(0, 0, 512, 512);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Random variation: -10 to +10
        const noise = (Math.random() - 0.5) * 20;
        
        // Don't modify alpha (data[i+3])
        data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
        data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise)); // G
        data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise)); // B
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Sparkles (Mica in sand)
      for(let i=0; i<500; i++) {
         const x = Math.random() * 512;
         const y = Math.random() * 512;
         ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
         ctx.fillRect(x, y, 2, 2);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(width / 4, length / 4);
      
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1.0, // Sand is rough
        metalness: 0.0,
        color: config.color || '#F4E4C1'
      });
    }

    // Default Solid
    return new THREE.MeshStandardMaterial({
      color: config.color || '#FFFFFF',
      roughness: 0.9,
    });
  }, [config, width, length]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </mesh>
  );
}