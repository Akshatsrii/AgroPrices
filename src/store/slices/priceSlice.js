import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ✅ async thunk for all prices
export const fetchAllPrices = createAsyncThunk(
  "price/fetchAll",
  async () => {
    return [
      { id: 1, crop: "Tomato", price: 20 },
      { id: 2, crop: "Potato", price: 15 },
      { id: 3, crop: "Onion", price: 25 },
    ]
  }
)

// ✅ async thunk for top movers
export const fetchTopMovers = createAsyncThunk(
  "price/fetchTopMovers",
  async (limit) => {
    return [
      { id: 1, crop: "Tomato", price: 20 },
      { id: 2, crop: "Onion", price: 25 },
      { id: 3, crop: "Potato", price: 15 },
      { id: 4, crop: "Wheat", price: 30 },
    ].slice(0, limit)
  }
)

const priceSlice = createSlice({
  name: "price",
  initialState: {
    prices: [],
    movers: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPrices.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllPrices.fulfilled, (state, action) => {
        state.loading = false
        state.prices = action.payload
      })
      .addCase(fetchTopMovers.fulfilled, (state, action) => {
        state.movers = action.payload
      })
  },
})

// ✅ selectors (VERY IMPORTANT)
export const selectAllPrices = (state) => state.price.prices
export const selectTopMovers = (state) => state.price.movers

export default priceSlice.reducer