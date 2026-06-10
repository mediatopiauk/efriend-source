# Modal, Drawer & Internal Page Architecture — Claude Design Brief

**Date:** 12 May 2026
**Status:** Companion to lens briefs. Defines drill-down architecture for the 9 lenses.

---

## 1. Architectural decision (locked)

UXMC sites are **single-page-default**. 9 lenses = landing-page shapes. Drill-down via modals/drawers, not routed pages. Single-page output is the locked default per `PROJECT_AUDIT_2026-04-30-rev4.md` Section 10 #5. Industry-standard: ASOS, Gymshark, Uniqlo, Stripe, Klarna, Shopify Buy SDK.

## 2. Four interaction patterns

- **A — Jump-anchor.** Top-nav/mega-menu → smooth-scroll, URL hash. All 9 lenses.
- **B — Modal (centred overlay).** Single-item detail, forms, FAQ expansion, lightbox. ESC/backdrop/close button dismiss. Mobile = 90vh bottom sheet.
- **C — Drawer (side panel).** Persistent state (cart), multi-step flows (booking, quote, checkout). Right-slide desktop, bottom-slide mobile. Can minimise to corner pill.
- **D — Routed page (exception).** When real URL required for SEO, sharing, compliance.

## 3. Three internal page templates

- **Template A — Item Detail.** Hero + facts strip + body + spec + grid + related + sticky CTA. URLs: `/listings/{slug}`, `/products/{slug}`, `/case-studies/{slug}`. Used by Lens 9 (estate-agent SEO), opt-in by Lens 6 / 8.
- **Template B — Area / Category Landing.** Local headline + intro + filtered grid + map + CTA. URLs: `/{area-or-category-slug}`. Used by Lens 9 area pages, Lens 6 category pages.
- **Template C — Long-Form.** Single-column 720px max + TOC + metadata + sidebar CTA. URLs: `/blog/{slug}`, `/policies/{slug}`, `/news/{slug}`. Any lens.

## 4. Lens 9 exception

Estate agents/recruitment/business-listings need unique URLs per listing for Google ranking, link sharing, backlinks. **For Lens 9 ONLY in v1:** property cards → Template A (routed). Area mega-menu → Template B (routed). Everything else stays modal/drawer. Same templates serve other listing verticals (recruitment, vehicles, holiday lets) when they ship.

## 5. Shop checkout v1 vs v2

- **v1 (current):** Stripe Payment Link off-site checkout. Ships in days. Customer briefly leaves to Stripe, returns.
- **v2 (future):** Stripe Elements embedded in multi-step modal drawer. Cart → Address → Payment → Confirm, browser-back navigates steps.
- **Design implication:** bag drawer (Pattern C) must hint at forward step ("Continue to checkout →") and have headroom to expand to full-screen modal. **DO NOT design v2 flow now.**

## 6. Mega-menu behaviour per lens

| Lens | Mega-menu does |
|---|---|
| 1,2,3,4,5,7,8 | Jump-anchors to homepage sections (mostly decorative + structural feel) |
| 6 (Shop) | Filters product grid in-page; sub-categories drill further; featured product → product modal |
| 9 (Directory) | Real routed nav to Template A/B pages |

Shell stays consistent; behaviour varies per click target.

## 7. Deliverables (this brief)

1. **Modal system spec** — shell + S/M/L/XL sizes (480/720/960/1140px) + mobile bottom-sheet reflow + backdrop + animation timing + ESC/backdrop/close
2. **Drawer system spec** — right-slide desktop / bottom-slide mobile + S/M/L sizes (360/480/640px) + persistent vs minimised + header/body/foot + focus management
3. **Three internal page templates** as full desktop comps:
   - A: Hartcliffe & Crew property listing (proves Lens 9 inheritance)
   - B: Bristol-area landing page (Hartcliffe & Crew)
   - C: Long-form blog — Severn Cut "17 years" story in **Lens 1 Editorial Foundation** chrome (lens-agnostic baseline)
   - Bonus: supplementary C view in Lens 9 chrome
4. **Drill-down mapping per lens** — table of what-opens-what:
   - L1: service "Learn more" → Modal M
   - L2: portfolio tile → Modal L (lightbox)
   - L3: marketing tile → Modal M (feature)
   - L4: portfolio item → Modal L
   - L5: testimonial → Modal S; FAQ → inline accordion
   - L6: product → Modal L (quick-view); Add to bag → Drawer M (cart)
   - L7: menu item → Modal M (allergens); Reserve → Drawer L (multi-step booking)
   - L8: past project → Modal XL OR Template A if SEO-worthy
   - L9: property card → **Template A routed** (exception)
5. **Mega-menu interaction spec** — one visual + behaviour table (see §6)

## 8. NOT in scope

- Full multi-step Stripe Elements checkout (v2)
- Account/login/register modals (Phase 2)
- Per-lens modal redesigns (shell is shared)
- Animation choreography beyond timing
- Mobile gesture details
- JS framework choice (Claude Code decides)

## 9. Acceptance criteria

1. Modal system spec — shell + sizes + reflow
2. Drawer system spec — slide-in + sizes + persistent + reflow
3. 3 internal templates as full desktop comps with Hartcliffe & Crew (A,B) + any fixture (C)
4. Drill-down mapping documented
5. Mega-menu behaviour documented
6. Bag drawer v2-ready (expands to multi-step without redesign)
7. Template A proves inherit-from-lens (brand colour, type, footer, Grow dock)
8. WCAG AA on focus management, ESC, focus traps

## 10. Why it matters

Lenses give visual range. This brief makes single-page architecture buildable. Without it, every detail click hits "load a new page" — breaks the single-page promise, multiplies design surface 3-4×. With it: modals for detail, drawers for state/flows, 3 templates for SEO exceptions, Lens 9 exception clearly scoped. Coherent, buildable, manageable.

---

**Output target:** ~5-8 design artefacts (2 system specs + 3 internal templates + 2 spec tables) in one Claude Design session. Phase A complete after this. Claude Code implementation begins per 12-day HANDOFF.md.
