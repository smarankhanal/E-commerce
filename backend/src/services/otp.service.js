import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import { generateOtp, hashOtp } from "../utils/generateOtp.js";
import { sendOtpMail } from "../utils/mail.js";
const sendOtpService = async (email, purpose) => {
  try {
    email = email.toLowerCase();
    if (!["registration", "forgot-password"].includes(purpose)) {
      throw new APiError(400, "Invalid otp purpose");
    }
    if (purpose === "registration") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
      }
    }
    if (purpose === "forgot-password") {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new ApiError(409, "User with this email doesnot exist");
      }
    }
    await OTP.deleteMany({ email, purpose });
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 5 * 6 * 1000);
    await OTP.create({
      email,
      otpHash,
      purpose,
      expiresAt,
    });
    await sendOtpMail(email, otp, purpose);
    return true;
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
      throw error;
    }
    throw new ApiError(500, "Something went wrong while sending OTP");
  }
};
const verifyOtpService = async (email, purpose, otp) => {
  try {
    email: email.toLowerCase();
    const otpRecord = await OTP.findOne({ email, purpose });
    if (!otpRecord) {
      throw new APiError(400, "OTP is invalid or expired");
    }
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({
        _id: otpRecord._id,
      });
      throw new ApiError(400, "OTP has expired");
    }
    const enteredOtpHash = hashOtp(otp);
    if (otpRecord.otp !== enteredOtpHash) {
      throw new ApiError(400, "Invalid OTP");
    }
    await OTP.deleteOne({
      _id: otpRecord._id,
    });
    return true;
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
      throw error;
    }
    throw new ApiError(500, "Something went wrong while sending OTP");
  }
};
export const { sendOtpService, verifyOtpService };
