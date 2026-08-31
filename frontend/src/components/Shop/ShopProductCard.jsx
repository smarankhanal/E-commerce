import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import QuantitySelector from "../Product/QuantitySelector";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../../store/slices/cartSlice";

export default function ShopProductCard({ product }) {
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
  const detailImage = product.image?.find((img) => img.side === "detail");
  return (
    <div className="group w-full">
      {/* Product Image */}
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={detailImage?.url}
          alt={product?.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Out of Stock */}
        {product.stock === 0 && (
          <span className="absolute right-3 top-4 z-10 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-medium text-white">
            Out of Stock
          </span>
        )}

        {/* Collections */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-md">
          {product.collections?.map((collection, index) => (
            <span key={collection._id}>
              {collection.name}
              {index < product.collections.length - 1 && " • "}
            </span>
          ))}
        </div>

        {/* Cart Controls */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          {/* Quantity */}
          <div className="rounded-xl border border-white/30 bg-black/30 p-1 text-white backdrop-blur-md hover:bg-black/10">
            <QuantitySelector product={product} selectedSize={defaultSize} />
          </div>

          {/* Add to Cart */}

          <Button
            text={
              product.stock === 0
                ? "Out of Stock"
                : isInCart
                  ? "Remove from Cart"
                  : "Add to Cart"
            }
            variant={isInCart ? "danger" : "primary"}
            className={`flex-1 rounded-xl border py-3 text-sm font-medium transition ${
              product.stock === 0
                ? "cursor-not-allowed border-white/10 bg-gray-400/40 text-gray-300"
                : isInCart
                  ? "cursor-pointer border-red-500/30 bg-red-600/80 text-white backdrop-blur-md hover:bg-red-600/60"
                  : "cursor-pointer border-white/30 bg-black/70 text-white backdrop-blur-md hover:bg-black/45"
            }`}
            disabled={product.stock === 0}
            onClick={() => (isInCart ? remove() : add())}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-gray-900">
              {product?.name}
            </h3>

            <p className="mt-3 text-lg font-semibold text-gray-900">
              Rs. {product?.price || 1000}
            </p>
          </div>

          <button
            className="mt-1 flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 transition-all group-hover:gap-2 cursor-pointer"
            onClick={() => navigate(`/product/${product.sku}`)}
          >
            View
            <FiArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
