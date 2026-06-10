# Lens 4 — Creative / Immersive · Section Spec

**Shape:** Full-viewport photo hero with transparent nav → asymmetric editorial blocks → services as inline list (not cards) → stories → final CTA.
**Best fits:** creative studios, architects, photographers, luxury brands, salon/wellness premium — anywhere the customer buys the vibe, not the spec.

## Sections

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Transparent nav | Float over hero | Brand + 3 links + CTA | + scroll indicator |
| 2 | Full-viewport hero | Vibe-set | 1 hero image (2560×1440), headline with italic emphasis, sub, CTA | + label ("est. 2017") |
| 3 | Craft block | Asymmetric story | photo (3:4) + 2 paragraphs | + numbered chapter |
| 4 | Services inline list | Browse by browsing | 4 services with thumb + name + price | 5–7 with consistent thumbs |
| 5 | Stories | Editorial testimonials | 2 stories with photo | 3 stories with full attribution |
| 6 | Final CTA | Closing moment | Big italic headline + 1 outline CTA | |
| 7 | Footer | Minimal | brand + contact | |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Hero image | `hero.image` | **Must be 2560×1440 or hero looks broken** |
| Hero label | `hero.label` *(new, optional)* — falls back to `location · est.` | e.g. "Bristol · est. 2017" |
| Hero headline | `hero.headline` | **Italic emphasis** via wrapping spans — wizard inputs `{emphasised}` markers |
| Craft block image | `about.image` | 3:4 portrait |
| Craft block body | `about.body` | 100+ words ideal |
| Services list thumbnails | each service needs an image | **All five thumbnails or lens looks inconsistent** |
| Stories photos | each story needs a photo | square crop |
| Final headline | `finalCta.headline` | italic emphasis again |

## What makes it look its best vs minimum

**Minimum:**
- Hero image at 1920×1080
- 3 services with thumbs
- 1 story with photo

**Ideal:**
- Hero image at 2560×1440 (or larger)
- About story 100+ words with photo
- 5 services with consistent thumbnails
- 2–3 stories with attribution + square photos
- Italic-emphasis copy in hero + final CTA

## Dark-section treatment

This lens is **dark by default** (foundation-dark body, near-black hero) — the inverse of all other lenses. The light "Stories" band breaks the rhythm. No other dark/light treatment is needed.

## Italic emphasis convention

The lens leans on serif italic for tone. Wizard copy can mark phrases with `{emphasis}` syntax and the renderer wraps them in `<em>` with `color: var(--lens-accent)` (golden-yellow #ffd166 by default; overrideable per customer).
