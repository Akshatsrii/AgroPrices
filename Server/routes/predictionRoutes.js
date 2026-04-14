import express from "express";
import {
  createPrediction,
  getPredictions,
} from "../controllers/predictionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPrediction);
router.get("/", protect, getPredictions);

export default router;