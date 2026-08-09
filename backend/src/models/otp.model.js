import mongoose, { Schema } from "mongoose";
const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["registration", "forgot-password"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const OTP = mongoose.model("OTP", otpSchema);
