import { VenueConfig } from '@/types';

export const WinterWonderlandConfig: VenueConfig = {
  id: 'winter-wonderland',
  name: 'Winter Wonderland',
  slug: 'winter-wonderland',
  price: 329000,
  description: 'Pernikahan musim dingin yang ajaib dengan salju dan es yang memukau',
  thumbnail: '/venues/winter-wonderland.jpg',
  dimensions: {
    length: 24,
    width: 12,
    aisleWidth: 3,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 11,
    endZ: -9,
    fov: 62,
  },
  components: {
    floor: {
      type: 'solid',
      color: '#F0F8FF',
    },
    aisle: {
      type: 'carpet',
      color: '#E0FFFF',
    },
    seats: {
      type: 'tiffany-chair',
      countPerSide: 10,
      spacing: 1.6,
      color: '#B0E0E6',
    },
    altar: {
      type: 'floral-arch',
      height: 4.5,
      width: 5,
      color: '#87CEEB',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-5, 2, -7],
        color: '#00BFFF',
      },
      {
        type: 'lantern',
        position: [5, 2, -7],
        color: '#00BFFF',
      },
      {
        type: 'flower-pillar',
        position: [-4, 0, -7],
        flowerType: 'ice-flower',
        color: '#E0FFFF',
      },
      {
        type: 'flower-pillar',
        position: [4, 0, -7],
        flowerType: 'ice-flower',
        color: '#E0FFFF',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.4 },
      { type: 'point', position: [0, 7, -7], intensity: 1.2, color: '#E0FFFF' },
      { type: 'point', position: [-4, 5, -6], intensity: 0.7, color: '#87CEEB' },
      { type: 'point', position: [4, 5, -6], intensity: 0.7, color: '#87CEEB' },
    ],
    particles: {
      type: 'bubbles',
      count: 150,
      color: '#FFFFFF',
    },
  },
  environment: {
    backgroundColor: '#B0C4DE',
    fog: { color: '#E6E6FA', near: 12, far: 35 },
    ambientLight: 0.4,
  },
};
