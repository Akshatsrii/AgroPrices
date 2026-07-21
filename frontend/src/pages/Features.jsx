import React from 'react';
import { Link } from 'react-router-dom';

export function Features() {
  const features = [
    {
      title: "Live Mandi Prices",
      desc: "Real-time fetched data from all major APMC markets across India.",
      icon: "📊",
      color: "bg-blue-50"
    },
    {
      title: "AI Price Prediction",
      desc: "Machine learning models forecasting tomorrow's trends based on weather and historical data.",
      icon: "🤖",
      color: "bg-green-bg"
    },
    {
      title: "Profit Calculator",
      desc: "Instantly compare multiple selling options to see your actual net profit.",
      icon: "💰",
      color: "bg-amber-50"
    },
    {
      title: "Transport Cost Estimator",
      desc: "Calculates the exact diesel and freight cost to transport your specific quantity.",
      icon: "🚚",
      color: "bg-purple-50"
    },
    {
      title: "AI Negotiation Assistant",
      desc: "Provides counter-offers and market facts to negotiate better with village traders.",
      icon: "🤝",
      color: "bg-rose-50"
    },
    {
      title: "Decision Score",
      desc: "A single 0-100 score indicating how confident the AI is in a selling recommendation.",
      icon: "⭐",
      color: "bg-emerald-50"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header */}
      <section className="pt-20 pb-16 px-6 md:px-12 bg-green-bg border-b border-border text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-navy mb-4">Core Features</h1>
        <p className="text-xl text-text-muted max-w-[700px] mx-auto">
          Everything you need to make the most profitable selling decision for your harvest.
        </p>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl border border-border hover:shadow-xl transition-shadow bg-white flex flex-col items-start group">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed flex-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-navy text-white text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to see these features in action?</h2>
          <Link to="/auth/signup" className="inline-block bg-green hover:bg-green-dark text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-colors no-underline">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
