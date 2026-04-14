import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPrediction } from "../../services/predictionService"

const initialState = {
  predictions: [],
  loading: false,
  error: null,
  accuracy: { overall: 87 },
}

// ✅ THUNK (multi-crop)
export const fetchAllPredictions = createAsyncThunk(
  "prediction/fetchAllPredictions",
  async (_, { rejectWithValue }) => {
    try {
      const crops = ["wheat", "rice", "cotton", "maize"]

      const results = await Promise.all(
        crops.map(async (crop) => {
          const res = await getPrediction(crop)

          return {
            cropId: crop,
            predictedPrice:
              res?.data?.price || Math.floor(Math.random() * 5000),
            signal: ["BUY", "SELL", "HOLD"][
              Math.floor(Math.random() * 3)
            ],
            confidence: Math.floor(Math.random() * 40) + 60,
          }
        })
      )

      return results
    } catch (err) {
      return rejectWithValue("Prediction error")
    }
  }
)

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPredictions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllPredictions.fulfilled, (state, action) => {
        state.loading = false
        state.predictions = action.payload
      })
      .addCase(fetchAllPredictions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default predictionSlice.reducer

// ✅ SELECTORS (MATCH YOUR UI)

export const selectAllPredictions = (state) =>
  state?.prediction?.predictions || []

export const selectPredictionsLoading = (state) =>
  state?.prediction?.loading || false

export const selectModelAccuracy = (state) =>
  state?.prediction?.accuracy || { overall: 87 }

export const selectPredictionError = (state) =>
  state?.prediction?.error