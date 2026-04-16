import Prediction from "../models/Prediction.js";
import axios from "axios";

// 🔹 CREATE + ML PREDICTION
export const createPrediction = async (req, res) => {
  try {
    const { crop, days } = req.body;

    // 🔥 Call Python ML API
    const mlResponse = await axios.post("http://localhost:5000/predict", {
      days,
    });

    const predictedPrice = mlResponse.data.predicted_price;

    // 🔥 Save in DB
    const data = await Prediction.create({
      userId: req.user,
      crop,
      predictedPrice,
      days,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET USER PREDICTIONS
export const getPredictions = async (req, res) => {
  try {
    const data = await Prediction.find({ userId: req.user }).sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET SINGLE PREDICTION
export const getPredictionById = async (req, res) => {
  try {
    const data = await Prediction.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 DELETE PREDICTION
export const deletePrediction = async (req, res) => {
  try {
    const data = await Prediction.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    await data.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};