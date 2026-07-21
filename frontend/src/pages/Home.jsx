import React from 'react';
import './Home.css';

export function Home() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container hero-container">
          
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              25+ Years of Excellence
            </div>
            
            <h1 className="hero-title">
              Building Intelligence That <br/><span className="text-accent">Connects Farmers</span>
            </h1>
            
            <p className="hero-subtitle">
              AgroPrice AI is a premier agricultural decision engine specializing in 
              market insights, price predictions, and transport optimization. We deliver 
              world-class solutions that stand the test of time.
            </p>
            
            <div className="hero-quote-box">
              <p className="quote-text font-bold italic">"Building Tomorrow's Agriculture, Today"</p>
              <p className="quote-subtext text-sm text-muted">Connecting farmers, driving progress, building the future.</p>
            </div>
            
            <div className="hero-actions">
              <button className="btn btn-primary">View Our Solutions</button>
              <button className="btn btn-outline-dark">Get In Touch</button>
            </div>
            
            {/* Added checkmarks from the image reference */}
            <div className="hero-trust-badges mt-6 flex gap-6">
              <span className="flex items-center gap-2 text-sm text-muted font-medium"><span className="text-accent font-bold">✔</span> ISO Certified</span>
              <span className="flex items-center gap-2 text-sm text-muted font-medium"><span className="text-accent font-bold">✔</span> Govt. Approved</span>
            </div>
          </div>

          <div className="hero-graphic-container">
            <div className="hero-image-wrapper">
               <img src="https://images.unsplash.com/photo-1592982537447-6f23f5c71c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Farmer looking at sunset" className="hero-img" />
              {/* Floating Stat Card */}
              <div className="floating-stat-card">
                <div className="stat-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">2,500+</h4>
                  <p className="text-sm text-muted">Mandis Tracked</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-container">
          <div className="stat-box">
            <h2>25<span className="text-accent">+</span></h2>
            <p>Years of Experience</p>
          </div>
          <div className="stat-box">
            <h2>2,500<span className="text-accent">+</span></h2>
            <p>Mandis Tracked</p>
          </div>
          <div className="stat-box">
            <h2>150<span className="text-accent">+</span></h2>
            <p>Projects Completed</p>
          </div>
          <div className="stat-box">
            <h2>50<span className="text-accent">+</span></h2>
            <p>Major Clients</p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <div className="container text-center">
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle mx-auto" style={{maxWidth: '800px'}}>
            From live market rates to transport optimization, we deliver comprehensive agricultural solutions that meet the highest standards of accuracy and profit.
          </p>

          <div className="services-grid mt-6">
            <div className="service-card">
              <div className="service-icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              </div>
              <h3 className="font-bold">Live Market Data</h3>
              <p className="text-muted text-sm">We specialize in building world-class models that connect farmers to live mandi rates. Our systems are engineered for accuracy, speed, and reliability.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <h3 className="font-bold">AI Price Prediction</h3>
              <p className="text-muted text-sm">Transforming agricultural landscapes with modern algorithms that ease decision making and improve net profits. We design solutions tailored to your unique needs.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="font-bold text-accent">Transport Routing</h3>
              <p className="text-muted text-sm">Engineering remarkable routing logic that overcomes geographical challenges. Our transport estimator is built to last, with aesthetic designs that complement your workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section bg-surface">
        <div className="container text-center">
          <h2 className="section-title">Featured Features</h2>
          <p className="section-subtitle mx-auto" style={{maxWidth: '800px'}}>
            Explore some of our landmark agricultural features that have transformed connectivity across India.
          </p>

          <div className="projects-grid mt-6">
            <div className="project-card">
              <div className="project-img-wrapper">
                <span className="project-badge">Dashboard</span>
                <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dashboard" />
              </div>
              <div className="project-content">
                <h3 className="font-bold">Smart Decision Engine</h3>
                <p className="project-location text-muted text-sm"><span className="icon">📍</span> Pan-India</p>
                <div className="project-meta text-accent text-sm font-bold">
                  <span>📈 +20% Profit</span>
                  <span className="ml-4">📅 2026</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-wrapper">
                <span className="project-badge">Maps</span>
                <img src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Transport" />
              </div>
              <div className="project-content">
                <h3 className="font-bold">Geo-Routing System</h3>
                <p className="project-location text-muted text-sm"><span className="icon">📍</span> Madhya Pradesh</p>
                <div className="project-meta text-accent text-sm font-bold">
                  <span>📈 50km radius</span>
                  <span className="ml-4">📅 2025</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-wrapper">
                <span className="project-badge">Mobile App</span>
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Mobile" />
              </div>
              <div className="project-content">
                <h3 className="font-bold">Vernacular Chatbot</h3>
                <p className="project-location text-muted text-sm"><span className="icon">📍</span> Maharashtra</p>
                <div className="project-meta text-accent text-sm font-bold">
                  <span>📈 5 Languages</span>
                  <span className="ml-4">📅 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="container why-choose-container">
          
          <div className="why-content">
            <h2 className="section-title">Why Choose AgroPrice AI?</h2>
            <p className="section-subtitle">
              With over two decades of experience in tech, we have built a reputation for delivering data on time, within budget, and exceeding quality expectations.
            </p>
            
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="font-bold">Government Approved Data</h4>
                  <p className="text-sm text-muted">Registered with APMC, Agmarknet, and NHAI for all categories of works.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="font-bold">Modern Cloud Fleet</h4>
                  <p className="text-sm text-muted">State-of-the-art machinery and equipment for efficient AI execution.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="font-bold">Experienced Team</h4>
                  <p className="text-sm text-muted">Over 500 skilled engineers and technicians with decades of experience.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="font-bold">Quality Assurance</h4>
                  <p className="text-sm text-muted">ISO 9001:2015 certified with rigorous quality control at every stage.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6 mt-8">
              <span className="flex items-center gap-2 text-sm text-muted"><span className="text-accent font-bold">✔</span> ISO Certified</span>
              <span className="flex items-center gap-2 text-sm text-muted"><span className="text-accent font-bold">✔</span> Govt. Approved</span>
            </div>
          </div>
          
          <div className="why-image-wrapper">
             <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Agriculture field" className="why-image-real" />
          </div>

        </div>
      </section>

    </div>
  );
}
