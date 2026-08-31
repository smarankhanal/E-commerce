import { Router } from "express";
import {
  calculateCheckOutPricing,
  orderHistory,
  checkOut,
  orderSingleHistoryDetails,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/calculate-checkout-pricing").post(verifyJWT, calculateCheckOutPricing);
router.route("/checkout").post(verifyJWT, checkOut);
router.route("/order-history").get(verifyJWT, orderHistory);
router.route("/order-history/:orderId").get(verifyJWT, orderSingleHistoryDetails);
export default router;
