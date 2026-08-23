import React from "react";

export default function Button({
  type = "button",
  variant = "primary",
  text,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} disabled:cursor-not-allowed`}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}
