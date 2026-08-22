import { Router } from "express";
import { getAllCollection, getSingleCollection } from "../controllers/collection.controller.js";
const router = Router();
router.route("/").get(getAllCollection);
router.route("/:slug").get(getSingleCollection);
export default router;
