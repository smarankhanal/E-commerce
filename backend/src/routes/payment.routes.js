import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { initiatePayment, verifyPayment } from "../controllers/payment.controller.js";
const router = Router();
router.route("/initiate").post(verifyJWT, initiatePayment);
router.route("/success").post(verifyJWT, verifyPayment);
export default router;
