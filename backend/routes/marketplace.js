const express = require('express');
const router = express.Router();
const demandForecaster = require('../services/demandForecaster');

const MOCK_LISTINGS = [
  { id: 'LIST-101', farmerName: 'Ramesh Kumar', cropName: 'Wheat (Sharbati)', quantityQuintals: 50, qualityGrade: 'Grade A', targetPricePerQuintal: 2480, location: 'Sehore, MP', topBid: 2450, bidsCount: 4, createdAt: '2026-07-24' },
  { id: 'LIST-102', farmerName: 'Gurpreet Singh', cropName: 'Basmati Rice', quantityQuintals: 80, qualityGrade: 'Grade A', targetPricePerQuintal: 3850, location: 'Karnal, HR', topBid: 3820, bidsCount: 6, createdAt: '2026-07-24' },
  { id: 'LIST-103', farmerName: 'Sunita Devi', cropName: 'Onion (Nashik Red)', quantityQuintals: 120, qualityGrade: 'Grade B', targetPricePerQuintal: 1750, location: 'Nashik, MH', topBid: 1700, bidsCount: 3, createdAt: '2026-07-23' },
];

// GET /api/marketplace/listings
router.get('/listings', async (req, res) => {
  try {
    return res.json({ success: true, count: MOCK_LISTINGS.length, listings: MOCK_LISTINGS });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/marketplace/create-listing
router.post('/create-listing', async (req, res) => {
  try {
    const { farmerName, cropName, quantityQuintals, qualityGrade, targetPricePerQuintal, location } = req.body;
    const newListing = {
      id: `LIST-${Date.now().toString().slice(-4)}`,
      farmerName: farmerName || 'Ramesh Kumar',
      cropName: cropName || 'Wheat',
      quantityQuintals: Number(quantityQuintals) || 50,
      qualityGrade: qualityGrade || 'Grade A',
      targetPricePerQuintal: Number(targetPricePerQuintal) || 2480,
      location: location || 'Sehore, MP',
      topBid: Number(targetPricePerQuintal) || 2480,
      bidsCount: 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    return res.json({ success: true, listing: newListing });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/marketplace/demand-forecast
router.get('/demand-forecast', async (req, res) => {
  try {
    const { crop, district } = req.query;
    const forecast = demandForecaster.forecastDemand(crop, district);
    return res.json({ success: true, forecast });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
