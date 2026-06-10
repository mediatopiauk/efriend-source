import * as React from "react";

/**
 * Sticky jump-nav. Builds its link list from the DOM after first paint, by
 * walking elements with [data-section] and [data-section-label]. No hardcoded
 * anchor list — sections that didn't render don't appear here.
 */
export const JumpNav: React.FC = () => {
  const [items, setItems] = React.useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section][data-section-label][id]"));
    setItems(els.map(el => ({ id: el.id, label: el.dataset.sectionLabel || el.id })));

    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="oe-jumpnav">
      <div className="oe-wrap-wide oe-jumpnav__inner">
        {items.map(item => (
          <a key={item.id} href={`#${item.id}`} className={active === item.id ? "is-active" : undefined}>
            {item.label}
          </a>
        ))}
      </div>
      <style>{JUMPNAV_CSS}</style>
    </div>
  );
};

const JUMPNAV_CSS = `
.oe-jumpnav {
  position: sticky; top: 72px; z-index: 40;
  background: var(--foundation-white);
  border-bottom: 1px solid var(--foundation-pale);
}
.oe-jumpnav__inner { height: 52px; display: flex; align-items: center; gap: 24px;
  overflow-x: auto; scrollbar-width: none; }
.oe-jumpnav__inner::-webkit-scrollbar { display: none; }
.oe-jumpnav a { color: var(--foundation-mid); text-decoration: none;
  font-size: 13.5px; font-weight: 500; white-space: nowrap;
  padding: 4px 0; border-bottom: 2px solid transparent;
  transition: color 200ms var(--ease-standard), border-color 200ms var(--ease-standard); }
.oe-jumpnav a:hover { color: var(--foundation-dark); }
.oe-jumpnav a.is-active { color: var(--foundation-dark); border-bottom-color: var(--site-primary); }`;
