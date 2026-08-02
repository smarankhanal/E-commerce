import React from "react";
import Input from "../Input";

export default function BillingMethod() {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="First Name" placeholder="Enter first name" type="text" />

        <Input label="Last Name" placeholder="Enter last name" type="text" />
      </div>

      {/* Country */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">
          Country / Region
        </label>

        <div className="mt-2 rounded-lg border bg-gray-100 px-4 py-3 text-gray-700">
          Nepal
        </div>
      </div>

      {/* Address */}
      <div className="mt-4 space-y-4">
        <Input
          label="Street Address"
          placeholder="House number and street name"
          type="text"
        />
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-4">
        <Input label="Phone Number" placeholder="98XXXXXXXX" type="tel" />

        <Input
          label="Email Address"
          placeholder="example@gmail.com"
          type="email"
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
