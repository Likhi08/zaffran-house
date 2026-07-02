import Offer from "../models/Offer.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getOffers = asyncHandler(async (req, res) => {
  const query = req.query.all === "true" ? {} : { active: true };
  const offers = await Offer.find(query).sort({ createdAt: -1 });
  res.json(offers);
});

export const createOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json(offer);
});

export const updateOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!offer) {
    res.status(404);
    throw new Error("Offer not found");
  }
  res.json(offer);
});

export const deleteOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndDelete(req.params.id);
  if (!offer) {
    res.status(404);
    throw new Error("Offer not found");
  }
  res.json({ message: "Offer deleted" });
});
