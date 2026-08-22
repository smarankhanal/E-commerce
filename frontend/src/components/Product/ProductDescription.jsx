import React from "react";

export default function ProductDescription({ product }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className=" text-gray-600">{product?.description}</p>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Highlights</h3>

        <ul className="space-y-2 text-gray-600">
          {product?.highlights.map((highlight, idx) => (
            <li key={idx}>✔ {highlight}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
