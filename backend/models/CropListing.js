const mongoose = require('mongoose');

const CropListingSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  cropName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'quintals' },
  qualityGrade: { type: String, enum: ['A+', 'A', 'B', 'C'], default: 'A' },
  expectedPrice: { type: Number, required: true },
  traderOfferPrice: { type: Number, default: 0 },
  urgencyDays: { type: Number, default: 7 },
  hasVehicle: { type: Boolean, default: false },
  mandiLocation: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'analyzed', 'sold', 'cancelled'], default: 'pending' },
  aiRecommendation: {
    action: { type: String, default: 'HOLD' }, // 'SELL_NOW', 'HOLD', 'PARTIAL_SELL'
    expectedPriceChangePct: { type: Number, default: 0 },
    reasoning: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CropListing', CropListingSchema);
