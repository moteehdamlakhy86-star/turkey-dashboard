'use client';
import { regions, wilayas, levels } from '@/lib/data';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  selectedRegion: string;
  selectedWilaya: string;
  selectedLevel: string;
  onRegionChange: (v: string) => void;
  onWilayaChange: (v: string) => void;
  onLevelChange: (v: string) => void;
  onReset: () => void;
}

export function FilterPanel({ selectedRegion, selectedWilaya, selectedLevel, onRegionChange, onWilayaChange, onLevelChange, onReset }: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-red-500" />
        <h3 className="font-bold text-white">الفلاتر</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select value={selectedRegion} onChange={(e) => onRegionChange(e.target.value)} className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors cursor-pointer text-white">
          <option value="">كل الأقاليم</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={selectedWilaya} onChange={(e) => onWilayaChange(e.target.value)} className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors cursor-pointer text-white">
          <option value="">كل الولايات</option>
          {wilayas.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
        <select value={selectedLevel} onChange={(e) => onLevelChange(e.target.value)} className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors cursor-pointer text-white">
          <option value="">كل المستويات</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button onClick={onReset} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 font-bold transition-all hover:scale-105 flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" />
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}