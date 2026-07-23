const express = require('express');
const router = express.Router();
const Mandi = require('../models/Mandi');

const MOCK_MANDIS = [
  { id: 'indore', name: 'Indore Central Mandi', district: 'Indore', state: 'Madhya Pradesh', distanceKm: 28, mandiFeePercent: 1.5, rating: 4.8, location: { type: 'Point', coordinates: [75.8577, 22.7196] } },
  { id: 'sehore', name: 'Sehore APMC Mandi', district: 'Sehore', state: 'Madhya Pradesh', distanceKm: 12, mandiFeePercent: 1.5, rating: 4.6, location: { type: 'Point', coordinates: [77.0850, 23.2000] } },
  { id: 'bhopal', name: 'Karond Mandi Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', distanceKm: 38, mandiFeePercent: 1.5, rating: 4.7, location: { type: 'Point', coordinates: [77.4126, 23.2599] } },
  { id: 'dewas', name: 'Dewas Grain Market', district: 'Dewas', state: 'Madhya Pradesh', distanceKm: 45, mandiFeePercent: 1.5, rating: 4.4, location: { type: 'Point', coordinates: [76.0534, 22.9676] } },
  { id: 'uain', name: 'Ujjain APMC Mandi', district: 'Ujjain', state: 'Madhya Pradesh', distanceKm: 65, mandiFeePercent: 1.5, rating: 4.5, location: { type: 'Point', coordinates: [75.7873, 23.1765] } },
];

// GET /api/mandis/nearby?lat=23.2000&lng=77.0850&maxDistanceKm=100
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistanceKm } = req.query;

    if (lat && lng) {
      const maxMeters = (Number(maxDistanceKm) || 100) * 1000;
      const mandis = await Mandi.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
            $maxDistance: maxMeters,
          },
        },
      });

      if (mandis.length > 0) {
        return res.json({ success: true, count: mandis.length, mandis });
      }
    }

    return res.json({ success: true, count: MOCK_MANDIS.length, mandis: MOCK_MANDIS });
  } catch (err) {
    return res.json({ success: true, count: MOCK_MANDIS.length, mandis: MOCK_MANDIS });
  }
});

// GET /api/mandis/search?q=indore
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, mandis: MOCK_MANDIS });
    }

    // Text search query index
    const mandis = await Mandi.find({ $text: { $search: q } });
    if (mandis.length > 0) {
      return res.json({ success: true, mandis });
    }

    const filtered = MOCK_MANDIS.filter(m =>
      m.name.toLowerCase().includes(q.toLowerCase()) ||
      m.district.toLowerCase().includes(q.toLowerCase())
    );

    return res.json({ success: true, mandis: filtered });
  } catch (err) {
    return res.json({ success: true, mandis: MOCK_MANDIS });
  }
});

// GET /api/mandis/:id
router.get('/:id', async (req, res) => {
  try {
    const mandi = await Mandi.findById(req.params.id);
    if (mandi) return res.json({ success: true, mandi });

    const found = MOCK_MANDIS.find(m => m.id === req.params.id || m.name.toLowerCase().includes(req.params.id.toLowerCase()));
    return res.json({ success: true, mandi: found || MOCK_MANDIS[0] });
  } catch (err) {
    return res.json({ success: true, mandi: MOCK_MANDIS[0] });
  }
});

module.exports = router;
