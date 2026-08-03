import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const navigate = useNavigate();
  return (
    <div className="w-80 rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-10">
      <div className="flex items-center justify-between border-b pb-4">
        <span className="text-lg font-medium text-gray-600">Total Cost</span>

        <span className="text-2xl font-bold text-blue-700">Rs. 6000</span>
      </div>

      <button
        className="mt-6 w-full rounded-lg border-2 border-blue-800 bg-blue-800 py-2.5 font-medium text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:shadow-lg cursor-pointer"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
}
