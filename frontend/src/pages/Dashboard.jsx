import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './Dashboard.css';

export function Dashboard() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-primary">AgroPrice AI</h1>
        <p className="text-muted">Your Smart Selling Assistant</p>
      </header>

      {/* Hero Recommendation */}
      <Card className="bg-primary text-center mb-4 hero-card">
        <h2 className="text-xl font-bold text-accent mb-2">Smart Sell Recommendation</h2>
        <p className="text-lg text-surface">
          Sell Soybean tomorrow at <strong>Ramganj Mandi</strong> for <strong>+₹1,400</strong> extra profit.
        </p>
        <div className="mt-4 flex gap-4 justify-center">
          <Button variant="accent">Calculate Transport</Button>
          <Button variant="outline" className="hero-btn-outline">View Details</Button>
        </div>
      </Card>

      {/* Quick Inputs & Pulse */}
      <div className="dashboard-grid">
        <Card hoverable>
          <h3 className="font-bold mb-4">Quick Input</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-muted">Crop</label>
              <select className="input-field w-full mt-2">
                <option>Soybean</option>
                <option>Wheat</option>
                <option>Mustard</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted">Quantity (Quintals)</label>
              <input type="number" className="input-field w-full mt-2" placeholder="e.g. 50" />
            </div>
            <Button variant="primary" className="w-full">Get Insights</Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold mb-4">Live Mandi Pulse</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-4 bg-background radius-md">
              <div>
                <p className="font-bold">Ramganj Mandi</p>
                <p className="text-sm text-success flex items-center gap-2">↑ Trending Up</p>
              </div>
              <p className="font-bold text-lg">₹4,800/q</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-background radius-md">
              <div>
                <p className="font-bold">Kota Mandi</p>
                <p className="text-sm text-muted flex items-center gap-2">- Stable</p>
              </div>
              <p className="font-bold text-lg">₹4,650/q</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
