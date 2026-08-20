import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
      },
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timeStamps: true }
);
export const Collection = mongoose.model("Collection", collectionSchema);
