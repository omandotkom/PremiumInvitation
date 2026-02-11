'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useEffect, useCallback } from 'react';
import { VenueConfig } from '@/types';
import { ProceduralFloor } from './ProceduralFloor';
import { ProceduralSeats } from './ProceduralSeats';
import { ProceduralAltar } from './ProceduralAltar';
import { ParticleField } from './ParticleField';
import * as THREE from 'three';

interface VenueRendererProps {
  config: VenueConfig;
  progress: number;
  onProgressChange: (progress: number) => void;
  isMobile?: boolean;
}

// Camera updater component
function CameraUpdater({ 
  config, 
  progress 
}: { 
  config: VenueConfig; 
  progress: number;
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    const { startZ, endZ } = config.cameraPath;
    const newZ = startZ + (endZ - startZ) * progress;
    camera.position.z = newZ;
  }, [progress, config.cameraPath, camera]);
  
  return null;
}

export function VenueRenderer({
  config,
  progress,
  onProgressChange,
  isMobile = false,
}: VenueRendererProps) {
  const cameraZ = useMemo(() => {
    const { startZ, endZ } = config.cameraPath;
    return startZ + (endZ - startZ) * progress;
  }, [progress, config.cameraPath]);

  const fogConfig = config.environment.fog;

  // Handle scroll untuk desktop
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = e.deltaY * 0.002;
    const newProgress = Math.max(0, Math.min(1, progress + delta));
    onProgressChange(newProgress);
  }, [progress, onProgressChange]);

  // Handle touch untuk mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    (e.currentTarget as HTMLDivElement).dataset.touchStartY = touch.clientY.toString();
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = parseFloat((e.currentTarget as HTMLDivElement).dataset.touchStartY || '0');
    const delta = (startY - touch.clientY) * 0.005;
    const newProgress = Math.max(0, Math.min(1, progress + delta));
    onProgressChange(newProgress);
    (e.currentTarget as HTMLDivElement).dataset.touchStartY = touch.clientY.toString();
  }, [progress, onProgressChange]);

  return (
    <div className="w-full h-screen relative">
      {/* Canvas container */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <Canvas
          camera={{
            position: [0, config.dimensions.cameraHeight, cameraZ],
            fov: config.cameraPath.fov,
            near: 0.1,
            far: 50,
          }}
          gl={{
            antialias: !isMobile,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ background: config.environment.backgroundColor, pointerEvents: 'none' }}
        >
          <CameraUpdater config={config} progress={progress} />
          
          {fogConfig && (
            <fog
              attach="fog"
              args={[fogConfig.color, fogConfig.near, fogConfig.far]}
            />
          )}

          <ambientLight intensity={config.environment.ambientLight} />

          {config.components.lighting.map((light, i) =>
            light.type === 'spot' ? (
              <spotLight
                key={i}
                position={light.position}
                intensity={light.intensity}
                color={light.color}
                angle={Math.PI / 6}
                penumbra={0.5}
                castShadow={!isMobile}
              />
            ) : light.type === 'point' ? (
              <pointLight
                key={i}
                position={light.position}
                intensity={light.intensity}
                color={light.color}
              />
            ) : null
          )}

          <Suspense fallback={null}>
            <ProceduralFloor config={config.components.floor} width={config.dimensions.width} length={config.dimensions.length} />
            
            <mesh
              position={[0, 0.01, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[config.dimensions.aisleWidth, config.dimensions.length]} />
              <meshStandardMaterial
                color={config.components.aisle.color}
                roughness={1}
              />
            </mesh>

            <ProceduralSeats
              config={config.components.seats}
              aisleWidth={config.dimensions.aisleWidth}
              isMobile={isMobile}
            />

            <ProceduralAltar
              config={config.components.altar}
              position={[0, 0, config.cameraPath.endZ]}
            />

            {config.components.particles && (
              <ParticleField
                config={config.components.particles}
                isMobile={isMobile}
              />
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* Interaction overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          cursor: 'ns-resize',
          touchAction: 'none'
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
    </div>
  );
}
