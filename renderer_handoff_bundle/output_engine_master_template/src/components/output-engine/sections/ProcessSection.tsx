import * as React from "react";
import type { ProcessStep } from "../types";

interface Props { steps?: ProcessStep[] }

/** §6 · Renders only when ≥2 steps. */
export const ProcessSection: React.FC<Props> = ({ steps }) => {
  if (!steps || steps.length < 2) return null;

  return (
    <section
      className="oe-section oe-section--wash oe-process"
      data-section="process" data-section-label="How it works" id="process"
    >
      <div className="oe-wrap">
        <div style={{ maxWidth: 540 }}>
          <div className="oe-eyebrow">How it works</div>
          <h2 className="oe-h2">From booking to collection in {steps.length} steps.</h2>
        </div>
        <div className="oe-process__grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((s, i) => (
            <div key={s.title} className="oe-step">
              <div className="oe-step__num">{i + 1}</div>
              <h3 className="oe-h4">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{PROCESS_CSS}</style>
    </section>
  );
};

const PROCESS_CSS = `
.oe-process__grid { display: grid; gap: 32px; margin-top: 56px; position: relative; }
.oe-process__grid::before { content: ''; position: absolute; top: 24px; left: 5%; right: 5%;
  height: 1px; background: var(--foundation-pale); z-index: 0; }
.oe-step { position: relative; z-index: 1; }
.oe-step__num { width: 48px; height: 48px; border-radius: 999px;
  background: var(--site-primary); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: 700; font-size: 18px;
  margin-bottom: 20px; box-shadow: 0 0 0 8px var(--foundation-wash); }
.oe-step h3 { margin-bottom: 8px; }
.oe-step p { font-size: 14.5px; color: var(--foundation-slate); margin: 0; }
@media (max-width: 900px) {
  .oe-process__grid { grid-template-columns: 1fr !important; gap: 24px; }
  .oe-process__grid::before { display: none; }
}`;
