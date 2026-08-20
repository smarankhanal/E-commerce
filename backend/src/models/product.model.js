import mongoose, { Schema } from "mongoose";

const productImageSchema = new Schema(
  {
    side: {
      type: String,
      enum: ["left", "right", "front", "back", "detail"],
      required: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const productSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    highlights: {
      type: [String],
      required: true,
    },
    image: {
      type: [productImageSchema],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
        index: true,
      },
    ],
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
