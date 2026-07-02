import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import { galleryPhotos } from "../data/galleryData.js";
import SectionTitle from "../components/SectionTitle.jsx";

const fallback = galleryPhotos;

const Gallery = () => {
  const [items, setItems] = useState(fallback);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const visibleItems = selectedCategory
    ? items.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase())
    : items;

  useEffect(() => {
    api.get("/gallery")
      .then(({ data }) => {
        const hasLocalPhotos = data.some((item) => item.image?.includes("/gallery/"));
        setItems(data.length && hasLocalPhotos ? data : fallback);
      })
      .catch(() => setItems(fallback));
  }, []);

  return (
    <main className="lux-section">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Gallery" title="A Look Inside Zaffran House" text="Exterior lights, royal seating, warm dining corners and a few signature food moments from the Zaffran House experience." />
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Link className={selectedCategory ? "btn-ghost" : "btn-gold"} to="/gallery">All Gallery</Link>
          <Link className={selectedCategory === "Restaurant" ? "btn-gold" : "btn-ghost"} to="/gallery?category=Restaurant">Restaurant Gallery</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <figure key={item._id} className="overflow-hidden rounded-lg border border-gold/20 bg-white/[0.04]">
              <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
              <figcaption className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{item.category}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
