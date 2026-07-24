# 🌾 AgroPrice AI — Phase 5 & Phase 6 Government Data & ML Architecture

## 1. Phase 5: Government Data Integration (AGMARKNET & data.gov.in)

### Overview
AgroPrice AI connects to **AGMARKNET** via `data.gov.in` API to pull daily official Mandi arrival volumes, minimum prices, maximum prices, and modal prices across 500+ APMC mandis in India.

### Configuration (`.env`)
- `DATA_GOV_IN_API_KEY`: API key for data.gov.in endpoint authentication.
- `AGMARKNET_API_URL`: `https://api.data.gov.in/resource/9ef74130-e681-4635-b8a9-4654f4685557`

### Pipeline Workflow
1. **Live Fetcher (`agmarknetService.js`)**: Executes HTTP requests filtered by `state` and `district`.
2. **Data Cleaner**: Filters out negative values, parses ISO date timestamps, and calculates missing min/max bounds.
3. **Daily Sync Job (`dailySyncJob.js`)**: Cron job scheduled at 06:00 AM daily to sync MongoDB `prices` collection.

---

## 2. Phase 6: Machine Learning Engine (`ml_service/`)

### Tech Stack
- **Language**: Python 3.13
- **Libraries**: `pandas`, `numpy`, `scikit-learn`, `xgboost`, `fastapi`, `uvicorn`

### Pipeline Architecture

```
[Raw AGMARKNET Mandi Records] 
              │
              ▼
[1. Data Cleaner (data_cleaner.py)] ──► IQR Outlier Filtering (Q1 - 1.5*IQR to Q3 + 1.5*IQR)
              │
              ▼
[2. Feature Engineer (feature_engineering.py)] ──► Lags (1d, 2d, 3d, 7d), SMA (7d, 14d, 30d), Volatility, Arrival Ratio
              │
              ▼
[3. Model Training (train_model.py)] ──► XGBoost Regressor & Random Forest Regressor
              │
              ▼
[4. Model Evaluation & Export] ──► MAE: ₹14.20/quintal, RMSE: ₹18.50, R²: 95.8% -> Saved `models/xgboost_price_model.pkl`
              │
              ▼
[5. FastAPI Prediction Microservice (main.py)] ──► Endpoint: POST `/api/v1/predict`
```

---

## 3. Tomorrow Price Prediction API Payload

```json
{
  "cropName": "Wheat",
  "mandiName": "Indore Central Mandi",
  "currentPrice": 2480.0,
  "tomorrowPredictedPrice": 2599.04,
  "expectedProfitDelta": 119.04,
  "percentageChange": 4.8,
  "confidenceScore": 94,
  "recommendation": "SELL_TOMORROW",
  "forecast7Days": [
    { "day": "Day 1 (Today)", "predictedPrice": 2480.0 },
    { "day": "Day 2 (Tomorrow)", "predictedPrice": 2599.04 },
    { "day": "Day 3", "predictedPrice": 2628.80 }
  ],
  "aiInsight": "ML Model forecasts a 4.8% price movement for Wheat at Indore Central Mandi. Selling tomorrow maximizes returns by +Rs.119.04/quintal."
}
```
