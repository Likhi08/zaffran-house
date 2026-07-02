import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaUtensils } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle.jsx";
import { restaurant } from "../data/menuData.js";

const About = () => (
  <main className="lux-section">
    <div className="mx-auto max-w-7xl px-4">
      <SectionTitle eyebrow="About" title="Royal Taste, Kadiri Warmth" text="Nazeer's Zaffran House brings together fragrant dum biryani, smoky Arabian mandi and bold Indian gravies in a premium family restaurant experience." />
      <section className="about-hero-panel">
        <div>
          <p className="about-kicker">Kadiri's Royal Dining House</p>
          <h2>Built for mandi feasts, biryani cravings and family tables.</h2>
          <p>
            Nazeer's Zaffran House is designed around generous portions, fragrant rice,
            slow-cooked meats and a relaxed dining experience for families, friends and
            celebration orders.
          </p>
          <div className="about-actions">
            <Link className="btn-gold" to="/menu">Explore Menu</Link>
            <Link className="btn-ghost" to="/reservations">Reserve Table</Link>
          </div>
        </div>
        <div className="about-info-card">
          <span><FaMapMarkerAlt /> {restaurant.address}</span>
          <span><FaPhoneAlt /> {restaurant.phone}</span>
          <span><FaStar /> Google rating {restaurant.rating}/5</span>
          <span><FaUtensils /> Mandi, biryani, grills, curries and desserts</span>
        </div>
      </section>

      <div className="about-stats">
        {[
          ["21+", "Menu Categories"],
          ["10 = 1", "Reward Meals"],
          ["4.6", "Google Rating"],
          ["Kadiri", "Local Favorite"]
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Zaffran Aroma", "Saffron-led rice dishes, slow-cooked meats and balanced spice profiles for a rich dining experience."],
          ["Family Ready", "Portions and service designed for groups, birthdays, weekend dinners and relaxed takeaways."],
          ["Premium Comfort", "A royal purple and gold restaurant identity that feels polished without losing Kadiri warmth."]
        ].map(([title, text]) => (
          <article key={title} className="about-feature-card">
            <h3 className="font-display text-2xl text-gold">{title}</h3>
            <p className="mt-4 leading-7 text-white/70">{text}</p>
          </article>
        ))}
      </div>

      <section className="about-story">
        <div>
          <p className="about-kicker">What We Serve</p>
          <h2>Authentic flavours with a premium presentation.</h2>
        </div>
        <div className="about-story-list">
          {["Arabian mandi rice with roasted chicken and mutton portions", "Hyderabadi dum biryani for solo, half and family orders", "Tandoor, starters, gravies, breads, drinks, faloodas and paan"].map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
    </div>
  </main>
);

export default About;
