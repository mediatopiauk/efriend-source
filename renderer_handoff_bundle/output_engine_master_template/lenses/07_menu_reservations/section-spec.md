# Lens 7 — Menu & Reservations · Section Spec

**Shape:** Sticky reservation bar → secondary nav → atmospheric hero with inline booking form → quick facts strip → full menu (sectioned, priced, allergens) → set menus & events → gallery → chef/story → reviews → find us (map + hours + parking) → footer → floating Sarah/Max widget.

**Best fits:** restaurants, gastropubs, pubs, cafés, bistros, takeaways, hotels with F&B, supper-clubs, food trucks with bookable seatings.

## Sections (per brief §4)

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Sticky reservation bar | "Book a table" always one tap away | brand mark + party-size/date/time/Book CTA | + opening status pill ("Open now · 'til 11pm") + phone |
| 2 | Secondary nav | Jump-links to Menu / Events / Gallery / Story / Reviews / Find | 4 anchors | 6 anchors with `is-active` scrollspy |
| 3 | Hero | Atmosphere shot + name + booking form | 1 photo + name + 1 line + form | 16:9 dusk/interior shot + accolade strip + inline party/date/time/Book form |
| 4 | Quick facts | Cuisine · Hours · Dietary · Phone | 3 facts | 4 with numerical ranking marks |
| 5 | Menu | The reason people scroll | 3 sections × 4 items, no prices | 5–7 sections (snacks / starters / mains / sides / desserts / drinks / Sundays), priced, allergens (V/VG/GF/DF), tonight's specials column, wine-by-the-glass sidebar |
| 6 | Set menus & events | Sunday roasts, tasting menus, supper clubs, Christmas | 1 set menu | 3 set menus + upcoming events list with dates |
| 7 | Gallery | Around the venue | 4 photos | 6–8 mixed photos (food / interior / chef / garden) with aspect variety |
| 8 | Story / chef | Why this place exists | photo + 80-word para | + chef bio + supplier credits |
| 9 | Reviews | Social proof | 3 reviews | 4 reviews with source badge (Google / OpenTable / Tripadvisor) + aggregate stars |
| 10 | Find us | Map + address + hours + parking + transit | map + address | + accessibility line + parking notes + nearest station |
| 11 | Footer | Hours, social, allergen contact | 3 cols | 4 cols with newsletter (next menu) + private-hire CTA |
| 12 | Floating Sarah/Max widget | Last-minute changes by phone/DM | call button | + "Book on WhatsApp" + late-night fallback |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Sticky bar party/date/time | `bookingEnabled` *(new)* + `bookingProvider` *(new: 'internal' \| 'opentable' \| 'resy' \| 'sevenrooms')* | internal = booking module Edge Function |
| Hero photo | `hero.image` *(existing)* | atmosphere shot — dusk/interior preferred over food close-up |
| Accolade strip | `accolades[]` *(new, optional)* | "Michelin Bib Gourmand" / "AA Rosette" / "Estrella Damm Top 100" chips |
| Quick facts | `quickFacts[]` *(new — 4 of: cuisine, hours, dietary, phone, capacity, dress code)* | configurable per venue |
| Menu sections | `menu.sections[]` *(new)* | `{title, intro?, items[]}` |
| Menu items | `menu.sections[].items[]` | `{name, price, description?, allergens[], dietary[], specials?: bool}` |
| Tonight's specials | items flagged `specials: true` | auto-sidebar render |
| Wine by the glass | `menu.sections[]` with `kind: 'wine'` | renders as right-hand sidebar style |
| Set menus | `setMenus[]` *(new)* | `{title, courses, pricePerHead, runs?: 'Sundays' \| 'Tue-Thu' etc}` |
| Events | `events[]` *(new — module Edge Function or array)* | `{date, title, body, bookable?: bool}` |
| Gallery | `gallery[]` *(existing)* | aspect ratios mixed — masonry layout |
| Story | `aboutLong` *(existing)* + `chefBio` *(new, optional)* | |
| Reviews | Reviews module *(existing)* + source badges | aggregator preferred; OpenTable/Google fall through |
| Map | `address` *(existing)* + `mapEmbed` *(new)* | falls back to static map image |
| Hours table | `hours[]` *(existing)* | rendered in find-us + footer + sticky-bar pill |
| Floating widget | `staff[]` *(existing — Sarah/Max)* + `phone` + `whatsapp` | shows when scroll > 800px |

## Booking flow (Deliverable A)

Two visually-distinct modes:

**Internal mode (default — for venues without OpenTable):**
- Inline form in hero AND sticky bar: party size (1–8+) · date picker · time slots
- On submit → check availability (Edge Function) → confirm name + phone + email
- If deposit required (set menus, large parties): redirect to Stripe Payment Link
- Confirmation: email + (if opted-in) SMS via the Email module
- Writes CRM record + Calendar event for owner

**Integrated mode (OpenTable / Resy / SevenRooms):**
- Form is a thin shell — submit deep-links to the provider's widget with prefilled state
- No backend; bookings live in the third party

**Visual treatment:** booking surface uses brand-primary on a cream card with strong contrast — feels intentional, not embedded. Sticky bar's mini-form mirrors the hero form so the muscle memory is identical.

## Menu structure (Deliverable B)

Most-demanded feature. Visual rules:

- **Section header** = small label + larger heading + optional 1-line intro
- **Item row** = name (medium serif) · dotted leader · price (right-aligned tabular)
- **Description** = grey, ~14px, max 2 lines, italics
- **Allergens** = compact pill row beneath name: `V` `VG` `GF` `DF` `N` `S` (vegan / vegetarian / gluten-free / dairy-free / contains nuts / shellfish)
- **Specials** = small flame/asterisk icon + "TONIGHT" label, also pinned to a right-hand sidebar so the eye finds them
- **Wine list** = renders in a parallel column with smaller text, by-the-glass + by-the-bottle pricing

Allergen icons are CSS-only (no SVG dependency) — render as small bordered chips.

## Sticky reservation bar (Deliverable C)

Always visible from scroll position 0. Rules:

- Height 56px, sits below the secondary nav
- Left: brand mark + "Open now · 'til 11pm" pill (green dot if open, amber if closing soon, grey if closed — computed from `hours[]`)
- Right: party-size select · date picker · time chips · "Book a table" CTA
- On mobile collapses to: brand · status pill · "Book" button (opens a modal version of the form)

## Find-us section (Deliverable D)

- Left column: address · phone · email · "Get directions" link (opens user's map app)
- Centre: 600×400 map embed (Google Maps iframe or static map fallback)
- Right column: parking notes · nearest tube/train · accessibility (step-free? lift?) · taxi notes
- Below: hours table — current day highlighted

## Dark-section rhythm

Three dark moments:
1. Hero (dark image overlay + bright form floats on top)
2. Story / chef band (deep neutral, photo bleeds full-width)
3. Footer (near-black)

Everything else is cream/warm-white so the menu reads like a real menu, not a website.
