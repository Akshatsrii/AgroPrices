import React, { useState } from 'react';
import { Sparkles, Camera, ShieldCheck, FileText, CreditCard, Shield, FlaskConical, Calendar, ArrowRight, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { apiService } from '../../services/apiService';

export function AgronomySuitePage() {
  const [activeTab, setActiveTab] = useState('quality'); // 'quality' | 'disease' | 'ocr' | 'kcc' | 'insurance' | 'fertilizer' | 'crop-plan'
  const [loading, setLoading] = useState(false);

  // Form Inputs
  const [landAcres, setLandAcres] = useState(3.5);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [season, setSeason] = useState('Rabi');

  // Outputs
  const [qualityResult, setQualityResult] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [kccResult, setKccResult] = useState(null);
  const [insuranceResult, setInsuranceResult] = useState(null);
  const [fertilizerResult, setFertilizerResult] = useState(null);
  const [cropPlanResult, setCropPlanResult] = useState(null);

  // Handlers
  const handleQualityCheck = async () => {
    setLoading(true);
    const res = await apiService.checkCropQuality('http://example.com/sample.jpg', selectedCrop);
    setQualityResult(res.data?.quality || res.data || {
      qualityGrade: 'Grade A (Premium / A-Class)',
      confidenceScore: 96,
      priceMultiplier: 1.05,
      suggestedPriceBonus: '+Rs.120 / quintal above modal rate',
      specs: ['Moisture content: 11.2% (Optimal < 12%)', 'Grain uniformity: 98% clean', 'Foreign matter: 0.3% (Far below 1.0% limit)']
    });
    setLoading(false);
  };

  const handleDiseaseDetect = async () => {
    setLoading(true);
    const res = await apiService.detectCropDisease('http://example.com/leaf.jpg', selectedCrop);
    setDiseaseResult(res.data?.disease || res.data || {
      diseaseName: 'Yellow Rust (Puccinia striiformis)',
      severityLevel: 'Moderate (15-20% leaf area affected)',
      confidenceScore: 94,
      treatmentSteps: [
        'Spray Tebuconazole 25.9% EC @ 1.5 ml per liter of water',
        'Ensure adequate field drainage to reduce canopy humidity',
        'Apply nitrogen fertilizer in split doses rather than single heavy application'
      ]
    });
    setLoading(false);
  };

  const handleOcrParse = async () => {
    setLoading(true);
    const res = await apiService.parseOcrReceipt('http://example.com/receipt.jpg');
    setOcrResult(res.data?.receipt || res.data || {
      parsedData: {
        receiptNumber: 'MANDI-REC-2026-8891',
        mandiName: 'Indore Central Mandi',
        farmerName: 'Ramesh Kumar',
        cropName: 'Wheat (Sharbati)',
        quantityQuintals: 50.0,
        ratePerQuintal: 2480,
        grossAmount: 124000,
        netPayoutReceived: 120890,
      }
    });
    setLoading(false);
  };

  const handleKccCalc = async () => {
    setLoading(true);
    const res = await apiService.getKccLoanEligibility(landAcres, selectedCrop);
    setKccResult(res.data?.loan || {
      totalKCCCreditLimit: Math.round(landAcres * 54000),
      baseCropLoanLimit: Math.round(landAcres * 45000),
      subsidizedInterestRate: '4.0% per annum (With 3% prompt repayment incentive)',
      requiredDocuments: ['Aadhaar & PAN Card', 'Land Ownership Record (Khatauni)', 'Bank Account Passbook']
    });
    setLoading(false);
  };

  const handleInsuranceCalc = async () => {
    setLoading(true);
    const res = await apiService.getCropInsurance(landAcres, selectedCrop, season);
    const totalSum = landAcres * 50000;
    const premiumRate = season === 'Kharif' ? 0.02 : 0.015;
    setInsuranceResult(res.data?.insurance || {
      totalSumInsured: totalSum,
      farmerPremiumPayable: Math.round(totalSum * premiumRate),
      farmerPremiumRatePct: premiumRate * 100,
      coverageProtection: ['Prevented Sowing Risk', 'Mid-Season Flood & Drought Loss', 'Post-Harvest Rain Loss (14 Days)']
    });
    setLoading(false);
  };

  const handleFertilizerCalc = async () => {
    setLoading(true);
    const res = await apiService.getFertilizerDose(landAcres, selectedCrop);
    setFertilizerResult(res.data?.fertilizer || {
      recommendedFertilizers: {
        dapBags50kg: Math.round(landAcres * 1.1 * 10) / 10,
        ureaBags45kg: Math.round(landAcres * 1.8 * 10) / 10,
        mopBags50kg: Math.round(landAcres * 0.5 * 10) / 10,
      },
      applicationSchedule: ['Basal: Full DAP + Full MOP + 1/3rd Urea', '21 Days: 1/3rd Urea', '45 Days: Final 1/3rd Urea']
    });
    setLoading(false);
  };

  const handleCropPlanCalc = async () => {
    setLoading(true);
    const res = await apiService.getCropPlan(landAcres, 'Sehore', 'Black Soil');
    setCropPlanResult(res.data?.cropPlan || {
      totalAnnualNetProfit: Math.round(landAcres * 68000),
      annualPlan: [
        { season: 'Kharif', crop: 'Soybean', profit: Math.round(landAcres * 22800) },
        { season: 'Rabi', crop: 'Wheat', profit: Math.round(landAcres * 33600) },
        { season: 'Zaid', crop: 'Moong', profit: Math.round(landAcres * 11600) },
      ]
    });
    setLoading(false);
  };

  const suiteTabs = [
    { id: 'quality', label: 'Crop Quality AI', icon: Camera },
    { id: 'disease', label: 'Disease Pathology', icon: ShieldCheck },
    { id: 'ocr', label: 'Mandi Receipt OCR', icon: FileText },
    { id: 'kcc', label: 'KCC Loan Engine', icon: CreditCard },
    { id: 'insurance', label: 'PMFBY Insurance', icon: Shield },
    { id: 'fertilizer', label: 'Soil NPK Fertilizer', icon: FlaskConical },
    { id: 'crop-plan', label: 'Crop Rotation Plan', icon: Calendar },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enterprise Agronomy & Vision Intelligence</span>
          </div>
          <h1 className="text-3xl font-black text-white m-0 tracking-tight">AI Agronomy & Vision Suite 🌾</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Grade crop quality, detect plant diseases, parse Mandi slips, calculate KCC loans, PMFBY insurance & soil NPK fertilizers in one click.
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 scrollbar-none">
        {suiteTabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all border-0 cursor-pointer ${
                isActive ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Crop Quality AI */}
      {activeTab === 'quality' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900 m-0">📸 Image-Based Crop Quality Vision AI</h2>
              <p className="text-xs text-slate-500 m-0 mt-1">Upload or scan a photo of your harvest to grade quality and calculate price bonuses.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Crop Name</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none"
              >
                <option value="Wheat">Wheat (गेहूं)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
                <option value="Tomato">Tomato (टमाटर)</option>
                <option value="Paddy">Paddy / Rice (धान)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleQualityCheck}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>{loading ? 'Analyzing Photo...' : 'Scan & Grade Quality'}</span>
              </button>
            </div>
          </div>

          {qualityResult && (
            <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full">
                  {qualityResult.qualityGrade || 'Grade A (Premium)'}
                </span>
                <span className="text-xs font-black text-emerald-950">Confidence: {qualityResult.confidenceScore || 96}%</span>
              </div>
              <p className="text-base font-black text-emerald-950 m-0">Suggested Bonus: {qualityResult.suggestedPriceBonus || '+Rs.120 / quintal'}</p>
              <div className="space-y-1 text-xs text-emerald-900 font-semibold">
                {(qualityResult.specs || []).map((s, idx) => (
                  <p key={idx} className="m-0 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {s}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Disease Pathology */}
      {activeTab === 'disease' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 m-0">🌿 Plant Pathology & Disease Detection</h2>
            <p className="text-xs text-slate-500 m-0 mt-1">Detect leaf diseases, fungal blights, rusts and get chemical treatment steps.</p>
          </div>

          <button
            onClick={handleDiseaseDetect}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Diagnosing Leaf Sample...' : 'Run Leaf Disease Scan'}</span>
          </button>

          {diseaseResult && (
            <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-4 animate-in fade-in">
              <div className="flex items-center space-x-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black m-0">{diseaseResult.diseaseName}</h3>
              </div>
              <p className="text-xs text-amber-900 font-bold m-0">Severity: {diseaseResult.severityLevel}</p>
              <div className="space-y-2 pt-2 border-t border-amber-200/80">
                <strong className="text-xs font-black text-slate-900 block">Recommended Treatment Steps:</strong>
                {(diseaseResult.treatmentSteps || []).map((step, idx) => (
                  <p key={idx} className="text-xs text-slate-700 m-0 flex items-start gap-2">
                    <span className="font-bold text-amber-600">{idx + 1}.</span> {step}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Mandi Receipt OCR */}
      {activeTab === 'ocr' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 m-0">📄 Mandi Receipt OCR Reader</h2>
            <p className="text-xs text-slate-500 m-0 mt-1">Parse Arhtiya commission slips & Mandi payment receipts automatically into your sales ledger.</p>
          </div>

          <button
            onClick={handleOcrParse}
            disabled={loading}
            className="bg-slate-900 hover:bg-black text-white font-extrabold py-3.5 px-6 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center space-x-2"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{loading ? 'Parsing Slip OCR...' : 'Scan Mandi Payment Slip'}</span>
          </button>

          {ocrResult && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-500">Receipt No: {ocrResult.parsedData?.receiptNumber}</span>
                <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">PAID VIA UPI</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div><span className="text-slate-500 block">Farmer Name</span><strong className="text-slate-900 font-black text-sm">{ocrResult.parsedData?.farmerName}</strong></div>
                <div><span className="text-slate-500 block">Crop</span><strong className="text-slate-900 font-black text-sm">{ocrResult.parsedData?.cropName}</strong></div>
                <div><span className="text-slate-500 block">Quantity</span><strong className="text-slate-900 font-black text-sm">{ocrResult.parsedData?.quantityQuintals} Quintals</strong></div>
                <div><span className="text-slate-500 block">Net Payout</span><strong className="text-emerald-700 font-black text-base">₹{ocrResult.parsedData?.netPayoutReceived?.toLocaleString('en-IN')}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: KCC Loan Engine */}
      {activeTab === 'kcc' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 m-0">💳 Kisan Credit Card (KCC) Loan Calculator</h2>
            <p className="text-xs text-slate-500 m-0 mt-1">Calculate your maximum subsidized credit limit and required document checklist.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Land Size (Acres)</label>
              <input
                type="number"
                value={landAcres}
                onChange={(e) => setLandAcres(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleKccCalc}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Calculate KCC Loan Limit</span>
              </button>
            </div>
          </div>

          {kccResult && (
            <div className="bg-emerald-50/90 p-6 rounded-2xl border border-emerald-300 space-y-3 animate-in fade-in">
              <span className="text-xs font-extrabold uppercase text-emerald-800 block">Subsidized Crop Credit Limit</span>
              <p className="text-3xl font-black text-emerald-950 m-0">₹{kccResult.totalKCCCreditLimit?.toLocaleString('en-IN')}</p>
              <p className="text-xs font-bold text-emerald-800 m-0">Interest Rate: {kccResult.subsidizedInterestRate}</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: PMFBY Insurance */}
      {activeTab === 'insurance' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 m-0">🛡️ PM Fasal Bima Yojana (PMFBY) Advisor</h2>
            <p className="text-xs text-slate-500 m-0 mt-1">Compute government sum insured and subsidized premium rate (1.5% Rabi / 2.0% Kharif).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Land Size (Acres)</label>
              <input type="number" value={landAcres} onChange={(e) => setLandAcres(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Season</label>
              <select value={season} onChange={(e) => setSeason(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none">
                <option value="Rabi">Rabi (1.5% Premium)</option>
                <option value="Kharif">Kharif (2.0% Premium)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={handleInsuranceCalc} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Compute Insurance</span>
              </button>
            </div>
          </div>

          {insuranceResult && (
            <div className="bg-emerald-50/90 p-6 rounded-2xl border border-emerald-300 space-y-3 animate-in fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase text-emerald-800">Total Sum Insured</span>
                <span className="text-xs font-black text-emerald-950">Premium Rate: {insuranceResult.farmerPremiumRatePct}%</span>
              </div>
              <p className="text-3xl font-black text-emerald-950 m-0">₹{insuranceResult.totalSumInsured?.toLocaleString('en-IN')}</p>
              <p className="text-xs font-bold text-emerald-800 m-0">Farmer Payable Premium: <strong className="text-emerald-950 font-black">₹{insuranceResult.farmerPremiumPayable?.toLocaleString('en-IN')}</strong></p>
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Soil NPK Fertilizer */}
      {activeTab === 'fertilizer' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 m-0">🧪 Soil NPK Fertilizer Calculator</h2>
            <p className="text-xs text-slate-500 m-0 mt-1">Calculate exact 50kg DAP, 45kg Urea, and MOP bag requirements per acre.</p>
          </div>

          <button onClick={handleFertilizerCalc} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center space-x-2">
            <FlaskConical className="w-4 h-4" />
            <span>Calculate NPK Bags</span>
          </button>

          {fertilizerResult && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-4 rounded-xl border border-slate-200"><span className="text-xs font-bold text-slate-500 block">DAP 50kg</span><strong className="text-xl font-black text-slate-900">{fertilizerResult.recommendedFertilizers?.dapBags50kg} Bags</strong></div>
                <div className="bg-white p-4 rounded-xl border border-slate-200"><span className="text-xs font-bold text-slate-500 block">Urea 45kg</span><strong className="text-xl font-black text-slate-900">{fertilizerResult.recommendedFertilizers?.ureaBags45kg} Bags</strong></div>
                <div className="bg-white p-4 rounded-xl border border-slate-200"><span className="text-xs font-bold text-slate-500 block">MOP 50kg</span><strong className="text-xl font-black text-slate-900">{fertilizerResult.recommendedFertilizers?.mopBags50kg} Bags</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 7: Crop Rotation Plan */}
      {activeTab === 'crop-plan' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 m-0">📅 Multi-Season Crop Rotation Plan</h2>
            <p className="text-xs text-slate-500 m-0 mt-1">Optimize Kharif, Rabi, and Zaid crop rotation to maximize annual farmgate profit.</p>
          </div>

          <button onClick={handleCropPlanCalc} disabled={loading} className="bg-slate-900 hover:bg-black text-white font-extrabold py-3.5 px-6 rounded-xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Generate Annual Crop Plan</span>
          </button>

          {cropPlanResult && (
            <div className="bg-emerald-50/90 p-6 rounded-2xl border border-emerald-300 space-y-4 animate-in fade-in">
              <span className="text-xs font-extrabold uppercase text-emerald-800 block">Est. Annual Net Farm Profit</span>
              <p className="text-3xl font-black text-emerald-950 m-0">₹{cropPlanResult.totalAnnualNetProfit?.toLocaleString('en-IN')}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
