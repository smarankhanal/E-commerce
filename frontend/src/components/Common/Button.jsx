import React from "react";

export default function Button({ type = "button", text, ...props }) {
  return (
    <button
      className="btn btn-primary disabled:cursor-not-allowed"
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}
