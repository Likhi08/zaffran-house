import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaTrash, FaWhatsapp } from "react-icons/fa";
import { restaurant } from "../data/menuData.js";
import { useCart } from "../context/CartContext.jsx";
import BrandMark from "../components/BrandMark.jsx";

const Cart = () => {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();

  const orderOnWhatsapp = async () => {
    if (!cart.length) {
      toast.error("Your cart is empty");
      return;
    }
    const lines = cart.map((entry, index) => {
      const itemTotal = entry.price * entry.quantity;
      return `${index + 1}. ${entry.name} (${entry.option})\n   Qty: ${entry.quantity} x ₹${entry.price} = ₹${itemTotal}`;
    });
    const message = [
      `Namaste ${restaurant.name},`,
      "",
      "I would like to place the following order:",
      "",
      ...lines,
      "",
      `Subtotal: ₹${total}`,
      "GST/CGST: As applicable on the final restaurant bill",
      `Estimated Final Amount: ₹${total} + applicable taxes/charges`,
      "",
      "Customer Details:",
      "Name:",
      "Phone:",
      "Delivery Address:",
      "Exact Location / Google Maps Link:",
      "",
      "Payment Preference: Cash on Delivery / UPI",
      "",
      "Please confirm item availability, final bill amount and estimated preparation/delivery time.",
      "",
      `Thank you, ${restaurant.name}.`
    ].join("\n");
    toast.success("Opening WhatsApp");
    window.open(`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="lux-section">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <BrandMark />
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-gold">WhatsApp Order</p>
          <h1 className="font-display text-4xl text-white md:text-5xl">Your Cart</h1>
        </div>
        <div className="mt-8 grid gap-4">
          {cart.length === 0 && <div className="royal-panel p-8 text-white/70">Your cart is empty. Add biryani, mandi or grills from the menu.</div>}
          {cart.map((entry) => (
            <div key={entry.id} className="royal-panel grid gap-4 p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <h3 className="text-xl font-bold text-white">{entry.name}</h3>
                <p className="text-white/60">{entry.option} • ₹{entry.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-ghost px-3" onClick={() => updateQuantity(entry.id, entry.quantity - 1)}><FaMinus /></button>
                <span className="min-w-8 text-center font-bold text-gold">{entry.quantity}</span>
                <button className="btn-ghost px-3" onClick={() => updateQuantity(entry.id, entry.quantity + 1)}><FaPlus /></button>
              </div>
              <button className="btn-ghost justify-self-start px-3 text-red-300" onClick={() => removeFromCart(entry.id)}><FaTrash /></button>
            </div>
          ))}
        </div>
        <div className="mt-8 royal-panel flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="font-display text-3xl text-gold">Total ₹{total}</p>
          <div className="flex flex-wrap gap-3">
            <button className="btn-ghost" onClick={clearCart}>Clear</button>
            <button className="btn-gold flex items-center gap-2" onClick={orderOnWhatsapp}><FaWhatsapp /> Order on WhatsApp</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
