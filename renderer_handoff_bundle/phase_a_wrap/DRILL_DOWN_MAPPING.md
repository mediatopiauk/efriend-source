# Drill-Down Mapping — every lens, every interactive element

**Phase:** A wrap-up
**Status:** Complete inventory of which interactive elements on each lens trigger which pattern
**Companion docs:** `MODAL_DRAWER_BRIEF.md` (architecture) · `system/modal/modal-loaded-showcase.html` (modals) · `system/drawer/drawer-loaded-showcase.html` (drawers) · `templates/template-A-…` / `template-B-…` / `template-C-…` (routed pages) · `system/mega-menu/mega-menu-spec.html` (mega-menu variants)

Each lens table covers **every interactive element on the landing page**, not just the headline drill-downs. References point back to specific section numbers in the modal showcase / drawer showcase / templates so Claude Code can find the exact pattern.

The five patterns:

| Code | Pattern | Reference |
|---|---|---|
| **A** | Jump-anchor — smooth-scroll, URL hash | `MODAL_DRAWER_BRIEF.md` §2 |
| **B** | Modal — centred overlay, ESC dismiss | `modal-loaded-showcase.html` |
| **C** | Drawer — side panel, persistent or modal-in-flow | `drawer-loaded-showcase.html` |
| **D** | Routed page — Template A / B / C | `templates/` |
| **E** | In-page state change — filter, accordion, toggle | inline in lens landing |

Modal sizes are S / M / L / XL (480 / 720 / 960 / 1140 px). Drawer sizes are S / M / L (360 / 480 / 640 px).

---

## Lens 1 — Editorial Foundation · Brightside

The default lens. Light chrome, two earned dark moments (hero + CTA bar), single-page-default.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav primary item (Services, Process, About, …) | click | A — jump-anchor | mega-menu-spec §1 (jump variant) |
| 2 | Top-nav "Get in touch" CTA | click | B — Modal M (enquiry) | modal-loaded-showcase §8 |
| 3 | Hero primary CTA | click | A — scrolls to booking inline | — |
| 4 | Hero secondary "Learn more" | click | A — scrolls to services | — |
| 5 | Service card "Learn more" | click | B — Modal M (service detail) | modal-loaded-showcase §5 |
| 6 | Service card price | click | A — scrolls to booking inline | — |
| 7 | Process step | click | E — expands inline detail | inline accordion |
| 8 | About founder portrait | click | B — Modal S (founder bio) | new — generic info modal (S) |
| 9 | Testimonial blockquote | click | B — Modal S (full review) | modal-loaded-showcase §7 (small variant) |
| 10 | "More reviews" link | click | A — jumps to reviews section · OR D — Template C if linking to a long-form piece | — |
| 11 | FAQ accordion question | click | E — inline expand | inline accordion |
| 12 | FAQ "more questions" link | click | B — Modal S (FAQ deep-link) | modal-loaded-showcase §9 |
| 13 | Booking section "Reserve" CTA | click | C — Drawer L (reservation multi-step) | drawer-loaded-showcase §2 |
| 14 | CTA bar primary button | click | B — Modal M (enquiry) | modal-loaded-showcase §8 |
| 15 | Footer link | click | A or D (Template C) for policy / blog pages | — |

---

## Lens 2 — Showcase Grid

Portfolio-led. Sparse text, dense imagery, the gallery is the value.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav category | click | A — scrolls to filtered section · OR E — filters grid | — |
| 2 | Top-nav "Get in touch" | click | B — Modal M (enquiry) | modal-loaded-showcase §8 |
| 3 | Hero CTA "See work" | click | A — scrolls to grid | — |
| 4 | Portfolio tile | click | B — Modal L (lightbox) | modal-loaded-showcase §10 |
| 5 | Lightbox prev / next | click / keyboard ← → | E — swaps modal content in place | modal-loaded-showcase §10 (browsing affordance) |
| 6 | Lightbox "View case study" link | click | B — Modal XL (case study) | modal-loaded-showcase §2 |
| 7 | Filter chip (category, year, medium) | click | E — filters grid in place · adds query param | — |
| 8 | "Load more" / pagination | click | E — appends to grid | — |
| 9 | About strip "Read more" | click | D — Template C (long-form about) | template-C-long-form |
| 10 | Testimonial / press strip | click | B — Modal S | modal-loaded-showcase §7 |
| 11 | CTA bar "Start a project" | click | B — Modal M (enquiry) | modal-loaded-showcase §8 |

---

## Lens 3 — Marketing Tiles

Bento-grid feature tiles. Each tile sells a feature or benefit.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav primary item | click | A — jump-anchor | mega-menu-spec §1 |
| 2 | Top-nav "Get a demo" CTA | click | B — Modal M (enquiry — "demo" variant) | modal-loaded-showcase §8 |
| 3 | Hero primary CTA "Start free" | click | D — Template C (signup) · OR B — Modal M | — |
| 4 | Hero secondary "Watch 90 s" | click | B — Modal L (video lightbox) | modal-loaded-showcase §10 (video) |
| 5 | Marketing tile (small) | click | B — Modal M (feature detail) | modal-loaded-showcase §6 (smaller variant) |
| 6 | Marketing tile (hero / wide) | click | B — Modal L (feature spotlight) | modal-loaded-showcase §6 |
| 7 | Tile comparison table | click | A — scrolls to full pricing table inline | — |
| 8 | Logo bar logo | click | B — Modal S (case-study snippet) · OR D — Template C | — |
| 9 | Pricing toggle (annual / monthly) | click | E — toggles inline | — |
| 10 | Pricing tier "Choose plan" | click | D — Template C (signup) · OR B — Modal M (enquiry) | — |
| 11 | FAQ question | click | E — inline expand · "See full answer" → Modal S | modal-loaded-showcase §9 |
| 12 | Footer "Changelog" / "Blog" | click | D — Template C | template-C-long-form |

---

## Lens 4 — Creative Immersive

Full-bleed, scroll-driven, expressive. Reserved for portfolio brands.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav (often collapsed in hero) | click hamburger | C — Drawer S (mobile nav style, even on desktop) | drawer-loaded-showcase §3 |
| 2 | Hero scroll-cue | scroll | E — page progresses through chapters | inline scroll-spy |
| 3 | Chapter section CTA "Open project" | click | B — Modal L | modal-loaded-showcase §10 |
| 4 | Portfolio item | click | B — Modal L (lightbox with case-study panel) | modal-loaded-showcase §10 |
| 5 | "Read the full story" inside modal | click | D — Template C (long-form) | template-C-long-form |
| 6 | Press / awards strip | click | B — Modal S (citation + link out) | new — generic info modal (S) |
| 7 | About text "Read more" | click | D — Template C | template-C-long-form |
| 8 | Booking strip CTA "Brief us" | click | B — Modal M (enquiry — "brief" variant) | modal-loaded-showcase §8 |
| 9 | Footer social | click | external link (target _blank) | — |

---

## Lens 5 — Local Authority

Reviews-first, locality-led. Used for service businesses where trust is the conversion lever.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav primary item | click | A — jump-anchor | mega-menu-spec §1 |
| 2 | Top-nav "Call us" | click | external `tel:` link | — |
| 3 | Hero CTA "Book a visit" | click | C — Drawer L (booking — only if booking is multi-step) · OR A — scroll to inline form | drawer-loaded-showcase §2 |
| 4 | Service card | click | B — Modal M (service detail) | modal-loaded-showcase §5 |
| 5 | Service card price | click | A — scrolls to booking | — |
| 6 | Testimonial tile | click | B — Modal M (customer review · prev/next) | modal-loaded-showcase §7 |
| 7 | "All 142 reviews" link | click | B — Modal L (review feed with filter) · OR D — Template B (reviews landing) | — |
| 8 | Trust badges | click | external link (target _blank) | — |
| 9 | Local-area paragraph "More about [area]" | click | D — Template B (area landing) | template-B-area-landing |
| 10 | FAQ accordion | click | E — inline expand | — |
| 11 | FAQ "deep-link to question" | click | B — Modal S | modal-loaded-showcase §9 |
| 12 | CTA bar primary | click | B — Modal M (enquiry) | modal-loaded-showcase §8 |
| 13 | Footer "About" / "Press" | click | D — Template C | template-C-long-form |

---

## Lens 6 — Shop

Beardmore & Sons (or any product business). The most interaction-dense lens.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav category (Shop by, Apparel, …) | click | E — in-page filter · adds `?category=` | mega-menu-spec §2 (filter variant) |
| 2 | Mega-menu sub-category | click | E — drills filter further in place | mega-menu-spec §2 |
| 3 | Mega-menu featured product | click | B — Modal L (quick view) | modal-loaded-showcase §1 |
| 4 | Top-nav search icon | click | C — Drawer S (search overlay) | new — search drawer (S) |
| 5 | Top-nav bag icon | click | C — Drawer M (bag) | drawer-loaded-showcase §1 |
| 6 | Top-nav "Sign in" | click | B — Modal S (login — Phase 2) | out of scope · Phase 2 |
| 7 | Hero CTA "Shop new" | click | A — scrolls to grid | — |
| 8 | Product card | click | B — Modal L (quick view) | modal-loaded-showcase §1 |
| 9 | Product card "Add to bag" (hover affordance) | click | C — Drawer M (bag opens, item added) | drawer-loaded-showcase §1 |
| 10 | Product modal "Add to bag" | click | C — Drawer M (bag opens) · modal closes | drawer-loaded-showcase §1 |
| 11 | Product modal "View full details" | click | D — Template A (product detail page — opt-in for SEO-worthy SKUs) | template-A-item-detail |
| 12 | Product modal reviews count | click | B — Modal M (review feed for that product) | modal-loaded-showcase §7 |
| 13 | Filter facet (size, colour, price) | click | E — filters grid in place · query param | — |
| 14 | Sort dropdown | click | E — re-orders grid | — |
| 15 | Bag drawer "Continue to checkout" | click | external link to Stripe Payment Link (v1) · drawer expands to multi-step modal (v2) | drawer-loaded-showcase §1 |
| 16 | Bag drawer "Minimise" | click | E — drawer collapses to pill (state retained) | drawer-loaded-showcase §1 (pill) |
| 17 | Bag drawer line "Remove" | click | E — line removed, totals update | — |
| 18 | Promo code apply | click | E — totals update inline | — |
| 19 | "Delivery info" inline link | click | B — Modal S (delivery + returns info) | new — generic info modal (S) |
| 20 | Footer "Order tracking" | click | B — Modal M (order-tracking form — Phase 2) | out of scope · Phase 2 |

---

## Lens 7 — Menu & Reservations

Forge & Crown (or any restaurant). Menu-first.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav "Menu" | click | A — jump-anchor | mega-menu-spec §1 |
| 2 | Top-nav "Reserve" CTA | click | C — Drawer L (reservation multi-step) | drawer-loaded-showcase §2 |
| 3 | Top-nav "Private hire" | click | B — Modal M (enquiry — "private hire" variant) · OR A — scroll to private-hire section | modal-loaded-showcase §8 |
| 4 | Hero "Book a table" | click | C — Drawer L (reservation) | drawer-loaded-showcase §2 |
| 5 | Hero "See menu" | click | A — scroll to menu | — |
| 6 | Menu tab (Lunch / Dinner / Sunday / Wine) | click | E — switches list in place | — |
| 7 | Menu item | click | B — Modal M (allergens + pairing + photo) | modal-loaded-showcase §3 |
| 8 | Menu item "Add to order" (only on takeaway mode) | click | C — Drawer M (order — Phase 2) | out of scope · Phase 2 |
| 9 | "Sample menu (PDF)" link | click | external link (target _blank) | — |
| 10 | Chef bio card | click | B — Modal S (full bio) | new — generic bio modal (S) |
| 11 | Testimonial / press strip | click | B — Modal S | modal-loaded-showcase §7 |
| 12 | "Read the story" feature | click | D — Template C (long-form) | template-C-long-form |
| 13 | Sticky bottom CTA "Reserve" | click | C — Drawer L | drawer-loaded-showcase §2 |
| 14 | Footer "Group bookings" | click | B — Modal M (group-booking form) | modal-loaded-showcase §8 (variant) |

---

## Lens 8 — Quote / Custom Build

Severn Cut (or any commission-based business). Past projects + quote builder.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav primary item | click | A — jump-anchor | mega-menu-spec §1 |
| 2 | Top-nav "Request a quote" CTA | click | C — Drawer L (quote-builder multi-step — Phase 2) · v1: B — Modal M (enquiry) | drawer-loaded-showcase §2 pattern · modal-loaded-showcase §8 |
| 3 | Capabilities tile | click | B — Modal M (capability detail) | modal-loaded-showcase §6 |
| 4 | Past project tile | click | B — Modal XL (case study) — default · OR D — Template A (item detail) if SEO-worthy | modal-loaded-showcase §2 · template-A-item-detail |
| 5 | Case-study modal "View full case study" | click | D — Template A | template-A-item-detail |
| 6 | Case-study modal prev / next (browsing) | click / keyboard | E — swaps modal content | — |
| 7 | Process step | click | E — inline expand to show detail | — |
| 8 | "Materials we work with" chip | click | B — Modal S (material info) | new — generic info modal (S) |
| 9 | Testimonial blockquote | click | B — Modal S | modal-loaded-showcase §7 |
| 10 | Workshop journal preview | click | D — Template C (long-form post) | template-C-long-form |
| 11 | FAQ accordion | click | E — inline expand | — |
| 12 | CTA bar "Request a quote" | click | C — Drawer L (Phase 2) · v1: B — Modal M | — |
| 13 | Footer "Workshop visits" | click | B — Modal M (booking enquiry) | modal-loaded-showcase §8 |

---

## Lens 9 — Directory / Listings

Hartcliffe & Crew (or any listings business). The **exception** lens — Template A / B are routed pages, not modals, because each listing needs a unique URL for Google.

| # | Element | Trigger | Pattern | Reference |
|---|---|---|---|---|
| 1 | Top-nav primary item (For sale / To rent / …) | click | D — Template B (filtered grid landing) | template-B-area-landing |
| 2 | Mega-menu area (Clifton, Bedminster, …) | click | D — Template B (area landing) — **routed nav variant** | template-B-area-landing · mega-menu-spec §3 |
| 3 | Mega-menu featured listing | click | D — Template A (item detail) | template-A-item-detail · mega-menu-spec §3 |
| 4 | Top-nav "Sign in" | click | B — Modal S (login — Phase 2) | out of scope · Phase 2 |
| 5 | Top-nav "Book a valuation" CTA | click | C — Drawer L (valuation booking multi-step) | drawer-loaded-showcase §2 pattern |
| 6 | Hero search panel "Search" | click | D — Template B (results page with filters applied) | template-B-area-landing |
| 7 | Hero search panel "Tab" (Sale / Rent / …) | click | E — swaps fields in place | — |
| 8 | Property card | click | D — Template A (item detail) — **default for L9, routed** | template-A-item-detail |
| 9 | Property card hover-peek button | click | B — Modal M (property preview) — quick scan before committing to the routed page | modal-loaded-showcase §4 |
| 10 | Property card "Save" / heart | click | E — toggles state · adds to saved searches | — |
| 11 | Filter sidebar (price, beds, type, must-haves) | change | E — filters grid in place · query param | — |
| 12 | "Save this search" button | click | B — Modal M (email-alerts opt-in) | modal-loaded-showcase §8 (variant) |
| 13 | Pagination | click | E — page changes · URL updates | — |
| 14 | Map pin | click | B — Modal M (compact property preview) | modal-loaded-showcase §4 |
| 15 | Agent panel "Book a viewing" | click | C — Drawer L (viewing booking) | drawer-loaded-showcase §2 pattern |
| 16 | Agent panel "Ask Tessa a question" | click | B — Modal M (agent-specific enquiry) | modal-loaded-showcase §8 |
| 17 | Area write-up "Read more" | click | D — Template C (long-form, L9 chrome) | template-C-long-form-lens9 |
| 18 | Reviews "All 612 reviews" link | click | D — Template B (reviews landing) · OR B — Modal L | — |
| 19 | Footer "Areas we cover" | click | D — Template B per area | template-B-area-landing |
| 20 | Footer "Blog / Press" | click | D — Template C | template-C-long-form-lens9 |

---

## Cross-lens utilities

These appear on every lens and behave identically:

| Element | Trigger | Pattern |
|---|---|---|
| Mobile menu (hamburger) | click | C — Drawer S (left-slide nav) — `drawer-loaded-showcase §3` |
| Cookie banner | first visit | B — Modal S (bottom-anchored on mobile, banner on desktop) |
| Toast notification (item added, search saved, etc.) | system event | E — inline, no modal |
| Search (when present) | click on search icon | C — Drawer S (full-screen on mobile, S-drawer on desktop) — *needs design, see Open questions* |
| Voice AI widget (Grow module) | tap on widget | C — Drawer S — already specced in Grow dock brief |
| Chatbot (Grow module) | tap on widget | C — Drawer S — already specced in Grow dock brief |

---

## Open questions

These elements appear in the inventory above but reference patterns that have **not been designed** in Phase A. Phase B / B+ work, not this session.

1. **Generic info modal (S)** — used by Lens 1 founder bio, Lens 4 press strip, Lens 6 delivery info, Lens 7 chef bio, Lens 8 materials info. The Modal S in the showcase (FAQ deep-link, `§9`) is the closest template — we should genericise its body region or design a sibling.
2. **Search drawer (S)** — referenced by Lens 6 and the cross-lens utility row. Not yet designed. Likely a faceted-search input + autosuggest + recent searches.
3. **Login / Register modal (S)** — Phase 2. All lenses with accounts (Lens 6, 9) will need it.
4. **Order-tracking modal (M)** — Phase 2. Lens 6 footer.
5. **Quote-builder drawer (L)** — Phase 2. Lens 8 v2 — same shell as the reservation drawer, different steps. v1 falls back to the enquiry modal.
6. **Email-alerts opt-in modal (M)** — Lens 9. Lighter variant of the enquiry modal; one email field + frequency picker + checkbox.
7. **Reviews-feed modal (L)** — Lens 5 / Lens 9. A scrollable, filterable feed of customer reviews. Could be a routed Template B instead — pick per fixture.

None of these block the 12-day implementation roadmap. Phase B can stub them with the existing enquiry / info modals and refine once real data is flowing.
