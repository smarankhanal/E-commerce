import React from "react";

export default function UserDetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="text-sm font-medium text-gray-500">{label}</span>

      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}
