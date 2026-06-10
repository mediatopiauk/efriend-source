# Phase A scope notes — Shop Lens

## Delivered in this session
- **Deliverable 1:** full responsive desktop comp (1440px, reflows tablet 1024 + mobile 640). `desktop-comp.html`
- **Deliverable 2:** `section-spec.md` with per-section padding, max-width, grid columns, data slot mapping
- **Deliverable 3:** wholesale tier visual treatment — all 3 states rendered inline in the comp
- **Deliverable 4:** Buy / Enquire CTA design — both visible on the product grid
- **Deliverable 5:** hero band slide variants documented (s-sale shown live in the comp; s-feat and s-new styled in CSS, content documented in section spec)
- **Deliverable 6:** filter sidebar — desktop full layout live; active-filter chip row live above grid
- **Deliverable 7:** gap-analysis rules — `gap-analysis-rules.md` covers Minimum / Comfortable / Loaded tiers + 5 conditional gates (the lens self-heals when wholesale is off, no sales running, etc.)
- **Deliverable 8:** lens fits into the Step 6 gallery as Lens 6 — see `LENS_GALLERY.html` (gallery updated this session, premium placeholder removed)

## Beardmore & Sons fixture
- Bristol-based independent traditional soap & shaving supplier (est. 1962)
- 4 categories: Shaving soaps · Aftershaves · Razors & brushes · Gift sets
- 39 catalogue products (shown: 4 featured + 6 grid samples)
- Brand: deep forest `--site-primary` + brass `--site-cta`
- Wholesale tier: trade for barbershops/hotels — deep red treatment when logged in
- All product/review/category copy is fixture, not real

## Deferred to Phase B
- **Dedicated mobile/tablet comp HTML files** — the responsive HTML covers both breakpoints. Dedicated files are easy follow-ups if you want them.
- **Mobile filter drawer interaction** — designed in spec, not implemented as JS in the comp
- **Hero band auto-advance JS** — only slide 1 (sale) renders. Slides 2+3 documented in spec, full CSS states pre-wired (`.s-feat` `.s-new`). Carousel logic is a Claude Code task, not visual.
- **Quick-view modal** — referenced as Phase 2 in brief
- **Enquire form modal** — opens from product card, modal styling deferred
- **Real SVG payment-method icons** — currently text chips; swap to brand SVGs Phase B
- **Step 6 wizard chrome update** — same as the other lenses, Phase B
- **Consolidated WizardData type extension** — per-lens specs are in each `section-spec.md`; consolidated `types.ts` extension is Phase B

## What's NOT included per brief §8
- Account portal / order history
- Multi-product cart abstraction
- Real-time stock counting
- Product variants (size/colour)
- Per-product reviews
- Members area

These are all explicitly Phase 2 per the brief.

## Implementation TODOs for Claude Code

1. Extend `WizardData`:
   - product fields: `salePrice?`, `featured?`, `badge?`, `category` *(already present?)*, `buyMode`, `stripePaymentLinkUrl?`, `tradePricing?`
   - project fields: `wholesaleEnabled`, `featuredCollection?`, `shopTrust[]`, `shopPayments[]`, `shopFaqs[]`, `newsletter.incentive?`
2. Build `<ShopLens>` React component matching the comp structure
3. Wire Stripe Payment Link flow + webhook (CRM customer + Invoicing record)
4. Wire Enquire form modal → CRM lead with `product` context
5. Wholesale band state machine: anonymous (form → CRM lead) → applicant → logged-in trade (Phase 2 — full auth)
6. Filter + sort + pagination state via URL params (shareable filtered views)
7. LocalBusiness + Product JSON-LD schemas in `<head>` (SEO)
