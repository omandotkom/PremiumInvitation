'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { VenueRenderer } from '@/components/venue-engine/VenueRenderer';
import { getVenueBySlug } from '@/lib/venues';
import { VenueConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function VenueDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [venue, setVenue] = useState<VenueConfig | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileDetect();

  useEffect(() => {
    const venueConfig = getVenueBySlug(slug);
    if (venueConfig) {
      setVenue(venueConfig);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Venue tidak ditemukan</h1>
        <Link href="/venues">
          <Button>Kembali ke Gallery</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/venues">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{venue.name}</span>
            <span className="text-lg font-bold text-stone-800">
              Rp {venue.price.toLocaleString('id-ID')}
            </span>
            <Button size="sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="h-screen pt-16">
        <VenueRenderer
          config={venue}
          progress={progress}
          onProgressChange={setProgress}
          isMobile={isMobile}
        />
      </div>

      {/* Progress Control */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-4">
        <div className="container mx-auto max-w-md">
          <p className="text-center text-sm text-stone-600 mb-2">
            Gulir atau geser untuk berjalan ke altar
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-stone-500 mt-1">
            <span>Pintu Masuk</span>
            <span>Altar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
