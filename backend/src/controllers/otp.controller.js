import { sendOtpService, verifyOtpService } from "../services/otp.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const sendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;
  if (!email || !purpose) {
    throw new ApiError(400, "Email or purpose is missing");
  }
  await sendOtpService(email, purpose);
  return res.status(200).json(new ApiResponse(200, {}, "OTP sent successfully"));
});
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, purpose, otp } = req.body;
  if (!email || !purpose || !otp) {
    throw new ApiError(400, "Email or purpose or otp is missing");
  }
  await verifyOtpService(email, purpose, otp);
  return res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});

export { sendOtp, verifyOtp };
