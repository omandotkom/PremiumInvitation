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
      { type: 'ambient', intensity: 0.4 },
      { type: 'spot', position: [0, 5, -5], intensity: 1, color: '#FFD700' },
    ],
    particles: {
      type: 'dust-motes',
      count: 100,
      color: '#FFD700',
    },
  },
  environment: {
    backgroundColor: '#2C1810',
    fog: { color: '#2C1810', near: 10, far: 25 },
    ambientLight: 0.4,
  },
};
