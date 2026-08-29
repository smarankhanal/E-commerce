import React from "react";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center gap-4">
        <FaHistory className="text-gray-600" />

        <span className="font-bold text-gray-700">History</span>
      </div>

      <div className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200">
        <p
          className="text-gray-600 font-medium"
          onClick={() => navigate("/order-history")}
        >
          Order Details
        </p>
      </div>
    </div>
  );
}
