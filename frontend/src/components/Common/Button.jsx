import React from "react";

export default function Button({
  type = "button",
  variant = "primary",
  text,
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} disabled:cursor-not-allowed ${className}`}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}
