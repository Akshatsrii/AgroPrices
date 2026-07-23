# 🌾 AgroPrice AI — Phase 1: Information Architecture & Screen Inventory (50+ Screens)

## 1. Information Architecture (IA) Sitemap

```
AgroPrice AI Application Platform
│
├── 🌐 Public Marketing Website
│   ├── Home Page (Hero, Features, Live Ticker, CTA)
│   ├── About Us Page (Mission, Impact, Team)
│   ├── Features Overview Page (AI Decision Engine, Price Predictor)
│   ├── Services & Mandi Network Page
│   └── Contact & Support Page
│
├── 🔑 Authentication & Security
│   ├── Sign In / Enter Phone Number Page
│   ├── Sign Up / Create Account Page
│   └── OTP Verification & Pin Modal
│
├── 🚜 Farmer Onboarding Flow
│   ├── Welcome & Language Selection
│   ├── Farmer Profile Setup (State, District)
│   ├── Farm & Crop Capacity Details
│   ├── Vehicle & Storage Details
│   └── Onboarding Completion Summary
│
├── 📊 Main Application Dashboard
│   ├── Dashboard Home (Price Ticker, Quick Sell, Top Mandis)
│   ├── Today's Mandi Prices Feed Page
│   ├── Trending Crops & Arrivals Page
│   └── Real-time Price Alerts & Notifications Page
│
├── 💰 8-Step Sell Crop Engine (USP Core Module)
│   ├── Step 1: Select Crop Page
│   ├── Step 2: Enter Quantity & Units Page
│   ├── Step 3: Select Quality Grade Page
│   ├── Step 4: Expected Price Input Page
│   ├── Step 5: Trader Offer Evaluator Page
│   ├── Step 6: Need Cash Urgency Page
│   ├── Step 7: Vehicle & Transport Availability Page
│   ├── Step 8: Review Listing Details Page
│   ├── Processing: AI Analysis Loading Screen
│   └── Result: AI Recommendation Card Page
│
├── 🏪 Market & Mandi Analytics
│   ├── Nearby Mandis Radar Page (Map & Distance)
│   ├── Search Mandi & Filter Page
│   ├── Mandi Detail Page (Commodities, Tax, Volume)
│   ├── Side-by-Side Mandi Price Comparison Page
│   ├── Historical Price Chart & Volatility Page
│   └── State & National Market Trends Page
│
├── 🤖 AI Decision Engine & Calculators
│   ├── AI Trade Recommendation Deep Dive Page
│   ├── Net Profit Calculator Page (Gross vs Net)
│   ├── Transport Cost & Route Fuel Calculator Page
│   ├── AI Counter-Negotiation Script Assistant Page
│   └── "Sell Today vs Hold 7 Days" Dynamic Engine Page
│
├── 💬 AI Assistant & Voice Bot
│   ├── Multilingual AI Chat Page
│   ├── Chat Query History & Saved Tips Page
│   └── Voice Assistant Interface Page
│
├── 📜 Farmer Trade History & Ledger
│   ├── Previous Sales Ledger Page
│   ├── Profit Analytics & Revenue Chart Page
│   └── Crop Wise Performance Record Page
│
├── ⚙️ Profile & Settings Management
│   ├── Farmer Profile Overview & Edit Page
│   ├── App Preferences & Theme Page
│   ├── Regional Language Selector Page
│   └── Notification & SMS Alert Settings Page
│
└── 🛡️ Admin & Operational Portal
    ├── Admin Master Analytics Dashboard
    ├── Crops Management & Pricing Overrides
    ├── Mandis Registry & Location Directory
    ├── Manual Price Entry & Feed Moderation
    └── Registered Users & Farmer Directory
```

---

## 2. Complete Screen Inventory (50+ Screen Map)

| Screen ID | Screen Name | Route / Path | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **SCR-01** | Landing Home | `/` | Conversion hero, live price ticker, quick start |
| **SCR-02** | About Platform | `/about` | Mission, farmer impact statistics, leadership |
| **SCR-03** | Feature Showcase | `/features` | Explaining AI Decision Score engine |
| **SCR-04** | Services Directory | `/services` | Mandi coverage map and logistics partners |
| **SCR-05** | Contact Us | `/contact` | Helpline, WhatsApp bot link, feedback form |
| **SCR-06** | Sign In | `/signin` | Phone number entry & OTP trigger |
| **SCR-07** | Sign Up | `/signup` | New farmer account creation |
| **SCR-08** | OTP Verification | `/verify-otp` | 6-digit OTP verification screen |
| **SCR-09** | Onboarding Welcome | `/onboarding/welcome` | Language selection (Hindi/English/Punjabi/etc) |
| **SCR-10** | Onboarding Profile | `/onboarding/profile` | Personal details, village, district |
| **SCR-11** | Onboarding Farm | `/onboarding/farm` | Farm size in acres, soil type, primary crops |
| **SCR-12** | Onboarding Transport | `/onboarding/transport` | Vehicle availability (Tractor, Pickup, Freight) |
| **SCR-13** | Onboarding Summary | `/onboarding/summary` | Confirmation of farmer profile |
| **SCR-14** | Dashboard Home | `/dashboard` | Central hub: todays summary, quick action cards |
| **SCR-15** | Today's Market | `/dashboard/market` | Live mandi prices grid with search filter |
| **SCR-16** | Trending Crops | `/dashboard/trending` | Top gainers and top falling crop commodities |
| **SCR-17** | Price Alerts | `/dashboard/notifications`| Notification inbox for price target alerts |
| **SCR-18** | Sell: Crop Select | `/sell/select-crop` | Step 1: Visual crop cards grid |
| **SCR-19** | Sell: Quantity | `/sell/quantity` | Step 2: Quantity in quintals/kgs/tons |
| **SCR-20** | Sell: Quality | `/sell/quality` | Step 3: Quality grading (Grade A, B, FAQ) |
| **SCR-21** | Sell: Target Price | `/sell/expected-price` | Step 4: Desired price per quintal |
| **SCR-22** | Sell: Trader Offer | `/sell/trader-offer` | Step 5: Input current middleman offer |
| **SCR-23** | Sell: Need Money | `/sell/need-money` | Step 6: Payment timeline selection |
| **SCR-24** | Sell: Transport | `/sell/vehicle` | Step 7: Self-transport vs buyer pickup |
| **SCR-25** | Sell: Review | `/sell/review` | Step 8: Verify input data before running AI |
| **SCR-26** | Sell: AI Analyzing | `/sell/ai-analysis` | Animated AI engine computation screen |
| **SCR-27** | Sell: Recommendation | `/sell/recommendation` | AI Decision Score card & recommended action |
| **SCR-28** | Mandis Nearby Radar | `/market/nearby` | Map & list view of mandis within 100km |
| **SCR-29** | Search Mandis | `/market/search` | Full mandi search directory by state/crop |
| **SCR-30** | Mandi Detail View | `/market/mandi/:id` | Specific mandi prices, tax rate, operating hours |
| **SCR-31** | Mandi Price Compare | `/market/compare` | Compare 3 mandis side-by-side |
| **SCR-32** | Mandi Price History | `/market/history` | Historical price trends (1M, 6M, 1Y) |
| **SCR-33** | National Trends | `/market/trends` | Macro crop price trends across India |
| **SCR-34** | AI Rec Deep Dive | `/ai/recommendation/:id`| Comprehensive breakdown of AI decision factors |
| **SCR-35** | Net Profit Calculator | `/ai/profit-calculator` | Dynamic net profit formula tool |
| **SCR-36** | Transport Cost Calc | `/ai/transport-cost` | Fuel, toll & labor cost dynamic breakdown |
| **SCR-37** | AI Negotiation Helper| `/ai/negotiation` | Counter-offer response generator for traders |
| **SCR-38** | Sell vs Wait Engine | `/ai/sell-vs-wait` | Dynamic timeline analysis (Today vs 7 Days) |
| **SCR-39** | AI Chat | `/assistant/chat` | Chatbot interface with suggested prompts |
| **SCR-40** | AI Chat History | `/assistant/history` | Past chat sessions & bookmarked market advice |
| **SCR-41** | Voice Assistant UI | `/assistant/voice` | Voice-to-text input in Hindi/Regional language |
| **SCR-42** | Sales Ledger | `/farmer/sales` | History of all completed crop sales |
| **SCR-43** | Profit Analytics | `/farmer/analytics` | Revenue, profit margin, and volume charts |
| **SCR-44** | Crop History Ledger | `/farmer/crops` | Past crops sold per season |
| **SCR-45** | Farmer Profile | `/profile` | Profile card, land details, vehicle setup |
| **SCR-46** | App Settings | `/settings` | General preferences, dark/light mode toggle |
| **SCR-47** | Language Settings | `/settings/language` | Language switcher (Hindi, English, Punjabi, etc) |
| **SCR-48** | Notification Prefs | `/settings/notifications`| SMS, WhatsApp, and push alert triggers |
| **SCR-49** | Admin Dashboard | `/admin` | Key metrics: total users, active listings, volume |
| **SCR-50** | Admin Crops | `/admin/crops` | Manage crop catalog and base rates |
| **SCR-51** | Admin Mandis | `/admin/mandis` | Manage Mandi directory, coordinates & taxes |
| **SCR-52** | Admin Prices | `/admin/prices` | Override/verify daily mandi prices |
| **SCR-53** | Admin Users | `/admin/users` | Manage farmer registered profiles |
