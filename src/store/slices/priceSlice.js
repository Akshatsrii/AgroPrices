import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allPrices: [],
  filteredPrices: [],
  priceHistory: {},
  topMovers: [],
  watchlist: [],
  loading: false,
};

export const fetchAllPrices = createAsyncThunk(
  "price/fetchAllPrices",
  async () => {
    return [
      { id: "wheat", name: "Wheat", currentPrice: 2200, unit: "quintal", changePct: 2 },
      { id: "rice", name: "Rice", currentPrice: 1800, unit: "quintal", changePct: -1 },
    ];
  }
);

export const fetchTopMovers = createAsyncThunk(
  "price/fetchTopMovers",
  async () => {
    return [
      { id: "wheat", name: "Wheat", currentPrice: 2200, changePct: 2 },
    ];
  }
);

export const fetchPriceHistory = createAsyncThunk(
  "price/fetchPriceHistory",
  async ({ cropId }) => {
    return {
      cropId,
      data: [2000, 2100, 2200, 2150, 2300],
    };
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPrices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.allPrices = action.payload;
        state.filteredPrices = action.payload;
      })
      .addCase(fetchTopMovers.fulfilled, (state, action) => {
        state.topMovers = action.payload;
      })
      .addCase(fetchPriceHistory.fulfilled, (state, action) => {
        const { cropId, data } = action.payload;
        state.priceHistory[cropId] = data;
      });
  },
});

export const selectAllPrices = (state) => state.price.allPrices;
export const selectFilteredPrices = (state) => state.price.filteredPrices;
export const selectTopMovers = (state) => state.price.topMovers;
export const selectWatchlist = (state) => state.price.watchlist;
export const selectPricesLoading = (state) => state.price.loading;

export const selectPriceHistory = (cropId) => (state) =>
  state.price.priceHistory[cropId] || [];

export default priceSlice.reducer;