import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import MenuItem from "../models/MenuItem.js";
import Offer from "../models/Offer.js";
import GalleryItem from "../models/GalleryItem.js";
import Feedback from "../models/Feedback.js";
import Order from "../models/Order.js";
import { galleryItems, menuItems, offers } from "./seedData.js";

dotenv.config();
await connectDB();

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminUsername = process.env.ADMIN_USERNAME?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD?.trim();
const adminName = process.env.ADMIN_NAME?.trim() || "Admin";

if (!adminEmail || !adminUsername || !adminPassword) {
  throw new Error("ADMIN_EMAIL, ADMIN_USERNAME and ADMIN_PASSWORD must be set in backend/.env before seeding.");
}

await Promise.all([
  User.deleteMany({}),
  MenuItem.deleteMany({}),
  Offer.deleteMany({}),
  GalleryItem.deleteMany({}),
  Feedback.deleteMany({}),
  Order.deleteMany({})
]);

await User.create({
  name: adminName,
  username: adminUsername,
  email: adminEmail,
  password: adminPassword,
  isAdmin: true
});

await MenuItem.insertMany(menuItems);
await Offer.insertMany(offers);
await GalleryItem.insertMany(galleryItems);
await Feedback.insertMany([
  { name: "Ayesha", rating: 5, message: "The mutton mandi was rich, fresh and perfect for family dinner.", approved: true },
  { name: "Rahul", rating: 5, message: "Chicken dum biryani has a proper royal aroma. Fast service too.", approved: true },
  { name: "Imran", rating: 4, message: "Great grills, good portions and a premium feel for Kadiri.", approved: true }
]);

console.log("Seed completed");
console.log(`Admin username: ${adminUsername}`);
console.log(`Admin email: ${adminEmail}`);
process.exit(0);
