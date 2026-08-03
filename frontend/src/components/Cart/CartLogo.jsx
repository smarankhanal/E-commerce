import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function CartLogo() {
  const cartCount = 3; // Example count
  const navigate = useNavigate();
  return (
    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
      <MdOutlineShoppingCart
        size={30}
        className="text-(--nav-text) hover:opacity-80"
      />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {cartCount}
        </span>
      )}
    </div>
  );
}
