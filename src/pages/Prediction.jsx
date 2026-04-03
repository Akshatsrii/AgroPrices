import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPredictions,
  selectAllPredictions,
  selectModelAccuracy,
  selectPredictionsLoading,
} from "../store/slices/predictionSlice";
import { fetchAllPrices, selectAllPrices } from "../store/slices/priceSlice";
import { SIGNALS } from "../utils/constants";

export default function Prediction() {
  const dispatch = useDispatch();

  const predictions = useSelector(selectAllPredictions) || [];
  const accuracy = useSelector(selectModelAccuracy) || {};
  const loading = useSelector(selectPredictionsLoading);
  const allPrices = useSelector(selectAllPrices) || [];

  const [selectedCropId, setSelectedCropId] = useState("wheat");

  const selectedCrop =
    allPrices.find((c) => c.id === selectedCropId) ||
    (allPrices.length > 0 ? allPrices[0] : null);

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Prediction Page</h1>

      {/* SAFE ACCURACY */}
      {typeof accuracy?.overall === "number" && (
        <p>Accuracy: {accuracy.overall}%</p>
      )}

      {/* SAFE CROP SELECT */}
      <div>
        <h3>Select Crop</h3>
        {allPrices.length === 0 ? (
          <p>No crops available</p>
        ) : (
          allPrices.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCropId(c.id)}
              style={{ margin: "5px" }}
            >
              {c.name}
            </button>
          ))
        )}
      </div>

      {/* SAFE SELECTED CROP */}
      {selectedCrop && (
        <div>
          <h3>{selectedCrop.name}</h3>
          <p>₹{selectedCrop.currentPrice ?? 0}</p>
        </div>
      )}

      {/* SAFE PREDICTIONS */}
      <div>
        <h2>Predictions</h2>

        {loading && predictions.length === 0 ? (
          <p>Loading...</p>
        ) : predictions.length === 0 ? (
          <p>No predictions available</p>
        ) : (
          predictions.map((pred) => {
            const signal =
              (SIGNALS && SIGNALS[pred?.signal]) || { label: "HOLD" };

            const label =
              typeof signal.label === "string" ? signal.label : "HOLD";

            return (
              <div key={pred?.cropId} style={{ marginBottom: "10px" }}>
                <h4>{pred?.cropName || "Unknown Crop"}</h4>
                <p>₹{pred?.currentPrice ?? 0}</p>
                <p>{label}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}