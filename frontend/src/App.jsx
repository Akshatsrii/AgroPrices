import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarketingLayout } from './layouts/MarketingLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Marketing Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Features } from './pages/Features';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

// Auth Pages (will be created next)
import { Splash } from './pages/auth/Splash';
import { Language } from './pages/auth/Language';
import { Login } from './pages/auth/Login';
import { OTP } from './pages/auth/OTP';
import { Signup } from './pages/auth/Signup';
import { ResetPin } from './pages/auth/ResetPin';

import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Authentication Routes (Module 1) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="splash" element={<Splash />} />
          <Route path="language" element={<Language />} />
          <Route path="login" element={<Login />} />
          <Route path="otp" element={<OTP />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-pin" element={<ResetPin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
