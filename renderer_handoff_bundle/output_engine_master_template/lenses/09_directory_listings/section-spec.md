# Lens 9 — Directory / Listings · Section Spec

**Shape:** Utility bar → nav → hero with search bar → category strip with counts → listings body (filter sidebar + card grid + sort + map toggle + pagination) → featured listings band → why-us → reviews → list-with-us CTA → footer.

**Best fits:** estate agents, lettings agents, holiday-let portfolios, used-vehicle dealers, plant-hire fleets, marina berth listings, recruitment agencies, member/professional directories, art-fair exhibitor catalogues — any business surfacing N similar items with per-item enquire/book/view.

## Sections (per brief §4)

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Utility bar | Phone + opening + region | phone | + opening hours + region tagline |
| 2 | Nav | Brand + categories + "List with us" + sign in | brand + 3 anchors | brand + 5 anchors (Buy / Rent / Sell / Let / Valuations) + sign-in + CTA |
| 3 | Hero with search | The page's job is search | photo + search bar (location + type) | photo + tagline + 4-field search (location + category + price min/max + bedrooms) + "Search" CTA |
| 4 | Category strip | Aggregate counts → instant browse | 3 categories with counts | 5–6 categories with photo + count + "for sale/rent" qualifier |
| 5 | Listings body | The whole reason this lens exists | sidebar filters + 6 cards + pagination | sidebar filters + 12 cards + sort + map toggle + saved-search + pagination + active-filter chips |
| 6 | Featured listings | Editorial spotlight | 3 featured | 4 featured (premium tier paid by lister) with larger card style |
| 7 | Why us | Differentiator | 3 reasons | 4 reasons with stat (years, listings, region coverage) |
| 8 | Reviews | Buyer + seller social proof | 3 reviews | 4 reviews with role badge (buyer / seller / tenant / landlord) |
| 9 | List with us CTA | Acquire supply-side users | 1 CTA panel | dark band with proposition + form trigger |
| 10 | Footer | Region offices + legal + sister sites | 3 cols | 5 cols with office addresses, regulator badges (Propertymark / RICS / ARLA), sitemap |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Hero search fields | `searchFields[]` *(new — config: location / category / price / bedrooms / mileage / make / dates)* | varies per directory type |
| Category strip | aggregated `listing.category` | with counts per category |
| Listings | `listings[]` *(new)* | `{title, price, image, location, category, bedrooms?, sqft?, mileage?, features[], featured?, sold?, soldDate?}` |
| Listing card price | per listing | shown prominently; "POA" if `price: null` |
| Listing card status badge | `listing.status` | "New" / "Reduced" / "Sold" / "Let agreed" — chip top-left |
| Filter sidebar groups | `filterGroups[]` *(new — config per directory type)* | category checkboxes, price slider, bedrooms (estate), bath count, parking, garden, vehicle make, mileage range etc |
| Sort options | hardcoded: Newest / Price ↑ / Price ↓ / Most viewed | + "Featured first" toggle |
| Map toggle | per listing `lat`/`lng` (when present) | toggle switches grid → split (list left, map right) |
| Saved searches | requires auth — Phase 2 | v1: button is dummy, opens sign-in prompt |
| Featured listings | listings where `featured: true` | premium-tier paid spots — larger card with "Featured" chip |
| Why-us reasons | `whyUs[]` *(new)* | each: `{stat, label, body}` |
| Reviews with role | reviews module + `role` tag *(new)* | role badge: buyer / seller / tenant / landlord / candidate / client |
| List-with-us | `listWithUs.copy` + form trigger | acquires supply-side users |
| Regulator badges | `regulators[]` *(new)* | Propertymark / RICS / ARLA / NAEA / TPO etc — footer logo row |

## Search hero (Deliverable A)

The single most important section. Treatment:

- Full-bleed atmospheric photo (region shot / fleet shot / market shot)
- Headline + 1-line sub centred on top
- Search bar **floats below headline** with strong contrast — feels like a real search tool, not a marketing band
- Fields are **directory-type-specific**:
  - Estate agent: Location · Buy/Let/New homes · Min price · Max price · Bedrooms · Search
  - Vehicle dealer: Make · Model · Min price · Max price · Year from · Search
  - Holiday lets: Where · Check in · Check out · Guests · Search
  - Recruitment: Keyword · Location · Sector · Salary · Search
- "Advanced search" expander beneath for further fields (square footage, features, mileage etc)

## Listings body (Deliverable B — the heart)

Three-column layout (desktop): filter sidebar (240px) · main card grid (flexible) · optional map panel (toggled, replaces grid as split).

**Filter sidebar:**
- Always-visible groups: Category · Price range (dual slider) · directory-specific (bedrooms / bathrooms / mileage / make / year)
- Toggle filters: New listings only · Reduced · With photos · Pet-friendly etc (per directory type)
- "Reset filters" link at top
- "X listings match" live count

**Card grid:**
- Default 3 columns desktop / 2 tablet / 1 mobile
- Card: photo (16:10) + status chip top-left + favourite ♡ top-right + price (large) + title + location + key stats row (beds·baths·sqft OR mileage·year·fuel) + "View details" CTA
- Featured cards (`featured: true`) have a brand-primary border + "Featured" chip + slightly larger
- Sold/Let cards render with a semi-transparent overlay "Sold STC" or "Let agreed"

**Above grid:**
- Active filter chip row: each filter shows as a removable chip + "Clear all"
- Sort dropdown right-aligned
- Map toggle button (switches layout to split-view with map)
- Result count: "Showing 1–12 of N"

**Below grid:**
- Pagination with prev/next + page numbers + "per page" select
- "Save this search" button (requires sign-in)

## Card variants per directory type (Deliverable C)

Same shape, different key-stats row:

| Type | Key stats row |
|------|---------------|
| Estate agent | beds · baths · sqft · garden? · parking? |
| Vehicle dealer | year · mileage · fuel · transmission · BHP |
| Holiday lets | sleeps · bedrooms · pets? · pool? · per-night-price |
| Recruitment | salary · contract type · remote/hybrid/onsite · sector |
| Plant hire | day rate / week rate · reach · capacity · availability |
| Member directory | role · region · specialism · verified? |

All variants share the same outer card chrome; only the key-stats row swaps.

## Map view (Deliverable D)

Optional but design-locked:

- Toggle in sort row switches grid → split layout
- Left: vertical list of result cards (compact variant — photo + price + title + stats)
- Right: 60vh map with pin per listing
- Pin click → highlights matching card + opens lightweight tooltip with mini-card
- Card hover → highlights matching pin
- "Search this area" button appears when map pans (re-runs query within visible bounds)
- Phase B: cluster markers when count > 50

Fallback: if no `lat`/`lng` on listings, map toggle hides.

## Dark-section rhythm

Three intentional dark moments:
1. Hero (full-bleed photo with overlay — but search bar is on a light surface)
2. List-with-us CTA band (brand-primary)
3. Footer (near-black with regulator badges)

Listings body, category strip, featured band, why-us, reviews all run on cream/warm-white so the photos read.
