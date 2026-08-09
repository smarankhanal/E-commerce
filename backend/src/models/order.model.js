import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingAddress: {
      country: {
        type: String,
        enum: ["Nepal"],
        default: "Nepal",
      },

      province: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
