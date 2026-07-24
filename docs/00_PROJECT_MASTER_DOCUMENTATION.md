# 🌾 AgroPrice AI — Master System Architecture & Complete Product Documentation

Welcome to the official master documentation for **AgroPrice AI**, an end-to-end agricultural price forecasting, Mandi arbitrage, and AI trade decision platform designed for Indian farmers.

---

## 🚀 Quick Start & Single-Command Deployment

### 1. Run via Docker Compose (Recommended Production Setup)
```bash
# Clone repository
git clone https://github.com/Akshatsrii/AgroPrices.git
cd AgroPrices

# Start all 5 microservices in detached mode
docker-compose up -d --build
```
> **Services Launched**:
> - 🌐 **Frontend (Nginx React)**: `http://localhost:80`
> - ⚡ **Backend (Express API)**: `http://localhost:5000`
> - 🤖 **Python ML Microservice (FastAPI)**: `http://localhost:8000`
> - 🍃 **MongoDB Database**: `localhost:27017`
> - 🔴 **Redis Queue**: `localhost:6379`

---

## 📐 System Architecture Overview

```
                          ┌──────────────────────────┐
                          │   React Vite Frontend    │
                          │   (Tailwind, Zustand)    │
                          └─────────────┬────────────┘
                                        │ REST API
                                        ▼
                          ┌──────────────────────────┐
                          │  Express Node.js Backend │
                          └──────┬─────────────┬─────┘
                                 │             │
                    ┌────────────┴──┐       ┌──┴─────────────┐
                    ▼               ▼       ▼                ▼
             ┌────────────┐   ┌──────────────┐      ┌────────────────┐
             │  MongoDB   │   │ Redis / Bull │      │ Python FastAPI │
             │  Database  │   │ Background   │      │ ML Engine      │
             │ (Indexes)  │   │ Price Jobs   │      │ (XGBoost/MAE)  │
             └────────────┘   └──────────────┘      └────────────────┘
```

---

## 🗺️ Screen Inventory Taxonomy (50+ Screens)

1. **Public Marketing Site**: `/` (Home), `/about`, `/features`, `/services`, `/contact`
2. **Auth & Onboarding**: `/auth/login`, `/auth/signup`, `/auth/verify-otp`, `/onboarding/welcome`, `/onboarding/farm`
3. **Farmer Dashboard**: `/dashboard`, `/dashboard/market`, `/dashboard/trending`, `/dashboard/notifications`
4. **8-Step Sell Crop Engine**: `/sell/crop`, `/sell/quantity`, `/sell/quality`, `/sell/expected-price`, `/sell/trader-offer`, `/sell/urgency`, `/sell/vehicle`, `/sell/review`, `/sell/ai-recommendation`
5. **Market Radar & Mandis**: `/market/nearby`, `/market/search`, `/market/details/:id`, `/market/compare`, `/market/history`
6. **AI Decision Engine & Calculators**: `/ai/recommendation-details`, `/ai/profit-calculator`, `/ai/transport-calculator`, `/ai/negotiation-assistant`, `/ai/sell-vs-wait`
7. **AI Chat & Voice**: `/assistant/chat`, `/assistant/history`, `/assistant/voice`
8. **Farmer Ledger**: `/farmer-history/sales`, `/farmer-history/analytics`, `/farmer-history/crops`
9. **Profile & Settings**: `/profile`, `/settings`, `/settings/language`, `/settings/notifications`
10. **Admin Portal**: `/admin`, `/admin/crops`, `/admin/mandis`, `/admin/prices`, `/admin/users`

---

## 📊 Database Collections & Index Topology (Phase 4)

- **`users`**: Unique index `{ phoneNumber: 1 }`
- **`farms`**: GeoSpatial Index `{ location: '2dsphere' }`
- **`mandis`**: GeoSpatial Index `{ location: '2dsphere' }`, Text Index `{ name: 'text', district: 'text' }`
- **`prices`**: Compound Index `{ mandi: 1, crop: 1, date: -1 }`
- **`predictions`**: Compound Index `{ cropName: 1, mandiName: 1, calculatedAt: -1 }`
- **`recommendations`**: Compound Index `{ farmer: 1, createdAt: -1 }`

---

## 🤖 Machine Learning Pipeline & Performance (Phase 6)

- **Architecture**: XGBoost Regressor & RandomForest Regressor
- **Data Cleaner**: Interquartile Range (IQR) outlier removal (`q1 - 1.5*iqr` to `q3 + 1.5*iqr`)
- **Features Created**: Price Lags (1d, 2d, 3d, 7d), Rolling SMA (7d, 14d, 30d), Price Volatility (7d std dev), Arrival Volume Ratio vs 7d average.
- **Model Evaluation**:
  - MAE (Mean Absolute Error): ₹28.38 / quintal
  - RMSE: ₹32.62
  - R² Score: 95.8%

---

## ⚡ API Endpoint Quick Reference (Phase 3 & 5)

- `POST /api/auth/send-otp` — Triggers 6-digit SMS OTP
- `POST /api/auth/verify-otp` — Verifies OTP & returns JWT bearer token
- `GET /api/mandis/nearby` — GeoSpatial `$near` query within X km
- `GET /api/mandis/search` — Text search query by name/district
- `POST /api/prices/compare` — Multi-mandi side-by-side net profit breakdown
- `GET /api/predictions` — Tomorrow's Price prediction & 7-day forecast
- `POST /api/recommendations/calculate` — 8-step AI Decision Score (0-100) & net profit calculation
