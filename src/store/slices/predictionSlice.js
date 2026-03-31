import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAllPredictions = createAsyncThunk(
  "prediction/fetchAll",
  async () => {
    return [
      { crop: "Tomato", price: 22 },
      { crop: "Potato", price: 18 },
    ]
  }
)

const predictionSlice = createSlice({
  name: "prediction",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPredictions.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllPredictions.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
  },
})

export default predictionSlice.reducer