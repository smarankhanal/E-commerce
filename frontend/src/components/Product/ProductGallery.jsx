import React, { useEffect, useState } from "react";
export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const detailImage = product?.image?.find((img) => img.side === "detail");

    setSelectedImage(detailImage || null);
  }, [product]);
  return (
    <div className="flex flex-col gap-5">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl  bg-white cursor-pointer">
        <img
          src={selectedImage?.url}
          alt={selectedImage?.side}
          className="h-125 w-full object-cover transition-all duration-300 hover:scale-110"
        />
        {product?.stock === 0 && (
          <span className="absolute right-3 top-4 z-10 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-medium text-white">
            Out of Stock
          </span>
        )}
      </div>
      <div className="flex gap-3">
        {/* Thumbnails */}
        {product?.image.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img
              src={img.url}
              alt={`Thumbnail ${idx + 1}`}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
