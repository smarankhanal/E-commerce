import React from "react";

export default function PaymentBadge({ paymentMethod }) {
  const method = paymentMethod?.toUpperCase();

  const getStyle = () => {
    switch (method) {
      case "ESEWA":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "KHALTI":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "FONEPAY":
        return "bg-red-50 text-red-700 border-red-200";
      case "COD":
      case "CASH_ON_DELIVERY":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getFormattedLabel = () => {
    if (method === "COD" || method === "CASH_ON_DELIVERY") {
      return "Cash on Delivery";
    }
    return method || "N/A";
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${getStyle()}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {getFormattedLabel()}
    </span>
  );
}
