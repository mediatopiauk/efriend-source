import * as React from "react";
import type { ContentData } from "../types";

interface Props { content: ContentData }

/** §4 · Renders only when ≥1 pain present. */
export const ProblemSection: React.FC<Props> = ({ content }) => {
  if (!content.pains || content.pains.length === 0) return null;

  return (
    <section
      className="oe-section oe-section--wash oe-problem"
      data-section="problem" data-section-label="Why us" id="problem"
    >
      <div className="oe-wrap oe-problem__grid">
        <div className="oe-problem__left">
          {content.problemEyebrow && <div className="oe-eyebrow">{content.problemEyebrow}</div>}
          {content.problemHeadline && <h2 className="oe-h2">{content.problemHeadline}</h2>}
          {content.problemLede && <p className="oe-lede" style={{ marginTop: 24 }}>{content.problemLede}</p>}
        </div>
        <div className="oe-problem__pains">
          {content.pains.map((p, i) => (
            <div key={p.title} className="oe-pain">
              <span className="oe-pain__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="oe-h3">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{PROBLEM_CSS}</style>
    </section>
  );
};

const PROBLEM_CSS = `
.oe-problem__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
.oe-problem__left .oe-h2 { max-width: 14ch; }
.oe-problem__pains { display: grid; gap: 24px; }
.oe-pain { background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: var(--preset-radius-md, 12px); padding: 24px 28px;
  box-shadow: var(--preset-shadow-card, 0 1px 3px rgba(15,25,35,0.06));
  display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: start; }
.oe-pain__num { font-family: var(--font-display); font-size: 13px; font-weight: 700;
  color: var(--site-primary); letter-spacing: 0.08em;
  background: color-mix(in oklab, var(--site-primary), white 80%);
  padding: 6px 10px; border-radius: 6px; width: fit-content; }
.oe-pain h3 { margin-bottom: 6px; }
.oe-pain p { font-size: 15px; color: var(--foundation-slate); margin: 0; }
@media (max-width: 900px) { .oe-problem__grid { grid-template-columns: 1fr; gap: 40px; } }`;
