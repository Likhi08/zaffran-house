import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import SectionTitle from "../components/SectionTitle.jsx";

const Feedback = () => {
  const [form, setForm] = useState({ name: "", phone: "", rating: 5, message: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/feedback/public").then(({ data }) => setReviews(data)).catch(() => setReviews([]));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/feedback", form);
      toast.success("Thank you for your feedback");
      setForm({ name: "", phone: "", rating: 5, message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit feedback");
    }
  };

  return (
    <main className="lux-section">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle center={false} eyebrow="Feedback" title="Tell Us About Your Meal" text="Your review helps the team improve service and keep the royal taste consistent." />
          <form onSubmit={submit} className="royal-panel grid gap-4 p-6">
            <input className="field" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select className="field" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
            </select>
            <textarea className="field" required rows="5" placeholder="Your feedback" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button className="btn-gold">Submit Feedback</button>
          </form>
        </div>
        <div className="grid gap-4 content-start">
          {reviews.length === 0 && <div className="royal-panel p-6 text-white/70">Approved customer feedback will appear here.</div>}
          {reviews.map((review) => (
            <article key={review._id} className="royal-panel p-6">
              <p className="text-gold">{"★".repeat(review.rating)}</p>
              <p className="mt-3 leading-7 text-white/75">{review.message}</p>
              <p className="mt-4 font-bold text-white">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feedback;
