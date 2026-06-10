# Lens 3 — Gap-analysis rules

## Required
- `brand.name`, `brand.primary`
- At least 4 tile-shaped propositions (can derive from services as fallback)

## Recommended
| Check | Rule | Message |
|-------|------|---------|
| Tile count | `tiles.length` ≥ 6 | "Marketing Tiles needs 6 distinct propositions (one per tile). You have N." |
| Tile kind variety | Among tiles, at least 4 distinct `kind` values | "Tiles all look the same. Vary the kinds — add a photo tile, a price tile, an offer tile." |
| Tile copy | Each tile has title + body | "N tiles are missing body copy." |
| Hero tile image | First tile has `image` if kind=`photo` | "Hero tile is photo-kind but missing image." |
| Pricing plans | `plans.length` ≥ 3 | "Add a third price plan — comparison works best with 3." |
| Featured plan | One plan has `featured: true` | "Mark your most-bought plan as featured — drives 30% more clicks." |
| Aggregate reviews | `reviews.total` ≥ 5 | "Quote band shows aggregate stars — connect Reviews module." |
| Brand colour | set | "Brand colour drives tile #2 + secondary CTA band." |
