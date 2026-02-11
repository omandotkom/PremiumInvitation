import { VenueConfig } from '@/types';

export const GardenSunsetConfig: VenueConfig = {
  id: 'garden-sunset',
  name: 'Taman Sunset',
  slug: 'garden-sunset',
  price: 189000,
  description: 'Taman yang romantis dengan cahaya senja yang hangat',
  thumbnail: '/venues/garden-sunset.jpg',
  dimensions: {
    length: 20,
    width: 10,
    aisleWidth: 2.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 9,
    endZ: -6,
    fov: 65,
  },
  components: {
    floor: {
      type: 'solid',
      color: '#8FBC8F',
    },
    aisle: {
      type: 'petals',
      color: '#FFB7C5',
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 8,
      spacing: 1.5,
      color: '#8B4513',
    },
    altar: {
      type: 'floral-arch',
      height: 4,
      width: 4.5,
      color: '#FF69B4',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-4, 1.5, -5],
        color: '#FFA07A',
      },
      {
        type: 'lantern',
        position: [4, 1.5, -5],
        color: '#FFA07A',
      },
      {
        type: 'flower-pillar',
        position: [-3.5, 0, -5.5],
        flowerType: 'rose',
        color: '#FF1493',
      },
      {
        type: 'flower-pillar',
        position: [3.5, 0, -5.5],
        flowerType: 'rose',
        color: '#FF1493',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.5 },
      { type: 'point', position: [0, 6, -5], intensity: 1.0, color: '#FFA07A' },
      { type: 'point', position: [-3, 4, -4], intensity: 0.5, color: '#FFD700' },
      { type: 'point', position: [3, 4, -4], intensity: 0.5, color: '#FFD700' },
    ],
    particles: {
      type: 'fireflies',
      count: 70,
      color: '#FFD700',
    },
  },
  environment: {
    backgroundColor: '#CD853F',
    fog: { color: '#DEB887', near: 12, far: 30 },
    ambientLight: 0.5,
  },
};
