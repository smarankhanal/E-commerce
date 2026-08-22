import React from "react";
import { Search, ShopProductCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../store/slices/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const { error, status, products } = useSelector((state) => state.product);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProduct());
    }
  }, [dispatch, products.length]);
  return (
    <main className="px-4 py-6 md:px-6 lg:px-8">
      {/* Shop Header */}
      <div className="mb-8 flex justify-center items-center">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
            Our Shop
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Explore the Shop
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            Thoughtfully designed essentials made for your everyday.
          </p>
        </div>
        <div className="mb-8">
          <Search />
        </div>
      </div>

      {status === "loading" && (
        <div className="py-20 text-center text-gray-500">
          Loading products...
        </div>
      )}

      {/* Error */}
      {status === "failed" && (
        <div className="py-20 text-center text-red-500">
          {error || "Failed to load products."}
        </div>
      )}
      {status === "succeeded" && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ShopProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {/* Empty */}
      {status === "succeeded" && products.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No products available.
        </div>
      )}
    </main>
  );
}
