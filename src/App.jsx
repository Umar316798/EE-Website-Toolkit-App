import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  ChevronRight, 
  AlertTriangle, 
  Maximize2
} from 'lucide-react';

// --- Sub-Components ---

const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b border-blue-500/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <Zap className="text-blue-400 fill-blue-400" size={24} />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            EE-Toolkit
          </span>
        </div>
        <div className="hidden md:flex space-x-1">
          {['home', 'decoder', 'calculator', 'capacitor', 'insulation'].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                currentPage === page 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {page === 'insulation' ? 'Insulation Monitor' : page}
            </button>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

const HomePage = ({ onNavigate }) => (
  <div className="space-y-12 py-8 animate-in fade-in duration-700">
    <section className="text-center space-y-4 max-w-3xl mx-auto">
      <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
        Engineering Toolset for <span className="text-blue-600">Power & Logic</span>
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed">
        A professional suite of interactive calculators for resistor color codes, circuit analysis, and insulation safety monitoring.
      </p>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {[
        { id: 'decoder', title: 'Color Decoder', desc: '4-Band resistor value and tolerance calculator.', icon: <Activity className="text-orange-500" /> },
        { id: 'calculator', title: 'Network Analysis', desc: 'Calculate equivalent series and parallel resistance.', icon: <Maximize2 className="text-emerald-500" /> },
        { id: 'capacitor', title: 'RC Estimator', desc: 'Time constant and charge/discharge timing.', icon: <Zap className="text-blue-500" /> },
        { id: 'insulation', title: 'Insulation Monitor', desc: 'Safety simulator for high-voltage leakage detection.', icon: <AlertTriangle className="text-red-500" /> }
      ].map((tool) => (
        <div 
          key={tool.id}
          onClick={() => onNavigate(tool.id)}
          className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer flex flex-col h-full"
        >
          <div className="p-3 rounded-xl bg-slate-50 w-fit mb-4 group-hover:scale-110 transition-transform">
            {tool.icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
          <p className="text-slate-500 text-sm mb-6 flex-grow">{tool.desc}</p>
          <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Launch Tool <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ResistorDecoder = () => {
  const colorBands = {
    'Black': { value: 0, multiplier: 1, tolerance: null, hex: '#000000' },
    'Brown': { value: 1, multiplier: 10, tolerance: 1, hex: '#8B4513' },
    'Red': { value: 2, multiplier: 100, tolerance: 2, hex: '#FF0000' },
    'Orange': { value: 3, multiplier: 1000, tolerance: null, hex: '#FF8C00' },
    'Yellow': { value: 4, multiplier: 10000, tolerance: null, hex: '#FFD700' },
    'Green': { value: 5, multiplier: 100000, tolerance: 0.5, hex: '#008000' },
    'Blue': { value: 6, multiplier: 1000000, tolerance: 0.25, hex: '#0000FF' },
    'Violet': { value: 7, multiplier: 10000000, tolerance: 0.1, hex: '#EE82EE' },
    'Gray': { value: 8, multiplier: null, tolerance: 0.05, hex: '#808080' },
    'White': { value: 9, multiplier: null, tolerance: null, hex: '#FFFFFF' },
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
      if (r >= 1000000) { r /= 1000000; unit = 'MΩ'; }
      else if (r >= 1000) { r /= 1000; unit = 'kΩ'; }
      setResult({ resistance: `${r.toLocaleString()} ${unit}`, tolerance: `±${tol}%` });
    }
  }, [bands]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Activity className="text-orange-500" /> 4-Band Resistor Decoder
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {['Digit 1', 'Digit 2', 'Multiplier', 'Tolerance'].map((label, i) => (
              <div key={i}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
                <select 
                  value={bands[i]}
                  onChange={(e) => {
                    const newBands = [...bands];
                    newBands[i] = e.target.value;
                    setBands(newBands);
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {Object.entries(colorBands).map(([name, data]) => {
                    if (i < 2 && data.value === null) return null;
                    if (i === 2 && data.multiplier === null) return null;
                    if (i === 3 && data.tolerance === null) return null;
                    return <option key={name} value={name}>{name}</option>;
                  })}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative w-full h-24 bg-slate-200 rounded-full flex items-center px-8 shadow-inner border border-slate-300">
              <div className="absolute inset-x-0 h-1 bg-slate-400"></div>
              <div className="w-full h-16 bg-amber-100 rounded-full relative z-10 flex justify-around items-center border border-amber-200 shadow-md">
                {bands.map((b, i) => (
                  <div key={i} className="h-full w-4 shadow-sm" style={{ backgroundColor: colorBands[b].hex }}></div>
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100 w-full">
              <div className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Total Resistance</div>
              <div className="text-4xl font-black text-slate-900">{result.resistance}</div>
              <div className="text-slate-500 font-medium mt-1">{result.tolerance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Maximize2 className="text-emerald-500" /> Network Analysis
        </h2>

        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
          <button 
            onClick={() => setType('series')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${type === 'series' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >Series</button>
          <button 
            onClick={() => setType('parallel')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${type === 'parallel' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >Parallel</button>
        </div>

        <div className="space-y-3 mb-6">
          {resistors.map((r, i) => (
            <div key={r.id} className="flex gap-2 animate-in slide-in-from-left-2 duration-200">
              <input 
                type="number"
                placeholder={`Resistor ${i + 1} (Ω)`}
                value={r.val}
                onChange={(e) => update(r.id, e.target.value)}
                className="flex-grow p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {resistors.length > 1 && (
                <button onClick={() => remove(r.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">✕</button>
              )}
            </div>
          ))}
        </div>

        <button onClick={add} className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 transition-all mb-8">
          + Add Component
        </button>

        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
          <div className="text-sm text-emerald-600 font-bold uppercase tracking-wider mb-1">Equivalent Resistance</div>
          <div className="text-3xl font-black text-slate-900">
            {result >= 1000 ? (result/1000).toFixed(2) + ' kΩ' : result.toFixed(2) + ' Ω'}
          </div>
        </div>
      </div>
    </div>
  );
};

const CapacitorEstimator = () => {
  const [inputs, setInputs] = useState({ r: '', c: '', vi: '', vt: '' });

  const calculate = () => {
    const { r, c, vi, vt } = Object.fromEntries(Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)]));
    if (!r || !c || isNaN(r) || isNaN(c)) return null;

    const tau = r * c;
    let tCharge = null;
    let tDischarge = null;

    if (vi > 0 && vt > 0 && vt < vi) {
      tCharge = -tau * Math.log(1 - (vt / vi));
      tDischarge = -tau * Math.log(vt / vi);
    }

    return { tau, tCharge, tDischarge };
  };

  const results = calculate();

  const fmt = (s) => {
    if (!s) return '—';
    if (s < 1e-6) return (s * 1e9).toFixed(2) + ' ns';
    if (s < 1e-3) return (s * 1e6).toFixed(2) + ' µs';
    if (s < 1) return (s * 1e3).toFixed(2) + ' ms';
    return s.toFixed(3) + ' s';
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Zap className="text-blue-500" /> RC Estimator
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Resistance (Ω)</label>
            <input type="number" value={inputs.r} onChange={e => setInputs({...inputs, r: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Capacitance (F)</label>
            <input type="number" value={inputs.c} onChange={e => setInputs({...inputs, c: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">V Source (V)</label>
            <input type="number" value={inputs.vi} onChange={e => setInputs({...inputs, vi: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">V Target (V)</label>
            <input type="number" value={inputs.vt} onChange={e => setInputs({...inputs, vt: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-600 uppercase mb-1">Time Constant (τ)</div>
            <div className="text-xl font-bold text-slate-900">{fmt(results?.tau)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="text-xs font-bold text-green-600 uppercase mb-1">Charge Time</div>
              <div className="text-lg font-bold text-slate-900">{fmt(results?.tCharge)}</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="text-xs font-bold text-orange-600 uppercase mb-1">Discharge Time</div>
              <div className="text-lg font-bold text-slate-900">{fmt(results?.tDischarge)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsulationMonitor = () => {
  const [voltage, setVoltage] = useState(1000);
  const [leakage, setLeakage] = useState(0.5);
  const [threshold, setThreshold] = useState(1.0);

  const resistance = voltage / (leakage / 1000);
  const status = leakage <= threshold ? 'SAFE' : 'ALARM';
  const statusColor = status === 'SAFE' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <AlertTriangle className="text-red-500" /> Insulation Monitor
        </h2>

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Test Voltage (V)</label>
            <input 
              type="number" 
              value={voltage} 
              onChange={e => setVoltage(parseFloat(e.target.value) || 0)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Leakage Current (mA)</label>
            <input 
              type="number" 
              step="0.1"
              value={leakage} 
              onChange={e => setLeakage(parseFloat(e.target.value) || 0)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Alarm Threshold (mA)</label>
            <input 
              type="number" 
              step="0.1"
              value={threshold} 
              onChange={e => setThreshold(parseFloat(e.target.value) || 0)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-6 rounded-2xl border-2 text-center ${statusColor}`}>
            <div className="text-sm font-bold uppercase tracking-wider mb-1">System Status</div>
            <div className="text-3xl font-black">{status}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-sm font-bold text-slate-600 uppercase mb-1">Insulation Resistance</div>
            <div className="text-2xl font-bold text-slate-900">
              {resistance >= 1000000 ? (resistance/1000000).toFixed(2) + ' MΩ' : 
               resistance >= 1000 ? (resistance/1000).toFixed(2) + ' kΩ' : 
               resistance.toFixed(2) + ' Ω'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
