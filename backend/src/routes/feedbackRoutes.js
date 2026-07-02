import express from "express";
import { body } from "express-validator";
import { createFeedback, deleteFeedback, getFeedback, getPublicFeedback, updateFeedback } from "../controllers/feedbackController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/public", getPublicFeedback);
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("message").trim().isLength({ min: 5 }).withMessage("Message is required")
  ],
  validate,
  createFeedback
);
router.get("/", protect, adminOnly, getFeedback);
router.put("/:id", protect, adminOnly, updateFeedback);
router.delete("/:id", protect, adminOnly, deleteFeedback);

export default router;
