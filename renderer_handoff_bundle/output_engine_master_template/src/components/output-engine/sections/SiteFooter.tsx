import * as React from "react";
import type { BrandData, StructureData, ConnectionsData } from "../types";

interface Props { brand: BrandData; structure: StructureData; connections: ConnectionsData }

/** §12 · Dark navy, framing chrome (does not count as an earned dark moment). */
export const SiteFooter: React.FC<Props> = ({ brand, structure, connections }) => {
  const mark = brand.logo?.kind === "text" ? brand.logo.mark : brand.businessName[0];
  return (
    <footer className="oe-footer" data-section="footer">
      <div className="oe-wrap-wide">
        <div className="oe-footer__top">
          <div className="oe-footer__brand">
            <a href="#top" className="oe-brand">
              <span className="oe-footer__mark">{mark}</span>
              <span style={{ color: "#fff", fontSize: 18 }}>{brand.businessName}</span>
            </a>
            {brand.tagline && <p>{brand.tagline}.</p>}
          </div>
          {structure.footerColumns.map(col => (
            <div key={col.heading} className="oe-footer__col">
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map(l => (
                  <li key={l.label}>{l.href === "#" ? l.label : <a href={l.href}>{l.label}</a>}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="oe-footer__bottom">
          <span>© {new Date().getFullYear()} {brand.businessName}. {brand.location && `· ${brand.location}`}</span>
          <div className="oe-footer__legal">
            <a href="#">Manage cookies</a>
            <a href="#">Sitemap</a>
          </div>
          {connections.socials && connections.socials.length > 0 && (
            <div className="oe-footer__socials">
              {connections.socials.map(s => (
                <a key={s.name} href={s.href} aria-label={s.name}>{s.name}</a>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{FOOTER_CSS}</style>
    </footer>
  );
};

const FOOTER_CSS = `
.oe-footer { background: var(--foundation-navy); color: #cbd5e1; padding: 80px 0 40px; }
.oe-footer__top { display: grid; grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 48px; margin-bottom: 64px; }
.oe-footer__mark { width: 36px; height: 36px; border-radius: 10px;
  background: #fff; color: var(--site-primary);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 16px; }
.oe-footer__brand .oe-brand { color: #fff; gap: 12px; }
.oe-footer__brand p { font-size: 14px; line-height: 1.55; max-width: 30ch;
  margin: 16px 0 0; color: #94a3b8; }
.oe-footer__col h5 { color: #fff; font-family: var(--font-display); font-weight: 600;
  font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 20px; }
.oe-footer__col ul { list-style: none; padding: 0; margin: 0; }
.oe-footer__col li { margin-bottom: 10px; color: #cbd5e1; font-size: 14px; }
.oe-footer__col a { color: #cbd5e1; text-decoration: none; font-size: 14px; }
.oe-footer__col a:hover { color: #fff; }
.oe-footer__bottom { display: flex; justify-content: space-between; align-items: center;
  gap: 24px; flex-wrap: wrap; padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #64748b; }
.oe-footer__legal { display: flex; gap: 20px; flex-wrap: wrap; }
.oe-footer__legal a { color: #94a3b8; }
.oe-footer__socials { display: flex; gap: 8px; }
.oe-footer__socials a { width: 32px; height: 32px; background: rgba(255,255,255,0.06);
  border-radius: 6px; display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 13px; text-decoration: none; }
.oe-footer__socials a:hover { background: rgba(255,255,255,0.12); color: #fff; }
@media (max-width: 900px) { .oe-footer__top { grid-template-columns: 1fr 1fr; gap: 32px; } }
@media (max-width: 540px) { .oe-footer__top { grid-template-columns: 1fr; } }`;
