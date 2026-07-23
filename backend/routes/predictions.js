const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');

// GET /api/predictions?crop=Wheat&mandi=Indore
router.get('/', async (req, res) => {
  try {
    const { crop, mandi } = req.query;
    const cropName = crop || 'Wheat';
    const mandiName = mandi || 'Indore Central Mandi';

    return res.json({
      success: true,
      prediction: {
        cropName,
        mandiName,
        currentPrice: 2480,
        predictedPrice7Days: 2600,
        confidenceScore: 94,
        trendDirection: 'UP',
        trendPercentage: +4.8,
        recommendationSummary: `Indore Mandi arrivals for ${cropName} are down 12%. Hold for 3 days or sell tomorrow for +₹120/quintal peak gains.`,
        forecastGrid: [
          { day: 'Day 1 (Today)', price: 2480 },
          { day: 'Day 2 (Tomorrow)', price: 2520 },
          { day: 'Day 3', price: 2560 },
          { day: 'Day 4', price: 2600 },
          { day: 'Day 5', price: 2580 },
          { day: 'Day 6', price: 2550 },
          { day: 'Day 7', price: 2530 },
        ],
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
