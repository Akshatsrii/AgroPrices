const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// GET /api/prices/today
router.get('/today', async (req, res) => {
  try {
    const prices = [
      { crop: 'Wheat (गेहूं)', modalPrice: 2480, minPrice: 2400, maxPrice: 2550, changePct: +4.8, trend: 'UP' },
      { crop: 'Basmati Rice (धान)', modalPrice: 3850, minPrice: 3700, maxPrice: 3950, changePct: +2.1, trend: 'UP' },
      { crop: 'Soybean (सोयाबीन)', modalPrice: 4620, minPrice: 4450, maxPrice: 4750, changePct: -1.2, trend: 'DOWN' },
      { crop: 'Tomato (टमाटर)', modalPrice: 2000, minPrice: 1800, maxPrice: 2200, changePct: +5.0, trend: 'UP' },
      { crop: 'Onion (प्याज़)', modalPrice: 1700, minPrice: 1550, maxPrice: 1800, changePct: -3.0, trend: 'DOWN' },
      { crop: 'Potato (आलू)', modalPrice: 1500, minPrice: 1400, maxPrice: 1600, changePct: +2.0, trend: 'UP' },
    ];
    return res.json({ success: true, count: prices.length, prices });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/prices/history?crop=Wheat
router.get('/history', async (req, res) => {
  try {
    const { crop } = req.query;
    const history = [
      { date: '2026-07-17', price: 2380 },
      { date: '2026-07-18', price: 2400 },
      { date: '2026-07-19', price: 2410 },
      { date: '2026-07-20', price: 2430 },
      { date: '2026-07-21', price: 2450 },
      { date: '2026-07-22', price: 2465 },
      { date: '2026-07-23', price: 2480 },
    ];
    return res.json({ success: true, crop: crop || 'Wheat', history });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/prices/compare
router.post('/compare', async (req, res) => {
  try {
    const { crop, quantityQuintals } = req.body;
    const qty = Number(quantityQuintals) || 50;

    const comparison = [
      { mandi: 'Indore Central Mandi', distanceKm: 28, modalPrice: 2480, grossRevenue: 2480 * qty, fuelCost: 1008, mandiTax: 1860, netProfit: (2480 * qty) - 1008 - 1860 - (qty * 20), isBest: true },
      { mandi: 'Sehore APMC Mandi', distanceKm: 12, modalPrice: 2420, grossRevenue: 2420 * qty, fuelCost: 432, mandiTax: 1815, netProfit: (2420 * qty) - 432 - 1815 - (qty * 20), isBest: false },
      { mandi: 'Karond Mandi Bhopal', distanceKm: 38, modalPrice: 2450, grossRevenue: 2450 * qty, fuelCost: 1368, mandiTax: 1837, netProfit: (2450 * qty) - 1368 - 1837 - (qty * 20), isBest: false },
    ];

    return res.json({ success: true, crop: crop || 'Wheat', quantityQuintals: qty, comparison });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
