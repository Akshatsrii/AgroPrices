const express = require('express');
const router = express.Router();
const mlService = require('../services/mlService');

// GET /api/predictions?crop=Wheat&mandi=Indore&currentPrice=2480
router.get('/', async (req, res) => {
  try {
    const { crop, mandi, currentPrice } = req.query;
    const cropName = crop || 'Wheat';
    const mandiName = mandi || 'Indore Central Mandi';
    const price = Number(currentPrice) || 2480;

    const prediction = await mlService.predictTomorrowPrice(cropName, mandiName, price);

    return res.json({
      success: true,
      prediction,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/predictions/predict
router.post('/predict', async (req, res) => {
  try {
    const { cropName, mandiName, currentPrice, arrivalQty } = req.body;
    const prediction = await mlService.predictTomorrowPrice(
      cropName || 'Wheat',
      mandiName || 'Indore Central Mandi',
      currentPrice || 2480,
      arrivalQty || 1200
    );

    return res.json({
      success: true,
      prediction,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
