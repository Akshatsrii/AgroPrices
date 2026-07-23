const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// Phase 3 & Phase 4 API Routes
const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmers');
const cropRoutes = require('./routes/crops');
const mandiRoutes = require('./routes/mandis');
const priceRoutes = require('./routes/prices');
const predictionRoutes = require('./routes/predictions');
const recommendationRoutes = require('./routes/recommendations');
const historyRoutes = require('./routes/history');
const notificationRoutes = require('./routes/notifications');
const weatherRoutes = require('./routes/weather');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/mandis', mandiRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/ai', aiRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agroprice-ai';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully to ' + mongoURI))
  .catch(err => console.warn('⚠️ MongoDB connection warning (standalone mode):', err.message));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'AgroPrice AI Express API Server',
    version: '1.0.0',
    phase: 'Phase 3 & Phase 4 Complete',
    timestamp: new Date().toISOString(),
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send('🌾 AgroPrice AI Express API Server is running smoothly...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AgroPrice AI Server running on port ${PORT}`);
});
