const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with timeout & error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('agro_token');
  if (token) {
    headers['x-auth-token'] = token;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(url, { ...config, signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
    }
    return { success: true, data };
  } catch (error) {
    console.warn(`[apiService] Request to ${endpoint} failed:`, error.message);
    return { success: false, error: error.message };
  }
}

export const apiService = {
  // Auth APIs
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => request('/auth/me'),

  // Market APIs
  getTodaysPrices: () => request('/market/todays-prices'),
  getNearbyMandis: (coords) => request('/market/mandis', { method: 'POST', body: JSON.stringify(coords) }),
  getMarketTrends: () => request('/market/trends'),

  // Crop / Sales APIs
  createCropListing: (cropData) => request('/crops/sell', { method: 'POST', body: JSON.stringify(cropData) }),
  getFarmerSalesHistory: () => request('/crops/history'),
  getSellVsWaitAnalysis: (cropDetails) => request('/crops/ai-analysis', { method: 'POST', body: JSON.stringify(cropDetails) }),

  // AI Assistant APIs
  sendAIChat: (messages) => request('/ai/chat', { method: 'POST', body: JSON.stringify({ messages }) }),
  getAIRecommendation: (cropContext) => request('/ai/recommendation', { method: 'POST', body: JSON.stringify(cropContext) }),
};
