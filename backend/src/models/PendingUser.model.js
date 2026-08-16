import mongoose, { Schema } from "mongoose";

const PendingUserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
      expires: 0,
    },
  },
  { timestamps: true }
);
export const PendingUser = mongoose.model("PendingUser", PendingUserSchema);
