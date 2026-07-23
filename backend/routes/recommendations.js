const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

// POST /api/recommendations/calculate
router.post('/calculate', async (req, res) => {
  try {
    const {
      farmerId,
      cropName,
      quantityQuintals,
      qualityGrade,
      expectedPrice,
      traderOffer,
      vehicleType,
    } = req.body;

    const crop = cropName || 'Wheat';
    const qty = Number(quantityQuintals) || 50;
    const basePrice = Number(expectedPrice) || 2450;
    const offer = Number(traderOffer) || 2150;

    const gross = qty * basePrice;
    const dist = 32; // km
    const fuel = vehicleType === 'Tractor Trolley' ? dist * 2 * 18 : dist * 2 * 12;
    const labor = qty * 25;
    const tax = gross * 0.015;
    const net = gross - fuel - labor - tax;

    let score = 92;
    if (offer < basePrice * 0.9) {
      score = 96; // Trader offer is low -> Go to Mandi
    }

    const recommendationData = {
      farmer: farmerId || null,
      selectedCrop: crop,
      quantityQuintals: qty,
      qualityGrade: qualityGrade || 'Grade A',
      expectedPrice: basePrice,
      traderOffer: offer,
      recommendedMandi: 'Indore Central Mandi',
      aiDecisionScore: score,
      recommendationType: score >= 90 ? 'SELL_NOW' : 'HOLD_3_DAYS',
      grossRevenue: gross,
      estimatedFuelCost: fuel,
      estimatedLaborCost: labor,
      mandiTax: tax,
      netProfit: net,
      aiAdviceText: `Indore Mandi daily arrivals for ${crop} are down 12%. Transporting via your ${vehicleType || 'Tractor Trolley'} delivers ₹${Math.round(net).toLocaleString('en-IN')} net profit, outperforming local middleman offer by +₹${Math.round(net - (offer * qty)).toLocaleString('en-IN')}.`,
    };

    return res.json({
      success: true,
      recommendation: recommendationData,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
