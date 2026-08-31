import React from "react";

export default function Size({ text = "", selected = false, onClick, stock }) {
  return (
    <button
      onClick={onClick}
      disabled={stock === 0}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200
    ${
      stock === 0
        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
        : selected
          ? "cursor-pointer border-blue-600 bg-blue-600 text-white"
          : "cursor-pointer border-gray-300 bg-white text-gray-800 hover:border-blue-600 hover:text-blue-600"
    }
  `}
    >
      {text}
    </button>
  );
}
