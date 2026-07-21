import React from 'react';
import './Services.css';

export function Services() {
  const services = [
    {
      id: 1,
      title: "Market Feeds Integration",
      desc: "Connect your enterprise ERP or regional dashboard directly to our high-frequency live mandi feeds.",
      icon: "📡"
    },
    {
      id: 2,
      title: "Custom AI Models",
      desc: "Need to predict yield for a specific exotic crop? We train custom machine learning models tailored to your exact geographical requirements.",
      icon: "🧠"
    },
    {
      id: 3,
      title: "Supply Chain Auditing",
      desc: "Our team of analysts will review your current transport logistics and identify bottlenecks to reduce post-harvest waste.",
      icon: "📊"
    },
    {
      id: 4,
      title: "Government Reporting",
      desc: "Automated generation of compliance and agricultural forecasting reports for state and central government bodies.",
      icon: "📑"
    }
  ];

  return (
    <div className="services-page-wrapper">
      <section className="services-hero">
        <div className="container text-center">
          <h1 className="services-title">Specialized <span className="text-orange">Services</span></h1>
          <p className="services-subtitle mx-auto">
            Beyond our core platform, AgroPrice AI offers bespoke consulting, integration, and auditing services to ensure you get the absolute most out of your agricultural data.
          </p>
        </div>
      </section>

      <section className="services-list-section">
        <div className="container">
          <div className="services-grid-list">
            {services.map(service => (
              <div key={service.id} className="service-list-card">
                <div className="service-list-icon">{service.icon}</div>
                <div className="service-list-content">
                  <h3 className="service-list-title">{service.title}</h3>
                  <p className="service-list-desc text-muted">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container text-center">
          <h2 className="cta-title">Need a Custom Solution?</h2>
          <p className="cta-desc mx-auto">Our engineering team is ready to build tailored agricultural pipelines for your unique enterprise challenges.</p>
          <button className="btn btn-primary mt-6">Contact Our Sales Team</button>
        </div>
      </section>
    </div>
  );
}
