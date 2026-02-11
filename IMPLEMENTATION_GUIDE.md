# 🚀 Implementation Guide - Wedding SaaS 3D

## 📋 Ringkasan untuk AI Agent

**Project**: SaaS Undangan Pernikahan 3D dengan Procedural Venue Walkthrough
**Stack**: Next.js 16 (Full-stack) + React 19 + Three.js + Firebase Auth + MySQL (Prisma) + Midtrans
**Arsitektur**: Single Next.js app (frontend + backend API routes)

---

## 🎯 Goals

1. **Marketing Site**: Gallery venue dengan preview 3D
2. **Customer Portal**: Auth, dashboard, editor, order management
3. **3D Venue Engine**: Procedural venue renderer dengan walkthrough
4. **Payment**: Midtrans integration
5. **Public Sites**: Generated wedding invitation sites

---

## 📁 Folder Structure (Final)

```
wedding-saas/
├── prisma/
│   └── schema.prisma          # Database schema
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (marketing)/       # Public pages
│   │   │   ├── page.tsx       # Landing
│   │   │   ├── venues/
│   │   │   │   └── page.tsx   # Venue gallery
│   │   │   └── venue/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (auth)/            # Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (dashboard)/       # Protected routes
│   │   │   ├── layout.tsx     # AuthGuard
│   │   │   ├── dashboard/
│   │   │   ├── venues/
│   │   │   ├── editor/
│   │   │   │   └── [siteId]/
│   │   │   └── orders/
│   │   │
│   │   ├── api/               # Backend API
│   │   │   ├── auth/
│   │   │   │   └── verify/route.ts
│   │   │   ├── venues/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── orders/
│   │   │   │   └── route.ts
│   │   │   ├── payments/
│   │   │   │   ├── create/route.ts
│   │   │   │   └── callback/route.ts
│   │   │   └── upload/
│   │   │       └── url/route.ts
│   │   │
│   │   └── [slug]/            # Public wedding sites
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── venue-engine/      # 3D Components
│   │   │   ├── VenueRenderer.tsx
│   │   │   ├── WalkthroughControls.tsx
│   │   │   ├── ProceduralFloor.tsx
│   │   │   ├── ProceduralSeats.tsx
│   │   │   ├── ProceduralAltar.tsx
│   │   │   └── ParticleField.tsx
│   │   ├── auth/
│   │   ├── ui/                # Shadcn/ui components
│   │   └── marketing/
│   │
│   ├── lib/
│   │   ├── firebase.ts        # Firebase client
│   │   ├── firebase-admin.ts  # Firebase admin
│   │   ├── prisma.ts          # Database client
│   │   ├── midtrans.ts        # Payment config
│   │   └── venues/            # Venue configs
│   │       ├── index.ts
│   │       ├── church-classic.ts
│   │       ├── garden-daylight.ts
│   │       ├── beach-sunset.ts
│   │       └── ballroom-gold.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useVenueProgress.ts
│   │   └── useMobileDetect.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       └── helpers.ts
│
├── public/
│   └── fonts/
│
├── .env.local                 # Frontend env
├── .env                       # Backend env
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 📦 Dependencies (package.json)

> ⚠️ **Next.js 16 Breaking Changes**: `cookies()`, `headers()`, dan `params` tetap async (sama seperti v15). React 19 sekarang stable.

```json
{
  "dependencies": {
    "next": "16.x",
    "react": "19.x",
    "react-dom": "19.x",
    "typescript": "5.x",
    
    "@prisma/client": "5.x",
    "prisma": "5.x",
    
    "firebase": "10.x",
    "firebase-admin": "12.x",
    
    "three": "0.160.x",
    "@react-three/fiber": "8.x",
    "@react-three/drei": "9.x",
    
    "midtrans-client": "1.x",
    
    "tailwindcss": "3.x",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest",
    
    "zod": "3.x",
    "react-hook-form": "7.x",
    "@hookform/resolvers": "latest",
    
    "date-fns": "3.x",
    "uuid": "9.x",
    "@types/uuid": "9.x"
  },
  "devDependencies": {
    "@types/node": "20.x",
    "@types/react": "18.x",
    "@types/three": "0.160.x",
    "autoprefixer": "10.x",
    "postcss": "8.x",
    "eslint": "8.x",
    "eslint-config-next": "14.x"
  }
}
```

---

## 🗄️ Prisma Schema (Lengkap)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id            Int      @id @default(autoincrement())
  firebaseUid   String   @unique @map("firebase_uid")
  email         String   @unique
  name          String?
  phone         String?
  photoUrl      String?  @map("photo_url")
  weddingDate   DateTime? @map("wedding_date")
  partnerName   String?  @map("partner_name")
  role          Role     @default(customer)
  isActive      Boolean  @default(true) @map("is_active")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  
  orders        Order[]
  weddingSites  WeddingSite[]
  
  @@index([firebaseUid])
  @@index([email])
  @@map("users")
}

model Venue {
  id              String   @id
  slug            String   @unique
  name            String
  description     String   @db.Text
  price           Decimal  @db.Decimal(12, 2)
  thumbnailUrl    String   @map("thumbnail_url")
  previewGallery  String?  @map("preview_gallery") @db.Json
  configJson      String   @map("config_json") @db.LongText
  mobileConfigJson String? @map("mobile_config_json") @db.LongText
  isActive        Boolean  @default(true) @map("is_active")
  isFeatured      Boolean  @default(false) @map("is_featured")
  sortOrder       Int      @default(0) @map("sort_order")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  orders          Order[]
  weddingSites    WeddingSite[]
  
  @@index([isActive])
  @@index([isFeatured])
  @@map("venues")
}

model Order {
  id                    String   @id @default(uuid())
  userId                Int      @map("user_id")
  firebaseUid           String   @map("firebase_uid")
  venueId               String   @map("venue_id")
  amount                Decimal  @db.Decimal(12, 2)
  discountAmount        Decimal  @default(0) @map("discount_amount")
  finalAmount           Decimal  @map("final_amount")
  status                OrderStatus @default(pending)
  paymentMethod         String?  @map("payment_method")
  paymentToken          String?  @map("payment_token")
  paymentResponse       String?  @map("payment_response") @db.Json
  paidAt                DateTime? @map("paid_at")
  editAccessExpiresAt   DateTime? @map("edit_access_expires_at")
  createdAt             DateTime @default(now()) @map("created_at")
  
  user                  User     @relation(fields: [userId], references: [id])
  venue                 Venue    @relation(fields: [venueId], references: [id])
  weddingSite           WeddingSite?
  
  @@index([userId])
  @@index([firebaseUid])
  @@index([venueId])
  @@index([status])
  @@map("orders")
}

model WeddingSite {
  id              String   @id @default(uuid())
  userId          Int      @map("user_id")
  firebaseUid     String   @map("firebase_uid")
  orderId         String   @unique @map("order_id")
  venueId         String   @map("venue_id")
  slug            String   @unique
  contentJson     String   @map("content_json") @db.LongText
  settingsJson    String?  @map("settings_json") @db.Json
  status          SiteStatus @default(draft)
  publishedAt     DateTime? @map("published_at")
  expiresAt       DateTime? @map("expires_at")
  viewCount       Int      @default(0) @map("view_count")
  rsvpCount       Int      @default(0) @map("rsvp_count")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  user            User     @relation(fields: [userId], references: [id])
  order           Order    @relation(fields: [orderId], references: [id])
  venue           Venue    @relation(fields: [venueId], references: [id])
  rsvps           Rsvp[]
  guestMessages   GuestMessage[]
  
  @@index([slug])
  @@index([firebaseUid])
  @@index([venueId])
  @@index([status])
  @@map("wedding_sites")
}

model Rsvp {
  id              Int      @id @default(autoincrement())
  weddingSiteId   String   @map("wedding_site_id")
  name            String
  phone           String?
  attendance      Attendance
  numberOfGuests  Int      @default(1) @map("number_of_guests")
  message         String?  @db.Text
  createdAt       DateTime @default(now()) @map("created_at")
  
  weddingSite     WeddingSite @relation(fields: [weddingSiteId], references: [id])
  
  @@index([weddingSiteId])
  @@map("rsvps")
}

model GuestMessage {
  id              Int      @id @default(autoincrement())
  weddingSiteId   String   @map("wedding_site_id")
  senderName      String   @map("sender_name")
  message         String   @db.Text
  isPublic        Boolean  @default(true) @map("is_public")
  createdAt       DateTime @default(now()) @map("created_at")
  
  weddingSite     WeddingSite @relation(fields: [weddingSiteId], references: [id])
  
  @@index([weddingSiteId])
  @@map("guest_messages")
}

enum Role {
  customer
  admin
  super_admin
}

enum OrderStatus {
  pending
  paid
  failed
  expired
  refunded
}

enum SiteStatus {
  draft
  published
  expired
}

enum Attendance {
  yes
  no
  maybe
}
```

---

## 🔧 Environment Variables

### .env.local (Frontend + Development)
```bash
# Database
DATABASE_URL="mysql://user:password@localhost:3306/wedding_saas"

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Midtrans
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
MIDTRANS_IS_PRODUCTION=false

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### .env (Production Secrets)
```bash
# Firebase Admin
FIREBASE_PROJECT_ID=your-project
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxx\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# Database
DATABASE_URL="mysql://user:password@your-db-host:3306/wedding_saas"

# Midtrans Production
MIDTRANS_SERVER_KEY=Mid-server-prod-xxx
MIDTRANS_IS_PRODUCTION=true
```

---

## 🎨 Venue Config Interface

```typescript
// src/lib/venues/types.ts

export interface VenueConfig {
  id: string;
  name: string;
  slug: string;
  price: number;
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
    floor: {
      type: 'checkerboard' | 'solid' | 'wood';
      colors?: string[];
      color?: string;
    };
    aisle: {
      type: 'carpet' | 'runner' | 'petals';
      color: string;
    };
    seats: {
      type: 'wooden-bench' | 'tiffany-chair' | 'pillow';
      countPerSide: number;
      spacing: number;
      color: string;
    };
    altar: {
      type: 'arch-with-cross' | 'floral-arch' | 'simple' | 'mandap';
      height: number;
      width: number;
      color: string;
    };
    decorations: DecorationConfig[];
    lighting: LightConfig[];
    particles?: {
      type: 'dust-motes' | 'petals' | 'fireflies';
      count: number;
      color: string;
    };
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

// Example: Church Classic
export const ChurchClassicConfig: VenueConfig = {
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
      colors: ['#FFFFFF', '#E8E8E8']
    },
    aisle: {
      type: 'carpet',
      color: '#C41E3A'
    },
    seats: {
      type: 'wooden-bench',
      countPerSide: 8,
      spacing: 1.5,
      color: '#8B4513'
    },
    altar: {
      type: 'arch-with-cross',
      height: 4,
      width: 3,
      color: '#D4AF37'
    },
    decorations: [
      {
        type: 'flower-pillar',
        position: [-3, 0, -5],
        flowerType: 'rose',
        color: '#FF69B4'
      },
      {
        type: 'flower-pillar',
        position: [3, 0, -5],
        flowerType: 'rose',
        color: '#FF69B4'
      }
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

## 🔌 API Endpoints Specification

### Auth
```
POST /api/auth/verify
- Verify Firebase ID token
- Create/sync user in MySQL
- Returns: User data
```

### Venues
```
GET /api/venues
- Returns: Array of venues (public)
- Filter: ?featured=true

GET /api/venues/[id]
- Returns: Single venue detail
```

### Orders
```
POST /api/orders
- Body: { venueId }
- Auth: Required
- Returns: { orderId, snapToken }

GET /api/orders
- Auth: Required
- Returns: User's orders
```

### Payments
```
POST /api/payments/create
- Body: { orderId }
- Auth: Required
- Returns: Midtrans snap token

POST /api/payments/callback
- Midtrans webhook
- Updates order status
```

### Upload
```
POST /api/upload/url
- Auth: Required
- Body: { filename, contentType }
- Returns: { signedUrl, publicUrl }
```

---

## 📱 Implementation Priority

### Phase 1: Core Setup
1. Initialize Next.js project with shadcn/ui
2. Setup Prisma + MySQL schema
3. Setup Firebase Auth (Client + Admin)
4. Create Venue Configs (3 venues minimum)

### Phase 2: 3D Engine
1. VenueRenderer component
2. Procedural generators (floor, seats, altar)
3. WalkthroughControls (scroll + touch)
4. Mobile optimization

### Phase 3: Features
1. Marketing pages (landing, gallery)
2. Auth pages (login, register)
3. Dashboard + Editor
4. Public wedding site renderer

### Phase 4: Commerce
1. Midtrans integration
2. Order management
3. Webhook handling
4. Access control (30 days expiry)

---

## ⚠️ Critical Notes untuk AI Agent

1. **Procedural 3D**: Tidak ada file .glb - semua geometry dibuat via Three.js code
2. **Mobile First**: Test performance di HP, gunakan InstancedMesh untuk kursi
3. **Firebase Auth**: Token verifikasi wajib di API routes
4. **On-Rails Controls**: User hanya bisa maju/mundur (tidak bebas jalan)
5. **Pay-Per-Template**: Tidak ada tier, harga di setiap venue
6. **Storage**: User uploads ke Firebase Storage, bukan local/MySQL

---

Brief lengkap siap dieksekusi! 🚀
