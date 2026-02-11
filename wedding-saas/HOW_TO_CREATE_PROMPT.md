# How to Create New Venue Template - AI Agent Guide

## Overview

Venue templates in Wedding SaaS 3D are **procedurally generated** using Three.js. Each venue is defined by a configuration object (`VenueConfig`) that describes:
- Dimensions and layout
- Visual appearance (colors, materials)
- 3D components (floor, seats, altar, decorations)
- Lighting setup
- Particle effects
- Camera path for walkthrough

## Quick Start Template

```typescript
import { VenueConfig } from '@/types';

export const [VenueName]Config: VenueConfig = {
  id: 'unique-venue-id',
  name: 'Display Name',
  slug: 'url-friendly-name',
  price: 149000, // Price in IDR
  description: 'Compelling description for marketing',
  thumbnail: '/venues/image-name.jpg',
  dimensions: {
    length: 20,      // Total length of venue (meters)
    width: 10,       // Total width (meters)
    aisleWidth: 2.5, // Width of walking path
    cameraHeight: 1.6, // Eye level height
  },
  cameraPath: {
    startZ: 9,   // Starting position (back of venue)
    endZ: -6,    // Ending position (altar)
    fov: 60,     // Field of view
  },
  components: {
    floor: { type: 'checkerboard' | 'solid' | 'wood', ... },
    aisle: { type: 'carpet' | 'runner' | 'petals', color: '#HEX' },
    seats: { type: 'wooden-bench' | 'tiffany-chair' | 'pillow', ... },
    altar: { type: 'arch-with-cross' | 'floral-arch' | 'simple' | 'mandap', ... },
    decorations: [...],
    lighting: [...],
    particles: { type: 'dust-motes' | 'petals' | 'fireflies' | 'bubbles', count: 100, color: '#HEX' },
  },
  environment: {
    backgroundColor: '#HEX',
    fog: { color: '#HEX', near: 10, far: 25 },
    ambientLight: 0.5, // 0-1 range
  },
};
```

## Detailed Field Reference

### 1. Basic Info

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique kebab-case identifier | `'garden-sunset'` |
| `name` | Display name for UI | `'Taman Sunset'` |
| `slug` | URL-friendly version | `'garden-sunset'` |
| `price` | Price in Indonesian Rupiah | `149000` (Rp 149.000) |
| `description` | Marketing description (max 100 chars) | `'Pernikahan romantis...'` |
| `thumbnail` | Path to preview image | `'/venues/garden-sunset.jpg'` |

### 2. Dimensions

```typescript
dimensions: {
  length: 20,      // Total venue length in meters
  width: 10,       // Total venue width in meters  
  aisleWidth: 2.5, // Walking path width (typically 2-3.5)
  cameraHeight: 1.6, // Camera eye level (1.5-1.8 for realism)
}
```

**Guidelines:**
- Small intimate venue: length 15-18m
- Medium venue: length 20-24m
- Grand venue: length 25-30m
- Aisle width: 2m (narrow), 2.5m (standard), 3m+ (grand)

### 3. Camera Path

```typescript
cameraPath: {
  startZ: 9,    // Positive = back of venue
  endZ: -6,     // Negative = front/altar
  fov: 60,      // Field of view (50-70)
}
```

**Calculation:**
- `startZ` ≈ `length / 2`
- `endZ` ≈ `-length / 3`
- FOV: 50 (telephoto), 60 (normal), 70 (wide)

### 4. Floor Configuration

**Type: 'checkerboard'**
```typescript
floor: {
  type: 'checkerboard',
  colors: ['#FFFFFF', '#E8E8E8'], // Two alternating colors
  size: 1, // Pattern size
}
```
*Best for: Elegant indoor, churches, ballrooms*

**Type: 'solid'**
```typescript
floor: {
  type: 'solid',
  color: '#F4E4C1', // Sand, grass, marble color
}
```
*Best for: Beach, garden, modern venues*

**Type: 'wood'**
```typescript
floor: {
  type: 'wood',
  color: '#8B4513',
}
```
*Best for: Rustic barn, traditional venues*

### 5. Aisle Configuration

```typescript
aisle: {
  type: 'carpet',   // 'carpet' | 'runner' | 'petals'
  color: '#C41E3A', // Red carpet effect
}
```

| Type | Use Case |
|------|----------|
| `'carpet'` | Indoor elegant, churches, ballrooms |
| `'runner'` | Simple, modern, beach |
| `'petals'` | Romantic garden, outdoor |

### 6. Seats Configuration

```typescript
seats: {
  type: 'wooden-bench', // 'wooden-bench' | 'tiffany-chair' | 'pillow'
  countPerSide: 8,      // Number of seats each side
  spacing: 1.5,         // Space between seats (1.4-1.8)
  color: '#8B4513',
}
```

| Seat Type | Best For |
|-----------|----------|
| `'wooden-bench'` | Church, rustic, traditional |
| `'tiffany-chair'` | Elegant, modern, ballroom |
| `'pillow'` | Boho, beach, casual outdoor |

### 7. Altar Configuration

```typescript
altar: {
  type: 'floral-arch', // 'arch-with-cross' | 'floral-arch' | 'simple' | 'mandap'
  height: 4,           // 3-6 meters
  width: 4.5,          // 3-7 meters
  color: '#FF69B4',    // Main arch color
}
```

| Altar Type | Best For |
|------------|----------|
| `'arch-with-cross'` | Church Christian |
| `'floral-arch'` | Garden, romantic, beach |
| `'simple'` | Minimalist, modern |
| `'mandap'` | Indian/traditional |

### 8. Decorations

```typescript
decorations: [
  {
    type: 'flower-pillar',
    position: [-3, 0, -5], // [x, y, z]
    flowerType: 'rose',
    color: '#FF69B4',
  },
  {
    type: 'lantern',
    position: [4, 2, -5], // [x, y, z] - y is height
    color: '#FFD93D',
  },
]
```

**Decoration Types:**
- `'flower-pillar'` - Tall flower arrangements
- `'lantern'` - Hanging lights (set y > 0)
- `'candle'` - Ground candles
- `'banner'` - Hanging decorations

**Position Guidelines:**
- X: ±(aisleWidth/2 + 1) to place beside aisle
- Y: 0 for ground, 1.5-3 for elevated
- Z: -4 to -8 (near altar area)

### 9. Lighting

```typescript
lighting: [
  { type: 'ambient', intensity: 0.5 },
  { 
    type: 'spot', 
    position: [0, 5, -5], 
    intensity: 1, 
    color: '#FFD700' 
  },
  { 
    type: 'point', 
    position: [-3, 4, -4], 
    intensity: 0.6, 
    color: '#FFA500' 
  },
]
```

**Light Types:**
- `'ambient'` - Overall base light (intensity: 0.2-0.8)
- `'spot'` - Focused beam on altar (intensity: 1-2)
- `'point'` - Warm glow from sides (intensity: 0.4-0.8)

**Lighting Themes:**
- **Day/Bright**: ambient 0.7, white/light colors
- **Sunset**: ambient 0.5, orange/gold colors
- **Night**: ambient 0.2-0.3, warm/colored lights
- **Dramatic**: ambient 0.3, high contrast spots

### 10. Particles

```typescript
particles: {
  type: 'dust-motes', // 'dust-motes' | 'petals' | 'fireflies' | 'bubbles'
  count: 100,         // 50 (mobile) to 200 (grand)
  color: '#FFD700',
}
```

| Particle Type | Best For |
|---------------|----------|
| `'dust-motes'` | Indoor, sunbeam effect, elegant |
| `'petals'` | Romantic, garden, spring |
| `'fireflies'` | Night garden, magical, warm |
| `'bubbles'` | Beach, underwater feel, whimsical |

### 11. Environment

```typescript
environment: {
  backgroundColor: '#2C1810',  // Sky/wall color
  fog: { 
    color: '#2C1810',          // Match background
    near: 10,                  // Fog start distance
    far: 25                    // Fog end distance
  },
  ambientLight: 0.4,           // Overall brightness (0-1)
}
```

**Fog Guidelines:**
- Always match fog color with backgroundColor
- `near`: 10-15 (closer for intimate, farther for open)
- `far`: 25-40 (venue length + 5-10)

## Color Palettes by Theme

### Classic Church
```
Background: #2C1810 (Dark brown)
Floor: White/Grey checkerboard
Aisle: #C41E3A (Deep red)
Seats: #8B4513 (Wood)
Altar: #D4AF37 (Gold)
Particles: #FFD700 (Gold dust)
```

### Beach Sunset
```
Background: #FF7F50 (Coral/orange)
Floor: #F4E4C1 (Sand)
Aisle: #FFB6C1 (Light pink)
Seats: #FFFFFF (White)
Altar: #FF6B6B (Coral)
Particles: #FFE4B5 (Light bubbles)
```

### Winter Wonderland
```
Background: #B0C4DE (Light steel blue)
Floor: #F0F8FF (Alice blue)
Aisle: #E0FFFF (Light cyan)
Seats: #B0E0E6 (Powder blue)
Altar: #87CEEB (Sky blue)
Particles: #FFFFFF (Snow)
```

### Royal Palace
```
Background: #1a0a0a (Near black)
Floor: #2C1810 / #3D2420 (Dark checkerboard)
Aisle: #800020 (Burgundy)
Seats: #DAA520 (Golden rod)
Altar: #FFD700 (Gold)
Particles: #FFD700 (Gold dust)
```

### Garden Night
```
Background: #0F0F23 (Deep navy)
Floor: #2F4F4F (Dark slate)
Aisle: #4B0082 (Indigo)
Seats: #1C1C1C (Dark)
Altar: #9370DB (Medium purple)
Particles: #FFFF00 (Yellow fireflies)
```

## Step-by-Step Creation Process

### Step 1: Define Concept
1. Choose venue type (Church, Beach, Garden, Ballroom, etc.)
2. Choose time of day (Day, Sunset, Night)
3. Choose mood (Romantic, Elegant, Casual, Dramatic)

### Step 2: Set Dimensions
```typescript
dimensions: {
  length: 20,      // Based on venue size
  width: 10,       // Comfortable for camera
  aisleWidth: 2.5, // Standard
  cameraHeight: 1.6,
}
```

### Step 3: Design Floor & Aisle
- Select floor type based on venue
- Choose aisle color that contrasts with floor
- Use red for elegant, pastel for romantic, white for modern

### Step 4: Configure Seats
- Match seat type to theme
- Calculate count: `Math.floor((length - 4) / spacing)`
- Wood for rustic, white chairs for elegant, pillows for casual

### Step 5: Design Altar
- Select type based on venue style
- Make it the focal point (larger = more grand)
- Position at `cameraPath.endZ`

### Step 6: Add Decorations
- Place symmetrically for formal
- Asymmetric for casual
- Use lanterns for night, flowers for romantic

### Step 7: Setup Lighting
- Start with ambient (mood base)
- Add spot on altar (focal point)
- Add side lights for depth
- Match colors to theme

### Step 8: Add Particles
- Choose type based on theme
- Adjust count for performance (50 mobile, 100-200 desktop)
- Match color to lighting

### Step 9: Configure Environment
- Set background color (atmosphere base)
- Add matching fog
- Adjust ambientLight to match time of day

## Quality Checklist

Before finalizing, verify:

- [ ] **Colors harmonize** - No clashing colors
- [ ] **Sufficient contrast** - Aisle visible against floor
- [ ] **Realistic scale** - Dimensions feel natural
- [ ] **Walkthrough works** - Start to end makes sense
- [ ] **Mobile friendly** - Particle count ≤ 100
- [ ] **Unique identity** - Different from existing venues
- [ ] **Price appropriate** - Matches grandeur level

## Export Template

```typescript
// src/lib/venues/[venue-name].ts
import { VenueConfig } from '@/types';

export const [VenueName]Config: VenueConfig = {
  // ... configuration
};
```

Then add to `src/lib/venues/index.ts`:
```typescript
import { [VenueName]Config } from './[venue-name]';

export const venues: VenueConfig[] = [
  // ... existing venues
  [VenueName]Config,
];
```

## Example: Creating "Enchanted Forest"

```typescript
export const EnchantedForestConfig: VenueConfig = {
  id: 'enchanted-forest',
  name: 'Enchanted Forest',
  slug: 'enchanted-forest',
  price: 239000,
  description: 'Hutan magis yang penuh dengan cahaya peri dan misteri',
  thumbnail: '/venues/enchanted-forest.jpg',
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
      color: '#2F4F4F', // Dark forest floor
    },
    aisle: {
      type: 'petals',
      color: '#DDA0DD', // Purple petals
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 9,
      spacing: 1.5,
      color: '#4A3728', // Dark wood
    },
    altar: {
      type: 'floral-arch',
      height: 4,
      width: 4.5,
      color: '#9932CC', // Purple magic
    },
    decorations: [
      {
        type: 'lantern',
        position: [-4, 3, -5],
        color: '#00FF7F', // Magic green
      },
      {
        type: 'lantern',
        position: [4, 3, -5],
        color: '#00FF7F',
      },
      {
        type: 'flower-pillar',
        position: [-3, 0, -6],
        flowerType: 'mystic',
        color: '#DA70D6',
      },
      {
        type: 'flower-pillar',
        position: [3, 0, -6],
        flowerType: 'mystic',
        color: '#DA70D6',
      },
    ],
    lighting: [
      { type: 'ambient', intensity: 0.25 },
      { type: 'point', position: [0, 6, -6], intensity: 0.8, color: '#9932CC' },
      { type: 'point', position: [-4, 4, -5], intensity: 0.6, color: '#00FF7F' },
      { type: 'point', position: [4, 4, -5], intensity: 0.6, color: '#00FF7F' },
    ],
    particles: {
      type: 'fireflies',
      count: 120,
      color: '#00FF7F',
    },
  },
  environment: {
    backgroundColor: '#0F1419',
    fog: { color: '#1a1f2e', near: 8, far: 25 },
    ambientLight: 0.25,
  },
};
```

## Troubleshooting

### Venue too dark?
- Increase `ambientLight` (0.3 → 0.6)
- Add more point lights
- Use lighter background color

### Walkthrough too fast/slow?
- Adjust `cameraPath.fov` (lower = slower feel)
- Change `delta` multiplier in scroll handler

### Particles too distracting?
- Reduce `count` (100 → 50)
- Lower opacity in ParticleField component
- Use subtler color

### Performance issues on mobile?
- Reduce particle count by half
- Reduce seat count
- Simplify decorations

## Inspiration Sources

Look to these for color and mood inspiration:
- Pinterest wedding venues
- Real wedding photography
- Nature color palettes
- Seasonal themes (Spring, Summer, Fall, Winter)
- Cultural venues (Balinese, Japanese, Indian, etc.)

---

**Remember**: The venue should evoke emotion and match the price point. A Rp 399.000 venue should feel significantly more grand than a Rp 129.000 venue.
