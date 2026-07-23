const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

const DEFAULT_CROPS = [
  { id: 'wheat', name: 'Wheat', hindiName: 'गेहूं', category: 'Cereals', icon: '🌾', basePricePerQuintal: 2450 },
  { id: 'paddy', name: 'Basmati Rice (Paddy)', hindiName: 'धान', category: 'Cereals', icon: '🌾', basePricePerQuintal: 3800 },
  { id: 'soybean', name: 'Soybean', hindiName: 'सोयाबीन', category: 'Oilseeds', icon: '🌱', basePricePerQuintal: 4600 },
  { id: 'onion', name: 'Onion', hindiName: 'प्याज़', category: 'Vegetables', icon: '🧅', basePricePerQuintal: 1700 },
  { id: 'tomato', name: 'Tomato', hindiName: 'टमाटर', category: 'Vegetables', icon: '🍅', basePricePerQuintal: 2000 },
  { id: 'mustard', name: 'Mustard', hindiName: 'सरसों', category: 'Oilseeds', icon: '🌼', basePricePerQuintal: 5200 },
  { id: 'cotton', name: 'Cotton', hindiName: 'कपास', category: 'Cash Crops', icon: '☁️', basePricePerQuintal: 6800 },
  { id: 'potato', name: 'Potato', hindiName: 'आलू', category: 'Vegetables', icon: '🥔', basePricePerQuintal: 1500 },
];

// GET /api/crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find({});
    if (crops.length > 0) {
      return res.json({ success: true, crops });
    }
    return res.json({ success: true, crops: DEFAULT_CROPS });
  } catch (err) {
    return res.json({ success: true, crops: DEFAULT_CROPS });
  }
});

// GET /api/crops/:id
router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop) return res.json({ success: true, crop });

    const found = DEFAULT_CROPS.find(c => c.id === req.params.id || c.name.toLowerCase() === req.params.id.toLowerCase());
    return res.json({ success: true, crop: found || DEFAULT_CROPS[0] });
  } catch (err) {
    return res.json({ success: true, crop: DEFAULT_CROPS[0] });
  }
});

module.exports = router;
