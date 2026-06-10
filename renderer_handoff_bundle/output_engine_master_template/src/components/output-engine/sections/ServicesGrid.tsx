import * as React from "react";
import type { ContentData } from "../types";

interface Props { content: ContentData }

const TINTS = ["", "alt", "alt2", "alt3", "alt4", "alt5"] as const;

/** §5 · Always renders if ≥1 service. */
export const ServicesGrid: React.FC<Props> = ({ content }) => {
  if (!content.services || content.services.length === 0) return null;

  return (
    <section
      className="oe-section oe-services"
      data-section="services" data-section-label="Services" id="services"
    >
      <div className="oe-wrap">
        <div className="oe-services__head">
          <div>
            <div className="oe-eyebrow">Services & pricing</div>
            <h2 className="oe-h2">Honest pricing. No surprises at pickup.</h2>
          </div>
          <p className="oe-lede" style={{ margin: 0 }}>
            Every price below is the price you pay. If your dog's coat needs more time than usual,
            we'll call before we start — never bill you after.
          </p>
        </div>
        <div className="oe-services__grid">
          {content.services.map((s, i) => (
            <article key={s.name} className="oe-service">
              <div className={`oe-service__img is-${TINTS[i % TINTS.length]}`}>
                {s.imageUrl ? <img src={s.imageUrl} alt={s.name} /> : <span>Service image · 16:10</span>}
              </div>
              <div className="oe-service__body">
                <div className="oe-service__meta">
                  <div className="oe-service__price">{s.price}</div>
                  {s.duration && <div className="oe-service__dur">{s.duration}</div>}
                </div>
                <h3 className="oe-h3" style={{ fontSize: "1.2rem" }}>{s.name}</h3>
                <p>{s.description}</p>
                <a href="#booking" className="oe-service__link">Book {s.name.toLowerCase()} →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{SERVICES_CSS}</style>
    </section>
  );
};

const SERVICES_CSS = `
.oe-services__head { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: end; margin-bottom: 56px; }
.oe-services__head .oe-h2 { max-width: 16ch; }
.oe-services__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.oe-service { background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: var(--preset-radius-md, 12px); overflow: hidden;
  box-shadow: var(--preset-shadow-card, 0 1px 3px rgba(15,25,35,0.06));
  display: flex; flex-direction: column;
  transition: box-shadow 200ms var(--ease-standard), border-color 200ms var(--ease-standard); }
.oe-service:hover { box-shadow: var(--preset-shadow-lift, 0 12px 32px rgba(15,25,35,0.08)); border-color: #cbd5e1; }
.oe-service__img { aspect-ratio: 16/10;
  background: color-mix(in oklab, var(--site-primary), white 82%);
  color: color-mix(in oklab, var(--site-primary), black 25%);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600;
  border-bottom: 1px solid var(--foundation-pale); }
.oe-service__img img { width: 100%; height: 100%; object-fit: cover; }
.oe-service__img.is-alt  { background: #fef3c7; color: #92400e; }
.oe-service__img.is-alt2 { background: #e0e7ff; color: #3730a3; }
.oe-service__img.is-alt3 { background: #fee2e2; color: #991b1b; }
.oe-service__img.is-alt4 { background: #ede9fe; color: #5b21b6; }
.oe-service__img.is-alt5 { background: #d1fae5; color: #065f46; }
.oe-service__body { padding: 24px 26px; flex: 1; display: flex; flex-direction: column; }
.oe-service__meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.oe-service__price { font-family: var(--font-display); font-weight: 700; font-size: 20px;
  color: var(--foundation-dark); letter-spacing: -0.015em; }
.oe-service__dur { font-size: 13px; color: var(--foundation-mid); font-weight: 500; }
.oe-service h3 { margin-bottom: 8px; }
.oe-service p { font-size: 14.5px; line-height: 1.55; color: var(--foundation-slate); flex: 1; margin-bottom: 18px; }
.oe-service__link { color: var(--site-primary); font-weight: 600; font-size: 14.5px;
  text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
@media (max-width: 900px) {
  .oe-services__head { grid-template-columns: 1fr; gap: 16px; align-items: start; }
  .oe-services__grid { grid-template-columns: 1fr; }
}`;
