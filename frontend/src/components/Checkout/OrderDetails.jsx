import React from "react";
import img from "../../assets/images/t-shirt.jpg";

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
];

export default function OrderDetails() {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-5">
        {collections.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-between">
              {/* Product */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              {/* Price */}
              <p className="font-semibold text-red-500">Rs. {item.price}</p>
            </div>
            <div className="my-5 h-px w-full bg-gray-300" />
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-red-500">Rs. XXXXX</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-red-500">Rs. XXXXX</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-red-500">- Rs. XXXXX</span>
        </div>

        <div className="my-5 h-px w-full bg-gray-300" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-red-500">Rs. XXXXX</span>
        </div>
      </div>
    </div>
  );
}
