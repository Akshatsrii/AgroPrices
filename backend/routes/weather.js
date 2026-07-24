const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

// GET /api/weather/live?district=Sehore&state=Madhya Pradesh
router.get('/live', async (req, res) => {
  try {
    const { district, state } = req.query;
    const weather = await weatherService.getLiveWeather(district, state);
    return res.json({ success: true, weather });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/weather
router.get('/', async (req, res) => {
  try {
    const { district, state } = req.query;
    const weather = await weatherService.getLiveWeather(district, state);
    return res.json({ success: true, weather });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
