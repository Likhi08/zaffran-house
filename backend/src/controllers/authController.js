import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

const userPayload = (user) => ({ id: user._id, name: user.name, email: user.email, phone: user.phone, isAdmin: user.isAdmin });

export const registerCustomer = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
  const normalizedPhone = phone.trim();
  const exists = await User.findOne({ phone: normalizedPhone });

  if (exists) {
    res.status(409);
    throw new Error("An account already exists with this phone number");
  }

  const user = await User.create({
    name,
    phone: normalizedPhone,
    email: `${normalizedPhone}@customer.local`,
    password,
    isAdmin: false
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: userPayload(user)
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  const loginId = identifier.trim().toLowerCase();
  const user = await User.findOne({ $or: [{ phone: identifier.trim() }, { email: loginId }, { username: loginId }] });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid login details");
  }

  res.json({
    token: generateToken(user._id),
    user: userPayload(user)
  });
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { identifier, email, password } = req.body;
  const loginId = (identifier || email || "").toLowerCase();
  const user = await User.findOne({ $or: [{ email: loginId }, { username: loginId }] });

  if (!user || !user.isAdmin || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }

  res.json({
    token: generateToken(user._id),
    user: userPayload(user)
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
