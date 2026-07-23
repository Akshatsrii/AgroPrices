const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// GET /api/history/sales?farmerId=123
router.get('/sales', async (req, res) => {
  try {
    const mockSales = [
      { id: 'S1', cropName: 'Wheat (गेहूं)', quantityQuintals: 50, salePricePerQuintal: 2480, mandiName: 'Indore Central Mandi', totalPayoutReceived: 124000, netProfit: 119932, saleDate: '2026-07-20' },
      { id: 'S2', cropName: 'Soybean (सोयाबीन)', quantityQuintals: 30, salePricePerQuintal: 4600, mandiName: 'Sehore APMC Mandi', totalPayoutReceived: 138000, netProfit: 134200, saleDate: '2026-06-15' },
      { id: 'S3', cropName: 'Gram (चना)', quantityQuintals: 25, salePricePerQuintal: 5100, mandiName: 'Karond Mandi Bhopal', totalPayoutReceived: 127500, netProfit: 124100, saleDate: '2026-05-10' },
    ];
    return res.json({ success: true, count: mockSales.length, sales: mockSales });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/history/analytics
router.get('/analytics', async (req, res) => {
  try {
    return res.json({
      success: true,
      analytics: {
        totalRevenue: 389500,
        totalNetProfit: 378232,
        totalVolumeQuintals: 105,
        profitMarginPct: 97.1,
        monthlyBreakdown: [
          { month: 'May 2026', profit: 124100 },
          { month: 'Jun 2026', profit: 134200 },
          { month: 'Jul 2026', profit: 119932 },
        ],
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
