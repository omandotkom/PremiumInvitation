import { VenueConfig } from '@/types';

export const ChurchModernConfig: VenueConfig = {
  id: 'church-modern',
  name: 'Gereja Modern',
  slug: 'church-modern',
  price: 169000,
  description: 'Gereja kontemporer dengan desain minimalis dan cahaya alami',
  thumbnail: '/venues/church-modern.jpg',
  dimensions: {
    length: 22,
    width: 9,
    aisleWidth: 2.5,
    cameraHeight: 1.6,
  },
  cameraPath: {
    startZ: 10,
    endZ: -7,
    fov: 62,
  },
  components: {
    floor: {
      type: 'solid',
      color: '#D3D3D3',
    },
    aisle: {
      type: 'carpet',
      color: '#4682B4',
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 9,
      spacing: 1.6,
      color: '#8B7355',
    },
    altar: {
      type: 'simple',
      height: 3.5,
      width: 3.5,
      color: '#C0C0C0',
    },
    decorations: [
      {
        type: 'flower-pillar',
        position: [-3.5, 0, -6],
        flowerType: 'hydrangea',
        color: '#B0C4DE',
      },
      {
        type: 'flower-pillar',
        position: [3.5, 0, -6],
        flowerType: 'hydrangea',
        color: '#B0C4DE',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.6 },
      { type: 'point', position: [0, 8, 0], intensity: 0.9, color: '#F0F8FF' },
      { type: 'point', position: [0, 6, -6], intensity: 0.7, color: '#E6E6FA' },
    ],
    particles: {
      type: 'dust-motes',
      count: 60,
      color: '#F0F8FF',
    },
  },
  environment: {
    backgroundColor: '#708090',
    fog: { color: '#D3D3D3', near: 14, far: 32 },
    ambientLight: 0.6,
  },
};
