const mongoose = require('mongoose');

const mandiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hindiName: {
    type: String,
    default: '',
  },
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
  mandiFeePercent: {
    type: Number,
    default: 1.5, // 1.5% APMC tax
  },
  operatingHours: {
    type: String,
    default: '06:00 AM - 04:00 PM',
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  isApmcVerified: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Phase 4 Required Indexes: GeoSpatial Index + Text Search Index
mandiSchema.index({ location: '2dsphere' });
mandiSchema.index({ name: 'text', district: 'text', state: 'text' });

module.exports = mongoose.model('Mandi', mandiSchema);
