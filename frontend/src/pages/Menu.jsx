import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import { menuBookCategories, menuImageFor, sampleMenu } from "../data/menuData.js";
import SectionTitle from "../components/SectionTitle.jsx";
import MenuBookSection from "../components/MenuBookSection.jsx";

const slugify = (text) => text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Menu = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState(sampleMenu);
  const [category, setCategory] = useState(() => searchParams.get("category") || "ALL");
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/menu")
      .then(({ data }) => {
        setItems(data.length ? data.map((item) => ({ ...item, image: item.image || menuImageFor(item) })) : sampleMenu);
      })
      .catch(() => setItems(sampleMenu));
  }, []);

  const allSections = useMemo(() => {
    const filteredItems = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || (filter === "veg" && item.isVeg) || (filter === "nonveg" && !item.isVeg) || (filter === "featured" && item.isFeatured);
      return matchesSearch && matchesFilter;
    });

    return menuBookCategories
      .map((section) => {
        const sectionItems = filteredItems.filter((item) => section.match.includes(item.category));
        return { ...section, id: slugify(section.title), items: sectionItems };
      })
      .filter((section) => section.items.length);
  }, [items, search, filter]);

  const groupedSections = useMemo(
    () => allSections.filter((section) => category === "ALL" || section.title === category),
    [allSections, category]
  );

  const displaySections = useMemo(() => {
    return groupedSections.map((section) => ({
      ...section,
      items: section.items.map((item, index) => ({
        ...item,
        displayImage: index === 0 ? item.image : ""
      }))
    }));
  }, [groupedSections]);

  return (
    <main className="lux-section menu-page">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Menu" title="Biryani, Mandi, Tandoor And More" text="Search dishes, filter by category and add your favorites to the cart for WhatsApp ordering." />
        <div className="menu-controls mb-5 grid gap-4 p-4 md:grid-cols-[1fr_260px_220px]">
          <input className="field" placeholder="Search menu items" value={search} onChange={(event) => setSearch(event.target.value)} />
          <select className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="ALL">ALL CATEGORIES</option>
            {allSections.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
          </select>
          <select className="field" value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">All items</option>
            <option value="veg">Veg only</option>
            <option value="nonveg">Non-veg only</option>
            <option value="featured">Featured</option>
          </select>
        </div>
        <div className="menu-tabs">
          <button className={category === "ALL" ? "active" : ""} type="button" onClick={() => setCategory("ALL")}>All</button>
          {allSections.map((section) => (
            <button key={section.title} className={category === section.title ? "active" : ""} type="button" onClick={() => setCategory(section.title)}>
              {section.title}
            </button>
          ))}
        </div>
        <div className="menu-category-stack">
          {displaySections.map((section) => (
            <MenuBookSection key={section.title} id={section.id} title={section.title} items={section.items} />
          ))}
          {!displaySections.length && <p className="menu-empty">No menu items found for this search.</p>}
        </div>
      </div>
    </main>
  );
};

export default Menu;
