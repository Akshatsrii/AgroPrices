const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    index: true,
  },
  state: {
    type: String,
    required: true,
    index: true,
  },
  tempCelsius: {
    type: Number,
    default: 31,
  },
  condition: {
    type: String,
    default: 'Partly Cloudy',
  },
  humidityPercent: {
    type: Number,
    default: 65,
  },
  rainfallRisk48h: {
    type: Boolean,
    default: false,
  },
  advisoryMessage: {
    type: String,
    default: 'Favorable conditions for crop transport.',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

weatherSchema.index({ district: 1, state: 1, updatedAt: -1 });

module.exports = mongoose.model('Weather', weatherSchema);
