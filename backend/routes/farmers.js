const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Farm = require('../models/Farm');

// GET /api/farmers/profile/:userId
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Farmer profile not found' });
    }

    let farm = await Farm.findOne({ farmer: user._id });
    if (!farm) {
      farm = {
        landSizeAcres: 3.5,
        soilType: 'Black Soil (Alluvial)',
        irrigationSource: 'Borewell',
        primaryCrops: ['Wheat', 'Soybean'],
        vehicleType: 'Tractor Trolley',
        vehicleCapacityTons: 5.0,
      };
    }

    return res.json({
      success: true,
      profile: user,
      farm,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/farmers/profile/:userId
router.put('/profile/:userId', async (req, res) => {
  try {
    const { name, state, district, village, preferredLanguage, landSizeAcres, vehicleType } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, state, district, village, preferredLanguage },
      { new: true }
    );

    let farm = await Farm.findOneAndUpdate(
      { farmer: req.params.userId },
      { landSizeAcres, vehicleType },
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      profile: user,
      farm,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
