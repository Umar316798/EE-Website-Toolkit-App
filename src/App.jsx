import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // State to manage current page/tool

  // Tailwind CSS classes for common elements
  const containerClasses = "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter text-gray-800";
  const cardClasses = "bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1";
  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const buttonClasses = "px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 flex items-center justify-center space-x-2";
  const headingClasses = "text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-8";
  const subHeadingClasses = "text-2xl font-bold text-blue-700 mb-4";

  // Navigation component
  const Navbar = () => (
    <nav className="bg-blue-800 p-4 rounded-b-xl shadow-lg mb-8">
      <div className="container mx-auto flex flex-wrap justify-center sm:justify-between items-center">
        <h1 className="text-white text-2xl font-bold mb-4 sm:mb-0">EE Toolkit</h1>
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'home' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('resistorDecoder')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'resistorDecoder' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
            }`}
          >
            Resistor Decoder
          </button>
          <button
            onClick={() => setCurrentPage('resistorCalculator')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'resistorCalculator' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
            }`}
          >
            Resistor Calculator
          </button>
          <button
            onClick={() => setCurrentPage('capacitorEstimator')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'capacitorEstimator' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
            }`}
          >
            Capacitor Estimator
          </button>
        </div>
      </div>
    </nav>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className={headingClasses}>Welcome to the EE Toolkit!</h2>
      <p className="text-lg mb-6">
        This interactive web toolkit is designed for Electrical Engineering students to quickly calculate and visualize properties of key components.
        Use the navigation above to explore different tools.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className={`${cardClasses} p-4`}>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Resistor Color Code Decoder</h3>
          <p className="text-gray-600 text-sm">Decode 4-band resistor color codes to find resistance and tolerance.</p>
          <button onClick={() => setCurrentPage('resistorDecoder')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">Go to Tool</button>
        </div>
        <div className={`${cardClasses} p-4`}>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Resistor Calculator</h3>
          <p className="text-gray-600 text-sm">Calculate equivalent resistance for series and parallel circuits.</p>
          <button onClick={() => setCurrentPage('resistorCalculator')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">Go to Tool</button>
        </div>
        <div className={`${cardClasses} p-4`}>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Capacitor Estimator</h3>
          <p className="text-gray-600 text-sm">Estimate charge/discharge times for RC circuits.</p>
          <button onClick={() => setCurrentPage('capacitorEstimator')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">Go to Tool</button>
        </div>
      </div>
    </div>
  );

  // Resistor Color Code Decoder Component
  const ResistorDecoder = () => {
    // Define color codes and their values
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
      'None': { value: null, multiplier: null, tolerance: 20 },
    };

    // State for each band's selected color
    const [band1, setBand1] = useState('Brown');
    const [band2, setBand2] = useState('Black');
    const [band3, setBand3] = useState('Red');
    const [band4, setBand4] = useState('Gold');

    // State for calculated resistance and tolerance
    const [resistance, setResistance] = useState('');
    const [tolerance, setTolerance] = useState('');

    // Function to calculate resistance based on selected bands
    useEffect(() => {
      const val1 = colorBands[band1].value;
      const val2 = colorBands[band2].value;
      const multiplier = colorBands[band3].multiplier;
      const tol = colorBands[band4].tolerance;

      if (val1 !== null && val2 !== null && multiplier !== null) {
        let calculatedResistance = (val1 * 10 + val2) * multiplier;
        let unit = 'Ω';

        // Adjust units for better readability
        if (calculatedResistance >= 1000000) {
          calculatedResistance /= 1000000;
          unit = 'MΩ';
        } else if (calculatedResistance >= 1000) {
          calculatedResistance /= 1000;
          unit = 'kΩ';
        }
        setResistance(`${calculatedResistance} ${unit}`);
      } else {
        setResistance('Invalid Input');
      }

      if (tol !== null) {
        setTolerance(`±${tol}%`);
      } else {
        setTolerance('N/A');
      }
    }, [band1, band2, band3, band4]); // Recalculate when any band changes

    // Helper to get color for visual bands
    const getBandColor = (colorName) => {
      // Return a Tailwind CSS color class or a direct hex color if needed
      const colorMap = {
        'Black': 'bg-black',
        'Brown': 'bg-amber-800', // Using amber for brown
        'Red': 'bg-red-600',
        'Orange': 'bg-orange-500',
        'Yellow': 'bg-yellow-400',
        'Green': 'bg-green-600',
        'Blue': 'bg-blue-600',
        'Violet': 'bg-purple-600',
        'Gray': 'bg-gray-500',
        'White': 'bg-white',
        'Gold': 'bg-yellow-300', // Lighter yellow for gold
        'Silver': 'bg-gray-300', // Lighter gray for silver
        'None': 'bg-transparent border border-dashed border-gray-400', // For 'None' tolerance band
      };
      return colorMap[colorName] || 'bg-gray-200'; // Default light gray
    };


    return (
      <div className="max-w-4xl mx-auto">
        <h2 className={headingClasses}>4-Band Resistor Color Code Decoder</h2>
        <div className={`${cardClasses} grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {/* Input Section */}
          <div>
            <h3 className={subHeadingClasses}>Select Band Colors</h3>
            <div className="mb-4">
              <label htmlFor="band1" className="block text-sm font-medium text-gray-700 mb-2">Band 1 (First Digit)</label>
              <select
                id="band1"
                className={inputClasses}
                value={band1}
                onChange={(e) => setBand1(e.target.value)}
              >
                {Object.keys(colorBands).filter(color => colorBands[color].value !== null).map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="band2" className="block text-sm font-medium text-gray-700 mb-2">Band 2 (Second Digit)</label>
              <select
                id="band2"
                className={inputClasses}
                value={band2}
                onChange={(e) => setBand2(e.target.value)}
              >
                {Object.keys(colorBands).filter(color => colorBands[color].value !== null).map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="band3" className="block text-sm font-medium text-gray-700 mb-2">Band 3 (Multiplier)</label>
              <select
                id="band3"
                className={inputClasses}
                value={band3}
                onChange={(e) => setBand3(e.target.value)}
              >
                {Object.keys(colorBands).filter(color => colorBands[color].multiplier !== null).map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="band4" className="block text-sm font-medium text-gray-700 mb-2">Band 4 (Tolerance)</label>
              <select
                id="band4"
                className={inputClasses}
                value={band4}
                onChange={(e) => setBand4(e.target.value)}
              >
                {Object.keys(colorBands).filter(color => colorBands[color].tolerance !== null).map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result and Visualization Section */}
          <div className="flex flex-col items-center justify-center">
            <h3 className={subHeadingClasses}>Calculated Value</h3>
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-blue-800 mb-2">{resistance}</p>
              <p className="text-2xl text-gray-600">{tolerance}</p>
            </div>

            <h3 className={subHeadingClasses}>Resistor Visualization</h3>
            <div className="flex items-center justify-center bg-gray-200 rounded-full h-16 w-64 relative overflow-hidden shadow-inner">
              {/* Resistor body */}
              <div className="absolute inset-0 bg-gray-700 rounded-full"></div>

              {/* Bands */}
              <div className="absolute flex h-full w-full justify-around items-center px-2">
                {/* Band 1 */}
                <div className={`${getBandColor(band1)} h-full w-1/6 rounded-l-full relative z-10`} style={{ left: '5%' }}></div>
                {/* Band 2 */}
                <div className={`${getBandColor(band2)} h-full w-1/6 relative z-10`} style={{ left: '10%' }}></div>
                {/* Band 3 (Multiplier) */}
                <div className={`${getBandColor(band3)} h-full w-1/6 relative z-10`} style={{ left: '15%' }}></div>
                {/* Band 4 (Tolerance) - slightly separated */}
                <div className={`${getBandColor(band4)} h-full w-1/6 rounded-r-full relative z-10`} style={{ right: '5%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Colors are approximate for visualization.</p>
          </div>
        </div>
      </div>
    );
  };

  // Resistor Calculator Component (Series/Parallel)
  const ResistorCalculator = () => {
    const [resistors, setResistors] = useState([{ id: 1, value: '' }]);
    const [circuitType, setCircuitType] = useState('series'); // 'series' or 'parallel'
    const [equivalentResistance, setEquivalentResistance] = useState(0);

    useEffect(() => {
      const validResistors = resistors
        .map(r => parseFloat(r.value))
        .filter(val => !isNaN(val) && val > 0);

      if (validResistors.length === 0) {
        setEquivalentResistance(0);
        return;
      }

      let result = 0;
      if (circuitType === 'series') {
        result = validResistors.reduce((sum, val) => sum + val, 0);
      } else { // Parallel
        const reciprocalSum = validResistors.reduce((sum, val) => sum + (1 / val), 0);
        result = reciprocalSum === 0 ? 0 : 1 / reciprocalSum;
      }
      setEquivalentResistance(result);
    }, [resistors, circuitType]);

    const addResistor = () => {
      setResistors([...resistors, { id: resistors.length + 1, value: '' }]);
    };

    const removeResistor = (idToRemove) => {
      setResistors(resistors.filter(r => r.id !== idToRemove));
    };

    const handleResistorChange = (id, newValue) => {
      setResistors(resistors.map(r =>
        r.id === id ? { ...r, value: newValue } : r
      ));
    };

    const formatResistance = (ohms) => {
      if (ohms >= 1000000) return `${(ohms / 1000000).toFixed(2)} MΩ`;
      if (ohms >= 1000) return `${(ohms / 1000).toFixed(2)} kΩ`;
      return `${ohms.toFixed(2)} Ω`;
    };

    return (
      <div className="max-w-xl mx-auto">
        <h2 className={headingClasses}>Resistor Calculator (Series/Parallel)</h2>
        <div className={cardClasses}>
          <h3 className={subHeadingClasses}>Circuit Type</h3>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setCircuitType('series')}
              className={`px-5 py-2 rounded-lg transition-colors duration-200 ${
                circuitType === 'series' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Series
            </button>
            <button
              onClick={() => setCircuitType('parallel')}
              className={`px-5 py-2 rounded-lg transition-colors duration-200 ${
                circuitType === 'parallel' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Parallel
            </button>
          </div>

          <h3 className={subHeadingClasses}>Resistor Values (Ω)</h3>
          {resistors.map((resistor, index) => (
            <div key={resistor.id} className="flex items-center space-x-3 mb-3">
              <input
                type="number"
                min="0"
                step="any"
                className={inputClasses}
                placeholder={`Resistor ${index + 1} Value`}
                value={resistor.value}
                onChange={(e) => handleResistorChange(resistor.id, e.target.value)}
              />
              {resistors.length > 1 && (
                <button
                  onClick={() => removeResistor(resistor.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  aria-label="Remove resistor"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button onClick={addResistor} className={`${buttonClasses} w-full mt-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Resistor
          </button>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Equivalent Resistance:</h3>
            <p className="text-4xl font-extrabold text-green-700">
              {formatResistance(equivalentResistance)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Capacitor Charge/Discharge Time Estimator Component
  const CapacitorEstimator = () => {
    const [capacitance, setCapacitance] = useState(''); // Farads
    const [resistance, setResistance] = useState('');     // Ohms
    const [initialVoltage, setInitialVoltage] = useState(''); // Volts
    const [finalVoltage, setFinalVoltage] = useState('');     // Volts
    const [chargeTime, setChargeTime] = useState(null);
    const [dischargeTime, setDischargeTime] = useState(null);
    const [timeConstant, setTimeConstant] = useState(null);

    useEffect(() => {
      const C = parseFloat(capacitance);
      const R = parseFloat(resistance);
      const Vi = parseFloat(initialVoltage);
      const Vf = parseFloat(finalVoltage);

      if (isNaN(C) || isNaN(R) || C <= 0 || R <= 0) {
        setTimeConstant(null);
        setChargeTime(null);
        setDischargeTime(null);
        return;
      }

      const tau = R * C; // Time constant (seconds)
      setTimeConstant(tau);

      // Charge time calculation: V(t) = Vf_max * (1 - e^(-t/RC))
      // Assuming charging from 0V towards a source voltage Vi
      // Time to reach Vf: t = -RC * ln(1 - Vf/Vi)
      if (!isNaN(Vi) && Vi > 0 && !isNaN(Vf) && Vf >= 0 && Vf < Vi) {
        const t_charge = -tau * Math.log(1 - (Vf / Vi));
        setChargeTime(t_charge);
      } else {
        setChargeTime(null);
      }

      // Discharge time calculation: V(t) = Vi * e^(-t/RC)
      // Time to discharge from Vi to Vf: t = -RC * ln(Vf/Vi)
      if (!isNaN(Vi) && Vi > 0 && !isNaN(Vf) && Vf >= 0 && Vf < Vi) {
        const t_discharge = -tau * Math.log(Vf / Vi);
        setDischargeTime(t_discharge);
      } else {
        setDischargeTime(null);
      }

    }, [capacitance, resistance, initialVoltage, finalVoltage]);

    const formatTime = (seconds) => {
      if (seconds === null || isNaN(seconds) || !isFinite(seconds)) return 'N/A';
      if (seconds < 0) return 'Invalid'; // Should not happen with correct inputs

      if (seconds < 1e-6) return `${(seconds * 1e9).toFixed(3)} ns`;
      if (seconds < 1e-3) return `${(seconds * 1e6).toFixed(3)} µs`;
      if (seconds < 1) return `${(seconds * 1e3).toFixed(3)} ms`;
      if (seconds < 60) return `${seconds.toFixed(3)} s`;
      if (seconds < 3600) return `${(seconds / 60).toFixed(2)} min`;
      return `${(seconds / 3600).toFixed(2)} hr`;
    };


    return (
      <div className="max-w-xl mx-auto">
        <h2 className={headingClasses}>Capacitor Charge/Discharge Time Estimator</h2>
        <div className={cardClasses}>
          <h3 className={subHeadingClasses}>Input Parameters</h3>
          <div className="mb-4">
            <label htmlFor="capacitance" className="block text-sm font-medium text-gray-700 mb-2">Capacitance (F)</label>
            <input
              id="capacitance"
              type="number"
              min="0"
              step="any"
              className={inputClasses}
              placeholder="Enter capacitance in Farads"
              value={capacitance}
              onChange={(e) => setCapacitance(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resistance" className="block text-sm font-medium text-gray-700 mb-2">Resistance (Ω)</label>
            <input
              id="resistance"
              type="number"
              min="0"
              step="any"
              className={inputClasses}
              placeholder="Enter resistance in Ohms"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="initialVoltage" className="block text-sm font-medium text-gray-700 mb-2">Initial Voltage (V)</label>
            <input
              id="initialVoltage"
              type="number"
              min="0"
              step="any"
              className={inputClasses}
              placeholder="Enter initial voltage"
              value={initialVoltage}
              onChange={(e) => setInitialVoltage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="finalVoltage" className="block text-sm font-medium text-gray-700 mb-2">Target Voltage (V)</label>
            <input
              id="finalVoltage"
              type="number"
              min="0"
              step="any"
              className={inputClasses}
              placeholder="Enter target voltage"
              value={finalVoltage}
              onChange={(e) => setFinalVoltage(e.target.value)}
            />
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Results</h3>
            <p className="text-2xl font-semibold text-gray-700 mb-2">
              Time Constant (τ): <span className="text-green-700">{formatTime(timeConstant)}</span>
            </p>
            <p className="text-2xl font-semibold text-gray-700 mb-2">
              Charge Time to Target Voltage: <span className="text-green-700">{formatTime(chargeTime)}</span>
            </p>
            <p className="text-2xl font-semibold text-gray-700">
              Discharge Time to Target Voltage: <span className="text-green-700">{formatTime(dischargeTime)}</span>
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Note: Charge time assumes charging from 0V towards Initial Voltage. Discharge time assumes discharging from Initial Voltage towards 0V.
              Target Voltage must be less than Initial Voltage for discharge, and less than Initial Voltage (source voltage) for charge.
            </p>
          </div>
        </div>
      </div>
    );
  };


  // Main render logic based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'resistorDecoder':
        return <ResistorDecoder />;
      case 'resistorCalculator':
        return <ResistorCalculator />;
      case 'capacitorEstimator':
        return <CapacitorEstimator />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={containerClasses}>
      {/* Load Inter font from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      <Navbar />
      <main className="container mx-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
