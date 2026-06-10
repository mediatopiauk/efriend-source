# Lens 4 — Gap-analysis rules

## Required
- `hero.image` at minimum 1920×1080 (or lens cannot render the hero)
- `hero.headline`, `hero.subhead`
- `about.body` of 100+ words

## Recommended
| Check | Rule | Message |
|-------|------|---------|
| Hero image quality | `hero.image.width` ≥ 2560 | "Creative wants a wide hero photograph. Yours is N×M — upload 2560×1440+." |
| About photo | `about.image` 3:4 portrait | "Add a 3:4 portrait photo for the Craft block — landscape will crop poorly." |
| Service thumbnails | every `services[i].image` set | "N of M services missing photos. The inline list looks broken without all thumbs." |
| Stories | `testimonials.length` ≥ 2 AND each has a photo | "Stories block needs at least 2 testimonials with photos. You have N." |
| Italic emphasis | hero or finalCta has `{emphasised}` markers | "Lens leans on italic emphasis — wrap a phrase in {curly braces} in your hero copy." |
| Brand colour | set | "Brand colour overrides the default golden emphasis." |
