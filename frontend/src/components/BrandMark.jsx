const BrandMark = ({ compact = false }) => (
  <div className={compact ? "brand-mark brand-mark-compact" : "brand-mark"}>
    <img src="/zfh-logo.png" alt="Nazeer's Zaffran House" />
  </div>
);

export default BrandMark;
