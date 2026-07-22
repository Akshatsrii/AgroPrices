import React, { useState } from 'react';

export function ProfitCalculatorPage() {
  const [quantity, setQuantity] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(2380);
  const [freightCost, setFreightCost] = useState(1750);
  const [mandiFeePct, setMandiFeePct] = useState(1);

  const grossRevenue = quantity * sellingPrice; // 50 * 2380 = 1,19,000
  const mandiTaxDeduction = (grossRevenue * mandiFeePct) / 100; // 1,190
  const netProfit = grossRevenue - freightCost - mandiTaxDeduction;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Interactive Net Profit Calculator 🧮</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Calculate gross earnings vs net in-hand payout after freight and APMC Mandi taxes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Calculator Inputs */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">Input Details</h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Crop Quantity (Quintals)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-slate-900 font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Selling Price per Quintal (₹)</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-slate-900 font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Total Transport Freight (₹)</label>
            <input
              type="number"
              value={freightCost}
              onChange={(e) => setFreightCost(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-slate-900 font-bold outline-none"
            />
          </div>
        </div>

        {/* Output Summary Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1">Calculated In-Hand Return</span>
            <h3 className="text-3xl sm:text-4xl font-black text-white m-0 tracking-tight">
              ₹{netProfit.toLocaleString()}
            </h3>
            <p className="text-xs text-emerald-200 mt-1">Net profit after all Mandi & freight deductions</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-emerald-700 text-xs">
            <div className="flex justify-between">
              <span className="text-emerald-200">Gross Sale Revenue:</span>
              <strong className="text-white">₹{grossRevenue.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-200">Freight Transport Charge:</span>
              <strong className="text-red-300">-₹{freightCost.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-200">APMC Mandi Tax (1%):</span>
              <strong className="text-red-300">-₹{mandiTaxDeduction.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
