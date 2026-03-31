import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/common/Loader";

// Lazy-loaded pages for code splitting
const Home       = lazy(() => import("../pages/Home"));
const Dashboard  = lazy(() => import("../pages/Dashboard"));
const Prediction = lazy(() => import("../pages/Prediction"));
const Insights   = lazy(() => import("../pages/Insights"));
const NotFound   = lazy(() => import("../pages/NotFound"));

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
        <Route path="/"            element={<Home />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/prediction"  element={<Prediction />} />
        <Route path="/insights"    element={<Insights />} />
        <Route path="*"            element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;