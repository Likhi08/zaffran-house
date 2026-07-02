import mongoose from "mongoose";

const priceOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    priceOptions: { type: [priceOptionSchema], required: true },
    isVeg: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
