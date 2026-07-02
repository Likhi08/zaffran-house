import { FaGift, FaStar } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle.jsx";

const Rewards = () => (
  <main className="lux-section">
    <div className="mx-auto max-w-5xl px-4">
      <SectionTitle eyebrow="Rewards" title="10 Meals = 1 Free Meal" text="Collect meal stamps on dine-in or takeaway orders and unlock a complimentary meal after your tenth visit." />
      <div className="royal-panel p-8">
        <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="grid aspect-square place-items-center rounded-md border border-gold/35 bg-gold/10 text-2xl text-gold">
              {index === 9 ? <FaGift /> : <FaStar />}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-lg leading-8 text-white/75">Ask the counter team to mark your reward after each eligible meal. The 10th stamp unlocks one free meal reward.</p>
      </div>
    </div>
  </main>
);

export default Rewards;
