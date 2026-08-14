import React, { useState } from 'react';
import { ShoppingBag, Tag, Plus, CheckCircle2, TrendingUp, Filter, Phone, MapPin, Sparkles } from 'lucide-react';
import { apiService } from '../../services/apiService';

const SAMPLE_LISTINGS = [
  {
    id: 'LIST-101',
    farmerName: 'Ramesh Kumar',
    location: 'Sehore, Madhya Pradesh',
    cropName: 'Sharbati Wheat (गेहूं)',
    quantityQuintals: 50,
    askingPrice: 2500,
    highestBid: 2490,
    bidsCount: 4,
    grade: 'Grade A (Moisture 11.2%)',
    verified: true,
    status: 'ACTIVE_BIDDING'
  },
  {
    id: 'LIST-102',
    farmerName: 'Sardar Gurdeep Singh',
    location: 'Khanna, Punjab',
    cropName: 'Paddy / Basmati Rice (धान)',
    quantityQuintals: 120,
    askingPrice: 3900,
    highestBid: 3880,
    bidsCount: 7,
    grade: 'Grade A Premium',
    verified: true,
    status: 'ACTIVE_BIDDING'
  },
  {
    id: 'LIST-103',
    farmerName: 'Kamlesh Patel',
    location: 'Rajkot, Gujarat',
    cropName: 'Cotton / Kapas (कपास)',
    quantityQuintals: 80,
    askingPrice: 7200,
    highestBid: 7150,
    bidsCount: 3,
    grade: 'Grade B (Clean Fibers)',
    verified: true,
    status: 'ACTIVE_BIDDING'
  }
];

export function MarketplacePage() {
  const [listings, setListings] = useState(SAMPLE_LISTINGS);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [bidAmount, setBidAmount] = useState(2500);

  // New Listing Form State
  const [newCrop, setNewCrop] = useState('Wheat');
  const [newQty, setNewQty] = useState(40);
  const [newAskingPrice, setNewAskingPrice] = useState(2480);
  const [newLocation, setNewLocation] = useState('Indore, MP');

  const handleCreateListing = (e) => {
    e.preventDefault();
    const item = {
      id: `LIST-${Date.now().toString().slice(-4)}`,
      farmerName: 'You (LoggedIn Farmer)',
      location: newLocation,
      cropName: `${newCrop}`,
      quantityQuintals: Number(newQty),
      askingPrice: Number(newAskingPrice),
      highestBid: Number(newAskingPrice) - 20,
      bidsCount: 1,
      grade: 'Grade A (AI Verified)',
      verified: true,
      status: 'ACTIVE_BIDDING'
    };
    setListings([item, ...listings]);
    setShowModal(false);
  };

  const handlePlaceBid = (listing) => {
    setSelectedListing(listing);
    setBidAmount(listing.highestBid + 20);
  };

  const submitBid = () => {
    if (!selectedListing) return;
    setListings(listings.map(l => {
      if (l.id === selectedListing.id) {
        return {
          ...l,
          highestBid: Number(bidAmount),
          bidsCount: l.bidsCount + 1
        };
      }
      return l;
    }));
    setSelectedListing(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Direct Farmer-to-Buyer Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">AI Peer-to-Peer Crop Marketplace</h1>
          <p className="text-xs sm:text-sm text-slate-500 m-0 mt-1">Bypass middleman commissions. Sell directly to verified millers, exporters & bulk buyers.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs shadow-md transition-all border-0 cursor-pointer flex items-center space-x-2 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Crop Listing</span>
        </button>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-[32px] border border-slate-200/80 shadow-sm space-y-4 hover:shadow-lg transition-all card-hover-effect flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {item.grade}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 m-0 mt-2 tracking-tight">{item.cropName}</h3>
                  <p className="text-xs text-slate-500 m-0 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-emerald-600" /> {item.location}</p>
                </div>
                {item.verified && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-xs">
                <div>
                  <span className="text-slate-500 font-bold text-[10px] uppercase block">Quantity</span>
                  <strong className="text-slate-900 font-black text-sm">{item.quantityQuintals} Quintals</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-bold text-[10px] uppercase block">Asking Price</span>
                  <strong className="text-slate-900 font-black text-sm">₹{item.askingPrice} / Qtl</strong>
                </div>
              </div>

              <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 flex justify-between items-center text-xs">
                <div>
                  <span className="text-emerald-800 font-bold text-[10px] uppercase block">Highest Buyer Bid</span>
                  <strong className="text-emerald-950 font-black text-base">₹{item.highestBid} / Qtl</strong>
                </div>
                <span className="bg-emerald-200/80 text-emerald-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full">
                  {item.bidsCount} Bids Active
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => handlePlaceBid(item)}
                className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs border-0 cursor-pointer transition-all active:scale-95"
              >
                Place Higher Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating New Listing */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h2 className="text-xl font-black text-slate-900 m-0">Post Crop on Marketplace</h2>
            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Crop Name</label>
                <input type="text" value={newCrop} onChange={e => setNewCrop(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Quantity (Quintals)</label>
                <input type="number" value={newQty} onChange={e => setNewQty(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Asking Price (₹/Quintal)</label>
                <input type="number" value={newAskingPrice} onChange={e => setNewAskingPrice(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" />
              </div>
              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border-0 cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl border-0 cursor-pointer shadow-md">Publish Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Placing Bid */}
      {selectedListing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h2 className="text-xl font-black text-slate-900 m-0">Place Buyer Bid ({selectedListing.cropName})</h2>
            <div className="space-y-3 text-xs">
              <p className="text-slate-600 m-0">Current Highest Bid: <strong className="text-slate-900 font-black">₹{selectedListing.highestBid}/Qtl</strong></p>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Bid Amount (₹/Quintal)</label>
                <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none text-base" />
              </div>
              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setSelectedListing(null)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border-0 cursor-pointer">Cancel</button>
                <button type="button" onClick={submitBid} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl border-0 cursor-pointer shadow-md">Submit Bid</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
