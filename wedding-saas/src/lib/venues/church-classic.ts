import { VenueConfig } from '@/types';

export const ChurchClassicConfig: VenueConfig = {
  id: 'church-classic',
  name: 'Gereja Klasik',
  slug: 'church-classic',
  price: 149000,
  description: 'Gereja klasik dengan interior elegan dan nuansa sakral yang kental',
  thumbnail: '/venues/church-classic.jpg',
  dimensions: {
    length: 20,
    width: 8,
    aisleWidth: 2,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 9,
    endZ: -6,
    fov: 60,
  },
  components: {
    floor: {
      type: 'checkerboard',
      colors: ['#FFFFFF', '#E8E8E8'],
      size: 1,
    },
    aisle: {
      type: 'carpet',
      color: '#C41E3A',
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 8,
      spacing: 1.5,
      color: '#8B4513',
    },
    altar: {
      type: 'arch-with-cross',
      height: 4,
      width: 3,
      color: '#D4AF37',
    },
    decorations: [
      {
        type: 'flower-pillar',
        position: [-3, 0, -5],
        flowerType: 'rose',
        color: '#FF69B4',
      },
      {
        type: 'flower-pillar',
        position: [3, 0, -5],
        flowerType: 'rose',
        color: '#FF69B4',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.72 },
      { type: 'spot', position: [0, 6.8, -5], intensity: 1.85, color: '#FFE5A3' },
      { type: 'point', position: [0, 4, 2], intensity: 0.7, color: '#FFF6E0' },
      { type: 'point', position: [-2.5, 3, -2], intensity: 0.45, color: '#FFD9A8' },
      { type: 'point', position: [2.5, 3, -2], intensity: 0.45, color: '#FFD9A8' },
      { type: 'point', position: [-3.2, 2.6, 1.5], intensity: 0.36, color: '#FFEBD1' },
      { type: 'point', position: [3.2, 2.6, 1.5], intensity: 0.36, color: '#FFEBD1' },
      { type: 'point', position: [0, 3.2, -7], intensity: 0.55, color: '#FFE0B2' },
      { type: 'point', position: [-1.3, 4.4, -5.8], intensity: 0.35, color: '#ffd28a' },
      { type: 'point', position: [1.3, 4.4, -5.8], intensity: 0.35, color: '#ffd28a' },
    ],
    particles: {
      type: 'dust-motes',
      count: 100,
      color: '#FFD700',
    },
  },
  environment: {
    backgroundColor: '#5B3B2A',
    interiorPreset: 'cathedral',
    assetKit: 'church-classic-v1',
    altarBackdrop: {
      imageUrl: '/backgrounds/church-interior.jpg',
      width: 8,
      height: 5.2,
      y: 2.8,
      zOffset: 0.55,
      opacity: 0.9,
      depth: 2.6,
      wallColor: '#3A2A20',
      frameColor: '#7A5B3A',
      frameThickness: 0.16,
    },
    fog: { color: '#7A5641', near: 18, far: 40 },
    ambientLight: 0.66,
  },
};
