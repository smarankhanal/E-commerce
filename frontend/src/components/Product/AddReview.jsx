import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/slices/reviewSlice";
import { useForm, Controller } from "react-hook-form";

export default function AddReview({ productId }) {
  const [showForm, setShowForm] = useState(false);
  const [hover, setHover] = useState(0);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      review_text: "",
      star_rating: 0,
    },
  });

  const add = (data) => {
    dispatch(addReview({ productId, ...data }));
    reset();
  };

  return (
    <div className="rounded-xl border border-gray-400 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add Review</h2>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="cursor-pointer rounded-full border p-2 transition hover:bg-gray-100"
        >
          {showForm ? <FiMinus /> : <FiPlus />}
        </button>
      </div>

      {showForm && (
        <form className="mt-6 space-y-5" onSubmit={handleSubmit(add)}>
          {/* Rating */}
          <div>
            <p className="mb-2 font-medium text-gray-800">Your Rating</p>

            <Controller
              name="star_rating"
              control={control}
              rules={{
                validate: (value) => value > 0 || "Please select a rating",
              }}
              render={({ field }) => (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <FaStar
                        size={28}
                        className={`${
                          star <= (hover || field.value)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              )}
            />

            {errors.star_rating && (
              <p className="mt-1 text-sm text-red-500">
                {errors.star_rating.message}
              </p>
            )}
          </div>

          {/* Review Text */}
          <textarea
            rows={5}
            placeholder="Write your review..."
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            {...register("review_text", {
              required: "Please write a review",
            })}
          />

          {errors.review_text && (
            <p className="text-sm text-red-500">{errors.review_text.message}</p>
          )}

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
