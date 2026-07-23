const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['FARMER', 'TRADER', 'AGGREGATOR', 'ADMIN'],
    default: 'FARMER',
  },
  state: {
    type: String,
    default: 'Madhya Pradesh',
  },
  district: {
    type: String,
    default: 'Sehore',
  },
  village: {
    type: String,
    default: '',
  },
  preferredLanguage: {
    type: String,
    default: 'Hindi',
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
