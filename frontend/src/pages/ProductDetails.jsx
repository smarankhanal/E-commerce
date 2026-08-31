import React, { useEffect, useState } from "react";
import {
  AddReview,
  ProductDescription,
  ProductGallery,
  ProductReviews,
  QuantitySelector,
  SizeSelector,
} from "../components";
import { Button } from "../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../store/slices/productSlice";
import { addToCart, removeCart } from "../store/slices/cartSlice";
export default function ProductDetails() {
  const dispatch = useDispatch();
  const { sku } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!product?.sizes?.length) {
      setSelectedSize("");
      return;
    }
    const firstAvailableSize = product.sizes.find((item) => item.stock > 0);
    setSelectedSize(firstAvailableSize?.size || "");
  }, [product]);

  const isInCart = cartItems.some(
    (item) =>
      item.productId === product?._id && item.selectedSize === selectedSize,
  );
  const selectedVariant = product?.sizes?.find(
    (item) => item.size === selectedSize,
  );

  const selectedSizeOutOfStock = !selectedVariant || selectedVariant.stock <= 0;

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    if (selectedSizeOutOfStock) return;
    dispatch(
      addToCart({
        product,
        selectedSize,
      }),
    );
  };
  const handleRemoveFromCart = () => {
    if (!product || !selectedSize) {
      return;
    }
    dispatch(
      removeCart({
        productId: product._id,
        selectedSize,
      }),
    );
  };

  useEffect(() => {
    dispatch(getSingleProduct(sku));
  }, [(sku, dispatch)]);
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

          <SizeSelector
            sizes={product?.sizes}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />

          <div className="flex justify-between">
            <QuantitySelector product={product} selectedSize={selectedSize} />
            <div className="flex gap-3">
              <Button
                text={
                  product?.totalStock === 0
                    ? "Out of Stock"
                    : selectedSizeOutOfStock
                      ? "Size Out of Stock"
                      : isInCart
                        ? "Remove from Cart"
                        : "Add to Cart"
                }
                variant={isInCart ? "danger" : "primary"}
                disabled={
                  product?.totalStock === 0 ||
                  !selectedSize ||
                  selectedSizeOutOfStock
                }
                onClick={() =>
                  isInCart ? handleRemoveFromCart() : handleAddToCart()
                }
              />
            </div>
          </div>
          <ProductDescription product={product} />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 space-y-10">
        <ProductReviews productId={product?._id} />
        {user && <AddReview productId={product?._id} />}
      </div>
    </div>
  );
}
