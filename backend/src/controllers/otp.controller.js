import { sendOtpService, verifyOtpService } from "../services/otp.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateResetToken } from "../utils/resetToken.js";
const resendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;
  if (!email || !purpose) {
    throw new ApiError(400, "Email or purpose is missing");
  }
  await sendOtpService(email, purpose);
  return res.status(200).json(new ApiResponse(200, {}, "OTP sent successfully"));
});
const verifyRegistrationOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new ApiError(400, "Email or otp is missing");
  }
  await verifyOtpService(email, "registration", otp);
  return res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});
const verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, " Email  and OTP are required");
  }
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });
  if (!user) {
    throw new ApiError(404, "Invalid  user");
  }
  await verifyOtpService(email, "forgot-password", otp);
  const { resetToken, resetTokenHash } = generateResetToken();

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, { resetToken }, "OTP verified successfully"));
});
export { resendOtp, verifyRegistrationOtp, verifyForgotPasswordOtp };
