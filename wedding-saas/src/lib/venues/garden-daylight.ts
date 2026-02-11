import { VenueConfig } from '@/types';

export const GardenDaylightConfig: VenueConfig = {
  id: 'garden-daylight',
  name: 'Taman Terang',
  slug: 'garden-daylight',
  price: 129000,
  description: 'Pernikahan outdoor di taman yang asri dengan cahaya matahari alami',
  thumbnail: '/venues/garden-daylight.jpg',
  dimensions: {
    length: 18,
    width: 10,
    aisleWidth: 2.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 8,
    endZ: -5,
    fov: 65,
  },
  components: {
    floor: {
      type: 'solid',
      color: '#7CB342',
    },
    aisle: {
      type: 'petals',
      color: '#F8BBD0',
    },
    seats: {
      type: 'tiffany-chair',
      countPerSide: 7,
      spacing: 1.8,
      color: '#FFFFFF',
    },
    altar: {
      type: 'floral-arch',
      height: 3.5,
      width: 4,
      color: '#E91E63',
    },
    decorations: [
      {
        type: 'flower-pillar',
        position: [-4, 0, -4],
        flowerType: 'peony',
        color: '#F48FB1',
      },
      {
        type: 'flower-pillar',
        position: [4, 0, -4],
        flowerType: 'peony',
        color: '#F48FB1',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.7 },
      { type: 'point', position: [0, 8, 0], intensity: 0.8, color: '#FFF9C4' },
    ],
    particles: {
      type: 'petals',
      count: 80,
      color: '#F8BBD0',
    },
  },
  environment: {
    backgroundColor: '#87CEEB',
    fog: { color: '#E3F2FD', near: 15, far: 30 },
    ambientLight: 0.7,
  },
};
