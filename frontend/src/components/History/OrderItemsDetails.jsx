import React from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function OrderItemsDetails({ singleOrderItems }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">Ordered Items</h2>

        <p className="mt-1 text-sm text-gray-500">
          Products included in this order
        </p>
      </div>

      {/* Products */}
      <div className="divide-y divide-gray-100">
        {singleOrderItems?.products?.map((item) => {
          const product = item.product;

          const productImage = product?.image?.find(
            (img) => img.side === "detail",
          )?.url;

          return (
            <div
              key={`${product?._id}-${item.size}`}
              className="flex gap-4 p-5"
            >
              {/* Product Image */}
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100  ">
                <img
                  src={productImage}
                  alt={product?.name}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-white backdrop-blur-sm transition hover:bg-black cursor-pointer"
                  onClick={() => navigate(`/product/${product.sku}`)}
                >
                  <FiEye size={10} />
                </button>
              </div>

              {/* Product Information */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                    {product?.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>
                      Size:
                      <span className="font-medium text-gray-900">
                        {item.size}
                      </span>
                    </span>

                    <span>
                      Quantity:
                      <span className="font-medium text-gray-900">
                        {item.quantity}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Rs.
                    {Number(item.price)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
