import Prediction from "../models/Prediction.js";
import axios from "axios";

export const createPrediction = async (req, res) => {
  try {
    const { crop, days } = req.body;

    const mlRes = await axios.post("http://localhost:5000/predict", {
      crop,
      days,
    });

    const predictedPrice = mlRes.data.predicted_price;

    const data = await Prediction.create({
      crop,
      predictedPrice,
      days,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPredictions = async (req, res) => {
  try {
    const data = await Prediction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};