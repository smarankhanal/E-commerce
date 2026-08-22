import React, { useEffect } from "react";
import {
  AddReview,
  ProductDescription,
  ProductGallery,
  ProductReviews,
  QuantitySelector,
  SizeSelector,
} from "../components";
import { Button, Input } from "../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../store/slices/productSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { sku } = useParams();
  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getSingleProduct(sku));
  }, [sku, dispatch]);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 mt-30">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left */}
        <ProductGallery product={product} />

        {/* Right */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>

            <p className="mt-2 text-2xl font-semibold text-blue-600">
              Rs. {product?.price}
            </p>
          </div>

          <SizeSelector />

          <div className="flex justify-between">
            <QuantitySelector />
            <div className="flex gap-3">
              <Button
                text={product?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                disabled={product?.stock == 0}
              />
            </div>
          </div>
          <ProductDescription product={product} />
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
