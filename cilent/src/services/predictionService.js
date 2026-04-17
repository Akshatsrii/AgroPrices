import axios from "axios";

const API = "http://localhost:5001/api/predict";

export const fetchPrediction = async (data) => {
  try {
    const res = await axios.post(`${API}`, data);
    return res.data;
  } catch (error) {
    console.error("Prediction error:", error);
  }
};