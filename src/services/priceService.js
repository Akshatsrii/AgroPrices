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
