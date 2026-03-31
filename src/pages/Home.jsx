import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPrices,
  selectAllPrices,
  selectTopMovers,
  fetchTopMovers,
} from "../store/slices/priceSlice";
import { DASHBOARD_STATS } from "../data/dummyData";
import PriceCard from "../components/dashboard/PriceCard";
import AlertBox from "../components/ai/AlertBox";

const HERO_STATS = [
  { label: "Crops Tracked", value: DASHBOARD_STATS.totalCropsTracked, suffix: "+" },
  { label: "Live Mandis", value: DASHBOARD_STATS.marketsConnected, suffix: "+" },
  { label: "AI Predictions", value: DASHBOARD_STATS.aiPredictions, suffix: "" },
  { label: "Prediction Accuracy", value: DASHBOARD_STATS.avgAccuracy, suffix: "" },
];

const FEATURES = [
  {
    icon: "📊",
    title: "Live Price Dashboard",
    desc: "Real-time crop prices from mandis.",
  },
  {
    icon: "🤖",
    title: "AI Price Prediction",
    desc: "ML-powered forecasts to help farmers decide.",
  },
  {
    icon: "🌦️",
    title: "Weather Integration",
    desc: "Weather alerts with price impact insights.",
  },
  {
    icon: "📉",
    title: "MSP Comparison",
    desc: "Compare prices with MSP instantly.",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "Get alerts for price spikes and changes.",
  },
  {
    icon: "🧮",
    title: "Profit Calculator",
    desc: "Estimate profit before selling crops.",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const prices = useSelector(selectAllPrices);
  const movers = useSelector(selectTopMovers);

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchTopMovers(4));
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      
      {/* HERO */}
      <section className="bg-green-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Smart Crop Price Intelligence
        </h1>
        <p className="mb-6">
          Track mandi prices and get AI insights.
        </p>
        <Link to="/dashboard" className="bg-yellow-400 text-black px-6 py-3 rounded-lg">
          Open Dashboard
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 px-6">
          {HERO_STATS.map(({ label, value, suffix }) => (
            <div key={label} className="bg-green-800 p-4 rounded-xl">
              <p className="text-xl font-bold">
                {value}{suffix}
              </p>
              <p className="text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP MOVERS */}
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Top Movers</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {movers.length > 0 ? (
            movers.map((crop) => (
              <PriceCard key={crop.id} crop={crop} />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse space-y-3">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-xl shadow">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ALERT SECTION */}
      <section className="max-w-7xl mx-auto p-6">
        <AlertBox />
      </section>

    </div>
  );
}