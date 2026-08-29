import React, { useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../store/slices/historySlice";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const { orders, status } = useSelector((state) => state.history);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-2xl sm:text-3xl font-semibold  text-gray-900">
          Order History
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Track and manage your recent orders
        </p>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div className="flex justify-center py-16">
          <p className="text-sm text-gray-500">Loading your orders...</p>
        </div>
      )}

      {/* Empty State */}
      {status === "succeeded" && orders?.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <p className="text-lg font-medium text-gray-900">No orders yet</p>

          <p className="mt-2 text-sm text-gray-500">
            Your orders will appear here once you make a purchase.
          </p>
        </div>
      )}

      {/* Order List */}
      {orders?.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 bg-gray-950 px-6 py-4 text-sm font-medium text-white">
            <p>Order ID</p>
            <p>Status</p>
            <p>Amount</p>
            <p></p>
          </div>

          {/* Orders */}
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-1 gap-4 px-5 py-5 transition sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center sm:px-6"
              >
                {/* Order ID */}
                <div>
                  <p className="mb-1 text-xs font-medium uppercase  text-gray-400 sm:hidden">
                    Order ID
                  </p>

                  <p className="font-medium text-gray-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>

                  {order.createdAt && (
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <p className="mb-1 text-xs font-medium uppercase text-gray-400 sm:hidden">
                    Status
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.status === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "confirmed"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Amount */}
                <div>
                  <p className="mb-1 text-xs font-medium uppercase text-gray-400 sm:hidden">
                    Amount
                  </p>

                  <p className="font-semibold text-gray-900">
                    Rs. {Number(order.totalAmount)}
                  </p>
                </div>
                <div>
                  <button
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
                    onClick={() => navigate(`/order-history/${order._id}`)}
                  >
                    <FiEye size={16} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
