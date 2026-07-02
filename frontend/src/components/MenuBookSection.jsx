import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (price) => `₹${price}`;
const formatPriceOptions = (options) => options.map((option) => formatPrice(option.price)).join(" / ");

const MenuBookSection = ({ title, items, id }) => {
  const { addToCart } = useCart();
  const sectionImage = items.find((item) => item.displayImage)?.displayImage;

  if (!items.length) return null;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="menu-category-card"
    >
      <div className="menu-category-content">
        <div
          className={sectionImage ? "menu-category-heading has-heading-bg" : "menu-category-heading"}
          style={sectionImage ? { "--menu-section-image": `url(${sectionImage})` } : undefined}
        >
          <div className="menu-category-title">
            <p>Nazeer's Zaffran House</p>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="menu-category-list">
          {items.map((item) => (
            <div key={item._id || item.name} className="menu-list-row">
              <div className="menu-list-main">
                <div className="menu-list-name">
                  <span>{item.name}</span>
                  {item.isVeg && <small>VEG</small>}
                </div>
                <span className="menu-list-dots" />
                <span className="menu-list-price">{formatPriceOptions(item.priceOptions)}</span>
              </div>
              <div className="menu-list-actions">
                {item.priceOptions.length > 1 ? (
                  item.priceOptions.map((option) => (
                    <button key={`${item.name}-${option.label}`} type="button" onClick={() => addToCart(item, option)}>
                      <FaPlus /> {option.label}
                    </button>
                  ))
                ) : (
                  <button type="button" onClick={() => addToCart(item, item.priceOptions[0])}>
                    <FaPlus /> Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MenuBookSection;
