import React from "react";

export default function OrderBadge({ status }) {
  const currentStatus = status?.toLowerCase() || "pending";

  const statusStyles = {
    delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    confirmed: "bg-purple-100 text-purple-800 border-purple-200",
    pending: "bg-amber-100 text-amber-800 border-amber-200",
  };

  const activeStyle =
    statusStyles[currentStatus] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize tracking-wide transition-colors ${activeStyle}`}
    >
      {currentStatus}
    </span>
  );
}
