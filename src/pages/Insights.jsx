import React, { useState } from "react";
import { DUMMY_INSIGHTS, DUMMY_ALERTS } from "../data/dummyData";
import InsightCard from "../components/ai/InsightCard";
import AlertBox from "../components/ai/AlertBox";
import { CROPS_LIST } from "../data/cropsList";

const CATEGORIES = ["All", "Market Trend", "Weather Alert", "Policy Update", "Export News"];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCrop,     setActiveCrop]     = useState("All");
  const [search,         setSearch]         = useState("");

  const topCrops = CROPS_LIST.slice(0, 8);

  const filtered = DUMMY_INSIGHTS.filter((ins) => {
    const matchCat  = activeCategory === "All" || ins.category === activeCategory;
    const matchCrop = activeCrop === "All" || ins.crops?.includes(activeCrop.toLowerCase());
    const matchSearch =
      !search ||
      ins.title.toLowerCase().includes(search.toLowerCase()) ||
      ins.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchCrop && matchSearch;
  });

  return (
    <div className="page-container space-y-8">
      {/* Header */}
      <div>
        <h1 className="section-title">Market Insights</h1>
        <p className="text-sm text-forest-500 mt-1">
          AI-curated news, policy updates, and weather advisories relevant to Indian crop markets.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-5">
          {/* Filters */}
          <div className="card space-y-3">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              <input
                type="text"
                placeholder="Search insights…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                    activeCategory === cat
                      ? "bg-forest-600 text-cream border-forest-600"
                      : "bg-white text-forest-600 border-forest-200 hover:bg-forest-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Crop filter */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-forest-50">
              <button
                onClick={() => setActiveCrop("All")}
                className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                  activeCrop === "All"
                    ? "bg-amber-400 text-forest-900 font-semibold"
                    : "text-forest-500 hover:bg-forest-50"
                }`}
              >
                All Crops
              </button>
              {topCrops.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCrop(c.name)}
                  className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 transition-all ${
                    activeCrop === c.name
                      ? "bg-amber-400 text-forest-900 font-semibold"
                      : "text-forest-500 hover:bg-forest-50"
                  }`}
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-forest-500 font-medium">
            {filtered.length} insight{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in "${activeCategory}"`}
          </p>

          {/* Insight cards */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((ins) => (
                <InsightCard key={ins.id} insight={ins} />
              ))}
            </div>
          ) : (
            <div className="card flex flex-col items-center py-14 text-center">
              <span className="text-4xl mb-3">📭</span>
              <p className="font-semibold text-forest-800 mb-1">No insights found</p>
              <p className="text-sm text-forest-500">Try adjusting your filters.</p>
              <button
                onClick={() => { setActiveCategory("All"); setActiveCrop("All"); setSearch(""); }}
                className="btn-outline text-sm mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Load more (static) */}
          {filtered.length > 0 && (
            <div className="text-center">
              <button className="btn-outline text-sm">
                Load More Insights
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Alerts */}
          <AlertBox />

          {/* Quick stats */}
          <div className="card">
            <h3 className="font-semibold text-forest-900 mb-4">📊 Market Snapshot</h3>
            <div className="space-y-3">
              {[
                { label: "Crops with +5% gain",  value: "8",  color: "text-forest-600" },
                { label: "Crops below MSP",       value: "3",  color: "text-red-500"   },
                { label: "Weather-affected crops", value: "5",  color: "text-amber-600" },
                { label: "Policy updates today",  value: "2",  color: "text-blue-600"  },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-forest-50 last:border-0">
                  <span className="text-sm text-forest-600">{label}</span>
                  <span className={`font-display font-bold text-lg ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data sources */}
          <div className="card">
            <h3 className="font-semibold text-forest-900 mb-3">🔗 Data Sources</h3>
            <div className="space-y-2">
              {[
                { name: "AGMARKNET",        type: "Price Data",     status: "live"   },
                { name: "eNAM",             type: "Digital Mandi",  status: "live"   },
                { name: "IMD",              type: "Weather",        status: "live"   },
                { name: "CACP",             type: "MSP Policy",     status: "daily"  },
                { name: "APEDA",            type: "Export Data",    status: "daily"  },
              ].map(({ name, type, status }) => (
                <div key={name} className="flex items-center justify-between py-1.5 text-sm">
                  <div>
                    <span className="font-medium text-forest-800">{name}</span>
                    <span className="text-forest-400 ml-2 text-xs">{type}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    status === "live"
                      ? "bg-forest-100 text-forest-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}