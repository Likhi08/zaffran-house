import express from "express";
import { body } from "express-validator";
import { createMenuItem, deleteMenuItem, getMenuItem, getMenuItems, updateMenuItem } from "../controllers/menuController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();
const itemRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("priceOptions").isArray({ min: 1 }).withMessage("At least one price option is required"),
  body("priceOptions.*.label").trim().notEmpty().withMessage("Price label is required"),
  body("priceOptions.*.price").isFloat({ min: 0 }).withMessage("Price must be a positive number")
];

router.get("/", getMenuItems);
router.get("/:id", getMenuItem);
router.post("/", protect, adminOnly, itemRules, validate, createMenuItem);
router.put("/:id", protect, adminOnly, itemRules, validate, updateMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);

export default router;
