import React, { useState } from "react";
import esewa from "../../assets/images/esewa.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder as placeOrderThunk } from "../../store/slices/checkOutSlice";
import { useForm } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";
import Toast from "../Common/Toast";
import { clearCart } from "../../store/slices/cartSlice";

export default function PaymentMethod({ checkoutDetails }) {
  const [payment, setPayment] = useState("cod");
  const { items } = useSelector((state) => state.cart);
  const { status, error } = useSelector((state) => state.checkout);
  const { handleSubmit } = useForm();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      await dispatch(
        placeOrderThunk({
          products: items,
          shippingAddress: checkoutDetails?.shippingAddress,
          orderNotes: checkoutDetails?.orderNotes || "",
          paymentMethod: payment,
          location: checkoutDetails?.location || {
            latitude: null,
            longitude: null,
          },
        }),
      ).unwrap();
      dispatch(clearCart());
      setShowToast(true);
      setTimeout(() => {
        navigate("/order-history");
      }, 1900);
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  const errorMessage =
    error?.error ||
    error?.message ||
    (typeof error === "string" ? error : null);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      {/* Heading */}
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Payment Method
      </h2>

      <form onSubmit={handleSubmit(handlePlaceOrder)}>
        {/* Cash on Delivery */}
        <label className="flex cursor-pointer items-start gap-4">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
            className="mt-1 h-5 w-5 accent-blue-600"
          />

          <div>
            <p className="text-lg font-medium text-gray-800">
              Cash on Delivery
            </p>

            {payment === "cod" && (
              <p className="mt-2 text-sm text-gray-500">
                Pay with cash upon delivery.
              </p>
            )}
          </div>
        </label>

        <hr className="my-6 border-t border-dashed border-gray-300" />

        {/* eSewa */}
        <label className="flex cursor-pointer items-start gap-4">
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
                You will be redirected to eSewa to complete your payment
                securely.
              </p>
            )}
          </div>
        </label>

        <hr className="my-6 border-t border-dashed border-gray-300" />

        {/* Privacy text */}
        <p className="text-sm leading-6 text-gray-500">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>

        {/* Backend Error */}
        {status === "failed" && errorMessage && (
          <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <FiAlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />

            <div>
              <p className="font-semibold text-red-700">
                Unable to place order
              </p>

              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Place Order Button */}
        <button
          type="submit"
          disabled={status === "pending"}
          className={`cursor-pointer  hover:scale-98 mt-6 w-full rounded-lg py-4 text-lg font-semibold text-white transition duration-300 ${
            payment === "cod"
              ? "bg-gray-900 hover:bg-black"
              : "bg-green-600 hover:bg-green-700"
          } `}
        >
          {payment === "cod" ? "Place Order" : "Proceed to eSewa"}
        </button>
      </form>
      {showToast && <Toast message="Order placed successfully" />}
    </div>
  );
}
