# Lens 9 — Directory / Listings · Gap-analysis rules

Directory / Listings is **catalogue-led** like Shop, but conversion is per-item enquire/book, not a basket. Gap analysis is most demanding on listing depth and the search hero.

## Required (lens refuses to render without)
- `brand.name`, `brand.primary`
- `hero.image`
- `listings[]` ≥ 8
- Every listing has: title, price (or `null` → renders "POA"), image, category, location
- `searchFields[]` configured (at least 2 fields)
- `directoryType` *(new — 'estate' / 'vehicle' / 'holiday' / 'recruitment' / 'plant-hire' / 'directory')* — sets card stats variant

## Minimum viable (renders, looks intentional)
- 12 listings across ≥ 3 categories
- 3 filter groups in sidebar
- 1 featured listing
- 3 reviews with role badges
- 3 why-us reasons
- Hero search with ≥ 3 fields

## Comfortable (recommended)

| Check | Rule | Message |
|-------|------|---------|
| Listings depth | ≥ 30 listings | "Directory shines with 30+ listings. You have N — looks light." |
| Featured tier | ≥ 4 listings flagged `featured: true` | "Featured band wants 4 spotlight listings. Mark 4 as featured." |
| Categories | ≥ 4 distinct categories | "Category strip wants 4+ to feel like a directory. You have N." |
| Filter coverage | every listing has filled key-stats fields for its type | "Listing 'X' missing bedrooms — sidebar filter won't pick it up." |
| Status badges | mix of new/reduced/sold across listings | "All listings look identical. Vary status badges to show market activity." |
| Geocoding | ≥ 80% listings have `lat`/`lng` | "Map view falls apart with missing coords. N listings have no geo." |
| Reviews with role | reviews include role badge | "Role-tagged reviews (buyer/tenant/seller) convert better than generic ones." |
| Regulator badges | ≥ 1 regulator in `regulators[]` | "Propertymark / RICS / ARLA / NAEA / TPO chips lift perceived legitimacy." |
| Photo quality | every listing has ≥ 1 image | "Listing 'X' has no photo. Card renders empty hero — looks broken." |

## Loaded (the lens at its best)

| Check | Rule | Message |
|-------|------|---------|
| Catalogue size | ≥ 100 listings | (passes silently when met) |
| Photo depth | listings average ≥ 4 photos each | "Detail pages need 4+ photos per listing. Phase B build will surface this." |
| Saved search | auth + saved-search wired | "Power users return via saved-search alerts. Wire it up Phase 2." |
| Why-us stats | every why-us reason has a hard stat | "Replace soft adjectives with hard stats — '27 years', 'N listings sold', 'X% above asking'." |
| List-with-us flow | dedicated supply-side form | "Build a real seller/lister onboarding — directory businesses live on supply growth." |
| Region offices | multi-office footer | "Single-office shows as regional. Multi-office reads as serious — list all locations." |
| Reduced/sold activity | ≥ 10% listings show recent reduce/sold | "Static directory feels dead. Show activity — recently sold, reduced last week." |

## Conditional gates (lens self-heals)

| Condition | Effect |
|-----------|--------|
| No `lat`/`lng` on any listing | Map toggle button hides. Grid view only. |
| `searchFields.length` < 2 | Hero collapses to headline only; sidebar filters take over the search job. |
| < 8 listings | Listings body hides entirely. Card grid replaced with "We're growing our catalogue — get in touch". |
| No featured listings | Featured band hides; category strip moves up against listings body. |
| `directoryType` unset | Card key-stats row defaults to generic (title + location + price only). |
| Single category | Category strip hides; sidebar category filter hides. |
| No reviews | Reviews section hides; trust shifts to regulator badges + why-us stats. |
| No `regulators[]` | Footer regulator row hides; legal links stay. |

## Deep-link targets

Every ✗ in the gap-analysis panel deep-links to its source wizard step:

| Gap | Deep-link target |
|-----|------------------|
| Listings depth | Wizard Content step → Listings importer |
| Listing fields | Wizard Content step → Listings · Field completeness audit |
| Search hero | Wizard Settings step → Hero search builder |
| Filter groups | Wizard Settings step → Filter sidebar builder |
| Categories | Wizard Content step → Listings (categorise) |
| Geocoding | Wizard Settings step → Geocoding · Re-run |
| Featured listings | Wizard Content step → Listings · Mark featured |
| Regulators | Wizard Settings step → Regulator badges |
| Reviews with role | Wizard Content step → Reviews · Add role tag |
| Directory type | Wizard Setup step → Directory type |
