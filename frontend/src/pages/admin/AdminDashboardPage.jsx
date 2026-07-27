import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Building2, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>AgroPrice AI System Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Admin Portal 🛡️</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Manage crops, APMC mandis, daily market rates, and registered farmer profiles.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm card-hover-effect">
          <span className="text-xs font-bold text-slate-500 uppercase block">Total Farmers</span>
          <p className="text-2xl font-black text-slate-900 m-0">1,250</p>
        </div>
        <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm card-hover-effect">
          <span className="text-xs font-bold text-slate-500 uppercase block">Active Mandis</span>
          <p className="text-2xl font-black text-slate-900 m-0">48 APMCs</p>
        </div>
        <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm card-hover-effect">
          <span className="text-xs font-bold text-slate-500 uppercase block">AI Analyses Today</span>
          <p className="text-2xl font-black text-emerald-700 m-0">312</p>
        </div>
        <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm card-hover-effect">
          <span className="text-xs font-bold text-slate-500 uppercase block">Crops Tracked</span>
          <p className="text-2xl font-black text-slate-900 m-0">24 Commodities</p>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/crops" className="bg-white p-6 rounded-[28px] border border-slate-200/80 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all card-hover-effect flex justify-between items-center">
          <span>🌾 Crop Management</span>
          <ArrowRight className="w-5 h-5 text-emerald-600" />
        </Link>
        <Link to="/admin/mandis" className="bg-white p-6 rounded-[28px] border border-slate-200/80 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all card-hover-effect flex justify-between items-center">
          <span>🚜 Mandi & Arhtiya Directory</span>
          <ArrowRight className="w-5 h-5 text-emerald-600" />
        </Link>
        <Link to="/admin/prices" className="bg-white p-6 rounded-[28px] border border-slate-200/80 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all card-hover-effect flex justify-between items-center">
          <span>💰 Daily APMC Price Updates</span>
          <ArrowRight className="w-5 h-5 text-emerald-600" />
        </Link>
        <Link to="/admin/users" className="bg-white p-6 rounded-[28px] border border-slate-200/80 hover:border-emerald-500 shadow-sm no-underline text-slate-900 font-extrabold text-base transition-all card-hover-effect flex justify-between items-center">
          <span>👨‍🌾 Farmer User Directory</span>
          <ArrowRight className="w-5 h-5 text-emerald-600" />
        </Link>
      </div>

    </div>
  );
}
