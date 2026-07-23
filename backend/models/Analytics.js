const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  totalActiveFarmers: {
    type: Number,
    default: 1250,
  },
  totalCropListings: {
    type: Number,
    default: 480,
  },
  totalTradingVolumeQuintals: {
    type: Number,
    default: 18400,
  },
  totalGrossProfitGenerated: {
    type: Number,
    default: 4500000, // INR
  },
  topTradedCrop: {
    type: String,
    default: 'Wheat',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

analyticsSchema.index({ date: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
