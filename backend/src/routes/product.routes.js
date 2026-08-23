import { Router } from "express";
import {
  getAllProduct,
  getBestSellers,
  getSingleProduct,
} from "../controllers/product.controller.js";
const router = Router();
router.route("/").get(getAllProduct);
router.route("/best-sellers").get(getBestSellers);
router.route("/:sku").get(getSingleProduct);
export default router;
