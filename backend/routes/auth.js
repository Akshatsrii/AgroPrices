const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agro_default_jwt_secret_2026');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password, role, location, landSizeAcres, primaryCrops } = req.body;
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ msg: 'User already exists with this phone number' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      phone,
      password: hashedPassword,
      role: role || 'farmer',
      location: location || {},
      landSizeAcres: landSizeAcres || 0,
      primaryCrops: primaryCrops || []
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const jwtSecret = process.env.JWT_SECRET || 'agro_default_jwt_secret_2026';
    jwt.sign(payload, jwtSecret, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ msg: 'Server Error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    const jwtSecret = process.env.JWT_SECRET || 'agro_default_jwt_secret_2026';
    jwt.sign(payload, jwtSecret, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server Error during login' });
  }
});

// Get Current User Profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
