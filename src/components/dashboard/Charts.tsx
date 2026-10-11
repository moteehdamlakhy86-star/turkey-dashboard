'use client';
import { Card } from '@/components/ui/card';
import { Place } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ChartsProps { places: Place[]; }
const COLORS = ['#e63946', '#f4a261', '#2a9d8f', '#a855f7', '#3b82f6', '#ec4899', '#14b8a6'];

export function Charts({ places }: ChartsProps) {
  const regionData = Object.entries(places.reduce((acc, p) => { acc[p.region] = (acc[p.region] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));
  const wilayaData = Object.entries(places.reduce((acc, p) => { acc[p.wilaya] = (acc[p.wilaya] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  const levelData = Object.entries(places.reduce((acc, p) => { acc[p.level] = (acc[p.level] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">التوزيع حسب الإقليم</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={regionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
              {regionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">الولايات الأكثر توثيقاً</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={wilayaData} layout="vertical">
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis type="category" dataKey="name" stroke="#94a3b8" width={80} />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
            <Bar dataKey="value" fill="#e63946" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">التوزيع حسب المستوى الإداري</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={levelData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {levelData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}