'use client';
import { Card } from '@/components/ui/card';
import { Place } from '@/types';
import { MapPin, Building2, Map, Layers } from 'lucide-react';

interface StatsCardsProps {
  data: Place[];
  filtered: Place[];
}

export function StatsCards({ data, filtered }: StatsCardsProps) {
  const stats = [
    { label: 'سجل معروض', value: filtered.length, total: data.length, icon: Layers, color: 'from-red-500 to-orange-500' },
    { label: 'ولاية', value: new Set(filtered.map(p => p.wilaya)).size, icon: Building2, color: 'from-teal-500 to-cyan-500' },
    { label: 'إقليم', value: new Set(filtered.map(p => p.region)).size, icon: Map, color: 'from-amber-500 to-yellow-500' },
    { label: 'قضاء', value: filtered.filter(p => p.level === 'قضاء').length, icon: MapPin, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="p-6 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              {stat.total && <p className="text-xs text-gray-400 mt-1">من {stat.total}</p>}
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}