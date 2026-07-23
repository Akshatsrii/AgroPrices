const mongoose = require('mongoose');

const MandiPriceSchema = new mongoose.Schema({
  mandiName: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  cropName: { type: String, required: true },
  variety: { type: String, default: 'Standard' },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  modalPrice: { type: Number, required: true },
  trend: { type: String, enum: ['UP', 'DOWN', 'STABLE'], default: 'STABLE' },
  trendPercentage: { type: Number, default: 0 },
  distanceKm: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MandiPrice', MandiPriceSchema);
