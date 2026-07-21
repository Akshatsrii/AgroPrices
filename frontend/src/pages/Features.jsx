import React from 'react';
import './Features.css';

export function Features() {
  const features = [
    {
      id: 1,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>,
      title: "Real-time Mandi Feeds",
      description: "Direct integration with APMC and Agmarknet for sub-second updates on crop prices across India."
    },
    {
      id: 2,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
      title: "Predictive Analytics",
      description: "Machine learning models forecasting price trends up to 6 months in advance with 95%+ accuracy."
    },
    {
      id: 3,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
      title: "Logistics Optimization",
      description: "Smart routing algorithms that reduce transport costs and minimize post-harvest spoilage."
    },
    {
      id: 4,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
      title: "Vernacular Support",
      description: "Accessible to all farmers with native support for 12+ regional Indian languages."
    },
    {
      id: 5,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
      title: "Yield Estimation",
      description: "Satellite imagery and soil data combined to give accurate pre-harvest yield estimations."
    },
    {
      id: 6,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
      title: "Custom Dashboards",
      description: "Tailored analytics views for traders, government officials, and enterprise clients."
    }
  ];

  return (
    <div className="features-page-wrapper">
      <section className="features-hero">
        <div className="container text-center">
          <span className="section-badge">Platform Capabilities</span>
          <h1 className="features-hero-title">Powered by <span className="text-orange">Advanced AI</span></h1>
          <p className="features-hero-subtitle mx-auto">
            AgroPrice AI provides a comprehensive suite of tools designed to remove the guesswork from agricultural economics.
          </p>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="container">
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card-modern">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-highlight-section">
        <div className="container highlight-container">
          <div className="highlight-content">
            <h2 className="highlight-title">Seamless Integration</h2>
            <p className="highlight-desc">
              Our platform is built API-first. Whether you're a government body looking to integrate live prices into an existing portal, or an enterprise managing a nationwide supply chain, our endpoints are secure, fast, and scalable.
            </p>
            <ul className="highlight-list">
              <li><span className="text-orange font-bold mr-2">✔</span> RESTful & GraphQL APIs</li>
              <li><span className="text-orange font-bold mr-2">✔</span> Webhook Subscriptions</li>
              <li><span className="text-orange font-bold mr-2">✔</span> 99.99% Uptime SLA</li>
            </ul>
          </div>
          <div className="highlight-image">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" alt="Data Dashboard" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
