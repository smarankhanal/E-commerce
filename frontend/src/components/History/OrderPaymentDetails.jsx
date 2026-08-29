import React from "react";

export default function OrderPaymentDetails({ singleOrderItems }) {
  const paymentMethod = singleOrderItems?.paymentMethod;
  const paymentStatus = singleOrderItems?.paymentStatus;

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Payment Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Information about your order payment
        </p>
      </div>

      {/* Details */}
      <div className="divide-y divide-gray-100 px-5">
        {/* Payment Method */}
        <div className="flex items-center justify-between gap-4 py-4">
          <span className="text-sm text-gray-500">Payment Method</span>

          <span className="text-sm font-medium uppercase text-gray-900">
            {paymentMethod}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex items-center justify-between gap-4 py-4">
          <span className="text-sm text-gray-500">Payment Status</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
              paymentStatus === "paid"
                ? "bg-green-100 text-green-700"
                : paymentStatus === "failed"
                  ? "bg-red-100 text-red-700"
                  : paymentStatus === "refunded"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {paymentStatus}
          </span>
        </div>

        {/* eSewa Transaction ID */}
        {paymentMethod === "esewa" && (
          <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="text-sm text-gray-500">Transaction ID</span>

            <span className="max-w-full break-all text-right font-mono text-xs text-gray-900 sm:max-w-xs">
              {singleOrderItems?.transactionId || "Not available"}
            </span>
          </div>
        )}

        {/* Order Notes */}
        {singleOrderItems?.orderNotes && (
          <div className="py-4">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Order Notes
            </p>

            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="text-sm leading-6 text-gray-600">
                {singleOrderItems.orderNotes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
