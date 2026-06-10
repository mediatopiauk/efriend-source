import * as React from "react";
import type { ContentData, ModulesData } from "../types";

interface Props { content: ContentData; modules: ModulesData }

/**
 * §8 · Stats row + testimonial cards.
 * Stats and testimonials each gate independently — section only hides when
 * BOTH are empty.
 */
export const SocialProofSection: React.FC<Props> = ({ content, modules }) => {
  const showStats = !!content.stats?.length;
  const showQuotes = !!content.testimonials?.length;
  if (!showStats && !showQuotes) return null;

  const reviewsEnabled = modules.enabled.includes("reviews");

  return (
    <section
      className="oe-section oe-section--wash oe-social"
      data-section="testimonials" data-section-label="Reviews" id="testimonials"
    >
      <div className="oe-wrap">
        {showStats && (
          <div className="oe-stats">
            {content.stats!.map(s => (
              <div key={s.label} className="oe-stat">
                <div className="oe-stat__v">{s.value}</div>
                <div className="oe-stat__l">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {showQuotes && (
          <>
            <div className="oe-testimonials__head">
              <div>
                <div className="oe-eyebrow">What clients say</div>
                <h2 className="oe-h2">Reviews from real, slightly fluffier dogs.</h2>
              </div>
              {reviewsEnabled && modules.reviewsAverage != null && (
                <div className="oe-reviews-pill">
                  <span className="oe-reviews-pill__dot" />
                  <span className="oe-reviews-pill__stars">{"★".repeat(Math.round(modules.reviewsAverage))}</span>
                  <span><strong>{modules.reviewsAverage}</strong> · {modules.reviewsLiveCount} Google reviews · <strong>live feed</strong></span>
                </div>
              )}
            </div>
            <div className="oe-testimonials">
              {content.testimonials!.map(t => (
                <article key={t.author} className="oe-testimonial">
                  <div className="oe-testimonial__stars">{"★".repeat(t.rating ?? 5)}</div>
                  <blockquote>"{t.body}"</blockquote>
                  <div className="oe-testimonial__author">
                    <div className="oe-testimonial__avatar">{t.author.split(" ").map(s => s[0]).join("")}</div>
                    <div>
                      <div className="oe-testimonial__name">{t.author}</div>
                      {t.meta && <div className="oe-testimonial__meta">{t.meta}</div>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
      <style>{SOCIAL_CSS}</style>
    </section>
  );
};

const SOCIAL_CSS = `
.oe-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
  padding-bottom: 64px; margin-bottom: 64px; border-bottom: 1px solid var(--foundation-pale); }
.oe-stat__v { font-family: var(--font-display); font-size: clamp(2.25rem, 4vw, 3rem);
  font-weight: 700; color: var(--foundation-dark); letter-spacing: -0.025em;
  line-height: 1; margin-bottom: 10px; }
.oe-stat__l { font-size: 14px; color: var(--foundation-slate); }
.oe-testimonials__head { display: flex; justify-content: space-between; align-items: end;
  margin-bottom: 40px; gap: 32px; flex-wrap: wrap; }
.oe-reviews-pill { display: inline-flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid var(--foundation-pale);
  padding: 10px 16px; border-radius: 999px; font-size: 13px; color: var(--foundation-slate); }
.oe-reviews-pill__dot { width: 8px; height: 8px; border-radius: 999px; background: var(--mod-reviews); }
.oe-reviews-pill__stars { color: #b45309; letter-spacing: 1px; }
.oe-reviews-pill strong { color: var(--foundation-dark); font-weight: 700; }
.oe-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.oe-testimonial { background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: var(--preset-radius-md, 12px); padding: 32px;
  box-shadow: var(--preset-shadow-card); display: flex; flex-direction: column; }
.oe-testimonial__stars { color: #b45309; letter-spacing: 1px; font-size: 14px; margin-bottom: 16px; }
.oe-testimonial blockquote { margin: 0 0 24px; font-family: var(--font-display);
  font-size: 1.0625rem; line-height: 1.5; color: var(--foundation-dark);
  font-weight: 500; letter-spacing: -0.005em; flex: 1; }
.oe-testimonial__author { display: flex; align-items: center; gap: 12px; }
.oe-testimonial__avatar { width: 40px; height: 40px; border-radius: 999px;
  background: var(--foundation-pale); display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: var(--foundation-slate); font-size: 13px; }
.oe-testimonial__name { font-size: 14px; font-weight: 600; color: var(--foundation-dark); }
.oe-testimonial__meta { font-size: 13px; color: var(--foundation-mid); }
@media (max-width: 900px) {
  .oe-stats { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .oe-testimonials { grid-template-columns: 1fr; }
}`;
