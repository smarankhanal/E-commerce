import React from "react";

export default function Button({ text, ...props }) {
  return (
    <button className="btn btn-primary" {...props}>
      {text}
    </button>
  );
}
