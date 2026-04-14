import axios from "axios"

// ✅ Axios instance (for your backend)
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
  timeout: 10000,
})

// ✅ API KEY (safe fallback)
const API_KEY = import.meta.env.VITE_API_KEY || ""

// ─────────────────────────────────────────────
// 🔹 CORE: Fetch Mandi Prices (Gov API)
// ─────────────────────────────────────────────

export const fetchMandiPrices = async () => {
  try {
    const res = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": API_KEY,
          format: "json",
          limit: 50,
        },
      }
    )

    return res?.data?.records || []
  } catch (error) {
    console.error("fetchMandiPrices error:", error.message)
    return []
  }
}

// ─────────────────────────────────────────────
// 🔹 DASHBOARD HELPERS (TEMP / FALLBACK)
// ─────────────────────────────────────────────

export const fetchDashboardStats = async () => {
  const data = await fetchMandiPrices()
  return data.slice(0, 10)
}

export const fetchTickerPrices = fetchMandiPrices

export const fetchTopMovers = async () => {
  const data = await fetchMandiPrices()

  return data
    .map((item) => ({
      name: item.commodity,
      price: Number(item.modal_price) || 0,
    }))
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
}

export const fetchMSPComparison = async () => []
export const fetchMarkets = async () => []
export const fetchWeatherImpact = async () => []
export const fetchNews = async () => []
export const fetchCalendarEvents = async () => []
export const fetchSeasonalCrops = async () => []
export const fetchTestimonials = async () => []
export const searchCrops = async () => []

// ─────────────────────────────────────────────
// 🔹 BACKEND API
// ─────────────────────────────────────────────

export const getPricesFromBackend = async () => {
  try {
    const res = await api.get("/prices")
    return res?.data || []
  } catch (error) {
    console.error("Backend error:", error.message)
    return []
  }
}

// ─────────────────────────────────────────────
// 🔹 PROFIT CALCULATOR (TEMP)
// ─────────────────────────────────────────────

export const calculateProfit = async (inputs) => {
  return inputs
}

// ─────────────────────────────────────────────
// 🔹 WEBSOCKET (SIMULATION)
// ─────────────────────────────────────────────

export const createPriceSocket = (onMessage, onError) => {
  try {
    const interval = setInterval(() => {
      onMessage([
        {
          name: "Wheat",
          price: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Rice",
          price: Math.floor(Math.random() * 100) + 100,
        },
      ])
    }, 2000)

    return {
      close: () => clearInterval(interval),
    }
  } catch (err) {
    if (onError) onError(err)
  }
}

// ─────────────────────────────────────────────

export default api