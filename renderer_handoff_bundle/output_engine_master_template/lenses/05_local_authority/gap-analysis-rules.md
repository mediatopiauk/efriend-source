# Lens 5 — Gap-analysis rules

This is the strictest gap analysis of any lens because local SEO depends on the data being complete.

## Required (lens refuses to render without)
- `contact.phone` set (E.164 format)
- `contact.address` set (full postal)
- `hours` set for at least 5 days

## Recommended
| Check | Rule | Message |
|-------|------|---------|
| Map coords | `contact.lat` AND `contact.lng` set | "Add coordinates so we can show your map on the hero." |
| Service areas | `serviceAreas.length` ≥ 3 | "Local Authority needs 3+ service areas. You have N." |
| Service areas detail | each area has postcode | "N areas missing postcodes — hurts local SEO." |
| Accreditations | `accreditations.length` ≥ 3 | "Add 3+ accreditations / payment methods to the trust bar." |
| Reviews attribution | every review has `location` AND `service` | "N reviews missing location/service tags — Local Authority shows them prominently." |
| Reviews count | `reviews.total` ≥ 10 | "Local lens really benefits from 10+ reviews. Connect your Google reviews feed." |
| FAQ count | `faq.length` ≥ 5 | "Local FAQ block needs 5+ items including parking, walk-ins, payment." |
| Local FAQ topics | FAQ includes parking, hours, walk-ins/appointment | "Add Local-specific FAQs: parking? walk-ins? payment methods?" |
| Hours grid | every weekday has hours OR explicit "Closed" | "Hours grid has gaps — fill or mark closed for each day." |
