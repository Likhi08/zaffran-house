import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, default: "" },
    option: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], validate: [(items) => items.length > 0, "Order must include items"] },
    subtotal: { type: Number, required: true, min: 0 },
    source: { type: String, enum: ["whatsapp"], default: "whatsapp" },
    status: { type: String, enum: ["sent", "confirmed", "completed", "cancelled"], default: "sent" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
