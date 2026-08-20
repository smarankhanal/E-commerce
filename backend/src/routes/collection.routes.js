import { Router } from "express";
import { getAllCollection } from "../controllers/collection.controller.js";
const router = Router();
router.route("/").get(getAllCollection);
export default router;
