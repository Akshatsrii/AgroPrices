const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const marketRoutes = require('./routes/market');
const cropRoutes = require('./routes/crops');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/ai', aiRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agroprice-ai';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully to ' + mongoURI))
  .catch(err => console.warn('⚠️ MongoDB connection warning (running in standalone mode):', err.message));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'AgroPrice AI API',
    timestamp: new Date().toISOString()
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send('🌾 AgroPrice AI Backend Server is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, msg: 'Internal server error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AgroPrice AI Server running on port ${PORT}`);
});
