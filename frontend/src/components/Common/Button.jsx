import React from "react";

export default function Button({ type = "button", text, ...props }) {
  return (
    <button className="btn btn-primary" type={type} {...props}>
      {text}
    </button>
  );
}
