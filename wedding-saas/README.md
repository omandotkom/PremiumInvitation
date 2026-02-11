# Wedding SaaS 3D

Platform SaaS untuk pembuatan undangan pernikahan 3D dengan fitur Procedural Venue Walkthrough.

## 🎯 Features

- **3D Venue Walkthrough** - Pengalaman jalan di aisle menuju altar dalam environment 3D
- **Procedural Rendering** - Venue 3D dibuat secara real-time tanpa file model berat
- **Pay-Per-Template** - User membayar per venue template yang dipilih
- **Firebase Auth** - Login dengan Email, Google, atau Phone OTP
- **Midtrans Payment** - Pembayaran via VA, E-wallet, QRIS, Credit Card

## 🚀 Tech Stack

- **Framework**: Next.js 16 + React 19
- **3D Engine**: Three.js + React Three Fiber
- **Database**: MySQL + Prisma ORM
- **Auth**: Firebase Auth
- **Storage**: Firebase Storage
- **Payment**: Midtrans
- **Styling**: Tailwind CSS + shadcn/ui

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public pages
│   ├── (auth)/             # Auth pages (login/register)
│   ├── (dashboard)/        # Protected routes
│   ├── api/                # API Routes
│   └── [slug]/             # Public wedding sites
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── venue-engine/       # 3D components
├── hooks/                  # React hooks
├── lib/
│   ├── venues/             # Venue configurations
│   ├── firebase.ts         # Firebase client
│   ├── firebase-admin.ts   # Firebase admin
│   └── prisma.ts           # Database client
└── types/                  # TypeScript types
```

## 🎨 Venue Templates

| Venue | Price | Description |
|-------|-------|-------------|
| Church Classic | Rp 149.000 | Gereja klasik dengan interior elegan |
| Garden Daylight | Rp 129.000 | Pernikahan outdoor di taman asri |

## 🛠️ Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit with your Firebase and Midtrans credentials
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Mobile Optimization

- Adaptive quality berdasarkan device
- InstancedMesh untuk performa kursi
- Fog untuk menyembunyikan objek jauh
- Touch controls untuk mobile

## 🔐 Authentication

- Firebase Auth untuk client-side
- Firebase Admin SDK untuk API verification
- Protected routes dengan AuthProvider

## 💳 Payment Flow

1. User pilih venue
2. Create order (status: pending)
3. Generate Midtrans snap token
4. User bayar
5. Webhook update order status
6. Grant access ke editor

## 🎮 3D Controls

- **Desktop**: Scroll mouse untuk maju/mundur
- **Mobile**: Swipe up/down untuk maju/mundur
- **Progress Bar**: Drag slider di bottom screen

## ⚠️ Known Issues

- Prisma 7 memiliki breaking changes dengan schema format
- Database implementation perlu adjustment untuk Prisma 7

## 📝 License

MIT
