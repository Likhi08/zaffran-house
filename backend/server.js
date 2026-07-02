import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import menuRoutes from "./src/routes/menuRoutes.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";
import feedbackRoutes from "./src/routes/feedbackRoutes.js";
import enquiryRoutes from "./src/routes/enquiryRoutes.js";
import offerRoutes from "./src/routes/offerRoutes.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import statsRoutes from "./src/routes/statsRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/.test(origin);
};

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    callback(isAllowedOrigin(origin) ? null : new Error("Not allowed by CORS"), isAllowedOrigin(origin));
  },
  credentials: true
}));
app.use(express.json({ limit: "12mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (req, res) => {
  res.json({
    message: "Nazeer's Zaffran House API",
    address: "Main Rd, beside Valisab Road, Revenue Colony, Kadiri, Andhra Pradesh 515591",
    phone: "07993366766"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/orders", orderRoutes);

const frontendDist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist, {
    index: false,
    setHeaders(res) {
      res.set("Cache-Control", "no-store");
    }
  }));
  app.get("*", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
