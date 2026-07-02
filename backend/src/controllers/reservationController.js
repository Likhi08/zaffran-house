import Reservation from "../models/Reservation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create(req.body);
  res.status(201).json(reservation);
});

export const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json(reservations);
});

export const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  res.json(reservation);
});

export const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  res.json({ message: "Reservation deleted" });
});
