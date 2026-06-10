# Lens 3 — Marketing Tiles · Section Spec

**Shape:** No traditional hero — above-the-fold IS a 6-tile masonry. Heavy on conversion mechanics: pricing table, social proof band, secondary CTA.
**Best fits:** SaaS, agencies pushing multiple offers, fitness studios with class types, businesses running promotions — anywhere the customer is comparing.

## Sections

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Sticky nav | Navigation | brand + 3 links + CTA | + phone |
| 2 | Tile masonry | Above-fold value props | 4 tiles | **6 distinct tiles** (mix of price, photo, offer, CTA) |
| 3 | Pricing table | Direct comparison | 2 plans | 3 plans, one featured |
| 4 | Testimonial band | Social proof, big quote | 1 testimonial | + aggregate rating |
| 5 | Secondary CTA | Second conversion shot | brand-coloured band, CTA | + urgency |
| 6 | Footer | Compliance | Address, phone | + socials |

## Tile types (the variety is the lens)

The lens supports 5 tile "kinds" — wizard can pick which kind each tile uses:

1. **photo** — image fill, dark gradient, white text. For hero tile / "see our space."
2. **brand** — solid `--site-primary` background, white text. Use for #1 service or anchor offer.
3. **paper** — `--f-wash` background, dark text. Neutral; good for secondary services.
4. **cta** — solid `--site-cta` background, white text. Use for promotions / offers.
5. **dark** — `--f-dark` background, white text. Editorial / quote tiles.

## Tile span variants

- `--lg` (2×2) — featured tile, usually the hero photo. Max 1 per layout.
- `--tall` (1×2) — secondary feature.
- `--wide` (2×1) — full-width CTA tile.
- default (1×1) — service/price/feature cards.

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Tile #1 | `tiles[0]` *(new)* | Each tile: kind, title, body, image?, price?, ctaLabel, ctaUrl |
| Pricing plans | `plans[]` *(new, optional)* — falls back to `services[]` mapped into pricing rows | featured flag picks the highlighted plan |
| Quote | first testimonial with full attribution | |
| Aggregate stars | `reviews.average` + `reviews.total` | from Reviews Grow module |
| Brand colour | `brand.primary` | drives tile #2 + secondary CTA band |

## What makes it look its best vs minimum

**Minimum viable:**
- 4 tiles
- 2 pricing plans
- 1 testimonial

**Ideal:**
- 6 tiles with **mixed kinds** (at least: 1 photo, 1 brand, 1 cta, 1 dark)
- 3 pricing plans, one marked featured
- Quote + aggregate review stats
- Brand colour set + brand-coloured secondary CTA

## Dark-section treatment

This lens prefers **saturated brand colour** for its dark moment (secondary CTA section), not foundation-dark. Tile #5 (dark) carries the only true `--f-dark` surface. Keeps the visual register high-contrast and editorial without being heavy.
