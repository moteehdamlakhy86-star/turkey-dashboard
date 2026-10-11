'use client';
import { Place } from '@/types';
import { PlaceCard } from './PlaceCard';

interface PlacesGridProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

export function PlacesGrid({ places, onPlaceClick }: PlacesGridProps) {
  if (places.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl text-gray-400">لا توجد نتائج مطابقة</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {places.map((place, i) => <PlaceCard key={place.id} place={place} index={i} onClick={() => onPlaceClick(place)} />)}
    </div>
  );
}