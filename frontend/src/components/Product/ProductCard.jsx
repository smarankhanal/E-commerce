import React, { useState } from "react";
import heroSeller from "../../assets/images/t-shirt.jpg";
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
    <div className="w-70 overflow-hidden rounded-xl bg-white cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(37,99,235,0.25)]">
      <div className="relative">
        <img
          src={detailImage.url}
          alt={detailImage.name}
          className="h-52 w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-md">
          {product.collections?.map((collection, index) => (
            <span key={collection._id}>
              {collection.name}
              {index < product.collections.length - 1 && " • "}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-(--text-primary)">
          {product?.name}
        </h3>

        <div className="mt-3 mb-2 flex items-center justify-between">
          <span className="text-lg font-bold text-(--product-price)">
            Rs {product?.price}
          </span>

          {isInCart ? (
            <Button text="Remove" variant="danger" onClick={() => remove()} />
          ) : (
            <Button text="Add to Cart" onClick={() => add()} />
          )}
        </div>

        {/* Explore Product */}
        <button
          className="mt-4 flex items-center gap-2 text-(--primary) font-medium hover:gap-3 transition-all duration-300"
          onClick={() => navigate(`/product/${product.sku}`)}
        >
          Explore Product
          <FaArrowRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}
