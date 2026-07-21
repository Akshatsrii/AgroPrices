import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function About() {
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
      
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-navy to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1595841696677-6479c04fbc52?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Our <span className="text-green">Philosophy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            AgroPrice AI is not a crop price prediction app. It is an AI-powered Agricultural Decision Intelligence Platform. Our goal is not to predict prices, but to help farmers make better selling decisions.
          </motion.p>
        </div>
      </section>

      {/* The Problem & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-green-bg rounded-full mb-6 border border-green-light">
                <span className="text-sm font-bold text-green-dark">The Problem</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
                Data Without Direction is Useless
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-6 text-lg text-text-muted leading-relaxed">
                Indian farmers often sell crops without knowing the current market price, nearby mandi rates, transport costs, expected future prices, or net profit. This causes massive financial losses.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8 p-6 bg-gray-50 border-l-4 border-green rounded-r-xl">
                <p className="text-navy font-bold text-lg mb-2">Our Vision</p>
                <p className="text-text-muted">
                  We translate complex agricultural data, weather patterns, and market fluctuations into one simple recommendation: <span className="font-bold text-navy">"Sell tomorrow in Ramganj Mandi for maximum profit."</span>
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c32?q=80&w=1000&auto=format&fit=crop" 
                alt="Farmer looking at distance" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20 md:py-28 bg-gray-50 border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Who We Build For</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-text-muted">
              Our platform is designed to serve the entire agricultural ecosystem, starting with the farmer.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Primary Users */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:border-green transition-all duration-300 text-center group">
              <div className="w-24 h-24 mx-auto bg-green-bg rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src="/icon-primary.jpg" alt="Primary Users" className="w-full h-full object-contain rounded-xl" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-green transition-colors">Primary Users</h3>
              <p className="text-text-muted leading-relaxed">
                Small, medium, and large-scale farmers looking to maximize their net profit and eliminate guesswork.
              </p>
            </motion.div>

            {/* Secondary Users */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:border-green transition-all duration-300 text-center group">
              <div className="w-24 h-24 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src="/icon-secondary.jpg" alt="Secondary Users" className="w-full h-full object-contain rounded-xl" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-green transition-colors">Secondary Users</h3>
              <p className="text-text-muted leading-relaxed">
                Village traders, commission agents, and wholesale buyers looking for pricing intelligence.
              </p>
            </motion.div>

            {/* Future Scope */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:border-green transition-all duration-300 text-center group">
              <div className="w-24 h-24 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src="/icon-future.jpg" alt="Future Scope" className="w-full h-full object-contain rounded-xl" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-green transition-colors">Future Scope</h3>
              <p className="text-text-muted leading-relaxed">
                Government agencies, banks, and insurance companies analyzing agricultural data trends.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-extrabold text-navy mb-8">Join the Agricultural Revolution</h2>
          <Link to="/auth/signup" className="inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 bg-navy text-white hover:bg-gray-800 px-10 py-4 text-lg shadow-xl">
            Get Started Free
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
