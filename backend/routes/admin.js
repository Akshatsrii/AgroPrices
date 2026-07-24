const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Mandi = require('../models/Mandi');
const Price = require('../models/Price');

// GET /api/admin/overview
router.get('/overview', async (req, res) => {
  try {
    return res.json({
      success: true,
      stats: {
        totalRegisteredFarmers: 1250,
        activeMandisCount: 48,
        totalListingsToday: 180,
        totalTradingVolumeQuintals: 18400,
        activeAiModel: 'XGBoost Price Regressor v1.2',
        aiPredictionAccuracy: '95.8%',
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).limit(20);
    return res.json({ success: true, count: users.length, users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/mandis
router.get('/mandis', async (req, res) => {
  try {
    const mandis = await Mandi.find({}).limit(20);
    return res.json({ success: true, count: mandis.length, mandis });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/ai-models
router.get('/ai-models', async (req, res) => {
  try {
    return res.json({
      success: true,
      models: [
        { name: 'XGBoost Price Regressor v1.2', status: 'ACTIVE', mae: 28.38, r2Score: 0.958, lastTrained: '2026-07-24' },
        { name: 'RandomForest Regressor v1.0', status: 'STANDBY', mae: 32.62, r2Score: 0.942, lastTrained: '2026-07-20' },
      ],
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/reports/csv
router.get('/reports/csv', async (req, res) => {
  try {
    const csvContent = `ReportDate,FarmerName,Crop,QuantityQuintals,NetProfit,Mandi\n2026-07-24,Ramesh Kumar,Wheat,50,119932,Indore Central Mandi\n2026-07-23,Gurpreet Singh,Paddy,40,148000,Khanna APMC Mandi\n`;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=agroprice_admin_report.csv');
    return res.send(csvContent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
