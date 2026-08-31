import { asyncHandler } from "../utils/asyncHandler.js";
import { Collection } from "../models/collection.model.js";
import { Product } from "../models/product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const getAllCollection = asyncHandler(async (req, res) => {
  const collections = await Collection.find({
    isActive: true,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, collections, "Collections fetched successfully"));
});

const getSingleCollection = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const collection = await Collection.findOne({
    slug,
    isActive: true,
  });

  if (!collection) {
    throw new ApiError(404, "Collection not found");
  }

  const products = await Product.find({
    collections: collection._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { collection, products }, "Collection fetched successfully"));
});

export { getAllCollection, getSingleCollection };
