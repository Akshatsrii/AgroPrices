const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hindiName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Cereals', 'Vegetables', 'Pulses', 'Oilseeds', 'Cash Crops', 'Spices'],
    required: true,
  },
  icon: {
    type: String,
    default: '🌾',
  },
  basePricePerQuintal: {
    type: Number,
    required: true,
  },
  harvestSeason: {
    type: String,
    enum: ['Rabi', 'Kharif', 'Zaid', 'All Season'],
    default: 'Rabi',
  },
  gradesAvailable: [{
    gradeId: String,
    name: String,
    priceMultiplier: Number,
    description: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cropSchema.index({ name: 'text', hindiName: 'text' });

module.exports = mongoose.model('Crop', cropSchema);
