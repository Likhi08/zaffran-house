import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

const keyFor = (item, option) => `${item._id}-${option.label}`;

const readStoredCart = () => {
  try {
    const value = JSON.parse(localStorage.getItem("zfh_cart") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    localStorage.removeItem("zfh_cart");
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readStoredCart);

  const persist = (next) => {
    setCart(next);
    localStorage.setItem("zfh_cart", JSON.stringify(next));
  };

  const addToCart = (item, option = item.priceOptions[0]) => {
    const id = keyFor(item, option);
    const existing = cart.find((entry) => entry.id === id);
    const next = existing
      ? cart.map((entry) => (entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry))
      : [...cart, { id, itemId: item._id, name: item.name, category: item.category, option: option.label, price: option.price, quantity: 1 }];
    persist(next);
    toast.success(`${item.name} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    const next = quantity <= 0 ? cart.filter((entry) => entry.id !== id) : cart.map((entry) => (entry.id === id ? { ...entry, quantity } : entry));
    persist(next);
  };

  const removeFromCart = (id) => {
    persist(cart.filter((entry) => entry.id !== id));
    toast.success("Removed from cart");
  };

  const clearCart = () => persist([]);

  const total = useMemo(() => cart.reduce((sum, entry) => sum + entry.price * entry.quantity, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, entry) => sum + entry.quantity, 0), [cart]);

  return <CartContext.Provider value={{ cart, total, count, addToCart, updateQuantity, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
