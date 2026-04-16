import express from "express";
import {
  createPrediction,
  getPredictions,
} from "../controllers/predictionController.js";

const router = express.Router();

router.post("/predict", createPrediction);
router.get("/predict", getPredictions);

export default router;;