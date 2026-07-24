const express = require('express');
const router = express.Router();
const aiVisionService = require('../services/aiVisionService');
const agronomyEngine = require('../services/agronomyEngine');

// POST /api/agronomy/quality-check
router.post('/quality-check', async (req, res) => {
  try {
    const { imageUrl, cropName } = req.body;
    const result = await aiVisionService.detectCropQuality(imageUrl, cropName);
    return res.json({ success: true, quality: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/agronomy/disease-detect
router.post('/disease-detect', async (req, res) => {
  try {
    const { imageUrl, cropName } = req.body;
    const result = await aiVisionService.detectCropDisease(imageUrl, cropName);
    return res.json({ success: true, disease: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/agronomy/ocr-receipt
router.post('/ocr-receipt', async (req, res) => {
  try {
    const { receiptImageUrl } = req.body;
    const result = await aiVisionService.parseMandiReceipt(receiptImageUrl);
    return res.json({ success: true, receipt: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/agronomy/loan-eligibility
router.post('/loan-eligibility', async (req, res) => {
  try {
    const { landSizeAcres, primaryCrop } = req.body;
    const result = agronomyEngine.calculateKCCLoanEligibility(landSizeAcres, primaryCrop);
    return res.json({ success: true, loan: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/agronomy/insurance
router.post('/insurance', async (req, res) => {
  try {
    const { landSizeAcres, cropName, season } = req.body;
    const result = agronomyEngine.calculateCropInsurance(landSizeAcres, cropName, season);
    return res.json({ success: true, insurance: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/agronomy/fertilizer
router.post('/fertilizer', async (req, res) => {
  try {
    const { landSizeAcres, cropName } = req.body;
    const result = agronomyEngine.calculateFertilizerDose(landSizeAcres, cropName);
    return res.json({ success: true, fertilizer: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/agronomy/crop-plan
router.post('/crop-plan', async (req, res) => {
  try {
    const { landSizeAcres, district, soilType } = req.body;
    const result = agronomyEngine.generateCropPlan(landSizeAcres, district, soilType);
    return res.json({ success: true, cropPlan: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
