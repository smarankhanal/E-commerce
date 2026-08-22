import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector({ className }) {
  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((prev) => prev + 1);
  const decrase = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center rounded-lg border border-gray-300 ">
        <button
          onClick={decrase}
          className="flex items-center justify-center h-11 w-11 transition-all  cursor-pointer"
        >
          <FiMinus />
        </button>
        <div className="flex h-11 w-14 items-center justify-center border-x  text-base font-semibold">
          {quantity}
        </div>
        <button
          onClick={increase}
          className="flex items-center justify-center h-11 w-11 transition-all cursor-pointer"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
