import axios from "axios";

const API = "http://localhost:3000/api";

export const fetchPrediction = async (data) => {
  try {
    const res = await axios.post(`${API}/predict`, data);
    return res.data;
  } catch (error) {
    console.error("Prediction error:", error);
  }
};