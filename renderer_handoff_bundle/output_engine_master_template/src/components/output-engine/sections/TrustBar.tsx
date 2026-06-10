import * as React from "react";
import type { ContentData } from "../types";

interface Props { logos?: ContentData["trustLogos"] }

/** §3 · Renders only when logos present. */
export const TrustBar: React.FC<Props> = ({ logos }) => {
  if (!logos || logos.length === 0) return null;

  return (
    <section
      className="oe-logobar"
      data-section="logobar" data-section-label="Featured in" id="logobar"
    >
      <div className="oe-wrap">
        <div className="oe-logobar__label">As featured in & trusted by</div>
        <div className="oe-logobar__row">
          {logos.map(l => (
            <div key={l.name} className={`oe-logobar__item${l.style ? ` is-${l.style}` : ""}`}>
              {l.src ? <img src={l.src} alt={l.name} /> : <span>{l.name}</span>}
            </div>
          ))}
        </div>
      </div>
      <style>{LOGOBAR_CSS}</style>
    </section>
  );
};

const LOGOBAR_CSS = `
.oe-logobar { padding: 56px 0; border-bottom: 1px solid var(--foundation-pale); background: var(--foundation-white); }
.oe-logobar__label { text-align: center; font-size: 12px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--foundation-mid); margin-bottom: 28px; }
.oe-logobar__row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 32px; align-items: center; }
.oe-logobar__item { height: 36px; display: flex; align-items: center; justify-content: center;
  color: #94a3b8; font-family: var(--font-display); font-weight: 700; font-size: 17px;
  letter-spacing: -0.01em; opacity: 0.7; transition: opacity 200ms; }
.oe-logobar__item:hover { opacity: 1; }
.oe-logobar__item img { max-height: 36px; opacity: 0.7; }
.oe-logobar__item.is-serif { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 600; }
.oe-logobar__item.is-tight { letter-spacing: -0.04em; font-weight: 800; }
.oe-logobar__item.is-spaced { letter-spacing: 0.18em; font-weight: 500; font-size: 13px; }
@media (max-width: 900px) {
  .oe-logobar__row { grid-template-columns: repeat(3, 1fr); gap: 20px 32px; }
  .oe-logobar__item:nth-child(n+4) { display: none; }
}`;
