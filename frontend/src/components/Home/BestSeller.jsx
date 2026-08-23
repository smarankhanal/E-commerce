import React from "react";
import ProductCard from "../Product/ProductCard";

export default function BestSeller({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-(--text-primary) text-4xl font-bold">
          Best Sellers
        </h2>

        <p className="mt-3 text-(--text-secondary)">
          Discover our most loved fashion pieces.
        </p>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
