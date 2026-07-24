/**
 * AgroPrice AI — Phase 10: Notifications Engine
 * Generates 4 Alert Types: Price Alerts, Prediction Alerts, Weather Alerts, Selling Reminders
 */

const Notification = require('../models/Notification');

class NotificationEngine {
  /**
   * 1. PRICE ALERTS: Price surge / price target hit notifications
   */
  async createPriceAlert(userId, cropName, mandiName, price, changePct) {
    const isSurge = changePct >= 0;
    const title = isSurge ? `📈 ${cropName} Price Surge (+${changePct}%)` : `📉 ${cropName} Price Drop (${changePct}%)`;
    const message = `Modal price for ${cropName} at ${mandiName} is now Rs.${price}/quintal (${isSurge ? 'up' : 'down'} ${Math.abs(changePct)}%).`;

    return this._saveNotification(userId, title, message, 'PRICE_SURGE', cropName);
  }

  /**
   * 2. PREDICTION ALERTS: AI model forecast alerts
   */
  async createPredictionAlert(userId, cropName, predictedPrice, pctGain) {
    const title = `🤖 AI Forecast Alert: ${cropName}`;
    const message = `ML Model predicts ${cropName} prices will reach Rs.${predictedPrice}/quintal tomorrow (+${pctGain}% gain). Consider holding harvest for 24h.`;

    return this._saveNotification(userId, title, message, 'PRICE_SURGE', cropName);
  }

  /**
   * 3. WEATHER ALERTS: Rainfall & harvest moisture alerts
   */
  async createWeatherAlert(userId, district, condition, advisory) {
    const title = `🌧️ Weather Advisory for ${district}`;
    const message = `Condition: ${condition}. ${advisory}`;

    return this._saveNotification(userId, title, message, 'WEATHER_ALERT', '');
  }

  /**
   * 4. SELLING REMINDERS: Reminders for scheduled sales & peak market hours
   */
  async createSellingReminder(userId, cropName, mandiName, bestTime) {
    const title = `⏰ Selling Reminder: ${cropName}`;
    const message = `Best time to arrive at ${mandiName} is tomorrow between ${bestTime || '06:00 AM - 08:00 AM'} to avoid long truck queues and get top buyer bids.`;

    return this._saveNotification(userId, title, message, 'DEAL_OFFER', cropName);
  }

  /**
   * Helper method to save notification to MongoDB or return fallback
   */
  async _saveNotification(userId, title, message, type, cropName) {
    try {
      if (userId) {
        return await Notification.create({
          user: userId,
          title,
          message,
          type,
          cropName,
          isRead: false,
        });
      }
    } catch (err) {
      // Fallback in standalone mode
    }

    return {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      cropName,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Returns pre-populated alerts for dashboard notification feed
   */
  getAllAlerts() {
    return [
      { id: 'A1', type: 'PRICE_SURGE', title: '📈 Tomato Price Surge (+5%)', message: 'Ramganj Mandi & Indore Mandi prices up due to hotel inquiries.', isRead: false, time: '10 mins ago' },
      { id: 'A2', type: 'PREDICTION_ALERT', title: '🤖 AI Forecast: Wheat +4.8% Gain', message: 'ML Model predicts Wheat prices will reach Rs.2,600/quintal tomorrow. Hold load for peak return.', isRead: false, time: '1 hour ago' },
      { id: 'A3', type: 'WEATHER_ALERT', title: '🌧️ Heavy Rain Advisory', message: 'Moderate rain expected in Sehore within 48h. Cover transport trolleys before heading to Mandi.', isRead: false, time: '3 hours ago' },
      { id: 'A4', type: 'SELLING_REMINDER', title: '⏰ Mandi Arrival Reminder', message: 'Arrive at Indore Central Mandi before 07:00 AM tomorrow for top buyer bids.', isRead: true, time: 'Yesterday' },
    ];
  }
}

module.exports = new NotificationEngine();
