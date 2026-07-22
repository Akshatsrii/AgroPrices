import React from 'react';
import { Link } from 'react-router-dom';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">System Control Center</span>
          <h1 className="text-2xl sm:text-3xl font-black m-0 tracking-tight">Admin Portal 🛡️</h1>
          <p className="text-xs text-slate-400 m-0 mt-1">Manage crops, mandis, daily rates, and registered farmers.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Total Farmers</span>
          <p className="text-2xl font-black text-slate-900 m-0">1,240</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Active Mandis</span>
          <p className="text-2xl font-black text-slate-900 m-0">48 APMCs</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">AI Analyses Today</span>
          <p className="text-2xl font-black text-emerald-700 m-0">312</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Crops Tracked</span>
          <p className="text-2xl font-black text-slate-900 m-0">24 Commodities</p>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/crops" className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all">
          🌾 Crop Management &rarr;
        </Link>
        <Link to="/admin/mandis" className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all">
          🚜 Mandi & Arhtiya Directory &rarr;
        </Link>
        <Link to="/admin/prices" className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all">
          💰 Daily APMC Price Updates &rarr;
        </Link>
        <Link to="/admin/users" className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all">
          👨‍🌾 Farmer User Directory &rarr;
        </Link>
      </div>
    </div>
  );
}
