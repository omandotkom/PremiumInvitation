# 🎊 Arsitektur SaaS Undangan Wedding 3D - Procedural Venue System

## 📋 Overview
Platform SaaS untuk pembuatan undangan pernikahan 3D dengan fitur **Procedural Venue Walkthrough**. User dapat memilih venue 3D (gereja, taman, pantai, ballroom), melakukan pembayaran per template, dan mendapatkan pengalaman jalan di aisle menuju altar dalam environment 3D yang immersive.

---

## 🎯 Business Model: Pay-Per-Template

### Pricing Structure
Setiap template venue memiliki harga berbeda berdasarkan kompleksitas visual dan fitur. Tidak ada tiering - user membayar sesuai template yang dipilih.

| Venue Template | Harga | Fitur |
|---------------|-------|-------|
| **Minimalist Heart** | Rp 49.000 | Procedural simple, partikel hati |
| **Rose Garden** | Rp 99.000 | Taman dengan partikel bunga |
| **Church Classic** | Rp 149.000 | Gereja klasik dengan walkthrough |
| **Royal Ballroom** | Rp 199.000 | Ballroom elegant dengan pencahayaan mewah |
| **Beach Sunset** | Rp 249.000 | Pantai sunset dengan atmosphere realistis |
| **Grand Cathedral** | Rp 399.000 | Katedral megah dengan detail maksimal |

### Monetization Flow
```
User browsing gallery
      │
      ▼
Preview venue 3D (demo mode)
      │
      ▼
Pilih template → Checkout (Midtrans)
      │
      ▼
Akses edit 30 hari
      │
      ▼
Customize & Publish → Share link
```

---

## 🏗️ System Architecture (Simplified)

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 14 (Full-Stack)                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND (App Router)                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │   │
│  │  │  Landing │  │  Venues  │  │ Dashboard│  │  Editor  │ │   │
│  │  │   Page   │  │  Gallery │  │          │  │          │ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │   │
│  │                                                              │
│  │  ┌──────────────────────────────────────────────────────┐  │
│  │  │       Wedding Site Renderer ([slug].tsx)             │  │
│  │  │       (Procedural 3D Venue + User Content)           │  │
│  │  └──────────────────────────────────────────────────────┘  │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              BACKEND (API Routes)                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │   │
│  │  │ /api/    │  │ /api/    │  │ /api/    │  │ /api/    │ │   │
│  │  │ venues   │  │ orders   │  │ payments │  │ upload   │ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌──────────────┐      ┌─────────────────┐     ┌─────────────┐
│   MySQL      │      │   Firebase      │     │  Midtrans   │
│  (Prisma)    │      │  ├─ Auth        │     │  Payment    │
└──────────────┘      │  ├─ Storage     │     └─────────────┘
                      │  └─ Admin SDK   │
                      └─────────────────┘
```

---

## 🎪 Procedural Venue System

### Konsep
Semua venue 3D dibuat **procedural** dengan Three.js - tidak ada file model 3D eksternal. Venue didefinisikan sebagai konfigurasi JSON, di-render real-time di browser.

### Keuntungan Procedural
| Aspek | Benefit |
|-------|---------|
| **File Size** | Tidak ada download model .glb besar (< 100KB config) |
| **Loading Speed** | < 2 detik load time bahkan di 3G |
| **Customizable** | User bisa ganti warna, ukuran, komponen via konfigurasi |
| **Scalable** | Tambah venue = tambah file config, tanpa 3D modelling |
| **Mobile Perf** | Optimized 60fps di smartphone |

---

## 🏛️ Venue Configuration Schema

```typescript
interface VenueConfig {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  
  // Ukuran venue dalam meter
  dimensions: {
    length: number;       // Panjang aisle
    width: number;        // Lebar total
    aisleWidth: number;   // Lebar jalan pengantin
    cameraHeight: number; // Tinggi mata (default 1.6m)
  };
  
  // On-Rails Camera Path
  cameraPath: {
    startZ: number;       // Posisi awal (belakang pintu)
    endZ: number;         // Posisi akhir (depan altar)
    fov: number;          // Field of view (default 60)
  };
  
  // Komponen 3D (semua procedural)
  components: {
    floor: FloorConfig;
    aisle: AisleConfig;
    seats: SeatsConfig;
    altar: AltarConfig;
    decorations: DecorationConfig[];
    lighting: LightConfig[];
    particles?: ParticleConfig;
  };
  
  // Environment settings
  environment: {
    backgroundColor: string;
    fog?: { color: string; near: number; far: number };
    ambientLight: number;
  };
}

// Contoh: Church Classic
const ChurchClassicConfig: VenueConfig = {
  id: 'church-classic',
  name: 'Gereja Klasik',
  slug: 'church-classic',
  price: 149000,
  dimensions: {
    length: 20,
    width: 8,
    aisleWidth: 2,
    cameraHeight: 1.6
  },
  cameraPath: {
    startZ: 9,
    endZ: -6,
    fov: 60
  },
  components: {
    floor: {
      type: 'checkerboard',
      colors: ['#FFFFFF', '#E8E8E8'],
      size: 1
    },
    aisle: {
      type: 'carpet',
      color: '#C41E3A',
      pattern: 'solid'
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 8,
      spacing: 1.5,
      color: '#8B4513',
      arrangement: 'dual'
    },
    altar: {
      type: 'arch-with-cross',
      height: 4,
      width: 3,
      color: '#D4AF37',
      hasParticles: true
    },
    decorations: [
      { type: 'flower-pillar', position: [-3, 0, -5], flowerType: 'rose', color: '#FF69B4' },
      { type: 'flower-pillar', position: [3, 0, -5], flowerType: 'rose', color: '#FF69B4' }
    ],
    lighting: [
      { type: 'ambient', intensity: 0.4 },
      { type: 'spot', position: [0, 5, -5], intensity: 1, color: '#FFD700' }
    ],
    particles: {
      type: 'dust-motes',
      count: 100,
      color: '#FFD700'
    }
  },
  environment: {
    backgroundColor: '#2C1810',
    fog: { color: '#2C1810', near: 10, far: 25 },
    ambientLight: 0.4
  }
};
```

---

## 🎮 Walkthrough Controls (On-Rails)

User hanya bisa **maju/mundur** di aisle (tidak bisa bebas jalan).

### Input Methods
| Device | Interaksi |
|--------|-----------|
| **Desktop** | Scroll mouse (wheel up/down) |
| **Mobile** | Swipe up/down |
| **Progress Bar** | Drag slider di bottom screen |

### Implementation
```typescript
function WalkthroughController({ progress, onProgressChange }) {
  // Desktop: Wheel scroll
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const newProgress = Math.max(0, Math.min(1, progress + e.deltaY * 0.001));
      onProgressChange(newProgress);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
  }, [progress]);

  // Mobile: Touch swipe
  useEffect(() => {
    const handleTouchMove = (e) => {
      const delta = (touchStart - e.touches[0].clientY) * 0.002;
      const newProgress = Math.max(0, Math.min(1, progress + delta));
      onProgressChange(newProgress);
    };
    window.addEventListener('touchmove', handleTouchMove);
  }, [progress]);

  // Camera position = interpolated dari progress
  const cameraZ = startZ + (endZ - startZ) * progress;
}
```

---

## 📱 Mobile Optimization

### Adaptive Quality
```typescript
const getOptimizedConfig = (isMobile: boolean) => ({
  pixelRatio: isMobile ? 1 : window.devicePixelRatio,
  shadows: !isMobile,
  antialias: !isMobile,
  particleCount: isMobile ? 50 : 200,
  seatDetail: isMobile ? 'low' : 'high',
  maxSeats: isMobile ? 12 : 16,
  textureSize: isMobile ? 256 : 512
});
```

### Optimasi Kunci
1. **InstancedMesh** untuk kursi (1 draw call untuk semua kursi)
2. **Texture Procedural** dengan Canvas API (tidak download file)
3. **Frustum Culling** - hanya render objek yang terlihat
4. **Fog** - sembunyikan objek jauh untuk reduce draw calls
5. **LOD (Level of Detail)** - geometry lebih sederhana di mobile

---

## 🗄️ Database Schema (MySQL)

```sql
-- Users table (Firebase Auth sebagai primary identity)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Firebase Auth UID (unique, indexed)
  firebase_uid VARCHAR(128) UNIQUE NOT NULL,
  
  -- Data dari Firebase Auth (cache untuk performa)
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),
  photo_url VARCHAR(500),
  
  -- Profile tambahan (diisi setelah registrasi)
  wedding_date DATE NULL,
  partner_name VARCHAR(100) NULL,
  
  -- Role
  role ENUM('customer', 'admin', 'super_admin') DEFAULT 'customer',
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Index untuk query cepat
  INDEX idx_firebase_uid (firebase_uid),
  INDEX idx_email (email)
);

-- Venues (Procedural Venue Configurations)
CREATE TABLE venues (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  
  -- Preview assets
  thumbnail_url VARCHAR(500),
  preview_gallery JSON,
  demo_video_url VARCHAR(500),
  
  -- Venue configuration (JSON lengkap)
  config_json JSON NOT NULL,
  mobile_config_json JSON, -- Optimized untuk mobile
  
  -- Settings
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders (Pay-per-template)
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  user_id INT NOT NULL,
  firebase_uid VARCHAR(128) NOT NULL, -- Denormalized untuk query cepat
  venue_id VARCHAR(50) NOT NULL,
  
  -- Pricing
  amount DECIMAL(12,2) NOT NULL,
  discount_amount DECIMAL(12,2) DEFAULT 0,
  final_amount DECIMAL(12,2) NOT NULL,
  
  -- Status
  status ENUM('pending', 'paid', 'failed', 'expired', 'refunded') DEFAULT 'pending',
  
  -- Payment (Midtrans)
  payment_method VARCHAR(50),
  payment_token VARCHAR(255),
  payment_response JSON,
  paid_at TIMESTAMP NULL,
  
  -- Access control
  edit_access_expires_at TIMESTAMP, -- 30 hari dari pembayaran
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (firebase_uid) REFERENCES users(firebase_uid),
  FOREIGN KEY (venue_id) REFERENCES venues(id)
);

-- Wedding Sites (Published invitations)
CREATE TABLE wedding_sites (
  id VARCHAR(50) PRIMARY KEY,
  user_id INT NOT NULL,
  firebase_uid VARCHAR(128) NOT NULL, -- Denormalized
  order_id VARCHAR(50) NOT NULL,
  venue_id VARCHAR(50) NOT NULL,
  
  -- URL slug (unique)
  slug VARCHAR(100) UNIQUE NOT NULL,
  
  -- User content (yang diisi di editor)
  content_json JSON NOT NULL,
  -- Contoh: {
  --   "groomName": "Romeo",
  --   "brideName": "Juliet",
  --   "weddingDate": "2025-06-15",
  --   "venueTime": "08:00",
  --   "groomPhoto": "https://...",
  --   "bridePhoto": "https://...",
  --   "story": [...],
  --   "gallery": [...],
  --   "musicUrl": "https://...",
  --   "venueCustomization": {
  --     "aisleColor": "#C41E3A",
  --     "flowerType": "rose"
  --   }
  -- }
  
  -- Settings
  settings_json JSON,
  -- Contoh: { "password": null, "rsvpEnabled": true, "maxGuests": 200 }
  
  -- Status
  status ENUM('draft', 'published', 'expired') DEFAULT 'draft',
  published_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL, -- Hosting expiry
  
  -- Analytics
  view_count INT DEFAULT 0,
  rsvp_count INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (firebase_uid) REFERENCES users(firebase_uid),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (venue_id) REFERENCES venues(id)
);

-- RSVPs
CREATE TABLE rsvps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wedding_site_id VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  attendance ENUM('yes', 'no', 'maybe') NOT NULL,
  number_of_guests INT DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (wedding_site_id) REFERENCES wedding_sites(id)
);

-- Guest Messages (Guestbook)
CREATE TABLE guest_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wedding_site_id VARCHAR(50) NOT NULL,
  sender_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (wedding_site_id) REFERENCES wedding_sites(id)
);
```

---

## 📁 Project Structure

```
wedding-saas/
├── apps/
│   ├── marketing/              # Landing page & gallery
│   │   ├── app/
│   │   │   ├── page.tsx        # Hero + venue showcase
│   │   │   ├── venues/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Venue detail with 3D preview
│   │   └── package.json
│   │
│   ├── customer-portal/        # Dashboard & editor
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   ├── dashboard/
│   │   │   ├── venues/
│   │   │   │   └── page.tsx    # Browse & buy venues
│   │   │   ├── editor/
│   │   │   │   └── [siteId]/
│   │   │   │       └── page.tsx # 3D Venue Editor
│   │   │   └── orders/
│   │   ├── components/
│   │   │   ├── venue-preview/
│   │   │   ├── venue-editor/
│   │   │   └── walkthrough/
│   │   └── package.json
│   │
│   ├── wedding-renderer/       # Public wedding sites
│   │   ├── app/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Rendered wedding site
│   │   ├── components/
│   │   │   ├── ProceduralVenue.tsx
│   │   │   ├── WalkthroughScene.tsx
│   │   │   └── VenueContent.tsx
│   │   └── package.json
│   │
│   └── admin-dashboard/
│       └── src/
│           └── pages/
│               ├── venues/     # CRUD venues
│               ├── orders/
│               └── users/
│
├── packages/
│   ├── venue-engine/           # Core 3D engine
│   │   ├── src/
│   │   │   ├── configs/
│   │   │   │   ├── index.ts
│   │   │   │   ├── church-classic.ts
│   │   │   │   ├── church-modern.ts
│   │   │   │   ├── garden-daylight.ts
│   │   │   │   ├── garden-sunset.ts
│   │   │   │   ├── beach-day.ts
│   │   │   │   ├── beach-sunset.ts
│   │   │   │   ├── ballroom-gold.ts
│   │   │   │   └── ballroom-white.ts
│   │   │   ├── generators/
│   │   │   │   ├── floor-generator.ts
│   │   │   │   ├── seat-generator.ts
│   │   │   │   ├── altar-generator.ts
│   │   │   │   ├── decoration-generator.ts
│   │   │   │   └── particle-generator.ts
│   │   │   ├── components/
│   │   │   │   ├── VenueRenderer.tsx
│   │   │   │   ├── WalkthroughControls.tsx
│   │   │   │   ├── ParticleField.tsx
│   │   │   │   └── InstancedSeats.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useVenueProgress.ts
│   │   │   │   ├── useMobileDetect.ts
│   │   │   │   └── useOptimizedConfig.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       └── optimization.ts
│   │   └── package.json
│   │
│   ├── shared-types/
│   │   └── src/
│   │       ├── venue.ts
│   │       ├── user.ts
│   │       └── order.ts
│   │
│   └── ui-components/
│       └── src/
│
├── services/
│   └── api/
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── venues/
│       │   │   ├── orders/
│       │   │   ├── payments/
│       │   │   │   └── midtrans.service.ts
│       │   │   └── uploads/
│       │   └── main.ts
│       └── package.json
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 💳 Payment Integration (Midtrans)

### Supported Methods
- **Virtual Account**: BCA, BNI, BRI, Mandiri
- **E-Wallet**: GoPay, OVO, DANA, ShopeePay
- **QRIS**: Universal QR
- **Credit Card**: Visa, Mastercard, JCB

### Flow
```
1. User pilih venue → Klik "Beli"
2. Backend create order (status: pending)
3. Backend request payment token ke Midtrans
4. Frontend tampilkan Snap payment UI
5. User bayar
6. Midtrans webhook → update order status → grant access
```

---

## 🎨 Venue Gallery (Marketing Site)

```tsx
// apps/marketing/app/venues/page.tsx

export default function VenueGallery() {
  const venues = await fetchVenues();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Pilih Venue 3D Pernikahan Anda
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

function VenueCard({ venue }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
      {/* 3D Preview (demo mode) */}
      <div className="h-64 bg-gray-100 relative">
        <VenuePreview config={venue.config} demoMode />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white/90 p-4 rounded-full">
            ▶ Preview 3D
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold">{venue.name}</h3>
        <p className="text-gray-600 mt-2">{venue.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gold">
            Rp {venue.price.toLocaleString()}
          </span>
          
          <Link href={`/venues/${venue.slug}`}>
            <Button>Lihat Detail</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔥 Firebase Setup & Configuration

### Firebase Project Structure
```
Firebase Project: wedding-saas-prod
├── Authentication
│   ├── Email/Password: Enabled
│   ├── Google: Enabled
│   ├── Phone/OTP: Enabled (optional)
│   └── Email Link: Disabled
├── Storage
│   └── Bucket: wedding-saas-prod.appspot.com
└── Firestore (optional, untuk realtime features)
```

### Firebase Client Config (Frontend)
```typescript
// apps/customer-portal/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase (prevent double init)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
```

### Firebase Admin SDK (Backend)
```typescript
// services/api/src/config/firebase-admin.ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const firebaseAdmin = admin;
export const auth = admin.auth();
export const storage = admin.storage();
```

### Firebase Storage Security Rules
```javascript
// Untuk user uploads (foto, audio)
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads - hanya owner yang bisa akses
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024 // Max 10MB
                   && request.resource.contentType.matches('image/.*|audio/.*');
    }
    
    // Public venue assets (read-only)
    match /venues/{venueId}/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only admin via SDK
    }
    
    // Wedding site public assets (published sites)
    match /sites/{siteId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wedding-saas.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wedding-saas
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wedding-saas.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Backend (.env)
FIREBASE_PROJECT_ID=wedding-saas
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@wedding-saas.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=wedding-saas.appspot.com
```

### Protected Routes (Next.js)
```typescript
// apps/customer-portal/components/AuthGuard.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [auth, router]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  return authenticated ? <>{children}</> : null;
}

// Usage di layout
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <DashboardNav />
      {children}
    </AuthGuard>
  );
}
```

### API Security dengan Firebase Admin
```typescript
// services/api/src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// Decorator
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Usage di controller
@Controller('admin')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class AdminController {
  
  @Get('venues')
  @Roles('admin', 'super_admin')
  async getAllVenues() {
    // Hanya admin yang bisa akses
  }
  
  @Post('venues')
  @Roles('super_admin') // Hanya super admin yang bisa create
  async createVenue(@Body() data: CreateVenueDto) {
    // Create venue logic
  }
}
```

### Auth Context Provider
```typescript
// apps/customer-portal/providers/AuthProvider.tsx

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  getAuth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [auth]);
  
  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  
  const logout = async () => {
    await signOut(auth);
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      loginWithEmail, 
      loginWithGoogle, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

---

## 🛠️ Development Roadmap

### Phase 1: Core Engine (Month 1-2)
- [ ] Setup monorepo & CI/CD
- [ ] Procedural venue engine (Three.js)
- [ ] 4 base venues (Church, Garden, Beach, Ballroom)
- [ ] On-rails walkthrough system
- [ ] Mobile optimization

### Phase 2: Platform (Month 3)
- [ ] Marketing site dengan gallery
- [ ] Customer portal (auth, dashboard)
- [ ] Venue editor (customize colors, photos, etc)
- [ ] Wedding site renderer

### Phase 3: Commerce (Month 4)
- [ ] Midtrans integration
- [ ] Order management
- [ ] Access control system
- [ ] Admin dashboard

### Phase 4: Scale (Month 5+)
- [ ] Analytics dashboard
- [ ] 8+ venue variations
- [ ] Advanced customization
- [ ] Performance optimization

---

## 💰 Revenue Projection

| Bulan | Venues Sold | Avg Price | Revenue |
|-------|-------------|-----------|---------|
| 1-2 | 20 | Rp 150K | Rp 3M |
| 3-4 | 100 | Rp 150K | Rp 15M |
| 5-6 | 300 | Rp 175K | Rp 52.5M |
| 12 | 1000 | Rp 200K | Rp 200M |

---

## 📚 Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Full-Stack Framework** | Next.js 16 (App Router) |
| **UI** | React 19, TypeScript, Tailwind CSS |
| **3D Engine** | Three.js, React Three Fiber, @react-three/drei |
| **Database** | MySQL + Prisma ORM |
| **Storage** | Firebase Storage |
| **Payment** | Midtrans |
| **Auth** | Firebase Auth (Email, Google, Phone OTP) |
| **Identity Verification** | Firebase Admin SDK |
| **Hosting** | Vercel (full-stack) |

---

## 🎯 Key Differentiators

1. **Procedural 3D** - No download, instant load
2. **On-Rails Walkthrough** - Experience masuk venue tanpa motion sickness
3. **Mobile First** - Smooth 60fps di smartphone
4. **Pay-Per-Venue** - Fair pricing, user bayar sesuai pilihan
5. **Highly Customizable** - Ganti warna, foto, musik real-time

---

*Architecture designed for immersive wedding experience 🎊*
