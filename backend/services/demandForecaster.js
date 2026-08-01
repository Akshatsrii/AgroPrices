/**
 * AgroPrice AI — Phase 16: Dynamic Macro Commodity Demand & Buyer Volume Forecaster
 * Computes regional buyer demand index (0-100), active buyer inquiry volumes, and 30-day forecast curves.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

let genAI = null;
try {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY || undefined);
} catch (e) {}

class DemandForecaster {
  async forecastDemand(cropName, district) {
    if (!GEMINI_API_KEY || !genAI) {
      throw new Error('GEMINI_API_KEY is missing. Demand Forecaster requires real Google Gemini API access to analyze market trends.');
    }

    try {
      const prompt = `You are a Senior Commodity Demand Strategist.
      Analyze the current macro demand, supply, and regional buyer interest for ${cropName} in the ${district} district of India.
      Return exactly a JSON object in this format:
      {
        "demandStatus": "HIGH_DEMAND" | "MODERATE_DEMAND" | "BALANCED_SUPPLY",
        "demandScore": (number 0-100),
        "activeBuyerInquiriesCount": (number),
        "exportDemandTrend": (1 sentence string explaining export trends),
        "forecast30Days": [
           { "week": "Week 1", "demandIndex": (number 0-100), "expectedPriceRange": "Rs. 2400 - 2500" },
           { "week": "Week 2", "demandIndex": (number 0-100), "expectedPriceRange": "..." },
           { "week": "Week 3", "demandIndex": (number 0-100), "expectedPriceRange": "..." },
           { "week": "Week 4", "demandIndex": (number 0-100), "expectedPriceRange": "..." }
        ],
        "aiMarketplaceAdvice": (1 sentence string with tactical advice for sellers)
      }`;
      
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      if (text) {
        const cleaned = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        
        return {
          service: 'Macro Commodity Demand Forecaster',
          cropName,
          district,
          demandStatus: parsed.demandStatus,
          demandScore: parsed.demandScore,
          activeBuyerInquiriesCount: parsed.activeBuyerInquiriesCount,
          exportDemandTrend: parsed.exportDemandTrend,
          forecast30Days: parsed.forecast30Days,
          aiMarketplaceAdvice: parsed.aiMarketplaceAdvice,
          timestamp: new Date().toISOString()
        };
      }
    } catch (err) {
      throw new Error(`Gemini Demand Forecasting Failed: ${err.message}`);
    }

    throw new Error('Gemini Demand Forecasting Failed: Received empty response from API.');
  }
}

function nextMatchingPrice(cropKey, priceMap) {
  for (const [k, v] of Object.entries(priceMap)) {
    if (cropKey.includes(k)) return v;
  }
  return 2480;
}

module.exports = new DemandForecaster();
