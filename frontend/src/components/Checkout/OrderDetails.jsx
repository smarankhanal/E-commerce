import { useSelector } from "react-redux";

export default function OrderDetails({ checkoutDetails }) {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      {/* Heading */}
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Order Summary
      </h2>

      {/* Products */}
      <div className="space-y-4">
        {items?.map((item) => {
          const detailImage = item.image?.find((img) => img.side === "detail");

          return (
            <div
              key={item.id}
              className="grid grid-cols-[64px_minmax(0,1fr)_90px] items-center gap-4 border-b border-gray-200 pb-4"
            >
              {/* Product Image */}
              <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-50">
                <img
                  src={detailImage?.url}
                  alt={item?.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Information */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-blue-600">
                  {item.name}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                    {item.selectedSize}
                  </span>

                  <span className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>

              {/* Product Price */}
              <div className="text-right">
                <p className="text-sm font-semibold text-red-500">
                  Rs.
                  {Number(item.price).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>

          <span className="text-sm font-medium text-red-500">
            Rs. {checkoutDetails?.subtotal?.toLocaleString() || 0}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Shipping</span>

          <span className="text-sm font-medium text-red-500">
            Rs. {checkoutDetails?.shippingCharge?.toLocaleString() || 0}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Discount</span>

          <span className="text-sm font-medium text-red-500">
            - Rs. {checkoutDetails?.discount?.toLocaleString() || 0}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-4" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">Total</span>

          <span className="text-lg font-bold text-red-500">
            Rs. {checkoutDetails?.totalAmount?.toLocaleString() || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
