import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    code: { type: String, default: "" },
    active: { type: Boolean, default: true },
    validTill: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);
