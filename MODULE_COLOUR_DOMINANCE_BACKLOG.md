# Module colour dominance — revisit pre-launch

**Logged:** 31 May 2026
**Severity:** 🟢 Future / question — not a fix item yet
**Status:** Parked. Decision needed before launch but not before paying customer #1.

---

## The observation

Duncan, during a polish sweep of the Grow module screens (31 May 2026):

> *"if there is a module represented by that colour it needs to be more of that colour as sometimes on some screens it just looks like a lot of other colours and minimal main colour"*

The eleven Grow modules each have a locked colour per `COLOUR-SYSTEM.md`:

- Voice AI (Sarah) → coral `#be185d`
- Chatbot (Max) → violet `#7c3aed`
- CRM → blue `#2563eb`
- Booking → teal `#0f766e`
- Invoicing → emerald `#047857`
- Reviews → amber `#b45309`
- Email → indigo `#4f46e5`
- SMS → orange `#c2410c`
- Social → cyan `#0e7490`
- SEO → emerald `#047857`
- Print → slate `#475569`

In the live wizard, module colours appear on: the side menu wayfinding dot, the "Logic Wall Active" callout heading bar, the primary action button (sometimes), the active nav state. Beyond those surfaces, KPI tiles / status dots / section headers / icons use functional colours (success green, info blue, warning amber, etc.), NOT the module colour.

The question is whether that's the right balance, or whether the module colour should bleed into more surfaces on a per-module screen.

---

## Why this got parked (not fixed)

Two reasons:

**1. There is a real coherence argument for the current state.** If every CRM screen was predominantly blue, every Booking screen predominantly teal, every Invoicing screen predominantly emerald, you get eleven different-feeling apps inside one product. Functional colours (success / warning / info / error) doing their literal job across all modules is what makes the whole thing feel like one product. Module colour as wayfinding-only is a deliberate visual-coherence pattern.

**2. The cost of changing it is high and unbounded.** It would touch every Grow module page, every KPI tile, every status dot, possibly the GM primitives (`GMStatusBadge`, `GMLogicWallCard`, etc.) if they hard-code colours rather than reading a `--mod-active` variable from the page. Could be a half-day. Could be a week. And the "after" might not even look better — it might look louder and harder to read.

Duncan's own framing: *"if it has been made intentionally like that then we leave it but if he hasn't then we just need to tweak it"* — and the honest answer is "intentionally, probably correctly."

---

## What needs deciding before launch

One of three positions, and it needs to be a deliberate decision rather than drift:

**(A) Leave as is.** Module colour is wayfinding-only — appears on the side menu dot, Logic Wall bar, primary CTA, active nav state. Everything else uses functional colour. The system is one neutral product with eleven coloured wayfinding signals.

**(B) Add ONE more dominance signal per module.** E.g. the page title gets the module colour, OR the page wash gets a barely-perceptible module tint. Small change, contained scope, gives each module a touch more identity without breaking coherence. Probably half a day of careful work.

**(C) Full per-module theming.** Most KPI dots, section headings, and accent elements take the module colour. Loud. Bold. Risks the product feeling fragmented. Multi-day sweep, risks regression.

Default to (A) unless a real customer says "I can't tell which module I'm on" — which has never happened.

---

## What NOT to do

- Do not silently freelance this in a CSS sweep. It's an explicit design decision, not a polish item.
- Do not start with the GM primitives — start with the design question (A / B / C) and work backward to implementation.
- Do not address it before a paying customer. It's not a launch blocker; it's a polish question.

---

## When to revisit

- Pre-launch design pass with fresh eyes
- After first 3-5 paying customers have used the product — does anyone mention "I get lost between modules"?
- If a separate Claude Design session is being run for Grow module polish anyway, fold this in

## Effort estimate

- (A) zero effort — log decision and move on
- (B) half a day Claude Design + half a day Claude Code
- (C) 2-3 days, with real regression risk

---

*The Logic Wall principle for design: a colour either signals something specific or it's noise. Module colours as wayfinding signal a precise thing — "you are here." Spreading them across the page risks turning the signal into noise.*
