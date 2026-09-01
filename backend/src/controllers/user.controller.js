import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { toCapitalize } from "../utils/capitalize.js";
import { sendOtpService, verifyOtpService } from "../services/otp.service.js";
import { generateResetToken } from "../utils/resetToken.js";
import crypto from "crypto";
import { PendingUser } from "../models/PendingUser.model.js";
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
  fullName = toCapitalize(fullName);
  userName = userName.toLowerCase().trim();
  email = email.toLowerCase().trim();
  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username exists already");
  }
  let pendingUser = await PendingUser.findOne({ $or: [{ userName }, { email }] });
  if (pendingUser) {
    if (pendingUser) {
      pendingUser.userName = userName;
      pendingUser.fullName = fullName;
      pendingUser.password = password;
      pendingUser.phoneNumber = phoneNumber;

      await pendingUser.save();
    }
  } else {
    pendingUser = await PendingUser.create({
      userName,
      fullName,
      password,
      email,
      phoneNumber,
    });
  }
  await sendOtpService(email, "registration");

  return res
    .status(201)
    .json(new ApiResponse(201, { email }, "Registration started !! OTP send successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "Current user find succesfully"));
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
    throw new ApiError(401, "Invalid password");
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
  const { userName, email } = req.body;

  if (!userName || !email) {
    throw new ApiError(400, "Username and email are required");
  }
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
    userName,
  });
  if (!user) {
    throw new ApiError(404, "Invalid username or email");
  }
  await sendOtpService(email, "forgot-password");
  return res.status(200).json(new Response(200, null, "OTP sent successfully"));
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
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { userName, fullName, email, phoneNumber } = req.body;
  const updateData = {};
  if (userName !== undefined) updateData.userName = userName.trim();
  if (fullName !== undefined) updateData.fullName = fullName.trim();
  if (email !== undefined) updateData.email = email.trim().toLowerCase();
  if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber.trim();
  if (userName || email) {
    const existingUser = await User.findOne({
      $or: [
        ...(userName ? [{ userName }] : []),
        ...(email ? [{ email: email.toLowerCase() }] : []),
      ],
      _id: { $ne: req.user?._id },
    });

    if (existingUser) {
      if (existingUser.userName === userName) {
        throw new ApiError(409, "Username already exists");
      }
      if (existingUser.email === email.toLowerCase()) {
        throw new ApiError(409, "Email already exists");
      }
    }
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateData,
    },
    { new: true }
  ).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, user, "User deatils updated successfully"));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  forgotPassword,
  resetPassword,
  updateAccountDetails,
  getCurrentUser,
};
