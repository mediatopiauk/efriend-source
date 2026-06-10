# Typography Mood Library — Claude Design Brief (v2, handoff-ready)

**Date:** 10 May 2026
**Status:** Replaces the existing 6-preset set ("Modern / Minimal / Bold / Classic / Playful / Corporate") with an 18-mood typography library.
**Session scope:** One Claude Design session. Output = 18 CSS files + updated demo HTML + README. No code work in the production wizard.

**Companion docs:**
- `OUTPUT_ENGINE_MASTER_TEMPLATE_BRIEF.md` (Part A — visual; the master template the moods apply to)
- `OUTPUT_ENGINE_IMPLEMENTATION_AUDIT.md` (technical state of the bundle)
- `DESIGN_COMPLIANCE_HARD_RULE.md` (CSS variable discipline, no Tailwind colour classes, etc.)
- `COLOUR-SYSTEM.md` (foundation tokens — do not fork)
- `PHASE_2_LAYOUT_SYSTEM_BACKLOG.md` (structural-layout work this brief deliberately does NOT cover — see §11)

---

## 0. Context hand-off — read this first

The Output Engine bundle already exists at `design_handoff_output_engine_master_template/`:

```
design_handoff_output_engine_master_template/
├── README.md                              ← Claude Code handoff doc (already wired)
├── Master Template - Brightside.html      ← live comp with the existing 6-preset switcher
├── colors_and_type.css                    ← UMC foundation tokens (DO NOT FORK)
├── presets/
│   ├── modern.css   ← retire
│   ├── minimal.css  ← retire
│   ├── bold.css     ← retire
│   ├── classic.css  ← retire
│   ├── playful.css  ← retire
│   └── corporate.css ← retire
└── src/components/output-engine/          ← React component set (already wired)
```

**Your job is incremental, not greenfield:**

1. Add 18 new CSS files in `presets/` per §5–§7.
2. Move the existing 6 to `presets/_archive/` (don't delete — they're referenced by the React components' default fallback for now).
3. Replace the existing 6-button switcher in `Master Template - Brightside.html` with the 18-pill switcher per §10.
4. Write `presets/README.md` per §7.

The React components, fixture, master template HTML body, and tokens layer are already built and working. **Don't rebuild them.**

---

## 1. Why this brief exists

The current preset system delivers six font-pair-and-radius variations on the same template. Sold as "visual styles." The customer expects six different products and gets the same product six times with different fonts. That's a real product gap.

The honest version of this feature is **a typography mood library** — many distinct font + token personalities the customer can flip through to find the one that matches their business voice. Same template, same wizard data, same renderer. Each mood is a font pair plus tokens. The promise is honest: "see your content with different typographic personalities." The breadth is what makes it feel world-class.

Phase 2 (later — backlogged separately) will add **structural layouts** — different page shapes, hero patterns, section orderings. That's a much bigger piece of work and is parked. This brief only covers typography.

---

## 2. Locked decisions

These are settled. Do not reopen.

1. **The current 6 presets are retired.** Names ("Modern / Minimal / Bold / Classic / Playful / Corporate") are bland and overpromise. The new library starts from scratch.
2. **18 typography moods at launch.** Three is too few, fifty is unsustainable, eighteen is "world-class library" without breaking the budget.
3. **Each mood is one CSS file** of identical shape to the existing presets — display font + body font Google Fonts import, 3 radius tokens, 2 shadow tokens, 2 tracking tokens. Bound under `[data-preset="<slug>"]`. Architecture identical to current.
4. **Names are characterful, ownable, evocative** — not descriptive labels. See §5.
5. **Customer brand colour drives `--site-primary` regardless of mood.** Moods do not impose colour palettes. Moods govern type, radius, shadow, tracking only.
6. **WCAG AA compliance on every font pair.** See §8 for verification path.
7. **Premium pack architecture from day one.** Free library = 18 moods. Premium packs (Klim, Pangram Pangram, Grilli Type) ship later as additional CSS files behind a paywall, identical architecture. **This brief covers free library only.**

---

## 3. Mood selection criteria

Each mood must be:

- **Distinctive at first glance.** A customer flipping through the library should be able to say "that one feels different" within a second of switching.
- **Defensible by font choice alone.** No layout changes, no decorative elements, no colour overrides. Font pair + radius + shadow + tracking *is* the entire mood.
- **A real personality, not a category.** "Modern" is a category. "Soho" is a personality.
- **Internationally readable.** No mood depends on display fonts that lack basic Latin extended support.
- **Performant.** Each mood loads at most 4 weights of each face. No 8-weight families.
- **Free for commercial use.** Google Fonts library only for v1.

---

## 4. Naming convention

The 18 launch moods are **named after places, eras, materials, or cultural shorthand** — never descriptive labels.

**Slug discipline:** internal CSS slugs are the lowercased name (`[data-preset="soho"]`). Display name is the capitalised proper noun ("Soho"). One-word names preferred. Hyphenated where necessary.

**Tone discipline:** confident, neutral, evocative. No puns, no marketing speak, no faux-luxury padding.

---

## 5. The launch list — 18 moods

Eighteen names, grouped by feeling. **The font-direction column is a starting hint, not a binding choice.** Substitute freely if a better Google Fonts pair fits the personality. Names are binding; fonts are not.

### Editorial / refined (4)
| Slug | Name | Personality | Font direction (hint) |
|---|---|---|---|
| `manuscript` | **Manuscript** | Quiet authority, like a longform essay. Generous tracking, restrained scale. | Serif display + sans body. *New Yorker* / *Atlantic* energy. |
| `atelier` | **Atelier** | Refined craftsmanship, hand-finished feel, art-direction-led. | Sans display with character + clean body sans. |
| `belle` | **Belle** | Romantic, gentle, classical without being old-fashioned. | Serif display with optical refinement + transitional serif body. |
| `archive` | **Archive** | Bookish, scholarly, considered. Library catalogue card. | Slab serif display + serif body. |

### Modern / utilitarian (3)
| Slug | Name | Personality | Font direction (hint) |
|---|---|---|---|
| `soho` | **Soho** | Clean modern London. The agency you'd hire. | Geometric sans display + neo-grotesque body. |
| `transit` | **Transit** | Wayfinding clarity, signage-grade legibility, no nonsense. | Humanist sans display + same family body. |
| `office` | **Office** | Professional default, Sunday-best business attire. | Modern sans display + system-friendly body. |

### Bold / statement (3)
| Slug | Name | Personality | Font direction (hint) |
|---|---|---|---|
| `heavyweight` | **Heavyweight** | Type as a punch. Massive, confident, no apologies. | Black display font + Plus Jakarta or similar body. |
| `manhattan` | **Manhattan** | Skyline-tall headlines, magazine-cover energy. | Condensed display + clean body sans. |
| `marquee` | **Marquee** | Theatre billing, gig poster, event poster. | Display serif with personality + neutral body. |

### Soft / warm (3)
| Slug | Name | Personality | Font direction (hint) |
|---|---|---|---|
| `crayon` | **Crayon** | Friendly, approachable, schoolyard-in-a-good-way. | Rounded sans display + same family body. |
| `linen` | **Linen** | Soft natural materials, calm warmth, no aggression. | Humanist serif display + warm sans body. |
| `cottage` | **Cottage** | Hand-lettered without being twee, artisan signage. | Display serif with crafted feel + paired body. |

### Architectural / structured (3)
| Slug | Name | Personality | Font direction (hint) |
|---|---|---|---|
| `bauhaus` | **Bauhaus** | Geometric purity, mid-century certainty, grid-led. | Geometric sans throughout. |
| `concrete` | **Concrete** | Brutalist restraint, no decoration, raw structure. | Monospaced or industrial sans display + workhorse body. |
| `grid` | **Grid** | Swiss design school, Helvetica's heir, technical clarity. | Neo-grotesque display + neo-grotesque body. |

### Distinctive / signature (2)
| Slug | Name | Personality | Font direction (hint) |
|---|---|---|---|
| `velvet` | **Velvet** | Premium soft luxury, evening wear for type. | Refined serif display + elegant sans body. |
| `neon` | **Neon** | Late-night energy, vinyl-listing-bar, kinetic. | Display sans with personality + tight body sans. |

---

## 6. Per-mood deliverable

One CSS file, ~25 lines, this exact shape:

```css
/* ============================================================
   OUTPUT ENGINE — Manhattan
   Skyline-tall headlines, magazine-cover energy.
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family={DisplayFontName}:wght@500;600;700;800&family={BodyFontName}:wght@400;500;600&display=swap');

[data-preset="manhattan"] {
  --font-display:      '{DisplayFont}', {fallback}, sans-serif;
  --font-body:         '{BodyFont}', {fallback}, sans-serif;

  --preset-radius-sm:  4px;
  --preset-radius-md:  6px;
  --preset-radius-lg:  10px;

  --preset-shadow-card: 0 2px 6px rgba(15,25,35,0.06), 0 1px 2px rgba(15,25,35,0.04);
  --preset-shadow-lift: 0 16px 40px rgba(15,25,35,0.10), 0 4px 12px rgba(15,25,35,0.06);

  --preset-tracking-display: -0.03em;
  --preset-tracking-heading: -0.015em;
}
```

File named after the slug (`presets/manhattan.css`). Lives in the same `presets/` folder.

---

## 7. Whole-session deliverable

1. **18 CSS files** in `presets/` — one per mood, named after slugs in §5.
2. **`presets/README.md`** — for each mood: name, slug, font pair, one-sentence personality, one-sentence suggested-use ("Crayon suits children's services, pet care, cafés"). **Cap: two sentences per mood.** Don't write a paragraph essay — keep it scannable.
3. **Updated `Master Template - Brightside.html`** — replaces the existing 6-button switcher with the 18-pill switcher per §10. Switcher pre-loads all 18 mood font CSS imports in the demo so switching is instant (no FOUT). Production renderer will load only the active mood — that's a Claude Code job, not yours.
4. **Move retired files.** `presets/modern.css` etc. → `presets/_archive/`. Don't delete.

**Optional but appreciated:**

5. **Thumbnails** — small static PNGs (e.g. 320×200) for each mood showing the Brightside hero rendered in that mood. For the wizard's mood picker UI later. Drop in `presets/_thumbnails/` if you can fit it; skip if you can't — don't half-ship.

---

## 8. WCAG AA verification

For each mood, spot-check four pairs against the rendered Brightside comp **at the live preview**:

| Pair | Required ratio |
|---|---|
| Body text on white (`var(--foundation-slate)` on `#fff`) | ≥ 4.5:1 at 16px |
| Display text on white (`var(--foundation-dark)` on `#fff`) | ≥ 4.5:1 at all display sizes |
| Body on wash (`var(--foundation-slate)` on `var(--foundation-wash)`) | ≥ 4.5:1 |
| Body on dark (`var(--color-fg-on-dark)` on `var(--foundation-dark)`) | ≥ 4.5:1 |

**Method:** the colours don't change between moods, so the ratios are inherited. The verification is to confirm the chosen weights at their rendered sizes don't visually thin out (some display fonts at 400 weight on dark backgrounds become unreadable). Eyeball the four pairs in each mood; if anything looks thin, bump the weight or switch the face.

**No mood ships if a pair visibly degrades.**

---

## 9. Performance budget per mood

Hard caps per mood:

- **Maximum 2 font families** (display + body)
- **Maximum 4 weights per family** (so 8 face files max per mood)
- **`display=swap` mandatory** in every Google Fonts import
- **Combined font payload under ~200KB woff2** per mood (Google Fonts subsetting handles most of this — just don't request 7 weights)

If a font pair would breach this, swap one face for a lighter alternative.

---

## 10. The mood switcher demo

The updated `Master Template - Brightside.html` includes a **fixed top bar** above the main nav with mood pills (replacing the existing 6-button switcher):

```
[ Manuscript ] [ Atelier ] [ Belle ] [ Archive ] [ Soho ] [ Transit ] [ Office ]
[ Heavyweight ] [ Manhattan ] [ Marquee ] [ Crayon ] [ Linen ] [ Cottage ]
[ Bauhaus ] [ Concrete ] [ Grid ] [ Velvet ] [ Neon ]
```

Click a pill → updates `data-preset` on `<body>` → page re-renders with that mood's tokens applied. No page reload. Inline JS, ~10 lines. Active pill state. Choice persists in localStorage across reloads (existing switcher already does this — keep the pattern).

**Font loading for the demo:** include all 18 `<link rel="stylesheet" href="presets/{slug}.css">` tags in the demo `<head>`. Switching is then instant. Production renderer loads one mood per site — that's not your concern, but flag it in the demo HTML with a comment like:

```html
<!-- DEMO ONLY: pre-loads all 18 mood CSS files for instant switching.
     Production renderer at deploy time loads only the active mood. -->
```

This is the **most important non-CSS deliverable**. Without a working live switcher, Duncan can't compare and the brief is incomplete.

---

## 11. Out of scope (deliberately)

- ✗ **Structural layouts.** Different page shapes, hero patterns, section orderings → Phase 2, separate brief, separate work. Logged in `PHASE_2_LAYOUT_SYSTEM_BACKLOG.md`.
- ✗ **Colour palettes per mood.** Customer brand colour drives `--site-primary` regardless. Moods are typography + radius + shadow + tracking only.
- ✗ **Decorative elements.** No corner ornaments, special cursors, per-mood icons. Pure type system.
- ✗ **Premium foundry packs.** Free library only for v1. Klim / Pangram Pangram / Grilli Type are a future affiliate revenue line — same architecture, different deliverable.
- ✗ **Wizard mood-picker UI.** That's Claude Code work in `vite/src/pages/build/design.tsx`. This brief is design-only.
- ✗ **Renderer wiring.** Loading the active mood CSS at deploy time is Claude Code's job, not yours.

---

## 12. Marketing position this enables

- **"18 typography moods at launch, more added every month"** — replaces the bland "6 visual styles" line.
- **"Premium typography from world-class foundries"** — new affiliate revenue lane, sold as £5–15/mo upgrade.
- **"Try your content in any mood — see how it feels"** — wizard mood-switching becomes a UX moment, not a setup chore.
- **"World-class type system designed by Anthropic Labs"** — defensible product claim.

---

## 13. Hard rules

1. **Eighteen moods, exactly.** Not fifteen, not twenty.
2. **Names from §5 are binding.** If you want to substitute one or two for stronger alternatives, fine — but the count stays at 18 and the naming convention (place / era / material / cultural shorthand) holds.
3. **Each mood is one CSS file** matching the existing preset shape. No additional architecture.
4. **The 18-pill live switcher (§10) ships with the demo.** Without it the deliverable is incomplete.
5. **WCAG AA verified per §8.**
6. **Performance budget honoured per §9.**
7. **Free fonts only.** Premium foundry packs are out of scope.
8. **Structural layout work is out of scope.** Repeat: out of scope.
9. **Customer brand colour drives `--site-primary` always.** Moods do not override colour.
10. **Brightside fixture content stays unchanged** — moods flip against the same content so Duncan compares typography cleanly.

---

## 14. Scope-collapse fallback

Eighteen moods + switcher + README + thumbnails is the full scope. If the session genuinely runs out of room, **collapse in this order — don't half-ship 18:**

1. **First to drop:** thumbnails (§7 item 5). Optional anyway.
2. **Second to drop:** README prose for moods 13–18 — leave a one-line `TODO: write personality` comment in those CSS files instead.
3. **Third to drop:** moods 13–18 entirely. Ship 12 fully working with the switcher correctly listing all 18 (the missing 6 pills disabled with a tooltip "Coming next session"). **Do not ship 18 half-finished.** Twelve done well > eighteen half-done.

The switcher itself is non-negotiable. If anything ships, it ships with a working switcher for whatever moods are complete.

---

## 15. Definition of done

The session is finished when **every box is ticked:**

- [ ] 18 CSS files in `presets/` (or 12 + 6 stubs per §14)
- [ ] All bound under `[data-preset="<slug>"]`
- [ ] All Google Fonts imports load without 404 (open the demo, check Network tab)
- [ ] Demo HTML has 18-pill switcher
- [ ] Click a pill → body `data-preset` updates → fonts swap visibly → no console errors
- [ ] localStorage persists choice across reload
- [ ] All 18 mood CSS files pre-loaded in demo head with the explanatory comment
- [ ] `presets/README.md` written, ≤ 2 sentences per mood
- [ ] Old 6 preset files moved to `presets/_archive/` (not deleted)
- [ ] Each mood spot-checked against the four contrast pairs in §8
- [ ] No font requests over 4 weights per family
- [ ] `Master Template - Brightside.html` opens cleanly with no console errors
- [ ] Verifier (`fork_verifier_agent`) passes

---

*Phase 2 — structural layouts — is parked in `PHASE_2_LAYOUT_SYSTEM_BACKLOG.md`. Not this session.*
