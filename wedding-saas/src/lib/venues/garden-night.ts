import { VenueConfig } from '@/types';

export const GardenNightConfig: VenueConfig = {
  id: 'garden-night',
  name: 'Taman Malam',
  slug: 'garden-night',
  price: 219000,
  description: 'Taman ajaib di malam hari dengan lampu fairy yang berkelap-kelip',
  thumbnail: '/venues/garden-night.jpg',
  dimensions: {
    length: 22,
    width: 11,
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
      color: '#2F4F4F',
    },
    aisle: {
      type: 'carpet',
      color: '#4B0082',
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 9,
      spacing: 1.6,
      color: '#1C1C1C',
    },
    altar: {
      type: 'floral-arch',
      height: 4,
      width: 4.5,
      color: '#9370DB',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-4, 2, -6],
        color: '#00CED1',
      },
      {
        type: 'lantern',
        position: [4, 2, -6],
        color: '#00CED1',
      },
      {
        type: 'lantern',
        position: [-2, 3, -5],
        color: '#FF69B4',
      },
      {
        type: 'lantern',
        position: [2, 3, -5],
        color: '#FF69B4',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.2 },
      { type: 'point', position: [0, 5, -6], intensity: 0.8, color: '#9370DB' },
      { type: 'point', position: [-4, 4, -5], intensity: 0.6, color: '#00CED1' },
      { type: 'point', position: [4, 4, -5], intensity: 0.6, color: '#00CED1' },
    ],
    particles: {
      type: 'fireflies',
      count: 100,
      color: '#FFFF00',
    },
  },
  environment: {
    backgroundColor: '#0F0F23',
    fog: { color: '#191970', near: 10, far: 25 },
    ambientLight: 0.2,
  },
};
