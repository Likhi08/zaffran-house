import MenuItem from "../models/MenuItem.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMenuItems = asyncHandler(async (req, res) => {
  const { category, search, veg, featured } = req.query;
  const query = {};
  if (category) query.category = category;
  if (veg === "true") query.isVeg = true;
  if (veg === "false") query.isVeg = false;
  if (featured === "true") query.isFeatured = true;
  if (search) query.name = { $regex: search, $options: "i" };
  const items = await MenuItem.find(query).sort({ category: 1, name: 1 });
  res.json(items);
});

export const getMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }
  res.json(item);
});

export const createMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
});

export const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }
  res.json(item);
});

export const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }
  res.json({ message: "Menu item deleted" });
});
