import { categories as frontendCategories, sampleMenu } from "../../../frontend/src/data/menuData.js";
import { galleryPhotos } from "../../../frontend/src/data/galleryData.js";

export const categories = frontendCategories.filter((category) => category !== "All");

export const menuItems = sampleMenu.map(({ _id, ...item }) => ({
  ...item,
  image: "",
  description: item.description || ""
}));

export const offers = [
  { title: "Royal Family Mandi", description: "Order any full mandi and get complimentary soft drinks for four.", code: "MANDI4", validTill: "This month" },
  { title: "Biryani Feast", description: "Save on family biryani orders for lunch and dinner gatherings.", code: "ZAFRAN10", validTill: "Limited time" },
  { title: "Dessert Finish", description: "Add Royal Falooda at a special price with orders above ₹999.", code: "ROYALDESSERT", validTill: "Weekend special" }
];

export const galleryItems = galleryPhotos.map(({ _id, ...item }) => item);
