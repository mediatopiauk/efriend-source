# UXMC Output Engine — Claude Code handoff bundle

**Date:** May 2026 · updated with Lenses 7–9 + modal system
**Purpose:** Phase A → Phase B handoff. This bundle contains every Phase A design asset Claude Code needs to wire the **9-lens output engine** + Grow dock + typography mood library + **modal/drawer system** into the UXMC SaaS.
**Owner:** Duncan
**Phase A designer:** Claude Design
**Phase B implementer:** Claude Code

---

## What's in this bundle

```
design_handoff_output_engine_master_template/
├── HANDOFF.md                          ← you are here
├── README.md                           ← original architecture doc
│
├── Master Template - Brightside.html   ← LENS 1 · Editorial Foundation (Brightside fixture)
│
├── lenses/
│   ├── LENS_GALLERY.html               ← Step 6 gallery (live iframes of all 6 lenses)
│   ├── LENS_GALLERY.md                 ← gallery contract + architecture
│   │
│   ├── 02_showcase_grid/               ← LENS 2 · Showcase Grid
│   │   ├── desktop-comp.html
│   │   ├── section-spec.md
│   │   ├── gap-analysis-rules.md
│   │   └── lens-summary.md
│   │
│   ├── 03_marketing_tiles/             ← LENS 3 · Marketing Tiles
│   │   └── (same 4 files)
│   ├── 04_creative_immersive/          ← LENS 4 · Creative Immersive
│   │   └── (same 4 files)
│   ├── 05_local_authority/             ← LENS 5 · Local Authority
│   │   └── (same 4 files)
│   ├── 06_shop/                        ← LENS 6 · Shop (Beardmore & Sons fixture)
│   │   ├── desktop-comp.html
│   │   ├── section-spec.md
│   │   ├── gap-analysis-rules.md
│   │   ├── lens-summary.md
│   │   └── PHASE_A_NOTES.md
│   ├── 07_menu_reservations/           ← LENS 7 · Menu & Reservations (Forge & Crown fixture)
│   │   └── (desktop-comp.html + 3 specs)
│   ├── 08_quote_custom_build/          ← LENS 8 · Quote / Custom Build (Severn Cut fixture)
│   │   └── (desktop-comp.html + 3 specs)
│   ├── 09_directory_listings/          ← LENS 9 · Directory / Listings (Hartcliffe & Crew fixture)
│   │   └── (desktop-comp.html + 3 specs)
│   │
│   └── _shared/
│       └── tokens.css                  ← shared CSS variables (foundation + brand + module colours)
│
├── system/                             ← cross-lens system specs
│   ├── MODAL_DRAWER_BRIEF.md           ← full modal + drawer system brief
│   └── modal/
│       ├── modal-demo.html             ← interactive shell spec (S/M/L/XL + lens-token swap)
│       └── modal-loaded-showcase.html  ← hero modals fully loaded (product quick-view, case study)
│
├── presets/                            ← 6 typography mood CSS files
│   ├── classic.css
│   ├── modern.css
│   ├── corporate.css
│   ├── playful.css
│   ├── bold.css
│   └── minimal.css
├── colors_and_type.css                 ← master design token sheet
│
├── TYPOGRAPHY_MOOD_LIBRARY_BRIEF.md    ← brief for the mood library
├── GROW_DOCK_BRIEF.md                  ← brief for Sarah/Max/Booking/Reviews dock
├── LENS_7_MENU_RESERVATIONS_BRIEF.md   ← Lens 7 design brief
├── LENS_8_QUOTE_CUSTOM_BUILD_BRIEF.md  ← Lens 8 design brief
├── LENS_9_DIRECTORY_LISTINGS_BRIEF.md  ← Lens 9 design brief
│
└── src/components/output-engine/       ← React component skeletons (TypeScript, scaffolding only)
    ├── MasterTemplate.tsx
    ├── README.md
    ├── index.ts
    ├── types.ts
    ├── fixtures/
    ├── sections/
    ├── styles/
    └── widgets/
```

---

## Phase B integration order (recommended)

### 1. Design tokens layer (½ day)
- Port `lenses/_shared/tokens.css` + `colors_and_type.css` into the live SaaS as the canonical token sheet.
- Wire `--site-primary` / `--site-cta` to read from `WizardData.brand`.
- Verify every existing UXMC component reads tokens — no hardcoded colours.

### 2. Typography mood library (1 day)
- Drop the 6 `presets/*.css` files into the SaaS as `mood/*.css`.
- Wizard captures `wizardData.mood` (slug). Renderer applies via `<link>` swap or class on `<html>`.
- See `TYPOGRAPHY_MOOD_LIBRARY_BRIEF.md` for full implementation contract.

### 3. Lens skeleton wiring (1 day)
- Use `src/components/output-engine/` as the React scaffolding.
- Build one `<LensN>` component per lens, each loads its tokens + maps `WizardData` to slots per the lens's `section-spec.md`.
- Renderer reads `wizardData.lens` slug and mounts the right component.

### 4. Lens 1–5 implementation (5 days, 1 day each)
- Reference: `Master Template - Brightside.html` (Lens 1) and `lenses/0N_*/desktop-comp.html` (Lenses 2–5).
- Each lens's `section-spec.md` has the WizardData field → slot mapping.
- Each lens's `gap-analysis-rules.md` defines what shows up in the Step 6 gap-analysis panel.

### 5. Lens 6–9 implementation (Shop + Hospitality + Quote + Directory — 5 days)

**5a. Lens 6 (Shop) — 2 days, most complex**
- Most work because of new wizard fields + Stripe wiring.
- See `lenses/06_shop/PHASE_A_NOTES.md` for the full implementation TODO list, including:
  - New `WizardData` fields (product: `salePrice`, `featured`, `badge`, `buyMode`, `stripePaymentLinkUrl`, `tradePricing`; project: `wholesaleEnabled`, `featuredCollection`, `shopTrust`, `shopPayments`, `shopFaqs`, `newsletter.incentive`)
  - Stripe Payment Link + webhook flow (writes CRM + Invoicing)
  - Enquire form modal → CRM lead
  - Wholesale band state machine (v1: anonymous form only; Phase 2: full auth tiers)
  - Filter + sort + pagination via URL params

**5b. Lens 7 (Menu & Reservations) — 1 day**
- Reference: `lenses/07_menu_reservations/desktop-comp.html` + `LENS_7_MENU_RESERVATIONS_BRIEF.md`.
- New wizard fields: menu sections (starters/mains/etc), opening hours, booking provider URL, allergen notes.
- Booking module integration (existing).

**5c. Lens 8 (Quote / Custom Build) — 1 day**
- Reference: `lenses/08_quote_custom_build/desktop-comp.html` + `LENS_8_QUOTE_CUSTOM_BUILD_BRIEF.md`.
- New wizard fields: process steps, materials/finishes gallery, past projects, quote-form with file upload.
- Enquiry form → CRM lead (existing).

**5d. Lens 9 (Directory / Listings) — 1 day**
- Reference: `lenses/09_directory_listings/desktop-comp.html` + `LENS_9_DIRECTORY_LISTINGS_BRIEF.md`.
- New wizard fields: listing items with filterable attributes (price, location, beds, etc), map integration toggle.
- Per-item drill-down opens in modal (see modal system).

### 6. Modal + drawer system (1 day)
- Reference: `system/MODAL_DRAWER_BRIEF.md` + `system/modal/modal-demo.html` (shell spec) + `system/modal/modal-loaded-showcase.html` (hero examples).
- Build a single `<Modal>` React component covering S/M/L/XL sizes. Brand tokens (`--brand-primary`, `--brand-cta`) inherit from the active lens — modal shell is lens-agnostic.
- Per-lens content (product quick-view, case-study drill-down, menu-item detail, listing detail, enquiry form) renders inside the shared shell.
- A11y: focus trap, ESC dismisses, backdrop click dismisses, focus returns to trigger on close.
- Drawer spec pending — same shell logic, anchored right.

### 7. Grow dock (1–2 days)
- Sarah (chat) + Max (voice) + Booking + Reviews — the floating widget bar shown on every lens.
- See `GROW_DOCK_BRIEF.md` for the full spec — design comp + interaction states + module wiring.
- The dock is **lens-agnostic** — same React component renders on every lens.
- Sarah/Max already wired to the Logic Wall via existing Edge Functions (`chatbot-respond`, `voice-ai-twiml`).
- Booking + Reviews modules already exist in `/grow/`.

### 8. Step 6 wizard gallery (1 day)
- Port `lenses/LENS_GALLERY.html` into the live wizard as the Step 6 picker.
- Each card opens a fullscreen preview of that lens populated with the user's actual `WizardData`.
- Gap-analysis panel renders per `lenses/0N_*/gap-analysis-rules.md`, with deep-links to the source wizard step.

### Total estimate: ~16 working days end-to-end (was 12 before Lenses 7–9 and modal system added).

---

## Critical contracts (don't break these)

1. **Lens slug ≠ mood slug.** WizardData carries both: `wizardData.lens` selects shape/layout; `wizardData.mood` selects type system + colour temperament. Any of the 6 moods × any of the 6 lenses = 36 combinations. Don't conflate.

2. **CSS variable discipline.** Every lens reads `--site-primary` and `--site-cta` from a single source. Lens-specific overrides (e.g. Beardmore's forest green) live in the lens stylesheet as a single `:root` block that overrides the foundation. **No hardcoded brand colours in components.**

3. **Module colour map** (in `tokens.css`):
   - Reviews → gold/amber
   - Booking → green
   - Email → blue
   - Sarah → purple
   - Max → teal
   - CRM → indigo
   - Invoicing → slate
   These appear consistently on every lens. Module-coloured chips, badges, icons.

4. **Gap analysis is per-lens.** A "Loaded" Shop is 50+ products; a "Loaded" Local Authority is just "phone + hours + map verified." Each lens defines its own thresholds — see each `gap-analysis-rules.md`.

5. **Phase A wireframe placeholders** (`<div class="wf-img">` with `data-label`). Claude Code replaces these with actual customer imagery from the wizard. The wireframe-base class is in `lenses/_shared/tokens.css` (search for `.wf-img`).

6. **Shop's three wholesale states.** All three are rendered inline in the comp **for visual review** — production renders ONE state based on auth. See `06_shop/section-spec.md` "Three wholesale states" section.

---

## What's NOT in this bundle (deferred)

- **Account portal / order history** (Shop Phase 2)
- **Multi-product cart abstraction** (Shop Phase 2 — v1 is Stripe Payment Link per product)
- **Per-product reviews** (Shop Phase 2 — uses business-level Reviews aggregate)
- **Mood library × lens cross-product comp** (36 combinations — not designed individually; the system composes them at runtime)
- **Mobile/tablet dedicated HTML comps** (responsive HTML covers both breakpoints; dedicated mobile comps are a follow-up if needed)
- **Quick-view modal, Enquire form modal styling** (Shop — Phase B styling task)
- **Real SVG payment-method icons** (currently text chips on Shop)
- **Animated transitions for lens-flip** (Step 6 gallery → fullscreen — visual treatment is locked, animation timing is a Claude Code call)
- **Industry preset → lens default mapping logic** (data exists in `structure.tsx` industry presets; mapping table is for Claude Code to compose)

---

## Quick-reference: lens chooser

| Lens | Slug | Best for |
|------|------|----------|
| 1 | editorial-foundation | service businesses with a story (Brightside Dog Grooming) |
| 2 | showcase-grid | portfolio-led businesses (photographers, designers, makers) |
| 3 | marketing-tiles | feature/benefit-led businesses (B2B, SaaS, agencies) |
| 4 | creative-immersive | brand-led businesses with bold visuals |
| 5 | local-authority | local services (plumbers, electricians, dentists) — highest UK SMB converter |
| 6 | shop | independent retailers, manufacturers, wholesalers — fully-loaded shop |
| 7 | menu-reservations | restaurants, pubs, cafés, hotels — menu + booking front-and-centre |
| 8 | quote-custom-build | configurable services (sign-makers, joiners, fabricators) — process + quote-request |
| 9 | directory-listings | estate agents, holiday lets, vehicle dealers — filterable listings + detail drill-down |

| Mood | Slug | Temperament |
|------|------|-------------|
| classic | classic | timeless serif, traditional |
| modern | modern | contemporary sans, neutral |
| corporate | corporate | trustworthy, conservative |
| playful | playful | warm, approachable |
| bold | bold | high-contrast, attention-grabbing |
| minimal | minimal | spare, gallery-like |

---

## Contact for clarifications

If Claude Code hits an ambiguity in any spec, the source of truth is the comp HTML (`desktop-comp.html` or `Master Template - Brightside.html`). The Markdown specs describe intent; the comps show the actual visual shape.

Phase A is locked. Phase B can iterate on visuals once a real customer's data is in — that's expected.
