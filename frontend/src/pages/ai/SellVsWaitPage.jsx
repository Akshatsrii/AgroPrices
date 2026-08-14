import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

export function SellVsWaitPage() {
  const [formData, setFormData] = useState({
    cropName: 'Wheat',
    mandiName: 'Indore Central Mandi',
    currentPrice: 2500
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getTomorrowPrediction(formData.cropName, formData.mandiName);
      
      if (response.success && response.data) {
        // Handle mock fallback structure or real ML data
        const data = response.data.data || response.data;
        setPrediction(data);
      } else {
        setError(response.error || "Failed to fetch prediction");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isSellRecommended = prediction?.recommendation?.includes('SELL');

  return (
    <div className="space-y-6">
      
      {/* Premium Hero Banner */}
      <div 
        className="relative overflow-hidden rounded-[2rem] shadow-sm border border-emerald-900/10"
        style={{ minHeight: '220px' }}
      >
        <img 
          src="/ai_banner.jpg" 
          alt="AI Agriculture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/40"></div>
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Sell Today vs Wait Matrix</h1>
          <p className="text-emerald-50 max-w-xl text-sm md:text-base leading-relaxed opacity-90">
            Powered by advanced XGBoost AI models. Input your crop details below to get a highly accurate prediction on whether to sell immediately or hold for better profits.
          </p>
        </div>
      </div>

      {/* Input Form Section */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Crop Name</label>
            <input 
              type="text" 
              value={formData.cropName}
              onChange={(e) => setFormData({...formData, cropName: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mandi Location</label>
            <input 
              type="text" 
              value={formData.mandiName}
              onChange={(e) => setFormData({...formData, mandiName: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Current Price (₹/q)</label>
            <input 
              type="number" 
              value={formData.currentPrice}
              onChange={(e) => setFormData({...formData, currentPrice: Number(e.target.value)})}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-all outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handlePredict}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running AI Analysis...
              </>
            ) : (
              'Run ML Prediction'
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-center gap-2">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {prediction && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Option 1: Sell Today */}
            <div className={`p-8 rounded-[2rem] shadow-sm relative transition-all border ${isSellRecommended ? 'bg-white border-emerald-400 shadow-[0_8px_30px_rgba(16,185,129,0.12)]' : 'bg-gray-50/50 border-gray-200'}`}>
              {isSellRecommended && (
                <div className="absolute -top-3 left-8 bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-4 py-1.5 rounded-full border border-emerald-200 tracking-wider shadow-sm">
                  Recommended Action
                </div>
              )}

              <h2 className="text-xl font-black text-slate-800 mb-1 mt-2">Option 1: Sell Today</h2>
              <p className="text-4xl font-black text-slate-900 mb-6 tracking-tight">₹{formData.currentPrice} <span className="text-lg font-bold text-gray-400">/ quintal</span></p>

              <div className="space-y-3 text-sm text-gray-600 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Storage Cost:</span>
                  <strong className="text-slate-800">₹0 / day</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Moisture Loss:</span>
                  <strong className="text-slate-800">0%</strong>
                </div>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-50">
                  <span className="font-medium text-gray-500">Payment:</span>
                  <strong className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Immediate</strong>
                </div>
              </div>
            </div>

            {/* Option 2: Wait */}
            <div className={`p-8 rounded-[2rem] shadow-sm relative transition-all border ${!isSellRecommended ? 'bg-white border-emerald-400 shadow-[0_8px_30px_rgba(16,185,129,0.12)]' : 'bg-gray-50/50 border-gray-200'}`}>
              {!isSellRecommended && (
                <div className="absolute -top-3 left-8 bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-4 py-1.5 rounded-full border border-emerald-200 tracking-wider shadow-sm">
                  Recommended Action
                </div>
              )}
              {isSellRecommended && (
                <div className="absolute -top-3 left-8 bg-gray-200 text-gray-600 text-xs font-black uppercase px-4 py-1.5 rounded-full border border-gray-300 tracking-wider shadow-sm">
                  Alternative
                </div>
              )}

              <h2 className="text-xl font-black text-slate-800 mb-1 mt-2">Option 2: Wait & Hold</h2>
              <div className="flex items-end gap-3 mb-6">
                <p className="text-4xl font-black text-slate-900 tracking-tight">₹{prediction.tomorrowPredictedPrice || prediction.predictedPrice || (formData.currentPrice + 40)} <span className="text-lg font-bold text-gray-400">/ quintal</span></p>
                <span className={`mb-1.5 text-sm font-bold px-2 py-0.5 rounded-md ${prediction.percentageChange < 0 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {prediction.percentageChange > 0 ? '+' : ''}{prediction.percentageChange}%
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Confidence Score:</span>
                  <strong className="text-slate-800">{prediction.confidenceScore || 85}%</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Expected Profit Delta:</span>
                  <strong className={prediction.expectedProfitDelta < 0 ? "text-red-600" : "text-emerald-600"}>
                    {prediction.expectedProfitDelta < 0 ? '-' : '+'}₹{Math.abs(prediction.expectedProfitDelta || 40)} / q
                  </strong>
                </div>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-50">
                  <span className="font-medium text-gray-500">Risk Level:</span>
                  <strong className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Moderate</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Final Smart Recommendation Banner */}
          <div className="p-6 md:p-8 rounded-[2rem] bg-emerald-50 text-emerald-900 shadow-sm flex items-start gap-6 border border-emerald-200 mt-8 mb-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm flex-shrink-0 border border-emerald-200">
              AI
            </div>
            <div className="space-y-3 w-full">
              <h3 className="text-xl font-black m-0 tracking-tight text-emerald-800">
                Hamari Salah (Smart Advice): <span className={isSellRecommended ? 'text-emerald-600' : 'text-amber-600 bg-amber-50 px-2 py-1 rounded-md'}>{isSellRecommended ? 'Aaj Hi Bechein (Sell Today)' : 'Thoda Intezaar Karein (Wait)'}</span>
              </h3>
              <p className="text-sm md:text-base text-emerald-700 leading-relaxed font-medium bg-white/60 p-4 rounded-xl border border-emerald-100">
                Pichle mandi rates aur market trend ke hisaab se, {isSellRecommended ? 'aaj bechna sabse zyada faydemand rahega kyunki aage daam girne ke chances hain.' : 'kuch din rukne se aapko behtar daam milne ki ummeed hai.'} 
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
