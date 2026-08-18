import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  changePasswordValidator,
  registerValidator,
  resetPasswordValidator,
  updateAccountValidator,
} from "../validators/auth.validators.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();
//------ Auth ------
router.route("/sign-up").post(registerValidator, validate, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/change-password")
  .post(verifyJWT, changePasswordValidator, validate, changeCurrentPassword);

//---- Forgot Password -----
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPasswordValidator, validate, resetPassword);

//---- Update Account Details -----
router
  .route("/update-account-details")
  .post(verifyJWT, updateAccountValidator, validate, updateAccountDetails);
export default router;
