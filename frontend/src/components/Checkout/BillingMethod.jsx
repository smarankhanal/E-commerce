import React from "react";
import Input from "../Common/Input";
import { useSelector } from "react-redux";

export default function BillingMethod() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="rounded-2xl bg-white shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

      {/* Name */}
      <Input
        label="Name"
        placeholder="Enter name"
        type="text"
        value={user?.fullName}
        className="text-gray-600 "
        disabled
      />

      {/* Address */}
      <div className="mt-4 space-y-4">
        <Input
          label="Street Address"
          placeholder="House number and street name"
          type="text"
        />

        <button
          type="button"
          className="w-full rounded-lg border px-4 py-3 text-sm cursor-pointer"
        >
          📍 Choose location on map
        </button>
      </div>
      {/* Contact */}
      <div className="mt-4 space-y-4">
        <Input
          label="Phone Number"
          type="tel"
          value={user?.phoneNumber}
          className="text-gray-600"
          disabled
        />

        <Input
          label="Email Address"
          value={user?.email}
          type="email"
          className="text-gray-600"
          disabled
        />
      </div>

      {/* Notes */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">
          Order Notes (Optional)
        </label>

        <textarea
          rows={5}
          placeholder="Notes about your order, e.g. special delivery instructions."
          className="mt-2 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
