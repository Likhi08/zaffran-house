import { Link } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";

const NotFound = () => (
  <main className="grid min-h-[70vh] place-items-center px-4 text-center">
    <div>
      <BrandMark />
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">404</p>
      <h1 className="mt-4 font-display text-5xl text-white">Page Not Found</h1>
      <p className="mt-4 text-white/70">The page you are looking for is not on this menu.</p>
      <Link className="btn-gold mt-8 inline-block" to="/">Back Home</Link>
    </div>
  </main>
);

export default NotFound;
