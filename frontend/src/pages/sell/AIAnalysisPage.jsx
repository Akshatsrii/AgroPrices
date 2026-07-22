import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AIAnalysisPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    'Analyzing Live Market Rates & APMC Mandis...',
    'Evaluating Historical 30-Day Price Trajectories...',
    'Checking Regional Demand & Weather Forecasts...',
    'Calculating Transport Freight & Vehicle Costs...',
    'Generating Price Predictions & AI Recommendation...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 600);

    const stepInterval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 600);

    const navTimer = setTimeout(() => {
      navigate('/sell/ai-recommendation');
    }, 3400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(navTimer);
    };
  }, [navigate, steps.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full text-center space-y-8 p-6">
        
        {/* Animated Loader Spinner */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <span className="text-5xl animate-bounce">🤖</span>
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-1">
            AgroPrice AI Processing
          </h2>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
            Analyzing 8 Real-Time Commodity Parameters
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span>Overall Analysis Progress</span>
            <span className="text-emerald-400 font-black">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
            <div 
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* Dynamic Checklist */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3 text-left shadow-inner">
          {steps.map((text, idx) => {
            const isDone = idx < step;
            const isCurrent = idx === step;
            return (
              <div key={idx} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDone ? 'bg-emerald-500 text-slate-950' : isCurrent ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-500'
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
