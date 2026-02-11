export interface VenueConfig {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  dimensions: {
    length: number;
    width: number;
    aisleWidth: number;
    cameraHeight: number;
  };
  cameraPath: {
    startZ: number;
    endZ: number;
    fov: number;
  };
  components: {
    floor: FloorConfig;
    aisle: AisleConfig;
    seats: SeatsConfig;
    altar: AltarConfig;
    decorations: DecorationConfig[];
    lighting: LightConfig[];
    particles?: ParticleConfig;
  };
  environment: {
    backgroundColor: string;
    fog?: {
      color: string;
      near: number;
      far: number;
    };
    ambientLight: number;
  };
}

export interface FloorConfig {
  type: 'checkerboard' | 'solid' | 'wood';
  colors?: string[];
  color?: string;
  size?: number;
}

export interface AisleConfig {
  type: 'carpet' | 'runner' | 'petals';
  color: string;
}

export interface SeatsConfig {
  type: 'wooden-bench' | 'tiffany-chair' | 'pillow';
  countPerSide: number;
  spacing: number;
  color: string;
}

export interface AltarConfig {
  type: 'arch-with-cross' | 'floral-arch' | 'simple' | 'mandap';
  height: number;
  width: number;
  color: string;
}

export interface DecorationConfig {
  type: 'flower-pillar' | 'lantern' | 'candle' | ' banner';
  position: [number, number, number];
  flowerType?: string;
  color: string;
}

export interface LightConfig {
  type: 'ambient' | 'spot' | 'point';
  position?: [number, number, number];
  intensity: number;
  color?: string;
}

export interface ParticleConfig {
  type: 'dust-motes' | 'petals' | 'fireflies' | 'bubbles';
  count: number;
  color: string;
}

export interface WeddingContent {
  groomName: string;
  brideName: string;
  weddingDate: string;
  venueTime: string;
  venueAddress: string;
  groomPhoto?: string;
  bridePhoto?: string;
  story?: StoryItem[];
  gallery?: string[];
  musicUrl?: string;
  venueCustomization?: {
    aisleColor?: string;
    flowerType?: string;
  };
}

export interface StoryItem {
  date: string;
  title: string;
  description: string;
  photo?: string;
}

export interface User {
  id: number;
  firebaseUid: string;
  email: string;
  name?: string;
  phone?: string;
  photoUrl?: string;
  role: 'customer' | 'admin' | 'super_admin';
}
