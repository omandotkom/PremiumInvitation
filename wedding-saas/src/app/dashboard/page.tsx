'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Heart } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-stone-600">Selamat datang, {user.displayName || user.email}</p>
        </div>
        <Link href="/venues">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Buat Undangan Baru
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Undangan Saya
            </CardTitle>
            <CardDescription>
              Anda belum memiliki undangan aktif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/venues">
              <Button variant="outline" className="w-full">
                Pilih Venue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
