import api from './api'

// ─── Core Prediction ──────────────────────────────────────────────────────────

/**
 * Get a basic price prediction for a single crop
 * @param {string} crop - Crop name (e.g., 'wheat', 'rice')
 */
export const getPrediction = (crop) => {
  return api.post('/predict', { crop })
}

