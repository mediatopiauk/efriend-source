# Lens 2 — Showcase + Grid · Section Spec

**Shape:** Cinematic full-bleed hero → grid is the spine → about → testimonials → CTA → footer.
**Best fits:** restaurants, photographers, agencies, e-commerce, dental practices with treatments — anywhere the customer comes to compare options.

## Sections

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Sticky nav | Persistent wayfinding | Brand, 3 nav links, CTA | Brand, 4 links, phone, CTA |
| 2 | Cinematic hero | Establish vibe; single conversion | 1 hero image (1920×900+), headline, sub, 1 CTA | + brand-colour bottom bar |
| 3 | Grid (services / portfolio / menu) | Spine of the page | 4 cards | 6–9 cards |
| 4 | About | Trust + face | 1 photo (4:5), 1 paragraph | photo + 2–3 paragraphs |
| 5 | Testimonials | Social proof | 3 testimonials with name | + role/location/service |
| 6 | Dark CTA | Conversion close | Headline, sub, 1 CTA | + urgency line |
| 7 | Footer | Compliance + contact | Address, phone, email | + socials, hours |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Brand | `brand.name` | |
| Hero headline | `hero.headline` | Plain text, no markup |
| Hero sub | `hero.subhead` | |
| Hero CTA | `hero.ctaLabel` + `hero.ctaUrl` | |
| Hero image | `hero.image` | **Must be 1920×900 minimum** |
| Grid eyebrow | `grid.eyebrow` *(new)* | |
| Grid title | `grid.title` *(new)* | |
| Grid items | `services[]` OR `portfolioItems[]` OR `menuItems[]` *(union)* | Each needs image, title, description, optional price+duration |
| About image | `about.image` | 4:5 portrait |
| About body | `about.body` | 80+ words |
| Testimonials | `testimonials[]` | name + body + optional role/location |
| CTA headline | `cta.headline` | |
| Footer fields | `contact.*` + `hours` | |

## What makes it look its best vs minimum

**Minimum viable (the lens still renders):**
- 4 grid items
- 1 hero image at 1920×900
- 1 paragraph about
- 2 testimonials

**Ideal (the lens looks great):**
- 6+ grid items with consistent image style
- Hero image at 1920×1080
- About photo at 4:5, 2–3 paragraphs
- 3 testimonials with full attribution (name + location/service)
- Brand colour set (used for grid eyebrow, hero bottom bar, price emphasis, footer)

## Gap placeholder card

When wizard has < 6 grid items, render a dashed-border placeholder card with "+ icon" and copy "Showcase + Grid suggests 6 items — you have N — add one more." The placeholder is a deep-link to the relevant wizard step.

## Dark-section treatment

This lens earns one dark moment: the CTA before footer. Uses `--f-dark` background, white text, brand-cta button. No other dark sections — keeps the grid as the primary spine.
