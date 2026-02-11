'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch('/api/venues');
        const data = await response.json();
        setVenues(data.venues || []);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Pilih Venue Pernikahan 3D
      </h1>
      <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
        Temukan venue virtual yang sempurna untuk undangan pernikahan digital Anda. 
        Setiap venue menawarkan pengalaman 3D yang immersive dan dapat dikustomisasi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Card key={venue.id} className="overflow-hidden">
            <div className="aspect-video bg-stone-200 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-300 to-stone-400">
                <span className="text-4xl">💒</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{venue.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-stone-600 text-sm mb-4">{venue.description}</p>
              <p className="text-2xl font-bold text-stone-800">
                Rp {venue.price.toLocaleString('id-ID')}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/venue/${venue.slug}`} className="w-full">
                <Button className="w-full">Lihat Detail</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
