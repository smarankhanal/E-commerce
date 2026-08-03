import React from "react";
import { Link } from "react-router-dom";

export default function AnchorTag({ text, to }) {
  return (
    <Link to={to} className="anchor">
      {text}
    </Link>
  );
}
