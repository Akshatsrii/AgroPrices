import React from 'react';
import './About.css';

export function About() {
  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container about-container">
          
          <div className="about-content">
            <div className="about-badge">
              About AgroPrice AI
            </div>
            
            <h1 className="about-title">
              Building Agriculture's <br/>
              Intelligence <br/>
              <span className="text-orange">Since 2018</span>
            </h1>
            
            <p className="about-desc">
              AgroPrice AI is one of India's leading agricultural decision engines, with a proven track record of delivering world-class market insights, price predictions, and transport optimization that connect farmers and drive economic growth.
            </p>
            
            <p className="about-desc">
              Established in 2018, we have grown from a small analytical tool to a national powerhouse tracking over 2,500 mandis. Our commitment to accuracy, reliability, and timely data has earned us the trust of government bodies and private enterprises alike.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80" alt="Agriculture Field" className="about-img" />
          </div>
          
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission-section">
        <div className="container vision-mission-container">
          <div className="vm-card vision-card">
            <div className="vm-icon-wrapper-dark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <h2 className="vm-title">Our Vision</h2>
            <p className="vm-desc">To be India's most trusted agricultural intelligence platform, empowering farmers with data-driven insights and revolutionizing the food supply chain for generations to come.</p>
          </div>
          
          <div className="vm-card mission-card">
            <div className="vm-icon-wrapper-light">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h2 className="vm-title text-primary">Our Mission</h2>
            <p className="vm-desc text-muted">To deliver real-time, accurate market pricing and transport optimization through innovative AI. We aim to maximize profitability for farmers while contributing to a sustainable agricultural ecosystem.</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values-section">
        <div className="container text-center">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle mx-auto" style={{maxWidth: '600px'}}>The principles that guide everything we do at AgroPrice AI.</p>
          
          <div className="values-grid">
            <div className="value-card text-left">
              <div className="value-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
              <h4 className="font-bold mb-2">Accuracy Excellence</h4>
              <p className="text-sm text-muted">We never compromise on data precision. Every predictive model meets the highest standards of reliability.</p>
            </div>
            <div className="value-card text-left">
              <div className="value-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
              <h4 className="font-bold mb-2">Farmer First</h4>
              <p className="text-sm text-muted">The prosperity of our farmers is our top priority in every solution we develop and deploy.</p>
            </div>
            <div className="value-card text-left">
              <div className="value-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line></svg></div>
              <h4 className="font-bold mb-2">Innovation</h4>
              <p className="text-sm text-muted">We embrace cutting-edge AI and machine learning to deliver faster, smarter agricultural insights.</p>
            </div>
            <div className="value-card text-left">
              <div className="value-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
              <h4 className="font-bold mb-2">Sustainability</h4>
              <p className="text-sm text-muted">We are committed to reducing waste and promoting environmentally responsible transport practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="journey-section">
        <div className="container text-center">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle mx-auto" style={{maxWidth: '600px'}}>Key milestones that have shaped our growth and established us as a leader in agricultural intelligence.</p>
          
          <div className="timeline">
            {/* Item 1 */}
            <div className="timeline-item left">
              <div className="timeline-content">
                <span className="timeline-year">2018</span>
                <h4 className="font-bold mt-2">Company Founded</h4>
                <p className="text-sm text-muted mt-1">AgroPrice AI was established with a vision to transform agricultural decision-making.</p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="timeline-item right">
              <div className="timeline-content">
                <span className="timeline-year">2020</span>
                <h4 className="font-bold mt-2">First AI Prediction Engine</h4>
                <p className="text-sm text-muted mt-1">Launched our first live price prediction model across 500 mandis.</p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="timeline-item left">
              <div className="timeline-content">
                <span className="timeline-year">2022</span>
                <h4 className="font-bold mt-2">Pan-India Expansion</h4>
                <p className="text-sm text-muted mt-1">Expanded operations to 15 states with real-time transport optimization.</p>
              </div>
            </div>
            {/* Item 4 */}
            <div className="timeline-item right">
              <div className="timeline-content">
                <span className="timeline-year">2024</span>
                <h4 className="font-bold mt-2">2,500+ Mandis Tracked</h4>
                <p className="text-sm text-muted mt-1">Crossed the landmark of tracking 2,500+ agricultural markets.</p>
              </div>
            </div>
            {/* Item 5 */}
            <div className="timeline-item left">
              <div className="timeline-content">
                <span className="timeline-year">2025</span>
                <h4 className="font-bold mt-2">Global Recognition</h4>
                <p className="text-sm text-muted mt-1">Awarded for excellence in AI-driven agricultural solutions and data precision.</p>
              </div>
            </div>
            {/* Item 6 */}
            <div className="timeline-item right">
              <div className="timeline-content">
                <span className="timeline-year">2026</span>
                <h4 className="font-bold mt-2">Green Logistics</h4>
                <p className="text-sm text-muted mt-1">Launched sustainable transport routing to minimize carbon footprint across all operations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
