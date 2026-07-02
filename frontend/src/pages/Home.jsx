import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt, FaStar, FaUtensils, FaWhatsapp } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle.jsx";
import BrandMark from "../components/BrandMark.jsx";
import QRMenuCard from "../components/QRMenuCard.jsx";
import { restaurant, sampleMenu } from "../data/menuData.js";

const Home = () => {
  const featured = sampleMenu.filter((item) => item.isFeatured).slice(0, 6);
  const categoryLinks = {
    Biryani: "/menu?category=HYDERABADI%20DUM%20BIRYANI",
    "Arabian Mandi": "/menu?category=ARABIAN%20MANDI",
    Tandoor: "/menu?category=KEBABS%20%2F%20TANDOOR",
    "Non-Veg Gravies": "/menu?category=CHICKEN%20CURRIES",
    "Non-Veg Starters": "/menu?category=NON-VEG%20STARTERS",
    "Veg Starters": "/menu?category=VEG%20STARTERS",
    "Rice Items": "/menu?category=RICE%20%26%20NOODLES",
    Faloodas: "/menu?category=FALOODAS%20%26%20PAAN"
  };
  const menuLinkFor = (item) => {
    const base = categoryLinks[item.category] || "/menu";
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}search=${encodeURIComponent(item.name)}`;
  };

  return (
    <main>
      <section className="home-hero-section">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="hero-preview hero-feature text-left">
            <div className="hero-content min-h-[540px]">
              <p className="hero-kicker">Kadiri's royal dining address</p>
              <p className="hero-rating"><FaStar /> {restaurant.rating}/5 Google rating</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-tight text-gold md:text-7xl">{restaurant.name}</h1>
              <p className="mt-5 max-w-2xl text-xl font-bold leading-8 text-white md:text-2xl">A premium feast of Arabian mandi, Hyderabadi biryani, smoky grills and Mughlai gravies.</p>
              <p className="mt-5 flex max-w-2xl items-start gap-2 text-sm leading-7 text-white/80 md:text-base">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" /> {restaurant.address}
              </p>
              <div className="hero-actions mt-8">
                <Link className="btn-gold hero-primary" to="/menu"><FaUtensils /> Explore Menu</Link>
                <a className="btn-ghost hero-whatsapp" href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noreferrer"><FaWhatsapp /> Order on WhatsApp</a>
                <Link className="btn-ghost" to="/gallery?category=Restaurant">View Gallery</Link>
              </div>
              <div className="hero-meta">
                <span><FaClock /> Opens at 12:00 PM</span>
                <span>Family dining</span>
                <span>Takeaway</span>
                <span>Mandi portions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="lux-section">
        <SectionTitle eyebrow="Signature Plates" title="A Spread Built For Royal Appetite" text="Biryani, mandi, tandoor and grills prepared for family tables, late dinners and celebration orders." />
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <Link key={item._id} to={menuLinkFor(item)} className="signature-card">
              <p>{item.category}</p>
              <h3>{item.name}</h3>
              <span>{item.priceOptions.map((option) => `₹${option.price}`).join(" / ")}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-gold/15 bg-royal/35 px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["10 meals = 1 free meal", "/rewards"],
            ["WhatsApp ordering", "/cart"],
            ["Family mandi portions", "/menu"]
          ].map(([text, path]) => (
            <Link key={text} to={path} className="royal-panel block p-7 text-center transition hover:-translate-y-1 hover:border-gold hover:bg-gold/10">
              <p className="font-display text-2xl text-gold">{text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-bottom-identity px-4 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
          <BrandMark />
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-gold md:text-6xl">{restaurant.name}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-white md:text-base">Kadiri's premium destination for Arabian mandi, Hyderabadi biryani, Mughlai gravies and family dining.</p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            <span className="gold-pill"><FaMapMarkerAlt className="text-gold" />Main Road, beside Valisab Road, Revenue Colony, Kadiri</span>
            <span className="gold-pill"><FaPhoneAlt className="text-gold" />Phone: {restaurant.phone}</span>
            <span className="gold-pill"><FaStar className="text-gold" />Google: {restaurant.rating}</span>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link className="btn-gold" to="/menu">Explore Menu</Link>
            <Link className="btn-ghost" to="/gallery?category=Restaurant">Restaurant Gallery</Link>
            <Link className="btn-ghost" to="/reservations">Reserve Table</Link>
          </div>
        </motion.div>
        <div className="mx-auto mt-12 max-w-4xl">
          <QRMenuCard />
        </div>
      </section>
    </main>
  );
};

export default Home;
