import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Palette, Share2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-stone-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-300 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-stone-800">
            Wedding 3D
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-2xl mx-auto">
            Buat undangan pernikahan virtual yang memukau dengan pengalaman 3D yang immersive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/venues">
              <Button size="lg" className="text-lg px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                Lihat Venue
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kenapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Venue 3D Eksklusif</h3>
              <p className="text-stone-600">Pilih dari berbagai venue 3D yang dapat dikustomisasi sesuai keinginan Anda</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pengalaman Immersive</h3>
              <p className="text-stone-600">Tamu undangan dapat &quot;berjalan&quot; di venue virtual menuju altar</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mudah Dibagikan</h3>
              <p className="text-stone-600">Bagikan undangan digital melalui link yang dapat diakses di semua perangkat</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Membuat Undangan 3D Anda?
          </h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Mulai dari Rp 49.000, Anda dapat memiliki undangan pernikahan digital yang tak terlupakan
          </p>
          <Link href="/venues">
            <Button size="lg" className="text-lg px-8 bg-white text-stone-800 hover:bg-stone-100">
              Pilih Venue Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
