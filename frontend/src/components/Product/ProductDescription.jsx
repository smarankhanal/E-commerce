import React from "react";

export default function ProductDescription() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className=" text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        perferendis, magni architecto nobis repellendus magnam, fugiat a itaque
        ullam, delectus culpa! Autem asperiores rerum expedita illum aliquam
        optio tempore accusamus! Eos minima pariatur, ab quam, accusamus quis
      </p>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Highlights</h3>

        <ul className="space-y-2 text-gray-600">
          <li>✔ 100% Premium Cotton Fabric</li>
          <li>✔ Soft, Breathable & Lightweight</li>
          <li>✔ Regular Fit</li>
          <li>✔ Machine Washable</li>
          <li>✔ Perfect for Casual Wear</li>
        </ul>
      </div>
    </section>
  );
}
