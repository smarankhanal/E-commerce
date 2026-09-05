import React from "react";
import PaymentFailure from "./PaymentFailure";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { verifyEsewaPayment } from "../../store/slices/paymentSlice";
import { clearCart } from "../../store/slices/cartSlice";
import { base64Decode } from "../../utils/esewa";

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const encodedData = searchParams.get("data");
        console.log(encodedData);
        if (!encodedData) {
          throw new Error("Payment data not received");
        }
        const decodedData = base64Decode(encodedData);
        const { transaction_uuid } = decodedData;
        if (!transaction_uuid) {
          throw new Error("Invalid payment response");
        }
        const orderId = sessionStorage.getItem("esewaOrderId");
        await dispatch(
          verifyEsewaPayment({ orderId, transaction_uuid }),
        ).unwrap();
        dispatch(clearCart());
        sessionStorage.removeItem("esewaOrderId");

        setStatus("success");

        setTimeout(() => {
          navigate("/order-history");
        }, 2000);
      } catch (error) {
        console.error("Payment verification failed:", error);

        setStatus("failed");
      }
    };
    verifyPayment();
  }, [dispatch, navigate, searchParams]);
  if (status === "verifying") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Verifying Payment...</h1>

          <p className="mt-2 text-gray-500">
            Please wait while we confirm your eSewa payment.
          </p>
        </div>
      </div>
    );
  }
  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="mt-3 text-gray-600">
            Your order has been placed successfully.
          </p>
        </div>
      </div>
    );
  }
  return <PaymentFailure />;
}
