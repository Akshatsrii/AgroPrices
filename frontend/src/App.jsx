import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';

// Layouts
import { MarketingLayout } from './layouts/MarketingLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Marketing Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

// Onboarding
import { LocationPage } from './pages/onboarding/LocationPage';
import { CropSelectionPage } from './pages/onboarding/CropSelectionPage';

// Auth Pages
import { Splash } from './pages/auth/Splash';
import { Language } from './pages/auth/Language';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';

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

        {/* Authentication & Onboarding Splash */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="splash" element={<Splash />} />
          <Route path="language" element={<Language />} />
          <Route path="login/*" element={<SignInPage />} />
          <Route path="signup/*" element={<SignUpPage />} />
        </Route>

        {/* Onboarding Flow */}
        <Route 
          path="/onboarding/location" 
          element={
            <SignedIn>
              <LocationPage />
            </SignedIn>
          } 
        />
        <Route 
          path="/onboarding/crop" 
          element={
            <SignedIn>
              <CropSelectionPage />
            </SignedIn>
          } 
        />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <SignedIn>
              <div className="min-h-screen flex items-center justify-center bg-gray-50 text-navy font-bold text-2xl">
                Dashboard Coming Soon...
              </div>
            </SignedIn>
          } 
        />

        {/* Redirect /onboarding to /onboarding/location */}
        <Route path="/onboarding" element={<Navigate to="/onboarding/location" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
