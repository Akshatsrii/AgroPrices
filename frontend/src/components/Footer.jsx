import React from 'react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Column 1: Brand & Social */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="logo-icon">🌱</div>
            <div className="logo-text">
              <span className="font-bold">AgroPrice</span>
              <span className="text-sm text-muted block">AI Decision Engine</span>
            </div>
          </div>
          <p className="footer-desc text-sm text-muted mt-4">
            AgroPrice AI is a leading agricultural decision platform with deep expertise in building predictive models, transport routing, and market insights that connect farmers and drive profit.
          </p>
          <div className="social-links mt-4">
            <a href="#" className="social-icon">in</a>
            <a href="#" className="social-icon">𝕏</a>
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="footer-col">
          <h4 className="footer-heading">COMPANY</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>

        {/* Column 3: Features */}
        <div className="footer-col">
          <h4 className="footer-heading">FEATURES</h4>
          <ul className="footer-links">
            <li><a href="#">Live Mandi Data</a></li>
            <li><a href="#">AI Price Prediction</a></li>
            <li><a href="#">Transport Routing</a></li>
            <li><a href="#">Profit Calculator</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">CONTACT</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📍</span>
              <span>123 Innovation Agri-Park, Sector 4, Bhopal, Madhya Pradesh - 462001</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>+91 98765 43210</span>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <span>hello@agroprice.ai</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2026 AgroPrice AI Pvt. Ltd. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
