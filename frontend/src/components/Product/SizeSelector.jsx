import React, { useState } from "react";
import Size from "../Common/Size";
export default function ({ sizes = [], selectedSize, onSizeChange }) {
  return (
    <div className="space-y-3">
      <p className="font-medium">
        Size : <span className="font-bold">{selectedSize}</span>
      </p>

      <div className="flex gap-3">
        {sizes.map((size) => (
          <Size
            key={size}
            text={size}
            selected={selectedSize === size}
            onClick={() => onSizeChange(size)}
          />
        ))}
      </div>
    </div>
  );
}
