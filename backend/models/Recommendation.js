const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  cropListingId: {
    type: String,
    index: true,
  },
  selectedCrop: {
    type: String,
    required: true,
  },
  quantityQuintals: {
    type: Number,
    required: true,
  },
  qualityGrade: {
    type: String,
    default: 'Grade A',
  },
  expectedPrice: {
    type: Number,
  },
  traderOffer: {
    type: Number,
  },
  recommendedMandi: {
    type: String,
    required: true,
  },
  aiDecisionScore: {
    type: Number,
    default: 92, // 0-100 score
  },
  recommendationType: {
    type: String,
    enum: ['SELL_NOW', 'HOLD_3_DAYS', 'COUNTER_OFFER'],
    default: 'SELL_NOW',
  },
  grossRevenue: {
    type: Number,
    required: true,
  },
  estimatedFuelCost: {
    type: Number,
    default: 0,
  },
  estimatedLaborCost: {
    type: Number,
    default: 0,
  },
  mandiTax: {
    type: Number,
    default: 0,
  },
  netProfit: {
    type: Number,
    required: true,
  },
  aiAdviceText: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

recommendationSchema.index({ farmer: 1, createdAt: -1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);
