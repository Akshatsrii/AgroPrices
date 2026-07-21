import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Footer } from '../components/Footer';

export function MarketingLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="app-layout">
      {/* Reference Image Navbar */}
      <nav className="top-nav">
        <div className="container nav-container">
          {/* Logo (Left) */}
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
            <div className="logo-icon-small">🌱</div>
            <div className="logo-text">
              <span className="logo-title">AgroPrice</span>
              <span className="logo-subtitle">AI Decision Platform</span>
            </div>
          </Link>

          {/* Links (Center) */}
          <div className="nav-links">
            <Link 
              to="/"
              className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/features"
              className={`nav-link ${currentPath === '/features' ? 'active' : ''}`}
            >
              Features
            </Link>
            <Link 
              to="/projects"
              className={`nav-link ${currentPath === '/projects' ? 'active' : ''}`}
            >
              Projects
            </Link>
            <Link 
              to="/services"
              className={`nav-link ${currentPath === '/services' ? 'active' : ''}`}
            >
              Services
            </Link>
            <Link 
              to="/contact"
              className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* CTA (Right) */}
          <div className="nav-cta" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <SignedOut>
              <Link to="/auth/login" className="nav-link" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>Login / Sign In</Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
