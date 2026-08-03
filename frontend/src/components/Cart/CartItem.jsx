import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function CartItem({ item }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 relative">
      {/* Image */}
      <div className="flex justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-48 rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>

          <p className="mt-1 text-gray-600">
            <span className="font-semibold">{item.quantity}</span>
            <span className="mx-2 text-gray-400">×</span>
            <span className="font-bold text-blue-600">Rs. {item.price}</span>
          </p>
        </div>

        <button
          className="rounded-lg border-2 border-blue-800 bg-blue-800 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:shadow-lg cursor-pointer"
          onClick={() => navigate("/product")}
        >
          Explore
        </button>
      </div>

      {/* Delete */}
      <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-red-600">
        <MdDeleteForever size={24} />
      </div>
    </div>
  );
}
