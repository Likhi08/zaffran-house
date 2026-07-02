import { FaQrcode } from "react-icons/fa";
import { restaurant } from "../data/menuData.js";

const QRMenuCard = () => {
  return (
    <div className="qr-menu-card">
      <div>
        <p className="qr-menu-eyebrow"><FaQrcode /> Scan Menu</p>
        <h3>Digital Menu QR</h3>
        <p className="qr-menu-copy">Scan or tap to open the digital menu and order on WhatsApp.</p>
        <p className="qr-menu-meta">{restaurant.phone}</p>
      </div>
      <a className="qr-menu-code" href={restaurant.digitalMenuUrl} target="_blank" rel="noreferrer" aria-label={`Open ${restaurant.name} digital menu`}>
        <img src="/qr-menu.png" alt={`QR code for ${restaurant.name} digital menu`} />
      </a>
    </div>
  );
};

export default QRMenuCard;
