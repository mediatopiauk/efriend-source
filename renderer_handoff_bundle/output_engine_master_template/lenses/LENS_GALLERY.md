# Lens Gallery · v1 free library

Five lenses ship in v1. Premium pack architecture is identical, behind a paywall, future work.

| # | Slug | Folder | Status | Shape one-liner |
|---|------|--------|--------|-----------------|
| 1 | editorial-standard | (existing master template) | **Built** | Split hero, services grid, dark earned moments. The all-rounder. |
| 2 | showcase-grid | `02_showcase_grid/` | **Wireframe (Phase A)** | Cinematic hero, then a grid that IS the page. |
| 3 | marketing-tiles | `03_marketing_tiles/` | **Wireframe (Phase A)** | 6-tile masonry replaces the hero. Heavy on conversion. |
| 4 | creative-immersive | `04_creative_immersive/` | **Wireframe (Phase A)** | Full-viewport hero, asymmetric blocks, dark-by-default. |
| 5 | local-authority | `05_local_authority/` | **Wireframe (Phase A)** | Map + phone + hours hero. Highest converter for UK SMBs. |

## Composition with Typography Mood Library

Lens (structure) × Mood (surface) are orthogonal. The combination is what the customer sees.

| Combo example | Renders as |
|---|---|
| Showcase + Grid × Modern | Existing master shape, modern type/radii |
| Showcase + Grid × Soho | Same shape, Soho serif + tighter radii |
| Local Authority × Modern | Map hero + clean sans + standard radii |
| Local Authority × Hampshire | Map hero + classical serif + sharper radii |

Wizard captures both: `wizardData.lens` (slug) and `wizardData.mood` (slug). Renderer reads both.

## What this delivers

- **Deliverable 1** ✓ Visual designs for Lenses 2–5 (in each folder, `desktop-comp.html` — single HTML doc, responsive for mobile)
- **Deliverable 2** ✓ Lens-flip thumbnail gallery (`LENS_GALLERY.html`) using live iframes of each comp as thumbnails
- **Deliverable 3** ✓ Gap-analysis panel design (rendered inside `LENS_GALLERY.html`, with rule sheets per lens in each folder)
- **Deliverable 4** — Step 6 wizard chrome update — **Phase B**
- **Deliverable 5** — Section-level data contract — partial; per-lens specs are in each `section-spec.md`. Consolidated `types.ts` extension spec is **Phase B**.

## Lens 5 worth flagging

You asked whether "Local Authority" should be a lens or a modifier. Shipped as a lens because (a) the brief says lens, (b) it's the single highest-converting layout for the UK SMB target, and (c) it has structural moves no other lens has (utility bar, split-with-map hero, service-area grid). If a plumber wants Showcase + Grid feel but with local trust signals, the cleanest answer is to add an optional **"local-priority" flag** to any lens, which surfaces a thin utility bar + sticky phone. Worth a Phase B discussion.

## Out of Phase A

- Step 6 wizard chrome redesign (Deliverable 4)
- Consolidated WizardData type extension (Deliverable 5)
- Full mobile comps as separate files (each lens HTML is responsive; dedicated mobile comps wait)
- Lens-flip page transition / preview-loading animation
- Premium lens designs
- LocalBusiness JSON-LD schema (Lens 5 implementation task for Claude Code)
- Lens 1 (Editorial Standard) — already delivered in the master template

## How to review

1. Open `LENS_GALLERY.html` — the live gallery with iframe thumbnails of all 5 lenses.
2. Click each thumbnail to open the full lens comp.
3. Read each lens folder's `section-spec.md` for the data contract and `gap-analysis-rules.md` for the missing-content rules.
4. Decide which shapes are right and what to refine in Phase B.
