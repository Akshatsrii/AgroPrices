import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchAllPrices, fetchPriceHistory, fetchTopMovers,
  selectFilteredPrices, selectPricesLoading,
  selectPriceHistory, selectTopMovers, selectWatchlist, selectAllPrices,
} from "../store/slices/priceSlice";
import { fetchAllPredictions } from "../store/slices/predictionSlice";
import FilterBar from "../components/dashboard/FilterBar";
import PriceList from "../components/dashboard/PriceList";
import PriceCard from "../components/dashboard/PriceCard";
import PriceChart from "../components/charts/PriceChart";
import TrendGraph from "../components/charts/TrendGraph";
import RecommendationBox from "../components/dashboard/RecommendationBox";
import ProfitCalculator from "../components/dashboard/ProfitCalculator";
import AlertBox from "../components/ai/AlertBox";
import CropSelector from "../components/dashboard/CropSelector";
import { DASHBOARD_STATS } from "../data/dummyData";
import { PRICE_REFRESH_INTERVAL } from "../utils/constants";

const STAT_CARDS = [
  { label: "Crops Tracked",   value: DASHBOARD_STATS.totalCropsTracked, icon: "🌾", color: "bg-forest-50  text-forest-700"  },
  { label: "Live Markets",    value: DASHBOARD_STATS.marketsConnected,   icon: "🏪", color: "bg-amber-50   text-amber-700"   },
  { label: "Active Alerts",   value: DASHBOARD_STATS.priceAlerts,        icon: "🔔", color: "bg-red-50     text-red-700"     },
  { label: "AI Predictions",  value: DASHBOARD_STATS.aiPredictions,      icon: "🤖", color: "bg-blue-50    text-blue-700"    },
];

export default function Dashboard() {
  const dispatch       = useDispatch();
  const [params]       = useSearchParams();
  const [compareCrops, setCompareCrops] = useState([]);
  const [chartDays,    setChartDays]    = useState(30);

  const allPrices     = useSelector(selectAllPrices);
  const filteredPrices = useSelector(selectFilteredPrices);
  const loading       = useSelector(selectPricesLoading);
  const topMovers     = useSelector(selectTopMovers);
  const watchlist     = useSelector(selectWatchlist);

  // Selected crop from URL query or first crop
  const cropIdFromUrl = params.get("crop");
  const [selectedId, setSelectedId] = useState(cropIdFromUrl || "wheat");

  const selectedCrop   = allPrices.find((c) => c.id === selectedId) || allPrices[0];
  const selectedHistory = useSelector(selectPriceHistory(selectedId));
  const watchedCrops   = allPrices.filter((c) => watchlist.includes(c.id));

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchTopMovers(5));
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedId) dispatch(fetchPriceHistory({ cropId: selectedId, days: chartDays }));
  }, [selectedId, chartDays, dispatch]);

  // Auto-refresh every 5 min
  useEffect(() => {
    const id = setInterval(() => dispatch(fetchAllPrices()), PRICE_REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [dispatch]);

  // Compare datasets for TrendGraph
  const compareDatasets = compareCrops
    .map((id) => {
      const c = allPrices.find((p) => p.id === id);
      return c ? { id: c.id, name: c.name, data: c.priceHistory } : null;
    })
    .filter(Boolean);

  return (
    <div className="page-container space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="section-title">Price Dashboard</h1>
          <p className="text-sm text-forest-500 mt-1">
            Live crop prices · Updated {DASHBOARD_STATS.lastDataSync}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-forest-50 border border-forest-200 px-3 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse-slow" />
            <span className="text-xs text-forest-600 font-medium">Live</span>
          </div>
          <button
            onClick={() => dispatch(fetchAllPrices())}
            className="btn-outline text-sm"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, icon, color }) => (
          <div key={label} className={`card flex items-center gap-3 ${color}`}>
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="text-2xl font-display font-bold">{value}</p>
              <p className="text-xs font-medium opacity-70">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Chart + list */}
        <div className="xl:col-span-2 space-y-5">
          {/* Selected crop chart */}
          {selectedCrop && (
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedCrop.emoji}</span>
                  <div>
                    <h3 className="font-display font-semibold text-forest-900">{selectedCrop.name}</h3>
                    <p className="text-xs text-forest-400">{selectedCrop.market}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[7, 14, 30, 60].map((d) => (
                    <button
                      key={d}
                      onClick={() => setChartDays(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        chartDays === d
                          ? "bg-forest-600 text-cream"
                          : "text-forest-500 hover:bg-forest-100"
                      }`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>

              {/* Current price display */}
              <div className="flex items-end gap-3 mb-4">
                <p className="font-display text-3xl font-bold text-forest-900">
                  ₹{selectedCrop.currentPrice?.toLocaleString("en-IN")}
                  <span className="text-base font-sans font-normal text-forest-400 ml-1">
                    /{selectedCrop.unit}
                  </span>
                </p>
                <span className={`text-sm font-semibold pb-1 ${selectedCrop.changePct >= 0 ? "text-forest-600" : "text-red-500"}`}>
                  {selectedCrop.changePct >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(selectedCrop.changePct).toFixed(2)}% today
                </span>
              </div>

              <PriceChart
                data={selectedHistory}
                cropName={selectedCrop.name}
                unit={selectedCrop.unit}
                msp={selectedCrop.msp}
                height={220}
              />
            </div>
          )}

          {/* Crop selector */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-semibold text-forest-900">Select Crop to View</h3>
            </div>
            <CropSelector
              value={selectedId}
              onChange={(id) => { if (id) setSelectedId(id); }}
            />
          </div>

          {/* Trend comparison */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-forest-900">Compare Price Trends</h3>
              <span className="text-xs text-forest-400">Select up to 3 crops</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <CropSelector
                  key={i}
                  value={compareCrops[i] || null}
                  onChange={(id) => {
                    const updated = [...compareCrops];
                    if (id) updated[i] = id;
                    else updated.splice(i, 1);
                    setCompareCrops(updated.filter(Boolean));
                  }}
                  placeholder={`Crop ${i + 1}`}
                  clearable
                />
              ))}
            </div>
            <TrendGraph datasets={compareDatasets} height={220} />
          </div>

          {/* Filter + full list */}
          <div className="space-y-4">
            <FilterBar totalCount={filteredPrices.length} />
            <PriceList />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Watchlist */}
          {watchedCrops.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-forest-900 mb-3">⭐ Watchlist</h3>
              <div className="space-y-1">
                {watchedCrops.map((c) => (
                  <PriceCard key={c.id} crop={c} compact />
                ))}
              </div>
            </div>
          )}

          {/* Top movers */}
          <div className="card">
            <h3 className="font-semibold text-forest-900 mb-3">🔥 Top Movers</h3>
            <div className="space-y-1">
              {topMovers.map((c) => (
                <PriceCard key={c.id} crop={c} compact />
              ))}
            </div>
          </div>

          <RecommendationBox />
          <AlertBox />
          <ProfitCalculator defaultCropPrice={selectedCrop?.currentPrice} />
        </div>
      </div>
    </div>
  );
}