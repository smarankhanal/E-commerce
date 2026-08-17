import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import { generateOtp, hashOtp } from "../utils/generateOtp.js";
import { sendOtpMail } from "../utils/mail.js";
import { PendingUser } from "../models/PendingUser.model.js";
import { toCapitalize } from "../utils/capitalize.js";

const sendOtpService = async (email, purpose) => {
  try {
    email = email.toLowerCase().trim();
    if (!["registration", "forgot-password"].includes(purpose)) {
      throw new ApiError(400, "Invalid otp purpose");
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
        throw new ApiError(404, "User with this email doesnot exist");
      }
    }
    await OTP.deleteMany({ email, purpose });
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 100 * 60 * 1000);
    await OTP.create({
      email,
      otp: otpHash,
      purpose,
      expiresAt,
    });
    await sendOtpMail(email, otp, purpose);
    return true;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Something went wrong while sending OTP");
  }
};
const verifyOtpService = async (email, purpose, otp) => {
  try {
    email: email.toLowerCase().trim();
    console.log(email);
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
    console.log(enteredOtpHash);

    if (otpRecord.otp !== enteredOtpHash) {
      throw new ApiError(400, "Invalid OTP");
    }
    if (purpose === "registration") {
      const pendingUser = await PendingUser.findOne({ email }).select("+password");
      console.log(pendingUser);
      if (!pendingUser) {
        throw new ApiError(404, "Registration data expired or not found");
      }
      const userName = toCapitalize(pendingUser.userName);
      const user = await User.create({
        userName: userName,
        fullName: pendingUser.fullName,
        email: pendingUser.email,
        password: pendingUser.password,
        phoneNumber: pendingUser.phoneNumber,
      });
      const a = await PendingUser.deleteOne({
        _id: pendingUser._id,
      });
      console.log(a);
      const b = await OTP.deleteOne({
        _id: otpRecord._id,
      });
      console.log(b);
      return user;
    }
    if (purpose === "forgot-password") {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApiError(404, "User does not exist");
      }

      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      return user;
    }
    return true;
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
      throw error;
    }
  }
};
export { sendOtpService, verifyOtpService };
