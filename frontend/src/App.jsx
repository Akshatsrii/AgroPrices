import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MarketingLayout } from './layouts/MarketingLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

// Authentication Pages
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';

// Module 3: Dashboard Pages
import { DashboardHomePage } from './pages/dashboard/DashboardHomePage';
import { TodaysMarketPage } from './pages/dashboard/TodaysMarketPage';
import { TrendingCropsPage } from './pages/dashboard/TrendingCropsPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';

// Module 4: Sell Crop USP Wizard (8 Steps)
import { SelectCropPage } from './pages/sell/SelectCropPage';
import { EnterQuantityPage } from './pages/sell/EnterQuantityPage';
import { SelectQualityPage } from './pages/sell/SelectQualityPage';
import { ExpectedPricePage } from './pages/sell/ExpectedPricePage';
import { TraderOfferPage } from './pages/sell/TraderOfferPage';
import { NeedMoneyPage } from './pages/sell/NeedMoneyPage';
import { VehicleAvailablePage } from './pages/sell/VehicleAvailablePage';
import { ReviewDetailsPage } from './pages/sell/ReviewDetailsPage';
import { AIAnalysisPage } from './pages/sell/AIAnalysisPage';
import { AIRecommendationPage } from './pages/sell/AIRecommendationPage';

// Module 5: Market (6 Pages)
import { NearbyMandisPage } from './pages/market/NearbyMandisPage';
import { SearchMandiPage } from './pages/market/SearchMandiPage';
import { MandiDetailsPage } from './pages/market/MandiDetailsPage';
import { PriceComparisonPage } from './pages/market/PriceComparisonPage';
import { PriceHistoryPage } from './pages/market/PriceHistoryPage';
import { MarketTrendsPage } from './pages/market/MarketTrendsPage';

// Module 6: AI Decision Engine (5 Pages)
import { AIRecommendationDetailsPage } from './pages/ai/AIRecommendationDetailsPage';
import { ProfitCalculatorPage } from './pages/ai/ProfitCalculatorPage';
import { TransportCostCalculatorPage } from './pages/ai/TransportCostCalculatorPage';
import { NegotiationAssistantPage } from './pages/ai/NegotiationAssistantPage';
import { SellVsWaitPage } from './pages/ai/SellVsWaitPage';
import { AIModelAccuracyPage } from './pages/ai/AIModelAccuracyPage';

// Module 7: AI Assistant (3 Pages)
import { AIChatPage } from './pages/assistant/AIChatPage';
import { AIHistoryPage } from './pages/assistant/AIHistoryPage';
import { VoiceAssistantPage } from './pages/assistant/VoiceAssistantPage';

// Module 8: Agronomy & P2P Marketplace
import { AgronomySuitePage } from './pages/agronomy/AgronomySuitePage';
import { MarketplacePage } from './pages/marketplace/MarketplacePage';

// Module 9: Farmer History (3 Pages)
import { PreviousSalesPage } from './pages/farmerHistory/PreviousSalesPage';
import { ProfitAnalyticsPage } from './pages/farmerHistory/ProfitAnalyticsPage';
import { CropHistoryPage } from './pages/farmerHistory/CropHistoryPage';

// Module 10: Profile & Settings (4 Pages)
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { LanguageSettingsPage } from './pages/settings/LanguageSettingsPage';
import { NotificationSettingsPage } from './pages/settings/NotificationSettingsPage';

// Module 11: Admin Panel (5 Pages)
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCropsPage } from './pages/admin/AdminCropsPage';
import { AdminMandisPage } from './pages/admin/AdminMandisPage';
import { AdminPricesPage } from './pages/admin/AdminPricesPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Application with Unified Navigation */}
        <Route path="/" element={<MarketingLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />

          {/* Module 3: Dashboard */}
          <Route path="dashboard" element={<DashboardHomePage />} />
          <Route path="dashboard/market" element={<TodaysMarketPage />} />
          <Route path="dashboard/trending" element={<TrendingCropsPage />} />
          <Route path="dashboard/notifications" element={<NotificationsPage />} />

          {/* Module 4: Sell Crop USP Wizard (8 Steps) */}
          <Route path="sell/crop" element={<SelectCropPage />} />
          <Route path="sell/quantity" element={<EnterQuantityPage />} />
          <Route path="sell/quality" element={<SelectQualityPage />} />
          <Route path="sell/expected-price" element={<ExpectedPricePage />} />
          <Route path="sell/trader-offer" element={<TraderOfferPage />} />
          <Route path="sell/urgency" element={<NeedMoneyPage />} />
          <Route path="sell/vehicle" element={<VehicleAvailablePage />} />
          <Route path="sell/review" element={<ReviewDetailsPage />} />
          <Route path="sell/ai-analysis" element={<AIAnalysisPage />} />
          <Route path="sell/ai-recommendation" element={<AIRecommendationPage />} />

          {/* Module 5: Market (6 Pages) */}
          <Route path="market/nearby" element={<NearbyMandisPage />} />
          <Route path="market/search" element={<SearchMandiPage />} />
          <Route path="market/details/:id" element={<MandiDetailsPage />} />
          <Route path="market/compare" element={<PriceComparisonPage />} />
          <Route path="market/history" element={<PriceHistoryPage />} />
          <Route path="market/trends" element={<MarketTrendsPage />} />

          {/* Module 6: AI Decision Engine (5 Pages) */}
          <Route path="ai/recommendation-details" element={<AIRecommendationDetailsPage />} />
          <Route path="ai/profit-calculator" element={<ProfitCalculatorPage />} />
          <Route path="ai/transport-calculator" element={<TransportCostCalculatorPage />} />
          <Route path="ai/negotiation-assistant" element={<NegotiationAssistantPage />} />
          <Route path="ai/sell-vs-wait" element={<SellVsWaitPage />} />
          <Route path="ai/model-accuracy" element={<AIModelAccuracyPage />} />

          {/* Module 7: AI Assistant & Voice */}
          <Route path="assistant/chat" element={<AIChatPage />} />
          <Route path="assistant/history" element={<AIHistoryPage />} />
          <Route path="assistant/voice" element={<VoiceAssistantPage />} />

          {/* Module 8: Agronomy & P2P Marketplace */}
          <Route path="agronomy-suite" element={<AgronomySuitePage />} />
          <Route path="marketplace" element={<MarketplacePage />} />

          {/* Module 9: Farmer History */}
          <Route path="farmer-history/sales" element={<PreviousSalesPage />} />
          <Route path="farmer-history/analytics" element={<ProfitAnalyticsPage />} />
          <Route path="farmer-history/crops" element={<CropHistoryPage />} />

          {/* Module 10: Profile & Settings */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/language" element={<LanguageSettingsPage />} />
          <Route path="settings/notifications" element={<NotificationSettingsPage />} />

          {/* Module 11: Admin Panel */}
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/crops" element={<AdminCropsPage />} />
          <Route path="admin/mandis" element={<AdminMandisPage />} />
          <Route path="admin/prices" element={<AdminPricesPage />} />
          <Route path="admin/users" element={<AdminUsersPage />} />

          {/* Fallback route redirect to Home */}
          <Route path="*" element={<Home />} />
        </Route>

        {/* Authentication Routes with Clerk Wildcards */}
        <Route path="login/*" element={<SignInPage />} />
        <Route path="signup/*" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
