/**
 * AI Service: Interacts with the backend AI routes instead of calling Gemini directly.
 * Prevents VITE_GEMINI_API_KEY leaks and centralizes logic on the server.
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://agroprices.onrender.com/api') + '/ai';

/**
 * Ask Gemini AI Assistant a question in farmer's preferred language.
 */
export async function askGeminiAssistant(prompt, language = 'English') {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, language })
    });
    const data = await res.json();
    if (data.success && data.answer) {
      return data.answer;
    }
  } catch (err) {
    console.error('Chat API Error:', err);
  }
  
  return language.toLowerCase() === 'hindi' 
    ? "क्षमा करें, मैं अभी आपकी सहायता करने में असमर्थ हूँ।" 
    : "I apologize, but I am temporarily unable to process your request.";
}

/**
 * Predict future crop price trends using the backend model/AI.
 */
export async function predictCropPriceTrend(cropName, mandiLocation = 'Regional APMC Mandi', language = 'English') {
  try {
    const res = await fetch(`${API_BASE}/predict-trend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cropName, mandiLocation, language })
    });
    const data = await res.json();
    if (data.success && data.prediction) {
      return data.prediction;
    }
  } catch (err) {
    console.error('Predict Trend API Error:', err);
  }

  return {
    currentPrice: 2480,
    predictedPrice7Days: 2590,
    trend: 'Bullish (+4.5%)',
    forecastSummary: 'Network error. Could not retrieve live prediction.',
    isFallback: true
  };
}

/**
 * Generate AI Net Profit Recommendation for Sell Crop Wizard.
 */
export async function generateCropRecommendation(cropDetails, language = 'English') {
  try {
    const res = await fetch(`${API_BASE}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cropName: cropDetails.crop,
        quantityQuintals: cropDetails.quantity,
        qualityGrade: cropDetails.quality,
        currentPrice: cropDetails.expectedPrice, // Approximate for wizard
        traderOffer: cropDetails.traderOffer,
        weatherRisk: false,
        vehicleAvailable: true,
        mandiName: 'Regional APMC Mandi'
      })
    });
    const data = await res.json();
    if (data.success && data.recommendation) {
      // Map the new backend format to the frontend wizard format
      const rec = data.recommendation;
      return {
        recommendedAction: rec.recommendationTitle,
        reasoning: rec.aiAdviceCard,
        extraMargin: rec.gainVsTraderOffer,
        confidenceScore: rec.aiDecisionScore,
        isFallback: rec.isFallback
      };
    }
  } catch (err) {
    console.error('Recommend API Error:', err);
  }

  return {
    recommendedAction: 'Sell at Regional APMC Mandi',
    reasoning: 'Network error. Please verify rates locally.',
    extraMargin: 0,
    confidenceScore: 50,
    isFallback: true
  };
}

/**
 * Generate AI Negotiation Script
 */
export async function generateNegotiationScript(cropName, traderOffer, mandiPrice, language = 'Hindi (हिंदी)') {
  try {
    const res = await fetch(`${API_BASE}/negotiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cropName, traderOffer, mandiPrice })
    });
    const data = await res.json();
    if (data.success && data.negotiation) {
      const isEnglish = language.toLowerCase().includes('english');
      return data.negotiation[isEnglish ? 'negotiationScriptEnglish' : 'negotiationScriptHindi'];
    }
  } catch (err) {
    console.error('Negotiate API Error:', err);
  }
  
  const suggestedCounter = Math.round(mandiPrice * 0.97);
  const isEnglish = language.toLowerCase().includes('english');
  return isEnglish 
    ? `The current fair market rate for ${cropName} at Mandi is Rs.${mandiPrice}/quintal. Your bid of Rs.${traderOffer} is low. I can sell to you directly at Rs.${suggestedCounter}/quintal if payment is settled today.`
    : `मंडी में ${cropName} का आज का भाव ₹${mandiPrice}/क्विंटल है। आपकी बोली ₹${traderOffer} बहुत कम है। अगर आप आज नकद भुगतान करते हैं तो मैं ₹${suggestedCounter}/क्विंटल में देने के लिए तैयार हूँ।`;
}
