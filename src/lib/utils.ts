import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCoordinates(mapUrl: string): { lat: number; lon: number } {
  try {
    const match = mapUrl.match(/query=([^&]+)/);
    if (match) {
      const query = decodeURIComponent(match[1]);
      const parts = query.split(',').map(p => p.trim());
      if (parts.length >= 2) {
        const lat = parseFloat(parts[0]);
        const lon = parseFloat(parts[1]);
        if (!isNaN(lat) && !isNaN(lon)) {
          return { lat, lon };
        }
      }
    }
  } catch (e) {
    console.error('Error extracting coordinates:', e);
  }
  return { lat: 39.0, lon: 35.0 };
}