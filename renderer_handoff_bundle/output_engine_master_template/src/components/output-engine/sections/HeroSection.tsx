import * as React from "react";
import type { BrandData, ContentData, StructureData } from "../types";

interface Props { brand: BrandData; content: ContentData; structure: StructureData }

/** §2 · Dark · earned moment 1. Always renders. */
export const HeroSection: React.FC<Props> = ({ brand, content, structure }) => (
  <section
    className="oe-section oe-section--dark oe-hero"
    data-section="hero" data-section-label="Welcome" id="hero"
  >
    <div className="oe-wrap-wide oe-hero__grid">
      <div>
        {content.heroEyebrow && (
          <div className="oe-eyebrow oe-eyebrow--on-dark">{content.heroEyebrow}</div>
        )}
        <h1 className="oe-hero__h1">{content.heroHeadline}</h1>
        <p className="oe-lede oe-hero__lede">{content.heroDescription}</p>
        <div className="oe-hero__ctas">
          <a href={structure.primaryCTA.href} className="oe-btn oe-btn--cta">
            {structure.primaryCTA.label} →
          </a>
          <a href="#services" className="oe-btn oe-btn--on-dark">See services & pricing</a>
        </div>
        {content.heroTrustBullets && content.heroTrustBullets.length > 0 && (
          <div className="oe-hero__trust">
            {content.heroTrustBullets.map(b => (
              <span key={b}><span className="oe-hero__tick">✓</span> {b}</span>
            ))}
          </div>
        )}
      </div>
      <HeroImage src={content.heroImage} brand={brand} />
    </div>
    <style>{HERO_CSS}</style>
  </section>
);

const HeroImage: React.FC<{ src?: string; brand: BrandData }> = ({ src, brand }) => (
  <div className="oe-hero__image">
    {src ? (
      <img src={src} alt={`${brand.businessName} hero`} />
    ) : (
      <span className="oe-hero__placeholder">Hero image · 4:5 · placehold.co</span>
    )}
  </div>
);

const HERO_CSS = `
.oe-hero { overflow: hidden; position: relative; }
.oe-hero::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
  background-size: 32px 32px; pointer-events: none;
  mask-image: linear-gradient(180deg, #000 0%, #000 60%, transparent 100%);
}
.oe-hero__grid { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: 64px; align-items: center; }
.oe-hero__h1 {
  font-family: var(--font-display); font-weight: 600;
  font-size: clamp(2.5rem, 5vw, 4.25rem); color: #fff;
  letter-spacing: var(--preset-tracking-display, -0.025em); line-height: 1.05;
  margin: 0 0 24px; max-width: 14ch;
}
.oe-hero__lede { color: #cbd5e1; margin: 0 0 32px; max-width: 48ch; }
.oe-hero__ctas { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.oe-hero__trust { display: flex; gap: 28px; margin-top: 44px; flex-wrap: wrap;
  font-size: 13.5px; color: #94a3b8; }
.oe-hero__trust span { display: inline-flex; align-items: center; gap: 8px; }
.oe-hero__tick { color: #7fd4cb; }
.oe-hero__image {
  position: relative; border-radius: var(--preset-radius-lg, 20px);
  overflow: hidden; aspect-ratio: 4/5;
  background: linear-gradient(135deg, var(--site-primary) 0%, color-mix(in oklab, var(--site-primary), #000 25%) 100%);
  box-shadow: 0 32px 64px rgba(0,0,0,0.4);
}
.oe-hero__image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.oe-hero__placeholder {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.4); font-size: 13px; letter-spacing: 0.08em;
  text-transform: uppercase; font-weight: 600;
}
@media (max-width: 900px) {
  .oe-hero__grid { grid-template-columns: 1fr; gap: 40px; }
  .oe-hero__h1 { max-width: 100%; }
  .oe-hero__image { aspect-ratio: 4/3; }
}`;
