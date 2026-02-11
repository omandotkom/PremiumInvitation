import { VenueConfig } from '@/types';

export const RoyalPalaceConfig: VenueConfig = {
  id: 'royal-palace',
  name: 'Royal Palace',
  slug: 'royal-palace',
  price: 399000,
  description: 'Istana megah dengan kemegahan kerajaan yang tak tertandingi',
  thumbnail: '/venues/royal-palace.jpg',
  dimensions: {
    length: 30,
    width: 16,
    aisleWidth: 3.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 13,
    endZ: -11,
    fov: 58,
  },
  components: {
    floor: {
      type: 'checkerboard',
      colors: ['#2C1810', '#3D2420'],
    },
    aisle: {
      type: 'carpet',
      color: '#800020',
    },
    seats: {
      type: 'tiffany-chair',
      countPerSide: 12,
      spacing: 1.8,
      color: '#DAA520',
    },
    altar: {
      type: 'floral-arch',
      height: 6,
      width: 7,
      color: '#FFD700',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-7, 3, -9],
        color: '#FFD700',
      },
      {
        type: 'lantern',
        position: [7, 3, -9],
        color: '#FFD700',
      },
      {
        type: 'lantern',
        position: [-5, 4, -8],
        color: '#FFD700',
      },
      {
        type: 'lantern',
        position: [5, 4, -8],
        color: '#FFD700',
      },
      {
        type: 'flower-pillar',
        position: [-6, 0, -9],
        flowerType: 'royal-rose',
        color: '#DC143C',
      },
      {
        type: 'flower-pillar',
        position: [6, 0, -9],
        flowerType: 'royal-rose',
        color: '#DC143C',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.35 },
      { type: 'spot', position: [0, 10, -9], intensity: 2.0, color: '#FFD700' },
      { type: 'point', position: [-6, 7, -8], intensity: 1.0, color: '#FFA500' },
      { type: 'point', position: [6, 7, -8], intensity: 1.0, color: '#FFA500' },
      { type: 'point', position: [0, 8, 0], intensity: 0.8, color: '#FFF8DC' },
    ],
    particles: {
      type: 'dust-motes',
      count: 200,
      color: '#FFD700',
    },
  },
  environment: {
    backgroundColor: '#1a0a0a',
    fog: { color: '#2C1810', near: 15, far: 40 },
    ambientLight: 0.35,
  },
};
