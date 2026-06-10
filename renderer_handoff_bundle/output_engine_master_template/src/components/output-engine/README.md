# Output Engine — React components

This folder is the production component set referenced in the parent README's "Files to create in the production codebase" table.

## File map

```
src/components/output-engine/
├── README.md                          ← this file
├── types.ts                           ← WizardData contract (every section reads a slice of this)
├── MasterTemplate.tsx                 ← page-level composition
├── index.ts                           ← public exports
├── styles/
│   └── master-template.css            ← shared base styles (oe-wrap, oe-eyebrow, oe-btn etc.)
├── fixtures/
│   └── brightside.ts                  ← canonical fixture for tests/Storybook
├── sections/
│   ├── SiteNav.tsx        (§1)
│   ├── JumpNav.tsx        (§1.5 sticky jump-nav, builds from DOM after mount)
│   ├── HeroSection.tsx    (§2  · dark · earned moment 1 · always renders)
│   ├── TrustBar.tsx       (§3  · skips when no logos)
│   ├── ProblemSection.tsx (§4  · skips when no pains)
│   ├── ServicesGrid.tsx   (§5  · always renders if ≥1 service)
│   ├── ProcessSection.tsx (§6  · skips when <2 steps)
│   ├── BookingInline.tsx  (Grow inline · Booking module)
│   ├── AboutSection.tsx   (§7  · skips when no story or headline)
│   ├── SocialProofSection.tsx (§8 · stats and testimonials gate independently)
│   ├── FAQSection.tsx     (§9  · skips when <2 FAQs)
│   ├── LatestPosts.tsx    (Grow inline · Social module · skips when <3 posts)
│   ├── CTABlock.tsx       (§10 · dark · earned moment 2 · always renders)
│   ├── CTABar.tsx         (§11 · brand-coloured · Email module fallback to "Get in touch")
│   └── SiteFooter.tsx     (§12 · framing chrome — doesn't count as a dark moment)
└── widgets/
    ├── VoiceAIWidget.tsx              (Grow floating · bottom-left)
    └── ChatbotWidget.tsx              (Grow floating · bottom-right)
```

## Composition contract

`MasterTemplate` is a one-shot composition. Every section reads its own slice of `WizardData` and returns `null` if its data is empty. **No conditional branching at the parent level** beyond the Grow module gating (Booking, LatestPosts, VoiceAI, Chatbot — these gate on `modules.enabled` because they're capability-based, not data-based).

The customer's brand colour is plumbed through `--site-primary` via an inline style on the root `<div>`. Section CSS reads `var(--site-primary)` only — never a hex literal.

## Styling

Each section ships its own scoped `<style>` block as a string literal, keyed under a `.oe-*` class namespace. Shared primitives (`.oe-wrap`, `.oe-eyebrow`, `.oe-btn`, `.oe-h2`, etc.) live in `styles/master-template.css`. This keeps Storybook stories self-contained — pull a single section into a story and its CSS comes with it.

If your house style is Tailwind + CSS modules instead, lift the `<style>` blocks into `<Component>.module.css` files and convert the `oe-` class refs to `styles.something`. The **CSS values** (radius, spacing, font-size) are the contract — class names aren't.

## Preset switching

Six preset CSS files live in `../../../presets/` (in this handoff bundle). Each one binds tokens under a `[data-preset="<name>"]` selector. Apply by setting `data-preset="modern"` on the rendered root (the `MasterTemplate` already does this from `data.preset`).

To change the preset at runtime, swap the `<link rel="stylesheet">` tag pointing at the preset file. To bake one preset in at build time, import the chosen CSS file directly.

## Wiring TODO for production

| Component | What to wire | Where |
|---|---|---|
| `BookingInline` | Real availability + service select → Booking edge fn | replace `useState`/mock days |
| `VoiceAIWidget` | onClick → Twilio dial flow | pass `onClick` prop from page |
| `ChatbotWidget` | onClick → open chat drawer | pass `onClick` + `unread` from page |
| `CTABar` | onSubmit → Email module subscribe endpoint | pass `onSubmit` from page |
| `SocialProofSection` | When `modules.reviews` enabled, augment `content.testimonials` with live feed | merge in the page-level loader |
| `LatestPosts` | When `modules.social` enabled, fetch posts | populate `content.socialPosts` upstream |
| `JumpNav` | Already self-wires from DOM | no action needed |

The visual contract is locked. Don't reinvent layouts when adding wiring — keep the JSX and replace the mocked state/handlers in place.

## Fixture-based testing

```ts
import { MasterTemplate, brightsideFixture } from "@/components/output-engine";

// Render full page
<MasterTemplate data={brightsideFixture} />

// Render minimum-7 page (services + about + CTA only)
<MasterTemplate data={{
  ...brightsideFixture,
  content: {
    ...brightsideFixture.content,
    trustLogos: [],
    pains: [],
    processSteps: [],
    stats: [],
    testimonials: [],
    faqs: [],
    socialPosts: [],
  },
}} />
```

The minimum-7 render should still feel deliberate — that's the conditional-rendering acceptance test in the parent README's verification checklist.
