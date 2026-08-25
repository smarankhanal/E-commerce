import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty } from "../../store/slices/cartSlice";

export default function QuantitySelector({ product, selectedSize }) {
  const dispatch = useDispatch();

  const itemInCart = useSelector((state) =>
    state.cart.items.find(
      (item) =>
        item.productId === product._id && item.selectedSize === selectedSize,
    ),
  );

  const quantity = itemInCart?.quantity || 0;

  const increase = () => {
    dispatch(
      increaseQty({
        productId: product._id,
        selectedSize,
      }),
    );
    // dispatch(increaseQty(product._id));
  };

  const decrease = () => {
    dispatch(
      decreaseQty({
        productId: product._id,
        selectedSize,
      }),
    );
    // dispatch(decreaseQty(product._id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center rounded-lg border border-gray-300">
        <button
          onClick={decrease}
          disabled={quantity <= 0}
          className="flex h-11 w-11 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiMinus />
        </button>

        <div className="flex h-11 w-14 items-center justify-center border-x text-base font-semibold">
          {quantity}
        </div>

        <button
          onClick={increase}
          className="flex h-11 w-11 cursor-pointer items-center justify-center"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
