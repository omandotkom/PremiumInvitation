import { ChurchClassicConfig } from './church-classic';
import { ChurchModernConfig } from './church-modern';
import { GardenDaylightConfig } from './garden-daylight';
import { GardenSunsetConfig } from './garden-sunset';
import { GardenNightConfig } from './garden-night';
import { BeachDayConfig } from './beach-day';
import { BeachSunsetConfig } from './beach-sunset';
import { BallroomGoldConfig } from './ballroom-gold';
import { BallroomWhiteConfig } from './ballroom-white';
import { RusticBarnConfig } from './rustic-barn';
import { WinterWonderlandConfig } from './winter-wonderland';
import { RoyalPalaceConfig } from './royal-palace';
import { VenueConfig } from '@/types';

export const venues: VenueConfig[] = [
  ChurchClassicConfig,      // Rp 149.000
  ChurchModernConfig,       // Rp 169.000
  GardenDaylightConfig,     // Rp 129.000
  GardenSunsetConfig,       // Rp 189.000
  GardenNightConfig,        // Rp 219.000
  BeachDayConfig,           // Rp 199.000
  BeachSunsetConfig,        // Rp 249.000
  BallroomGoldConfig,       // Rp 299.000
  BallroomWhiteConfig,      // Rp 279.000
  RusticBarnConfig,         // Rp 159.000
  WinterWonderlandConfig,   // Rp 329.000
  RoyalPalaceConfig,        // Rp 399.000
];

export function getVenueBySlug(slug: string): VenueConfig | undefined {
  return venues.find((v) => v.slug === slug);
}

export function getVenueById(id: string): VenueConfig | undefined {
  return venues.find((v) => v.id === id);
}

export * from './church-classic';
export * from './church-modern';
export * from './garden-daylight';
export * from './garden-sunset';
export * from './garden-night';
export * from './beach-day';
export * from './beach-sunset';
export * from './ballroom-gold';
export * from './ballroom-white';
export * from './rustic-barn';
export * from './winter-wonderland';
export * from './royal-palace';
