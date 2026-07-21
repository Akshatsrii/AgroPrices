import React, { useState } from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Features } from './pages/Features'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import { Footer } from './components/Footer'
import './index.css'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app-layout">
      {/* Reference Image Navbar */}
      <nav className="top-nav">
        <div className="container nav-container">
          {/* Logo (Left) */}
          <div className="nav-logo" onClick={() => setCurrentPage('home')}>
            <div className="logo-icon-small">🌱</div>
            <div className="logo-text">
              <span className="logo-title">AgroPrice</span>
              <span className="logo-subtitle">AI Decision Platform</span>
            </div>
          </div>

          {/* Links (Center) */}
          <div className="nav-links">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentPage('about')}
            >
              About Us
            </button>
            <button 
              className={`nav-link ${currentPage === 'features' ? 'active' : ''}`}
              onClick={() => setCurrentPage('features')}
            >
              Features
            </button>
            <button 
              className={`nav-link ${currentPage === 'projects' ? 'active' : ''}`}
              onClick={() => setCurrentPage('projects')}
            >
              Projects
            </button>
            <button 
              className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
              onClick={() => setCurrentPage('services')}
            >
              Services
            </button>
            <button 
              className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => setCurrentPage('contact')}
            >
              Contact
            </button>
          </div>

          {/* CTA (Right) */}
          <div className="nav-cta" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="nav-link" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>Login / Sign In</button>
            <button className="btn btn-primary" onClick={() => setCurrentPage('home')}>Get a Quote</button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="main-content">
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
        {currentPage === 'features' && <Features />}
        {currentPage === 'projects' && <Projects />}
        {currentPage === 'services' && <Services />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
