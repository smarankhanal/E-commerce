import React, { forwardRef } from "react";

function Input(
  {
    type = "text",
    placeholder = "",
    label,
    required = false,
    className = "",
    ...props
  },
  ref,
) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        required={required}
        {...props}
        className={`w-full rounded-lg border border-gray-300 p-2 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 ${className}`}
      />
    </div>
  );
}
export default Input;
