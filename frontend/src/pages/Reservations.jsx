import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import SectionTitle from "../components/SectionTitle.jsx";

const Reservations = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "", guests: 2, occasion: "", message: "" });

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/reservations", form);
      toast.success("Reservation request sent");
      setForm({ name: "", phone: "", email: "", date: "", time: "", guests: 2, occasion: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send reservation");
    }
  };

  return (
    <main className="lux-section">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle eyebrow="Reservations" title="Reserve A Royal Table" text="Plan family dinners, birthdays and mandi feasts with a quick table request." />
        <form onSubmit={submit} className="royal-panel grid gap-4 p-6 md:grid-cols-2">
          <input className="field" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="field" required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="field" type="number" min="1" required placeholder="Guests" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
          <input className="field" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="field" type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <input className="field md:col-span-2" placeholder="Occasion" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} />
          <textarea className="field md:col-span-2" rows="4" placeholder="Special request" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button className="btn-gold md:col-span-2">Send Reservation</button>
        </form>
      </div>
    </main>
  );
};

export default Reservations;
