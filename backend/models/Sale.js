const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  quantityQuintals: {
    type: Number,
    required: true,
  },
  salePricePerQuintal: {
    type: Number,
    required: true,
  },
  mandiName: {
    type: String,
    required: true,
  },
  totalPayoutReceived: {
    type: Number,
    required: true,
  },
  netProfit: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['DIRECT_BANK_UPI', 'CASH', 'CHEQUE'],
    default: 'DIRECT_BANK_UPI',
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

saleSchema.index({ farmer: 1, saleDate: -1 });

module.exports = mongoose.model('Sale', saleSchema);
