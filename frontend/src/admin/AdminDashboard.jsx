import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { categories } from "../data/menuData.js";
import BrandMark from "../components/BrandMark.jsx";

const emptyMenu = { name: "", category: "Biryani", description: "", priceOptionsText: "Regular:240", isVeg: false, isSpicy: false, isFeatured: false, available: true };
const emptyOffer = { title: "", description: "", code: "", validTill: "", active: true };
const emptyGallery = { title: "", image: "", category: "Food", featured: false };

const parsePrices = (text) =>
  text.split(",").map((part) => {
    const [label, price] = part.split(":").map((value) => value.trim());
    return { label: label || "Regular", price: Number(price || 0) };
  }).filter((option) => option.label && option.price >= 0);

const priceText = (item) => item.priceOptions?.map((option) => `${option.label}:${option.price}`).join(", ") || "";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [tab, setTab] = useState("menu");
  const [stats, setStats] = useState({});
  const [menu, setMenu] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [offers, setOffers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [menuForm, setMenuForm] = useState(emptyMenu);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [offerForm, setOfferForm] = useState(emptyOffer);
  const [editingOffer, setEditingOffer] = useState(null);
  const [galleryForm, setGalleryForm] = useState(emptyGallery);
  const [editingGallery, setEditingGallery] = useState(null);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const menuCategories = useMemo(() => categories.filter((item) => item !== "All"), []);

  const loadAll = async () => {
    const [statsRes, menuRes, reservationRes, orderRes, feedbackRes, enquiryRes, offerRes, galleryRes] = await Promise.all([
      api.get("/stats"),
      api.get("/menu"),
      api.get("/reservations"),
      api.get("/orders"),
      api.get("/feedback"),
      api.get("/enquiries"),
      api.get("/offers?all=true"),
      api.get("/gallery")
    ]);
    setStats(statsRes.data);
    setMenu(menuRes.data);
    setReservations(reservationRes.data);
    setOrders(orderRes.data);
    setFeedback(feedbackRes.data);
    setEnquiries(enquiryRes.data);
    setOffers(offerRes.data);
    setGallery(galleryRes.data);
  };

  useEffect(() => {
    loadAll().catch((error) => toast.error(error.response?.data?.message || "Failed to load dashboard"));
  }, []);

  const saveMenu = async (event) => {
    event.preventDefault();
    const payload = { ...menuForm, priceOptions: parsePrices(menuForm.priceOptionsText) };
    delete payload.priceOptionsText;
    if (editingMenu) await api.put(`/menu/${editingMenu}`, payload);
    else await api.post("/menu", payload);
    toast.success(editingMenu ? "Menu item updated" : "Menu item added");
    setMenuForm(emptyMenu);
    setEditingMenu(null);
    setShowMenuForm(false);
    loadAll();
  };

  const editMenu = (item) => {
    setEditingMenu(item._id);
    setMenuForm({ ...item, priceOptionsText: priceText(item) });
    setShowMenuForm(true);
    setTab("menu");
  };

  const remove = async (path, message) => {
    await api.delete(path);
    toast.success(message);
    loadAll();
  };

  const updateStatus = async (path, status, message) => {
    await api.put(path, { status });
    toast.success(message);
    loadAll();
  };

  const saveOffer = async (event) => {
    event.preventDefault();
    if (editingOffer) await api.put(`/offers/${editingOffer}`, offerForm);
    else await api.post("/offers", offerForm);
    toast.success(editingOffer ? "Offer updated" : "Offer added");
    setOfferForm(emptyOffer);
    setEditingOffer(null);
    loadAll();
  };

  const saveGallery = async (event) => {
    event.preventDefault();
    if (editingGallery) await api.put(`/gallery/${editingGallery}`, galleryForm);
    else await api.post("/gallery", galleryForm);
    toast.success(editingGallery ? "Gallery item updated" : "Gallery item added");
    setGalleryForm(emptyGallery);
    setEditingGallery(null);
    loadAll();
  };

  const uploadGalleryImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Upload a JPG, PNG or WebP image");
      return;
    }
    setUploadingGallery(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const { data } = await api.post("/gallery/upload", { fileName: file.name, dataUrl });
      setGalleryForm((current) => ({ ...current, image: data.image }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      setUploadingGallery(false);
      event.target.value = "";
    }
  };

  const tabs = ["menu", "orders", "reservations", "feedback", "enquiries", "offers", "gallery"];

  return (
    <main className="min-h-screen bg-transparent p-3">
      <div className="site-stage px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandMark compact />
            <h1 className="font-display text-3xl text-white">Admin Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button className="btn-gold flex items-center gap-2" onClick={logout}><FaSignOutAlt /> Logout</button>
          </div>
        </div>
      </div>
      <div className="site-stage mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Menu Items", stats.menuItems],
            ["Orders", stats.orders],
            ["Reservations", stats.reservations],
            ["Enquiries", stats.enquiries]
          ].map(([label, value]) => (
            <div key={label} className="royal-panel p-5">
              <p className="text-white/55">{label}</p>
              <p className="mt-2 font-display text-4xl text-gold">{value || 0}</p>
            </div>
          ))}
        </div>
        <div className="my-8 flex flex-wrap gap-2">
          {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={tab === item ? "btn-gold capitalize" : "btn-ghost capitalize"}>{item}</button>)}
        </div>

        {tab === "menu" && (
          <section className="grid gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl text-white">Menu Items</h2>
                <p className="text-sm text-white/55">{menu.length} items</p>
              </div>
              <button className="btn-gold" onClick={() => { setEditingMenu(null); setMenuForm(emptyMenu); setShowMenuForm((value) => !value); }}>
                {showMenuForm && !editingMenu ? "Close Form" : "Add Menu Item"}
              </button>
            </div>
            {showMenuForm && (
              <form onSubmit={saveMenu} className="royal-panel grid gap-3 p-5">
                <h3 className="font-display text-2xl text-white">{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <input className="field" required placeholder="Name" value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} />
                  <select className="field" value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}>{menuCategories.map((item) => <option key={item}>{item}</option>)}</select>
                  <input className="field md:col-span-2" placeholder="Price options, e.g. Single:240, Family:610" value={menuForm.priceOptionsText} onChange={(e) => setMenuForm({ ...menuForm, priceOptionsText: e.target.value })} />
                  <textarea className="field md:col-span-2" rows={3} placeholder="Description" value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} />
                </div>
                <div className="flex flex-wrap gap-4 text-white/75">
                  <label><input type="checkbox" checked={menuForm.isVeg} onChange={(e) => setMenuForm({ ...menuForm, isVeg: e.target.checked })} /> Veg</label>
                  <label><input type="checkbox" checked={menuForm.isSpicy} onChange={(e) => setMenuForm({ ...menuForm, isSpicy: e.target.checked })} /> Spicy</label>
                  <label><input type="checkbox" checked={menuForm.isFeatured} onChange={(e) => setMenuForm({ ...menuForm, isFeatured: e.target.checked })} /> Featured</label>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-gold">{editingMenu ? "Update Item" : "Add Item"}</button>
                  <button type="button" className="btn-ghost" onClick={() => { setShowMenuForm(false); setEditingMenu(null); setMenuForm(emptyMenu); }}>Cancel</button>
                </div>
              </form>
            )}
            <div className="grid gap-2">
              {menu.map((item) => (
                <div key={item._id} className="royal-panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div><p className="font-bold text-white">{item.name}</p><p className="text-sm text-white/55">{item.category} • {priceText(item)}</p></div>
                  <div className="flex gap-2"><button className="admin-action-btn" onClick={() => editMenu(item)}>Edit</button><button className="admin-icon-btn text-red-300" onClick={() => remove(`/menu/${item._id}`, "Menu item deleted")}><FaTrash /></button></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "orders" && (
          <div className="grid gap-3">
            {orders.length === 0 && <div className="royal-panel p-5 text-white/60">No orders yet.</div>}
            {orders.map((order) => (
              <div key={order._id} className="royal-panel grid gap-3 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{order.user?.name || order.user?.phone || "Customer"} • ₹{order.subtotal}</p>
                    <p className="text-sm text-white/55">{new Date(order.createdAt).toLocaleString()} • {order.items.length} items</p>
                  </div>
                  <select className="admin-select" value={order.status} onChange={(e) => updateStatus(`/orders/${order._id}`, e.target.value, "Order status updated")}>
                    {["sent", "confirmed", "completed", "cancelled"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
                <div className="grid gap-1 text-sm text-white/70">
                  {order.items.map((item) => <p key={`${order._id}-${item.itemId}-${item.option}`}>{item.name} ({item.option}) x {item.quantity}</p>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "reservations" && (
          <div className="grid gap-3">
            {reservations.length === 0 && <div className="royal-panel p-5 text-white/60">No records yet.</div>}
            {reservations.map((item) => (
              <div key={item._id} className="royal-panel flex flex-wrap items-center justify-between gap-3 p-4">
                <p className="text-white/75"><b>{item.name}</b> • {item.phone} • {item.date} {item.time} • {item.guests} guests • {item.occasion || "No occasion"}</p>
                <div className="flex gap-2">
                  <select className="admin-select" value={item.status} onChange={(e) => updateStatus(`/reservations/${item._id}`, e.target.value, "Reservation status updated")}>
                    {["pending", "confirmed", "cancelled"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <button type="button" className="admin-icon-btn text-red-300" onClick={() => remove(`/reservations/${item._id}`, "Reservation deleted")}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "feedback" && <SimpleList items={feedback} render={(item) => <><b>{item.name}</b> • {item.rating} stars • {item.message} • {item.approved ? "Approved" : "Pending"}</>} onDelete={(id) => remove(`/feedback/${id}`, "Feedback deleted")} />}
        {tab === "enquiries" && <SimpleList items={enquiries} render={(item) => <><b>{item.name}</b> • {item.phone} • {item.subject} • {item.message}</>} onDelete={(id) => remove(`/enquiries/${id}`, "Enquiry deleted")} />}

        {tab === "offers" && (
          <CrudPanel title={editingOffer ? "Edit Offer" : "Add Offer"} onSubmit={saveOffer}>
            <input className="field" required placeholder="Title" value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })} />
            <textarea className="field" required placeholder="Description" value={offerForm.description} onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })} />
            <input className="field" placeholder="Code" value={offerForm.code} onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value })} />
            <input className="field" placeholder="Valid till" value={offerForm.validTill} onChange={(e) => setOfferForm({ ...offerForm, validTill: e.target.value })} />
            <button className="btn-gold">Save Offer</button>
            <SimpleList items={offers} render={(item) => <><b>{item.title}</b> • {item.code || "No code"} • {item.active ? "Active" : "Inactive"}</>} onEdit={(item) => { setEditingOffer(item._id); setOfferForm(item); }} onDelete={(id) => remove(`/offers/${id}`, "Offer deleted")} />
          </CrudPanel>
        )}

        {tab === "gallery" && (
          <CrudPanel title={editingGallery ? "Edit Gallery Item" : "Add Gallery Item"} onSubmit={saveGallery}>
            <input className="field" required placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} />
            <label className="royal-panel cursor-pointer p-5 text-center text-white/75 transition hover:border-gold">
              <span className="block font-bold text-gold">{uploadingGallery ? "Uploading..." : "Upload JPG / PNG / WebP"}</span>
              <span className="mt-1 block text-sm text-white/55">Choose an image from your computer</span>
              <input className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadGalleryImage} disabled={uploadingGallery} />
            </label>
            {galleryForm.image && (
              <div className="overflow-hidden rounded-lg border border-gold/25 bg-white/[0.04]">
                <img src={galleryForm.image} alt="Gallery preview" className="h-48 w-full object-cover" />
                <p className="p-3 text-sm text-white/55">{galleryForm.image}</p>
              </div>
            )}
            <input className="field" placeholder="Category" value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} />
            <button className="btn-gold">Save Gallery Item</button>
            <SimpleList items={gallery} render={(item) => <><b>{item.title}</b> • {item.category}</>} onEdit={(item) => { setEditingGallery(item._id); setGalleryForm(item); }} onDelete={(id) => remove(`/gallery/${id}`, "Gallery item deleted")} />
          </CrudPanel>
        )}
      </div>
    </main>
  );
};

const CrudPanel = ({ title, onSubmit, children }) => (
  <form onSubmit={onSubmit} className="royal-panel grid gap-4 p-5">
    <h2 className="font-display text-2xl text-white">{title}</h2>
    {children}
  </form>
);

const SimpleList = ({ items, render, onEdit, onDelete }) => (
  <div className="grid gap-3">
    {items.length === 0 && <div className="royal-panel p-5 text-white/60">No records yet.</div>}
    {items.map((item) => (
      <div key={item._id} className="royal-panel flex flex-wrap items-center justify-between gap-3 p-4">
        <p className="text-white/75">{render(item)}</p>
        <div className="flex gap-2">
          {onEdit && <button type="button" className="btn-ghost" onClick={() => onEdit(item)}>Edit</button>}
          <button type="button" className="btn-ghost text-red-300" onClick={() => onDelete(item._id)}><FaTrash /></button>
        </div>
      </div>
    ))}
  </div>
);

export default AdminDashboard;
