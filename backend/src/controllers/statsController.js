import Enquiry from "../models/Enquiry.js";
import Feedback from "../models/Feedback.js";
import GalleryItem from "../models/GalleryItem.js";
import MenuItem from "../models/MenuItem.js";
import Offer from "../models/Offer.js";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getStats = asyncHandler(async (req, res) => {
  const [menuItems, reservations, feedback, enquiries, offers, gallery, orders] = await Promise.all([
    MenuItem.countDocuments(),
    Reservation.countDocuments(),
    Feedback.countDocuments(),
    Enquiry.countDocuments(),
    Offer.countDocuments(),
    GalleryItem.countDocuments(),
    Order.countDocuments()
  ]);

  res.json({ menuItems, reservations, feedback, enquiries, offers, gallery, orders });
});
