import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const API_KEY = import.meta.env.VITE_API_KEY;

// 🔹 Core API (real)
export const fetchMandiPrices = async () => {
  try {
    const res = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": API_KEY,
          format: "json",
          limit: 20,
        },
      }
    );
    return res.data.records || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 🔹 Map missing functions (IMPORTANT FIX)

export const fetchDashboardStats = fetchMandiPrices;
export const fetchTickerPrices = fetchMandiPrices;
export const fetchTopMovers = async () => [];
export const fetchMSPComparison = async () => [];
export const fetchMarkets = async () => [];
export const fetchWeatherImpact = async () => [];
export const fetchNews = async () => [];
export const fetchCalendarEvents = async () => [];
export const fetchSeasonalCrops = async () => [];
export const fetchTestimonials = async () => [];
export const searchCrops = async () => [];

// 🔹 Backend (optional)
export const getPricesFromBackend = async () => {
  try {
    const res = await api.get("/prices");
    return res.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 🔹 Profit calc
export const calculateProfit = async (inputs) => inputs;

// 🔹 WebSocket (dummy)
export const createPriceSocket = (onMessage, onError) => {
  const interval = setInterval(() => {
    onMessage([
      { name: "Wheat", price: Math.floor(Math.random() * 100) },
      { name: "Rice", price: Math.floor(Math.random() * 100) }
    ]);
  }, 2000);

  return {
    close: () => clearInterval(interval)
  };
};

export default api;