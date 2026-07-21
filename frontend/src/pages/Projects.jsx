import React from 'react';

export function Projects() {
  const projects = [
    {
      title: "Ramganj Mandi Integration",
      desc: "Successfully integrated real-time API feeds from one of the largest coriander markets in Asia, reducing price latency to under 2 seconds.",
      category: "Data Infrastructure",
      impact: "Benefiting 12,000+ local farmers"
    },
    {
      title: "Soybean Yield Predictor",
      desc: "Developed a custom machine learning model for the Malwa region that correlates historical weather patterns with local soybean prices.",
      category: "AI & Machine Learning",
      impact: "89% prediction accuracy"
    },
    {
      title: "Vernacular Voice Bot",
      desc: "Launched a voice-first WhatsApp bot allowing farmers to ask 'Aaj ka bhav kya hai?' in Hindi and Marathi and receive instant AI recommendations.",
      category: "Accessibility",
      impact: "Used by 45,000+ non-smartphone users"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header */}
      <section className="pt-20 pb-16 px-6 md:px-12 bg-green-bg border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-green-dark text-[13px] font-semibold py-2 px-[18px] rounded-full mb-6 shadow-sm border border-border">
            Our Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy mb-6">Success Stories & Projects</h1>
          <p className="text-xl text-text-muted max-w-[700px]">
            Explore how AgroPrice AI is transforming the agricultural landscape through data, AI, and accessibility.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-navy relative overflow-hidden">
                <div className="absolute inset-0 bg-green opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded">
                  {project.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-navy mb-4">{project.title}</h3>
                <p className="text-text-muted leading-relaxed mb-6 flex-1">{project.desc}</p>
                <div className="pt-6 border-t border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-bg flex items-center justify-center text-green-dark">📈</div>
                  <span className="text-sm font-semibold text-navy">{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
