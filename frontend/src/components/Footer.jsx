import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import { restaurant } from "../data/menuData.js";
import BrandMark from "./BrandMark.jsx";

const Footer = () => (
  <footer className="mx-auto mb-4 max-w-[1360px] border border-gold/35 bg-[#12051e]/90 py-10">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[1.5fr_1fr_1fr]">
      <div>
        <BrandMark />
        <h3 className="font-display text-3xl text-white">{restaurant.name}</h3>
        <p className="mt-4 flex gap-3 text-white/70"><FaMapMarkerAlt className="mt-1 text-gold" />{restaurant.address}</p>
        <p className="mt-3 flex gap-3 text-white/70"><FaPhoneAlt className="mt-1 text-gold" />{restaurant.phone}</p>
        <p className="mt-3 flex gap-3 text-white/70"><FaStar className="mt-1 text-gold" />Google rating {restaurant.rating}/5</p>
      </div>
      <div>
        <h4 className="mb-4 font-bold uppercase tracking-[0.2em] text-gold">Explore</h4>
        <div className="grid gap-2 text-white/70">
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/login">Account Login</Link>
        </div>
      </div>
      <div>
        <h4 className="mb-4 font-bold uppercase tracking-[0.2em] text-gold">Hours</h4>
        <p className="text-white/70">Open daily for lunch, dinner, biryani, mandi, grills and family gatherings.</p>
      </div>
    </div>
    <p className="mt-8 text-center text-sm text-white/45">© {new Date().getFullYear()} Nazeer's Zaffran House. All rights reserved.</p>
  </footer>
);

export default Footer;
