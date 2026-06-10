# Lens 2 — Gap-analysis rules

The lens-flip gallery in Step 6 runs these checks when the customer hovers / selects Showcase + Grid.

## Required (must pass for lens to render at all)
- `brand.name` set
- `hero.headline` set
- At least 1 hero image at minimum 1600×800

## Recommended (renders, but the system flags the gap)
| Check | Rule | Message |
|-------|------|---------|
| Grid item count | `services.length + portfolioItems.length + menuItems.length` ≥ 6 | "Showcase + Grid works best with 6+ items. You have N. Add M more." |
| Grid item images | Every grid item has an image | "N of M items are missing photos. Upload to make the grid consistent." |
| About body | `about.body.split(' ').length` ≥ 80 | "About story is short. Add detail to build trust." |
| Testimonials count | `testimonials.length` ≥ 3 | "Add at least 3 testimonials for the social-proof row." |
| Testimonial attribution | Each testimonial has `name` AND (`location` OR `service`) | "Some testimonials are missing location/service — adds trust." |
| Brand colour | `brand.primary` set | "Brand colour drives the eyebrow, price emphasis and footer accent." |

Each ✗ above renders as a row in the gap-analysis panel with a deep-link CTA back to the relevant wizard step.
