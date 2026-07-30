const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enforce security at startup
const { getJwtSecret } = require('./config/jwtConfig');
getJwtSecret(); // Will crash process immediately if missing

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// API Routes
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
const assistantRoutes = require('./routes/assistant');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const agronomyRoutes = require('./routes/agronomy');
const marketplaceRoutes = require('./routes/marketplace');

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
app.use('/api/assistant', assistantRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agronomy', agronomyRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agroprice-ai';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully to ' + mongoURI))
  .catch(err => console.warn('⚠️ MongoDB connection warning (standalone mode):', err.message));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'AgroPrice AI Enterprise Platform',
    version: '1.0.0',
    phases: 'All Phases Complete (0 through 16)',
    timestamp: new Date().toISOString(),
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send('🌾 AgroPrice AI Enterprise Server running smoothly...');
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
