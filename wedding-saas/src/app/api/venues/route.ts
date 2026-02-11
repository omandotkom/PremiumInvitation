import { NextResponse } from 'next/server';
import { venues } from '@/lib/venues';

export async function GET() {
  try {
    const simplifiedVenues = venues.map((v) => ({
      id: v.id,
      name: v.name,
      slug: v.slug,
      description: v.description,
      price: v.price,
      thumbnail: v.thumbnail,
    }));

    return NextResponse.json({ venues: simplifiedVenues });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch venues' },
      { status: 500 }
    );
  }
}
