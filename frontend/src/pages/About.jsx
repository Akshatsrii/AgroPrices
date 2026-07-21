import React from 'react';

export function About() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 md:px-12 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">About AgroPrice AI</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-[800px] mx-auto leading-relaxed">
            We are not just a crop price portal. We are an AI-powered agricultural decision intelligence platform built for the Indian farmer.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-bg text-green-dark text-[13px] font-semibold py-2 px-[18px] rounded-full mb-6">
              Our Philosophy
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-6 leading-tight">Data is useless without decisions.</h2>
            <p className="text-lg text-text-muted mb-6 leading-relaxed">
              Most platforms simply show "Today's Mandi Price = ₹18/kg". That doesn't help a farmer who wants ₹25/kg. It leaves them confused.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              Our philosophy is simple: <strong className="text-navy">Never show raw data when you can provide a direct recommendation.</strong> AgroPrice AI calculates transport costs, predicts future trends, and compares village trader offers against nearby mandis to give a single, actionable instruction.
            </p>
          </div>
          <div className="bg-green-bg p-8 md:p-12 rounded-[24px] border border-border">
            <h3 className="text-2xl font-bold text-navy mb-6">The Real Problem We Solve</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-red-500 font-bold">❌</span>
                <span className="text-text-muted">Farmers don't know the exact transport cost to distant mandis.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-red-500 font-bold">❌</span>
                <span className="text-text-muted">Farmers sell blindly to village traders due to lack of market intelligence.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-red-500 font-bold">❌</span>
                <span className="text-text-muted">Farmers don't know if waiting 2 days will increase profits.</span>
              </li>
            </ul>
            <div className="mt-8 pt-8 border-t border-green-light">
              <h4 className="font-bold text-green-dark mb-4">Our AI Solution</h4>
              <p className="text-navy font-semibold italic text-lg">"Wait 2 days and sell in Ramganj Mandi for ₹1,450 net extra profit."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 border-y border-border">
        <div className="max-w-[1280px] mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Who Is This For?</h2>
          <p className="text-lg text-text-muted">Built primarily for the backbone of India, but scalable for the entire ecosystem.</p>
        </div>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
            <div className="w-16 h-16 bg-green-bg rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">👨🏽‍🌾</div>
            <h3 className="text-xl font-bold text-navy mb-2">Primary Users</h3>
            <p className="text-text-muted">Small, medium, and large-scale farmers looking to maximize their harvest profits.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🏬</div>
            <h3 className="text-xl font-bold text-navy mb-2">Secondary Users</h3>
            <p className="text-text-muted">Village traders, commission agents, and wholesale buyers managing supply chains.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🏛️</div>
            <h3 className="text-xl font-bold text-navy mb-2">Future Scope</h3>
            <p className="text-text-muted">Government agencies, banks, insurance companies, and food processing units.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
