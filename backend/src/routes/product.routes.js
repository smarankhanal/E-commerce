import { Router } from "express";
import { getAllProduct } from "../controllers/product.controller.js";
const router = Router();
router.route("/").get(getAllProduct);
export default router;
