import * as React from "react";
import type { ContentData, ConnectionsData, StructureData } from "../types";

interface Props { content: ContentData; connections: ConnectionsData; structure: StructureData }

/** §10 · Dark · earned moment 2. Always renders. */
export const CTABlock: React.FC<Props> = ({ content, connections, structure }) => (
  <section
    className="oe-section oe-section--dark oe-cta-block"
    data-section="cta-block" data-section-label="Contact" id="contact"
  >
    <div className="oe-wrap oe-cta-block__grid">
      <div>
        <div className="oe-eyebrow oe-eyebrow--on-dark">Get in touch</div>
        <h2 className="oe-h2">{content.ctaBlockHeadline || "Get in touch."}</h2>
        {content.ctaBlockBody && <p className="oe-lede">{content.ctaBlockBody}</p>}
        <div className="oe-cta-block__actions">
          <a href={structure.primaryCTA.href} className="oe-btn oe-btn--cta">{structure.primaryCTA.label} →</a>
          {connections.phone && (
            <a href={`tel:${connections.phone.replace(/\s/g, "")}`} className="oe-btn oe-btn--on-dark">
              Call {connections.phone}
            </a>
          )}
        </div>
      </div>
      <div className="oe-contact-card">
        <h4 className="oe-contact-card__h">Studio details</h4>
        {connections.address && (
          <Row icon="📍" label="Address" value={connections.address.replace(/\n/g, "  ")} />
        )}
        {connections.phone && (
          <Row icon="📞" label="Phone" value={<a href={`tel:${connections.phone.replace(/\s/g, "")}`}>{connections.phone}</a>} />
        )}
        {connections.email && (
          <Row icon="✉" label="Email" value={<a href={`mailto:${connections.email}`}>{connections.email}</a>} />
        )}
        {connections.hours && connections.hours.map(h => (
          <Row key={h.day} icon="🕒" label={h.day} value={h.value} />
        ))}
      </div>
    </div>
    <style>{CTA_BLOCK_CSS}</style>
  </section>
);

const Row: React.FC<{ icon: string; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <div className="oe-contact-row">
    <div className="oe-contact-row__icon">{icon}</div>
    <div>
      <div className="oe-contact-row__l">{label}</div>
      <div className="oe-contact-row__v">{value}</div>
    </div>
  </div>
);

const CTA_BLOCK_CSS = `
.oe-cta-block__grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center; }
.oe-cta-block .oe-h2 { color: #fff; max-width: 14ch;
  font-size: clamp(2.25rem, 4vw, 3rem); }
.oe-cta-block__actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 12px; }
.oe-contact-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--preset-radius-lg, 20px); padding: 36px; }
.oe-contact-card__h { color: #7fd4cb; font-size: 0.8125rem; letter-spacing: 0.14em;
  text-transform: uppercase; font-weight: 700; margin: 0 0 24px; font-family: var(--font-display); }
.oe-contact-row { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.oe-contact-row:last-child { border-bottom: 0; }
.oe-contact-row__icon { flex-shrink: 0; width: 36px; height: 36px;
  background: rgba(127,212,203,0.12); border-radius: 8px;
  display: flex; align-items: center; justify-content: center; color: #7fd4cb; font-size: 16px; }
.oe-contact-row__l { font-size: 12px; color: #94a3b8; margin-bottom: 2px; letter-spacing: 0.04em; }
.oe-contact-row__v { color: #fff; font-size: 15px; font-weight: 500; white-space: pre-line; }
.oe-contact-row__v a { color: #fff; text-decoration: none; }
.oe-contact-row__v a:hover { color: #7fd4cb; }
@media (max-width: 900px) { .oe-cta-block__grid { grid-template-columns: 1fr; gap: 40px; } }`;
