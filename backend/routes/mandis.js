const express = require('express');
const router = express.Router();
const Mandi = require('../models/Mandi');
const mapsService = require('../services/mapsService');

const MOCK_MANDIS = [
  { id: 'indore', name: 'Indore Central Mandi', district: 'Indore', state: 'Madhya Pradesh', distanceKm: 28, travelTimeFormatted: '0h 42m', mandiFeePercent: 1.5, rating: 4.8, location: { type: 'Point', coordinates: [75.8577, 22.7196] } },
  { id: 'sehore', name: 'Sehore APMC Mandi', district: 'Sehore', state: 'Madhya Pradesh', distanceKm: 12, travelTimeFormatted: '0h 18m', mandiFeePercent: 1.5, rating: 4.6, location: { type: 'Point', coordinates: [77.0850, 23.2000] } },
  { id: 'bhopal', name: 'Karond Mandi Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', distanceKm: 38, travelTimeFormatted: '0h 55m', mandiFeePercent: 1.5, rating: 4.7, location: { type: 'Point', coordinates: [77.4126, 23.2599] } },
  { id: 'dewas', name: 'Dewas Grain Market', district: 'Dewas', state: 'Madhya Pradesh', distanceKm: 45, travelTimeFormatted: '1h 05m', mandiFeePercent: 1.5, rating: 4.4, location: { type: 'Point', coordinates: [76.0534, 22.9676] } },
];

// POST /api/mandis/route-cost
router.post('/route-cost', async (req, res) => {
  try {
    const { originLat, originLng, destLat, destLng, vehicleType } = req.body;
    const result = await mapsService.calculateRouteAndCost(
      originLat || 23.2000,
      originLng || 77.0850,
      destLat || 22.7196,
      destLng || 75.8577,
      vehicleType || 'Tractor Trolley'
    );
    return res.json({ success: true, route: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/mandis/nearby
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
