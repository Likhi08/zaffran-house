import express from "express";
import { body } from "express-validator";
import { createOffer, deleteOffer, getOffers, updateOffer } from "../controllers/offerController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();
const rules = [body("title").trim().notEmpty(), body("description").trim().notEmpty()];

router.get("/", getOffers);
router.post("/", protect, adminOnly, rules, validate, createOffer);
router.put("/:id", protect, adminOnly, rules, validate, updateOffer);
router.delete("/:id", protect, adminOnly, deleteOffer);

export default router;
