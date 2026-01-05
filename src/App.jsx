import React, { useState, useEffect } from 'react';

// --- Sub-Components ---

const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b border-blue-500/30 p-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-xl tracking-tight text-blue-400">EE-Toolkit</span>
      </div>
      <div className="flex space-x-2">
        {['home', 'decoder', 'calculator', 'capacitor', 'insulation'].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md text-sm capitalize ${
              currentPage === page ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {page === 'insulation' ? 'Safety' : page}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

const HomePage = ({ onNavigate }) => (
  <div className="space-y-12 py-8 text-center">
    <h1 className="text-4xl font-extrabold text-slate-900">Engineering Toolset</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {[
        { id: 'decoder', title: 'Color Decoder', icon: '🎨' },
        { id: 'calculator', title: 'Network Analysis', icon: '🔢' },
        { id: 'capacitor', title: 'RC Estimator', icon: '⚡' },
        { id: 'insulation', title: 'Safety Monitor', icon: '⚠️' }
      ].map((tool) => (
        <div 
          key={tool.id}
          onClick={() => onNavigate(tool.id)}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer"
        >
          <div className="text-4xl mb-4">{tool.icon}</div>
          <h3 className="text-lg font-bold">{tool.title}</h3>
          <p className="text-blue-600 text-sm mt-4">Launch Tool →</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Tool Components ---

const ResistorDecoder = () => {
  const colorBands = {
    'Black': { value: 0, multiplier: 1, tolerance: null, hex: '#000000' },
    'Brown': { value: 1, multiplier: 10, tolerance: 1, hex: '#8B4513' },
    'Red': { value: 2, multiplier: 100, tolerance: 2, hex: '#FF0000' },
    'Orange': { value: 3, multiplier: 1000, tolerance: null, hex: '#FF8C00' },
    'Yellow': { value: 4, multiplier: 10000, tolerance: null, hex: '#FFD700' },
    'Green': { value: 5, multiplier: 100000, tolerance: 0.5, hex: '#008000' },
    'Blue': { value: 6, multiplier: 1000000, tolerance: 0.25, hex: '#0000FF' },
    'Gold': { value: null, multiplier: 0.1, tolerance: 5, hex: '#D4AF37' },
    'Silver': { value: null, multiplier: 0.01, tolerance: 10, hex: '#C0C0C0' },
  };

  const [bands, setBands] = useState(['Brown', 'Black', 'Red', 'Gold']);
  const [result, setResult] = useState({ resistance: '0 Ω', tolerance: '±0%' });

  useEffect(() => {
    const val1 = colorBands[bands[0]].value;
    const val2 = colorBands[bands[1]].value;
    const mult = colorBands[bands[2]].multiplier;
    const tol = colorBands[bands[3]].tolerance;
    if (val1 !== null && val2 !== null && mult !== null) {
      let r = (val1 * 10 + val2) * mult;
      let unit = 'Ω';
      if (r >= 1000) { r /= 1000; unit = 'kΩ'; }
      setResult({ resistance: `${r} ${unit}`, tolerance: `±${tol}%` });
    }
  }, [bands]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6">🎨 Resistor Decoder</h2>
      {bands.map((b, i) => (
        <select key={i} value={b} onChange={(e) => {
          const newBands = [...bands];
          newBands[i] = e.target.value;
          setBands(newBands);
        }} className="w-full mb-2 p-2 border rounded">
          {Object.keys(colorBands).map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      ))}
      <div className="mt-6 p-4 bg-blue-50 text-center rounded-xl">
        <div className="text-3xl font-bold">{result.resistance}</div>
        <div>{result.tolerance}</div>
      </div>
    </div>
