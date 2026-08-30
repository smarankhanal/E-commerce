import React, { useState } from "react";
import { useEffect } from "react";
import { FiPlus, FiMinus, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../store/slices/reviewSlice";

export default function ProductReviews({ productId }) {
  const [showReviews, setShowReviews] = useState(false);
  const { reviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReview(productId));
  }, [dispatch, productId]);

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
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-sm font-medium text-gray-400">
                No reviews yet
              </p>
              <p className="mt-1 text-xs text-gray-400/80">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review?.user?.userName}</h3>

                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, index) => (
                      <FiStar key={index} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-gray-600">{review.review_text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
