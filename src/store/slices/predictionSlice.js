import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  predictions: [],
  accuracy: {
    overall: 80,
    byHorizon: { "7d": 78, "30d": 82 },
    byCrop: [],
  },
  loading: false,
  error: null,
};

export const fetchAllPredictions = createAsyncThunk(
  "prediction/fetchAll",
  async () => {
    return [
      {
        cropId: "tomato",
        cropName: "Tomato",
        currentPrice: 22,
        predicted7d: 25,
        confidence: 75,
        signal: "BUY",
        reason: "High demand in local markets",
      },
      {
        cropId: "potato",
        cropName: "Potato",
        currentPrice: 18,
        predicted7d: 17,
        confidence: 65,
        signal: "SELL",
        reason: "Oversupply expected",
      },
    ];
  }
);

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPredictions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload || [];
      })
      .addCase(fetchAllPredictions.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch predictions";
      });
  },
});

export const selectAllPredictions = (state) =>
  state?.prediction?.predictions || [];

export const selectModelAccuracy = (state) =>
  state?.prediction?.accuracy || {};

export const selectPredictionsLoading = (state) =>
  state?.prediction?.loading || false;

export const selectPredictionError = (state) =>
  state?.prediction?.error;

export default predictionSlice.reducer;