<div align="center">

# 🌾 AgroPrice AI

### AI Powered Agricultural Decision Intelligence Platform

**"What should the farmer do today?"**

[![Status](https://img.shields.io/badge/status-in%20development-yellow)]()
[![Platform](https://img.shields.io/badge/platform-MERN-green)]()
[![AI](https://img.shields.io/badge/AI-Decision%20Engine-blue)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

</div>

---

## 📌 What is AgroPrice AI?

AgroPrice AI is **not** a crop price prediction app, a mandi price website, or another agri-marketplace clone.

It is a **decision intelligence platform** — one that tells a farmer, in plain language, exactly what to do with their harvest today.

> ❌ "Today's tomato price is ₹18/kg"
> ✅ "Sell tomorrow in Ramganj Mandi — expected net profit ₹1,450 (92% confidence)"

---

## 🚨 The Problem

Most Indian farmers sell their crops **blind** — without knowing:

| Missing Information | Result |
|---|---|
| Current mandi prices | Underselling to local traders |
| Nearby mandi comparisons | Losing better opportunities nearby |
| Transport & commission costs | Wrong profit assumptions |
| Tomorrow's price trend | Selling too early or too late |
| Best negotiation price | Accepting unfair trader offers |

This information gap costs farmers real money, every single season.

---

## 🎯 Who It's For

**Primary Users**
- 👨‍🌾 Small Farmers
- 👨‍🌾 Medium Farmers
- 👨‍🌾 Large Farmers

**Secondary Users**
- 🤝 Village Traders
- 📋 Commission Agents
- 🏭 Wholesale Buyers

**Future**
- 🏛️ Government bodies
- 🏦 Banks & Insurance
- 🌱 Agri Startups & Food Processing Companies

---

## 🔄 How It Works

```
Farmer opens app
      ↓
Selects crop + quantity + quality
      ↓
(Optional) Enters trader offer & expected price
      ↓
System fetches live mandi prices
      ↓
AI predicts future price trend
      ↓
System calculates transport + commission cost
      ↓
AI compares every possible option
      ↓
🎯 AI Recommendation:
   Sell Today  |  Wait  |  Go to Another Mandi  |  Negotiate at ₹X
```

### 💡 Example in Action

| Input | Value |
|---|---|
| Crop | Tomato — 70 KG |
| Village Trader Offer | ₹17/kg |
| Farmer's Expected Price | ₹22/kg |
| Nearby Mandi Price | ₹20/kg |
| Tomorrow's Predicted Price | ₹21/kg |
| Transport Cost | ₹150 |
| Commission | ₹50 |

**AI Output:**
> ✅ **Sell tomorrow in Ramganj Mandi**
> Expected Net Profit: **₹1,450** · Confidence: **92%**
> *Reason: Rising demand, low transport cost, better mandi margin.*

---

## 🧩 Core Modules

| # | Module | Purpose |
|---|---|---|
| 1 | 🔐 Authentication | Login, signup, OTP, language selection |
| 2 | 🚜 Onboarding | Farmer profile, land & crop details |
| 3 | 🏠 Dashboard | Today's prices, trending crops, quick actions |
| 4 | 💰 Sell Crop | Full selling decision flow |
| 5 | 🗺️ Market | Nearby mandis, price history, comparisons |
| 6 | 🤖 AI Assistant | Chat, recommendations, decision history |
| 7 | 📊 Analytics | Past sales, profit tracking, trends |
| 8 | ⚙️ Settings | Profile, language, notifications, theme |

> 📄 Full screen-by-screen breakdown lives in `/docs/screen-inventory.md` *(40–60 screens across all modules)*

---

## 🧠 Product Philosophy

- **Recommendation-centric, not data-centric** — every screen answers *"what should I do next?"*
- **Built for low digital literacy** — large buttons, minimal text, icon-first
- **Mobile-first, Hindi-friendly**, with voice support planned
- **Real-world SaaS product**, not a student CRUD project

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI / ML | Price prediction + recommendation engine |
| Deployment | Vercel / Render (TBD) |

---

## 🗺️ Roadmap

- [x] Product Vision & Problem Definition
- [ ] Complete Screen Inventory & Information Architecture
- [ ] Design System
- [ ] Module-wise Wireframes
- [ ] React Frontend (module by module)
- [ ] Backend & APIs
- [ ] ML Price Prediction Model
- [ ] Deployment

---

## 📂 Project Structure *(planned)*

```
agroprice-ai/
├── client/          # React frontend
├── server/          # Express backend
├── ml/              # Price prediction models
├── docs/            # Product & architecture docs
└── README.md
```

---

<div align="center">

**Built to solve a real problem for real farmers — not to look good in a portfolio.**

</div>
