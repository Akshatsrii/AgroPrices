const express = require('express');
const router = express.Router();
const notificationEngine = require('../services/notificationEngine');

// GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const alerts = notificationEngine.getAllAlerts();
    return res.json({ success: true, count: alerts.length, notifications: alerts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/notifications/trigger
router.post('/trigger', async (req, res) => {
  try {
    const { userId, type, cropName, mandiName, price, changePct, district, condition, advisory } = req.body;
    let notif;

    if (type === 'PRICE_ALERT') {
      notif = await notificationEngine.createPriceAlert(userId, cropName, mandiName, price, changePct);
    } else if (type === 'PREDICTION_ALERT') {
      notif = await notificationEngine.createPredictionAlert(userId, cropName, price, changePct);
    } else if (type === 'WEATHER_ALERT') {
      notif = await notificationEngine.createWeatherAlert(userId, district, condition, advisory);
    } else {
      notif = await notificationEngine.createSellingReminder(userId, cropName, mandiName, '06:00 AM - 08:00 AM');
    }

    return res.json({ success: true, notification: notif });
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
