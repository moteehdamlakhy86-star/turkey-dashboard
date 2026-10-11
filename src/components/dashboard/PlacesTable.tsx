'use client';
import { Place } from '@/types';
import { Badge } from '@/components/ui/badge';

interface PlacesTableProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

export function PlacesTable({ places, onPlaceClick }: PlacesTableProps) {
  const levelVariant = (level: string) => ({ 'ولاية': 'wilaya', 'قضاء': 'qada', 'بلدية': 'baladiya', 'بلدة': 'belde' } as const)[level] || 'wilaya';
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800/50 border-b border-white/10">
              {['الولاية','الإقليم','المستوى','القضاء','الشهرة','المعلم','المذاق','المنتج'].map(h => (
                <th key={h} className="text-right p-4 font-bold text-amber-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place.id} onClick={() => onPlaceClick(place)} className="border-b border-white/10 hover:bg-red-500/5 cursor-pointer transition-colors">
                <td className="p-4 font-bold text-white">{place.wilaya}</td>
                <td className="p-4 text-gray-400">{place.region}</td>
                <td className="p-4"><Badge variant={levelVariant(place.level)}>{place.level}</Badge></td>
                <td className="p-4 text-white">{place.qada}</td>
                <td className="p-4 text-sm text-white">{place.fame}</td>
                <td className="p-4 text-sm text-white">{place.landmark}</td>
                <td className="p-4 text-sm text-white">{place.taste}</td>
                <td className="p-4 text-sm text-white">{place.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}