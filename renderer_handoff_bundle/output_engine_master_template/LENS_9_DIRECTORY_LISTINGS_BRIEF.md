# Directory / Listings Lens — Claude Design Brief

**Date:** May 2026
**Status:** Standalone brief. Lens 9 in the output engine library.

---

## 1. Why this is a separate brief

Showcase Grid (Lens 2) shows ~12 curated portfolio items. Shop (Lens 6) sells products through a cart-or-enquire flow. **Neither lens handles "many similar items, browse and enquire" — which is what listings businesses do.**

Estate agents have 50–500 properties. Used-car dealers have 30–200 vehicles. Holiday-let agencies have 20–100 rentals. Recruitment agencies have 50–500 jobs. Member directories have hundreds of profiles. They're all the same shape: **a filterable grid of items, each with a detail page, conversion = enquire/view/book — not buy through the page.**

---

## 2. The locked premise

UK directory/listings businesses are a specific shape, roughly 100,000+ SMBs:
- **Estate agents** — 20,000+ branches
- **Used-vehicle dealers** — 30,000+ independent dealerships
- **Holiday lets / short-term rentals** — 25,000+ individual operators (separate from Airbnb)
- **Recruitment agencies** — 40,000+ firms
- **Trade directories, member orgs, classifieds** — long tail

They're served today by:
- **Vertical platforms** (Rightmove, AutoTrader, Indeed) — expensive listing fees, no own-brand site
- **WordPress + theme** — fragile, plugin-heavy, slow
- **Shopify pretending to be a catalogue** — wrong shape, no enquire flow
- **Custom builds** — £10k+ to do well

**What's missing:** a listings-shaped lens that handles filtered grids, map integration, saved searches, per-item detail pages, and enquire-not-buy conversion. Inside a general-purpose SaaS.

---

## 3. What this reuses from the existing wizard

| Already in wizard | Source |
|---|---|
| CRM module (enquiry capture) | `/grow/crm/` |
| Booking module (viewings/test-drives) | `/grow/booking/` |
| Photo galleries per item | existing |
| Map field (already used by Local Authority) | existing |
| Sarah (qualification) | Logic Wall |

**Adds to the wizard:**
- `listings[]` — array of items, each with `{title, summary, mainImage, gallery[], price, priceUnit, location, attributes[], status, dateAdded}`
- `listingType` — `property | vehicle | holiday-let | job | service | directory-entry` (drives field labels + map behaviour)
- `attributes[]` — per-listing-type field schema (bedrooms/bathrooms for property, mileage/year for vehicles, etc.)
- `enquireFields[]` — what the enquire form asks (default: name, email, phone, message; configurable)
- `featuredListings[]` — items to surface at top of the grid
- `savedSearch` — boolean, enables "Save this search" feature

---

## 4. The Directory / Listings lens — full anatomy

### §1 Nav
- Logo, listings categories, "List with us" CTA (if marketplace), search

### §2 Hero — Search-led
- Compact hero, **search bar is the dominant element**
- Filters: location, type, price range, bedrooms (or vehicle-type/job-type/etc.)
- Below search: featured-listings carousel OR "Browse all 247 properties"
- Background: clean — search bar takes priority

### §3 Quick category strip
- 4–8 category tiles ("Houses for sale" / "Houses to rent" / "Commercial" / "New build")
- Or vehicle-specific ("Saloons" / "SUVs" / "Vans" / "Electric")
- Click → filtered grid view

### §4 The listings grid (the heart of the lens)
- **Left rail (desktop):** filter sidebar
  - All listing-type-aware filters (price, bedrooms, fuel type, location radius, etc.)
  - Sort options (newest / price asc / price desc / closest to me)
- **Top bar:** count + sort + view toggle (Grid / List / Map)
- **Grid view:** 3-up cards with main image, price, title, key attributes, "Enquire" + "View details"
- **List view:** horizontal cards, more info visible
- **Map view:** map left, results list right, click-to-highlight
- Saved search button (writes to CRM as a contact with search criteria)
- Pagination or infinite scroll

### §5 Listing detail page (separate route, lens-shaped)
- Gallery (large) at top
- Title + price + key attributes prominent
- Description + features list
- Map + nearby info
- Agent/dealer/lister card (photo + name + phone + email)
- **Enquire form inline** (not modal) — name, email, phone, message, "I'd like to view/test-drive/book a viewing"
- "Save this listing" + "Share" actions
- Similar listings carousel at bottom

### §6 Featured / latest band
- 4–6 cards of newly-added or featured listings
- "View all latest →"

### §7 About / Why use us
- Standard trust block — years in business, areas covered, fees explainer, accreditations
- For estate agents this is critical (Propertymark, etc.)
- For vehicle dealers: warranty, finance, AA inspection

### §8 Reviews
- Aggregate + 3 latest

### §9 List with us (marketplace mode — conditional)
- If business is a marketplace (members can list), this section becomes the "List your property/vehicle/business" pitch
- CTA → registration flow (Phase 2 wires this fully)

### §10 Footer
- Standard, with listings categories + areas covered

### Floating widgets
- Sarah (chat — can answer "do you have 3-bed properties under £400k in Bristol?")
- Booking (viewings, test-drives)
- "Save this search" floating button on mobile

---

## 5. Per-listing-type field schemas

This is what makes the lens versatile:

**Property:** bedrooms, bathrooms, sqft, garden, parking, EPC, tenure, council tax band
**Vehicle:** make, model, year, mileage, fuel, transmission, engine, MOT, service history
**Holiday let:** sleeps, bedrooms, pet-friendly, pool, wifi, distance to beach, weekly rate
**Job:** salary range, contract type, location, remote, experience level, sector
**Service/directory:** category, location, opening hours, certifications, price range

Each `listingType` defines its own attribute schema. The wizard's "add a listing" step renders the right fields.

---

## 6. Deliverables

1. **Full desktop comp** populated with a realistic UK fixture (propose: a Bristol estate agent — e.g. "Hartcliffe & Crew" — or a Yorkshire used-car dealer; pick whichever lets you show the lens at full density)
2. **Section spec** per §4
3. **Filter sidebar design** for all 5 listing types (showing how schema swaps)
4. **Three view modes** — Grid / List / Map (each with desktop + mobile)
5. **Listing detail page** comp (separate route, lens-shaped)
6. **Enquire form spec** + auto-reply mechanic
7. **Saved-search feature** design (incl. email digest)
8. **Mobile reflow** — filters become drawer, map becomes fullscreen toggle
9. **Gap analysis rules** — including per-listing-type minimums
10. **Lens 9 card for the gallery**

---

## 7. NOT in scope

- Booking/calendar integration for holiday lets (Phase 2 — uses Booking module for v1)
- Stripe payments for deposits/holds (Phase 2)
- ID verification / right-to-rent checks (Phase 3, regulated)
- Mortgage calculators (Phase 2)
- Vehicle finance widgets (Phase 2 — partner integrations)
- Multi-language listings (Phase 2)

---

## 8. Acceptance criteria

1. Filter sidebar adapts to listing type without breaking layout
2. Map view performs at 500+ listings without lag
3. Listing detail page reads as a real product page, not a directory entry
4. Enquire converts in ≤1 click + 4 form fields
5. Self-heals: <10 listings → grid hides filters, becomes "All listings" simple view
6. Saved search creates a CRM contact + scheduled email digest
7. Schema.org markup per type (RealEstateListing / Vehicle / Accommodation / JobPosting)
