import * as React from "react";

interface Props { message?: string; emailModuleEnabled: boolean; onSubmit?: (email: string) => void }

/**
 * §11 · Brand-coloured strip with newsletter capture (Email module).
 * When the Email module is disabled, falls back to a generic "Get in touch" CTA.
 */
export const CTABar: React.FC<Props> = ({ message, emailModuleEnabled, onSubmit }) => {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  return (
    <section
      className="oe-cta-bar"
      data-section="cta-bar" data-section-label=""
    >
      <div className="oe-wrap oe-cta-bar__inner">
        <p>{message || "Stay in touch."}</p>
        {emailModuleEnabled ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit?.(email);
              setDone(true);
            }}
          >
            <input
              type="email" required
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="oe-btn oe-btn--on-dark">{done ? "Subscribed ✓" : "Subscribe"}</button>
          </form>
        ) : (
          <a href="#contact" className="oe-btn oe-btn--on-dark">Get in touch</a>
        )}
      </div>
      <style>{CTA_BAR_CSS}</style>
    </section>
  );
};

const CTA_BAR_CSS = `
.oe-cta-bar { background: var(--site-primary); color: #fff; padding: 28px 0; }
.oe-cta-bar__inner { display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap; }
.oe-cta-bar p { margin: 0; color: #fff; font-family: var(--font-display);
  font-size: 1.125rem; font-weight: 600; letter-spacing: -0.005em; max-width: none; }
.oe-cta-bar form { display: flex; gap: 8px; align-items: center; }
.oe-cta-bar input { background: rgba(255,255,255,0.95); border: 0; padding: 12px 16px;
  border-radius: var(--preset-radius-sm, 8px); font-family: inherit; font-size: 14.5px;
  color: var(--foundation-dark); width: 280px; }
.oe-cta-bar input::placeholder { color: var(--foundation-mid); }
@media (max-width: 900px) {
  .oe-cta-bar__inner { flex-direction: column; align-items: stretch; }
  .oe-cta-bar input { width: 100%; }
}`;
