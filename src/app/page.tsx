'use client';
import { useState, useMemo } from 'react';
import { places } from '@/lib/data';
import { Place } from '@/types';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const regions = [...new Set(places.map(p => p.region))].sort();
  const wilayas = [...new Set(places.map(p => p.wilaya))].sort();

  const filteredPlaces = useMemo(() => {
    return places.filter(p => {
      if (selectedRegion && p.region !== selectedRegion) return false;
      if (selectedWilaya && p.wilaya !== selectedWilaya) return false;
      if (selectedLevel && p.level !== selectedLevel) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = [p.wilaya, p.region, p.qada, p.baladiya, p.fame, p.landmark, p.taste, p.product].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedRegion, selectedWilaya, selectedLevel]);

  const getBadgeClass = (level: string) => {
    const map: Record<string, string> = {
      'ولاية': 'badge-wilaya',
      'قضاء': 'badge-qada',
      'بلدية': 'badge-baladiya',
      'بلدة': 'badge-belde',
    };
    return map[level] || 'badge-wilaya';
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🇹🇷 دليل تركيا المحلّي</h1>
        <p>اكتشف الولايات والأقضية والبلديات بشكل تفاعلي</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{filteredPlaces.length}</div>
          <div className="stat-label">سجل معروض</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{new Set(filteredPlaces.map(p => p.wilaya)).size}</div>
          <div className="stat-label">ولاية</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{new Set(filteredPlaces.map(p => p.region)).size}</div>
          <div className="stat-label">إقليم</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredPlaces.filter(p => p.level === 'قضاء').length}</div>
          <div className="stat-label">قضاء</div>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن ولاية، قضاء، معلم، أكلة، منتج..."
        />
      </div>

      <div className="filter-panel">
        <h3>🎛️ الفلاتر</h3>
        <div className="filter-grid">
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="">كل الأقاليم</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={selectedWilaya} onChange={(e) => setSelectedWilaya(e.target.value)}>
            <option value="">كل الولايات</option>
            {wilayas.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="">كل المستويات</option>
            <option value="ولاية">ولاية</option>
            <option value="قضاء">قضاء</option>
            <option value="بلدية">بلدية</option>
            <option value="بلدة">بلدة</option>
          </select>
          <button onClick={() => { setSearch(''); setSelectedRegion(''); setSelectedWilaya(''); setSelectedLevel(''); }}>
             إعادة تعيين
          </button>
        </div>
      </div>

      <div className="view-toggle">
        <button 
          className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
          onClick={() => setViewMode('cards')}
        >
          🃏 بطاقات
        </button>
        <button 
          className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => setViewMode('table')}
        >
          📊 جدول
        </button>
      </div>

      <div className="results-count">
        عرض <span>{filteredPlaces.length}</span> من <span>{places.length}</span> سجل
      </div>

      {viewMode === 'cards' && (
        <div className="cards-grid">
          {filteredPlaces.map((place) => (
            <div 
              key={place.id} 
              className="place-card"
              onClick={() => setSelectedPlace(place)}
            >
              <div className="card-header">
                <div>
                  <h3 className="card-title">{place.wilaya}</h3>
                  <p className="card-region">📍 {place.region}{place.qada !== '—' && ` • ${place.qada}`}</p>
                </div>
                <span className={`badge ${getBadgeClass(place.level)}`}>{place.level}</span>
              </div>
              <div className="info-row">
                <span className="info-icon">🏛️</span>
                <div>
                  <div className="info-label">المعلم</div>
                  <div className="info-value">{place.landmark}</div>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon">️</span>
                <div>
                  <div className="info-label">المذاق</div>
                  <div className="info-value">{place.taste}</div>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon">📦</span>
                <div>
                  <div className="info-label">المنتج</div>
                  <div className="info-value">{place.product}</div>
                </div>
              </div>
              <div className="card-footer">
                <span className="card-scope">{place.scope}</span>
                <a 
                  href={place.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="card-map"
                >
                  ️ خريطة
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="table-view">
          <table>
            <thead>
              <tr>
                <th>الولاية</th>
                <th>الإقليم</th>
                <th>المستوى</th>
                <th>القضاء</th>
                <th>الشهرة</th>
                <th>المعلم</th>
                <th>المذاق</th>
                <th>المنتج</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place) => (
                <tr key={place.id} onClick={() => setSelectedPlace(place)} style={{ cursor: 'pointer' }}>
                  <td><strong>{place.wilaya}</strong></td>
                  <td>{place.region}</td>
                  <td><span className={`badge ${getBadgeClass(place.level)}`}>{place.level}</span></td>
                  <td>{place.qada}</td>
                  <td>{place.fame}</td>
                  <td>{place.landmark}</td>
                  <td>{place.taste}</td>
                  <td>{place.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="footer">
        <p>🇷 دليل تركيا المحلّي 2026</p>
        <p>البيانات مستخرجة من مصادر رسمية</p>
      </footer>

      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPlace(null)}></button>
            <h2>{selectedPlace.wilaya}</h2>
            <p style={{ color: '#8892b0' }}>📍 {selectedPlace.region}{selectedPlace.qada !== '—' && ` • ${selectedPlace.qada}`}</p>
            
            <div className="modal-grid">
              <div className="modal-item">
                <div className="modal-item-label">المستوى</div>
                <div className="modal-item-value">{selectedPlace.level}</div>
              </div>
              <div className="modal-item">
                <div className="modal-item-label">النوع</div>
                <div className="modal-item-value">{selectedPlace.type}</div>
              </div>
            </div>

            <div className="modal-details">
              <div className="modal-detail-row">
                <span className="modal-detail-icon">⭐</span>
                <div className="modal-detail-content">
                  <div className="modal-detail-label">الشهرة</div>
                  <div className="modal-detail-value">{selectedPlace.fame}</div>
                </div>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-icon">🏛️</span>
                <div className="modal-detail-content">
                  <div className="modal-detail-label">المعلم</div>
                  <div className="modal-detail-value">{selectedPlace.landmark}</div>
                </div>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-icon">🍽️</span>
                <div className="modal-detail-content">
                  <div className="modal-detail-label">المذاق</div>
                  <div className="modal-detail-value">{selectedPlace.taste}</div>
                </div>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-icon">📦</span>
                <div className="modal-detail-content">
                  <div className="modal-detail-label">المنتج</div>
                  <div className="modal-detail-value">{selectedPlace.product}</div>
                </div>
              </div>
              {selectedPlace.economy && (
                <div className="modal-detail-row">
                  <span className="modal-detail-icon">💼</span>
                  <div className="modal-detail-content">
                    <div className="modal-detail-label">الاقتصاد</div>
                    <div className="modal-detail-value">{selectedPlace.economy}</div>
                  </div>
                </div>
              )}
              {selectedPlace.nature && (
                <div className="modal-detail-row">
                  <span className="modal-detail-icon">🌿</span>
                  <div className="modal-detail-content">
                    <div className="modal-detail-label">الطبيعة</div>
                    <div className="modal-detail-value">{selectedPlace.nature}</div>
                  </div>
                </div>
              )}
              {selectedPlace.climate && (
                <div className="modal-detail-row">
                  <span className="modal-detail-icon">️</span>
                  <div className="modal-detail-content">
                    <div className="modal-detail-label">المناخ</div>
                    <div className="modal-detail-value">{selectedPlace.climate}</div>
                  </div>
                </div>
              )}
            </div>

            <a 
              href={selectedPlace.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="modal-map-btn"
            >
              ️ فتح في الخريطة
            </a>
          </div>
        </div>
      )}
    </div>
  );
}