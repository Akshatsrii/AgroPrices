const express = require('express');
const router = express.Router();
const geminiAiEngine = require('../services/geminiAiEngine');

// POST /api/assistant/chat
router.post('/chat', async (req, res) => {
  try {
    const { prompt, language, mode } = req.body;
    const isHindi = language === 'Hindi' || (prompt && (prompt.includes('भाव') || prompt.includes('मंडी') || prompt.includes('नमस्ते')));

    let botResponse = '';
    const queryMode = mode || 'GENERAL';

    if (queryMode === 'NEGOTIATION' || (prompt && prompt.toLowerCase().includes('trader'))) {
      botResponse = isHindi
        ? 'व्यापारी को कहें: "इंदौर मंडी में आज गेहूं का भाव ₹2,480 है। आपकी ₹2,150 की बोली कम है। ₹2,400 नगद में सौदा पक्का करें।"'
        : 'Tell the trader: "Fair Mandi price for Wheat today is Rs.2,480. Your bid of Rs.2,150 is Rs.330 low. I can settle for Rs.2,400 cash today."';
    } else if (queryMode === 'MARKET_EXPLANATION' || (prompt && prompt.toLowerCase().includes('price'))) {
      botResponse = isHindi
        ? 'मंडी अपडेट: आज इंदौर मंडी में टमाटर और गेहूं के दाम आवक कम होने की वजह से +4.8% बढ़े हैं।'
        : 'Market Update: Wheat & Tomato prices at Indore Mandi increased by +4.8% today due to reduced arrival volumes.';
    } else if (queryMode === 'EDUCATION' || (prompt && prompt.toLowerCase().includes('soil'))) {
      botResponse = isHindi
        ? 'कृषि ज्ञान: गेहूं की खेती के लिए जल निकास वाली दोमट या काली मिट्टी (Black Soil) सबसे उपयुक्त मानी जाती है।'
        : 'Agricultural Knowledge: Loam or Alluvial Black Soil with good drainage is ideal for Wheat cultivation.';
    } else {
      botResponse = isHindi
        ? `नमस्ते! मैं आपका एग्रोप्राइस AI सहायक हूँ। आप मुझसे मंडी भाव, गेहूं/टमाटर का अनुमानित मूल्य या व्यापारी से बातचीत का तरीका पूछ सकते हैं।`
        : `Hello! I am your AgroPrice AI assistant. Ask me about Mandi prices, tomorrow price predictions, or trader negotiation scripts!`;
    }

    return res.json({
      success: true,
      query: prompt,
      language: isHindi ? 'Hindi' : 'English',
      response: botResponse,
      mode: queryMode,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/assistant/history
router.get('/history', async (req, res) => {
  try {
    const history = [
      { id: 'H1', query: 'गेहूं का कल का भाव क्या रहेगा?', response: 'कल इंदौर मंडी में गेहूं का भाव ₹2,600 तक जाने का अनुमान है।', language: 'Hindi' },
      { id: 'H2', query: 'Trader offered 2150, should I sell?', response: 'No, middleman bid is Rs.330 below market value.', language: 'English' },
    ];
    return res.json({ success: true, count: history.length, history });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
