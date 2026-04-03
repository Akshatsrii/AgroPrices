import axios from "axios";

// 🔹 Backend API (your own server)
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 Government API (Agmarknet)
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMandiPrices = async () => {
  try {
    const res = await axios.get(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070`,
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
    console.error("Error fetching mandi prices:", error);
    return [];
  }
};

// 🔹 Optional: Backend route (if you later store data in DB)
export const getPricesFromBackend = async () => {
  try {
    const res = await api.get("/prices");
    return res.data || [];
  } catch (error) {
    console.error("Backend API error:", error);
    return [];
  }
};

export default api;