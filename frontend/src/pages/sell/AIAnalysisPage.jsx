import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AIAnalysisPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps = [
    'Checking 14 regional APMC Mandi rates...',
    'Calculating freight costs for Tractor & Pickup...',
    'Factoring Mandi tax & moisture quality grade adjustments...',
    'Computing net profit margin: Village Trader vs Best Mandi...'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400);
    const timer4 = setTimeout(() => navigate('/sell/ai-recommendation'), 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 p-6">
        
        {/* Animated Loader Spinner */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <span className="text-4xl">🤖</span>
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-2">
            AgroPrice AI Engine Running
          </h2>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
            Processing Market Arbitrage Data
          </p>
        </div>

        {/* Dynamic Step Checklist */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3 text-left">
          {steps.map((text, idx) => {
            const isDone = idx < step;
            const isCurrent = idx === step;
            return (
              <div key={idx} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDone ? 'bg-emerald-500 text-slate-950' : isCurrent ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-700 text-slate-400'
                }`}>
                  {isDone ? '✓' : idx + 1}
                </span>
                <span className={`text-xs font-semibold ${
                  isDone ? 'text-emerald-300' : isCurrent ? 'text-white font-bold' : 'text-slate-500'
                }`}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
