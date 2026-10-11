'use client';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث عن ولاية، قضاء، معلم، أكلة، منتج..."
        className="w-full pr-12 pl-12 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-lg outline-none focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 transition-all placeholder:text-gray-400 text-white"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}