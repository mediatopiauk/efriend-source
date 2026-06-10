import * as React from "react";
import type { ContentData, ConnectionsData } from "../types";

interface Props { content: ContentData; connections: ConnectionsData }

/** §7 · About — always renders if a story is present. */
export const AboutSection: React.FC<Props> = ({ content }) => {
  if (!content.aboutStory && !content.aboutHeadline) return null;

  return (
    <section
      className="oe-section oe-about"
      data-section="about" data-section-label="About us" id="about"
    >
      <div className="oe-wrap oe-about__grid">
        <div className="oe-about__media">
          <div className="oe-about__img">
            {content.aboutImage ? (
              <img src={content.aboutImage} alt="About" />
            ) : (
              <span>About image · 4:5 · placehold.co</span>
            )}
          </div>
        </div>
        <div>
          {content.aboutEyebrow && <div className="oe-eyebrow">{content.aboutEyebrow}</div>}
          {content.aboutHeadline && <h2 className="oe-h2">{content.aboutHeadline}</h2>}
          {content.aboutStory && <p className="oe-lede" style={{ margin: "16px 0 16px" }}>{content.aboutStory}</p>}
          {content.aboutBody && <p>{content.aboutBody}</p>}
          <a href="#contact" className="oe-btn-arrow">Visit us at the studio →</a>
          {content.aboutMeta && content.aboutMeta.length > 0 && (
            <div className="oe-about__meta">
              {content.aboutMeta.map(m => (
                <div key={m.label}>
                  <span className="oe-about__v">{m.value}</span>
                  <span className="oe-about__l">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{ABOUT_CSS}</style>
    </section>
  );
};

const ABOUT_CSS = `
.oe-about__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: center; }
.oe-about__img { aspect-ratio: 4/5; border-radius: var(--preset-radius-lg, 20px);
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600;
  box-shadow: var(--preset-shadow-lift); position: relative; overflow: hidden; }
.oe-about__img img { width: 100%; height: 100%; object-fit: cover; }
.oe-about__img::after { content: ''; position: absolute; bottom: -24px; right: -24px;
  width: 160px; height: 160px; background: var(--site-primary);
  border-radius: var(--preset-radius-md, 12px); z-index: -1; }
.oe-about__meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  margin-top: 36px; padding-top: 32px; border-top: 1px solid var(--foundation-pale); }
.oe-about__v { font-family: var(--font-display); font-size: 24px; font-weight: 700;
  color: var(--foundation-dark); letter-spacing: -0.02em; display: block; margin-bottom: 4px; }
.oe-about__l { color: var(--foundation-mid); font-size: 13px; }
@media (max-width: 900px) {
  .oe-about__grid { grid-template-columns: 1fr; gap: 40px; }
  .oe-about__img { aspect-ratio: 4/3; }
}`;
