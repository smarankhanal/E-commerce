import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import LocationPicker from "./LocationPicker";
import Input from "../Common/Input";

export default function ShippingAddress({ register, setValue }) {
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    console.log(location);
    setValue("location", {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });

    setShowMap(false);
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Delivery Address
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Where should we deliver your order?
        </p>
      </div>

      {/* Street Address */}
      <Input
        label="Street Address"
        placeholder="House number and street name"
        type="text"
        className="focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        {...register("shippingAddress", {
          required: "Shipping address is required",
        })}
      />

      {/* Map Button */}
      <button
        type="button"
        onClick={() => setShowMap(true)}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 active:scale-[0.99]"
      >
        <FiMapPin size={18} />

        {location ? "Change location on map" : "Choose location on map"}
      </button>

      <p className="mt-2 text-xs text-gray-400">
        You can select your exact delivery location using the map.
      </p>

      {/* Selected Location */}
      {location && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <FiMapPin className="text-blue-600" size={18} />

            <p className="text-sm font-semibold text-gray-700">
              Delivery Location
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-gray-400">Latitude</p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {location.latitude}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-gray-400">Longitude</p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {location.longitude}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Location Picker */}
      {showMap && (
        <LocationPicker
          onSelect={handleLocationSelect}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}
