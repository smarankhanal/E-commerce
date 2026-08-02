import React from "react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-30">
      <div className="text-7xl">🛒</div>
      <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>

      <p className="mt-2 text-gray-500">
        Looks like you haven't added anything yet.
      </p>
      <a
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Continue Shopping
      </a>
    </div>
  );
}
