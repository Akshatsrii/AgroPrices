const express = require('express');
const cors = require('cors');

// Import all 16 backend route handlers
const authRoutes = require('../routes/auth');
const farmerRoutes = require('../routes/farmers');
const cropRoutes = require('../routes/crops');
const mandiRoutes = require('../routes/mandis');
const priceRoutes = require('../routes/prices');
const predictionRoutes = require('../routes/predictions');
const recommendationRoutes = require('../routes/recommendations');
const historyRoutes = require('../routes/history');
const notificationRoutes = require('../routes/notifications');
const weatherRoutes = require('../routes/weather');
const aiRoutes = require('../routes/ai');
const assistantRoutes = require('../routes/assistant');
const analyticsRoutes = require('../routes/analytics');
const adminRoutes = require('../routes/admin');
const agronomyRoutes = require('../routes/agronomy');
const marketplaceRoutes = require('../routes/marketplace');

const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/api/health', (req, res) => res.json({ status: 'online', version: '1.0.0' }));

async function runFullApiSuite() {
  console.log('🚀 Starting AgroPrice AI Full API Runtime Integration Test Suite...\n');

  const server = app.listen(5099, async () => {
    const baseUrl = 'http://localhost:5099/api';
    let total = 0;
    let passed = 0;

    async function testEndpoint(name, path, method = 'GET', body = null) {
      total++;
      try {
        const opts = { method, headers: { 'Content-Type': 'application/json' } };
        if (body) opts.body = JSON.stringify(body);
        const res = await fetch(`${baseUrl}${path}`, opts);
        const data = await res.json();

        if (res.status >= 200 && res.status < 300 && (data.success !== false)) {
          passed++;
          console.log(`  ✅ [${method}] ${path} — PASSED (${res.status})`);
        } else {
          console.log(`  ❌ [${method}] ${path} — FAILED (${res.status}):`, data);
        }
      } catch (err) {
        console.log(`  ❌ [${method}] ${path} — EXCEPTION:`, err.message);
      }
    }

    // 1. Health Check
    await testEndpoint('Health Check', '/health');

    // 2. Auth & Farmers
    await testEndpoint('Send OTP', '/auth/send-otp', 'POST', { phone: '9876543210' });
    await testEndpoint('Verify OTP', '/auth/verify-otp', 'POST', { phone: '9876543210', otp: '123456' });

    // 3. Market & Mandis
    await testEndpoint('Todays Prices', '/prices/today');
    await testEndpoint('Nearby Mandis', '/mandis/nearby?lat=23.2&lng=77.08');
    await testEndpoint('Search Mandis', '/mandis/search?q=Kota');
    await testEndpoint('Route Freight Cost', '/mandis/route-cost', 'POST', { originLat: 23.2, originLng: 77.08, destLat: 22.7, destLng: 75.8, vehicleType: 'Tractor' });
    await testEndpoint('Compare Prices', '/prices/compare', 'POST', { mandiIds: ['M1', 'M2'], cropName: 'Wheat' });

    // 4. ML Predictions & Recommendations
    await testEndpoint('ML Price Predictions', '/predictions?crop=Wheat&mandi=Indore%20Central%20Mandi');
    await testEndpoint('AI Sell Recommendation', '/recommendations/calculate', 'POST', { cropName: 'Wheat', quantityQuintals: 50, traderOffer: 2200 });

    // 5. Gemini AI Engine
    await testEndpoint('AI Explain', '/ai/explain', 'POST', { cropName: 'Wheat', predictedPrice: 2599 });
    await testEndpoint('AI Recommend', '/ai/recommend', 'POST', { cropName: 'Wheat', quantity: 50 });
    await testEndpoint('AI Compare Mandis', '/ai/compare', 'POST', { cropName: 'Wheat' });
    await testEndpoint('AI Negotiate Script', '/ai/negotiate', 'POST', { cropName: 'Wheat', traderOffer: 2200 });
    await testEndpoint('AI Market Summary', '/ai/summarize?state=Madhya%20Pradesh&district=Sehore');

    // 6. Live Weather
    await testEndpoint('Live OpenWeather', '/weather/live?district=Sehore&state=Madhya%20Pradesh');

    // 7. Multilingual Assistant
    await testEndpoint('Assistant Chat (Hindi)', '/assistant/chat', 'POST', { prompt: 'लखनऊ में क्या प्राइस है', language: 'Hindi' });
    await testEndpoint('Assistant History', '/assistant/history');

    // 8. Agronomy Suite (7 Tools)
    await testEndpoint('Vision Quality Check', '/agronomy/quality-check', 'POST', { cropName: 'Wheat' });
    await testEndpoint('Disease Pathology Scan', '/agronomy/disease-detect', 'POST', { cropName: 'Wheat' });
    await testEndpoint('Mandi Receipt OCR', '/agronomy/ocr-receipt', 'POST', { receiptImageUrl: 'http://example.com/slip.jpg' });
    await testEndpoint('KCC Loan Calculator', '/agronomy/loan-eligibility', 'POST', { landSizeAcres: 5 });
    await testEndpoint('PMFBY Insurance Advisor', '/agronomy/insurance', 'POST', { landSizeAcres: 5, season: 'Rabi' });
    await testEndpoint('Soil NPK Fertilizer', '/agronomy/fertilizer', 'POST', { landSizeAcres: 5 });
    await testEndpoint('Crop Rotation Plan', '/agronomy/crop-plan', 'POST', { landSizeAcres: 5 });

    // 9. P2P Buyer Marketplace
    await testEndpoint('Marketplace Listings', '/marketplace/listings');
    await testEndpoint('Create Listing', '/marketplace/create-listing', 'POST', { cropName: 'Wheat', quantityQuintals: 50, askingPrice: 2500 });
    await testEndpoint('Demand Forecast', '/marketplace/demand-forecast?crop=Wheat&district=Sehore');

    // 10. Analytics & Admin
    await testEndpoint('Analytics Dashboard', '/analytics/dashboard');
    await testEndpoint('Sales History', '/history');
    await testEndpoint('Admin Overview', '/admin/overview');
    await testEndpoint('Admin Users', '/admin/users');

    console.log(`\n🎉 FULL API RUNTIME TEST COMPLETED: ${passed} / ${total} Endpoints PASSED (${Math.round((passed/total)*100)}% Success Ratio)!`);
    server.close();
    process.exit(passed === total ? 0 : 1);
  });
}

runFullApiSuite();
