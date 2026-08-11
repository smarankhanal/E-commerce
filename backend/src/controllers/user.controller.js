import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { toCapitalize } from "../utils/capitalize.js";
import { sendOtpService, verifyOtpService } from "../services/otp.service.js";
import { generateResetToken } from "../utils/resetToken.js";
import crypto from "crypto";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  let { userName, fullName, email, password, phoneNumber } = req.body;
  if (
    [userName, fullName, email, password, phoneNumber].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username exists already");
  }
  fullName = toCapitalize(fullName);
  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    password,
    email,
    phoneNumber,
  });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res.status(201).json(new ApiResponse(201, createdUser, "User registered Successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier) {
    throw new ApiError(400, "Username or email is missing");
  }
  if (!password) {
    throw new ApiError(400, "Password is missing");
  }
  const user = await User.findOne({
    $or: [{ userName: identifier.toLowerCase() }, { email: identifier.toLowerCase() }],
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "User doesnot exists");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged In Successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user?._id).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isOldPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordValid) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;

  await user.save();

  return res.status(200).json(new Response(200, {}, "Password changed successfully"));
});
const forgotPassword = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "Username and email are required");
  }
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
    userName: username,
  });
  if (!user) {
    throw new ApiError(404, "Invalid username or email");
  }
  await sendOtpService(email, "forgot-password");
  return res.status(200).json(new Response(200, null, "OTP sent successfully"));
});

const verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { username, email, otp } = req.body;

  if (!username || !email || !otp) {
    throw new ApiError(400, " Email ,username and OTP are required");
  }
  const user = await User.findOne({
    userName: username,
    email: email.toLowerCase().trim(),
  });
  if (!user) {
    throw new ApiError(404, "Invalid username or email");
  }
  await verifyOtpService(email, "forgot-password", otp);
  const { resetToken, resetTokenHash } = generateResetToken();
  console.log("ResetToken", resetToken);

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, resetToken, "OTP verified successfully"));
});
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    throw new ApiError(400, "Reset token and new password are required");
  }

  const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpiresAt: {
      $gt: new Date(),
    },
  }).select("+resetPasswordToken +resetPasswordExpiresAt");

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  user.password = newPassword;

  // Invalidate token after use
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;

  await user.save();

  return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
};
