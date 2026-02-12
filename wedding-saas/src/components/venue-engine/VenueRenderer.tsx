'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense, useMemo, useCallback, useState } from 'react';
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { VenueConfig } from '@/types';
import { ProceduralFloor } from './ProceduralFloor';
import { ProceduralSeats } from './ProceduralSeats';
import { ProceduralAltar } from './ProceduralAltar';
import { ParticleField } from './ParticleField';
import { ProceduralArchitecture } from './ProceduralArchitecture';
import { AssetKitChurchClassic } from './AssetKitChurchClassic';
import * as THREE from 'three';

interface VenueRendererProps {
  config: VenueConfig;
  progress: number;
  onProgressChange: (progress: number) => void;
  isMobile?: boolean;
}

function AltarBackdrop({
  imageUrl,
  width,
  height,
  y,
  z,
  opacity = 1,
  depth = 2.2,
  wallColor = '#3B2A22',
  frameColor = '#6E4B2F',
  frameThickness = 0.14,
}: {
  imageUrl: string;
  width: number;
  height: number;
  y: number;
  z: number;
  opacity?: number;
  depth?: number;
  wallColor?: string;
  frameColor?: string;
  frameThickness?: number;
}) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.9,
    });
  }, [wallColor]);
  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: frameColor,
      roughness: 0.65,
      metalness: 0.1,
    });
  }, [frameColor]);

  return (
    <group>
      <mesh position={[0, y, z]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent opacity={opacity} toneMapped={false} />
      </mesh>

      <mesh position={[-width / 2, y, z + depth / 2]} rotation={[0, Math.PI / 2, 0]} material={wallMaterial}>
        <planeGeometry args={[depth, height]} />
      </mesh>
      <mesh position={[width / 2, y, z + depth / 2]} rotation={[0, -Math.PI / 2, 0]} material={wallMaterial}>
        <planeGeometry args={[depth, height]} />
      </mesh>
      <mesh position={[0, y + height / 2, z + depth / 2]} rotation={[-Math.PI / 2, 0, 0]} material={wallMaterial}>
        <planeGeometry args={[width, depth]} />
      </mesh>

      <mesh position={[0, y + height / 2 + frameThickness / 2, z + 0.02]} material={frameMaterial}>
        <boxGeometry args={[width + frameThickness * 2, frameThickness, frameThickness]} />
      </mesh>
      <mesh position={[0, y - height / 2 - frameThickness / 2, z + 0.02]} material={frameMaterial}>
        <boxGeometry args={[width + frameThickness * 2, frameThickness, frameThickness]} />
      </mesh>
      <mesh position={[-width / 2 - frameThickness / 2, y, z + 0.02]} material={frameMaterial}>
        <boxGeometry args={[frameThickness, height + frameThickness * 2, frameThickness]} />
      </mesh>
      <mesh position={[width / 2 + frameThickness / 2, y, z + 0.02]} material={frameMaterial}>
        <boxGeometry args={[frameThickness, height + frameThickness * 2, frameThickness]} />
      </mesh>
    </group>
  );
}

export function VenueRenderer({
  config,
  progress,
  onProgressChange,
  isMobile = false,
}: VenueRendererProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const fxBloom = isMobile ? 0.17 : 0.28;
  const fxVignette = isMobile ? 0.2 : 0.35;
  const cameraPosition: [number, number, number] = useMemo(() => {
    const { startZ, endZ } = config.cameraPath;
    const newZ = startZ + (endZ - startZ) * progress;
    const bob = Math.sin(progress * Math.PI * 4) * 0.04;
    return [parallax.x * 0.45, config.dimensions.cameraHeight + parallax.y * 0.22 + bob, newZ];
  }, [progress, parallax, config.cameraPath, config.dimensions.cameraHeight]);
  const cameraRotation: [number, number, number] = useMemo(() => {
    const pitch = -parallax.y * 0.06;
    const yaw = parallax.x * 0.12;
    const roll = -parallax.x * 0.02;
    return [pitch, yaw, roll];
  }, [parallax]);

  const fogConfig = config.environment.fog;
  const containerStyle = config.environment.backgroundImageUrl
    ? {
        backgroundImage: `url(${config.environment.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: config.environment.backgroundColor,
      };

  // Handle scroll untuk desktop
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = e.deltaY * 0.002;
    const newProgress = Math.max(0, Math.min(1, progress + delta));
    onProgressChange(newProgress);
  }, [progress, onProgressChange]);

  // Handle touch untuk mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const normalizedX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;

    (e.currentTarget as HTMLDivElement).dataset.touchStartY = touch.clientY.toString();
    setParallax({ x: normalizedX, y: -normalizedY });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const startY = parseFloat((e.currentTarget as HTMLDivElement).dataset.touchStartY || '0');
    const delta = (startY - touch.clientY) * 0.005;
    const newProgress = Math.max(0, Math.min(1, progress + delta));
    const normalizedX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;

    onProgressChange(newProgress);
    setParallax({ x: normalizedX, y: -normalizedY });
    (e.currentTarget as HTMLDivElement).dataset.touchStartY = touch.clientY.toString();
  }, [progress, onProgressChange]);

  const handleTouchEnd = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setParallax({ x: normalizedX, y: -normalizedY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <div className="w-full h-screen relative" style={containerStyle}>
      {/* Canvas container */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <Canvas
          shadows
          camera={{
            position: cameraPosition,
            rotation: cameraRotation,
            fov: config.cameraPath.fov,
            near: 0.1,
            far: 50,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          style={{ pointerEvents: 'none' }}
        >
          {!config.environment.backgroundImageUrl && (
            <color attach="background" args={[config.environment.backgroundColor]} />
          )}

          {fogConfig && (
            <fog
              attach="fog"
              args={[fogConfig.color, fogConfig.near, fogConfig.far]}
            />
          )}

          <ambientLight intensity={config.environment.ambientLight} />
          <hemisphereLight
            args={['#fff6e8', '#3f2e22', isMobile ? 0.2 : 0.28]}
          />
          <directionalLight
            position={[4, 8, 5]}
            intensity={isMobile ? 0.4 : 0.65}
            color="#fff3df"
            castShadow={!isMobile}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={35}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />

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
            {config.environment.interiorPreset === 'cathedral' && (
              <ProceduralArchitecture
                width={config.dimensions.width}
                length={config.dimensions.length}
                altarZ={config.cameraPath.endZ}
                isMobile={isMobile}
              />
            )}

            <ProceduralFloor config={config.components.floor} width={config.dimensions.width} length={config.dimensions.length} />
            
            <mesh
              position={[0, 0.01, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <planeGeometry args={[config.dimensions.aisleWidth, config.dimensions.length]} />
              <meshStandardMaterial
                color={config.components.aisle.color}
                roughness={0.78}
                metalness={0.06}
              />
            </mesh>
            <mesh
              position={[-config.dimensions.aisleWidth / 2 + 0.04, 0.015, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.08, config.dimensions.length]} />
              <meshStandardMaterial color="#e4c78a" roughness={0.35} metalness={0.6} />
            </mesh>
            <mesh
              position={[config.dimensions.aisleWidth / 2 - 0.04, 0.015, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.08, config.dimensions.length]} />
              <meshStandardMaterial color="#e4c78a" roughness={0.35} metalness={0.6} />
            </mesh>

            {config.environment.assetKit === 'church-classic-v1' ? (
              <AssetKitChurchClassic
                aisleWidth={config.dimensions.aisleWidth}
                countPerSide={config.components.seats.countPerSide}
                spacing={config.components.seats.spacing}
                altarZ={config.cameraPath.endZ}
              />
            ) : (
              <ProceduralSeats
                config={config.components.seats}
                aisleWidth={config.dimensions.aisleWidth}
                isMobile={isMobile}
              />
            )}

            <ProceduralAltar
              config={config.components.altar}
              position={[0, 0, config.cameraPath.endZ]}
            />

            {config.environment.altarBackdrop && (
              <AltarBackdrop
                imageUrl={config.environment.altarBackdrop.imageUrl}
                width={config.environment.altarBackdrop.width}
                height={config.environment.altarBackdrop.height}
                y={config.environment.altarBackdrop.y}
                z={config.cameraPath.endZ - (config.environment.altarBackdrop.zOffset ?? 0.6)}
                opacity={config.environment.altarBackdrop.opacity}
                depth={config.environment.altarBackdrop.depth}
                wallColor={config.environment.altarBackdrop.wallColor}
                frameColor={config.environment.altarBackdrop.frameColor}
                frameThickness={config.environment.altarBackdrop.frameThickness}
              />
            )}

            {config.components.particles && (
              <ParticleField
                config={config.components.particles}
                isMobile={isMobile}
              />
            )}

            <EffectComposer multisampling={isMobile ? 0 : 4}>
              <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
              <Bloom
                intensity={fxBloom}
                luminanceThreshold={0.62}
                luminanceSmoothing={0.25}
                mipmapBlur
              />
              <Vignette
                eskil={false}
                offset={0.18}
                darkness={fxVignette}
              />
            </EffectComposer>
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}
