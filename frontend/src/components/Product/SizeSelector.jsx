import React, { useState } from "react";
import Size from "../Common/Size";
export default function ({ sizes = [], selectedSize, onSizeChange }) {
  return (
    <div className="space-y-3">
      <p className="font-medium">
        Size : <span className="font-bold">{selectedSize}</span>
      </p>

      <div className="flex gap-3">
        {sizes.map((item, idx) => (
          <Size
            key={idx}
            text={item.size}
            selected={selectedSize === item.size}
            onClick={() => onSizeChange(item.size)}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
}
