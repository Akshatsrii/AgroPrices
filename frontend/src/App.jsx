import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MarketingLayout } from './layouts/MarketingLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Marketing Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

// Auth Pages
import { Splash } from './pages/auth/Splash';
import { Language } from './pages/auth/Language';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';

// Onboarding Pages
import { WelcomePage } from './pages/onboarding/WelcomePage';
import { FarmerProfilePage } from './pages/onboarding/FarmerProfilePage';
import { FarmDetailsPage } from './pages/onboarding/FarmDetailsPage';
import { TransportDetailsPage } from './pages/onboarding/TransportDetailsPage';
import { OnboardingSummaryPage } from './pages/onboarding/OnboardingSummaryPage';

// Module 3: Dashboard Layout & Pages
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHomePage } from './pages/dashboard/DashboardHomePage';
import { TodaysMarketPage } from './pages/dashboard/TodaysMarketPage';
import { TrendingCropsPage } from './pages/dashboard/TrendingCropsPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';

// Module 4: Sell Crop (8 Steps - Main USP Module)
import { SelectCropPage } from './pages/sell/SelectCropPage';
import { EnterQuantityPage } from './pages/sell/EnterQuantityPage';
import { SelectQualityPage } from './pages/sell/SelectQualityPage';
import { ExpectedPricePage } from './pages/sell/ExpectedPricePage';
import { TraderOfferPage } from './pages/sell/TraderOfferPage';
import { ReviewDetailsPage } from './pages/sell/ReviewDetailsPage';
import { AIAnalysisPage } from './pages/sell/AIAnalysisPage';
import { AIRecommendationPage } from './pages/sell/AIRecommendationPage';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Marketing Site */}
        <Route path="/" element={<MarketingLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Module 1: Authentication */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="splash" element={<Splash />} />
          <Route path="language" element={<Language />} />
          <Route path="login/*" element={<SignInPage />} />
          <Route path="signup/*" element={<SignUpPage />} />
        </Route>

        {/* Module 2: Onboarding Flow (5 Steps) */}
        <Route path="/onboarding/welcome" element={<WelcomePage />} />
        <Route path="/onboarding/profile" element={<FarmerProfilePage />} />
        <Route path="/onboarding/farm" element={<FarmDetailsPage />} />
        <Route path="/onboarding/transport" element={<TransportDetailsPage />} />
        <Route path="/onboarding/summary" element={<OnboardingSummaryPage />} />

        {/* Module 3: Dashboard Layout & Sub-pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="market" element={<TodaysMarketPage />} />
          <Route path="trending" element={<TrendingCropsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Module 4: Sell Crop USP Wizard (8 Pages) */}
        <Route path="/sell/crop" element={<SelectCropPage />} />
        <Route path="/sell/quantity" element={<EnterQuantityPage />} />
        <Route path="/sell/quality" element={<SelectQualityPage />} />
        <Route path="/sell/expected-price" element={<ExpectedPricePage />} />
        <Route path="/sell/trader-offer" element={<TraderOfferPage />} />
        <Route path="/sell/review" element={<ReviewDetailsPage />} />
        <Route path="/sell/ai-analysis" element={<AIAnalysisPage />} />
        <Route path="/sell/ai-recommendation" element={<AIRecommendationPage />} />

        {/* Redirect /onboarding to /onboarding/welcome */}
        <Route path="/onboarding" element={<Navigate to="/onboarding/welcome" replace />} />
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
