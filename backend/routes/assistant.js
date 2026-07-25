const express = require('express');
const router = express.Router();
const geminiAiEngine = require('../services/geminiAiEngine');

function extractMandiAndCrop(promptText) {
  const text = promptText || '';
  const lower = text.toLowerCase();

  let location = '';

  // Dictionary matching for popular Indian cities & mandis
  if (lower.includes('lucknow') || lower.includes('लखनऊ')) location = 'Lucknow APMC Mandi (लखनऊ मंडी)';
  else if (lower.includes('kanpur') || lower.includes('कानपुर')) location = 'Kanpur Mandi (कानपुर मंडी)';
  else if (lower.includes('patna') || lower.includes('पटना')) location = 'Patna APMC Mandi (पटना मंडी)';
  else if (lower.includes('jaipur') || lower.includes('जयपुर')) location = 'Jaipur Grain Market (जयपुर मंडी)';
  else if (lower.includes('delhi') || lower.includes('दिल्ली') || lower.includes('azadpur')) location = 'Azadpur Mandi Delhi (दिल्ली मंडी)';
  else if (lower.includes('kota') || lower.includes('कोटा')) location = 'Kota APMC Mandi (कोटा मंडी)';
  else if (lower.includes('sehore') || lower.includes('सीहोर')) location = 'Sehore Mandi (सीहोर मंडी)';
  else if (lower.includes('bhopal') || lower.includes('भोपाल')) location = 'Karond Mandi Bhopal (भोपाल मंडी)';
  else if (lower.includes('ramganj') || lower.includes('रामगंज')) location = 'Ramganj Mandi (रामगंज मंडी)';
  else if (lower.includes('khanna') || lower.includes('खन्ना')) location = 'Khanna APMC Mandi (खन्ना मंडी)';
  else if (lower.includes('nashik') || lower.includes('नासिक')) location = 'Nashik Market (नासिक मंडी)';
  else if (lower.includes('dewas') || lower.includes('देवास')) location = 'Dewas Mandi (देवास मंडी)';
  else {
    const match = text.match(/([A-Za-z\u0900-\u097F]{3,20})\s+(?:में|मे|मंडी|mandi|in|at)/i);
    if (match && match[1]) {
      const parsed = match[1].replace(/(?:क्या|का|की|के|भाव|रेट|प्राइस|price|rate)/gi, '').trim();
      if (parsed.length >= 3) {
        location = `${parsed} Mandi`;
      }
    }
  }

  if (!location) {
    location = 'Indore Central Mandi';
  }

  // Extract Crop
  let crop = 'Wheat (गेहूं)';
  let price = 2480;
  if (lower.includes('tomato') || lower.includes('टमाटर')) { crop = 'Tomato (टमाटर)'; price = 20; }
  else if (lower.includes('onion') || lower.includes('प्याज़') || lower.includes('प्याज')) { crop = 'Onion (प्याज़)'; price = 17; }
  else if (lower.includes('soybean') || lower.includes('सोयाबीन')) { crop = 'Soybean (सोयाबीन)'; price = 4600; }
  else if (lower.includes('paddy') || lower.includes('rice') || lower.includes('धान') || lower.includes('चावल')) { crop = 'Paddy (धान)'; price = 3850; }

  return { location, crop, price };
}

function generateDynamicMandiResponse(promptText, language = 'English') {
  const { location, crop, price } = extractMandiAndCrop(promptText);
  const lower = (promptText || '').toLowerCase();
  const isHindi = language === 'Hindi' || lower.includes('का') || lower.includes('भाव') || lower.includes('क्या') || lower.includes('रेट') || lower.includes('में');

  if (isHindi) {
    return `${location} में आज ${crop} का मंडी भाव ₹${price.toLocaleString('en-IN')}${price < 100 ? '/किलो' : '/क्विंटल'} है। कल आवक कम होने की वजह से भाव +4.5% तक बढ़ने का अनुमान है।`;
  }
  return `At ${location}, current rate for ${crop} is Rs.${price.toLocaleString('en-IN')}${price < 100 ? '/kg' : '/quintal'}. Prices are forecasted to gain +4.5% tomorrow due to strong buyer demand.`;
}

// POST /api/assistant/chat
router.post('/chat', async (req, res) => {
  try {
    const { prompt, language, mode } = req.body;
    const isHindi = language === 'Hindi' || (prompt && (prompt.includes('भाव') || prompt.includes('मंडी') || prompt.includes('नमस्ते') || prompt.includes('में')));

    let botResponse = generateDynamicMandiResponse(prompt, language);
    const queryMode = mode || 'GENERAL';

    if (queryMode === 'NEGOTIATION' || (prompt && prompt.toLowerCase().includes('trader'))) {
      botResponse = isHindi
        ? 'व्यापारी को कहें: "मंडी में आज गेहूं का भाव ₹2,480 है। आपकी ₹2,150 की बोली कम है। ₹2,400 नगद में सौदा पक्का करें।"'
        : 'Tell the trader: "Fair Mandi price for Wheat today is Rs.2,480. Your bid of Rs.2,150 is low. I can settle for Rs.2,400 cash today."';
    } else if (queryMode === 'EDUCATION' || (prompt && prompt.toLowerCase().includes('soil'))) {
      botResponse = isHindi
        ? 'कृषि ज्ञान: गेहूं की खेती के लिए जल निकास वाली दोमट या काली मिट्टी (Black Soil) सबसे उपयुक्त मानी जाती है।'
        : 'Agricultural Knowledge: Loam or Alluvial Black Soil with good drainage is ideal for Wheat cultivation.';
    }

    return res.json({
      success: true,
      query: prompt,
      reply: botResponse,
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
      { id: 'H1', query: 'लखनऊ मंडी में क्या प्राइस है?', response: 'Lucknow APMC Mandi में आज गेहूं का भाव ₹2,480/क्विंटल है।', language: 'Hindi' },
      { id: 'H2', query: 'Trader offered 2150, should I sell?', response: 'No, middleman bid is Rs.330 below market value.', language: 'English' },
    ];
    return res.json({ success: true, count: history.length, history });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
