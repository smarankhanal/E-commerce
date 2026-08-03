import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="relative w-80">
      <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) cursor-pointer hover:scale-105" />
      <input
        type="text"
        placeholder="Search products..."
        className="
          w-full
          p-2
          rounded-xl
          border
          border-(--input-border)
          bg-(--input-bg)
          text-(--input-text)
          placeholder:text-(--input-placeholder)
          outline-none
          focus:border-(--input-border-focus)
          focus:ring-2
          focus:ring-(--input-focus-shadow)
        "
      />
    </div>
  );
}
