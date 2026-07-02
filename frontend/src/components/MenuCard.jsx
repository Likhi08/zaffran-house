import { useState } from "react";
import { FaFire, FaLeaf, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

const MenuCard = ({ item }) => {
  const [selected, setSelected] = useState(item.priceOptions?.[0] || { label: "Regular", price: 0 });
  const [imageFailed, setImageFailed] = useState(false);
  const { addToCart } = useCart();

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group rounded-lg border border-gold/20 bg-white/[0.04] p-5 shadow-glow transition hover:-translate-y-1 hover:border-gold/60">
      {item.image && !imageFailed && (
        <img
          src={item.image}
          alt={item.name}
          className="mb-5 h-48 w-full rounded-md border border-gold/25 object-cover"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">{item.category}</p>
          <h3 className="mt-2 text-xl font-bold text-white">{item.name}</h3>
        </div>
        <div className="flex gap-2">
          {item.isVeg && <span className="rounded-full bg-green-500/15 p-2 text-green-300"><FaLeaf /></span>}
          {item.isSpicy && <span className="rounded-full bg-red-500/15 p-2 text-red-300"><FaFire /></span>}
        </div>
      </div>
      {item.description && <p className="mt-3 min-h-12 text-sm leading-6 text-white/65">{item.description}</p>}
      <div className="mt-5 flex flex-wrap gap-2">
        {item.priceOptions.map((option) => (
          <button key={option.label} onClick={() => setSelected(option)} className={`rounded-full border px-3 py-2 text-sm ${selected.label === option.label ? "border-gold bg-gold text-ink" : "border-white/15 text-white/75 hover:border-gold"}`}>
            {option.label} ₹{option.price}
          </button>
        ))}
      </div>
      <button onClick={() => addToCart(item, selected)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 font-bold text-ink transition hover:bg-white">
        <FaPlus /> Add to Cart
      </button>
    </motion.article>
  );
};

export default MenuCard;
