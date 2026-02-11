import { VenueConfig } from '@/types';

export const BeachDayConfig: VenueConfig = {
  id: 'beach-day',
  name: 'Pantai Siang',
  slug: 'beach-day',
  price: 199000,
  description: 'Pernikahan ceria di pantai dengan cahaya matahari terik',
  thumbnail: '/venues/beach-day.jpg',
  dimensions: {
    length: 22,
    width: 10,
    aisleWidth: 2.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 10,
    endZ: -7,
    fov: 65,
  },
  components: {
    floor: {
      type: 'solid',
      color: '#F5DEB3',
    },
    aisle: {
      type: 'runner',
      color: '#E0FFFF',
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 9,
      spacing: 1.5,
      color: '#DEB887',
    },
    altar: {
      type: 'floral-arch',
      height: 3.5,
      width: 4,
      color: '#40E0D0',
    },
    decorations: [
      {
        type: 'flower-pillar',
        position: [-4, 0, -6],
        flowerType: 'hibiscus',
        color: '#FF69B4',
      },
      {
        type: 'flower-pillar',
        position: [4, 0, -6],
        flowerType: 'hibiscus',
        color: '#FF69B4',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.8 },
      { type: 'point', position: [0, 8, 0], intensity: 1.0, color: '#FFFFE0' },
    ],
    particles: {
      type: 'bubbles',
      count: 40,
      color: '#E0FFFF',
    },
  },
  environment: {
    backgroundColor: '#87CEEB',
    fog: { color: '#E0F6FF', near: 18, far: 40 },
    ambientLight: 0.8,
  },
};
