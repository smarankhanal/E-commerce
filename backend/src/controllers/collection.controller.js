import { asyncHandler } from "../utils/asyncHandler.js";
import { Collection } from "../models/collection.model.js";
import ApiResponse from "../utils/ApiResponse.js";
const getAllCollection = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ isActive: true }).sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, collections, "Collections fetched successfully"));
});
export { getAllCollection };
