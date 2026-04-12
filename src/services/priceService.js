import api from './api'

// ─── Core Fetch ───────────────────────────────────────────────────────────────

export const getPrices = (crop) => {
  return api.get(`/prices?crop=${crop}`)
}

// ─── Filtering & Querying ─────────────────────────────────────────────────────

/**
 * Get prices with advanced filters
 * @param {string} crop - Crop name (e.g., 'wheat', 'rice')
 * @param {Object} options - Filter options
 * @param {string} options.market - Filter by market/mandi (e.g., 'Delhi', 'Mumbai')
 * @param {string} options.state - Filter by state
 * @param {string} options.dateFrom - Start date (ISO string)
 * @param {string} options.dateTo - End date (ISO string)
 * @param {number} options.limit - Number of results to return
 * @param {number} options.page - Page number for pagination
 * @param {string} options.sortBy - Sort field (e.g., 'price', 'date')
 * @param {string} options.order - Sort order: 'asc' | 'desc'
 */
export const getPricesFiltered = (crop, options = {}) => {
  const {
    market,
    state,
    dateFrom,
    dateTo,
    limit = 20,
    page = 1,
    sortBy = 'date',
    order = 'desc',
  } = options

  const params = new URLSearchParams({ crop, limit, page, sortBy, order })
  if (market)   params.append('market', market)
  if (state)    params.append('state', state)
  if (dateFrom) params.append('dateFrom', dateFrom)
  if (dateTo)   params.append('dateTo', dateTo)

  return api.get(`/prices?${params.toString()}`)
}

// ─── Multiple Crops ───────────────────────────────────────────────────────────

/**
 * Fetch prices for multiple crops in one call
 * @param {string[]} crops - Array of crop names
 */
export const getPricesForCrops = (crops = []) => {
  const params = new URLSearchParams()
  crops.forEach((c) => params.append('crop', c))
  return api.get(`/prices/bulk?${params.toString()}`)
}

// ─── Historical & Trends ──────────────────────────────────────────────────────

/**
 * Get historical price data for a crop over a time range
 * @param {string} crop
 * @param {string} dateFrom - ISO date string
 * @param {string} dateTo   - ISO date string
 */
export const getPriceHistory = (crop, dateFrom, dateTo) => {
  const params = new URLSearchParams({ crop, dateFrom, dateTo })
  return api.get(`/prices/history?${params.toString()}`)
}

/**
 * Get price trend/statistics for a crop (min, max, avg, etc.)
 * @param {string} crop
 * @param {'7d'|'30d'|'90d'|'1y'} period - Time period shorthand
 */
export const getPriceTrend = (crop, period = '30d') => {
  return api.get(`/prices/trend?crop=${crop}&period=${period}`)
}

// ─── Market-Specific ──────────────────────────────────────────────────────────

/**
 * Get the latest price for a crop in a specific market
 * @param {string} crop
 * @param {string} market - Market/mandi name
 */
export const getPriceByMarket = (crop, market) => {
  return api.get(`/prices/market?crop=${crop}&market=${encodeURIComponent(market)}`)
}

/**
 * Get prices across all markets for a crop (price comparison)
 * @param {string} crop
 */
export const getPricesByAllMarkets = (crop) => {
  return api.get(`/prices/markets?crop=${crop}`)
}

// ─── Min / Max / Recommendations ─────────────────────────────────────────────

/**
 * Get the cheapest market currently selling a crop
 * @param {string} crop
 */
export const getCheapestMarket = (crop) => {
  return api.get(`/prices/cheapest?crop=${crop}`)
}

/**
 * Get the most expensive market for a crop (useful for sellers)
 * @param {string} crop
 */
export const getBestSellingMarket = (crop) => {
  return api.get(`/prices/best-price?crop=${crop}`)
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

/**
 * Subscribe to a price alert for a crop
 * @param {string} crop
 * @param {Object} alert
 * @param {number} alert.targetPrice - Trigger price
 * @param {'above'|'below'} alert.condition - Alert condition
 * @param {string} alert.contactEmail - Where to send the alert
 */
export const subscribePriceAlert = (crop, alert) => {
  return api.post(`/prices/alerts`, { crop, ...alert })
}

/**
 * Delete a price alert by its ID
 * @param {string} alertId
 */
export const deletePriceAlert = (alertId) => {
  return api.delete(`/prices/alerts/${alertId}`)
}

// ─── Exports ──────────────────────────────────────────────────────────────────

/**
 * Download price data as CSV for a crop
 * @param {string} crop
 * @param {string} dateFrom
 * @param {string} dateTo
 */
