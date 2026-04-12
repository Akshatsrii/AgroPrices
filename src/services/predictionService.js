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

// ─── Time-Series Forecast ─────────────────────────────────────────────────────

/**
 * Get day-by-day price forecast for charting
 * @param {string} crop
 * @param {number} days - Number of days to forecast (default: 30)
 * @param {string} market - Optional market filter
 */
export const getPriceForecastTimeSeries = (crop, days = 30, market = null) => {
  return api.post('/predict/timeseries', { crop, days, ...(market && { market }) })
}

/**
 * Get weekly aggregated forecast (min, max, avg per week)
 * @param {string} crop
 * @param {number} weeks - Number of weeks ahead (default: 4)
 */
export const getWeeklyForecast = (crop, weeks = 4) => {
  return api.post('/predict/weekly', { crop, weeks })
}

// ─── Seasonal & Risk ──────────────────────────────────────────────────────────

/**
 * Get seasonal price prediction considering crop cycles
 * @param {string} crop
 * @param {'kharif'|'rabi'|'zaid'} season
 * @param {number} year - Target year (defaults to current)
 */
export const getSeasonalPrediction = (crop, season, year = new Date().getFullYear()) => {
  return api.post('/predict/seasonal', { crop, season, year })
}

/**
 * Get price volatility risk score for a crop
 * @param {string} crop
 * @param {'7d'|'30d'|'90d'} horizon
 */
export const getPriceRiskScore = (crop, horizon = '30d') => {
  return api.post('/predict/risk', { crop, horizon })
}

// ─── Model Metadata ───────────────────────────────────────────────────────────

/**
 * Get confidence intervals for a prediction (low / mid / high scenarios)
 * @param {string} crop
 * @param {'7d'|'30d'|'90d'} horizon
 */
export const getPredictionConfidenceIntervals = (crop, horizon = '30d') => {
  return api.post('/predict/confidence', { crop, horizon })
}

/**
 * Get metadata about the prediction model (version, last trained, accuracy)
 * @param {string} crop - Optional: crop-specific model info
 */
export const getPredictionModelInfo = (crop = null) => {
  return api.get(/predict/model-info${crop ? `?crop=${crop} : ''}`)
}

/**
 * Submit feedback on a prediction (actual vs predicted — improves the model)
 * @param {string} predictionId - ID returned from a prior prediction
 * @param {number} actualPrice  - The real price that occurred
 * @param {string} crop
 */
export const submitPredictionFeedback = (predictionId, actualPrice, crop) => {
  return api.post('/predict/feedback', { predictionId, actualPrice, crop })
}

// ─── Comparison ───────────────────────────────────────────────────────────────

/**
 * Compare predicted vs historical prices for accuracy analysis
 * @param {string} crop
 * @param {string} dateFrom - ISO date string
 * @param {string} dateTo   - ISO date string
 */
export const comparePredictedVsActual = (crop, dateFrom, dateTo) => {
  return api.post('/predict/compare', { crop, dateFrom, dateTo })
}