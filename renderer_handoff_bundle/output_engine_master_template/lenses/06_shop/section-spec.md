# Lens 6 — Shop · Section Spec

**Shape:** Utility bar → mega-menu nav → rotating promo hero → trust strip → wholesale band (conditional, 3 states) → featured products row → category grid → filter sidebar + product grid + sort + pagination → featured collection band → reviews → newsletter → FAQ → multi-column footer with payment icons.

**Best fits:** independent retailers, manufacturers selling direct, wholesalers with trade members, craft/food/drink producers, hardware shops — the "fully-loaded shop" middle market.

## Sections (per brief §4)

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Utility bar | Free-shipping line + trade entry | shipping line | + tracking + help links |
| 2 | Mega-menu nav | Browse + cart + account | brand, 3 categories, search, cart | + account icon + mega-menus per category with featured product |
| 3 | Hero band | 3 rotating slides | 1 slide (latest sale OR featured) | 3 slides (sale + featured collection + new arrivals) with dot indicators |
| 4 | Trust strip | Shipping / returns / reviews / trade / payment icons | 3 trust items | 5 + payment icons row |
| 5 | Wholesale band *(conditional)* | Trade tier surfacing | 1 state (anonymous "Apply for trade") | All 3 states wired (anonymous / applicant / logged-in) |
| 6 | Featured products row | Bestsellers | 3 cards | 4–6 cards, mixed badges (sale/new/bestseller/low-stock) |
| 7 | Category grid | Visual category browse | 3 tiles | 4–8 tiles with category photo + product count |
| 8 | Filtered product grid | The actual shop | 6 products, no filters | 20+ products, filters + sort + pagination + chips |
| 9 | Featured collection band | Editorial breathing room | 1 collection feature | + seasonal / story-led |
| 10 | Reviews | Social proof | 3 reviews | + verified badges + trade-customer review |
| 11 | Newsletter | Email capture | input + button | + 10% incentive + brand-coloured band |
| 12 | FAQ | Shop-specific Qs | 4 Qs | shipping, returns, trade, vegan, payments |
| 13 | Footer | Multi-column + payment icons + legal | 3 columns | 5 columns + newsletter inline + payment icons + terms/privacy |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Categories in mega-menu | aggregated `product.category` *(existing)* | mega-menu featured = product flagged `featured: true` in that category |
| Hero slide #1 | products where `salePrice` set | "Up to N% off" computed |
| Hero slide #2 | `featuredCollection` *(new, optional)* | falls back to newest products |
| Hero slide #3 | products sorted by createdAt | "New arrivals" |
| Trust strip | `shopTrust[]` *(new — array of `{icon, label}`)* | shipping/returns/reviews/trade/payment-icons configurable |
| Wholesale band state | `wholesaleEnabled` + auth/applicant state | v1 = anonymous only; Phase 2 = full auth |
| Featured products row | `products.filter(p => p.featured)` *(uses new `featured` field)* | 4–6 cards |
| Category grid | aggregated `product.category` | image = category banner or first product image fallback |
| Product grid | `products[]` *(existing)* | filters: category, price range, scent/tag, sale, in-stock, trade-only |
| Product card | per product | badge from `product.badge` field |
| Card buy CTA | `product.buyMode` *(new: 'direct' \| 'enquire' \| 'both')* | direct → Stripe Payment Link; enquire → modal form |
| Featured collection | `featuredCollection` *(new)* | image + headline + body + CTA |
| Reviews | Reviews module Edge Function *(existing)* | aggregate stars + 3 latest reviews |
| Newsletter | Email module *(existing)* | optional 10% incentive copy |
| FAQ | `shopFaqs[]` *(new, optional)* | falls back to `faq[]` filtered to shop-relevant |
| Footer columns | `structure.footerColumns` *(existing)* | shop preset auto-populates Shop / Customer / About / Newsletter |
| Payment icons | `shopPayments[]` *(new — array of provider slugs)* | renders as text chips for v1, real SVGs Phase B |

## Three wholesale states — visual treatment

The wholesale band is the only single component in the lens with **three discrete visual states**:

| State | Background | Tag colour | Headline pattern | CTA |
|-------|-----------|-----------|------------------|-----|
| **Anonymous** | `--site-primary` deep forest | `--site-cta` brass on dark | "Trade account? Sign in for member pricing." | "Apply for trade →" (brass button) |
| **Applicant** *(applied, awaiting approval)* | warm brown (#6a4a14) | golden #ffd166 | "Hi [name] — we'll be in touch within 1 working day." | "View your application" (ghost) |
| **Logged-in trade** | deep red (`--beard-trade`) | soft pink #ffc8c8 | "Welcome back, [name] — trade pricing applied across the catalogue." | "Reorder past basket" (white pill) |

For v1: only anonymous state ships (form → CRM lead → owner manually switches tier). Applicant + logged-in states are wired Phase 2 once auth ships. **All three are rendered in the comp** so visual treatment is locked now.

## Product card variants

The card supports five badge states (`product.badge` field): `new`, `sale`, `low-stock`, `wholesale-only`, `bestseller`.
Plus the implicit "no badge" default.

- When `badge: sale` the card renders the `−N%` calculation in the badge AND shows the crossed-out original price.
- When `badge: wholesale-only` the price area shows "Trade login for pricing" instead of a price, AND the quick-add button becomes "Enquire for trade →" with a dark style.
- When customer is logged-in trade, the price area shows the standard price PLUS a `trade £X.XX` line in red.

## Buy / Enquire CTA design (Deliverable 4)

Two visually distinct, consistently-styled buy modes:

**Buy now (Mode A — direct):**
- Primary on-card hover-revealed button
- Style: white background, dark text, simple square
- Copy pattern: "Quick add — £18"
- Action: opens Stripe Payment Link in new tab → Stripe handles checkout
- Webhook on success: writes CRM customer + Invoicing record

**Enquire (Mode B — form):**
- Same button shape as Buy now, but dark background (`--f-dark`) with light text
- Copy pattern: "Enquire for trade →" or "Get a quote →"
- Action: opens a form modal (Phase B styling) → submits to CRM
- Owner replies / Sarah/Max can follow up

**Card-level pricing affordance:**
Buy-now products show price normally. Enquire products show "Trade login for pricing →" or "From £X — enquire" depending on whether a public price exists.

## Hero band slides (Deliverable 5)

Three slide variants, all 1920×500:

1. **s-sale** — Dark wine background (#2b1410 → #4a1b17 gradient), brass-yellow eyebrow + CTA, sale percentage in headline. For active sales.
2. **s-feat** — Brand-coloured solid (deep forest), brass eyebrow + CTA. For featured collections.
3. **s-new** — Cream background (default), brand-coloured CTA. For new arrivals. (Same styling as the cream default in the comp.)

**Auto-advance:** 6 seconds. **Manual:** prev/next chevrons + dot indicators. **Pause:** on hover.
On mobile the image half is hidden, text + CTAs centre.

## Filter sidebar (Deliverable 6)

**Desktop:** Always-visible left rail (240px). Each filter group separated by border.
**Tablet/mobile:** Drawer trigger ("Filters" button at top of grid) opens left-side slide-in drawer (Phase B).
**Active filters:** chip row above the grid with × to remove each + "Clear all" link.

Filter types:
- Category: multi-select checkbox with counts
- Price: dual-handle range slider
- Scent/tag: multi-select checkbox (scent-specific to Beardmore — for other shops becomes "Material" or "Brand" etc.)
- Toggles: On sale only · In stock only · Trade-only items

## Dark-section rhythm

This lens has **four dark moments by design** — necessary to break a long page:
1. Utility bar (very thin, brand-primary at top)
2. Wholesale band (brand-primary / amber / deep red depending on state)
3. Newsletter (brand-primary)
4. Footer (near-black)

Every other section is light/cream. The rhythm is: thin-dark → light → dark band → light → dark band → light → near-black footer.
