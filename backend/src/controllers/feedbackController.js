import Feedback from "../models/Feedback.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json(feedback);
});

export const getPublicFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({ approved: true }).sort({ createdAt: -1 }).limit(12);
  res.json(feedback);
});

export const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedback);
});

export const updateFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }
  res.json(feedback);
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);
  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }
  res.json({ message: "Feedback deleted" });
});
