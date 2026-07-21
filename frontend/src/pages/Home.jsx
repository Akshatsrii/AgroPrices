import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Home() {
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
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50 to-white overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
          </svg>
        </div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy/5 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 pt-24 md:pt-32 pb-12 md:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-green-bg rounded-full mb-6 border border-green-light shadow-sm">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-dark">AI-Powered Decision Engine</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-navy leading-tight tracking-tight">
                Don't Just Sell.<br />
                <span className="text-green">Sell Smart.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="mt-4 md:mt-6 text-base md:text-lg text-text-muted leading-relaxed max-w-[500px]">
                Most farmers sell their crop without knowing the best price, the nearest mandi, or tomorrow's trend. AgroPrice AI compares every option and tells you exactly what to do.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-green-bg to-white border-l-4 border-green rounded-r-xl shadow-sm">
                <p className="text-base md:text-lg font-semibold text-navy italic">
                  "Sell tomorrow in Ramganj Mandi — ₹1,450 more profit."
                </p>
                <p className="mt-2 text-xs md:text-sm text-text-muted">
                  That's a real AI recommendation, not just a price number.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/auth/signup" className="inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 bg-navy text-white hover:bg-gray-800 px-8 py-4 text-lg shadow-lg">
                  Get My Recommendation
                </Link>
                <Link to="/features" className="inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg">
                  See How It Works
                </Link>
              </motion.div>
              
            </motion.div>
            
            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mt-10 lg:mt-0"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/hero-farmer-premium.jpg" 
                  alt="Indian farmer using smartphone" 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-navy/10"></div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-bg rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-black text-navy leading-none mb-1">50,000+</p>
                  <p className="text-sm font-semibold text-text-muted">Farmers Trust Us</p>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-navy">1.2<span className="text-green">M+</span></div>
              <p className="mt-2 text-text-muted font-semibold">Live Mandi Prices</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-navy">92<span className="text-green">%</span></div>
              <p className="mt-2 text-text-muted font-semibold">Prediction Accuracy</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-navy">80<span className="text-green">+</span></div>
              <p className="mt-2 text-text-muted font-semibold">Crops Tracked</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-navy">₹15<span className="text-green">Cr</span></div>
              <p className="mt-2 text-text-muted font-semibold">Extra Profit Generated</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">How We Empower You</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-text-muted">
              We translate complex agricultural data, weather patterns, and market fluctuations into one simple recommendation.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-white overflow-hidden relative">
              <div className="w-20 h-20 bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-chart.jpg" alt="Market Chart" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">Live Mandi Prices</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Instant access to verified rates from every APMC market across India. Know what your crop is worth right now.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-white overflow-hidden relative">
              <div className="w-20 h-20 bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-ai.jpg" alt="AI Brain" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">AI Price Prediction</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Our machine learning models forecast tomorrow's trends so you know whether to sell today or hold for better profits.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="group p-8 rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-white overflow-hidden relative">
              <div className="w-20 h-20 bg-white shadow-md rounded-2xl border border-border mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/icon-truck.jpg" alt="Logistics Truck" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy group-hover:text-green transition-colors">Transport & Profit Calculator</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                We calculate exact transport and commission costs, showing you the true net profit for every selling option.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Featured Projects / Success Stories */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Success Stories</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-text-muted">
              See how data intelligence is transforming the agricultural landscape across India.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            {/* Story 1 */}
            <motion.div variants={fadeInUp} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop" 
                  alt="Wheat Farm" 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/30 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-navy text-xs font-bold rounded-full">Wheat</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy group-hover:text-green transition-colors">Punjab Yield Optimization</h3>
                <div className="mt-2 text-sm text-text-muted font-medium">Ludhiana</div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                  <span className="font-bold text-green">+₹12,000 Profit</span>
                </div>
              </div>
            </motion.div>

            {/* Story 2 */}
            <motion.div variants={fadeInUp} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop" 
                  alt="Soybean Farm" 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/30 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-navy text-xs font-bold rounded-full">Soybean</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy group-hover:text-green transition-colors">Malwa AI Prediction</h3>
                <div className="mt-2 text-sm text-text-muted font-medium">Indore</div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                  <span className="font-bold text-green">94% Accuracy</span>
                </div>
              </div>
            </motion.div>

            {/* Story 3 */}
            <motion.div variants={fadeInUp} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=800&auto=format&fit=crop" 
                  alt="Onion Market" 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/30 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-navy text-xs font-bold rounded-full">Onion</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy group-hover:text-green transition-colors">Lasalgaon Network</h3>
                <div className="mt-2 text-sm text-text-muted font-medium">Nashik</div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                  <span className="font-bold text-green">2s Data Latency</span>
                </div>
              </div>
            </motion.div>

            {/* Story 4 */}
            <motion.div variants={fadeInUp} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1595841696677-6479c04fbc52?q=80&w=800&auto=format&fit=crop" 
                  alt="Cotton Field" 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/30 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-navy text-xs font-bold rounded-full">Cotton</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy group-hover:text-green transition-colors">Trader Negotiation</h3>
                <div className="mt-2 text-sm text-text-muted font-medium">Nagpur</div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                  <span className="font-bold text-green">+₹500/Quintal</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-navy leading-tight">Why Choose AgroPrice AI?</motion.h2>
              <motion.p variants={fadeInUp} className="mt-6 text-lg text-text-muted leading-relaxed">
                We are moving away from gut-feeling sales. By using artificial intelligence to analyze thousands of data points, we put the power of negotiation back into the hands of the farmer.
              </motion.p>
              
              <div className="mt-10 space-y-8">
                <motion.div variants={fadeInUp} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-green-dark">🇮🇳</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-navy">Built for Bharat</h3>
                    <p className="mt-2 text-text-muted">Vernacular language support and optimized for slow internet connections in rural areas.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-green-dark">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-navy">Zero Guesswork</h3>
                    <p className="mt-2 text-text-muted">Stop wondering if you got a good price. Get hard data and AI confidence scores before you sell.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-green-dark">🆓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-navy">100% Free for Farmers</h3>
                    <p className="mt-2 text-text-muted">Core decision intelligence features are completely free for individual farmers forever.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
                <img 
                  src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1000&auto=format&fit=crop" 
                  alt="Happy Indian Farmer" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-xl font-bold italic">"AgroPrice AI helped me negotiate ₹400 extra per quintal with my local trader."</p>
                  <p className="text-green-light mt-2 font-semibold">— Ramesh Singh, Wheat Farmer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Make Smarter Decisions?</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              Join the thousands of smart farmers who have stopped guessing and started profiting. Set up your profile and get your first AI recommendation in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/auth/signup" className="inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 bg-green text-white hover:bg-green-dark px-10 py-4 text-lg shadow-[0_0_20px_rgba(22,163,74,0.4)]">
                Create Free Account
              </Link>
              <Link to="/auth/login" className="inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 border-2 border-white text-white hover:bg-white hover:text-navy px-10 py-4 text-lg">
                Login to Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
