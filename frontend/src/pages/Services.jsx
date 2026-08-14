import React from 'react';
import { Link } from 'react-router-dom';

export function Services() {
  const services = [
    {
      title: "For Individual Farmers",
      desc: "Free access to live mandi prices, transport calculation, and AI recommendations for your crops.",
      badge: "Farmers",
      btnText: "Create Free Account"
    },
    {
      title: "For Village Traders",
      desc: "Bulk market intelligence and analytics to help you offer the right price to farmers.",
      badge: "Traders",
      btnText: "Trader Access"
    },
    {
      title: "For Agri Companies",
      desc: "API access to our AI decision engine and predictive models for supply chain optimization.",
      badge: "Enterprise",
      btnText: "Contact Sales"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header */}
      <section className="pt-20 pb-16 px-6 md:px-12 bg-navy text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-[700px] mx-auto">
          Tailored intelligence solutions for every level of the agricultural supply chain.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[24px] p-8 md:p-10 border border-border shadow-sm flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-green-bg rounded-2xl flex items-center justify-center text-sm font-extrabold text-green-dark uppercase tracking-wider mb-8">
                {service.badge}
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
              <p className="text-text-muted leading-relaxed mb-8 flex-1">
                {service.desc}
              </p>
              <Link to={index === 0 ? "/auth/signup" : "/contact"} className="w-full bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white px-6 py-4 rounded-xl text-[15px] font-bold transition-colors no-underline">
                {service.btnText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Banner */}
      <section className="py-20 px-6 md:px-12 border-t border-border bg-white">
        <div className="max-w-[1000px] mx-auto bg-green-dark rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green opacity-20 rounded-full blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 relative z-10">Need a Custom Enterprise Solution?</h2>
          <p className="text-lg text-green-light mb-8 max-w-[600px] mx-auto relative z-10">
            We build custom models for large-scale buyers and government agencies integrating with e-NAM.
          </p>
          <Link to="/contact" className="inline-block bg-white text-green-dark px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-transform hover:scale-105 no-underline relative z-10">
            Talk to our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
