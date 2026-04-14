import { configureStore } from "@reduxjs/toolkit"
import priceReducer from "./slices/priceSlice"
import userReducer from "./slices/userSlice"
import predictionReducer from "./slices/predictionSlice"

export const store = configureStore({
  reducer: {
    price: priceReducer,
    user: userReducer,
    prediction: predictionReducer,
  },
})