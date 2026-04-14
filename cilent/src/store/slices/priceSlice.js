import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMandiPrices } from "../../services/api";

const initialState = {
  allPrices: [],
  filteredPrices: [],
  priceHistory: {},
  topMovers: [],
  watchlist: [],
  loading: false,
};

// 🔥 REAL API INTEGRATION
export const fetchAllPrices = createAsyncThunk(
  "price/fetchAllPrices",
  async () => {
    const records = await fetchMandiPrices();

    if (!records || records.length === 0) return [];

    return records.map((item, index) => ({
      id: item.commodity + index,
      name: item.commodity,
      currentPrice: Number(item.modal_price) || 0,
      market: item.market,
      state: item.state,
      unit: "quintal",
      changePct: 0, // will calculate below
    }));
  }
);

// 🔥 TOP MOVERS (BASED ON PRICE SORT)
export const fetchTopMovers = createAsyncThunk(
  "price/fetchTopMovers",
  async (_, { getState }) => {
    const prices = getState().price.allPrices || [];

    return [...prices]
      .sort((a, b) => b.currentPrice - a.currentPrice)
      .slice(0, 5);
  }
);

// 🔥 SIMPLE HISTORY (DUMMY FOR NOW)
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

        const prices = action.payload || [];

        // 🔥 calculate change %
        const updated = prices.map((item, index) => {
          const prev = prices[index - 1]?.currentPrice || item.currentPrice;
          const change =
            prev !== 0 ? ((item.currentPrice - prev) / prev) * 100 : 0;

          return {
            ...item,
            changePct: Number(change.toFixed(2)),
          };
        });

        state.allPrices = updated;
        state.filteredPrices = updated;
      })
      .addCase(fetchTopMovers.fulfilled, (state, action) => {
        state.topMovers = action.payload || [];
      })
      .addCase(fetchPriceHistory.fulfilled, (state, action) => {
        const { cropId, data } = action.payload;
        state.priceHistory[cropId] = data || [];
      });
  },
});

// 🔹 SELECTORS (SAFE)
export const selectAllPrices = (state) =>
  state?.price?.allPrices || [];

export const selectFilteredPrices = (state) =>
  state?.price?.filteredPrices || [];

export const selectTopMovers = (state) =>
  state?.price?.topMovers || [];

export const selectWatchlist = (state) =>
  state?.price?.watchlist || [];

export const selectPricesLoading = (state) =>
  state?.price?.loading || false;

export const selectPriceHistory = (cropId) => (state) =>
  state?.price?.priceHistory?.[cropId] || [];

export default priceSlice.reducer;