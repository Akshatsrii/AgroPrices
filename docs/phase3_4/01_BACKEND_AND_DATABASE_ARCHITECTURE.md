# 🌾 AgroPrice AI — Phase 3 & Phase 4 Architecture & API Documentation

## 1. Database Collections & Index Specifications (Phase 4)

| Collection Name | Model File | Key Index Types | Purpose |
| :--- | :--- | :--- | :--- |
| **`users`** | `models/User.js` | `{ phoneNumber: 1 }` (Unique Index) | Farmer profiles, auth role, verified badge |
| **`farms`** | `models/Farm.js` | `{ location: '2dsphere' }` (GeoSpatial Index) | Land size in acres, soil type, transport vehicle |
| **`crops`** | `models/Crop.js` | `{ name: 'text', hindiName: 'text' }` (Text Index)| Catalog of crops, categories, grade multipliers |
| **`mandis`** | `models/Mandi.js` | `{ location: '2dsphere' }`, `{ name: 'text', district: 'text' }` | APMC mandis registry, spatial `$near` lookup |
| **`prices`** | `models/Price.js` | `{ mandi: 1, crop: 1, date: -1 }` (Compound Index) | Daily modal/min/max prices & arrival volumes |
| **`predictions`**| `models/Prediction.js` | `{ cropName: 1, mandiName: 1, calculatedAt: -1 }` | 7-day AI price trend forecasts & confidence score |
| **`recommendations`** | `models/Recommendation.js` | `{ farmer: 1, createdAt: -1 }` (Compound Index)| AI Decision Engine results & net profit math |
| **`sales`** | `models/Sale.js` | `{ farmer: 1, saleDate: -1 }` (Compound Index)| Completed farmer transactions & profit ledger |
| **`notifications`**| `models/Notification.js` | `{ user: 1, isRead: 1, createdAt: -1 }` | Real-time price surge & weather alerts |
| **`weather`** | `models/Weather.js` | `{ district: 1, state: 1, updatedAt: -1 }` | District rain risks & harvest advisory |
| **`analytics`** | `models/Analytics.js` | `{ date: -1 }` (Single Field Index) | Platform active farmers & trading volume |

---

## 2. API Route Specifications (Phase 3)

| Endpoint | Method | Purpose | Response Payload |
| :--- | :--- | :--- | :--- |
| `/api/auth/send-otp` | `POST` | Triggers 6-digit SMS OTP | `{ success: true, message, demoCode: '123456' }` |
| `/api/auth/verify-otp` | `POST` | Verifies OTP code & returns JWT Token | `{ success: true, token, user }` |
| `/api/farmers/profile/:id`| `GET/PUT`| Get/Update farmer details & farm capacity | `{ success: true, profile, farm }` |
| `/api/crops` | `GET` | List all available crops & categories | `{ success: true, crops: [...] }` |
| `/api/mandis/nearby` | `GET` | GeoSpatial `$near` lookup within X km | `{ success: true, count, mandis: [...] }` |
| `/api/mandis/search` | `GET` | Text index search by Mandi/District name | `{ success: true, mandis: [...] }` |
| `/api/prices/today` | `GET` | Real-time price ticker feed | `{ success: true, count, prices: [...] }` |
| `/api/prices/compare` | `POST` | Multi-mandi side-by-side net profit math | `{ success: true, comparison: [...] }` |
| `/api/predictions` | `GET` | 7-day price forecasting & trend direction | `{ success: true, prediction: {...} }` |
| `/api/recommendations/calculate`| `POST` | 8-step AI decision score (0-100) & net profit | `{ success: true, recommendation: {...} }` |
| `/api/history/sales` | `GET` | Previous sales ledger & transaction records | `{ success: true, sales: [...] }` |
| `/api/notifications` | `GET` | Price surge & weather alert inbox | `{ success: true, notifications: [...] }` |
| `/api/weather` | `GET` | District rainfall risk & harvest advisory | `{ success: true, weather: {...} }` |
