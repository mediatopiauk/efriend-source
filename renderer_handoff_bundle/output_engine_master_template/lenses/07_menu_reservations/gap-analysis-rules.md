# Lens 7 — Menu & Reservations · Gap-analysis rules

Menu & Reservations is content-hungry on two axes: the menu must feel like a real menu, and the booking surface must work. Gap analysis runs at three tiers per the brief.

## Required (lens refuses to render without)
- `brand.name`, `brand.primary`
- `hero.image` (1)
- `address` + `hours[]` (at least 3 day-rows)
- `menu.sections[]` with ≥ 2 sections × ≥ 3 items each
- `phone` (hospitality is phone-led; no fallback)

## Minimum viable (renders, looks intentional)
- 3 menu sections × 4 items, prices on every item
- 4 photos in gallery
- 1 set menu OR upcoming event (otherwise section hides)
- 3 reviews
- `bookingEnabled: true` OR explicit "phone to book" copy

## Comfortable (recommended)

| Check | Rule | Message |
|-------|------|---------|
| Menu depth | total menu items ≥ 25 across ≥ 4 sections | "Menu lens shines with 25+ items across 4+ sections. You have N — looks thin." |
| Allergens | ≥ 60% of items have at least one allergen/dietary tag | "Diners filter by allergens before they book. Tag your items — V / VG / GF / DF / N / S." |
| Prices | 100% of menu items priced | "Item 'X' has no price. Hospitality customers won't book without seeing prices." |
| Photos | gallery ≥ 6 mixed (food / interior / people) | "Gallery wants 6+. Mix food close-ups with interior + people shots." |
| Booking provider | `bookingProvider` set | "Set a booking provider (internal / OpenTable / Resy / SevenRooms) or the hero form just collects emails." |
| Hours | all 7 days covered | "Hours table missing Day X. Sticky-bar 'Open now' pill will read incorrectly." |
| Tonight's specials | ≥ 1 item flagged `specials: true` | "Specials sidebar empty — page loses a dynamic feel. Flag at least 1 item." |
| Reviews | aggregate ≥ 25 reviews across sources | "Hospitality decisions are review-led. 25+ across Google/OpenTable/Tripadvisor reads as trustworthy." |
| Map | `mapEmbed` configured | "Find-us section falls back to static placeholder. Embed Google Maps for real wayfinding." |

## Loaded (the lens at its best)

| Check | Rule | Message |
|-------|------|---------|
| Set menus | ≥ 2 set menus | "Sunday roast + tasting menu + Christmas — set menus drive deposits. Add 2+." |
| Events | ≥ 3 upcoming events | "Events section feels alive with 3+ on the calendar. Empty events = section hides." |
| Wine list | dedicated wine section with by-the-glass + bottle prices | "Wine sidebar reads as a destination dining venue. Add one." |
| Accolades | ≥ 1 accolade chip | "AA Rosette / Bib Gourmand / local press — 1 chip lifts perceived tier." |
| Chef bio | `chefBio` set | "Hospitality is people-led. A chef bio + photo makes the story land." |
| Accessibility | accessibility line in find-us | "Step-free / lift / accessible loo notes — vital for a chunk of diners." |
| Deposit policy | set menus have `deposit` configured | "£10 pp deposit on set menus cuts no-show rate ~70%. Wire it up." |

## Conditional gates (lens self-heals)

| Condition | Effect |
|-----------|--------|
| `bookingEnabled: false` | Hero booking form replaced with "Call to book" + phone-only sticky bar. No availability check. |
| No set menus, no events | Section hides entirely. Gallery moves up. |
| `mapEmbed` missing | Find-us renders static placeholder + "Open in Maps" deep link. |
| < 4 gallery photos | Gallery section hides. Story section gets the photo budget. |
| Reviews module not connected | Reviews section hides. Trust shifts to accolades chip strip. |
| Closed-today + `hours[]` says so | Sticky bar pill flips to grey "Closed today — book for tomorrow". Form date picker pre-skips today. |
| `wholesaleEnabled` / shop-only fields | Ignored — Lens 7 has no commerce surface beyond deposits. |

## Deep-link targets

Every ✗ in the gap-analysis panel deep-links to its source wizard step:

| Gap | Deep-link target |
|-----|------------------|
| Menu depth | Wizard Content step → Menu builder |
| Allergens missing | Wizard Content step → Menu builder · Allergen audit |
| Prices missing | Wizard Content step → Menu builder · Price audit |
| Booking provider | Wizard Settings step → Booking integration |
| Hours gap | Wizard Settings step → Opening hours |
| Map | Wizard Settings step → Address & map |
| Set menus | Wizard Content step → Set menus section |
| Events | Wizard Content step → Events module |
| Chef bio | Wizard Content step → Story / chef |
| Accessibility | Wizard Settings step → Accessibility notes |
