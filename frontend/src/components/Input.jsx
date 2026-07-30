import React from "react";

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  label,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2 mt-2 ">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-gray-300 p-2 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
