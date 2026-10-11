'use client';
import { useEffect } from 'react';
import { Place } from '@/types';
import { X, MapPin, Landmark, UtensilsCrossed, Package, Building2, Globe, ExternalLink } from 'lucide-react';

interface DetailModalProps { place: Place | null; onClose: () => void; }

export function DetailModal({ place, onClose }: DetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!place) return null;

  const details = [
    { icon: Landmark, label: 'الشهرة', value: place.fame, color: 'text-red-500' },
    { icon: Landmark, label: 'المعلم', value: place.landmark, color: 'text-red-500' },
    { icon: UtensilsCrossed, label: 'المذاق', value: place.taste, color: 'text-amber-500' },
    { icon: Package, label: 'المنتج', value: place.product, color: 'text-teal-500' },
    place.economy && { icon: Building2, label: 'الاقتصاد', value: place.economy, color: 'text-purple-400' },
    place.nature && { icon: MapPin, label: 'الطبيعة', value: place.nature, color: 'text-teal-400' },
    place.climate && { icon: Globe, label: 'المناخ', value: place.climate, color: 'text-amber-400' },
  ].filter(Boolean) as Array<{ icon: any; label: string; value: string; color: string }>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="rounded-3xl border border-white/10 bg-slate-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="mb-6">
          <h2 className="text-4xl font-black bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent mb-2">
            {place.wilaya}
          </h2>
          <p className="text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {place.region}
            {place.qada !== '—' && ` • ${place.qada}`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-red-500" />
              <p className="text-xs text-gray-400">المستوى</p>
            </div>
            <p className="font-bold text-white">{place.level}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-amber-500" />
              <p className="text-xs text-gray-400">النوع</p>
            </div>
            <p className="font-bold text-white">{place.type}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {details.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
                <IconComponent className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="font-medium text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <a 
          href={place.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full text-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          فتح في الخريطة
        </a>
      </div>
    </div>
  );
}