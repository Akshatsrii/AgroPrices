const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'agroprice_secret_key_2026';

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber || req.body.phone;
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Demo SMS trigger mock response
    return res.json({
      success: true,
      message: `OTP sent to ${phoneNumber}. Use demo code 123456`,
      demoCode: '123456',
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber || req.body.phone;
    const otpCode = req.body.otpCode || req.body.otp;
    const { name, state, district } = req.body;

    if (!phoneNumber || !otpCode) {
      return res.status(400).json({ error: 'Phone number and OTP code are required' });
    }

    if (otpCode !== '123456' && otpCode.length !== 6) {
      return res.status(400).json({ error: 'Invalid OTP code' });
    }

    let user = null;
    try {
      user = await User.findOne({ phoneNumber });
    } catch (e) {}

    if (!user) {
      user = {
        _id: 'USER_DEMO_101',
        phoneNumber,
        name: name || 'Ramesh Kumar',
        state: state || 'Madhya Pradesh',
        district: district || 'Sehore',
        role: 'FARMER',
        isVerified: true,
      };
    }

    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    let user = null;
    try {
      user = await User.findById(decoded.userId);
    } catch (e) {}

    if (!user) {
      user = {
        _id: decoded.userId || 'USER_DEMO_101',
        phoneNumber: decoded.phoneNumber || '9876543210',
        name: 'Ramesh Kumar',
        state: 'Madhya Pradesh',
        district: 'Sehore',
        role: 'FARMER',
      };
    }

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
