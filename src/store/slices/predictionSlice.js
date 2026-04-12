import api from './api'

// ─── Core Prediction ──────────────────────────────────────────────────────────

export const getPrediction = (crop) => {
  return api.post('/predict', { crop })
}

// ─── Advanced Predictions ─────────────────────────────────────────────────────

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
    crop, market, state, season, forecastDate, horizon, includeConfidence,
  })
}

// ─── Bulk Predictions ─────────────────────────────────────────────────────────

export const getBulkPredictions = (crops = [], horizon = '30d') => {
  return api.post('/predict/bulk', { crops, horizon })
}

export const getPredictionAcrossMarkets = (crop, markets = []) => {
  return api.post('/predict/markets', { crop, markets })
}

// ─── Time-Series Forecast ─────────────────────────────────────────────────────

export const getPriceForecastTimeSeries = (crop, days = 30, market = null) => {
  return api.post('/predict/timeseries', { crop, days, ...(market && { market }) })
}

export const getWeeklyForecast = (crop, weeks = 4) => {
  return api.post('/predict/weekly', { crop, weeks })
}

// ─── Seasonal & Risk ──────────────────────────────────────────────────────────

export const getSeasonalPrediction = (crop, season, year = new Date().getFullYear()) => {
  return api.post('/predict/seasonal', { crop, season, year })
}

export const getPriceRiskScore = (crop, horizon = '30d') => {
  return api.post('/predict/risk', { crop, horizon })
}

// ─── Model Metadata ───────────────────────────────────────────────────────────

export const getPredictionConfidenceIntervals = (crop, horizon = '30d') => {
  return api.post('/predict/confidence', { crop, horizon })
}

export const getPredictionModelInfo = (crop = null) => {
  return api.get(`/predict/model-info${crop ? `?crop=${crop}` : ''}`)
}

export const submitPredictionFeedback = (predictionId, actualPrice, crop) => {
  return api.post('/predict/feedback', { predictionId, actualPrice, crop })
}

// ─── Comparison ───────────────────────────────────────────────────────────────

export const comparePredictedVsActual = (crop, dateFrom, dateTo) => {
  return api.post('/predict/compare', { crop, dateFrom, dateTo })
}