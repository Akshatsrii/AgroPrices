import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Features() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-white font-sans text-navy overflow-x-hidden">
      
      {/* Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-navy to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1595841696677-6479c04fbc52?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Core <span className="text-green">Features</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to make the most profitable selling decision for your harvest.
          </motion.p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative text-center">
              <div className="w-24 h-24 mx-auto bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-chart.jpg" alt="Market Chart" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">Live Mandi Prices</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Real-time fetched data from all major APMC markets across India.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative text-center">
              <div className="w-24 h-24 mx-auto bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-ai.jpg" alt="AI Brain" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">AI Price Prediction</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Machine learning models forecasting tomorrow's trends based on weather and historical data.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative text-center">
              <div className="w-24 h-24 mx-auto bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-profit.jpg" alt="Profit Calculator" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">Profit Calculator</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Instantly compare multiple selling options to see your actual net profit.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative text-center">
              <div className="w-24 h-24 mx-auto bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-truck.jpg" alt="Transport" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">Transport Cost Estimator</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Calculates the exact diesel and freight cost to transport your specific quantity.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative text-center">
              <div className="w-24 h-24 mx-auto bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-handshake.jpg" alt="Negotiation Assistant" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">AI Negotiation Assistant</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Provides counter-offers and market facts to negotiate better with village traders.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative text-center">
              <div className="w-24 h-24 mx-auto bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-score.jpg" alt="Decision Score" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">Decision Score</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                A single 0-100 score indicating how confident the AI is in a selling recommendation.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-extrabold text-navy mb-8">Ready to see these features in action?</h2>
          <Link to="/auth/signup" className="inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 bg-green text-white hover:bg-green-dark px-10 py-4 text-lg shadow-xl">
            Get Started for Free
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
