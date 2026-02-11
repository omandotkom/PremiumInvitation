import { VenueConfig } from '@/types';

export const BallroomWhiteConfig: VenueConfig = {
  id: 'ballroom-white',
  name: 'Ballroom White',
  slug: 'ballroom-white',
  price: 279000,
  description: 'Ballroom putih bersih dengan konsep minimalis modern',
  thumbnail: '/venues/ballroom-white.jpg',
  dimensions: {
    length: 20,
    width: 12,
    aisleWidth: 2.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 9,
    endZ: -7,
    fov: 58,
  },
  components: {
    floor: {
      type: 'solid',
      color: '#FFFFFF',
    },
    aisle: {
      type: 'carpet',
      color: '#E6E6FA',
    },
    seats: {
      type: 'tiffany-chair',
      countPerSide: 8,
      spacing: 1.5,
      color: '#FFFFFF',
    },
    altar: {
      type: 'simple',
      height: 3,
      width: 4,
      color: '#F8F8FF',
    },
    decorations: [
      {
        type: 'flower-pillar',
        position: [-4, 0, -6],
        flowerType: 'lily',
        color: '#FFF0F5',
      },
      {
        type: 'flower-pillar',
        position: [4, 0, -6],
        flowerType: 'lily',
        color: '#FFF0F5',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.7 },
      { type: 'point', position: [0, 7, -6], intensity: 1.0, color: '#FFFFFF' },
    ],
    particles: {
      type: 'petals',
      count: 80,
      color: '#FFF0F5',
    },
  },
  environment: {
    backgroundColor: '#F5F5F5',
    fog: { color: '#FFFFFF', near: 15, far: 35 },
    ambientLight: 0.7,
  },
};
