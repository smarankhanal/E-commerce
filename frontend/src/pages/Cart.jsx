import React from "react";
import { CartItem, CartSummary } from "../components";
import img from "../assets/images/t-shirt.jpg";

const collections = [
  {
    id: 1,
    title: "Medical Wear",
    image: img,
    price: 1000,
    quantity: 1,
  },
  {
    id: 2,
    title: "Classic Collection",
    image: img,
    price: 2000,
    quantity: 2,
  },
  {
    id: 3,
    title: "Premium Scrubs",
    image: img,
    price: 3000,
    quantity: 1,
  },
  {
    id: 4,
    title: "Premium Scrubs",
    image: img,
    price: 3000,
    quantity: 1,
  },
];

export default function Cart() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-30">
      <div className="mb-10 flex flex-col justify-between items-start gap-6 rounded-2xl bg-linear-to-r from-blue-700 to-blue-900 p-8 text-white shadow-lg lg:flex-row ">
        <div>
          <p className="text-sm font-medium uppercase text-blue-200">
            Welcome back
          </p>
          <h1 className="mt-2 text-4xl font-bold"> Your Shopping Cart</h1>
          <p className="mt-3 text-blue-100">
            You have{" "}
            <span className="font-bold text-white">{collections.length}</span>{" "}
            items waiting for checkout.
          </p>
        </div>
        <CartSummary />
      </div>

      {/* Cart Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
