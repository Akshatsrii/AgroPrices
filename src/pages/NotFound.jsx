import React from "react";
import { Link, useNavigate } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/",           label: "Home",        icon: "🏠" },
  { to: "/dashboard",  label: "Dashboard",   icon: "📊" },
  { to: "/prediction", label: "AI Predict",  icon: "🤖" },
  { to: "/insights",   label: "Insights",    icon: "💡" },
];

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Illustration */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-forest-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-6xl">🌾</span>
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-xl">❓</span>
          </div>
        </div>

        {/* 404 */}
        <p className="font-mono text-7xl font-bold text-forest-100 mb-2 leading-none">404</p>
        <h1 className="font-display text-2xl font-bold text-forest-900 mb-3">
          Crop Not Found in This Field
        </h1>
        <p className="text-forest-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the right mandi.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button onClick={() => navigate(-1)} className="btn-outline">
            ← Go Back
          </button>
          <Link to="/" className="btn-primary">
            🏠 Back to Home
          </Link>
        </div>

        {/* Quick links */}
        <div className="bg-forest-50 rounded-2xl p-5">
          <p className="text-xs font-semibold text-forest-500 uppercase tracking-widest mb-3">
            Quick Navigation
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QUICK_LINKS.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl hover:bg-forest-100 transition-colors text-sm font-medium text-forest-700 shadow-sm border border-forest-100"
              >
                <span className="text-xl">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}