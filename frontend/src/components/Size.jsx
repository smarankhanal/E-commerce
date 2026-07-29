import React from "react";

export default function Size({ text = "", selected = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer
        ${
          selected
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-800 border-gray-300 hover:border-blue-600 hover:text-blue-600"
        }`}
    >
      {text}
    </button>
  );
}
