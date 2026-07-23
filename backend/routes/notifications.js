const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const mockNotifications = [
      { id: 'N1', title: '📈 Tomato Price Surge (+5%)', message: 'Ramganj Mandi & Indore Mandi prices up due to hotel inquiries.', type: 'PRICE_SURGE', isRead: false, createdAt: '2026-07-23T08:00:00Z' },
      { id: 'N2', title: '🌧️ Heavy Rain Warning (48 Hours)', message: 'Cover transport trolleys before heading to Mandi.', type: 'WEATHER_ALERT', isRead: false, createdAt: '2026-07-22T14:30:00Z' },
      { id: 'N3', title: '⚡ Direct Buyer Inquiry', message: 'Buyer requested 40 Quintals Wheat at ₹2,470/quintal.', type: 'DEAL_OFFER', isRead: true, createdAt: '2026-07-21T10:15:00Z' },
    ];
    return res.json({ success: true, count: mockNotifications.length, notifications: mockNotifications });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    return res.json({ success: true, message: 'Notification marked as read' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
