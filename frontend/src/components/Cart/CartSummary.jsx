import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartSummary({ subTotal }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5 mb-10 sticky top-24">
      <h3 className="text-base font-semibold text-gray-800">Order Summary</h3>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-base font-medium text-gray-700">Total</span>
        <span className="text-2xl font-bold text-blue-700">Rs {subTotal}</span>
      </div>

      <button
        className="w-full rounded-lg border-2 border-blue-800 bg-blue-800 py-2.5 font-medium text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:shadow-md cursor-pointer focus:outline-none"
        onClick={() => navigate("/billing-details")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
