const express = require('express');
const router = express.Router();

// GET /api/analytics/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    return res.json({
      success: true,
      analytics: {
        summary: {
          totalGrossRevenue: 389500,
          totalNetProfit: 378232,
          totalVolumeQuintals: 105,
          overallPredictionAccuracy: 95.8, // %
        },
        monthlyProfit: [
          { month: 'May 2026', gross: 127500, net: 124100, profitMarginPct: 97.3 },
          { month: 'Jun 2026', gross: 138000, net: 134200, profitMarginPct: 97.2 },
          { month: 'Jul 2026', gross: 124000, net: 119932, profitMarginPct: 96.7 },
        ],
        cropPerformance: [
          { crop: 'Wheat', totalRevenue: 124000, volumeQuintals: 50, avgPricePerQuintal: 2480, marginPct: 96.7 },
          { crop: 'Soybean', totalRevenue: 138000, volumeQuintals: 30, avgPricePerQuintal: 4600, marginPct: 97.2 },
          { crop: 'Gram', totalRevenue: 127500, volumeQuintals: 25, avgPricePerQuintal: 5100, marginPct: 97.3 },
        ],
        predictionAccuracyStats: {
          modelArchitecture: 'XGBoost & RandomForest Regressor',
          maeRsPerQuintal: 28.38,
          rmse: 32.62,
          r2AccuracyScorePct: 95.8,
          totalPredictionsServed: 1420,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
