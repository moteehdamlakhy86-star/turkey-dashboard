'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: 'white', padding: '40px', fontFamily: 'Tajawal, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🇹🇷 دليل تركيا المحلّي 2026</h1>
      <p style={{ fontSize: '1.2rem', color: '#8892b0' }}>الداشبورد شغال بنجاح!</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          marginTop: '20px', 
          padding: '12px 24px', 
          background: '#e63946', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        عدد النقرات: {count}
      </button>
    </div>
  );
}