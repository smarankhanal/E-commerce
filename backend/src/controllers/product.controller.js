import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true })
    .populate("collections", "name")
    .sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
const getSingleProduct = asyncHandler(async (req, res) => {
  const { sku } = req.params;
  const product = await Product.find({ sku }).populate("collections", "name");
  return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});
const getBestSellers = asyncHandler(async (req, res) => {
  const bestSellers = await Product.find({
    isActive: true,
    soldCount: { $gt: 0 },
  })
    .sort({ soldCount: -1 })
    .limit(4)
    .populate("collections", "name");

  if (bestSellers.length === 0) {
    const products = await Product.find({
      isActive: true,
    })
      .limit(3)
      .populate("collections", "name");

    return res
      .status(200)
      .json(new ApiResponse(200, products, "Best sellers fetched successfully"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, bestSellers, "Best sellers fetched successfully"));
});
const searchProduct = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q || !q.trim()) {
    throw new ApiError(400, "Search query is missing");
  }
  const searchQuery = q.trim();
  const products = await Product.find({
    isActive: true,
    name: {
      $regex: searchQuery,
      $options: "i",
    },
  })
    .select("name price image slug collections")
    .populate("collections", "name");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        products.length ? "Products Search Successfully" : "No products found"
      )
    );
});
export { getAllProduct, getSingleProduct, getBestSellers, searchProduct };
