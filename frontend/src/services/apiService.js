const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Enterprise Fetch Wrapper with Timeout, Bearer Auth & Fallback Handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('agro_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['x-auth-token'] = token;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    
    const response = await fetch(url, { ...config, signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.msg || `HTTP error! status: ${response.status}`);
    }
    return { success: true, data };
  } catch (error) {
    console.warn(`[apiService] Request to ${endpoint} failed (using offline fallback):`, error.message);
    return { success: false, error: error.message };
  }
}

export const apiService = {
  // Auth & Farmer APIs
  sendOtp: (phone) => request('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone, otp) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
  getFarmerProfile: () => request('/farmers/profile'),
  updateFarmerProfile: (data) => request('/farmers/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Market & Mandi APIs
  getTodaysPrices: () => request('/prices/today'),
  getNearbyMandis: (lat, lng, maxDistanceKm = 50) => request(`/mandis/nearby?lat=${lat || 23.2}&lng=${lng || 77.08}&maxDistanceKm=${maxDistanceKm}`),
  searchMandis: (query) => request(`/mandis/search?q=${encodeURIComponent(query)}`),
  getMandiRouteCost: (originLat, originLng, destLat, destLng, vehicleType) => 
    request('/mandis/route-cost', { method: 'POST', body: JSON.stringify({ originLat, originLng, destLat, destLng, vehicleType }) }),
  comparePrices: (mandiIds, cropName) => request('/prices/compare', { method: 'POST', body: JSON.stringify({ mandiIds, cropName }) }),

  // Price Predictions & AI Recommendation APIs
  getTomorrowPrediction: (cropName, mandiName) => request(`/predictions?crop=${encodeURIComponent(cropName || 'Wheat')}&mandi=${encodeURIComponent(mandiName || 'Indore Central Mandi')}`),
  calculateAIRecommendation: (sellData) => request('/recommendations/calculate', { method: 'POST', body: JSON.stringify(sellData) }),

  // Gemini AI Engine APIs
  explainPrediction: (data) => request('/ai/explain', { method: 'POST', body: JSON.stringify(data) }),
  getAiRecommendation: (data) => request('/ai/recommend', { method: 'POST', body: JSON.stringify(data) }),
  compareAiMandis: (data) => request('/ai/compare', { method: 'POST', body: JSON.stringify(data) }),
  getNegotiationScript: (data) => request('/ai/negotiate', { method: 'POST', body: JSON.stringify(data) }),
  getMarketSummary: (state, district) => request(`/ai/summarize?state=${encodeURIComponent(state || 'Madhya Pradesh')}&district=${encodeURIComponent(district || 'Sehore')}`),

  // Weather & Impact Advisory APIs
  getLiveWeather: (district, state) => request(`/weather/live?district=${encodeURIComponent(district || 'Sehore')}&state=${encodeURIComponent(state || 'Madhya Pradesh')}`),

  // AI Assistant Chatbot APIs
  sendChatQuery: (prompt, language, mode) => request('/assistant/chat', { method: 'POST', body: JSON.stringify({ prompt, language, mode }) }),

  // Analytics & History APIs
  getAnalyticsDashboard: () => request('/analytics/dashboard'),
  getSalesHistory: () => request('/history'),

  // Agronomy Engine APIs
  checkCropQuality: (imageUrl, cropName) => request('/agronomy/quality-check', { method: 'POST', body: JSON.stringify({ imageUrl, cropName }) }),
  detectCropDisease: (imageUrl, cropName) => request('/agronomy/disease-detect', { method: 'POST', body: JSON.stringify({ imageUrl, cropName }) }),
  parseOcrReceipt: (receiptImageUrl) => request('/agronomy/ocr-receipt', { method: 'POST', body: JSON.stringify({ receiptImageUrl }) }),
  getKccLoanEligibility: (landSizeAcres, primaryCrop) => request('/agronomy/loan-eligibility', { method: 'POST', body: JSON.stringify({ landSizeAcres, primaryCrop }) }),
  getCropInsurance: (landSizeAcres, cropName, season) => request('/agronomy/insurance', { method: 'POST', body: JSON.stringify({ landSizeAcres, cropName, season }) }),
  getFertilizerDose: (landSizeAcres, cropName) => request('/agronomy/fertilizer', { method: 'POST', body: JSON.stringify({ landSizeAcres, cropName }) }),
  getCropPlan: (landSizeAcres, district, soilType) => request('/agronomy/crop-plan', { method: 'POST', body: JSON.stringify({ landSizeAcres, district, soilType }) }),

  // AI Peer-to-Peer Marketplace APIs
  getMarketplaceListings: () => request('/marketplace/listings'),
  createMarketplaceListing: (listingData) => request('/marketplace/create-listing', { method: 'POST', body: JSON.stringify(listingData) }),
  getDemandForecast: (crop, district) => request(`/marketplace/demand-forecast?crop=${encodeURIComponent(crop || 'Wheat')}&district=${encodeURIComponent(district || 'Sehore')}`),

  // Admin Panel APIs
  getAdminOverview: () => request('/admin/overview'),
  getAdminUsers: () => request('/admin/users'),
  getAdminMandis: () => request('/admin/mandis'),
  getAdminAiModels: () => request('/admin/ai-models'),
};
