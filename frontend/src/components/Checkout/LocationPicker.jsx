import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);

  return null;
}

function MapClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

export default function LocationPicker({ onSelect, onClose }) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);

        setLoading(false);
      },
      (error) => {
        console.error("Location error:", error);
        setLoading(false);
      },
    );
  }, []);

  const handleConfirm = () => {
    if (!position) return;

    onSelect({
      latitude: position[0],
      longitude: position[1],
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-xl bg-white p-6">Getting your location...</div>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-xl bg-white p-6">
          <p className="mb-4">Unable to get your location.</p>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="text-xl font-semibold">Choose delivery location</h2>

            <p className="text-sm text-gray-500">
              Click on the map to select your exact location
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Map */}
        <div className="h-112.5 w-full">
          <MapContainer center={position} zoom={16} className="h-full w-full">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController position={position} />

            <MapClickHandler setPosition={setPosition} />

            <Marker position={position} />
          </MapContainer>
        </div>

        {/* Selected coordinates */}
        <div className="px-5 py-3 text-sm text-gray-600">
          <p>Latitude: {position[0].toFixed(6)}</p>

          <p>Longitude: {position[1].toFixed(6)}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 px-5 pb-5">
          <button onClick={onClose} className="rounded-lg border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}
