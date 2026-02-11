import { VenueConfig } from '@/types';

export const RusticBarnConfig: VenueConfig = {
  id: 'rustic-barn',
  name: 'Rustic Barn',
  slug: 'rustic-barn',
  price: 159000,
  description: 'Gaya pedesaan yang hangat di dalam barn kayu yang cozy',
  thumbnail: '/venues/rustic-barn.jpg',
  dimensions: {
    length: 18,
    width: 10,
    aisleWidth: 2.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 8,
    endZ: -6,
    fov: 65,
  },
  components: {
    floor: {
      type: 'wood',
      color: '#8B4513',
    },
    aisle: {
      type: 'carpet',
      color: '#D2691E',
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 7,
      spacing: 1.5,
      color: '#A0522D',
    },
    altar: {
      type: 'floral-arch',
      height: 3.5,
      width: 4,
      color: '#CD853F',
    },
    decorations: [
      {
        type: 'lantern',
        position: [-4, 2, -5],
        color: '#FF8C00',
      },
      {
        type: 'lantern',
        position: [4, 2, -5],
        color: '#FF8C00',
      },
      {
        type: 'flower-pillar',
        position: [-3, 0, -5],
        flowerType: 'sunflower',
        color: '#FFD700',
      },
      {
        type: 'flower-pillar',
        position: [3, 0, -5],
        flowerType: 'sunflower',
        color: '#FFD700',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.5 },
      { type: 'point', position: [0, 5, -5], intensity: 0.8, color: '#FFDAB9' },
      { type: 'point', position: [-3, 4, -4], intensity: 0.5, color: '#FFA500' },
      { type: 'point', position: [3, 4, -4], intensity: 0.5, color: '#FFA500' },
    ],
    particles: {
      type: 'dust-motes',
      count: 70,
      color: '#F4A460',
    },
  },
  environment: {
    backgroundColor: '#5C4033',
    fog: { color: '#8B7355', near: 10, far: 25 },
    ambientLight: 0.5,
  },
};
