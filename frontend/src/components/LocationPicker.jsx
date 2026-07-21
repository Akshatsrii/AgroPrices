import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks and setting location
function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your Farm Location</Popup>
    </Marker>
  );
}

export function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState(null);

  // Center of India roughly
  const defaultCenter = [22.9734, 78.6569];

  useEffect(() => {
    if (position && onLocationSelect) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect]);

  const handleGPSDetect = () => {
    setIsLocating(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setPosition(coords);
        setIsLocating(false);
      },
      (err) => {
        setError("Could not get your location. Please select it manually on the map.");
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-navy">Pinpoint Your Farm</h3>
          <p className="text-sm text-text-muted">Used to calculate precise transport costs to nearby mandis</p>
        </div>
        <button 
          onClick={handleGPSDetect}
          disabled={isLocating}
          className="flex items-center gap-2 px-4 py-2 bg-green-bg text-green-dark border border-green-light rounded-lg hover:bg-green hover:text-white transition-colors"
        >
          {isLocating ? (
            <span className="w-4 h-4 border-2 border-green-dark border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span>📍</span>
          )}
          {isLocating ? 'Detecting...' : 'Use Auto GPS'}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}

      <div className="w-full h-[400px] rounded-xl overflow-hidden border border-border shadow-inner z-0 relative">
        <MapContainer 
          center={position || defaultCenter} 
          zoom={position ? 13 : 5} 
          scrollWheelZoom={true} 
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
        
        {/* Overlay when no position is set and not locating */}
        {!position && !isLocating && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-[400]">
            <div className="bg-navy text-white px-4 py-2 rounded-lg shadow-lg pointer-events-auto">
              Tap the map or use Auto GPS
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border border-border flex items-center justify-between">
        <div className="text-sm text-text-muted">
          Selected Coordinates:
        </div>
        <div className="font-mono text-sm font-bold text-navy">
          {position ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : 'None'}
        </div>
      </div>
    </div>
  );
}
