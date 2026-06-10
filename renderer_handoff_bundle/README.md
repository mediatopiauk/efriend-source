# UXMC Dynamic Renderer — complete Phase A → Phase B handoff

**Packaged:** June 2026 · for Claude Code to build the dynamic renderer
**Phase A designer:** Claude Design · **Phase B implementer:** Claude Code

This is the **single, complete bundle** for the dynamic renderer. It merges the
three Phase-A handoff packages that were previously shipped separately, so there
are no external cross-references to chase. Everything the renderer needs to make
its architectural decisions is in here.

---

## The three sub-bundles

```
renderer_handoff_bundle/
├── README.md                       ← you are here · start here
│
├── output_engine_master_template/  ← THE FOUNDATION (read first)
│   ├── HANDOFF.md                      ← master Phase B integration order + contracts
│   ├── README.md                       ← original architecture doc
│   ├── Master Template - Brightside.html   ← Lens 1 reference comp
│   ├── colors_and_type.css             ← master design token sheet
│   ├── lenses/                         ← all 9 lenses (comp + 3 specs each)
│   │   ├── LENS_GALLERY.html / .md         all lenses side by side
│   │   ├── 02_showcase_grid/ … 09_directory_listings/
│   │   └── _shared/tokens.css          ← shared CSS variables (the contract)
│   ├── presets/                        ← 6 typography-mood CSS files
│   ├── system/                         ← modal + drawer briefs
│   ├── src/components/output-engine/   ← REACT SKELETON (the renderer itself)
│   │   ├── MasterTemplate.tsx              page-level composition
│   │   ├── types.ts                        WizardData contract
│   │   ├── sections/ · widgets/ · fixtures/ · styles/
│   │   └── README.md                       composition + wiring contract
│   └── *_BRIEF.md                      ← per-lens + Grow-dock + mood-library briefs
│
├── phase_a_wrap/                   ← THE DRILL-DOWN VOCABULARY
│   ├── README.md                       ← drawers + templates + drill-down + mega-menu
│   ├── DRILL_DOWN_MAPPING.md           ← 9 lenses × every interactive element → pattern
│   ├── system/drawer/                  ← drawer shell + 3 hero drawers
│   ├── system/mega-menu/               ← mega-menu spec (3 behaviours) + MEGA_MENU.md
│   └── templates/                      ← Template A (item detail) · B (area) · C (long-form)
│
└── hero_modals/                    ← THE MODAL VOCABULARY
    ├── README.md
    ├── MODAL_DRAWER_BRIEF.md           ← full modal + drawer system brief
    ├── modal-demo.html                 ← shell spec (S/M/L/XL + lens-token swap)
    └── modal-loaded-showcase.html      ← 10 hero modals fully loaded
```

---

## Read in this order

1. **`output_engine_master_template/HANDOFF.md`** — the master plan. Phase B
   integration order (tokens → moods → lens skeleton → lenses 1–9 → modal/drawer
   → Grow dock → wizard gallery), the critical contracts, and the lens/mood
   chooser tables. ~16-day roadmap.
2. **`output_engine_master_template/src/components/output-engine/README.md`** —
   the renderer's composition contract: `MasterTemplate` is a one-shot
   composition; every section reads its slice of `WizardData` and returns `null`
   when empty. This is the core of the dynamic renderer.
3. **`phase_a_wrap/DRILL_DOWN_MAPPING.md`** — what every interactive element on
   every lens drills down to (jump-anchor / modal / drawer / routed page / state).
4. **The comps** — `desktop-comp.html` per lens, the templates, the modal/drawer
   showcases. When a Markdown spec and a comp disagree, **the comp wins**.

---

## The renderer in one paragraph

`wizardData.lens` (1 of 9) picks the **shape/layout**; `wizardData.mood` (1 of 6)
picks the **type system + colour temperament** — 36 combinations composed at
runtime, never designed individually. `MasterTemplate.tsx` composes sections that
each self-gate on their data slice. Brand colour plumbs through `--site-primary` /
`--site-cta` from `wizardData.brand`; every section reads `var(--site-primary)`,
never a hex literal. Drill-downs (modals, drawers, routed templates, mega-menu)
are a **lens-agnostic shell** whose content inherits the active lens's tokens.

## Non-negotiable contracts (full detail in HANDOFF.md)

1. **Lens slug ≠ mood slug** — both live on `WizardData`, never conflate.
2. **CSS-variable discipline** — no hardcoded brand colours in components.
3. **Module colour map** (tokens.css): Reviews=gold, Booking=green, Email=blue,
   Sarah=purple, Max=teal, CRM=indigo, Invoicing=slate.
4. **Gap analysis is per-lens** — each lens's `gap-analysis-rules.md` sets its own
   "loaded" thresholds.
5. **Shell stays preset-neutral; content inherits brand tokens** — same rule for
   modals, drawers, and the mega-menu.
6. **Shared animation timing** — modal 240/180 ms, drawer 280/200 ms, mega-menu
   reuses modal timing. Don't proliferate.

## What's deliberately NOT here (deferred Phase B+)

Account portal / order history · multi-product cart · per-product reviews ·
the 36 mood×lens cross-product comps (composed at runtime) · dedicated mobile
comps · generic info / search / login / order-tracking modals · quote-builder v2.
See each sub-bundle's README "Open / deferred" sections.
