import React from "react";
import heroSeller from "../assets/images/t-shirt.jpg";
import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";

export default function ProductCard() {
  return (
    <div className="w-70 overflow-hidden rounded-xl bg-white cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(37,99,235,0.25)]">
      <img
        src={heroSeller}
        alt="T-shirt"
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-(--text-primary)">
          Classic T-Shirt
        </h3>

        <p className="mt-1 text-sm text-(--text-secondary)">Premium Cotton</p>

        <div className="mt-3 mb-2 flex items-center justify-between">
          <span className="text-lg font-bold text-(--product-price)">
            Rs 2,000
          </span>

          <Button text="Add to Cart" />
        </div>

        {/* Explore Product */}
        <button className="mt-4 flex items-center gap-2 text-(--primary) font-medium hover:gap-3 transition-all duration-300">
          Explore Product
          <FaArrowRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}
