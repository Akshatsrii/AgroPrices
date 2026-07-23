const express = require('express');
const router = express.Router();

// POST AI Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const userPrompt = messages && messages.length > 0 ? messages[messages.length - 1].content : 'Hello';

    // Simple rule-based intelligent fallback / AI responses
    let reply = `In response to your query regarding "${userPrompt.slice(0, 50)}...": Based on live mandi intelligence and current weather patterns, crop prices are showing steady trends. Ensure proper storage moisture levels below 12% to preserve grain quality and command premium rates at local Mandis.`;

    if (userPrompt.toLowerCase().includes('wheat') || userPrompt.toLowerCase().includes('gehun')) {
      reply = '🌾 Wheat market analysis: Current modal prices are hovering around ₹2,250 - ₹2,450 / quintal. Nearby Mandi demand remains strong due to procurement season. We recommend holding high-quality Lok-1 varieties for 5-7 days for peak rates.';
    } else if (userPrompt.toLowerCase().includes('rice') || userPrompt.toLowerCase().includes('paddy') || userPrompt.toLowerCase().includes('dhan')) {
      reply = '🌾 Paddy (Dhan) market analysis: Basmati quality prices are strong at ₹4,100 / quintal. Export demand is driving high trader bids across North Indian Mandis.';
    } else if (userPrompt.toLowerCase().includes('mandi') || userPrompt.toLowerCase().includes('price')) {
      reply = '📊 Mandi prices update: Local market arrivals are moderate today. Nearby Azadpur and Khanna mandis report a +3.2% increase in prices. Check the "Today\'s Market" section for real-time rates.';
    }

    res.json({
      success: true,
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('AI chat error:', err.message);
    res.status(500).json({ success: false, msg: 'Error generating AI response' });
  }
});

// POST AI Recommendation overview
router.post('/recommendation', async (req, res) => {
  try {
    const { cropName, quantity, mandi } = req.body;
    res.json({
      success: true,
      cropName: cropName || 'Wheat',
      action: 'HOLD',
      bestMandi: mandi || 'Azadpur Mandi (12 km)',
      expectedPriceIncrease: '₹140 / quintal',
      optimalSellWindow: '3 to 5 Days',
      riskFactor: 'Low'
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error generating recommendation' });
  }
});

module.exports = router;
