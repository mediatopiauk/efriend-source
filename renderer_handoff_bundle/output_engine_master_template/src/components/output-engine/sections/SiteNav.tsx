import * as React from "react";
import type { BrandData, StructureData, ConnectionsData } from "../types";

interface Props { brand: BrandData; structure: StructureData; connections: ConnectionsData }

/** Sticky top nav · light variant. Mobile collapses to burger. */
export const SiteNav: React.FC<Props> = ({ brand, structure, connections }) => (
  <nav className="oe-topnav" data-section="nav">
    <div className="oe-wrap-wide oe-topnav__inner">
      <a href="#top" className="oe-brand">
        <Mark brand={brand} />
        {brand.businessName}
      </a>
      <div className="oe-topnav__links">
        {structure.navLinks.map(l => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <div className="oe-topnav__cta">
        {connections.phone && (
          <a href={`tel:${connections.phone.replace(/\s/g, "")}`} className="oe-topnav__phone">
            📞 {connections.phone}
          </a>
        )}
        <a href={structure.primaryCTA.href} className="oe-btn oe-btn--cta">
          {structure.primaryCTA.label}
        </a>
      </div>
    </div>
    <style>{NAV_CSS}</style>
  </nav>
);

const Mark: React.FC<{ brand: BrandData }> = ({ brand }) => {
  if (brand.logo?.kind === "image") {
    return <img className="oe-brand__mark-img" src={brand.logo.src} alt={brand.businessName} />;
  }
  const mark = brand.logo?.kind === "text" ? brand.logo.mark : brand.businessName[0];
  return <span className="oe-brand__mark">{mark}</span>;
};

const NAV_CSS = `
.oe-topnav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: saturate(140%) blur(10px);
  -webkit-backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--foundation-pale);
}
.oe-topnav__inner { height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.oe-brand { display: flex; align-items: center; gap: 12px; text-decoration: none;
  color: var(--foundation-dark); font-family: var(--font-display); font-weight: 600;
  font-size: 17px; letter-spacing: -0.01em; }
.oe-brand__mark { width: 36px; height: 36px; border-radius: 10px;
  background: var(--site-primary); color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
.oe-brand__mark-img { width: 36px; height: 36px; border-radius: 10px; object-fit: contain; }
.oe-topnav__links { display: flex; gap: 28px; align-items: center; font-size: 14.5px; }
.oe-topnav__links a { color: var(--foundation-slate); text-decoration: none; font-weight: 500; }
.oe-topnav__links a:hover { color: var(--foundation-dark); }
.oe-topnav__cta { display: flex; gap: 12px; align-items: center; }
.oe-topnav__phone { color: var(--foundation-slate); text-decoration: none; font-weight: 600;
  font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
@media (max-width: 900px) {
  .oe-topnav__links { display: none; }
  .oe-topnav__phone { display: none; }
}`;
