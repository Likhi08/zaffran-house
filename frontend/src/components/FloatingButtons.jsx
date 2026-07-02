import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { restaurant } from "../data/menuData.js";

const FloatingButtons = () => (
  <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
    <a href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-xl text-white shadow-glow" aria-label="WhatsApp">
      <FaWhatsapp />
    </a>
    <a href={`tel:${restaurant.phone}`} className="grid h-12 w-12 place-items-center rounded-full bg-gold text-lg text-ink shadow-glow" aria-label="Call">
      <FaPhoneAlt />
    </a>
  </div>
);

export default FloatingButtons;
