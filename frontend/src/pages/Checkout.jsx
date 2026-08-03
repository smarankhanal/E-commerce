import React from "react";
import { BillingMethod, OrderDetails, PaymentMethod } from "../components";

export default function Checkout() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Heading */}
      <div className=" flex justify-center items-center mb-10">
        <h1 className="text-3xl font-bold">CheckOut</h1>
      </div>

      {/* OrderDetails */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <BillingMethod />

        {/* PayMent and Billing */}
        <div className="space-y-8">
          <OrderDetails />
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
}
