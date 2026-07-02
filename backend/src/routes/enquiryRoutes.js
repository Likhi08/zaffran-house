import express from "express";
import { body } from "express-validator";
import { createEnquiry, deleteEnquiry, getEnquiries, updateEnquiry } from "../controllers/enquiryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone").trim().isLength({ min: 7 }).withMessage("Phone is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("message").trim().isLength({ min: 5 }).withMessage("Message is required")
  ],
  validate,
  createEnquiry
);
router.get("/", protect, adminOnly, getEnquiries);
router.put("/:id", protect, adminOnly, updateEnquiry);
router.delete("/:id", protect, adminOnly, deleteEnquiry);

export default router;
