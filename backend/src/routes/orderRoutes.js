import express from "express";
import { body } from "express-validator";
import { createOrder, getMyOrders, getOrders, updateOrder } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", adminOnly, getOrders);
router.get("/mine", getMyOrders);
router.put("/:id", adminOnly, [body("status").isIn(["sent", "confirmed", "completed", "cancelled"]).withMessage("Valid status is required")], validate, updateOrder);
router.post(
  "/",
  [
    body("items").isArray({ min: 1 }).withMessage("Order items are required"),
    body("items.*.itemId").notEmpty().withMessage("Item id is required"),
    body("items.*.name").notEmpty().withMessage("Item name is required"),
    body("items.*.option").notEmpty().withMessage("Item option is required"),
    body("items.*.price").isFloat({ min: 0 }).withMessage("Valid item price is required"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Valid item quantity is required"),
    body("subtotal").isFloat({ min: 0 }).withMessage("Valid subtotal is required")
  ],
  validate,
  createOrder
);

export default router;
