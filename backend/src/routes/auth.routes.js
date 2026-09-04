import { Router } from "express";
import { refreshAccessToken } from "../controllers/auth.controller.js";

const router = Router();
router.route("/refresh").post(refreshAccessToken);
export default router;
