import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function AddReview() {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="rounded-xl border border-gray-400 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add Review</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="cursor-pointer rounded-full border p-2 transition hover:bg-gray-100"
        >
          {showForm ? <FiMinus /> : <FiPlus />}
        </button>
      </div>

      {showForm && (
        <form className="mt-6 space-y-5">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Rating */}
          <div>
            <p className="mb-2 font-medium text-gray-800">Your Rating</p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <FaStar
                    size={28}
                    className={`${
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={5}
            placeholder="Write your review..."
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg border border-black bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-md active:scale-95"
          >
            <FiPlus size={18} />
            Add Review
          </button>
        </form>
      )}
    </div>
  );
}
