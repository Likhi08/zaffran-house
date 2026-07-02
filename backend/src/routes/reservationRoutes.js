import express from "express";
import { body } from "express-validator";
import { createReservation, deleteReservation, getReservations, updateReservation } from "../controllers/reservationController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone").trim().isLength({ min: 7 }).withMessage("Phone is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("time").notEmpty().withMessage("Time is required"),
    body("guests").isInt({ min: 1 }).withMessage("Guests must be at least 1")
  ],
  validate,
  createReservation
);
router.get("/", protect, adminOnly, getReservations);
router.put("/:id", protect, adminOnly, updateReservation);
router.delete("/:id", protect, adminOnly, deleteReservation);

export default router;
