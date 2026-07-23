const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  landSizeAcres: {
    type: Number,
    required: true,
    default: 3.5,
  },
  soilType: {
    type: String,
    enum: ['Black Soil (Alluvial)', 'Red Soil', 'Loamy Soil', 'Sandy Soil', 'Clay Soil'],
    default: 'Black Soil (Alluvial)',
  },
  irrigationSource: {
    type: String,
    enum: ['Borewell', 'Canal', 'Rainfed', 'Drip Irrigation'],
    default: 'Borewell',
  },
  primaryCrops: [{
    type: String,
  }],
  vehicleType: {
    type: String,
    enum: ['Tractor Trolley', 'Pickup Truck', 'Mini Freight', 'None (Need Pickup)'],
    default: 'Tractor Trolley',
  },
  vehicleCapacityTons: {
    type: Number,
    default: 5.0,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [77.0850, 23.2000],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

farmSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Farm', farmSchema);
