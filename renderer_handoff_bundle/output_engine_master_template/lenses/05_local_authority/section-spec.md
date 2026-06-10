# Lens 5 — Local Authority · Section Spec

**Shape:** Utility-bar status + sticky phone nav → split hero (content + live map) → trust bar → service areas grid → service list with prices → reviews with full attribution → local FAQ → embedded contact form → footer.
**Best fits:** plumbers, electricians, dentists, restaurants, hairdressers, local service businesses — anyone whose customers find them via Google Maps. **Highest-converting lens for UK SMBs.**

## Sections

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Utility bar | Live open/closed + phone | Open status, phone | + closing-time today |
| 2 | Sticky nav | Persistent phone CTA | Brand + 3 links + tel: | |
| 3 | Split hero | Local trust + map | Address, hours, phone, 1 CTA, map | + rating badge + 2 CTAs (call + directions) |
| 4 | Trust bar | Certifications | 3 items | 5 items inc. payment, accreditation |
| 5 | Service areas | Local SEO | 3 areas | 4–8 areas with postcode + drive time |
| 6 | Services list | Compact pricing | 4 services with price | 5+ with duration |
| 7 | Reviews | Full local attribution | 3 reviews with name | + location postcode + service |
| 8 | Local FAQ | Address-specific Qs | 4 questions | 5+ inc. parking, walk-ins, area |
| 9 | Contact form | Inbound message | name/phone/message | + dog breed / pet type field |
| 10 | Footer | Address + hours | Address, phone | + hours block, social, accreditation |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Open/closed | computed from `hours` + current time | live |
| Today's hours | `hours.today` | derived |
| Phone | `contact.phone` | E.164 → tel: link |
| Address | `contact.address` | full postal |
| Map | `contact.lat` + `contact.lng` *(new)* | embed Google Maps or static tile |
| Rating badge | `reviews.average` + `reviews.total` | from Reviews module |
| Trust items | `accreditations[]` *(new)* | each: label, optional logo |
| Service areas | `serviceAreas[]` *(new)* | each: name, postcode, optional drive-time |
| Services list | `services[]` | needs duration + price |
| Review attribution | each `testimonials[i]` needs `location` AND `service` | local lens flags missing ones |
| FAQ | `faq[]` | should include local-specific Qs |

## What makes it look its best vs minimum

**Minimum:**
- Address, phone, hours
- 1 hero badge OR rating
- 3 service areas
- 4 services with prices
- 3 testimonials with name

**Ideal:**
- All of above PLUS:
- 4+ service areas with postcodes + drive-times
- 5 trust badges
- 3+ testimonials with location postcode + service tag
- 5+ FAQ items including parking / walk-ins / payment
- Contact form with breed/pet-type custom field
- Footer with full opening hours grid

## Dark-section treatment

This lens uses **two dark moments**: the utility bar at top (foundation-dark, very thin) and the footer (foundation-dark, taller). No mid-page dark section — the lens favours an "always-on" trust register, not a single editorial moment.

## Critical local SEO notes

This is the only lens where the data fields matter for **search ranking** as much as for visual:
- Address must render as plain text in HTML (not image) for Google to crawl
- Phone must be inside an `a[href^="tel:"]` element
- Hours should render as schema.org/OpeningHoursSpecification markup
- Reviews schema.org/Review markup with aggregate
- LocalBusiness JSON-LD in `<head>` (Claude Code task)
