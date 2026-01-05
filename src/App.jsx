import React, { useState, useEffect } from 'react';


const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b border-blue-500/30 p-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-xl tracking-tight text-blue-400">EE-Toolkit</span>
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {['home', 'decoder', 'calculator', 'capacitor', 'insulation'].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md text-sm capitalize whitespace-nowrap ${
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
  <div className="space-y-12 py-8 text-center animate-in fade-in duration-700">
    <h1 className="text-4xl font-extrabold text-slate-900">Engineering Toolset</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {[
        { id: 'decoder', title: 'Color Decoder', icon: '🎨', desc: '4-Band Resistor Values' },
        { id: 'calculator', title: 'Network Analysis', icon: '🔢', desc: 'Series & Parallel Calc' },
        { id: 'capacitor', title: 'RC Estimator', icon: '⚡', desc: 'Time Constant (τ)' },
        { id: 'insulation', title: 'Safety Monitor', icon: '⚠️', desc: 'Leakage Current Check' }
      ].map((tool) => (
        <div 
          key={tool.id}
          onClick={() => onNavigate(tool.id)}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="text-4xl mb-4">{tool.icon}</div>
          <h3 className="text-lg font-bold text-slate-900">{tool.title}</h3>
          <p className="text-slate-500 text-sm mt-2">{tool.desc}</p>
          <p className="text-blue-600 text-sm mt-4 font-semibold">Launch Tool →</p>
        </div>
      ))}
    </div>
  </div>
);

// --- TOOL 1: Resistor Decoder ---

const ResistorDecoder = () => {
  const colorBands = {
    'Black': { value: 0, multiplier: 1, tolerance: null },
    'Brown': { value: 1, multiplier: 10, tolerance: 1 },
    'Red': { value: 2, multiplier: 100, tolerance: 2 },
    'Orange': { value: 3, multiplier: 1000, tolerance: null },
    'Yellow': { value: 4, multiplier: 10000, tolerance: null },
    'Green': { value: 5, multiplier: 100000, tolerance: 0.5 },
    'Blue': { value: 6, multiplier: 1000000, tolerance: 0.25 },
    'Violet': { value: 7, multiplier: 10000000, tolerance: 0.1 },
    'Gray': { value: 8, multiplier: null, tolerance: 0.05 },
    'White': { value: 9, multiplier: null, tolerance: null },
    'Gold': { value: null, multiplier: 0.1, tolerance: 5 },
    'Silver': { value: null, multiplier: 0.01, tolerance: 10 },
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
      if (r >= 1000000) { r /= 1000000; unit = 'MΩ'; }
      else if (r >= 1000) { r /= 1000; unit = 'kΩ'; }
      setResult({ resistance: `${r} ${unit}`, tolerance: `±${tol}%` });
    }
  }, [bands]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6">🎨 Resistor Decoder</h2>
      <div className="grid grid-cols-2 gap-4">
        {['Band 1', 'Band 2', 'Multiplier', 'Tolerance'].map((label, i) => (
          <div key={i}>
            <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
            <select 
              value={bands[i]} 
              onChange={(e) => {
                const newBands = [...bands];
                newBands[i] = e.target.value;
                setBands(newBands);
              }} 
              className="w-full mt-1 p-2 border rounded bg-slate-50"
            >
              {Object.keys(colorBands).map(name => {
                 if (i < 2 && colorBands[name].value === null) return null;
                 if (i === 2 && colorBands[name].multiplier === null) return null;
                 if (i === 3 && colorBands[name].tolerance === null) return null;
                 return <option key={name} value={name}>{name}</option>
              })}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-blue-50 text-center rounded-xl border border-blue-100">
        <div className="text-sm text-blue-600 font-bold uppercase tracking-wider">Result</div>
        <div className="text-4xl font-black text-slate-900 mt-2">{result.resistance}</div>
        <div className="text-slate-500 font-medium mt-1">{result.tolerance}</div>
      </div>
    </div>
  );
};

// --- TOOL 2: Network Analysis ---

const ResistorCalculator = () => {
  const [resistors, setResistors] = useState([{ id: 1, val: '' }]);
  const [type, setType] = useState('series');

  const add = () => setResistors([...resistors, { id: Date.now(), val: '' }]);
  const remove = (id) => setResistors(resistors.filter(r => r.id !== id));
  const update = (id, val) => setResistors(resistors.map(r => r.id === id ? { ...r, val } : r));

  const calculate = () => {
    const vals = resistors.map(r => parseFloat(r.val)).filter(v => !isNaN(v) && v > 0);
    if (vals.length === 0) return 0;
    if (type === 'series') return vals.reduce((a, b) => a + b, 0);
    return 1 / vals.reduce((a, b) => a + (1 / b), 0);
  };

  const result = calculate();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6">🔢 Network Analysis</h2>
      <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
        {['series', 'parallel'].map(t => (
          <button 
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-2 text-sm font-bold rounded capitalize ${type === t ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3 mb-6">
        {resistors.map((r, i) => (
          <div key={r.id} className="flex gap-2">
            <input 
              type="number" 
              placeholder={`Resistor ${i + 1} (Ω)`}
              value={r.val} 
              onChange={(e) => update(r.id, e.target.value)}
              className="flex-grow p-2 border rounded bg-slate-50"
            />
            {resistors.length > 1 && <button onClick={() => remove(r.id)} className="text-red-500 px-2">✕</button>}
          </div>
        ))}
      </div>
      <button onClick={add} className="w-full py-3 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg font-bold hover:bg-slate-50 mb-6">+ Add Resistor</button>
      <div className="p-6 bg-green-50 rounded-xl border border-green-100 text-center">
        <div className="text-sm text-green-600 font-bold uppercase">Equivalent Resistance</div>
        <div className="text-3xl font-black text-slate-900 mt-2">
           {result >= 1000 ? (result/1000).toFixed(2) + ' kΩ' : result.toFixed(2) + ' Ω'}
        </div>
      </div>
    </div>
  );
};

// --- TOOL 3: Capacitor Estimator ---

const CapacitorEstimator = () => {
  const [inputs, setInputs] = useState({ r: '', c: '' });
  const tau = (parseFloat(inputs.r) || 0) * (parseFloat(inputs.c) || 0);

  const fmt = (s) => {
    if (!s) return '—';
    if (s < 1e-6) return (s * 1e9).toFixed(2) + ' ns';
    if (s < 1e-3) return (s * 1e6).toFixed(2) + ' µs';
    if (s < 1) return (s * 1e3).toFixed(2) + ' ms';
    return s.toFixed(3) + ' s';
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6">⚡ RC Estimator</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Resistance (Ω)</label>
          <input type="number" value={inputs.r} onChange={e => setInputs({...inputs, r: e.target.value})} className="w-full p-2 border rounded mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Capacitance (F)</label>
          <input type="number" value={inputs.c} onChange={e => setInputs({...inputs, c: e.target.value})} className="w-full p-2 border rounded mt-1" />
        </div>
      </div>
      <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 text-center">
        <div className="text-sm text-orange-600 font-bold uppercase">Time Constant (τ)</div>
        <div className="text-3xl font-black text-slate-900 mt-2">{fmt(tau)}</div>
        <div className="text-sm text-slate-500 mt-2">Fully charged in ~{fmt(tau * 5)}</div>
      </div>
    </div>
  );
};

// --- TOOL 4: Safety Monitor ---

const InsulationMonitor = () => {
  const [vals, setVals] = useState({ v: 1000, i: 0.5, limit: 1.0 });
  const r = vals.v / (vals.i / 1000);
  const isSafe = vals.i <= vals.limit;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6">⚠️ Insulation Monitor</h2>
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm font-bold text-slate-700">Test Voltage (V)</label>
          <input type="number" value={vals.v} onChange={e => setVals({...vals, v: e.target.value})} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Leakage Current (mA)</label>
          <input type="number" step="0.1" value={vals.i} onChange={e => setVals({...vals, i: e.target.value})} className="w-full p-2 border rounded" />
        </div>
      </div>
      <div className={`p-6 rounded-xl border-2 text-center ${isSafe ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
        <div className="text-sm font-bold uppercase tracking-wider mb-1">Status</div>
        <div className="text-4xl font-black">{isSafe ? 'SAFE' : 'ALARM'}</div>
        <div className="text-sm font-medium mt-2 text-slate-600">
          Res: {r >= 1e6 ? (r/1e6).toFixed(2) + ' MΩ' : (r/1000).toFixed(2) + ' kΩ'}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'decoder': return <ResistorDecoder />;
      case 'calculator': return <ResistorCalculator />;
      case 'capacitor': return <CapacitorEstimator />;
      case 'insulation': return <InsulationMonitor />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
