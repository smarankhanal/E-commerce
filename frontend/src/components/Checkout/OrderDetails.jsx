import React from "react";
import img from "../../assets/images/t-shirt.jpg";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="rounded-2xl bg-white shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item._id}>
            <div className="flex items-center justify-between">
              {/* Product */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image.find((img) => img.side === "detail").url}
                  alt={item?.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div>
                  <p className="text-sm text-blue-500"> {item.name}</p>
                  {item.size && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {item.size}
                    </span>
                  )}
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
