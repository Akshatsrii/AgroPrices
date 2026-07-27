import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

export function ProfitCalculatorPage() {
  const [quantity, setQuantity] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(2480);
  const [freightCost, setFreightCost] = useState(1800);
  const [mandiFeePct, setMandiFeePct] = useState(1.5);

  const grossRevenue = quantity * sellingPrice;
  const mandiTaxDeduction = (grossRevenue * mandiFeePct) / 100;
  const netProfit = grossRevenue - freightCost - mandiTaxDeduction;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-Time Mandi Financial Math</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Interactive Net Profit Calculator 🧮</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Calculate gross harvest earnings vs net in-hand payout after freight transport and APMC Mandi taxes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Calculator Inputs */}
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 m-0">Harvest & Freight Inputs</h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Crop Quantity (Quintals)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-black text-slate-900 custom-input text-base"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Selling Price per Quintal (₹)</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-black text-slate-900 custom-input text-base"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Total Transport Freight (₹)</label>
              <input
                type="number"
                value={freightCost}
                onChange={(e) => setFreightCost(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-black text-slate-900 custom-input text-base"
              />
            </div>
          </div>
        </div>

        {/* Output Summary Card */}
        <div className="hero-gradient rounded-[32px] p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-6 border border-emerald-500/20">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200 block mb-1">Net In-Hand Payout</span>
            <strong className="text-4xl font-black text-emerald-400 block tracking-tight">₹{Math.round(netProfit).toLocaleString('en-IN')}</strong>
          </div>

          <div className="space-y-3 pt-4 border-t border-emerald-500/30 text-xs text-emerald-100">
            <div className="flex justify-between font-bold">
              <span>Gross Market Revenue:</span>
              <strong className="text-white font-black">₹{grossRevenue.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between font-bold">
              <span>Transport Freight:</span>
              <strong className="text-red-300 font-black">-₹{freightCost.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between font-bold">
              <span>APMC Mandi Tax ({mandiFeePct}%):</span>
              <strong className="text-red-300 font-black">-₹{Math.round(mandiTaxDeduction).toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
