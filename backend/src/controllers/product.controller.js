import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true })
    .populate("collections", "name")
    .sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
export { getAllProduct };
