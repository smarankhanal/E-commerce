import React from "react";

export default function InputError({ msg }) {
  return (
    <p className=" text-xs font-medium text-red-600 flex items-center gap-1">
      {msg}
    </p>
  );
}
