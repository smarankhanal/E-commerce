import React from "react";
import { BillingDetails, OrderDetails, PaymentMethod } from "../components";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { checkoutDetails } = useSelector((state) => state.checkout);
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Heading */}
      <div className=" flex justify-center items-center mb-10">
        <h1 className="text-3xl font-bold">CheckOut</h1>
      </div>

      <div
        className="grid lg:gri
      d-cols-2 grid-cols-1 gap-10"
      >
        <BillingDetails checkoutDetails={checkoutDetails} />
        <div className="space-y-8">
          <OrderDetails checkoutDetails={checkoutDetails} />
          <PaymentMethod checkoutDetails={checkoutDetails} />
        </div>
      </div>
    </div>
  );
}
