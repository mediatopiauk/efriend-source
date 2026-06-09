# UXMC — LENS SYSTEM IMPLEMENTATION PLAN

**The product.** This is the core of UX Master Chief. Everything else (wizard, CMS, Grow modules, billing) exists to feed and serve this. Without the lens system, there is no product.

**Date:** June 2026. Built from the Claude Design deliverables (13 May) + the locked lens decisions (12 May).

---

## WHAT THIS IS (the mechanic — locked, do not reopen)

The customer fills the wizard once. Their content sits in the system. Then they FLIP between structural layout "lenses" and watch THEIR OWN content rearrange live into each shape. Each lens runs gap-analysis: "this layout needs 6 tile images, you have 3 — add these to make it look its best."

- Lenses are STRUCTURAL shapes, NOT industry templates. A pizza shop and a photographer can both pick Showcase+Grid. No industry mapping. No "we picked this because you're a plumber."
- The customer picks the lens by browsing visual previews in Step 6.
- Same wizard content fills whichever lens they pick. Brand colour wins. Typography is the parallel Mood Library, orthogonal to lens.
- The 9 lenses x moods x brand x content = the "~140 variations".

## THE 9 LENSES (designed by Claude Design, in the 51MB bundle)

1. Editorial Standard  (= the existing "Brightside"/MasterTemplate, Lens 1)
2. Showcase + Grid
3. Marketing Tiles
4. Creative / Immersive
5. Local Authority
6. Shop
7. Menu & Reservations      (comp only — spec to be written from comp)
8. Quote & Custom Build      (comp only — spec to be written from comp)
9. Directory / Listings      (comp only — spec to be written from comp)

Bundle location (when re-supplied / unpacked): the Claude Design handoff zip — `design_handoff_output_engine_master_template/lenses/`. Each lens folder: desktop-comp, mobile-comp, thumbnail, section-spec.md, gap-analysis-rules.md, lens-summary.md. Plus `_shared/tokens.css`, 6 mood preset CSS files, modal system (10 variants), LENS_GALLERY.md, STEP_6_WIZARD_DESIGN.md.

## STATUS (honest, from the record)

- Lens DESIGNS: done (9 comps; 6 fully spec'd, 3 comp-only).
- Lens IMPLEMENTATION in the renderer: NOT STARTED. This plan is that work.
- What's live now (DynamicRenderer + Brightside fixture via MasterTemplate) is the OLD stopgap, NOT the lens system. RENDERER_ARCHITECTURE_LOCKED.md is superseded.
- Claude Design still owed (were awaiting cap reset): drawer system, 3 internal page templates, drill-down mapping per lens, mega-menu spec per lens. These can be filled by Claude Code from the comps if not re-supplied.

---

## ARCHITECTURE TARGET (from the 12 May implementation path)

Renderer: `/Users/duncanmaund/uxmc-output-engine/site-renderer/`

1. Extend `WizardData` type with per-lens fields + a `lens` field + a `mood` field.
2. Build `/site-renderer/src/components/output-engine/lenses/` — one `<Lens>` component per lens. Lens 1 = the existing MasterTemplate, renamed/normalised into the registry.
3. Build a LENS REGISTRY — maps lens slug -> component + gap-analysis function.
4. Build the GAP-ANALYSIS ENGINE — `(lens, wizardData) => structured ✓/✗ list` per each lens's gap-analysis-rules.md.
5. Data: every lens reads REAL wizard/Supabase data (the data-mapper already maps most of it; extend where a lens needs more). NOT the Brightside fixture.
6. Renderer reads `wizardData.lens` + `wizardData.mood`, renders the matching `<Lens>` with the matching mood preset, fed real data.
7. Step 6 wizard: replace the preset picker with the lens-picker gallery (thumbnails) + mood picker, with live gap-analysis on flip.
8. Remove DynamicRenderer from the live customer path once lenses cover all cases.

---

## PHASED PLAN (sequenced; each phase ends committed + pushed + verified)

### PHASE 0 — Ground truth (½–1 day)
- Re-unpack / locate the Claude Design bundle; confirm all 9 lens comps + specs on disk.
- Audit what's ALREADY in the renderer: the existing MasterTemplate (Lens 1), the data-mapper, the section components, the modal/dock code.
- Map the real wizard/Supabase data shape vs what each lens comp needs.
- OUTPUT: a precise gap doc — per lens, what data exists vs what the lens needs. No code yet.

### PHASE 1 — Foundation: types, registry, gap engine, one real lens (3–5 days)
- Extend `WizardData` (+ `lens`, `mood`, per-lens fields).
- Build the lens registry + gap-analysis engine (skeleton).
- Wire Lens 1 (Editorial Standard / existing MasterTemplate) to render from REAL wizard data (not the Brightside fixture) through the registry. This is the proof the architecture works end-to-end on real data.
- Route page.tsx through the registry behind a per-subdomain flag (safe rollout).
- VERIFY: a real wizard project renders Lens 1 with its own content + brand colour. Commit + push.

### PHASE 2 — Build the remaining lenses (the bulk — multi-day per lens)
For each of Lenses 2–9, in priority order for the launch cohort (services-type first: Editorial, Showcase+Grid, Marketing Tiles, Creative, Local Authority; then Shop, Menu, Quote, Directory):
- Port the lens comp into a `<Lens>` component (verbatim per the comp + section-spec; Claude Code implements, does not redesign — DESIGN_COMPLIANCE_HARD_RULE).
- Wire each lens to real wizard data + its gap-analysis rules.
- For Lenses 7/8/9 (comp-only): write the section-spec + gap rules from the comp first.
- VERIFY each lens renders a real project convincingly. Commit + push per lens.

### PHASE 3 — Step 6 lens picker + flip mechanic + gap analysis UI (multi-day)
- Replace Step 6 preset picker with the lens gallery (thumbnails) + mood picker.
- Wire the live flip: customer flips lens -> their content reflows -> gap-analysis panel shows ✓/✗ per lens.
- Persist `lens` + `mood` choice to the project.
- VERIFY: flip a real project through all lenses in the wizard, gap analysis fires. Commit + push.

### PHASE 4 — Drill-downs, modals, drawers, internal pages, mega-menu (multi-day)
- Wire the modal system (10 variants) + drawers per lens drill-down mapping.
- 3 internal page templates (Item Detail / Area Landing / Long-Form).
- Mega-menu behaviour per lens.
- (If Claude Design specs for these weren't re-supplied, Claude Code derives from the comps.)
- VERIFY. Commit + push.

### PHASE 5 — Switch live path fully to lenses; retire DynamicRenderer (2–3 days)
- All customer sites render via the lens registry.
- Remove DynamicRenderer from the live path.
- Regression-test across lenses, moods, real projects, breakpoints (WCAG AA per lens).
- Commit + push.

### THEN — the launch gate (already built, from the other checklist)
- Money path proven, caps live, both repos backed up. Only G1 (Stripe test->live) + first customer remain AFTER the lens system is real.

---

## RULES FOR WHOEVER IMPLEMENTS (Claude Code) — non-negotiable
- Claude Code IMPLEMENTS the designs verbatim. It does NOT redesign. Visual decisions are Claude Design's only (DESIGN_COMPLIANCE_HARD_RULE.md).
- Read actual code + the actual comps before writing anything. Verify across all repos. Never conclude something doesn't exist from one grep.
- One lens / one surface at a time. Build -> compile-check -> verify on a real project -> commit -> push. Never deploy unverified.
- Lenses are structural, not industry. Brand colour wins. Do not industry-map lenses.
- Feed every lens REAL wizard data. The Brightside fixture is a demo crutch to move away from, not the source of truth.
- Both repos get pushed to GitHub after each working step (wizard repo has a remote; uxmc-output-engine now has one too).
- This is the product. Do not rush it, do not strip it to "MVP" by removing lenses. The lenses ARE the product.

## CONTEXT-RESET SURVIVAL (Claude Code near 1M)
When a Claude Code session runs out, the next one starts by: reading THIS plan, reading the Claude Design bundle, reading the renderer code, and checking git log on both repos to see which phase/lens was last completed. The plan + commits are the source of truth, not chat memory.
