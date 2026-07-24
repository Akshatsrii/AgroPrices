# AgroPrice AI: AI-Powered Agricultural Decision Intelligence Platform

> **"What should the farmer do today to maximize profit?"**

---

## 📌 Executive Summary

**AgroPrice AI** is an enterprise-grade **Agricultural Decision Intelligence Platform** designed to solve the structural information asymmetry and economic loss faced by agricultural producers. Unlike traditional crop monitoring apps or static mandi price listing dashboards, AgroPrice AI operates as an actionable, real-time decision engine.

By synthesizing **live government mandi prices (Agmarknet)**, **historical commodity price series**, **ensemble machine learning models (XGBoost / LightGBM)**, **hyper-local weather feeds**, **dynamic logistical route estimation**, and **Google Gemini 1.5 Pro cognitive reasoning**, the platform delivers personalized, risk-adjusted, and highly profitable selling recommendations directly to farmers.

---

## 📋 Table of Contents

1. [Cover Page & Executive Summary](#-executive-summary)
2. [Introduction & Product Vision](#-introduction--product-vision)
3. [Product Philosophy & Problem Statement](#-product-philosophy--problem-statement)
4. [Business Objectives & Success Metrics](#-business-objectives--success-metrics)
5. [System Workflow & Farmer Decision Journey](#-system-workflow--farmer-decision-journey)
6. [User Personas & Requirements](#-user-personas--requirements)
7. [Product Modules (Deep Dive)](#-product-modules-deep-dive)
8. [Screen-by-Screen Architecture](#-screen-by-screen-architecture)
9. [Frontend Architecture](#-frontend-architecture)
10. [Backend & Layered Architecture](#-backend--layered-architecture)
11. [MongoDB Schema & Database Architecture](#-mongodb-schema--database-architecture)
12. [REST API Documentation](#-rest-api-documentation)
13. [Government Data Integration & Scheduling Pipeline](#-government-data-integration--scheduling-pipeline)
14. [Machine Learning Pipeline & Price Forecasting](#-machine-learning-pipeline--price-forecasting)
15. [Google Gemini AI Integration & Prompt Engineering](#-google-gemini-ai-integration--prompt-engineering)
16. [Recommendation Engine & Scoring Architecture](#-recommendation-engine--scoring-architecture)
17. [Domain Calculation Engines](#-domain-calculation-engines)
18. [Security, AuthN/AuthZ & Compliance](#-security-authnauthz--compliance)
19. [Performance Optimization & Scalability](#-performance-optimization--scalability)
20. [DevOps, CI/CD & Deployment Architecture](#-devops-cicd--deployment-architecture)
21. [Observability, Monitoring & Logging](#-observability-monitoring--logging)
22. [Testing & Quality Assurance Strategy](#-testing--quality-assurance-strategy)
23. [Product Roadmap](#-product-roadmap)
24. [Contribution Guide & Engineering Standards](#-contribution-guide--engineering-standards)
25. [Complete Repository Folder Breakdown](#-complete-repository-folder-breakdown)
26. [Conclusion](#-conclusion)

---

## 🎯 Introduction & Product Vision

### Product Vision
To empower every agricultural producer with enterprise-class market intelligence, cognitive AI decision support, and transparent price discovery—eliminating distress selling and maximizing farmgate profitability.

### Mission
To bridge the digital and economic divide in agriculture by building an intuitive, multi-lingual, decision-first intelligence platform that converts complex market dynamics, weather patterns, logistical overheads, and price trends into simple, high-confidence selling instructions.

---

## 🧠 Product Philosophy & Problem Statement

### Why This Project Exists
Agriculture accounts for over 16% of India's GDP and employs nearly half of the workforce, yet smallholder farmers capture less than 30-40% of the final consumer value of their produce. Information asymmetry at the farm gate forces farmers into distress selling.

```
+-----------------------------------------------------------------------------------+
|                              TRADITIONAL FARM GATE                                |
+-----------------------------------------------------------------------------------+
|  No Future Visibility  +  Village Trader Monopoly  +  Hidden Transport/Commission  |
|                                         =                                         |
|                             30-40% VALUE REALIZATION                              |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                                AGROPRICE AI GATE                                  |
+-----------------------------------------------------------------------------------+
|  Predictive Forecast  +  Multi-Mandi Discovery  +  Net Net Profit Optimization    |
|                                         =                                         |
|                             75-85% VALUE REALIZATION                              |
+-----------------------------------------------------------------------------------+
```

### Real-World Farmer Problems
1. **Lack of Live Market Information**: Prices vary up to 25% between mandis within a 50 km radius, but farmers lack real-time visibility.
2. **Trader Dependence**: Farmers rely on local *arhtiyas* (commission agents) or village middlemen who offer below-market prices.
3. **Price Volatility**: Perishable crops (e.g., tomatoes, onions) experience wild price swings within 24–48 hours.
4. **Opaque Transport & Commission Costs**: High transport rates or hidden mandi fees erode expected profits.
5. **No Negotiation Power**: Without verified benchmark data, farmers cannot negotiate effectively with buyers.

### Why Existing Solutions Fail
- **Government Portals (Agmarknet)**: Static tabular data, difficult mobile UI, no predictive capabilities, no personalization.
- **Generic Price Apps**: Show raw today prices without deducting logistics, weather impacts, or quality differentials.
- **E-Commerce / B2B Agri Platforms**: Focus on purchasing crops at low prices rather than empowering the farmer to choose the best venue.

### How AgroPrice AI Solves Them
AgroPrice AI shifts the focus from **"Data Display"** to **"Actionable Recommendation"**. It calculates **Net Realized Profit**:

$$\text{Net Profit} = (\text{Predicted Price} \times \text{Quality Multiplier} \times \text{Quantity}) - \text{Transport Cost} - \text{Mandi Fees} - \text{Storage/Holding Cost}$$

---

## 📈 Business Objectives & Success Metrics

### Business Objectives
1. Increase average farmgate price realization by **12% to 22%**.
2. Reduce post-harvest distress selling by **35%**.
3. Drive daily active user (DAU) retention above **60%** during harvest seasons.

### Key Performance Indicators (KPIs)
- **Net Profit Lift (NPL)**: Difference between farmer's initial offer and AI recommended selling price minus transport.
- **Recommendation Accuracy**: Difference between ML predicted price and actual realized mandi price on target date ($\le 4.5\%$ MAPE).
- **Decision Conversion Rate**: Percentage of users who follow the AI recommended selling action.
- **API Latency**: End-to-end recommendation response time $< 800\text{ ms}$.

---

## 🔄 System Workflow & Farmer Decision Journey

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  1. Select     │     │  2. Enter      │     │  3. Enter      │     │ 4. Optional    │
│     Crop       │ ──► │     Quantity   │ ──► │     Quality    │ ──► │    Trader Offer│
│  (e.g., Wheat) │     │  (e.g., 50 Qtl)│     │  (Grade A/B/C) │     │    & Expected  │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
                                                                              │
                                                                              ▼
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  8. Farmer     │     │  7. Gemini AI  │     │  6. ML Price   │     │ 5. Fetch Live  │
│     Executes   │ ◄── │     Reasoning  │ ◄── │     Prediction │ ◄── │    Mandi, Route│
│     Decision   │     │  & Insights    │     │     (7-Day)    │     │    & Weather   │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
```

---

## 👥 User Personas & Requirements

### Personas

#### 1. Ramesh Kumar (Smallholder Farmer)
- **Land**: 2 Acres in Sehore, Madhya Pradesh.
- **Crop**: Soyabean, Wheat.
- **Tech Literacy**: Moderate (WhatsApp user, prefers Voice/Hindi).
- **Goal**: Wants to know if selling at the village gate for ₹4,200/Qtl is a loss compared to taking it to Bhopal Mandi.

#### 2. Vikram Singh (Progressive Medium Farmer)
- **Land**: 12 Acres in Nashik, Maharashtra.
- **Crop**: Tomato, Onion.
- **Tech Literacy**: High. Uses smartphones for agricultural tools.
- **Goal**: Wants 7-day price forecasts to time harvests and negotiate with wholesale traders.

#### 3. Suresh Patel (Agri-Trader / Aggregator)
- **Operation**: Local aggregator purchasing from 50+ village farmers.
- **Goal**: Needs real-time regional mandi spread analysis to arbitrate prices across state borders.

---

## 🧩 Product Modules (Deep Dive)

### 1. Authentication & Identity Management
- **Purpose**: Secure, friction-free login optimized for rural users via Phone OTP and Social Login.
- **Features**: Phone number + OTP, Google Auth, JWT access/refresh token rotation, Language preference select (English, Hindi, Marathi, Gujarati, Punjabi, Telugu, Tamil).
- **User Flow**: Enter Phone $\rightarrow$ Receive SMS OTP $\rightarrow$ Auto-verify $\rightarrow$ Select preferred language $\rightarrow$ Redirect to Onboarding / Dashboard.
- **Business Logic**: Unregistered phone numbers automatically trigger the onboarding flow. Tokens expire in 15 days (refresh token) and 15 mins (access token).

### 2. Farmer Profile & Land Onboarding
- **Purpose**: Collect farm location, crop history, and storage capacities for hyper-personalized recommendations.
- **Features**: GPS Location auto-capture, Manual District/Tehsil pick, Land size (Acres/Bigha), Storage availability (Yes/No, capacity), Primary crops cultivated.
- **User Flow**: Set Location $\rightarrow$ Select Primary Crops $\rightarrow$ Configure Vehicles/Transport access $\rightarrow$ Finish Profile.

### 3. Real-Time Dashboard
- **Purpose**: Central command center providing instant market pulses and daily selling signals.
- **Features**: "Today's Selling Signal" widget, Top 5 Nearby Mandi tickers, 7-day trend highlights, Weather alerts, Quick-action "Sell My Crop" trigger.
- **User Flow**: User lands on Dashboard $\rightarrow$ Sees top recommendation badge $\rightarrow$ Clicks badge to view deep analysis or clicks "Sell Crop".

### 4. Sell Crop Decision Module
- **Purpose**: The core decision pipeline where inputs are converted into profit-maximized selling strategies.
- **Features**: Crop selection wizard, Quantity/Unit converter (Quintal, KG, Ton, Bag), Quality grading input (Moisture %, Grade A/B/C), Village Trader offer input, Storage timeline selector.

### 5. Nearby Mandi Discovery & Route Engine
- **Purpose**: Locate, rank, and map mandis within a configurable radius ($25\text{ km} - 200\text{ km}$).
- **Features**: GeoJSON spatial query, distance calculation, road toll estimation, transport rate per km/quintal, mandi arrival volume indicator.

### 6. Multi-Mandi Price Comparison Engine
- **Purpose**: Side-by-side comparison of net profit across 5+ mandis taking into account all overheads.
- **Features**: Gross vs Net price toggle, Cost itemization breakdown (Freight, Loading, Mandi Cess, Agent Commission, Unloading).

### 7. AI Recommendation & Cognitive Engine
- **Purpose**: Generate high-confidence, natural-language actionable instructions using Gemini 1.5 Pro.
- **Features**: Action badge (`SELL_NOW`, `HOLD_X_DAYS`, `SWITCH_MANDI`, `ACCEPT_TRADER`), Net Profit forecast, Confidence score (0-100%), Risk factors, Actionable reasoning summary.

### 8. AI Negotiation Assistant
- **Purpose**: Equip farmers with script-based and chat-based counter-offers against aggressive traders.
- **Features**: "Negotiate with Trader" modal, target counter-price calculator, bulletproof talking points, Hindi script generation.

### 9. Historical Sales & Analytics
- **Purpose**: Track past selling decisions, realized vs predicted profits, and seasonal performance.
- **Features**: Revenue trends, cumulative profit lift tracker, decision success rate chart.

### 10. AI Agricultural Chatbot (AgroBot)
- **Purpose**: Conversational assistant for voice and text inquiries about prices, schemes, and weather.
- **Features**: Voice-to-text input, multi-lingual support, grounded retrieval from live mandi DB and weather APIs.

### 11. Notification System
- **Purpose**: Proactive alerts for price spikes, adverse weather, or target price thresholds.
- **Features**: Push notifications (Web Push / FCM), SMS alerts, WhatsApp Business API integration.

### 12. Settings & Localization
- **Purpose**: System customization, language switching, unit adjustments, and offline data sync management.

### 13. Admin & Market Intelligence Panel
- **Purpose**: Platform health, ML model metrics, Agmarknet sync status, user management, and manual override controls.

---

## 🖥️ Screen-by-Screen Architecture

| Screen ID | Screen Name | Key Components | Primary Actions | Business Rules & Validation |
|---|---|---|---|---|
| `SCR-01` | Auth / OTP Login | Phone input, OTP card, Language pill selector | Send OTP, Verify OTP, Resend | 10-digit Indian phone regex; 60s OTP cooldown timer |
| `SCR-02` | Onboarding Wizard | Geo-location picker, Crop multiselect, Vehicle toggle | Save Profile, Skip | Must select at least 1 primary crop and state/district |
| `SCR-03` | Main Dashboard | Hero Recommendation Card, Mandi Carousel, Trend Chart | Navigate to Sell, View Mandi | Render cached recommendation if offline; update every 30m |
| `SCR-04` | Sell Crop Entry | Step form: Crop, Quantity, Quality, Trader Offer | Next Step, Calculate Profit | Quantity $> 0$; Moisture % between $0\%$ and $50\%$ |
| `SCR-05` | Decision Result | Comparison Table, Gemini AI Insight Box, Action Buttons | Execute Decision, Save, Share | If Net Profit Spread $< \text{₹20/Qtl}$, default to closest mandi |
| `SCR-06` | Nearby Mandis Map | Leaflet/Mapbox Map, Mandi Cards, Filter Drawer | Filter Radius, Get Directions | Radius bounds $10\text{ km} - 300\text{ km}$; GeoJSON spatial index query |
| `SCR-07` | Price Comparison | Side-by-side Mandi Matrix, Cost Breakdown Modal | Export PDF, Sort by Net Profit | Deduct state-specific Mandi Tax ($1\% - 2.5\%$) dynamically |
| `SCR-08` | AI Negotiator | Trader Offer Input, Counter Offer Output, Script Cards | Copy Script, Recalculate | Counter-price capped at max 95th percentile market price |
| `SCR-09` | Analytics & History | Profit Lift Bar Chart, Past Sales List | Filter by Date, Export CSV | Display historical accuracy vs actual mandi settlement |
| `SCR-10` | AI Chat (AgroBot) | Voice Mic Button, Message Thread, Quick Chips | Send Prompt, Record Voice | Stream Gemini response via Server-Sent Events (SSE) |

---

## 🎨 Frontend Architecture

### Technology Selection
- **Framework**: React 18 with Vite (Ultra-fast build & HMR).
- **Styling**: Vanilla CSS Modules & Tailwind CSS token system.
- **Component Library**: shadcn/ui (Radix UI primitives).
- **Routing**: React Router v6 (Data loaders, nested routes).
- **State Management**: Zustand (Global UI/Auth state) + TanStack Query v5 (Server state caching & synchronization).
- **Animations**: Framer Motion (Page transitions, micro-interactions).

### Repository Structure (`frontend/`)
```
frontend/
├── src/
│   ├── assets/             # SVGs, static images, fonts
│   ├── components/         # Shared UI atomic elements
│   │   ├── ui/             # shadcn primitives (Button, Card, Modal)
│   │   ├── common/         # Navbar, Sidebar, Footer, LoadingSpinners
│   │   └── charts/         # Recharts wrappers for price series
│   ├── features/           # Feature-based domain modules
│   │   ├── auth/           # Login, OTP, Auth Context
│   │   ├── dashboard/      # Dashboard widgets, tickers
│   │   ├── sell/           # Decision wizard steps
│   │   ├── mandis/         # Mandi map, comparison matrix
│   │   ├── ai-chat/        # AgroBot chat UI, voice handler
│   │   └── analytics/      # Profit charts, history tables
│   ├── hooks/              # Custom hooks (useGeolocation, useMandiPrices)
│   ├── services/           # Axios API client instances & endpoints
│   ├── store/              # Zustand stores (useAuthStore, useSellStore)
│   ├── utils/              # Calculators, formatters, currency/unit parsing
│   ├── App.jsx             # Route definitions & providers
│   └── main.jsx            # Entry point
├── index.html
├── vite.config.js
└── tailwind.config.js
```

### Design System Tokens
```css
:root {
  --primary-green: #15803d;     /* Deep Agricultural Green */
  --primary-hover: #166534;
  --accent-gold: #d97706;      /* Harvest Amber */
  --surface-dark: #0f172a;     /* Dark Slate Surface */
  --background-light: #f8fafc;
  --text-main: #1e293b;
  --status-success: #22c55e;
  --status-warning: #eab308;
  --status-danger: #ef4444;
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

---

## 🏗️ Backend & Layered Architecture

The backend follows a strict **Layered Architecture (Clean/Hexagonal Architecture principles)** ensuring decoupling between HTTP handlers, domain logic, and data persistence layers.

```
┌─────────────────────────────────────────────────────────┐
│                      API Layer                          │
│        (Express Routes, Controllers, Middleware)        │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     Business Layer                      │
│     (Recommendation Engine, Price Predictor Client)     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     Service Layer                       │
│    (Agmarknet Sync, Transport Calculator, Gemini AI)    │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    Repository Layer                     │
│           (Mongoose Models, Redis Cache Access)         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    Database Layer                       │
│             (MongoDB Atlas, Redis Cluster)              │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ MongoDB Schema & Database Architecture

### 1. `users` Collection
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
- **Indexes**:
  - `{ "phone": 1 }` (Unique index for fast authentication lookups).
  - `{ "location": "2dsphere" }` (Spatial index for proximity searches).

---

### 2. `mandis` Collection
```json
{
  "_id": "ObjectId",
  "mandiCode": "MP_SEH_001",
  "name": "Sehore Main Mandi",
  "state": "Madhya Pradesh",
  "district": "Sehore",
  "location": {
    "type": "Point",
    "coordinates": [77.0850, 23.2025]
  },
  "operatingDays": ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
  "mandiCessPercentage": 1.5,
  "facilities": ["Cold Storage", "Weigh Bridge", "Electronic Auction"],
  "contactPhone": "+917562223344"
}
```
- **Indexes**:
  - `{ "mandiCode": 1 }` (Unique).
  - `{ "location": "2dsphere" }` (Enables `$near` and `$geoWithin` queries).

---

### 3. `mandi_prices` Collection
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
- **Indexes**:
  - `{ "crop": 1, "mandiCode": 1, "priceDate": -1 }` (Compound index for rapid price time-series retrieval).
  - `{ "priceDate": -1 }` (TTL index options available for archiving old records).

---

### 4. `price_predictions` Collection
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
  "modelMeta": {
    "modelName": "XGBoost_v2.4",
    "mape": 3.2,
    "trainedOn": "2026-07-20T00:00:00.000Z"
  }
}
```
- **Indexes**:
  - `{ "crop": 1, "district": 1, "forecastDate": -1 }`.

---

### 5. `sell_decisions` Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId(users)",
  "crop": "Wheat",
  "quantityQuintals": 50,
  "qualityGrade": "Grade_A",
  "userExpectedPrice": 2500,
  "traderOffer": 2350,
  "userLocation": {
    "type": "Point",
    "coordinates": [77.0589, 23.2420]
  },
  "recommendation": {
    "action": "HOLD_AND_SELL_LATER",
    "recommendedMandiId": "ObjectId(mandis)",
    "targetDate": "2026-07-27",
    "expectedNetPricePerQtl": 2440,
    "expectedTotalNetProfit": 122000,
    "decisionScore": 88.5,
    "confidenceScore": 91.0,
    "reasoning": "Prices expected to rise by ₹90/Qtl over next 3 days due to lower arrivals. Storage cost is minimal."
  },
  "executed": false,
  "createdAt": "2026-07-24T11:20:00.000Z"
}
```
- **Indexes**:
  - `{ "userId": 1, "createdAt": -1 }`.

---

## 📡 REST API Documentation

### Base URL: `https://api.agroprice.ai/v1`

#### 1. Auth Endpoint: Request OTP
- **POST** `/auth/request-otp`
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "phone": "+919876543210"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "requestId": "req_otp_99238423"
}
```
- **Error Codes**: `400 Invalid Phone Number`, `429 Too Many Requests`.

---

#### 2. Decision Endpoint: Generate Selling Recommendation
- **POST** `/decision/recommend`
- **Headers**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **Request Body**:
```json
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
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "decisionId": "dec_883920192",
    "recommendation": {
      "action": "SWITCH_MANDI",
      "actionLabel": "Sell Tomorrow in Ramganj Mandi",
      "badgeColor": "GREEN",
      "targetMandi": {
        "mandiId": "60d5ecb8b392a911",
        "name": "Ramganj Mandi",
        "distanceKm": 34.2
      },
      "economics": {
        "grossPricePerQtl": 2100,
        "transportCostPerQtl": 110,
        "mandiCessPerQtl": 31.5,
        "netPricePerQtl": 1958.5,
        "totalNetProfit": 48962.5,
        "traderOfferNetProfit": 42500.0,
        "netProfitDifference": 6462.5
      },
      "scores": {
        "decisionScore": 92.4,
        "confidenceScore": 89.0,
        "riskLevel": "LOW"
      },
      "aiReasoningSummary": "Ramganj mandi offers ₹400/Qtl higher prices than your local trader. Even after deducting ₹110/Qtl transport, you net ₹6,462 extra."
    }
  }
}
```
- **Error Codes**: `401 Unauthorized`, `422 Unprocessable Entity (Invalid coordinates/crop)`.

---

#### 3. Market Endpoint: Fetch Live Mandi Prices
- **GET** `/market/prices?crop=Wheat&district=Sehore&limit=10`
- **Headers**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **Response (200 OK)**:
```json
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

## 🌾 Government Data Integration & Scheduling Pipeline

AgroPrice AI integrates with the official **Agmarknet API** (`data.gov.in`) and State Agricultural Marketing Boards.

```
┌──────────────────────────────────────────────────────────┐
│                   Agmarknet API / Portal                 │
└────────────────────────────┬─────────────────────────────┘
                             │  Cron: Every 30 Minutes
                             ▼
┌──────────────────────────────────────────────────────────┐
│               Node.js Data Ingestion Worker              │
│       - Validates Payload Structure                      │
│       - Normalizes Crop Names (e.g. "Tomato" vs "Tamatar")│
│       - Standardizes Units (Rs/Quintal)                  │
└────────────────────────────┬─────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│     Redis Cache       │         │  MongoDB Price Store  │
│  (TTL: 1800 Seconds)  │         │ (Historical Storage)  │
└───────────────────────┘         └───────────────────────┘
```

### Ingestion Resiliency Features
- **Circuit Breaker**: If `data.gov.in` experiences downtime, fallback to web-scraping secondary state portals (e.g., MP Farm Gate API).
- **Stale Data Prevention**: If no new price data is published for 24 hours, the system flags the mandi status as `UNVERIFIED_STALE` and expands prediction uncertainty intervals.

---

## 🤖 Machine Learning Pipeline & Price Forecasting

The prediction engine forecasts commodity prices for $1\text{ to }7$ days into the future.

```
Raw Data Ingestion ──► Feature Engineering ──► Model Inference (XGBoost) ──► Post-Processing Confidence
```

### 1. Dataset & Features
- **Historical Time Series**: 10 years of daily mandi prices across 3,000+ mandis.
- **Exogenous Features**:
  - **Temporal**: Day of week, Month, Harvest Seasonality Index.
  - **Weather**: Rain anomaly (mm), Min/Max Temperature, Relative Humidity.
  - **Macro**: Fuel/Diesel Price Index, Transport Inflation Factor.
  - **Arrival Volume**: Lagged 1-day, 3-day, and 7-day total arrival quantities in Quintals.

### 2. Feature Matrix Construction
$$Y_{t+k} = f(\text{Price}_{t}, \text{Price}_{t-1}, \dots, \text{Arrival}_{t}, \text{Rainfall}_{t}, \text{Month}, \text{District})$$

### 3. Model Architecture & Training
- **Primary Model**: **XGBoost Regressor** + **LightGBM** ensemble.
- **Fallback / Long-term Model**: **Prophet** / **Bi-LSTM** for 30-day macro trend forecasting.
- **Evaluation Metric**: Mean Absolute Percentage Error (MAPE). Target MAPE $< 4.5\%$.

---

## 🧠 Google Gemini AI Integration & Prompt Engineering

Google Gemini 1.5 Pro acts as the cognitive reasoning engine. While XGBoost provides raw price predictions and algorithms calculate route logistics, Gemini synthesizes these disparate outputs into a human-understandable narrative tailored to the farmer's dialect and context.

### Structured Prompt Template
```
SYSTEM PROMPT:
You are an expert Agricultural Economist and Farmer Advisor for AgroPrice AI.
Analyze the provided structured JSON data containing live prices, predictions, weather, transport costs, and trader offers.
Produce a multi-lingual recommendation that is empathetic, direct, concise, and highly persuasive.

INPUT DATA:
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

OUTPUT REQUIREMENTS:
1. Recommended Action (SELL_NOW | HOLD | SWITCH_MANDI | NEGOTIATE)
2. Net Financial Benefit in INR
3. 3-bullet point reasoning explanation in simple language
4. Trader negotiation script
```

---

## 📊 Recommendation Engine & Scoring Architecture

The Recommendation Engine assigns a **Decision Score** ($S_{\text{decision}} \in [0, 100]$) to every candidate selling pathway.

$$S_{\text{decision}} = w_1 \cdot P_{\text{net\_norm}} + w_2 \cdot C_{\text{model}} - w_3 \cdot R_{\text{weather}} - w_4 \cdot D_{\text{logistics}}$$

Where:
- $P_{\text{net\_norm}}$: Normalized Net Profit compared to baseline trader offer.
- $C_{\text{model}}$: ML Prediction Confidence score ($0.0 - 1.0$).
- $R_{\text{weather}}$: Adverse weather risk penalty ($0 - 20$ points if heavy rain threatens transport).
- $D_{\text{logistics}}$: Perishable travel risk penalty based on distance and travel time.
- Weights: $w_1 = 0.50$, $w_2 = 0.25$, $w_3 = 0.15$, $w_4 = 0.10$.

---

## 🧮 Domain Calculation Engines

### 1. Transport Cost Engine
Calculates vehicle freight dynamically:
$$\text{Cost} = \text{Base Fare} + (\text{Distance in Km} \times \text{Rate/Km}) + (\text{Quantity in Qtl} \times \text{Handling Fee/Qtl})$$
- Vehicle Profiles: Auto Loader (up to 15 Qtl), Pickup Truck (up to 35 Qtl), Tractor Trolley (up to 100 Qtl), 6-Tyre Truck ($>100\text{ Qtl}$).

### 2. Weather Engine
Integrates OpenWeatherMap API to evaluate 48-hour precipitation risk for open-bed transport and moisture damage to harvested crops.

### 3. Profit Calculator
Computes exact net cash in hand:
$$\text{Net Cash} = (\text{Quantity} \times \text{Mandi Price}) - \text{Freight} - \text{Mandi Cess} - \text{Loading Charge} - \text{Unloading Charge}$$

---

## 🔒 Security, AuthN/AuthZ & Compliance

1. **Authentication**: JWT tokens signed with RS256 algorithm. Short-lived access tokens (15 mins) paired with HTTP-Only encrypted cookies for refresh tokens.
2. **Rate Limiting**: Express Rate Limit paired with Redis. 100 requests per 15 minutes per IP; 5 OTP requests per hour per phone number.
3. **Data Encryption**: AES-256 encryption at rest for MongoDB Atlas; TLS 1.3 in transit for all microservice communication.
4. **Input Validation**: Strict schema enforcement using **Joi / Zod** on every controller endpoint.
5. **CORS & Security Headers**: Helmet.js enabled to enforce Content Security Policy (CSP), HSTS, and X-Frame-Options (`DENY`).

---

## ⚡ Performance Optimization & Scalability

- **Redis Caching Strategy**: Mandi price queries cached with a 30-minute TTL. Geo-proximity calculation results cached per district.
- **Frontend Code Splitting**: Route-based lazy loading via `React.lazy()` and React Suspense reduces initial bundle size to $< 180\text{ KB}$.
- **Database Optimization**: Compound indexes on `{ crop: 1, mandiCode: 1, priceDate: -1 }` reduce MongoDB query execution time from $450\text{ ms}$ to $< 12\text{ ms}$.
- **Image Optimization**: WebP format serving with responsive srcset attributes.

---

## 🐳 DevOps, CI/CD & Deployment Architecture

```
                               ┌──────────────────────────┐
                               │    GitHub Repository     │
                               └────────────┬─────────────┘
                                            │
                                            ▼  Git Push to main
                               ┌──────────────────────────┐
                               │   GitHub Actions CI/CD   │
                               │  - Run ESLint & Jest     │
                               │  - Build Docker Images   │
                               │  - Push to Docker Hub    │
                               └────────────┬─────────────┘
                                            │
                                            ▼  SSH Deploy Script
                               ┌──────────────────────────┐
                               │   Hetzner Cloud Server   │
                               │  - Nginx Reverse Proxy   │
                               │  - Docker Compose Setup  │
                               │  (Frontend + Node + ML)  │
                               └──────────────────────────┘
```

### Production `docker-compose.yml` Architecture
- `frontend_container`: Nginx static server delivering production Vite build.
- `backend_container`: Node.js Express API server (clustered across CPU cores).
- `ml_service_container`: Python FastAPI application running XGBoost inference models.
- `redis_container`: Redis in-memory cache server.

---

## 📊 Observability, Monitoring & Logging

- **Logging**: Structured JSON logging via **Winston** (Node.js) and **Structlog** (Python). Logs aggregated via Grafana Loki.
- **Metrics**: Prometheus metrics endpoint exposing HTTP response times, DB connection pool utilization, and prediction latency.
- **Crash Reporting**: Sentry SDK integrated across Frontend and Backend services for instant exception tracking.
- **Health Checks**: `/healthz` endpoint returning DB status, Redis connectivity, and ML service responsiveness.

---

## 🧪 Testing & Quality Assurance Strategy

- **Frontend**: Unit & Component testing via **Vitest** and **React Testing Library**; E2E flows tested via **Playwright**.
- **Backend**: Integration tests with **Supertest** against an in-memory MongoDB server (**MongoMemoryServer**).
- **Machine Learning**: Backtesting model performance over historical 12-month backtest windows to guarantee bounded MAPE.
- **API Security**: Automated OWASP ZAP security vulnerability scans integrated into CI/CD pipelines.

---

## 🗺️ Product Roadmap

```
+-----------------------------------------------------------------------------------+
| VERSION 1.0 (CURRENT RELEASE)                                                     |
| • Live Agmarknet Price Ingestion                                                  |
| • 7-Day XGBoost Price Forecasting                                                 |
| • Multi-Mandi Net Profit Calculator                                               |
| • Gemini AI Recommendation Engine (Hindi/English)                                 |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| VERSION 2.0 (Q4 2026)                                                             |
| • Voice-first Interaction in 6 Indian Languages                                   |
| • Shared Logistics & Truck Pooling Marketplace for Farmers                        |
| • WhatsApp Bot for Direct Instant Recommendations                                 |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| VERSION 3.0 & ENTERPRISE (2027)                                                   |
| • B2B Procurement Portal for Bulk Grain Buyers                                    |
| • Credit Risk & Yield Scoring APIs for Agri-Banks & Insurers                      |
| • Satellite Imagery Integration for Yield Estimation                              |
+-----------------------------------------------------------------------------------+
```

---

## 🤝 Contribution Guide & Engineering Standards

### Coding Standards
- **JavaScript/React**: Standard Airbnb Style Guide enforced via ESLint & Prettier.
- **Python (ML Service)**: PEP 8 compliant, type-hinted, formatted via `black` and `isort`.

### Git Workflow & Commit Conventions
Follow **Conventional Commits**:
- `feat(sell-module): add moisture percentage input step`
- `fix(mandi-sync): resolve agmarknet API parser null pointer`
- `docs(readme): expand architecture and database schemas`

### Pull Request Rules
1. Every PR must reference an open issue.
2. All automated CI checks (Linter, Unit Tests, Build) must pass.
3. Code review approval required from at least 1 Principal/Staff Engineer.

---

## 📁 Complete Repository Folder Breakdown

```
Agroprice-ai/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml                # Main deployment and testing pipeline
│       └── lint.yml                 # Code style checking
├── backend/                         # Node.js + Express API Service
│   ├── src/
│   │   ├── config/                  # DB, Redis, Environment variables
│   │   ├── controllers/             # HTTP Route Handlers
│   │   ├── middleware/              # Auth, Rate Limiting, Error Handling
│   │   ├── models/                  # Mongoose Schemas (User, Mandi, Price, Decision)
│   │   ├── repositories/            # Database Data Access Objects (DAOs)
│   │   ├── routes/                  # Express Router definitions
│   │   ├── services/                # Business logic, Agmarknet Sync, Gemini API
│   │   └── utils/                   # Helpers, Math calculators, Logger
│   ├── tests/                       # Jest + Supertest integration tests
│   ├── package.json
│   └── Dockerfile
├── frontend/                        # React + Vite Client Application
│   ├── src/
│   │   ├── assets/                  # Images, SVGs, Fonts
│   │   ├── components/              # Reusable UI components (shadcn)
│   │   ├── features/                # Domain-specific modules (Dashboard, Sell, Chat)
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # Axios API handlers
│   │   ├── store/                   # Zustand global state
│   │   ├── utils/                   # Unit converters, price formatters
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── ml_service/                      # Python FastAPI Machine Learning Service
│   ├── app/
│   │   ├── api/                     # Inference endpoint routes
│   │   ├── core/                    # Model loading & configuration
│   │   ├── models/                  # Saved XGBoost / LightGBM model binaries (.pkl)
│   │   ├── pipelines/               # Data cleaning & feature engineering scripts
│   │   └── main.py                  # FastAPI server entrypoint
│   ├── tests/                       # Pytest model test cases
│   ├── requirements.txt
│   └── Dockerfile
├── docs/                            # System Architecture & API Specifications
│   └── 00_PROJECT_MASTER_DOCUMENTATION.md
├── Dockerfile                       # Multi-stage root build
├── docker-compose.yml               # Container orchestration spec
├── .gitignore
└── README.md                        # Master Documentation Entry Point
```

---

## 🏆 Conclusion

**AgroPrice AI** represents a paradigm shift in agricultural decision support. By integrating real-time market data, predictive machine learning, hyper-local transport costs, and cognitive AI reasoning into a seamless, farmer-centric platform, AgroPrice AI turns complex market dynamics into simple, actionable, and profitable selling decisions. 

---
*Maintained by the AgroPrice AI Core Engineering Team.*
