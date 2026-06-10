# Handoff: Hero Modals — Fully Loaded

**Phase:** A → B (Claude Design → Claude Code)
**Source design:** `modal-loaded-showcase.html`
**Companion brief:** `MODAL_DRAWER_BRIEF.md`
**Date packaged:** May 2026

---

## Overview

This bundle contains the **fully-loaded hero state** of the UXMC modal system — every modal pattern the 9-lens output engine drills into, populated with realistic, production-grade content rather than placeholder stubs.

The plain shell + size grid (S / M / L / XL) lives in `modal-demo.html`. This showcase takes the same shell and shows what each modal looks like **with the full feature set Claude Code will need to wire** for per-lens drill-down.

## About the design files

The HTML in this bundle is a **design reference**, not production code. Recreate the patterns in the UXMC SaaS codebase using whatever component primitives are already established (React + the existing design tokens). Do not lift the HTML/CSS wholesale — port the structure, sizes, content, and behaviour into the codebase's component patterns.

## Fidelity

**High-fidelity.** Final type, colour, spacing, hierarchy, copy, and interaction affordances are locked. Lift exact values from the file.

---

## The 10 hero modals (per lens)

Each card in the showcase opens one fully-loaded modal. The lens chip in the modal header tells Claude Code where it attaches.

| # | Modal | Size | Lens | Triggered by | Notable features |
|---|---|---|---|---|---|
| 1 | **Quick view (product)** | L | 6 · Shop | Product card click | Gallery + variant picker + size + qty + Add to bag + reviews summary + delivery + Q&A · *paired with bag drawer* |
| 2 | **Case study** | XL | 8 · Quote / Custom Build | Past-project tile | Hero image + facts strip + body + before/after slider + mini-gallery + outcome + related cases + sticky CTA |
| 3 | **Menu detail (allergens)** | M | 7 · Menu & Reservations | Menu item click | Dish photo + ingredient list + allergen matrix + pairing suggestion + add to order |
| 4 | **Property preview** | M | 9 · Directory | Property card hover-peek | Carousel + key facts + agent contact + "Open full listing" → Template A routed page |
| 5 | **Service detail** | M | 1 · Editorial Foundation | "Learn more" on service card | Hero image + body + inclusions + price-from + book CTA |
| 6 | **Feature spotlight** | L | 3 · Marketing Tiles | Feature tile click | Headline + diagram + 3-up benefits + comparison table + CTA |
| 7 | **Customer review (full)** | M | 5 · Local Authority | Testimonial click | Photo + full text + verification badge + before/after + reviewer profile · *prev/next 42 reviews* |
| 8 | **Enquiry form (Get in touch)** | M | All | Top-nav / CTA bar | Name / email / phone / message + privacy consent + spam-honeypot affordance |
| 9 | **FAQ deep-link** | S | All | FAQ accordion "open in modal" | Single Q&A + related questions + contact-us fallback |
| 10 | **Lightbox (gallery)** | L | 2 · Showcase Grid | Portfolio tile | Full-bleed image + caption + prev/next + thumbnail strip |

---

## Modal shell (all sizes)

| Size | Max width | Use for |
|---|---|---|
| S | 480 px | Single fact, FAQ, confirmation |
| M | 720 px | Form, item detail, review |
| L | 960 px | Quick view, feature, lightbox |
| XL | 1140 px | Case study, multi-column detail |

**Reflow rule:** below 720 px viewport every size collapses to a **90 vh bottom sheet**, drag-handle visible, body scrolls inside.

### Shell structure

```
.m-backdrop                         (rgba(20,17,13,0.55), click to dismiss)
  .m.is-{s|m|l|xl}                  (white panel, radius 14, shadow var(--m-shadow))
    .m-head                         (sticky, border-bottom)
      .ttl-left                     (lens chip + h2)
      .m-head-actions               (kbd hint + icon buttons + close ✕)
    .m-body                         (scroll region, padding 24-32)
    .m-foot                         (optional sticky CTA bar)
```

### Animation

- **In:** `240ms cubic-bezier(0.16, 1, 0.3, 1)` — backdrop fade + panel scale 0.96 → 1 + translateY 8 → 0
- **Out:** `180ms cubic-bezier(0.4, 0, 1, 1)` — reverse

### Dismissal

- ESC key
- Backdrop click
- Close button (✕) top-right
- Browser back (push state on open)

### Focus management

- On open: focus moves to first focusable inside `.m-body` (skip the close button by default).
- Focus trap inside `.m` while open.
- On close: focus returns to the triggering element.

---

## Design tokens (lifted from the file)

```css
--m-bg:        #ffffff;
--m-text:      #14110d;
--m-mute:      #6b6256;
--m-line:      #e8e3da;
--m-radius:    14px;
--m-shadow:    0 28px 72px -16px rgba(20,17,13,0.32),
               0 8px 24px -8px rgba(20,17,13,0.14);
--m-backdrop:  rgba(20,17,13,0.55);
--m-anim-in:   240ms cubic-bezier(0.16, 1, 0.3, 1);
--m-anim-out:  180ms cubic-bezier(0.4, 0, 1, 1);
```

The modal shell intentionally does **not** consume brand tokens — it stays neutral so it inherits cleanly into any of the 6 visual presets. Per-lens content inside the modal *does* consume brand tokens (`--brand-primary`, fonts, etc.) from the host page.

---

## Drill-down mapping (recap)

This is the table that drives which modal pattern each lens uses. Full version in `MODAL_DRAWER_BRIEF.md` §7.

| Lens | Click target | Pattern |
|---|---|---|
| 1 Editorial | Service "Learn more" | Modal M |
| 2 Showcase Grid | Portfolio tile | Modal L (lightbox) |
| 3 Marketing Tiles | Tile | Modal M (feature) |
| 4 Creative Immersive | Portfolio item | Modal L |
| 5 Local Authority | Testimonial / FAQ | Modal S / inline accordion |
| 6 Shop | Product / Add to bag | Modal L / **Drawer M** |
| 7 Menu | Menu item / Reserve | Modal M / **Drawer L** |
| 8 Quote | Past project | Modal XL **or** Template A (if SEO-worthy) |
| 9 Directory | Property card | **Template A routed** (exception) |

Drawer specs are out of scope for this bundle — see `MODAL_DRAWER_BRIEF.md` §3 & the main handoff for those.

---

## Files

```
design_handoff_hero_modals/
├── README.md                      ← you are here
├── MODAL_DRAWER_BRIEF.md          ← architectural brief (modals + drawers + routed templates)
├── modal-demo.html                ← plain shell, S/M/L/XL size grid (start here for chrome)
└── modal-loaded-showcase.html     ← 10 hero modals fully populated (the deliverable)
```

Open both HTML files in a browser. Click any card in the showcase to expand the modal full-screen.

## Out of scope

- Drawer patterns (cart, multi-step booking) — separate handoff
- Routed Templates A / B / C — separate handoff
- Mobile bottom-sheet gesture detail (drag-to-dismiss physics)
- Animation choreography beyond the in/out timing above
- JS framework choice — Claude Code's call

## Acceptance criteria

1. Every modal in the showcase recreated in the codebase with the same content density and feature set.
2. All 4 sizes implemented, reflowing to bottom-sheet below 720 px.
3. ESC / backdrop / close / browser-back all dismiss.
4. Focus trap + return-focus working; WCAG AA on all text/background pairs.
5. Modal shell stays preset-neutral; content inside inherits the active preset.
6. Open/close animations match the timing tokens above.
