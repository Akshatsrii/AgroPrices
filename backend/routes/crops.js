const express = require('express');
const router = express.Router();
const CropListing = require('../models/CropListing');

// POST submit a crop sale listing
router.post('/sell', async (req, res) => {
  try {
    const { cropName, quantity, unit, qualityGrade, expectedPrice, traderOfferPrice, urgencyDays, hasVehicle, mandiLocation } = req.body;

    // AI recommendation logic calculation
    let action = 'HOLD';
    let expectedChange = 4.5;
    let reasoning = 'Mandi arrivals are expected to slow down next week. Holding for 5-7 days will yield ~ ₹120-180 higher price per quintal.';

    if (traderOfferPrice && expectedPrice && Number(traderOfferPrice) >= Number(expectedPrice) * 0.95) {
      action = 'SELL_NOW';
      expectedChange = 0.5;
      reasoning = 'The current trader offer is near peak price levels. Selling now guarantees instant payment without transport risks.';
    } else if (urgencyDays && Number(urgencyDays) <= 2) {
      action = 'SELL_NOW';
      reasoning = 'High financial urgency indicates taking current mandi best bid to prevent delay.';
    }

    const listing = new CropListing({
      cropName: cropName || 'Wheat',
      quantity: Number(quantity) || 10,
      unit: unit || 'quintals',
      qualityGrade: qualityGrade || 'A',
      expectedPrice: Number(expectedPrice) || 2400,
      traderOfferPrice: Number(traderOfferPrice) || 0,
      urgencyDays: Number(urgencyDays) || 7,
      hasVehicle: Boolean(hasVehicle),
      mandiLocation: mandiLocation || 'Nearest Mandi',
      status: 'analyzed',
      aiRecommendation: {
        action,
        expectedPriceChangePct: expectedChange,
        reasoning
      }
    });

    await listing.save();

    res.json({
      success: true,
      msg: 'Crop listing created successfully',
      data: listing
    });
  } catch (err) {
    console.error('Crop sell error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error while submitting crop sale' });
  }
});

// GET sales history for farmer
router.get('/history', async (req, res) => {
  try {
    const history = await CropListing.find().sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, count: history.length, data: history });
  } catch (err) {
    console.error('Crop history error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error fetching crop history' });
  }
});

// POST AI Sell vs Wait analysis endpoint
router.post('/ai-analysis', async (req, res) => {
  try {
    const { cropName, expectedPrice, traderOffer, qualityGrade } = req.body;
    
    const offer = Number(traderOffer) || 0;
    const target = Number(expectedPrice) || 2200;
    const gap = target - offer;

    const recommendation = offer >= target ? 'SELL_NOW' : (gap > 300 ? 'HOLD' : 'PARTIAL_SELL');

    res.json({
      success: true,
      analysis: {
        cropName: cropName || 'Wheat',
        recommendation,
        projectedProfitGain: Math.max(0, Math.round(gap * 0.8)),
        bestDayToSell: recommendation === 'HOLD' ? 'Next Tuesday (5 days)' : 'Today',
        confidenceScore: 92,
        marketFactors: [
          'Rainfall in major growing region reducing short-term market arrival by 14%',
          'Government MSP purchasing center active nearby',
          'High demand from regional flour mills'
        ]
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error running AI analysis' });
  }
});

module.exports = router;
