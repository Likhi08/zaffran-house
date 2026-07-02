import express from "express";
import { body } from "express-validator";
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem, uploadGalleryImage } from "../controllers/galleryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();
const rules = [body("title").trim().notEmpty(), body("image").trim().notEmpty().withMessage("Image is required")];

router.get("/", getGalleryItems);
router.post("/upload", protect, adminOnly, uploadGalleryImage);
router.post("/", protect, adminOnly, rules, validate, createGalleryItem);
router.put("/:id", protect, adminOnly, rules, validate, updateGalleryItem);
router.delete("/:id", protect, adminOnly, deleteGalleryItem);

export default router;
