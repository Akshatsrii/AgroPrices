# 🌾 AgroPrice AI — Phases 15 & 16 Advanced Agritech Architecture

## 1. Phase 15: AI Vision, Agronomy, Loan & Insurance Engine

### Features & Capabilities
1. **📸 Crop Quality Detection (`aiVisionService.js`)**: Analyzes sample crop photos, evaluates moisture, uniformity, and foreign matter to determine Grade A/B/FAQ with price multiplier (e.g. +5% bonus).
2. **🌿 Leaf Disease Detection**: Identifies crop diseases (Yellow Rust, Leaf Blight, Fusarium Wilt) with step-by-step chemical treatment & preventative advisories.
3. **📄 OCR Receipt Reader**: Parses Mandi payment receipts, Arhtiya commission deductions, and loading fees into digital trade ledger records.
4. **💳 KCC Loan Eligibility Calculator (`agronomyEngine.js`)**: Calculates Kisan Credit Card limit based on land acreage, crop scale of finance, post-harvest storage buffer (10%), and consumption buffer (10%).
5. **🛡️ PMFBY Crop Insurance Advisor**: Calculates government sum insured, farmer premium rate (1.5% Rabi / 2.0% Kharif), and government subsidy share.
6. **🧪 Soil NPK Fertilizer Calculator**: Recommends exact 50kg DAP, 45kg Urea, 50kg MOP bags, and Zinc Sulfate per acre.
7. **🎙️ Voice Assistant**: Hindi/Regional speech-to-text and text-to-speech voice advisory.

---

## 2. Phase 16: AI Peer-to-Peer Marketplace & Demand Forecaster

### Features & Endpoints
- `GET /api/marketplace/listings` — Active farmer crop listings with top buyer bids.
- `POST /api/marketplace/create-listing` — Direct farmer crop listing creation.
- `GET /api/marketplace/demand-forecast` — 30-day regional buyer demand index & institutional export inquiries forecast (`demandForecaster.js`).

---

## 3. API Endpoint Summary (Phases 15 & 16)

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/agronomy/quality-check` | `POST` | Image Crop Quality Grading & Price Multiplier |
| `/api/agronomy/disease-detect` | `POST` | Leaf Disease Detection & Treatment Steps |
| `/api/agronomy/ocr-receipt` | `POST` | OCR Receipt Parser for Mandi Payment Slips |
| `/api/agronomy/loan-eligibility` | `POST` | Kisan Credit Card (KCC) Loan Limit Calculator |
| `/api/agronomy/insurance` | `POST` | PM Fasal Bima Yojana (PMFBY) Insurance Advisor |
| `/api/agronomy/fertilizer` | `POST` | Soil NPK Fertilizer Bag Calculator |
| `/api/agronomy/crop-plan` | `POST` | Multi-season Crop Rotation & Profit Optimizer |
| `/api/marketplace/listings` | `GET` | Peer-to-Peer Farmer Crop Marketplace |
| `/api/marketplace/demand-forecast` | `GET` | Macro Commodity Demand & Buyer Volume Index |
