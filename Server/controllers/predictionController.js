import Prediction from "../models/Prediction.js";

export const createPrediction = async (req, res) => {
  const { crop, price } = req.body;

  const data = await Prediction.create({
    userId: req.user,
    crop,
    price,
  });

  res.json(data);
};

export const getPredictions = async (req, res) => {
  const data = await Prediction.find({ userId: req.user });
  res.json(data);
};