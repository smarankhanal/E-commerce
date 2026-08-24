import { Router } from "express";
import {
  getAllProduct,
  getBestSellers,
  getSingleProduct,
  searchProduct,
} from "../controllers/product.controller.js";
const router = Router();
router.route("/search").get(searchProduct);
router.route("/best-sellers").get(getBestSellers);
router.route("/:sku").get(getSingleProduct);
router.route("/").get(getAllProduct);
export default router;
