const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

// GET /api/weather?district=Sehore
router.get('/', async (req, res) => {
  try {
    const { district, state } = req.query;
    return res.json({
      success: true,
      weather: {
        district: district || 'Sehore',
        state: state || 'Madhya Pradesh',
        tempCelsius: 32,
        condition: 'Partly Sunny',
        humidityPercent: 62,
        rainfallRisk48h: true,
        advisoryMessage: 'Moderate rain expected in 48 hours. Transport grain in covered trolleys.',
        forecast: [
          { day: 'Today', temp: 32, condition: 'Sunny' },
          { day: 'Tomorrow', temp: 30, condition: 'Cloudy' },
          { day: 'In 2 Days', temp: 27, condition: 'Rain Showers 🌧️' },
        ],
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
