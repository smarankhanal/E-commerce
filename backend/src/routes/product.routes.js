import { Router } from "express";
import { getAllProduct, getSingleProduct } from "../controllers/product.controller.js";
const router = Router();
router.route("/").get(getAllProduct);
router.route("/:sku").get(getSingleProduct);
export default router;
