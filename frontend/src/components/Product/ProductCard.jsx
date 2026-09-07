import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../../store/slices/cartSlice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const defaultSize = product?.sizes?.find((item) => item.stock > 0)?.size;
  const isInCart = cartItems.some(
    (item) =>
      item.productId === product?._id && item.selectedSize === defaultSize,
  );

  const add = () => {
    dispatch(addToCart({ product }));
  };
  const remove = () => {
    dispatch(removeCart({ productId: product._id, selectedSize: defaultSize }));
  };
  const detailImage = product?.image.find((img) => img.side === "detail");
  return (
    <div className="group relative w-72 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={detailImage?.url}
          alt={detailImage?.name || product?.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Collection Badges */}
        {product?.collections?.length > 0 && (
          <div className="absolute left-3 top-3 flex max-w-[85%] flex-wrap items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-md border border-white/40 shadow-sm">
            {product.collections.map((collection, index) => (
              <span key={collection._id || index} className="truncate">
                {collection.name}
                {index < product.collections.length - 1 && (
                  <span className="mx-1 text-gray-400">•</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-col p-5">
        <h3 className="font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
          {product?.name}
        </h3>

        {/* Price & Action Row */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Price
            </span>
            <span className="text-lg font-extrabold text-gray-900">
              Rs {product?.price?.toLocaleString()}
            </span>
          </div>

          {isInCart ? (
            <Button
              text="Remove"
              onClick={() => remove()}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold transition-transform active:scale-95"
              variant="danger"
            />
          ) : (
            <Button
              text="Add to Cart"
              onClick={() => add()}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold transition-transform active:scale-95"
            />
          )}
        </div>

        <hr className="my-4 border-gray-100" />

        {/* Navigation Button */}
        <button
          className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-600 transition-all hover:text-blue-700"
          onClick={() => navigate(`/product/${product?.sku}`)}
        >
          <span>Explore Product</span>
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
