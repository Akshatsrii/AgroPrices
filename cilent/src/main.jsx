import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { store } from "./store/store.js";
import "./index.css";
import "./styles/globals.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              borderRadius: "12px",
              background: "#1e6644",
              color: "#fdf8f0",
            },
            success: {
              iconTheme: { primary: "#fbbf24", secondary: "#1e6644" },
            },
            error: {
              style: { background: "#991b1b" },
              iconTheme: { primary: "#fcd34d", secondary: "#991b1b" },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);