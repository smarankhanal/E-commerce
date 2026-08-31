import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addReview, getReview } from "../controllers/review.controller.js";
const router = Router();
router.route("/:productId").get(getReview);
router.route("/:productId").post(verifyJWT, addReview);
export default router;
