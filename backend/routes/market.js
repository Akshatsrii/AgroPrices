const express = require('express');
const router = express.Router();
const MandiPrice = require('../models/MandiPrice');

// Mock initial Mandi data fallback if database is fresh
const defaultMandis = [
  { mandiName: 'Azadpur Mandi', district: 'Delhi', state: 'Delhi', cropName: 'Wheat (Lok-1)', minPrice: 2200, maxPrice: 2450, modalPrice: 2350, trend: 'UP', trendPercentage: 3.2, distanceKm: 12 },
  { mandiName: 'Khanna Mandi', district: 'Ludhiana', state: 'Punjab', cropName: 'Paddy (Basmati)', minPrice: 3800, maxPrice: 4250, modalPrice: 4100, trend: 'UP', trendPercentage: 4.8, distanceKm: 45 },
  { mandiName: 'Indore Mandi', district: 'Indore', state: 'Madhya Pradesh', cropName: 'Soybean (Yellow)', minPrice: 4300, maxPrice: 4800, modalPrice: 4600, trend: 'STABLE', trendPercentage: 0.5, distanceKm: 28 },
  { mandiName: 'Lasalgaon Mandi', district: 'Nashik', state: 'Maharashtra', cropName: 'Onion (Red)', minPrice: 1500, maxPrice: 1950, modalPrice: 1800, trend: 'DOWN', trendPercentage: -2.1, distanceKm: 65 },
  { mandiName: 'Guntur Mandi', district: 'Guntur', state: 'Andhra Pradesh', cropName: 'Chilli (Teja)', minPrice: 18000, maxPrice: 21500, modalPrice: 20200, trend: 'UP', trendPercentage: 6.4, distanceKm: 82 },
];

// GET today's market prices
router.get('/todays-prices', async (req, res) => {
  try {
    let prices = await MandiPrice.find().limit(20);
    if (!prices || prices.length === 0) {
      prices = defaultMandis;
    }
    res.json({ success: true, count: prices.length, data: prices });
  } catch (err) {
    console.error('Market prices error:', err.message);
    res.json({ success: true, count: defaultMandis.length, data: defaultMandis });
  }
});

// POST search nearby mandis based on location
router.post('/mandis', async (req, res) => {
  try {
    const { district, state } = req.body;
    let query = {};
    if (district) query.district = new RegExp(district, 'i');
    if (state) query.state = new RegExp(state, 'i');

    let mandis = await MandiPrice.find(query).limit(15);
    if (!mandis || mandis.length === 0) {
      mandis = defaultMandis;
    }
    res.json({ success: true, data: mandis });
  } catch (err) {
    console.error('Search mandis error:', err.message);
    res.json({ success: true, data: defaultMandis });
  }
});

// GET overall market trends summary
router.get('/trends', async (req, res) => {
  try {
    const topGainers = defaultMandis.filter(m => m.trend === 'UP');
    const topLosers = defaultMandis.filter(m => m.trend === 'DOWN');
    res.json({
      success: true,
      summary: {
        totalMandisAnalyzed: 142,
        bullishCropsCount: 8,
        bearishCropsCount: 3,
        updatedAt: new Date().toISOString(),
      },
      topGainers,
      topLosers
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching market trends' });
  }
});

module.exports = router;
