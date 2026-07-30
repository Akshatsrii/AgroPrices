const express = require('express');
const router = express.Router();
const geminiAiEngine = require('../services/geminiAiEngine');

// POST /api/ai/explain
router.post('/explain', async (req, res) => {
  try {
    const { cropName, mandiName, currentPrice, predictedPrice, pctChange } = req.body;
    const result = await geminiAiEngine.explainPrediction(
      cropName || 'Wheat',
      mandiName || 'Indore Central Mandi',
      currentPrice || 2480,
      predictedPrice || 2600,
      pctChange || 4.8
    );
    return res.json({ success: true, explanation: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/recommend
router.post('/recommend', async (req, res) => {
  try {
    const result = await geminiAiEngine.generateRecommendation(req.body);
    return res.json({ success: true, recommendation: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/compare
router.post('/compare', async (req, res) => {
  try {
    const { cropName, quantityQuintals, mandisList } = req.body;
    const defaultMandis = mandisList || [
      { name: 'Indore Central Mandi', distanceKm: 28, modalPrice: 2480, mandiFeePercent: 1.5 },
      { name: 'Sehore APMC Mandi', distanceKm: 12, modalPrice: 2420, mandiFeePercent: 1.5 },
      { name: 'Karond Mandi Bhopal', distanceKm: 38, modalPrice: 2450, mandiFeePercent: 1.5 },
    ];
    const result = await geminiAiEngine.compareMandis(cropName, quantityQuintals, defaultMandis);
    return res.json({ success: true, comparison: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/negotiate
router.post('/negotiate', async (req, res) => {
  try {
    const { cropName, traderOffer, mandiPrice } = req.body;
    const result = await geminiAiEngine.generateNegotiationScript(cropName, traderOffer, mandiPrice);
    return res.json({ success: true, negotiation: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/ai/summarize
router.get('/summarize', async (req, res) => {
  try {
    const { state, district } = req.query;
    const result = await geminiAiEngine.summarizeMarket(state, district);
    return res.json({ success: true, summary: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { prompt, language } = req.body;
    // We will add askAssistant to geminiAiEngine
    const result = await geminiAiEngine.askAssistant(prompt, language || 'English');
    return res.json({ success: true, answer: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/predict-trend
router.post('/predict-trend', async (req, res) => {
  try {
    const { cropName, mandiLocation, language } = req.body;
    // We will add predictCropPriceTrend to geminiAiEngine
    const result = await geminiAiEngine.predictCropPriceTrend(cropName, mandiLocation, language || 'English');
    return res.json({ success: true, prediction: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
