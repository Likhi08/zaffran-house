import { useEffect, useState } from "react";
import api from "../api/axios.js";
import SectionTitle from "../components/SectionTitle.jsx";

const fallback = [
  { _id: "o1", title: "Royal Family Mandi", description: "Order any full mandi and get complimentary soft drinks for four.", code: "MANDI4", validTill: "This month" },
  { _id: "o2", title: "Biryani Feast", description: "Save on family biryani orders for lunch and dinner gatherings.", code: "ZAFRAN10", validTill: "Limited time" },
  { _id: "o3", title: "Dessert Finish", description: "Add Royal Falooda at a special price with orders above ₹999.", code: "ROYALDESSERT", validTill: "Weekend special" }
];

const Offers = () => {
  const [offers, setOffers] = useState(fallback);

  useEffect(() => {
    api.get("/offers").then(({ data }) => setOffers(data.length ? data : fallback)).catch(() => setOffers(fallback));
  }, []);

  return (
    <main className="lux-section">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Offers" title="Premium Deals For Bigger Tables" text="Rotating restaurant offers for biryani, mandi, desserts and celebration orders." />
        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer._id} className="royal-panel p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-gold">{offer.validTill || "Active"}</p>
              <h3 className="mt-4 font-display text-3xl text-white">{offer.title}</h3>
              <p className="mt-4 leading-7 text-white/70">{offer.description}</p>
              {offer.code && <p className="mt-6 inline-block rounded-md border border-gold/40 px-4 py-2 font-bold text-gold">{offer.code}</p>}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Offers;
