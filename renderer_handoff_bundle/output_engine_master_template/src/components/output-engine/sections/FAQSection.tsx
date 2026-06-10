import * as React from "react";
import type { FAQItem, ConnectionsData } from "../types";

interface Props { faqs?: FAQItem[]; connections?: ConnectionsData }

/** §9 · Renders only when ≥2 FAQs. */
export const FAQSection: React.FC<Props> = ({ faqs }) => {
  const [open, setOpen] = React.useState<number | null>(0);
  if (!faqs || faqs.length < 2) return null;

  return (
    <section
      className="oe-section oe-faq"
      data-section="faq" data-section-label="FAQ" id="faq"
    >
      <div className="oe-wrap oe-faq__grid">
        <div className="oe-faq__left">
          <div className="oe-eyebrow">FAQs</div>
          <h2 className="oe-h2">The questions we get every week.</h2>
          <p>Anything not answered? Drop us a line — we reply same-day, usually.</p>
          <a href="#contact" className="oe-btn-arrow">Ask us anything →</a>
        </div>
        <div className="oe-faq__list">
          {faqs.map((f, i) => (
            <div key={f.question} className={`oe-faq__item${open === i ? " is-open" : ""}`}>
              <button className="oe-faq__q" onClick={() => setOpen(open === i ? null : i)}>
                {f.question}
                <span className="oe-faq__chev">+</span>
              </button>
              <div className="oe-faq__a"><p>{f.answer}</p></div>
            </div>
          ))}
        </div>
      </div>
      <style>{FAQ_CSS}</style>
    </section>
  );
};

const FAQ_CSS = `
.oe-faq__grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; align-items: start; }
.oe-faq__left .oe-h2 { max-width: 14ch; }
.oe-faq__list { display: grid; gap: 12px; }
.oe-faq__item { background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: var(--preset-radius-md, 12px); overflow: hidden; }
.oe-faq__q { all: unset; box-sizing: border-box; cursor: pointer; width: 100%;
  padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; gap: 24px;
  font-family: var(--font-display); font-size: 1.0625rem; font-weight: 600;
  color: var(--foundation-dark); letter-spacing: -0.005em; line-height: 1.4; text-align: left; }
.oe-faq__chev { flex-shrink: 0; width: 28px; height: 28px; border-radius: 999px;
  background: var(--foundation-wash); display: flex; align-items: center; justify-content: center;
  color: var(--site-primary); font-weight: 700; transition: transform 200ms var(--ease-standard); }
.oe-faq__item.is-open .oe-faq__chev { transform: rotate(45deg); }
.oe-faq__a { padding: 0 24px; max-height: 0; overflow: hidden;
  transition: max-height 320ms var(--ease-standard), padding 320ms var(--ease-standard); }
.oe-faq__item.is-open .oe-faq__a { padding: 0 24px 22px; max-height: 400px; }
.oe-faq__a p { font-size: 15px; line-height: 1.6; margin: 0; color: var(--foundation-slate); }
@media (max-width: 900px) { .oe-faq__grid { grid-template-columns: 1fr; gap: 32px; } }`;
