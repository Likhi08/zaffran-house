import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import GalleryItem from "../models/GalleryItem.js";
import asyncHandler from "../utils/asyncHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, "../../../frontend/public/gallery/uploads");
const allowedMimeTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"]
]);

export const getGalleryItems = asyncHandler(async (req, res) => {
  const items = await GalleryItem.find().sort({ featured: -1, createdAt: -1 });
  res.json(items);
});

export const uploadGalleryImage = asyncHandler(async (req, res) => {
  const { dataUrl, fileName = "gallery-image" } = req.body;
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(dataUrl || "");

  if (!match || !allowedMimeTypes.has(match[1])) {
    res.status(400);
    throw new Error("Upload a JPG, PNG or WebP image");
  }

  await fs.mkdir(uploadDir, { recursive: true });
  const extension = allowedMimeTypes.get(match[1]);
  const safeName = fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "gallery-image";
  const finalName = `${Date.now()}-${safeName}.${extension}`;
  await fs.writeFile(path.join(uploadDir, finalName), Buffer.from(match[2], "base64"));

  res.status(201).json({ image: `/gallery/uploads/${finalName}` });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.create(req.body);
  res.status(201).json(item);
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    res.status(404);
    throw new Error("Gallery item not found");
  }
  res.json(item);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Gallery item not found");
  }
  res.json({ message: "Gallery item deleted" });
});
