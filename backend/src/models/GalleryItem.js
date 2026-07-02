import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String, default: "Restaurant" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", galleryItemSchema);
