const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  mandi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mandi',
    required: true,
  },
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  modalPrice: {
    type: Number,
    required: true, // Modal/Average price per quintal
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  arrivalQuantityQuintals: {
    type: Number,
    default: 1500,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Phase 4 Required Compound Index: { mandi: 1, crop: 1, date: -1 }
priceSchema.index({ mandi: 1, crop: 1, date: -1 });

module.exports = mongoose.model('Price', priceSchema);
