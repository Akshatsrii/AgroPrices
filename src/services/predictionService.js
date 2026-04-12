import api from './api'

// ─── Core Prediction ──────────────────────────────────────────────────────────

/**
 * Get a basic price prediction for a single crop
 * @param {string} crop - Crop name (e.g., 'wheat', 'rice')
 */
export const getPrediction = (crop) => {
  return api.post('/predict', { crop })
}
/ ─── Advanced Predictions ─────────────────────────────────────────────────────

/**
 * Get prediction with extended context for higher accuracy
 * @param {string} crop
 * @param {Object} context
 * @param {string} context.market        - Target market/mandi
 * @param {string} context.state         - State for regional pricing
 * @param {string} context.season        - 'kharif' | 'rabi' | 'zaid'
 * @param {string} context.forecastDate  - ISO date to predict for
 * @param {'7d'|'14d'|'30d'|'90d'} context.horizon - Prediction window
 * @param {boolean} context.includeConfidence - Include confidence score
 */
export const getPredictionDetailed = (crop, context = {}) => {
  const {
    market,
    state,
    season,
    forecastDate = new Date().toISOString(),
    horizon = '30d',
    includeConfidence = true,
  } = context

  return api.post('/predict/detailed', {
    crop,
    market,
    state,
    season,
    forecastDate,
    horizon,
    includeConfidence,
  })
}

// ─── Bulk Predictions ─────────────────────────────────────────────────────────

/**
 * Predict prices for multiple crops in a single request
 * @param {string[]} crops - Array of crop names
 * @param {'7d'|'14d'|'30d'} horizon - Prediction window
 */
export const getBulkPredictions = (crops = [], horizon = '30d') => {
  return api.post('/predict/bulk', { crops, horizon })
}

/**
 * Get predictions for one crop across multiple markets
 * @param {string} crop
 * @param {string[]} markets - Array of market/mandi names
 */
export const getPredictionAcrossMarkets = (crop, markets = []) => {
  return api.post('/predict/markets', { crop, markets })
}

