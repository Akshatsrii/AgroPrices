import React from 'react';
import './Contact.css';

export function Contact() {
  return (
    <div className="contact-page-wrapper">
      <section className="contact-hero">
        <div className="container text-center">
          <h1 className="contact-title">Get In <span className="text-orange">Touch</span></h1>
          <p className="contact-subtitle mx-auto">
            Have questions about our API, custom enterprise models, or pricing? Our dedicated team is here to help you revolutionize your agricultural workflow.
          </p>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container contact-container">
          <div className="contact-info">
            <h2 className="info-title">Contact Information</h2>
            <p className="info-desc text-muted mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4 className="font-bold">Headquarters</h4>
                <p className="text-muted text-sm mt-1">123 Tech Park, Sector 4<br/>Bengaluru, Karnataka 560001<br/>India</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-muted text-sm mt-1">+91 (800) 123-4567</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-muted text-sm mt-1">enterprise@agroprice.ai</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="Jane" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <input type="email" id="email" placeholder="jane@company.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject">
                  <option>API Integration</option>
                  <option>Custom Prediction Model</option>
                  <option>Supply Chain Auditing</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="4" placeholder="Tell us about your requirements..."></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
