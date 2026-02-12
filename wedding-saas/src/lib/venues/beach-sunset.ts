import { VenueConfig } from '@/types';

export const BeachSunsetConfig: VenueConfig = {
  id: 'beach-sunset',
  name: 'Pantai Sunset',
  slug: 'beach-sunset',
  price: 249000,
  description: 'Pernikahan romantis di pantai dengan matahari terbenam yang memukau',
  thumbnail: '/venues/beach-sunset.jpg',
  dimensions: {
    length: 25,
    width: 12,
    aisleWidth: 3,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 11,
    endZ: -8,
    fov: 70,
  },
  components: {
    floor: {
      type: 'sand',
      color: '#F4E4C1', // Sand color
    },
    aisle: {
      type: 'petals',
      color: '#FFB6C1',
    },
    seats: {
      type: 'tiffany-chair',
      countPerSide: 10,
      spacing: 1.6,
      color: '#FFFFFF',
    },
    altar: {
      type: 'floral-arch',
      height: 4,
      width: 5,
      color: '#FF6B6B',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-5, 0, -6],
        color: '#FFD93D',
      },
      {
        type: 'lantern',
        position: [5, 0, -6],
        color: '#FFD93D',
      },
      {
        type: 'flower-pillar',
        position: [-4, 0, -7],
        flowerType: 'tropical',
        color: '#FF8C42',
      },
      {
        type: 'flower-pillar',
        position: [4, 0, -7],
        flowerType: 'tropical',
        color: '#FF8C42',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.5 },
      { type: 'point', position: [0, 6, -7], intensity: 1.2, color: '#FF6B35' },
      { type: 'point', position: [-3, 4, -5], intensity: 0.6, color: '#FFD93D' },
      { type: 'point', position: [3, 4, -5], intensity: 0.6, color: '#FFD93D' },
    ],
    particles: {
      type: 'bubbles',
      count: 60,
      color: '#FFE4B5',
    },
  },
  environment: {
    backgroundColor: '#FF7F50',
    fog: { color: '#FFA07A', near: 15, far: 35 },
    ambientLight: 0.5,
  },
};
