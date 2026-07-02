import { useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import api from "../api/axios.js";
import SectionTitle from "../components/SectionTitle.jsx";
import QRMenuCard from "../components/QRMenuCard.jsx";
import { restaurant } from "../data/menuData.js";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const mapQuery = encodeURIComponent(`${restaurant.name}, ${restaurant.address}`);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const submit = async (event) => {
    event.preventDefault();
    const enquiryText = [
      `New enquiry for ${restaurant.name}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Subject: ${form.subject}`,
      "",
      `Message: ${form.message}`
    ].filter(Boolean).join("\n");
    const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(enquiryText)}`;

    try {
      await api.post("/enquiries", form);
      toast.success("Opening WhatsApp");
    } catch (error) {
      toast.error(error.response?.data?.message || "Opening WhatsApp instead");
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="lux-section">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Contact" title="Visit Nazeer's Zaffran House" text="Call, send an enquiry or use Google Maps to find us near Valisab Road in Kadiri." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="royal-panel p-6">
            <div className="map-frame">
              <iframe title={`${restaurant.name} location map`} src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="mt-6 grid gap-3 text-white/75">
              <span className="flex gap-3"><FaMapMarkerAlt className="mt-1 text-gold" />{restaurant.address}</span>
              <span className="flex gap-3"><FaPhoneAlt className="mt-1 text-gold" />{restaurant.phone}</span>
              <span className="flex gap-3"><FaStar className="mt-1 text-gold" />Google rating {restaurant.rating}/5</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn-gold" href={mapDirectionsUrl} target="_blank" rel="noreferrer">Get Directions</a>
            </div>
            <div className="mt-6">
              <QRMenuCard />
            </div>
          </div>
          <form onSubmit={submit} className="royal-panel grid gap-4 p-6">
            <input className="field" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="field" required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="field" required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <textarea className="field" required rows="5" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button className="btn-gold">Send Enquiry on WhatsApp</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
