import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPredictions, fetchModelAccuracy,
  selectAllPredictions, selectModelAccuracy, selectPredictionsLoading,
} from "../store/slices/predictionSlice";
import { fetchAllPrices, selectAllPrices } from "../store/slices/priceSlice";
import PredictionBox from "../components/ai/PredictionBox";
import CropSelector from "../components/dashboard/CropSelector";
import PriceChart from "../components/charts/PriceChart";
import { SIGNALS } from "../utils/constants";
import Loader from "../components/common/Loader"

export default function Prediction() {
  const dispatch     = useDispatch();
  const predictions  = useSelector(selectAllPredictions);
  const accuracy     = useSelector(selectModelAccuracy);
  const loading      = useSelector(selectPredictionsLoading);
  const allPrices    = useSelector(selectAllPrices);

  const [selectedCropId, setSelectedCropId] = useState("wheat");
  const selectedCrop = allPrices.find((c) => c.id === selectedCropId);

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchAllPredictions());
    dispatch(fetchModelAccuracy());
  }, [dispatch]);

  return (
    <div className="page-container space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          🤖
        </div>
        <h1 className="section-title text-3xl mb-2">AI Price Predictions</h1>
        <p className="text-forest-500">
          Machine learning models trained on historical mandi data, MSP trends, weather patterns,
          and market arrivals — to forecast crop prices with <strong className="text-forest-700">81%+ accuracy</strong>.
        </p>
      </div>

      {/* Model accuracy banner */}
      {accuracy && (
        <div className="card bg-forest-50 border-forest-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-forest-900 mb-1">Model Performance</h3>
              <p className="text-sm text-forest-500">Based on last 90 days of backtesting across all tracked crops.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Overall Accuracy",  value: `${accuracy.overall}%`                    },
                { label: "7-Day Accuracy",    value: `${accuracy.byHorizon?.["7d"]}%`           },
                { label: "30-Day Accuracy",   value: `${accuracy.byHorizon?.["30d"]}%`          },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-white rounded-xl px-4 py-2 shadow-sm border border-forest-100">
                  <p className="font-display text-xl font-bold text-forest-700">{value}</p>
                  <p className="text-xs text-forest-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Per-crop accuracy */}
          {accuracy.byCrop?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {accuracy.byCrop.map(({ crop, accuracy: acc }) => (
                <div key={crop} className="bg-white rounded-lg p-2 text-center border border-forest-100">
                  <p className="text-xs font-medium text-forest-700">{crop}</p>
                  <div className="mt-1 h-1.5 bg-forest-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-forest-500 rounded-full"
                      style={{ width: `${acc}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-forest-500 mt-0.5 font-mono">{acc}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Crop selector + prediction detail */}
        <div className="xl:col-span-1 space-y-5">
          <div className="card">
            <h3 className="font-semibold text-forest-900 mb-3">Select Crop</h3>
            <CropSelector value={selectedCropId} onChange={(id) => id && setSelectedCropId(id)} />
          </div>

          {/* Price chart for selected */}
          {selectedCrop && (
            <div className="card">
              <p className="text-xs text-forest-400 uppercase tracking-widest font-semibold mb-3">
                30-Day Price History
              </p>
              <PriceChart
                data={selectedCrop.priceHistory || []}
                cropName={selectedCrop.name}
                unit={selectedCrop.unit}
                msp={selectedCrop.msp}
                height={160}
              />
            </div>
          )}

          <PredictionBox
            cropId={selectedCropId}
            cropName={selectedCrop?.name || selectedCropId}
          />
        </div>

        {/* Right: All predictions grid */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-forest-900">
              All Predictions Today
            </h2>
            <span className="badge-green text-xs">{predictions.length} crops</span>
          </div>

          {loading && !predictions.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card space-y-3">
                  <Skeleton lines={2} />
                  <Skeleton className="h-16 rounded-xl" />
                  <Skeleton lines={2} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {predictions.map((pred) => {
                const signal   = SIGNALS[pred.signal] || SIGNALS.HOLD;
                const diff7d   = (pred.predicted7d || 0) - (pred.currentPrice || 0);
                const diff7pct = pred.currentPrice
                  ? ((diff7d / pred.currentPrice) * 100).toFixed(1)
                  : 0;
                const isUp     = diff7d >= 0;

                return (
                  <div
                    key={pred.cropId}
                    className={`card-hover cursor-pointer ${selectedCropId === pred.cropId ? "ring-2 ring-forest-400" : ""}`}
                    onClick={() => setSelectedCropId(pred.cropId)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{pred.emoji}</span>
                        <div>
                          <p className="font-semibold text-forest-900 text-sm">{pred.cropName}</p>
                          <p className="text-xs text-forest-400">
                            ₹{pred.currentPrice?.toLocaleString("en-IN")} current
                          </p>
                        </div>
                      </div>
                      <span className={`badge ${signal.color} text-xs shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${signal.dot} mr-1`} />
                        {signal.label}
                      </span>
                    </div>

                    {/* Forecast */}
                    <div className="flex items-center justify-between bg-forest-50 rounded-xl p-3 mb-3">
                      <div>
                        <p className="text-xs text-forest-500 mb-0.5">7-Day Forecast</p>
                        <p className="font-mono font-bold text-forest-900">
                          ₹{pred.predicted7d?.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className={`text-right`}>
                        <p className={`text-sm font-bold ${isUp ? "text-forest-600" : "text-red-500"}`}>
                          {isUp ? "▲" : "▼"} {Math.abs(diff7pct)}%
                        </p>
                        <p className="text-xs text-forest-400">
                          {isUp ? "+" : ""}₹{diff7d.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Confidence */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-forest-500">Confidence</span>
                        <span className="font-semibold font-mono text-forest-700">
                          {pred.confidence}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-forest-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pred.confidence}%`,
                            background:
                              pred.confidence >= 80
                                ? "linear-gradient(90deg, #2d8058, #4da07a)"
                                : pred.confidence >= 60
                                ? "#fbbf24"
                                : "#f87171",
                          }}
                        />
                      </div>
                    </div>

                    {/* Short reason */}
                    <p className="text-xs text-forest-500 mt-2 leading-relaxed line-clamp-2">
                      {pred.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>⚠ Disclaimer:</strong> AI predictions are estimates based on historical price patterns,
              weather data, and market trends. Actual prices may vary. This tool is for advisory use only
              and does not constitute financial or trading advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}