import React from "react";

export default function OrderAmount({ singleOrderItems }) {
  const subtotal = Number(singleOrderItems?.subtotal || 0);
  const shipping = Number(singleOrderItems?.shippingCharge || 0);
  const discount = Number(singleOrderItems?.discount || 0);
  const total = Number(singleOrderItems?.totalAmount || 0);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">Order Summary</h2>
        <p className="mt-1 text-sm text-gray-500">
          Breakdown of your order amount
        </p>
      </div>

      {/* Amount Details */}
      <div className="px-5">
        {/* Subtotal */}
        <div className="flex items-center justify-between border-b border-gray-100 py-4">
          <span className="text-sm text-gray-500">Subtotal</span>

          <span className="text-sm font-medium text-gray-900">
            Rs. {subtotal}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between border-b border-gray-100 py-4">
          <span className="text-sm text-gray-500">Shipping</span>

          <span className="text-sm font-medium text-gray-900">
            {shipping === 0 ? (
              <span className="font-semibold text-green-600">Free</span>
            ) : (
              `Rs. ${shipping}`
            )}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between border-b border-gray-100 py-4">
          <span className="text-sm text-gray-500">Discount</span>

          <span className="text-sm font-medium text-green-600">
            - Rs. {discount}
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-5">
          <span className="text-base font-semibold text-gray-900">Total</span>

          <span className="text-xl font-bold text-gray-900">Rs. {total}</span>
        </div>
      </div>
    </div>
  );
}
