# Menu & Reservations Lens — Claude Design Brief

**Date:** May 2026
**Status:** Standalone brief. Lens 7 in the output engine library. Pairs with `STRUCTURAL_LAYOUTS_AS_LENSES_BRIEF.md` (Lenses 1–5) and `SHOP_LENS_BRIEF.md` (Lens 6).

---

## 1. Why this is a separate brief

Local Authority (Lens 5) gets the phone, address and hours right. Editorial Foundation (Lens 1) gets the story right. **Neither lens treats the menu as the page itself.** A restaurant, pub, café, hotel or takeaway has one job above all others: show the menu and let people book a table. Everything else is supporting cast.

This lens is hospitality-shaped — menu-front-and-centre, reservations baked in, opening hours and gallery as supporting blocks, **never** an afterthought.

---

## 2. The locked premise

UK hospitality is 300,000+ businesses. They are currently served by:
- **Shopify** — overkill, no reservation primitive, no menu schema
- **Wix/Squarespace** — pretty but treat the menu as a downloadable PDF
- **Bespoke restaurant builders** (Resy, OpenTable websites) — locked to their platform, expensive
- **Dedicated pub/hotel CMSs** — niche, dated, fragile

**What's missing:** a hospitality-shaped lens inside a general-purpose SaaS that handles menu + reservations + gallery + reviews without a separate platform. UXMC already has Booking, Reviews and Email modules wired — a Menu lens completes the hospitality stack.

---

## 3. What this reuses from the existing wizard

| Already in wizard | Source |
|---|---|
| Booking module (table reservations) | `/grow/booking/` |
| Reviews module (Google/Trustpilot aggregate) | `/grow/reviews/` |
| Opening hours field on business profile | existing |
| Photo gallery as a content kind | `content.tsx` |
| Local map / address fields | existing |
| Sarah trained on menu via Logic Wall | existing |

**Adds to the wizard (small):**
- `menuSections[]` — array of `{title, items[]}` where each item is `{name, description, price, dietaryTags[], image?, isSpecial?}`
- `dietaryFilters` — `vegan / vegetarian / gluten-free / dairy-free / halal / kosher / nut-free`
- `reservationProvider` — internal (UXMC Booking) | OpenTable | Resy | external URL
- `reservationCutoff` — minimum booking lead-time (e.g. 2hrs)
- `cuisine` — free text for SEO + schema.org Restaurant markup
- `priceRange` — £ / ££ / £££ / ££££

---

## 4. The Menu & Reservations lens — full anatomy

### §1 Sticky reservation bar (top)
- Phone, address, "Book a table" CTA, current open/closed state
- "Open until 10pm" / "Closed — opens tomorrow at 12pm"
- Always visible on scroll

### §2 Hero — Photo + reservation widget
- Large food/space photography (full-bleed or 60% width)
- Right side: reservation widget (party size, date, time picker → "Find a table")
- Eyebrow: cuisine + price range ("Modern British · ££")
- Headline + 1-line positioning

### §3 Quick-fact strip
- Hours summary · Phone · Cuisine · Price range · "Walk-ins welcome" or "Reservations required"
- All 4–5 in one row, hospitality-iconography

### §4 The menu (the heart of the lens)
- Section-tabbed (Starters / Mains / Desserts / Drinks / Wine list / Set menu / Sunday roast)
- Each item: name, description, price, dietary tags (V/Ve/GF chips), optional photo
- "Specials today" highlighted at top of each section
- Dietary filter toggles (Vegetarian only / Gluten-free only)
- Wine list as a different visual treatment (longer, two-column)
- "Allergen info" link at the bottom of each section

### §5 Set menus / events / promotions
- Sunday roast · Christmas menu · Tasting menu · Quiz night · Bottomless brunch
- Card-led grid (similar to Featured Collection in Shop)

### §6 Photo gallery
- Food shots + interior shots + chef portraits
- Masonry grid or carousel
- Click → lightbox

### §7 The Story / Chef / Provenance block
- One block — short paragraph about the chef, suppliers, or building
- Photo + 200 words
- Builds trust + SEO

### §8 Reviews
- Aggregate stars + 3 latest reviews
- Specifically pulls reviews mentioning food when possible

### §9 Find us
- Map + address + parking notes + nearest tube/train
- Phone + email + reservation links

### §10 Footer
- Standard, but with reservation CTA reinforced

### Floating widgets
- Sarah (chat — can answer "do you do gluten-free?" because Logic Wall knows the menu)
- Booking widget
- Phone-to-call on mobile

---

## 5. Reservation flow detail

Three modes, set per business:

**Mode A — Internal (UXMC Booking module):**
- Reservation widget writes directly to Booking
- Owner sees in their UXMC dashboard
- SMS confirmation via Twilio (already wired)

**Mode B — OpenTable / Resy:**
- Widget redirects to provider's flow
- UXMC tracks the click as a conversion event

**Mode C — Phone-only / Walk-ins:**
- Widget becomes "Call to book" with click-to-call
- No table-availability checking

---

## 6. Deliverables

1. **Full desktop comp** populated with a realistic UK hospitality fixture (propose: an independent gastropub or a small-plates restaurant — invent one, e.g. "The Forge & Crown")
2. **Section spec** per §4 above
3. **Menu component spec** — section tabs, dietary chip system, specials treatment, allergen-info footer
4. **Reservation widget design** — all 3 modes (internal / OpenTable / phone-only)
5. **Mobile reflow** — menu becomes accordion, reservation widget becomes sticky bottom bar
6. **Gap analysis rules** — min/comfortable/loaded tiers, plus conditional gates (no menu yet → falls back to "Menu coming soon" with phone CTA)
7. **Lens 7 card for the gallery**

---

## 7. NOT in scope

- Real-time table availability inventory (Phase 2 — UXMC Booking handles slot-based for v1)
- Online ordering / takeaway flow (different lens entirely — Shop covers basic, full delivery is Phase 3)
- Multi-location restaurant chains (Phase 2)
- Loyalty / gift cards (Phase 2)

---

## 8. Acceptance criteria

1. Menu reads as the dominant content on the page
2. Reservation is one click + 3 form fields max
3. Dietary filters work without leaving the page
4. Works for a pub (drinks-led), restaurant (food-led), café (snacks-led), hotel (multiple menus)
5. Self-heals: no menu = "Menu updates weekly, call to ask" treatment
6. Schema.org Restaurant + Menu markup in head
