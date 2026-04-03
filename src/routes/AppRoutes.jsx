import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/common/Loader";

// Direct imports (no lazy → prevents 500 crash)
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Prediction from "../pages/Prediction";
import Insights from "../pages/Insights";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader size="lg" text="Loading page…" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;