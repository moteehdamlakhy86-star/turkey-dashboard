'use client';
import { useState, useMemo, useCallback } from 'react';
import { places } from '@/lib/data';
import { Place, ViewMode } from '@/types';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { PlacesGrid } from '@/components/dashboard/PlacesGrid';
import { PlacesTable } from '@/components/dashboard/PlacesTable';
import { Charts } from '@/components/dashboard/Charts';
import { DetailModal } from '@/components/dashboard/DetailModal';
import { LayoutGrid, Table, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    return places.filter(p => {
      if (selectedRegion && p.region !== selectedRegion) return false;
      if (selectedWilaya && p.wilaya !== selectedWilaya) return false;
      if (selectedLevel && p.level !== selectedLevel) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = [p.wilaya, p.region, p.qada, p.baladiya, p.fame, p.landmark, p.taste, p.product, p.economy, p.nature, p.climate, p.scope].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedRegion, selectedWilaya, selectedLevel]);

  const handleReset = useCallback(() => { 
    setSearch(''); 
    setSelectedRegion(''); 
    setSelectedWilaya(''); 
    setSelectedLevel(''); 
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-500 via-amber-500 to-teal-500 bg-clip-text text-transparent mb-3">
            🇹🇷 دليل تركيا المحلّي
          </h1>
          <p className="text-gray-400 text-lg">اكتشف الولايات والأقضية والبلديات بشكل تفاعلي</p>
        </header>

        <section className="mb-8"><StatsCards data={places} filtered={filteredPlaces} /></section>
        <section className="mb-6"><SearchBar value={search} onChange={setSearch} /></section>
        <section className="mb-6">
          <FilterPanel
            selectedRegion={selectedRegion} 
            selectedWilaya={selectedWilaya} 
            selectedLevel={selectedLevel}
            onRegionChange={setSelectedRegion} 
            onWilayaChange={setSelectedWilaya} 
            onLevelChange={setSelectedLevel}
            onReset={handleReset}
          />
        </section>

        <section className="mb-6 flex items-center justify-center gap-2 flex-wrap">
          {[
            { mode: 'cards' as ViewMode, icon: LayoutGrid, label: 'بطاقات' },
            { mode: 'table' as ViewMode, icon: Table, label: 'جدول' },
            { mode: 'charts' as ViewMode, icon: BarChart3, label: 'تحليلات' },
          ].map(({ mode, icon: Icon, label }) => (
            <button 
              key={mode} 
              onClick={() => setViewMode(mode)} 
              className={`px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                viewMode === mode 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'border border-white/10 bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </section>

        <section className="mb-6 text-center text-gray-400">
          عرض <span className="text-red-500 font-bold">{filteredPlaces.length}</span> من{' '}
          <span className="text-red-500 font-bold">{places.length}</span> سجل
        </section>

        <section>
          {viewMode === 'cards' && <PlacesGrid places={filteredPlaces} onPlaceClick={setSelectedPlace} />}
          {viewMode === 'table' && <PlacesTable places={filteredPlaces} onPlaceClick={setSelectedPlace} />}
          {viewMode === 'charts' && <Charts places={filteredPlaces} />}
        </section>

        <footer className="mt-16 text-center text-gray-400 border-t border-white/10 pt-8">
          <p className="text-lg font-bold mb-2">🇹🇷 دليل تركيا المحلّي 2026</p>
          <p className="text-sm">البيانات مستخرجة من مصادر رسمية • تحليلات ذكية</p>
        </footer>

        <DetailModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      </div>
    </div>
  );
}