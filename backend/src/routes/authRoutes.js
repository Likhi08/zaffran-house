import express from "express";
import { body } from "express-validator";
import { getMe, loginAdmin, loginUser, registerCustomer } from "../controllers/authController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();
const loginValidation = [body("identifier").trim().notEmpty().withMessage("Phone number is required"), body("password").notEmpty().withMessage("Password is required")];
const adminLoginValidation = [body("identifier").notEmpty().withMessage("Username is required"), body("password").notEmpty().withMessage("Password is required")];

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone").trim().isLength({ min: 10 }).withMessage("Valid phone number is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  validate,
  registerCustomer
);
router.post(
  "/admin/login",
  adminLoginValidation,
  validate,
  loginAdmin
);
router.get("/me", protect, getMe);

export default router;
