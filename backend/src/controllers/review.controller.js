import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addReview = asyncHandler(async (req, res) => {
  const { review_text, star_rating } = req.body;
  const { productId } = req.params;
  const userId = req?.user._id;
  const review = await Review.create({
    user: userId,
    product: productId,
    review_text,
    star_rating,
  });
  if (!review) {
    throw new ApiError(404, "food review missing");
  }
  return res.status(200).json(new ApiResponse(200, review, "Product review added successfully"));
});
const getReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const review = await Review.find({ product: productId })
    .populate("user", "userName")
    .sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, review, "Product review fetch successfully"));
});
export { addReview, getReview };
