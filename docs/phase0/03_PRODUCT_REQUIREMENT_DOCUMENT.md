# 🌾 AgroPrice AI — Phase 0: Product Requirement Document (PRD)

## 1. Executive Overview
- **Document Version**: 1.0.0
- **Status**: Approved & Ready for Sprint Execution
- **Target Platform**: Progressive Web Application (PWA) / Responsive Web App (Mobile-First, Desktop-Optimized)
- **Primary Languages Supported**: English, Hindi, Punjabi, Marathi, Gujarati, Telugu, Tamil

---

## 2. Functional Requirements (FR)

### Module 1: Authentication & Onboarding
- **FR-1.1 Phone & OTP Authentication**: User can enter 10-digit Indian phone number, receive 6-digit SMS OTP, and verify in under 30 seconds.
- **FR-1.2 Farmer Profile Creation**: Captures Name, State, District, Preferred Language, Primary Crops, Land Size (Acres), and Vehicle Ownership (Tractor/Trolley/Pickup/None).

### Module 2: 8-Step Sell Crop Engine (USP Core)
- **FR-2.1 Step 1 — Crop Selection**: Grid UI with searchable crop cards (Wheat, Paddy, Soybeans, Onion, Cotton, Mustard, Maize, Gram, Potato, Tomato).
- **FR-2.2 Step 2 — Quantity Entry**: Numeric entry in Quintals or Kgs with instant ton conversions.
- **FR-2.3 Step 3 — Quality Grading**: Grade selection (Grade A Premium, Grade B Medium, Fair Average Quality FAQ) with sample photos & descriptions.
- **FR-2.4 Step 4 — Expected Price Input**: Target selling price per quintal set by farmer.
- **FR-2.5 Step 5 — Trader Offer Evaluator**: Input offered price from local middleman/trader to evaluate against fair market value.
- **FR-2.6 Step 6 — Need Cash Urgency**: Flag whether payment is needed within 24 hours vs flexible 7-day terms.
- **FR-2.7 Step 7 — Logistics & Vehicle Status**: Select self-transport vs required buyer pickup.
- **FR-2.8 Step 8 — AI Recommendation Card & Profit Analysis**: Displays overall **AI Decision Score (0-100)**, Recommended Mandi, Best Sale Date Window, Expected Net Profit after transport costs.

### Module 3: Market & Mandi Analytics
- **FR-3.1 Today's Prices Feed**: Real-time ticker of modal prices, minimum prices, and maximum prices per mandi.
- **FR-3.2 Multi-Mandi Price Comparison**: Side-by-side comparison matrix of up to 4 mandis within 150 km.
- **FR-3.3 Price Trend Graphs**: 7-day, 30-day, and 1-year price evolution line charts with volatility index.

### Module 4: AI Negotiation Assistant & Chat
- **FR-4.1 Multilingual AI Chat**: Conversational AI assistant giving tactical advice on how to respond to low trader bids.
- **FR-4.2 Profit & Transport Cost Calculators**: Dynamic fuel math based on distance, vehicle fuel efficiency, labor costs, and mandi tax/commission (1.5-2.5%).

---

## 3. Non-Functional Requirements (NFR)

### Performance & Speed
- **NFR-1 Page Load Time**: Initial load < 1.5 seconds on 3G network conditions.
- **NFR-2 Offline Readiness**: Critical price caches stored in `localStorage` for viewing prices without active connection.

### Design & Accessibility
- **NFR-3 Contrast & Readability**: High-contrast green/emerald theme (`#16a34a` / `#15803d`) tailored for outdoor sunlight reading.
- **NFR-4 Font & Touch Targets**: Minimum touch target size of 48x48px for easy thumb tapping on mobile screens.

### Data Security & Privacy
- **NFR-5 Secure Storage**: No plain-text phone numbers stored without encryption. OAuth & JWT bearer tokens for backend requests.
