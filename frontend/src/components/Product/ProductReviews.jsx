import React, { useState } from "react";
import { FiPlus, FiMinus, FiStar } from "react-icons/fi";

export default function ProductReviews() {
  const [showReviews, setShowReviews] = useState(false);
  const reviews = [
    {
      id: 1,
      name: "Smaran",
      rating: 5,
      comment: "Amazing quality. The fabric feels premium.",
    },
    {
      id: 2,
      name: "John",
      rating: 4,
      comment: "Good fitting and comfortable.",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-400  bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Review</h2>
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="rounded-full border p-2 hover:gray-200 cursor-pointer hover:bg-gray-100"
        >
          {showReviews ? <FiMinus /> : <FiPlus />}
        </button>
      </div>
      {showReviews && (
        <div className="mt-6 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{review.name}</h3>

                <div className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, index) => (
                    <FiStar key={index} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
