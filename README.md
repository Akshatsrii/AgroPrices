<div align="center">

# 🌾 AgroPrice AI

### AI-Powered Agricultural Decision Intelligence Platform

**"What should the farmer do today to maximize profit?"**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Python](https://img.shields.io/badge/Python-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#-license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contribution-guide--engineering-standards)

</div>

---

## 📌 Executive Summary

**AgroPrice AI** is an enterprise-grade **Agricultural Decision Intelligence Platform** built to close the information gap that costs farmers money at the farm gate. Unlike static mandi-price dashboards or generic crop-monitoring apps, AgroPrice AI works as an **actionable, real-time decision engine**.

It synthesizes **live government mandi prices (Agmarknet)**, **historical commodity price series**, **ensemble machine learning models (XGBoost / LightGBM)**, **hyper-local weather feeds**, **dynamic logistics/route estimation**, and **Google Gemini 1.5 Pro reasoning** to deliver personalized, risk-adjusted, profit-maximizing selling recommendations directly to farmers.

---

## 📋 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Product Vision & Mission](#-product-vision--mission)
3. [Problem Statement](#-problem-statement)
4. [Business Objectives & KPIs](#-business-objectives--kpis)
5. [Farmer Decision Journey](#-farmer-decision-journey)
6. [User Personas](#-user-personas)
7. [Product Modules](#-product-modules)
8. [Screen Architecture](#-screen-architecture)
9. [Tech Stack](#-tech-stack)
10. [Getting Started](#-getting-started)
11. [Frontend Architecture](#-frontend-architecture)
12. [Backend Architecture](#-backend-architecture)
13. [Database Schema](#-database-schema)
14. [REST API Reference](#-rest-api-reference)
15. [Government Data Pipeline](#-government-data-pipeline)
16. [Machine Learning Pipeline](#-machine-learning-pipeline)
17. [Gemini AI Integration](#-gemini-ai-integration)
18. [Recommendation Scoring Engine](#-recommendation-scoring-engine)
19. [Domain Calculation Engines](#-domain-calculation-engines)
20. [Security & Compliance](#-security--compliance)
21. [Performance & Scalability](#-performance--scalability)
22. [DevOps & Deployment](#-devops--deployment)
23. [Observability & Monitoring](#-observability--monitoring)
24. [Testing Strategy](#-testing-strategy)
25. [Product Roadmap](#-product-roadmap)
26. [Contribution Guide](#-contribution-guide--engineering-standards)
27. [Repository Structure](#-repository-structure)
28. [License](#-license)

---

## 🎯 Product Vision & Mission

**Vision:** Empower every agricultural producer with enterprise-class market intelligence, cognitive AI decision support, and transparent price discovery — eliminating distress selling and maximizing farmgate profitability.

**Mission:** Bridge the digital and economic divide in agriculture with an intuitive, multilingual, decision-first platform that turns complex market dynamics, weather patterns, and logistics costs into simple, high-confidence selling instructions.

---

## 🧠 Problem Statement

Agriculture contributes over 16% of India's GDP and employs nearly half its workforce — yet smallholder farmers typically capture only 30–40% of the final consumer value of their produce. Information asymmetry at the farm gate forces farmers into distress selling.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                              TRADITIONAL FARM GATE                                │
├───────────────────────────────────────────────────────────────────────────────────┤
│   No Future Visibility  +  Village Trader Monopoly  +  Hidden Transport Costs      │
│                                        =                                           │
│                             30–40% VALUE REALIZATION                              │
└───────────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│                                AGROPRICE AI GATE                                   │
├───────────────────────────────────────────────────────────────────────────────────┤
│   Predictive Forecast  +  Multi-Mandi Discovery  +  Net Profit Optimization        │
│                                        =                                           │
│                             75–85% VALUE REALIZATION                              │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Real-World Farmer Problems

| # | Problem | Impact |
|---|---|---|
| 1 | **No live market visibility** | Prices vary up to 25% between mandis within a 50 km radius |
| 2 | **Trader dependence** | Local commission agents (*arhtiyas*) offer below-market rates |
| 3 | **Price volatility** | Perishables (tomato, onion) can swing wildly within 24–48 hours |
| 4 | **Opaque logistics costs** | Hidden transport/mandi fees quietly erode expected profit |
| 5 | **No negotiation power** | Without benchmark data, farmers can't counter buyer offers |

### Why Existing Solutions Fall Short

- **Government portals (Agmarknet):** static tables, poor mobile UX, zero personalization or forecasting.
- **Generic price apps:** show raw "today" prices without netting out logistics, weather, or quality differentials.
- **B2B agri-platforms:** optimized for buyers sourcing cheaply, not for farmers maximizing return.

### How AgroPrice AI Solves It

AgroPrice AI shifts the product from **"data display"** to **"actionable recommendation"** by computing a true **Net Realized Profit** for every option:

$$\text{Net Profit} = (\text{Predicted Price} \times \text{Quality Multiplier} \times \text{Quantity}) - \text{Transport Cost} - \text{Mandi Fees} - \text{Storage/Holding Cost}$$

---

## 📈 Business Objectives & KPIs

**Objectives**
1. Increase average farmgate price realization by **12–22%**.
2. Reduce post-harvest distress selling by **35%**.
3. Sustain daily active user (DAU) retention above **60%** during harvest seasons.

**Key Performance Indicators**

| KPI | Definition | Target |
|---|---|---|
| Net Profit Lift (NPL) | Delta between farmer's initial offer and AI-recommended net price | Maximize |
| Recommendation Accuracy | ML predicted price vs. actual realized mandi price | ≤ 4.5% MAPE |
| Decision Conversion Rate | % of users who act on the AI recommendation | Track & improve |
| API Latency | End-to-end recommendation response time | < 800 ms |

---

## 🔄 Farmer Decision Journey

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  1. Select     │     │  2. Enter      │     │  3. Enter      │     │  4. Optional   │
│     Crop       │ ──► │     Quantity   │ ──► │     Quality    │ ──► │  Trader Offer  │
│  (e.g., Wheat) │     │  (e.g., 50 Qtl)│     │  (Grade A/B/C) │     │  & Expected ₹  │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
                                                                              │
                                                                              ▼
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  8. Farmer     │     │  7. Gemini AI  │     │  6. ML Price   │     │  5. Fetch Live │
│     Executes   │ ◄── │     Reasoning  │ ◄── │     Prediction │ ◄── │  Mandi, Route, │
│     Decision   │     │  & Insights    │     │     (7-Day)    │     │     Weather    │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
```

---

## 👥 User Personas

| Persona | Profile | Goal |
|---|---|---|
| **Ramesh Kumar** — Smallholder Farmer | 2 acres, Sehore (MP) · Soyabean, Wheat · moderate tech literacy (WhatsApp, Hindi-first) | Know if a ₹4,200/Qtl village-gate offer beats taking the crop to Bhopal Mandi |
| **Vikram Singh** — Progressive Medium Farmer | 12 acres, Nashik (MH) · Tomato, Onion · high tech literacy | 7-day price forecasts to time harvest and negotiate with wholesale traders |
| **Suresh Patel** — Agri-Trader / Aggregator | Buys from 50+ village farmers | Real-time regional mandi spread analysis to arbitrate prices across state lines |

---

## 🧩 Product Modules

| # | Module | Purpose | Key Features |
|---|---|---|---|
| 1 | **Authentication & Identity** | Frictionless login for rural users | Phone OTP, Google Auth, JWT rotation, 7-language selector |
| 2 | **Farmer Profile & Land Onboarding** | Capture farm context for personalization | GPS auto-capture, land size, storage capacity, primary crops |
| 3 | **Real-Time Dashboard** | Daily market pulse & selling signal | "Today's Selling Signal", top-5 mandi ticker, weather alerts |
| 4 | **Sell Crop Decision Module** | Core input → recommendation pipeline | Crop wizard, unit converter, quality grading, trader-offer input |
| 5 | **Nearby Mandi Discovery & Route Engine** | Locate & rank mandis in radius (25–200 km) | GeoJSON spatial query, toll estimation, transport rate/km |
| 6 | **Multi-Mandi Price Comparison** | Net profit across 5+ mandis | Gross vs. net toggle, full cost itemization |
| 7 | **AI Recommendation Engine** | Natural-language action guidance (Gemini 1.5 Pro) | `SELL_NOW` / `HOLD_X_DAYS` / `SWITCH_MANDI` / `ACCEPT_TRADER`, confidence score |
| 8 | **AI Negotiation Assistant** | Counter-offer support vs. traders | Target counter-price calculator, Hindi negotiation scripts |
| 9 | **Historical Sales & Analytics** | Track decisions over time | Realized vs. predicted profit, seasonal performance |
| 10 | **AgroBot (AI Chatbot)** | Conversational Q&A on prices/schemes/weather | Voice-to-text, multilingual, grounded retrieval |
| 11 | **Notification System** | Proactive alerts | Push (FCM), SMS, WhatsApp Business API |
| 12 | **Settings & Localization** | System customization | Language, units, offline sync |
| 13 | **Admin & Market Intelligence Panel** | Platform ops | ML metrics, Agmarknet sync status, manual overrides |

---

## 🖥️ Screen Architecture

| Screen | Name | Key Components | Business Rules |
|---|---|---|---|
| `SCR-01` | Auth / OTP Login | Phone input, OTP card, language selector | 10-digit Indian phone regex; 60s OTP cooldown |
| `SCR-02` | Onboarding Wizard | Geo-picker, crop multiselect, vehicle toggle | Requires ≥1 primary crop + state/district |
| `SCR-03` | Main Dashboard | Recommendation card, mandi carousel, trend chart | Offline cache fallback; refresh every 30 min |
| `SCR-04` | Sell Crop Entry | Crop → Quantity → Quality → Trader Offer | Quantity > 0; moisture 0–50% |
| `SCR-05` | Decision Result | Comparison table, Gemini insight box | Net profit spread < ₹20/Qtl → default to nearest mandi |
| `SCR-06` | Nearby Mandis Map | Map view, mandi cards, filter drawer | Radius 10–300 km; GeoJSON spatial index |
| `SCR-07` | Price Comparison | Mandi matrix, cost breakdown modal | State-specific mandi tax (1–2.5%) applied dynamically |
| `SCR-08` | AI Negotiator | Trader offer input, counter-offer output | Counter price capped at 95th percentile market price |
| `SCR-09` | Analytics & History | Profit-lift chart, past sales list | Shows historical accuracy vs. actual settlement |
| `SCR-10` | AI Chat (AgroBot) | Voice input, message thread, quick chips | Gemini response streamed via SSE |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, Framer Motion |
| Backend | Node.js, Express, Mongoose |
| ML Service | Python, FastAPI, XGBoost, LightGBM, Prophet / Bi-LSTM |
| Database & Cache | MongoDB Atlas, Redis |
| AI Reasoning | Google Gemini 1.5 Pro |
| Infra | Docker, Docker Compose, Nginx, Hetzner Cloud, GitHub Actions |
| Observability | Winston, Structlog, Prometheus, Grafana Loki, Sentry |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x and npm/yarn
- Python ≥ 3.10
- MongoDB Atlas connection string
- Redis instance (local or cloud)
- API keys: Google Gemini, Agmarknet/data.gov.in, OpenWeatherMap

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/agroprice-ai.git
cd agroprice-ai

# 2. Backend setup
cd backend
npm install
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, REDIS_URL, GEMINI_API_KEY
npm run dev

# 3. Frontend setup
cd ../frontend
npm install
cp .env.example .env      # fill in VITE_API_BASE_URL
npm run dev

# 4. ML service setup
cd ../ml_service
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Docker (all services)

```bash
docker-compose up --build
```

The frontend will be available at `http://localhost:5173`, the backend API at `http://localhost:5000`, and the ML service at `http://localhost:8000`.

---

## 🎨 Frontend Architecture

**Stack:** React 18 + Vite · Tailwind CSS + CSS Modules · shadcn/ui (Radix primitives) · React Router v6 · Zustand (UI/auth state) + TanStack Query v5 (server state) · Framer Motion.

```
frontend/
├── src/
│   ├── assets/              # SVGs, images, fonts
│   ├── components/
│   │   ├── ui/               # shadcn primitives (Button, Card, Modal)
│   │   ├── common/            # Navbar, Sidebar, Footer, Spinners
│   │   └── charts/            # Recharts wrappers for price series
│   ├── features/
│   │   ├── auth/               # Login, OTP, Auth context
│   │   ├── dashboard/          # Widgets, tickers
│   │   ├── sell/                # Decision wizard steps
│   │   ├── mandis/              # Map, comparison matrix
│   │   ├── ai-chat/             # AgroBot chat UI, voice handler
│   │   └── analytics/           # Profit charts, history tables
│   ├── hooks/                 # useGeolocation, useMandiPrices, ...
│   ├── services/              # Axios API client & endpoints
│   ├── store/                  # Zustand stores
│   ├── utils/                  # Calculators, formatters, unit parsing
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── tailwind.config.js
```

**Design tokens:**
```css
:root {
  --primary-green: #15803d;     /* Deep agricultural green */
  --primary-hover: #166534;
  --accent-gold: #d97706;       /* Harvest amber */
  --surface-dark: #0f172a;      /* Dark slate surface */
  --background-light: #f8fafc;
  --text-main: #1e293b;
  --status-success: #22c55e;
  --status-warning: #eab308;
  --status-danger: #ef4444;
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

---

## 🏗️ Backend Architecture

A strict **layered (hexagonal) architecture** decouples HTTP handlers, domain logic, and persistence:

```
┌─────────────────────────────────────────────────────────┐
│  API Layer            Express routes, controllers        │
├─────────────────────────────────────────────────────────┤
│  Business Layer       Recommendation engine, ML client    │
├─────────────────────────────────────────────────────────┤
│  Service Layer        Agmarknet sync, transport calc,     │
│                        Gemini AI                          │
├─────────────────────────────────────────────────────────┤
│  Repository Layer     Mongoose models, Redis cache access │
├─────────────────────────────────────────────────────────┤
│  Database Layer       MongoDB Atlas, Redis cluster        │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### `users`
```json
{
  "_id": "ObjectId",
  "phone": "+919876543210",
  "name": "Ramesh Kumar",
  "role": "FARMER",
  "language": "hi",
  "location": {
    "type": "Point",
    "coordinates": [77.0589, 23.2420],
    "state": "Madhya Pradesh",
    "district": "Sehore",
    "tehsil": "Ashta",
    "village": "Kothri"
  },
  "farmDetails": {
    "landSizeAcres": 4.5,
    "primaryCrops": ["Wheat", "Soyabean"],
    "hasStorage": true,
    "storageCapacityQuintals": 100
  },
  "isVerified": true,
  "createdAt": "2026-01-15T10:00:00.000Z",
  "updatedAt": "2026-07-24T12:00:00.000Z"
}
```
**Indexes:** `{ phone: 1 }` (unique) · `{ location: "2dsphere" }`

### `mandis`
```json
{
  "_id": "ObjectId",
  "mandiCode": "MP_SEH_001",
  "name": "Sehore Main Mandi",
  "state": "Madhya Pradesh",
  "district": "Sehore",
  "location": { "type": "Point", "coordinates": [77.0850, 23.2025] },
  "operatingDays": ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
  "mandiCessPercentage": 1.5,
  "facilities": ["Cold Storage", "Weigh Bridge", "Electronic Auction"],
  "contactPhone": "+917562223344"
}
```
**Indexes:** `{ mandiCode: 1 }` (unique) · `{ location: "2dsphere" }` (enables `$near`, `$geoWithin`)

### `mandi_prices`
```json
{
  "_id": "ObjectId",
  "mandiId": "ObjectId(mandis)",
  "mandiCode": "MP_SEH_001",
  "crop": "Wheat",
  "variety": "Lokwan",
  "grade": "FAQ",
  "minPrice": 2200,
  "maxPrice": 2480,
  "modalPrice": 2400,
  "arrivalQuantityQuintals": 1450,
  "priceDate": "2026-07-24T00:00:00.000Z",
  "rawSource": "AGMARKNET",
  "createdAt": "2026-07-24T06:30:00.000Z"
}
```
**Indexes:** `{ crop: 1, mandiCode: 1, priceDate: -1 }` (compound) · `{ priceDate: -1 }` (TTL-eligible for archiving)

### `price_predictions`
```json
{
  "_id": "ObjectId",
  "crop": "Wheat",
  "district": "Sehore",
  "forecastDate": "2026-07-24T00:00:00.000Z",
  "predictions": [
    { "dayOffset": 1, "date": "2026-07-25", "predictedPrice": 2425, "confidenceLower": 2390, "confidenceUpper": 2460 },
    { "dayOffset": 2, "date": "2026-07-26", "predictedPrice": 2460, "confidenceLower": 2420, "confidenceUpper": 2500 },
    { "dayOffset": 3, "date": "2026-07-27", "predictedPrice": 2490, "confidenceLower": 2440, "confidenceUpper": 2530 }
  ],
  "modelMeta": { "modelName": "XGBoost_v2.4", "mape": 3.2, "trainedOn": "2026-07-20T00:00:00.000Z" }
}
```
**Indexes:** `{ crop: 1, district: 1, forecastDate: -1 }`

### `sell_decisions`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId(users)",
  "crop": "Wheat",
  "quantityQuintals": 50,
  "qualityGrade": "Grade_A",
  "userExpectedPrice": 2500,
  "traderOffer": 2350,
  "userLocation": { "type": "Point", "coordinates": [77.0589, 23.2420] },
  "recommendation": {
    "action": "HOLD_AND_SELL_LATER",
    "recommendedMandiId": "ObjectId(mandis)",
    "targetDate": "2026-07-27",
    "expectedNetPricePerQtl": 2440,
    "expectedTotalNetProfit": 122000,
    "decisionScore": 88.5,
    "confidenceScore": 91.0,
    "reasoning": "Prices expected to rise by ₹90/Qtl over the next 3 days due to lower arrivals; storage cost is minimal."
  },
  "executed": false,
  "createdAt": "2026-07-24T11:20:00.000Z"
}
```
**Indexes:** `{ userId: 1, createdAt: -1 }`

---

## 📡 REST API Reference

**Base URL:** `https://api.agroprice.ai/v1`

### `POST /auth/request-otp`
```json
// Request
{ "phone": "+919876543210" }
```
```json
// 200 OK
{ "success": true, "message": "OTP sent successfully", "requestId": "req_otp_99238423" }
```
Errors: `400 Invalid Phone Number` · `429 Too Many Requests`

### `POST /decision/recommend`
_Auth: `Bearer <JWT_ACCESS_TOKEN>`_
```json
// Request
{
  "crop": "Tomato",
  "quantityQuintals": 25,
  "qualityGrade": "Grade_A",
  "moisturePercentage": 12.5,
  "traderOffer": 1700,
  "expectedPrice": 2200,
  "coordinates": [77.0589, 23.2420],
  "maxDistanceKm": 100
}
```
```json
// 200 OK
{
  "success": true,
  "data": {
    "decisionId": "dec_883920192",
    "recommendation": {
      "action": "SWITCH_MANDI",
      "actionLabel": "Sell Tomorrow in Ramganj Mandi",
      "badgeColor": "GREEN",
      "targetMandi": { "mandiId": "60d5ecb8b392a911", "name": "Ramganj Mandi", "distanceKm": 34.2 },
      "economics": {
        "grossPricePerQtl": 2100,
        "transportCostPerQtl": 110,
        "mandiCessPerQtl": 31.5,
        "netPricePerQtl": 1958.5,
        "totalNetProfit": 48962.5,
        "traderOfferNetProfit": 42500.0,
        "netProfitDifference": 6462.5
      },
      "scores": { "decisionScore": 92.4, "confidenceScore": 89.0, "riskLevel": "LOW" },
      "aiReasoningSummary": "Ramganj mandi offers ₹400/Qtl more than your local trader. Even after ₹110/Qtl transport, you net ₹6,462 extra."
    }
  }
}
```
Errors: `401 Unauthorized` · `422 Unprocessable Entity` (invalid coordinates/crop)

### `GET /market/prices?crop=Wheat&district=Sehore&limit=10`
_Auth: `Bearer <JWT_ACCESS_TOKEN>`_
```json
// 200 OK
{
  "success": true,
  "count": 2,
  "data": [
    {
      "mandiName": "Sehore Main Mandi",
      "modalPrice": 2400,
      "minPrice": 2200,
      "maxPrice": 2480,
      "arrivalQuantity": 1450,
      "updatedAt": "2026-07-24T06:30:00.000Z"
    }
  ]
}
```

---

## 🌾 Government Data Pipeline

Integrates with the official **Agmarknet API** (`data.gov.in`) and State Agricultural Marketing Boards.

```
┌──────────────────────────────────────────────────────────┐
│                   Agmarknet API / Portal                 │
└────────────────────────────┬─────────────────────────────┘
                             │  Cron: every 30 minutes
                             ▼
┌──────────────────────────────────────────────────────────┐
│               Node.js Data Ingestion Worker               │
│   Validates payload · normalizes crop names (e.g.         │
│   "Tomato" vs. "Tamatar") · standardizes units (₹/Qtl)     │
└────────────────────────────┬─────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
  ┌───────────────────────┐        ┌───────────────────────┐
  │      Redis Cache       │        │  MongoDB Price Store  │
  │   (TTL: 1800 seconds)  │        │ (historical storage)  │
  └───────────────────────┘        └───────────────────────┘
```

**Resiliency:**
- **Circuit breaker:** falls back to secondary state portals (e.g., MP Farm Gate API) if `data.gov.in` is down.
- **Stale-data guard:** if a mandi reports no new prices for 24 hours, it's flagged `UNVERIFIED_STALE` and prediction uncertainty intervals widen automatically.

---

## 🤖 Machine Learning Pipeline

Forecasts commodity prices 1–7 days out.

```
Raw Data Ingestion ──► Feature Engineering ──► Model Inference (XGBoost) ──► Confidence Post-Processing
```

**Dataset & features**
- 10 years of daily mandi prices across 3,000+ mandis
- Temporal: day of week, month, harvest seasonality index
- Weather: rain anomaly (mm), min/max temperature, relative humidity
- Macro: diesel price index, transport inflation factor
- Arrivals: lagged 1-day, 3-day, and 7-day arrival quantities (Qtl)

**Feature matrix**

$$Y_{t+k} = f(\text{Price}_{t}, \text{Price}_{t-1}, \dots, \text{Arrival}_{t}, \text{Rainfall}_{t}, \text{Month}, \text{District})$$

**Model architecture**
- Primary: **XGBoost Regressor + LightGBM** ensemble
- Long-horizon fallback: **Prophet / Bi-LSTM** for 30-day macro trends
- Evaluation: MAPE, target **< 4.5%**

---

## 🧠 Gemini AI Integration

Google Gemini 1.5 Pro is the cognitive reasoning layer: while XGBoost provides raw price predictions and rule-based engines compute logistics costs, Gemini synthesizes both into a human-readable, dialect-aware recommendation.

```
SYSTEM PROMPT:
You are an expert Agricultural Economist and Farmer Advisor for AgroPrice AI.
Analyze the structured JSON containing live prices, predictions, weather,
transport costs, and trader offers. Produce a multilingual recommendation
that is empathetic, direct, concise, and persuasive.

INPUT:
{
  "farmerName": "Ramesh Kumar",
  "crop": "Tomato",
  "quantity": "25 Quintals",
  "traderOffer": 1700,
  "localMandiPriceToday": 1800,
  "bestMandi": { "name": "Ramganj Mandi", "modalPriceToday": 2100, "distanceKm": 34 },
  "predictionTomorrow": { "expectedPrice": 2150, "trend": "RISING" },
  "weatherForecast": "Light rain expected tomorrow evening",
  "transportCostTotal": 2750
}

OUTPUT:
1. Recommended action (SELL_NOW | HOLD | SWITCH_MANDI | NEGOTIATE)
2. Net financial benefit in INR
3. 3-bullet reasoning in plain language
4. Trader negotiation script
```

---

## 📊 Recommendation Scoring Engine

Every candidate selling pathway gets a **Decision Score** ($S_{\text{decision}} \in [0, 100]$):

$$S_{\text{decision}} = w_1 \cdot P_{\text{net\_norm}} + w_2 \cdot C_{\text{model}} - w_3 \cdot R_{\text{weather}} - w_4 \cdot D_{\text{logistics}}$$

| Term | Meaning | Weight |
|---|---|---|
| $P_{\text{net\_norm}}$ | Normalized net profit vs. baseline trader offer | $w_1 = 0.50$ |
| $C_{\text{model}}$ | ML prediction confidence (0.0–1.0) | $w_2 = 0.25$ |
| $R_{\text{weather}}$ | Adverse-weather transport risk penalty (0–20 pts) | $w_3 = 0.15$ |
| $D_{\text{logistics}}$ | Perishable travel-time/distance risk penalty | $w_4 = 0.10$ |

---

## 🧮 Domain Calculation Engines

**Transport Cost Engine**
$$\text{Cost} = \text{Base Fare} + (\text{Distance}_{km} \times \text{Rate/km}) + (\text{Quantity}_{Qtl} \times \text{Handling Fee/Qtl})$$
Vehicle profiles: Auto Loader (≤15 Qtl) · Pickup Truck (≤35 Qtl) · Tractor Trolley (≤100 Qtl) · 6-Tyre Truck (>100 Qtl)

**Weather Engine**
Integrates OpenWeatherMap for 48-hour precipitation risk affecting open-bed transport and post-harvest moisture damage.

**Profit Calculator**
$$\text{Net Cash} = (\text{Quantity} \times \text{Mandi Price}) - \text{Freight} - \text{Mandi Cess} - \text{Loading} - \text{Unloading}$$

---

## 🔒 Security & Compliance

- **AuthN:** RS256-signed JWTs — 15-minute access tokens, HTTP-only encrypted refresh cookies.
- **Rate limiting:** 100 requests / 15 min per IP; 5 OTP requests / hour per phone number (Redis-backed).
- **Encryption:** AES-256 at rest (MongoDB Atlas); TLS 1.3 in transit for all service communication.
- **Validation:** strict schema enforcement (Joi/Zod) on every controller endpoint.
- **Headers:** Helmet.js enforces CSP, HSTS, and `X-Frame-Options: DENY`.

---

## ⚡ Performance & Scalability

- **Redis caching:** mandi-price queries cached with a 30-minute TTL; geo-proximity results cached per district.
- **Frontend code-splitting:** route-based lazy loading (`React.lazy` + Suspense) keeps the initial bundle under ~180 KB.
- **Database indexing:** the `{ crop, mandiCode, priceDate }` compound index cuts query time from ~450 ms to under 12 ms.
- **Images:** served as WebP with responsive `srcset`.

---

## 🐳 DevOps & Deployment

```
GitHub Repository
      │  git push → main
      ▼
GitHub Actions CI/CD
  • ESLint + Jest
  • Build Docker images
  • Push to Docker Hub
      │  SSH deploy script
      ▼
Hetzner Cloud Server
  • Nginx reverse proxy
  • Docker Compose (frontend + backend + ML service)
```

**Containers:** `frontend` (Nginx serving the Vite build) · `backend` (clustered Node/Express API) · `ml_service` (FastAPI + XGBoost inference) · `redis` (in-memory cache).

---

## 📊 Observability & Monitoring

- **Logging:** structured JSON via Winston (Node) and Structlog (Python), aggregated in Grafana Loki.
- **Metrics:** Prometheus endpoint for HTTP latency, DB pool utilization, and prediction latency.
- **Error tracking:** Sentry across frontend and backend.
- **Health checks:** `/healthz` reports DB, Redis, and ML-service status.

---

## 🧪 Testing Strategy

| Layer | Tooling |
|---|---|
| Frontend | Vitest + React Testing Library (unit/component) · Playwright (E2E) |
| Backend | Jest + Supertest against `mongodb-memory-server` |
| ML | 12-month rolling backtests bounding MAPE |
| Security | OWASP ZAP scans wired into CI/CD |

---

## 🗺️ Product Roadmap

```
v1.0 (Current)
  • Live Agmarknet price ingestion
  • 7-day XGBoost price forecasting
  • Multi-mandi net profit calculator
  • Gemini AI recommendations (Hindi/English)

v2.0 (Q4 2026)
  • Voice-first interaction in 6 Indian languages
  • Shared logistics / truck-pooling marketplace
  • WhatsApp bot for instant recommendations

v3.0 / Enterprise (2027)
  • B2B procurement portal for bulk grain buyers
  • Credit-risk & yield-scoring APIs for agri-banks and insurers
  • Satellite imagery integration for yield estimation
```

---

## 🤝 Contribution Guide & Engineering Standards

**Coding standards**
- JS/React: Airbnb style guide via ESLint + Prettier
- Python (ML service): PEP 8, type-hinted, formatted with `black` + `isort`

**Commit convention** — [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(sell-module): add moisture percentage input step
fix(mandi-sync): resolve agmarknet API parser null pointer
docs(readme): expand architecture and database schemas
```

**Pull requests**
1. Reference an open issue.
2. All CI checks (lint, unit tests, build) must pass.
3. Requires review approval from at least one Principal/Staff engineer.

---

## 📁 Repository Structure

```
agroprice-ai/
├── .github/workflows/
│   ├── ci-cd.yml               # Build, test, deploy pipeline
│   └── lint.yml                # Style checks
├── backend/                     # Node.js + Express API
│   ├── src/
│   │   ├── config/               # DB, Redis, env vars
│   │   ├── controllers/          # HTTP route handlers
│   │   ├── middleware/           # Auth, rate limiting, error handling
│   │   ├── models/                # Mongoose schemas
│   │   ├── repositories/          # Data access objects
│   │   ├── routes/                # Express routers
│   │   ├── services/              # Business logic, Agmarknet sync, Gemini
│   │   └── utils/                 # Helpers, calculators, logger
│   ├── tests/                    # Jest + Supertest
│   └── Dockerfile
├── frontend/                    # React + Vite client
│   ├── src/
│   │   ├── assets/ components/ features/ hooks/ services/ store/ utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── Dockerfile
├── ml_service/                  # Python FastAPI ML service
│   ├── app/
│   │   ├── api/                   # Inference routes
│   │   ├── core/                  # Model loading & config
│   │   ├── models/                 # Saved XGBoost/LightGBM binaries
│   │   ├── pipelines/              # Feature engineering
│   │   └── main.py
│   ├── tests/
│   └── Dockerfile
├── docs/
│   └── 00_PROJECT_MASTER_DOCUMENTATION.md
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">

**Maintained by the AgroPrice AI Core Engineering Team** 🌱

</div>
