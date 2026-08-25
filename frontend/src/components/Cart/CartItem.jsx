import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCart } from "../../store/slices/cartSlice";

export default function CartItem({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailImage = item.image?.find((img) => img.side === "detail");

  const defaultSize = item?.selectedSize;

  const remove = () => {
    dispatch(
      removeCart({ productId: item.productId, selectedSize: defaultSize }),
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 relative">
      {/* Image */}
      <div className="flex justify-center">
        <img
          src={detailImage?.url}
          alt={item?.name}
          className="h-48 w-48 rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center flex-wrap gap-2">
            {item?.name}

            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {item?.selectedSize}
            </span>
          </h2>

          <p className="mt-1.5 flex items-center text-sm text-gray-600">
            <span className="font-medium">{item?.quantity}</span>
            <span className="mx-2 text-gray-400">×</span>
            <span className="font-bold text-blue-600 text-base">
              Rs. {item?.price}
            </span>
          </p>
        </div>

        <button
          className="rounded-lg border-2 border-blue-800 bg-blue-800 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:shadow-lg cursor-pointer"
          onClick={() => navigate(`/product/${item.sku}`)}
        >
          Explore
        </button>
      </div>

      {/* Delete */}
      <div
        className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-red-600"
        onClick={() => remove()}
      >
        <MdDeleteForever size={24} />
      </div>
    </div>
  );
}
