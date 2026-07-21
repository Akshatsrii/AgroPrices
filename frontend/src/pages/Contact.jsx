import React from 'react';

export function Contact() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header */}
      <section className="pt-20 pb-16 px-6 md:px-12 bg-navy text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-300 max-w-[700px] mx-auto">
          Have a question about our AI recommendations? Want to partner with us? We'd love to hear from you.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-navy mb-8">Reach Out to Us</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center text-green-dark shrink-0">📍</div>
                <div>
                  <h4 className="text-lg font-bold text-navy mb-1">Our Office</h4>
                  <p className="text-text-muted leading-relaxed">
                    123 Agri-Tech Park, Level 4<br />
                    Pune, Maharashtra 411045<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center text-green-dark shrink-0">📞</div>
                <div>
                  <h4 className="text-lg font-bold text-navy mb-1">Phone</h4>
                  <p className="text-text-muted leading-relaxed">
                    +91 98765 43210<br />
                    <span className="text-sm italic">Mon-Sat, 9AM to 6PM</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center text-green-dark shrink-0">✉️</div>
                <div>
                  <h4 className="text-lg font-bold text-navy mb-1">Email</h4>
                  <p className="text-text-muted leading-relaxed">
                    support@agroprice.ai<br />
                    partnerships@agroprice.ai
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-navy mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  placeholder="e.g. Ramesh Kumar"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Mobile Number / Email</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  placeholder="Your contact detail"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-navy text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
