import * as React from "react";
import type { ContentData } from "../types";

interface Props { posts?: ContentData["socialPosts"] }

/** Grow inline · Social module attach point. Renders only when ≥3 posts. */
export const LatestPosts: React.FC<Props> = ({ posts }) => {
  if (!posts || posts.length < 3) return null;

  return (
    <section
      className="oe-section oe-section--wash oe-posts"
      data-section="latest" data-section-label="Latest" id="latest"
    >
      <div className="oe-wrap">
        <div className="oe-posts__head">
          <div>
            <div className="oe-eyebrow">Latest from us</div>
            <h2 className="oe-h2" style={{ fontSize: "2rem" }}>Auto-pulled from our feeds</h2>
          </div>
          <a href="#" className="oe-btn-arrow">Follow us →</a>
        </div>
        <div className="oe-posts__grid">
          {posts.slice(0, 3).map((p, i) => (
            <article key={i} className="oe-post">
              <div className={`oe-post__img is-${i}`}>
                {p.imageUrl ? <img src={p.imageUrl} alt="" /> : <span>Post image · 4:3</span>}
              </div>
              <div className="oe-post__body">
                <div className="oe-post__meta">
                  <span className="oe-post__platform"><span className="oe-post__dot" />{p.platform}</span>
                  <span>{p.ago}</span>
                </div>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{POSTS_CSS}</style>
    </section>
  );
};

const POSTS_CSS = `
.oe-posts__head { display: flex; justify-content: space-between; align-items: end;
  margin-bottom: 40px; flex-wrap: wrap; gap: 24px; }
.oe-posts__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.oe-post { background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: var(--preset-radius-md, 12px); overflow: hidden;
  display: flex; flex-direction: column; }
.oe-post__img { aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; }
.oe-post__img img { width: 100%; height: 100%; object-fit: cover; }
.oe-post__img.is-0 { background: linear-gradient(135deg, #cffafe 0%, #67e8f9 100%); color: #155e75; }
.oe-post__img.is-1 { background: linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%); color: #831843; }
.oe-post__img.is-2 { background: linear-gradient(135deg, #ddd6fe 0%, #a78bfa 100%); color: #4c1d95; }
.oe-post__body { padding: 20px 22px; }
.oe-post__meta { display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px; font-size: 12px; color: var(--foundation-mid); }
.oe-post__platform { display: inline-flex; align-items: center; gap: 6px;
  color: var(--mod-social); font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; font-size: 11px; }
.oe-post__dot { width: 6px; height: 6px; border-radius: 999px; background: var(--mod-social); }
.oe-post p { margin: 0; font-size: 14.5px; color: var(--foundation-slate); line-height: 1.5; }
@media (max-width: 900px) { .oe-posts__grid { grid-template-columns: 1fr; } }`;
