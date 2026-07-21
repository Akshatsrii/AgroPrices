import React from 'react';
import './Projects.css';

export function Projects() {
  const projects = [
    {
      id: 1,
      badge: "Prediction Model",
      image: "https://images.unsplash.com/photo-1592982537447-6f23f5c71c4f?auto=format&fit=crop&w=800&q=80",
      title: "Pan-India Price Prediction Engine",
      location: "Maharashtra",
      stat1: "98% Accuracy",
      year: "2023"
    },
    {
      id: 2,
      badge: "Logistics",
      image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a56?auto=format&fit=crop&w=800&q=80",
      title: "National Transport Optimizer",
      location: "New Delhi",
      stat1: "25% Cost Saved",
      year: "2023"
    },
    {
      id: 3,
      badge: "Market Data",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      title: "APMC Real-time Dashboard",
      location: "Telangana",
      stat1: "500+ Mandis",
      year: "2022"
    },
    {
      id: 4,
      badge: "Analytics",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
      title: "Crop Yield Forecasting",
      location: "Karnataka",
      stat1: "15 Crops",
      year: "2022"
    },
    {
      id: 5,
      badge: "Prediction Model",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      title: "Gujarat Coastal Supply Chain",
      location: "Gujarat",
      stat1: "95% Accuracy",
      year: "2021"
    },
    {
      id: 6,
      badge: "Logistics",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80",
      title: "Chennai Peripheral Hub Routing",
      location: "Tamil Nadu",
      stat1: "1.2M Tons",
      year: "2021"
    },
    {
      id: 7,
      badge: "Market Data",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
      title: "Rajasthan Desert Network",
      location: "Rajasthan",
      stat1: "180 Mandis",
      year: "2020"
    },
    {
      id: 8,
      badge: "Analytics",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      title: "Kolkata Demand Forecaster",
      location: "West Bengal",
      stat1: "Daily Updates",
      year: "2020"
    }
  ];

  return (
    <div className="projects-page-wrapper">
      {/* Projects Grid Section */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid-4">
            {projects.map(project => (
              <div key={project.id} className="project-card-full">
                <div className="project-img-wrapper">
                  <span className="project-pill">{project.badge}</span>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content-full">
                  <h3 className="project-card-title">{project.title}</h3>
                  <div className="project-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{project.location}</span>
                  </div>
                  <div className="project-stats-row">
                    <div className="project-stat-item text-orange">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                      <span className="text-muted text-sm font-medium ml-1">{project.stat1}</span>
                    </div>
                    <div className="project-stat-item text-orange ml-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <span className="text-muted text-sm font-medium ml-1">{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Stats Banner */}
      <section className="dark-stats-banner">
        <div className="container stats-banner-container">
          <div className="banner-stat">
            <h2 className="banner-stat-number text-orange">150<span className="text-orange">+</span></h2>
            <p className="banner-stat-text">Models Deployed</p>
          </div>
          <div className="banner-stat">
            <h2 className="banner-stat-number text-orange">2,500<span className="text-orange">+</span></h2>
            <p className="banner-stat-text">Mandis Tracked</p>
          </div>
          <div className="banner-stat">
            <h2 className="banner-stat-number text-orange">15</h2>
            <p className="banner-stat-text">States Covered</p>
          </div>
          <div className="banner-stat">
            <h2 className="banner-stat-number text-orange">₹500 Cr<span className="text-orange">+</span></h2>
            <p className="banner-stat-text">Value Delivered</p>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="clients-section">
        <div className="container text-center">
          <h2 className="clients-title">Our Clients</h2>
          
          <div className="clients-grid">
            <div className="client-box">APMC</div>
            <div className="client-box">Agmarknet</div>
            <div className="client-box">ITC e-Choupal</div>
            <div className="client-box">NAFED</div>
            <div className="client-box">State Govts</div>
            <div className="client-box">Private</div>
          </div>
        </div>
      </section>
    </div>
  );
}
