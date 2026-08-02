import React, { useState } from "react";
import esewa from "../../assets/images/esewa.png";

export default function PaymentMethod() {
  const [payment, setPayment] = useState("cod");

  return (
    <div className="rounded-2xl bg-white shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

      {/* Cash on Delivery */}
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={payment === "cod"}
          onChange={() => setPayment("cod")}
          className="mt-1 h-5 w-5 accent-blue-600"
        />

        <div>
          <p className="text-lg font-medium text-gray-800">Cash on Delivery</p>

          {payment === "cod" && (
            <p className="mt-2 text-sm text-gray-500">
              Pay with cash upon delivery.
            </p>
          )}
        </div>
      </label>

      <hr className="my-6 border-t border-dashed border-gray-300" />

      {/* eSewa */}
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="esewa"
          checked={payment === "esewa"}
          onChange={() => setPayment("esewa")}
          className="mt-1 h-5 w-5 accent-green-600"
        />

        <div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-medium text-gray-800">eSewa</p>

            <img src={esewa} alt="eSewa" className="h-8 object-contain" />
          </div>

          {payment === "esewa" && (
            <p className="mt-2 text-sm text-gray-500">
              You will be redirected to eSewa to complete your payment securely.
            </p>
          )}
        </div>
      </label>

      <hr className="my-6 border-t border-dashed border-gray-300" />

      <p className="text-sm leading-6 text-gray-500">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </p>

      <button
        className={`mt-6 w-full rounded-lg py-4 text-lg font-semibold text-white transition duration-300 ${
          payment === "cod"
            ? "bg-gray-900 hover:bg-black"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {payment === "cod" ? "Place Order" : "Proceed to eSewa"}
      </button>
    </div>
  );
}
