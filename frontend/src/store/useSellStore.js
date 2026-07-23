import { create } from 'zustand';

export const useSellStore = create((set, get) => ({
  // 8 Steps State
  selectedCrop: {
    id: 'wheat',
    name: 'Wheat (गेहूं)',
    category: 'Cereals',
    icon: '🌾',
    basePrice: 2450,
  },
  quantityQuintals: 50,
  qualityGrade: {
    id: 'grade_a',
    name: 'Grade A (Premium / A-Class)',
    multiplier: 1.05,
    description: 'Moisture < 12%, clean grains, uniform size',
  },
  expectedPrice: 2500,
  traderOffer: 2200,
  needMoneyUrgent: 'no', // 'yes' | 'no'
  vehicleAvailable: {
    hasVehicle: true,
    type: 'Tractor Trolley',
    capacityTons: 5,
    fuelCostPerKm: 18,
  },

  // AI Calculated Output
  aiAnalysis: {
    decisionScore: 92,
    recommendationText: 'SELL TODAY AT INDORE MANDI',
    recommendationType: 'SELL_NOW', // 'SELL_NOW' | 'HOLD_3_DAYS' | 'COUNTER_OFFER'
    recommendedMandi: 'Indore Central Mandi',
    distanceKm: 28,
    modalPrice: 2480,
    grossValue: 124000,
    estimatedFuelCost: 1008,
    estimatedLaborCost: 1200,
    mandiTax: 1860,
    netProfit: 119932,
    priceTrendPct: 4.8,
    advice: 'Arrivals at Indore Mandi are down 12% today. Selling now captures peak daily demand before weekend arrivals flood the market.',
  },

  // Actions
  setSelectedCrop: (crop) => set({ selectedCrop: crop }),
  setQuantityQuintals: (qty) => set({ quantityQuintals: qty }),
  setQualityGrade: (grade) => set({ qualityGrade: grade }),
  setExpectedPrice: (price) => set({ expectedPrice: price }),
  setTraderOffer: (offer) => set({ traderOffer: offer }),
  setNeedMoneyUrgent: (urgent) => set({ needMoneyUrgent: urgent }),
  setVehicleAvailable: (vehicle) => set({ vehicleAvailable: vehicle }),

  computeAIRecommendation: () => {
    const state = get();
    const cropBase = state.selectedCrop.basePrice || 2200;
    const gradeMult = state.qualityGrade.multiplier || 1.0;
    const targetPrice = cropBase * gradeMult;
    const gross = state.quantityQuintals * targetPrice;
    
    const dist = 32; // km
    const fuel = dist * 2 * 18; // round trip
    const labor = state.quantityQuintals * 25;
    const tax = gross * 0.015;
    const net = gross - fuel - labor - tax;

    let score = 88;
    if (state.traderOffer < targetPrice * 0.9) {
      score = 94; // Strong recommendation to reject low middleman offer and go to Mandi
    }

    set({
      aiAnalysis: {
        decisionScore: score,
        recommendationText: score >= 90 ? 'SELL TODAY AT INDORE MANDI' : 'HOLD 3 DAYS FOR BETTER RATE',
        recommendationType: score >= 90 ? 'SELL_NOW' : 'HOLD_3_DAYS',
        recommendedMandi: 'Indore Central Mandi',
        distanceKm: dist,
        modalPrice: Math.round(targetPrice),
        grossValue: Math.round(gross),
        estimatedFuelCost: Math.round(fuel),
        estimatedLaborCost: Math.round(labor),
        mandiTax: Math.round(tax),
        netProfit: Math.round(net),
        priceTrendPct: 5.2,
        advice: `Your ${state.selectedCrop.name} (Grade A) has strong demand at Indore Mandi. Transporting via your ${state.vehicleAvailable.type} yields ₹${Math.round(net).toLocaleString('en-IN')} net profit.`,
      }
    });
  }
}));
