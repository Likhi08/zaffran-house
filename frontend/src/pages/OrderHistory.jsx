import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import BrandMark from "../components/BrandMark.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const formatDate = (value) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

const OrderHistory = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    api.get("/orders/mine")
      .then(({ data }) => setOrders(data))
      .catch((error) => toast.error(error.response?.data?.message || "Could not load order history"))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.subtotal || 0), 0);

  return (
    <main className="lux-section">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <BrandMark />
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-gold">My Account</p>
          <h1 className="font-display text-4xl text-white md:text-5xl">Order History</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">Signed in as {user?.name || user?.phone}. Your WhatsApp orders placed from this portal appear here.</p>
        </div>
        <section className="royal-panel mb-8 grid gap-5 p-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Welcome Customer</p>
            <h2 className="mt-2 font-display text-3xl text-white md:text-4xl">Welcome, {user?.name || "Guest"}</h2>
            <div className="mt-4 grid gap-2 text-white/70">
              {user?.phone && <p><span className="font-bold text-white">Mobile:</span> {user.phone}</p>}
              {user?.email && !user.email.endsWith("@customer.local") && <p><span className="font-bold text-white">Email:</span> {user.email}</p>}
              <p><span className="font-bold text-white">Account:</span> Customer portal</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <div className="rounded-lg border border-gold/20 bg-white/[0.04] p-4">
              <p className="text-sm text-white/55">Total Orders</p>
              <p className="mt-1 font-display text-3xl text-gold">{orders.length}</p>
            </div>
            <div className="rounded-lg border border-gold/20 bg-white/[0.04] p-4">
              <p className="text-sm text-white/55">Order Value</p>
              <p className="mt-1 font-display text-3xl text-gold">₹{totalSpent}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <Link className="btn-gold" to="/menu">Order Again</Link>
            <Link className="btn-ghost" to="/cart">View Cart</Link>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </div>
        </section>
        {loading && <div className="royal-panel p-8 text-white/70">Loading orders...</div>}
        {!loading && orders.length === 0 && (
          <div className="royal-panel p-8 text-white/70">
            No orders yet. Add your favourite mandi, biryani or grills from the menu and place a WhatsApp order.
          </div>
        )}
        <div className="grid gap-5">
          {orders.map((order) => (
            <article key={order._id} className="royal-panel p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{formatDate(order.createdAt)}</p>
                  <h2 className="mt-2 font-display text-2xl text-white">Order #{order._id.slice(-6).toUpperCase()}</h2>
                </div>
                <span className="rounded-full border border-gold/35 px-3 py-1 text-sm font-bold capitalize text-gold">{order.status}</span>
              </div>
              <div className="mt-5 grid gap-3">
                {order.items.map((item) => (
                  <div key={`${order._id}-${item.itemId}-${item.option}`} className="flex flex-wrap justify-between gap-3 border-t border-gold/10 pt-3 text-white/75">
                    <span>{item.name} ({item.option}) x {item.quantity}</span>
                    <strong className="text-white">₹{item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-right font-display text-2xl text-gold">Total ₹{order.subtotal}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrderHistory;
