import { motion } from "framer-motion";
import BrandMark from "./BrandMark.jsx";

const SectionTitle = ({ eyebrow, title, text, center = true }) => (
  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={center ? "section-title mx-auto mb-10 max-w-3xl text-center" : "mb-8 max-w-3xl"}>
    {center && <BrandMark />}
    {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>}
    <h2 className="font-display text-3xl text-white md:text-5xl">{title}</h2>
    {text && <p className="mt-4 text-base leading-8 text-white/70">{text}</p>}
  </motion.div>
);

export default SectionTitle;
