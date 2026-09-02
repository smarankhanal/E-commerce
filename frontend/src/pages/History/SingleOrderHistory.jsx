import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleHistory } from "../../store/slices/historySlice";
import { useParams } from "react-router-dom";
import {
  OrderAmount,
  OrderPaymentDetails,
  OrderItemsDetails,
  AddressDetails,
} from "../../components";

export default function SingleOrderHistory() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { singleOrderItems } = useSelector((state) => state.history);
  console.log(singleOrderItems);
  useEffect(() => {
    dispatch(getSingleHistory(orderId));
  }, [dispatch]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Order Details
        </p>

        <p className="mt-1 text-sm text-gray-500">
          View your order summary, payment information, and order status.
        </p>
      </div>

      {/* Order Information */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <OrderItemsDetails singleOrderItems={singleOrderItems} />
      </div>

      {/* Order Amount + Payment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderAmount singleOrderItems={singleOrderItems} />

        <OrderPaymentDetails singleOrderItems={singleOrderItems} />
      </div>
      <AddressDetails
        shippingAddress={singleOrderItems?.shippingAddress}
        location={singleOrderItems?.location}
      />
    </div>
  );
}
