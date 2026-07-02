import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { items, subtotal } = req.body;
  const cleanItems = items.map((item) => ({
    itemId: item.itemId,
    name: item.name,
    category: item.category || "",
    option: item.option,
    price: Number(item.price),
    quantity: Number(item.quantity)
  }));

  const order = await Order.create({
    user: req.user._id,
    items: cleanItems,
    subtotal: Number(subtotal),
    source: "whatsapp",
    status: "sent"
  });

  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name phone email").sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("user", "name phone email");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});
