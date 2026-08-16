import { Router } from "express";
import {
  resendOtp,
  verifyRegistrationOtp,
  verifyForgotPasswordOtp,
} from "../controllers/otp.controller.js";

const router = Router();
router.route("/re-send").post(resendOtp);
router.route("/verify-registration-otp").post(verifyRegistrationOtp);
router.route("/verify-forgot-password-otp").post(verifyForgotPasswordOtp);

export default router;
