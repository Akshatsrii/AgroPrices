import React, { useState } from 'react';

export function TransportCostCalculatorPage() {
  const [distance, setDistance] = useState(25);
  const [vehicle, setVehicle] = useState('tractor');
  const [fuelPrice, setFuelPrice] = useState(90);

  const rates = {
    tractor: 45, // ₹45/KM
    pickup: 35, // ₹35/KM
    truck: 65,  // ₹65/KM
  };

  const costPerKm = rates[vehicle] || 45;
  const estimatedFreight = distance * costPerKm + (distance > 30 ? 200 : 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Freight & Transport Cost Calculator 🚛</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Estimate total round-trip transport charges based on vehicle type and Mandi distance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Select Vehicle Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tractor', label: 'Tractor Trolley' },
                { id: 'pickup', label: 'Pickup Truck' },
                { id: 'truck', label: 'Mini Truck' },
              ].map(v => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicle(v.id)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                    vehicle === v.id ? 'bg-emerald-50 border-emerald-600 text-emerald-900' : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Distance to Mandi (KM)</label>
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {distance} KM
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Estimated Round-Trip Freight</span>
            <h3 className="text-3xl font-black text-slate-900 m-0">
              ₹{estimatedFreight.toLocaleString()}
            </h3>
            <p className="text-xs text-gray-500 mt-1">Approx ₹{(estimatedFreight / 50).toFixed(1)} / quintal for 50q load</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle Freight Rate:</span>
              <strong className="text-slate-900">₹{costPerKm} / KM</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Toll & Handling Charge:</span>
              <strong className="text-slate-900">{distance > 30 ? '₹200' : '₹0 (Local)'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
