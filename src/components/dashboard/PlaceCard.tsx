'use client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Place } from '@/types';
import { MapPin, Landmark, UtensilsCrossed, Package, ExternalLink } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
  index: number;
}

export function PlaceCard({ place, onClick, index }: PlaceCardProps) {
  const levelVariant = ({ 'ولاية': 'wilaya', 'قضاء': 'qada', 'بلدية': 'baladiya', 'بلدة': 'belde' } as const)[place.level] || 'wilaya';

  return (
    <Card onClick={onClick} className="overflow-hidden cursor-pointer group hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 relative" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-2xl font-black text-white group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-amber-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
              {place.wilaya}
            </h3>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {place.region}{place.qada !== '—' && ` • ${place.qada}`}
            </p>
          </div>
          <Badge variant={levelVariant}>{place.level}</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
            <Landmark className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div><p className="text-xs text-gray-400">المعلم</p><p className="text-sm font-medium text-white">{place.landmark}</p></div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
            <UtensilsCrossed className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div><p className="text-xs text-gray-400">المذاق</p><p className="text-sm font-medium text-white">{place.taste}</p></div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
            <Package className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
            <div><p className="text-xs text-gray-400">المنتج</p><p className="text-sm font-medium text-white">{place.product}</p></div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-400">{place.scope}</span>
          <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-teal-400 hover:text-white text-sm font-bold flex items-center gap-1 transition-colors">
            خريطة <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </Card>
  );
}