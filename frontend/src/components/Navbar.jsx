import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaPhoneAlt, FaShoppingBag, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import BrandMark from "./BrandMark.jsx";
import { restaurant } from "../data/menuData.js";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Gallery", "/gallery"],
  ["Reservations", "/reservations"],
  ["Contact", "/contact"],
  ["Feedback", "/feedback"]
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navClass = ({ isActive }) => `nav-link ${isActive ? "text-gold" : "text-white/80 hover:text-gold"}`;

  return (
    <header className="sticky top-0 z-40 border border-gold/35 bg-[#180522]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark compact />
          <span>
            <span className="block font-display text-xl text-white">Nazeer's</span>
            <span className="block text-xs uppercase tracking-[0.22em] text-gold">Zaffran House</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map(([label, path]) => <NavLink key={path} to={path} className={navClass}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${restaurant.phone}`} className="hidden items-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-sm font-bold text-white/85 transition hover:border-gold hover:text-gold xl:flex">
            <FaPhoneAlt className="text-gold" /> {restaurant.phone}
          </a>
          <Link to="/cart" className="relative rounded-full border border-gold/40 p-3 text-gold transition hover:bg-gold hover:text-ink" aria-label="Cart">
            <FaShoppingBag />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-bold text-royal">{count}</span>}
          </Link>
          {isAuthenticated && user?.isAdmin ? (
            <Link to="/admin/dashboard" className="hidden min-h-12 items-center rounded-full border border-gold/40 px-5 py-2 text-sm font-extrabold whitespace-nowrap text-gold transition hover:bg-gold hover:text-ink md:inline-flex">Admin</Link>
          ) : null}
          {isAuthenticated && !user?.isAdmin && (
            <button onClick={logout} className="hidden min-h-12 items-center rounded-full border border-gold/40 px-5 py-2 text-sm font-extrabold whitespace-nowrap text-gold transition hover:bg-gold hover:text-ink md:inline-flex">Logout</button>
          )}
          <Link to="/menu" className="hidden min-h-12 items-center rounded-full bg-gold px-5 py-2 text-sm font-extrabold whitespace-nowrap text-ink transition hover:bg-white md:inline-flex">Order Now</Link>
          <button className="rounded-full border border-gold/40 p-3 text-gold lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-gold/10 bg-plum px-4 py-4 lg:hidden">
          {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-white/85 hover:bg-gold/10 hover:text-gold">{label}</NavLink>)}
          {isAuthenticated && user?.isAdmin ? (
            <>
              <NavLink to="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-gold">Admin Dashboard</NavLink>
              <button onClick={() => { logout(); setOpen(false); }} className="rounded-md px-3 py-3 text-left text-white/85 hover:bg-gold/10 hover:text-gold">Logout</button>
            </>
          ) : (
            <NavLink to="/menu" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-white/85 hover:bg-gold/10 hover:text-gold">Order on WhatsApp</NavLink>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
