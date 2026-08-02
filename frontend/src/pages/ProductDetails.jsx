import React from "react";
import {
  AddReview,
  ProductDescription,
  ProductGallery,
  ProductReviews,
  QuantitySelector,
  SizeSelector,
} from "../components";
import { Button, Input } from "../components";

export default function ProductDetails() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 mt-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left */}
        <ProductGallery />

        {/* Right */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Premium Cotton T-Shirt
            </h1>

            <p className="mt-2 text-2xl font-semibold text-blue-600">
              Rs. 1,299
            </p>
          </div>

          <SizeSelector />

          <div className="flex justify-between">
            <QuantitySelector />
            <div className="flex gap-3">
              <Button text="Add to cart" />
            </div>
          </div>
          <ProductDescription />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 space-y-10">
        <ProductReviews />
        <AddReview />
      </div>
    </div>
  );
}
