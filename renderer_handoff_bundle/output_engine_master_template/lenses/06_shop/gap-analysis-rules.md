# Lens 6 — Shop · Gap-analysis rules

Shop has the most demanding data contract of any lens — the surface assumes a catalogue. Gap analysis runs at three tiers per the brief.

## Required (lens refuses to render without)
- `brand.name`, `brand.primary`
- `products.length` ≥ 6
- Every product has: name, price, image, category
- At least 1 `product.buyMode` set per product (defaults to `'enquire'` if missing)

## Minimum viable (renders, looks intentional)
- 6 products
- 1 category
- 1 featured product (for the bestsellers row)
- Trust strip with 3 items

## Comfortable (recommended)

| Check | Rule | Message |
|-------|------|---------|
| Product count | `products.length` ≥ 20 | "Shop lens shines with 20+ products. You have N — the grid will look thin." |
| Categories | unique categories ≥ 3 | "Shop needs 3+ categories to fill the category grid and feed the mega-menu." |
| Featured products | products with `featured: true` ≥ 4 | "Featured row needs 4–6 products. You have N tagged featured." |
| Active sale | at least 1 product with `salePrice` set | "Hero band's sale slide needs at least 1 sale-priced product. Try a flash discount on a slow mover." |
| Product badges | mix of badge types across catalogue | "All products show the same badge style. Vary it — mark bestsellers, lows, new arrivals." |
| Reviews | `reviews.total` ≥ 20 | "Social proof band wants 20+ reviews. Connect Google/Trustpilot or push for reviews via the Reviews module." |
| Mega-menu categories | each category has ≥ 3 products | "Category 'X' only has 1 product — won't fill its mega-menu column." |

## Loaded (the lens at its best)

| Check | Rule | Message |
|-------|------|---------|
| Catalogue size | `products.length` ≥ 50 | (passes silently when met) |
| Categories | ≥ 5 with photos | "Add a category banner photo for each — falls back to first product but looks better with a styled banner." |
| Wholesale enabled | `wholesaleEnabled: true` AND ≥ 5 trade-only products | "Trade tier surfaces only when wholesale is enabled AND trade-flagged products exist." |
| Sale running | ≥ 6 sale-priced products | "Hero sale slide reads as 'Up to N% off N products' — N at least 6." |
| Featured collection | `featuredCollection` content block set | "Mid-page collection band breaks the grid rhythm. Without it the page is one long product list." |
| Payment methods | `shopPayments` includes ≥ 4 methods | "Trust strip + footer show payment chips. 4+ reads as a real shop, 1 reads as a hobbyist." |
| Newsletter incentive | `newsletter.incentive` set ("10% off first order") | "Sign-up rates 3× higher with an incentive line. Add one." |
| Shop FAQ | `shopFaqs.length` ≥ 5 | "Returns, shipping, trade, vegan/sustainability, payments — five expected." |

## Conditional gates (lens self-heals)

| Condition | Effect |
|-----------|--------|
| `wholesaleEnabled: false` | Wholesale band does not render. Account icon hidden. "Trade" links removed from utility bar + footer. Trade-only product filter hidden. **The lens self-heals — page rhythm unaffected.** |
| No product has `salePrice` | Hero "sale" slide skipped. Carousel becomes 2 slides. |
| No products have `featured: true` | Bestsellers row falls back to "Most reviewed" via Reviews module. |
| Reviews module not connected | Social proof band hidden. FAQ moves up. Trust strip "1,847 reviews" row replaced with "Locally made in [city]". |
| < 8 products total | Filter sidebar hidden (no point filtering 6 items). Sort dropdown remains. |

## Deep-link targets

Every ✗ in the gap-analysis panel deep-links to its source wizard step:

| Gap | Deep-link target |
|-----|------------------|
| Product count low | Wizard Content step → Products section |
| Category gaps | Wizard Content step → Products section, filter by category |
| Wholesale band needed | Wizard Settings step → Wholesale tier toggle |
| Trust strip empty | Wizard Settings step → Shop trust items |
| Featured collection missing | Wizard Content step → Featured collection block |
| Payment methods | Wizard Settings step → Payment methods |
| Newsletter incentive | Wizard Email module → Sign-up incentive |
