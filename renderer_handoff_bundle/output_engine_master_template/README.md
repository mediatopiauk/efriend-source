# Output Engine — Master Template Handoff

**Package date:** 10 May 2026
**Source design:** `Master Template - Brightside.html` (this folder, root)
**Companion docs in main repo:** `OUTPUT_ENGINE_MASTER_TEMPLATE_BRIEF.md` (Part A — visual), `OUTPUT_ENGINE_SEO_COMPLIANCE_SPEC.md` (Part B — engineering), `DESIGN_COMPLIANCE_HARD_RULE.md`, `COLOUR-SYSTEM.md`, `PROJECT_AUDIT_2026-04-30-rev4.md`

This package is the visual specification for the locked **Output Engine master template** — the single-page-default site that every customer's wizard data renders into. Faithful implementation, no design latitude (Operational Rule 6).

---

## What's in this folder

```
design_handoff_output_engine_master_template/
├── README.md                              ← you are here
├── Master Template - Brightside.html      ← the comp, open in browser
├── colors_and_type.css                    ← UMC design tokens (DO NOT FORK)
└── presets/                               ← the 6 visual-style token configs
    ├── modern.css       (default · Space Grotesk + Plus Jakarta · 12px)
    ├── minimal.css      (Inter / Inter · 4px · no shadow)
    ├── bold.css         (Archivo Black / Plus Jakarta · 8px · dramatic)
    ├── classic.css      (Playfair / Source Sans Pro · 6px · gold/navy)
    ├── playful.css      (Quicksand / Quicksand · 20px · soft)
    └── corporate.css    (Inter / Inter · 6px · navy/grey grid)
```

Open `Master Template - Brightside.html` in any browser. The fixture is **Brightside Dog Grooming** (Bristol) with the **Modern** preset applied. All 12 sections fire, every Grow module attach point is visible.

---

## Locked architecture (do not reopen)

Per `OUTPUT_ENGINE_MASTER_TEMPLATE_BRIEF.md`:

1. **One template, six token configs.** Section order, layout patterns, structure are identical across presets. Only colour, type, radius, shadow change.
2. **Single-page default output.** ~10–12 sections vertical. Multi-page is dormant capability.
3. **12 sections in fixed order.** Conditional rendering may skip empty sections; the order never changes.
4. **Max 2 dark "earned moments" per page.** Hero + CTA Block. Top nav and footer are framing chrome and don't count.
5. **Sticky jump-nav** below the main nav. Reflects only sections that rendered. No dead anchors.
6. **WCAG AA on every text/background pair.** Already documented in `COLOUR-SYSTEM.md`.
7. **Grow modules add features, not pages.** Booking inline section, Voice AI bottom-left widget, Chatbot bottom-right widget, Reviews live feed, Email capture in CTA bar, Social posts strip — all attach to the single page.
8. **Placeholders are placehold.co** parameterised with brand colour. Customers replace within days. Don't build a custom placeholder system.

---

## Section anatomy (12 sections in render order)

| # | Section | Theme | Always renders? | Wizard source | Component name |
|---|---|---|---|---|---|
| 1 | Top nav (sticky) | Light* | Yes | Step 1 brand · Step 3 nav · jump-anchors derived from rendered sections | `<SiteNav>` |
| — | Sticky jump-nav | Light | Yes | Derived (post-render) | `<JumpNav>` |
| 2 | Hero | **Dark** | Yes | Step 5 `heroHeadline` · `heroDescription` · `heroCTA` · `heroImage` | `<HeroSection>` |
| 3 | Logo bar / trust | Light | If `clients[]` or `pressLogos[]` non-empty | Step 5 trust signals | `<TrustBar>` |
| 4 | Problem framing | Light wash | If `audience.pains[]` ≥ 1 | Step 4 personas · Step 5 `problemStatement` | `<ProblemSection>` |
| 5 | Services | Light | Yes | Step 5 `services[]` (skip if 0) | `<ServicesGrid>` |
| 6 | Process | Light wash | If `processSteps[]` ≥ 2 | Step 5 `processSteps[]` | `<ProcessSection>` |
| 6.5 | **Booking** (Grow inline) | Wash → white | If Booking module enabled | Live availability from Booking edge fn | `<BookingInline>` |
| 7 | About | Light | Yes | Step 1 brand · Step 5 `aboutStory` + `aboutImage` | `<AboutSection>` |
| 8 | Social proof (testimonials + stats) | Light wash | If `testimonials[]` ≥ 1 OR `stats[]` ≥ 1 | Step 5 · Reviews module live feed if enabled | `<SocialProofSection>` |
| 9 | FAQ | Light | If `faqs[]` ≥ 2 | Step 5 `faqs[]` | `<FAQSection>` |
| 9.5 | **Latest from us** (Social Grow) | Wash | If Social module enabled and ≥ 3 posts | Auto-pulled from social feeds | `<LatestPosts>` |
| 10 | CTA block | **Dark** | Yes | Step 1 brand · Step 7 connections | `<CTABlock>` |
| 11 | CTA bar (newsletter) | Brand-coloured | Yes | Step 1 brand · Step 5 primaryCTA · Email module if enabled | `<CTABar>` |
| 12 | Footer | Dark navy | Yes | Step 1 brand · Step 3 footer · Step 7 contact | `<SiteFooter>` |

\* Top nav is currently light variant. Bold preset may flip to dark — covered by the preset token, not the component.

**Minimum viable page = 7 sections:** Nav · Hero · Services · About · CTA Block · CTA Bar · Footer. Everything else is optional and disappears when its data is empty (don't render with placeholder copy — skip the section entirely).

---

## Conditional rendering rules

1. A section disappears entirely if its source data is empty. **Don't render Process with three empty steps.**
2. Sections shift up; the order never changes. If Process is skipped, About slides up.
3. The sticky jump-nav is built **after** sections render, from the DOM. No hardcoded anchor list.
4. Section padding and rhythm never change. Light/dark alternation, vertical breathing room, max-width constraints stay constant. Only content density flexes.
5. Section heights are visually weighted regardless of content density. A site with 4 services and 1 testimonial should look as deliberate as one with 12 services and 8 testimonials — that's why max-widths and grid templates are fixed.

---

## The 6 visual style presets

Each preset is **a token configuration**, not a different template. The customer's brand colour overrides `--site-primary` regardless of preset.

| Preset | Heading font | Body font | Radius | Shadow | Vibe |
|---|---|---|---|---|---|
| **Modern** (default) | Space Grotesk | Plus Jakarta Sans | 12px | Subtle | Clean, generous whitespace |
| **Minimal** | Inter | Inter | 4px | None | Maximum whitespace, typography-driven |
| **Bold** | Archivo Black | Plus Jakarta Sans | 8px | Dramatic | Strong colours, statement typography |
| **Classic** | Playfair Display | Source Sans Pro | 6px | Warm | Serif headings, gold/navy palette |
| **Playful** | Quicksand | Quicksand | 20px | Soft | Vibrant, rounded, friendly |
| **Corporate** | Inter | Inter | 6px | Tight | Navy/grey, structured grids |

`presets/modern.css` is the canonical reference — the comp uses it. The other five files have been stubbed with the right token shape; production should fill them out and run them through the same Brightside fixture to confirm visual integrity.

The preset CSS file is loaded **after** `colors_and_type.css` in the document head. Switching preset = swapping that one file (or toggling a `data-preset="modern"` attribute on `<body>`).

---

## Wizard → slot mapping (production)

Every visible piece of content on the rendered page comes from wizard data. **No filler copy. No lorem ipsum.**

| Slot | Wizard source | Fallback if empty |
|---|---|---|
| Logo | `brand.logo` (Step 1) | Auto-generated text mark using `brand.businessName[0]` in `brand.primaryColor` |
| Site title in nav | `brand.businessName` | "Your Business" — practically never hits since wizard can't reach Step 10 without it |
| Hero headline | `content.heroHeadline` (Step 5) | AI-generate at deploy time from `brand.tagline` + `audience.primaryPersona.pain` |
| Hero subhead | `content.heroDescription` | AI-generate from `content.elevatorPitch` |
| Hero CTA text | `structure.primaryCTA` (Step 3) | "Get in touch" |
| Hero image | `content.heroImage` | `placehold.co/1600x900/{primaryColor}/ffffff?text={businessName}` |
| Services | `content.services[]` (Step 5) | If 0, skip section |
| About story | `content.aboutStory` | AI-generate from `brand.tagline` + `brand.founded` + `brand.industry` |
| Testimonials | `content.testimonials[]` | If 0 and Reviews enabled, pull live feed; else skip |
| Stats | `content.stats[]` | If 0, skip the stats row but keep testimonials |
| FAQs | `content.faqs[]` | If <2, skip section |
| Contact phone | `connections.phone` | Skip from CTA block |
| Contact email | `connections.email` | Skip from CTA block |
| Contact address | `connections.address` | Skip from CTA block |
| Footer links | `structure.pages[]` filtered to `navLocation === 'footer'` | Standard set: Privacy, Terms, Cookies, Accessibility |
| Schema markup | All of above + `seoKeywords` | Per Part B — never empty |

---

## Grow module attach points

Each module attaches to a specific surface. **The design must handle attach points whether the module is enabled or not.** Disabled = surface doesn't render or shows a generic alternative.

| Grow module | Attach point in this comp | Behaviour when disabled |
|---|---|---|
| **Voice AI (Sarah)** | Floating bottom-left pill widget · also appears as Hero secondary CTA "Call us now" | Widget hidden; phone link in nav still works |
| **Chatbot (Max)** | Floating bottom-right circle widget (violet, with notification dot) | Widget hidden |
| **Booking** | Inline section between Process and About (`<BookingInline>`) | Section hidden; "Book" CTAs route to contact form instead |
| **Reviews** | Pill above testimonials grid · live JSON feed augments `content.testimonials[]` | Pill hidden; static testimonials only |
| **CRM** | Contact form submit handler (no visible widget) | Form posts to email instead |
| **Members login** | Top nav link `Members →` + dedicated `/members` route (only multi-page exception) | Link hidden |
| **SEO Coach** | Invisible (schema markup, meta tags, GSC) | No-op |
| **Email** | Newsletter input in CTA bar (`<CTABar>`) · footer fallback | CTA bar shows generic "Get in touch" message instead |
| **SMS** | Invisible runtime (CRM-event triggered) | No-op |
| **Social** | "Latest from us" section between FAQ and CTA | Section hidden |
| **Print** | Invisible (dashboard module only) | No-op |
| **Invoicing** | Invisible (dashboard module only) | No-op |

The comp shows **all attach points firing** so we know everything has a home.

---

## Mobile reflow

The comp implements every section's mobile behaviour at `<900px` and `<540px` breakpoints. Production should keep these breakpoints — they line up with the wizard chrome's existing breakpoints.

| Surface | Desktop | Mobile (<900px) |
|---|---|---|
| Top nav | Horizontal links | Hamburger drawer (right slide-in) — comp shows the burger; drawer JS is TODO for prod |
| Sticky jump-nav | Pinned, full row | Horizontal scroll (no scrollbar) |
| Hero | 1.1fr / 1fr split | Stacked: text first, image below |
| Logo bar | 5 logos in a row | 3 visible (others hidden) |
| Services | 3-col grid | 1-col stack |
| Process | 4-col with horizontal connector | 1-col stack, connector hidden |
| Booking | 2-col card | 1-col stack |
| About | 1fr / 1.1fr split | Stacked, image first |
| Stats row | 4-col | 2x2 grid |
| Testimonials | 3-col | 1-col stack |
| FAQ | 1fr / 1.3fr split | Stacked |
| Latest posts | 3-col | 1-col stack |
| CTA block | 1.2fr / 1fr split | Stacked |
| CTA bar | Space-between | Stacked, full-width input |
| Footer | 1.6fr + 4×1fr | 2-col → 1-col at 540px |
| Voice AI widget | Pill with label | Compact circle, label hidden |
| Chatbot widget | 56px circle | 56px circle, repositioned |

---

## Motion + interactivity

The comp respects `motionEnabled` from Step 6 and `prefers-reduced-motion`. Implemented:

- **Sticky jump-nav active state** — `IntersectionObserver` with `rootMargin: '-30% 0px -60% 0px'`. Highlights underline transitions in 200ms.
- **Hero stat counter** — counts up on viewport entry. Disabled under reduced-motion.
- **Service cards on hover** — `box-shadow` lifts, border darkens. No translate, no scale.
- **FAQ accordion** — `max-height` transition with rotating chevron. 320ms.
- **Voice AI widget pulse** — radiating ring at 2s loop. Disabled under reduced-motion.

**Not implemented (intentionally):** parallax, scroll-jacking, large entrance animations, frosted glass, gradient meshes, glassmorphism, anything that screams "AI-generated."

---

## Implementation notes for Claude Code

- **Stack:** React + Tailwind. The comp uses static HTML + inline `<style>` because it's a single-file deliverable. Translate to React components per the table in §"Section anatomy" above. Use the existing Tailwind token map in `colors_and_type.css`.
- **One component per section.** Each component takes typed props matching the wizard data shape and handles its own conditional render (return `null` if data is empty — let the parent skip naturally instead of branching).
- **Token plumbing.** `colors_and_type.css` is the UMC system foundation. Each preset CSS file overrides a small set of tokens scoped to `[data-preset="<name>"]` on `<body>` (or as a separate `<link rel="stylesheet">` swap). Component CSS reads `var(--…)` only — never hex.
- **Site brand colour.** `--site-primary` is the customer's Step 1 colour. The renderer must inject it as a `<style>` tag in `<head>` before component CSS — overrides the preset default.
- **Sticky jump-nav.** Sits at `top: var(--nav-height)` so it pins under the main nav. Build the link list **after** the page renders by walking sections with `data-section` attributes and reading `data-section-label`. No hardcoded anchor lists.
- **Booking inline component** is a mock card in the comp. Production wires to the existing Booking edge fn (real Supabase) with double-book prevention. The visual contract — the dark info panel, light form panel, service-pick + calendar UX — is locked.
- **Grow widgets** (Voice AI, Chatbot) are real OpenAI/TwiML wirings — the comp's `<button>` elements are placeholders. Mount them via the existing `enabledModules` flag (Logic Wall #1 — currently broken; once fixed, this contract holds).
- **Schema markup.** Per Part B — `<script type="application/ld+json">` injected by the renderer based on whichever sections rendered. Not in this design's scope.
- **Placeholders.** All "image" rectangles in the comp are placehold.co-style tinted blocks. In production, swap for `<img src="{content.heroImage || generatePlaceholder(brand.primaryColor, businessName)}">`.

---

## Hard rules carried forward from the brief

1. **One master template, six token configurations.** Not six templates.
2. **The 12 sections are locked. The order is locked. The themes (light/dark) are locked.** Refine the *contents*, not the structure.
3. **WCAG AA on every text/background pair.** Already verified for the Modern preset; verify the remaining 5 at design time.
4. **Mobile is non-negotiable.** Every section has explicit reflow.
5. **No AI-vibe shortcuts.** No gradient-meshes, no purple glows, no glassmorphism.
6. **All copy reads as if written by a real business.** The comp uses Brightside fixture data; production substitutes wizard data. Never "Welcome to your business" placeholders.
7. **Every section must work in isolation.** A 7-section render must look as deliberate as a 12-section render.
8. **The Grow module attach points must be visible.** They are.
9. **No bespoke imagery in the design.** Tinted placeholders only.
10. **The CTA → conversion path must be defended visually.** From any scroll position, a CTA is visible or one tap away (sticky jump-nav, sticky chatbot, sticky CTA bar). Verified across all 12 sections.

---

## Files to create in the production codebase

| Production path | Source from comp |
|---|---|
| `site-renderer/src/components/master-template.tsx` | Page-level composition with conditional rendering |
| `site-renderer/src/components/sections/site-nav.tsx` | Section 1 |
| `site-renderer/src/components/sections/jump-nav.tsx` | Sticky jump-nav |
| `site-renderer/src/components/sections/hero-section.tsx` | Section 2 |
| `site-renderer/src/components/sections/trust-bar.tsx` | Section 3 |
| `site-renderer/src/components/sections/problem-section.tsx` | Section 4 |
| `site-renderer/src/components/sections/services-grid.tsx` | Section 5 |
| `site-renderer/src/components/sections/process-section.tsx` | Section 6 |
| `site-renderer/src/components/sections/booking-inline.tsx` | Grow inline (Booking) |
| `site-renderer/src/components/sections/about-section.tsx` | Section 7 |
| `site-renderer/src/components/sections/social-proof.tsx` | Section 8 |
| `site-renderer/src/components/sections/faq-section.tsx` | Section 9 |
| `site-renderer/src/components/sections/latest-posts.tsx` | Grow inline (Social) |
| `site-renderer/src/components/sections/cta-block.tsx` | Section 10 |
| `site-renderer/src/components/sections/cta-bar.tsx` | Section 11 |
| `site-renderer/src/components/sections/site-footer.tsx` | Section 12 |
| `site-renderer/src/components/widgets/voice-ai-widget.tsx` | Grow floating |
| `site-renderer/src/components/widgets/chatbot-widget.tsx` | Grow floating |
| `site-renderer/src/styles/presets/modern.css` | This bundle's `presets/modern.css` |
| `site-renderer/src/styles/presets/minimal.css` | This bundle's `presets/minimal.css` |
| `site-renderer/src/styles/presets/bold.css` | This bundle's `presets/bold.css` |
| `site-renderer/src/styles/presets/classic.css` | This bundle's `presets/classic.css` |
| `site-renderer/src/styles/presets/playful.css` | This bundle's `presets/playful.css` |
| `site-renderer/src/styles/presets/corporate.css` | This bundle's `presets/corporate.css` |
| `site-renderer/src/fixtures/brightside.ts` (new) | Translate the comp's inline data into a typed fixture for tests |

---

## Open questions for product (deferred)

1. **Hamburger drawer behaviour.** The comp shows the burger trigger on mobile; the drawer animation/contents are TODO. Spec it before merge.
2. **Live booking calendar source.** The comp's calendar is a static mock. Confirm the Booking edge fn exposes a 14-day availability window in the right shape.
3. **Reviews live feed shape.** The comp shows a "live feed" pill — confirm the Reviews module returns data in `{ author, body, rating, source }` shape so the existing testimonial card can render either source.
4. **AI fallback copy generation.** The mapping table says "AI-generate at deploy time" for hero/about fallbacks. Confirm which model + prompt is the contract — this is currently informal.
5. **Members login.** Only multi-page exception. Decide whether `/members` is a separate template or a stripped-down version of this one.

---

## Verification checklist before merge

- [ ] All 12 sections render in fixed order from a typed `WizardData` object.
- [ ] Empty-data sections skip cleanly (test with `services: []` → section absent, page still feels complete).
- [ ] Minimum 7-section render (Nav · Hero · Services · About · CTA · CTA Bar · Footer) looks as deliberate as the 12-section render.
- [ ] Sticky jump-nav active state tracks scroll position via IntersectionObserver.
- [ ] WCAG AA verified on all 6 presets' text/background combinations.
- [ ] Mobile reflow at 900px and 540px matches the comp.
- [ ] Reduced-motion preference disables the stat counter, voice widget pulse, and entry animations.
- [ ] Customer brand colour drives `--site-primary` across every preset.
- [ ] Voice AI / Chatbot widgets respect `enabledModules` flags (mount only when active).
- [ ] Booking inline section mounts only when Booking module is enabled.
- [ ] Schema markup (Part B) injects per rendered sections — never empty.
- [ ] Brightside fixture renders identically in prod to this comp.

---

*This design replaces every previous "rebuild the renderer" prompt and conversation about visual quality. After implementation, Claude Code's sole remaining job in the renderer is faithful translation. The visual blocker on revenue is closed.*
