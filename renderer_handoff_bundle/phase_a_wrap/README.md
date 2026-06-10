# Handoff: Phase A wrap-up · drawers + internal templates + drill-down + mega-menu

**Phase:** A · the last design session before Claude Code implementation begins
**Date packaged:** May 2026
**Companion bundles (already shipped):** `design_handoff_output_engine_master_template/` (modal system + 9 lenses + Grow dock + presets) · `design_handoff_hero_modals/` (modal-loaded showcase)

This bundle closes the four remaining items from `MODAL_DRAWER_BRIEF.md`:

- **A** · Drawer system (`system/drawer/`)
- **B** · Three internal page templates + bonus (`templates/`)
- **C** · Drill-down mapping (`DRILL_DOWN_MAPPING.md`)
- **D** · Mega-menu spec + behaviour map (`system/mega-menu/`)

After this, the renderer has no architectural decisions left to make. The brain (lens) decides the shape · modals / drawers / templates / mega-menus are the locked drill-down vocabulary · wizard data fills the slots.

---

## About these files

Every HTML file in this bundle is a **design reference**, not production code. The task in Phase B is to **recreate these designs in the UXMC SaaS codebase** using its existing component patterns, design tokens, and routing — not to lift the HTML wholesale.

## Fidelity

**High-fidelity.** Final type, colour, spacing, hierarchy, copy, animation timing, and interaction affordances are locked. Lift exact values from the files. Variations across the 6 visual-style presets are handled by token swap, not redesign.

---

## File map

```
design_handoff_phase_a_wrap/
├── README.md                                     ← you are here
├── DRILL_DOWN_MAPPING.md                         ← Deliverable C · 9 lenses × every interactive element
│
├── system/
│   ├── drawer/                                   ← Deliverable A · Drawer system
│   │   ├── drawer-demo.html                          shell + S/M/L sizes (empty)
│   │   └── drawer-loaded-showcase.html               3 hero drawers (bag · reservation · mobile nav)
│   │
│   └── mega-menu/                                ← Deliverable D · Mega-menu
│       ├── mega-menu-spec.html                       3 variants (jump · filter · routed)
│       └── MEGA_MENU.md                              tokens · keyboard · per-lens behaviour map
│
└── templates/                                    ← Deliverable B · Three internal templates
    ├── template-A-item-detail.html                   Hartcliffe property · Lens 9 chrome · /listings/{slug}
    ├── template-B-area-landing.html                  Clifton · Lens 9 chrome · /clifton
    ├── template-C-long-form.html                     Severn Cut blog · Lens 1 chrome (lens-agnostic baseline)
    └── template-C-long-form-lens9.html               Same Template C in Lens 9 chrome (proves inheritance)
```

Open every `.html` file directly in a browser.

---

## Deliverable A · Drawer system

Mirrors the modal system one-for-one. Three sizes, two interaction modes, same accessibility contract.

### Sizes

| Size | Width | Use for |
|---|---|---|
| **S** | 360 px | Mobile nav · filter strip · single-action confirmation |
| **M** | 480 px | Bag · cart · single-step form · enquiry |
| **L** | 640 px | Multi-step booking · reservation · quote builder · v2 checkout |

Below 720 px viewport every size collapses to a **90 vh bottom sheet** with drag handle. Body still scrolls.

### Tokens

```css
--d-width-s:   360px;
--d-width-m:   480px;
--d-width-l:   640px;
--d-shadow:    -28px 0 72px -16px rgba(20,17,13,0.32),
               -8px  0 24px  -8px rgba(20,17,13,0.14);
--d-backdrop:  rgba(20,17,13,0.55);
--d-anim-in:   280ms cubic-bezier(0.16, 1, 0.3, 1);
--d-anim-out:  200ms cubic-bezier(0.4, 0, 1, 1);
```

### Interaction modes

| Mode | Used by | Backdrop | Minimise to pill |
|---|---|---|---|
| **Persistent** | Bag drawer (Lens 6) | Translucent · click closes | ✓ Corner pill, state retained |
| **Modal-in-flow** | Reservation (Lens 7) · quote builder (Lens 8 v2) · mobile nav | Opaque · click prompts on unsaved | ✗ Cancel only |

### The three hero drawers

1. **Bag drawer · Lens 6 · M · persistent.** Three line items with variant + qty + price · subtotal · promo · delivery line · "Continue to checkout →". **Headroom in the header for v2 multi-step expansion** — a 4-dot progress preview (Bag · Address · Payment · Confirm) is visible even though only the Bag step is active. Minimises to a corner pill.
2. **Reservation drawer · Lens 7 · L · modal-in-flow · step 2 of 3.** Stepper visible at top. Confirm-details panel. Table preference grid. Dietary chips. Free-text note. Cancellation policy footnote. "Back / Continue" foot.
3. **Mobile nav drawer · any lens · S · left-slide.** Hartcliffe & Crew fixture. Primary nav (6 items) with active state · popular areas · "Book a valuation" CTA card · Sign in + Get in touch.

---

## Deliverable B · Three internal page templates

Each template inherits from a host lens — same component code, host lens's brand tokens.

### Template A · Item Detail (`/listings/{slug}`)

Hartcliffe property listing in Lens 9 chrome. Hero gallery + facts strip + body + features + spec table + EPC band + floorplan + neighbourhood map + similar listings + sticky mobile CTA. **Proves the inherit-from-lens contract:** Template A code is identical across lenses; tokens come from the host.

| Used by lens | When |
|---|---|
| **9 (Directory)** | Default — every property card opens this routed page |
| **6 (Shop)** | Opt-in — for SEO-worthy SKUs |
| **8 (Quote / Custom Build)** | Opt-in — when a past project deserves a sharable URL |

### Template B · Area / Category Landing (`/{slug}`)

"Properties in Clifton" in Lens 9 chrome. Area hero + filter strip + intro + filtered grid + neighbourhood write-up + area stats + CTA. The mega-menu in Lens 9 routes to this template.

| Used by lens | When |
|---|---|
| **9 (Directory)** | Every area page (/clifton, /redcliffe, …) |
| **6 (Shop)** | Optional — for SEO category pages (e.g. /shop/wagyu) |

### Template C · Long-Form (`/blog/{slug}` · `/policies/{slug}` · `/news/{slug}`)

Severn Cut "17 years of sharpening Bristol's knives" in **Lens 1 Editorial Foundation** chrome (the lens-agnostic baseline). Single-column 720 px max · sticky TOC · reading-progress bar · author panel · sidebar CTA · related strip.

**Bonus:** the same template re-rendered in Lens 9 chrome (`template-C-long-form-lens9.html`) with a Hartcliffe area-guide piece. Same component code, different host. Proves Template C is genuinely lens-agnostic.

| Used by lens | When |
|---|---|
| **Any lens** | Blog posts · case studies · policies · news |

---

## Deliverable C · Drill-down mapping

`DRILL_DOWN_MAPPING.md` — one section per lens. 8–17 rows each covering **every interactive element** on the landing page (not just the headline drill-downs), each mapped to one of:

- **A** Jump-anchor
- **B** Modal (S/M/L/XL)
- **C** Drawer (S/M/L · persistent or modal-in-flow)
- **D** Routed page (Template A / B / C)
- **E** In-page state change

Every row has a reference back to the specific section in the modal showcase / drawer showcase / template that implements that pattern.

A final **Open questions** section flags 7 generic patterns referenced by lens elements that haven't been designed yet (generic info modal · search drawer · login modal · order-tracking · quote-builder v2 · email-alerts opt-in · reviews-feed). None block the 12-day roadmap — they're scoped Phase B+ work.

---

## Deliverable D · Mega-menu

`mega-menu-spec.html` shows one visual component in three behaviours:

| Variant | Click does | Lenses |
|---|---|---|
| 1 · Jump-anchor | Smooth-scrolls to `#section` · URL hash updates | 1, 2, 3, 4, 5, 7, 8 |
| 2 · In-page filter | Filters grid in place · `?cat=…` query param · mega stays open | 6 |
| 3 · Routed nav | Browser nav to Template A or B | 9 |

`MEGA_MENU.md` documents shared tokens (reuse modal `--m-anim-*`), keyboard nav, mobile reflow into the nav drawer, accessibility contract, and the per-lens behaviour map.

---

## Cross-cutting rules

- **Shell stays preset-neutral · content inside inherits brand tokens.** Same rule for modals, drawers, mega-menu shell. The reservation drawer in this bundle uses Forge & Crown brand tokens inside; the bag drawer uses Beardmore tokens inside; the shell chrome is identical.
- **Animation timing is shared across the three systems.** Modal in 240 ms, modal out 180 ms. Drawer in 280 ms, drawer out 200 ms. Mega-menu reuses modal timing. Don't proliferate timings.
- **Backdrop and focus contracts are identical.** ESC · backdrop · close button · browser-back all dismiss. Focus moves into the body on open, returns to trigger on close, traps inside while open. WCAG AA contrast throughout.
- **UK English** in all dummy content.

---

## What's locked vs what's still open

**Locked** (do not redesign):
- Modal system (10 hero modals · 4 sizes · animation · focus)
- Drawer system (3 hero drawers · 3 sizes · 2 interaction modes)
- All 9 lens landing pages
- Three internal templates (A · B · C)
- Mega-menu shell + three behaviours
- Token swap → preset = visual change, structure unchanged

**Open** (Phase B / B+, scoped not designed):
- Generic info modal (S) variant
- Search drawer (S)
- Login / register modal (S) — Phase 2
- Order-tracking modal (M) — Phase 2
- Quote-builder drawer (L) — v2
- Email-alerts opt-in modal (M)
- Reviews-feed modal (L) — or routed Template B

---

## Acceptance criteria (Phase A wrap-up)

1. ✅ Drawer system has shell spec (`drawer-demo.html`) + loaded showcase (`drawer-loaded-showcase.html`) with 3 hero drawers at the same density as the modal showcase.
2. ✅ Bag drawer leaves clear headroom for v2 multi-step expansion (progress preview visible, brass v2 watermark).
3. ✅ All three internal templates inherit visibly from their host lens — Templates A + B from Lens 9, Template C from Lens 1 with bonus Lens 9 render.
4. ✅ Drill-down mapping covers every interactive element on every lens with explicit references to the modal/drawer showcase or templates.
5. ✅ Mega-menu spec shows one visual component with three behaviours, mapped per lens.
6. ✅ WCAG AA throughout; focus management documented for every interactive surface.
7. ✅ **Phase A is complete after this session** — Claude Code's 12-day implementation roadmap can start.

---

## How to read this bundle (suggested order)

1. **`DRILL_DOWN_MAPPING.md`** — the index. Read this first to understand what triggers what.
2. **`system/drawer/drawer-demo.html`** — empty shells. Learn the chrome.
3. **`system/drawer/drawer-loaded-showcase.html`** — hero drawers. Match the density.
4. **`system/mega-menu/mega-menu-spec.html`** + **`MEGA_MENU.md`** — three behaviours, one shell.
5. **`templates/template-A-item-detail.html`** — the most-built template (Lens 9 default).
6. **`templates/template-B-area-landing.html`** — the second-most-built (Lens 9 area pages).
7. **`templates/template-C-long-form.html`** + the bonus L9 version — the lens-agnostic baseline.

Companion shipped-already bundles:

- `design_handoff_output_engine_master_template/` — the foundation (modal system, all 9 lenses, Grow dock, presets, tokens)
- `design_handoff_hero_modals/` — the 10 hero modals fully loaded
