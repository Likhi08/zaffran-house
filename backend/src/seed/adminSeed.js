import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const adminName = process.env.ADMIN_NAME?.trim() || "Admin";
const adminUsername = process.env.ADMIN_USERNAME?.trim().toLowerCase();
const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD?.trim();

if (!adminUsername || !adminEmail || !adminPassword) {
  throw new Error("ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env.");
}

const admin = await User.findOne({ $or: [{ username: adminUsername }, { email: adminEmail }, { isAdmin: true }] });

if (admin) {
  admin.name = adminName;
  admin.username = adminUsername;
  admin.email = adminEmail;
  admin.password = adminPassword;
  admin.isAdmin = true;
  await admin.save();
} else {
  await User.create({
    name: adminName,
    username: adminUsername,
    email: adminEmail,
    password: adminPassword,
    isAdmin: true
  });
}

console.log("Admin credentials updated");
console.log(`Admin username: ${adminUsername}`);
console.log(`Admin email: ${adminEmail}`);
process.exit(0);
