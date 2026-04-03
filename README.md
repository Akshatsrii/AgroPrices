<div align="center">

![header](https://readme-typing-svg.demolab.com?font=Fira+Code&size=40&duration=3000&pause=1000&color=22C55E&center=true&vCenter=true&width=900&height=100&lines=🌾+AgroPrice+AI;Smart+Mandi+Price+Prediction;AI-Powered+Farming+Decisions)

---

<h1 align="center">🌾 AgroPrice AI</h1>
<h3 align="center">Smart Mandi Price Prediction & Decision System</h3>

---

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br/>

> 🌾 **Empowering Indian Farmers with AI-Driven Market Intelligence**  
> Know where, when, and at what price to sell your crops — before you even leave your farm.

<br/>

---

## 🚜 The Problem We Solve

</div>

```
A farmer sells tomatoes at ₹8/kg locally...
But a mandi just 20 km away offers ₹15/kg.

That's ₹7/kg lost — every single day — just due to lack of information.
```

**AgroPrice AI** eliminates this information gap using live mandi data, AI price predictions, and smart selling recommendations — all in one farmer-friendly platform.

<br/>

---

<div align="center">

## 🗺️ Frontend Architecture & User Flow

```
╔══════════════════════════════════════════════════════════════════════╗
║                        AGROPRICE AI — FRONTEND                       ║
║                     React + Vite + Tailwind CSS v4                   ║
╚══════════════════════════════════════════════════════════════════════╝
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │        main.jsx           │
                    │  ReactDOM.createRoot()    │
                    └──────────────┬───────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │         App.jsx           │
                    │    <AppRoutes />          │
                    └──────────────┬───────────┘
                                   │
                                   ▼
              ┌────────────────────────────────────────┐
              │          routes/AppRoutes.jsx           │
              │         React Router DOM v6             │
              └──┬─────────┬──────────┬───────────┬────┘
                 │         │          │           │
                 ▼         ▼          ▼           ▼
            ┌───────┐ ┌────────┐ ┌────────┐ ┌─────────┐
            │  "/"  │ │"/dash" │ │"/pred" │ │"/insig" │
            └───┬───┘ └───┬────┘ └───┬────┘ └────┬────┘
                │         │          │            │
                ▼         ▼          ▼            ▼
           ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────┐
           │  Home  │ │  Dash  │ │ Pred.  │ │Insights │
           │  .jsx  │ │  board │ │  .jsx  │ │  .jsx   │
           └────────┘ └───┬────┘ └───┬────┘ └────┬────┘
                          │          │            │
          ─────────────────────────────────────────────────
          COMPONENTS LAYER
          ─────────────────────────────────────────────────
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
   ┌─────────────┐  ┌──────────────┐  ┌──────────┐
   │  common/    │  │  dashboard/  │  │   ai/    │
   ├─────────────┤  ├──────────────┤  ├──────────┤
   │ Navbar.jsx  │  │CropSelector  │  │Prediction│
   │ Footer.jsx  │  │PriceCard     │  │Box.jsx   │
   │ Loader.jsx  │  │PriceList     │  │InsightCd │
   │ Button.jsx  │  │Recommend.Box │  │AlertBox  │
   │ Modal.jsx   │  │ProfitCalc    │  └──────────┘
   └─────────────┘  │FilterBar     │
                    └──────────────┘
          │               │                │
          ─────────────────────────────────────────────────
          DATA & SERVICES LAYER
          ─────────────────────────────────────────────────
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
   │   data/     │  │  services/   │  │   store/     │
   ├─────────────┤  ├──────────────┤  ├──────────────┤
   │ dummyData   │  │ api.js       │  │ store.js     │
   │ cropsList   │  │ priceService │  │ priceSlice   │
   └─────────────┘  │ predService  │  │ userSlice    │
                    │ locationSvc  │  │ predSlice    │
                    └──────────────┘  └──────────────┘
```

</div>

<br/>

---

<div align="center">

## 📱 Page Flow — What The Farmer Sees

</div>

```
┌─────────────────────────────────────────────────────────────┐
│                        HOME PAGE  "/"                        │
│                                                              │
│   🌾  AgroPrice AI                                           │
│   "Smart mandi price prediction & decision system"           │
│                                                              │
│              [ Check Prices → ]                              │
└────────────────────────┬────────────────────────────────────┘
                         │  onClick → navigate('/dashboard')
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD PAGE "/dashboard"               │
│                                                              │
│  [ Crop Selector Dropdown ]  ← CropSelector.jsx             │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Kota     │  │ Jaipur   │  │ Udaipur  │  ← PriceCard.jsx │
│  │ ₹20/kg   │  │ ₹18/kg   │  │ ₹22/kg   │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│  ✅ Best Option: Go to Udaipur → +₹2000 profit              │
│  ← RecommendationBox.jsx                                     │
└────────────────────────┬────────────────────────────────────┘
                         │  nav → /prediction
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   PREDICTION PAGE "/prediction"              │
│                                                              │
│  🤖 AI Says: Tomorrow's price → ₹24/kg                      │
│  📈 Trend: Prices RISING this week                          │
│  💡 Suggestion: Wait 2 days before selling                   │
│  ← PredictionBox.jsx                                         │
└────────────────────────┬────────────────────────────────────┘
                         │  nav → /insights
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    INSIGHTS PAGE "/insights"                 │
│                                                              │
│  📊 Price History Chart    ← TrendGraph.jsx                  │
│  🚨 Weather Alert: Rain expected — prices may drop          │
│  💰 Profit Calculator: Enter qty → see earnings             │
│  ← InsightCard.jsx + AlertBox.jsx                            │
└─────────────────────────────────────────────────────────────┘
```

<br/>

---

<div align="center">

## 📁 Frontend File Structure

</div>

```
agroprice-ai/
└── frontend/
    ├── public/
    │   └── index.html
    │
    └── src/
        ├── assets/
        │   ├── images/            # Crop images, logos
        │   ├── icons/             # Custom SVG icons
        │   └── animations/        # Lottie / CSS animations
        │
        ├── components/
        │   ├── common/
        │   │   ├── Navbar.jsx     # Top navigation bar
        │   │   ├── Footer.jsx     # Footer links
        │   │   ├── Loader.jsx     # Spinner / skeleton
        │   │   ├── Button.jsx     # Reusable CTA button
        │   │   └── Modal.jsx      # Popup modal
        │   │
        │   ├── dashboard/
        │   │   ├── CropSelector.jsx      # Dropdown crop picker
        │   │   ├── PriceCard.jsx         # Single mandi card
        │   │   ├── PriceList.jsx         # Grid of price cards
        │   │   ├── RecommendationBox.jsx # Best mandi suggestion
        │   │   ├── ProfitCalculator.jsx  # Input qty → profit
        │   │   └── FilterBar.jsx         # Filter by price/dist.
        │   │
        │   ├── charts/
        │   │   ├── PriceChart.jsx   # Bar/Line chart
        │   │   └── TrendGraph.jsx   # Historical trend view
        │   │
        │   └── ai/
        │       ├── PredictionBox.jsx  # AI price prediction
        │       ├── InsightCard.jsx    # "Prices rise tomorrow"
        │       └── AlertBox.jsx       # Weather/market alerts
        │
        ├── pages/
        │   ├── Home.jsx          # Landing + CTA
        │   ├── Dashboard.jsx     # Main feature page
        │   ├── Prediction.jsx    # AI prediction page
        │   ├── Insights.jsx      # Charts + alerts
        │   └── NotFound.jsx      # 404 page
        │
        ├── services/
        │   ├── api.js              # Axios base config
        │   ├── priceService.js     # GET mandi prices
        │   ├── predictionService.js# POST to ML model
        │   └── locationService.js  # GPS-based mandi
        │
        ├── store/
        │   ├── store.js            # Redux store config
        │   └── slices/
        │       ├── priceSlice.js
        │       ├── userSlice.js
        │       └── predictionSlice.js
        │
        ├── hooks/
        │   ├── useFetch.js         # Custom data fetching
        │   ├── useDebounce.js      # Search optimization
        │   └── useGeoLocation.js   # Detect nearest mandi
        │
        ├── utils/
        │   ├── helpers.js
        │   ├── constants.js
        │   ├── formatters.js       # ₹ currency formatting
        │   └── validators.js
        │
        ├── data/
        │   ├── dummyData.js        # Static mock data
        │   └── cropsList.js        # All supported crops
        │
        ├── routes/
        │   └── AppRoutes.jsx       # React Router config
        │
        ├── styles/
        │   ├── globals.css
        │   └── theme.css
        │
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

<br/>

---

<div align="center">

## ⚡ Quick Start

</div>

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/agroprice-ai.git
cd agroprice-ai/frontend

# 2. Install dependencies
npm install

# 3. Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# 4. Start development server
npm run dev

# 5. Open in browser
# → http://localhost:5173
```

<br/>

---

<div align="center">

## 🛠️ Tech Stack (Frontend)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| ⚡ Build Tool | Vite | Lightning fast dev server |
| ⚛️ Framework | React 18 | Component-based UI |
| 🎨 Styling | Tailwind CSS v4 | Utility-first styling |
| 🔀 Routing | React Router DOM v6 | Page navigation |
| 📡 HTTP Client | Axios | Backend API calls |
| 🗃️ State | Redux Toolkit | Global state management |

<br/>

## ✨ Features

| Feature | Status |
|---------|--------|
| 📊 Live Mandi Price Dashboard | ✅ Ready |
| 🔍 Crop & Location Filter | ✅ Ready |
| 🤖 AI Price Prediction View | ✅ Ready |
| 📈 Price Trend Charts | ✅ Ready |
| 💰 Profit Calculator | ✅ Ready |
| 📍 GPS-Based Mandi Suggestion | 🔄 In Progress |
| 🚨 Smart Weather Alerts | 🔄 In Progress |
| 🗣️ Hindi / Regional Language | 📅 Planned |
| 🔊 Voice Assistant | 📅 Planned |

<br/>

---

## 🌱 Coming Soon

```
Backend (Node.js + MongoDB)  →  ML Service (Python + FastAPI)  →  Full Integration
```

<br/>

---

---

![footer](https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&duration=4000&pause=1000&color=22C55E&center=true&vCenter=true&width=700&height=50&lines=Built+with+❤️+to+help+Indian+farmers+get+the+price+they+deserve.)

*Built with ❤️ to help Indian farmers get the price they deserve.*

</div>
