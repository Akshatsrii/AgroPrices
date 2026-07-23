const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    index: true,
  },
  mandiName: {
    type: String,
    required: true,
    index: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  predictedPrice7Days: {
    type: Number,
    required: true,
  },
  confidenceScore: {
    type: Number,
    default: 92, // Percentage 0-100
  },
  trendDirection: {
    type: String,
    enum: ['UP', 'DOWN', 'STABLE'],
    default: 'UP',
  },
  trendPercentage: {
    type: Number,
    default: 4.8,
  },
  recommendationSummary: {
    type: String,
    default: 'Sell in 3 days for maximum return.',
  },
  calculatedAt: {
    type: Date,
    default: Date.now,
  },
});

predictionSchema.index({ cropName: 1, mandiName: 1, calculatedAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
