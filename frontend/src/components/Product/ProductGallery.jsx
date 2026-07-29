import React, { useState } from "react";
import img from "../../assets/images/t-shirt.jpg";
import img1 from "../../assets/images/hero-image.jpg";

export default function ProductGallery() {
  const images = [img, img1, img, img1, img, img1];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <div className="flex flex-col gap-5">
      {/* Main Image */}
      <div className="overflow-hidden rounded-xl  bg-white cursor-pointer">
        <img
          src={selectedImage}
          alt="Product"
          className="h-125 w-full object-cover transition-all duration-300 hover:scale-110"
        />
      </div>
      <div className="flex gap-3">
        {/* Thumbnails */}
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${idx + 1}`}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
