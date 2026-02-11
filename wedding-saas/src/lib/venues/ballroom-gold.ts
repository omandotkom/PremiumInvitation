import { VenueConfig } from '@/types';

export const BallroomGoldConfig: VenueConfig = {
  id: 'ballroom-gold',
  name: 'Ballroom Gold',
  slug: 'ballroom-gold',
  price: 299000,
  description: 'Ballroom mewah dengan sentuhan emas yang elegan dan glamour',
  thumbnail: '/venues/ballroom-gold.jpg',
  dimensions: {
    length: 24,
    width: 14,
    aisleWidth: 3,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 10,
    endZ: -9,
    fov: 60,
  },
  components: {
    floor: {
      type: 'checkerboard',
      colors: ['#1a1a1a', '#2d2d2d'],
    },
    aisle: {
      type: 'carpet',
      color: '#8B0000',
    },
    seats: {
      type: 'tiffany-chair',
      countPerSide: 10,
      spacing: 1.6,
      color: '#D4AF37',
    },
    altar: {
      type: 'floral-arch',
      height: 5,
      width: 6,
      color: '#FFD700',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-6, 2, -7],
        color: '#FFD700',
      },
      {
        type: 'lantern',
        position: [6, 2, -7],
        color: '#FFD700',
      },
      {
        type: 'flower-pillar',
        position: [-5, 0, -8],
        flowerType: 'rose',
        color: '#DC143C',
      },
      {
        type: 'flower-pillar',
        position: [5, 0, -8],
        flowerType: 'rose',
        color: '#DC143C',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.3 },
      { type: 'spot', position: [0, 8, -8], intensity: 1.5, color: '#FFD700' },
      { type: 'point', position: [-4, 6, -6], intensity: 0.8, color: '#FFA500' },
      { type: 'point', position: [4, 6, -6], intensity: 0.8, color: '#FFA500' },
    ],
    particles: {
      type: 'dust-motes',
      count: 120,
      color: '#FFD700',
    },
  },
  environment: {
    backgroundColor: '#0a0a0a',
    fog: { color: '#1a1a1a', near: 12, far: 30 },
    ambientLight: 0.3,
  },
};
