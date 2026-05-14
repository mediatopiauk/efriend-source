# 🚨 HARD RULE — Visual / Design Work Compliance

**Logged:** 7 May 2026
**Status:** 🔴 Non-negotiable. Pre-launch blocker for design consistency.

---

## The rule

**Every visual change to the UXMC product MUST conform to `COLOUR-SYSTEM.md` and `PROJECT_SOUL.txt` operational rules. No exceptions.**

If Claude is about to:
- Pick a colour
- Pick a font
- Style a card, panel, button, badge, pill, or any visual surface
- Modify or create a component with visual properties

**Then Claude MUST first re-read `COLOUR-SYSTEM.md` and apply the documented CSS variables. Not from memory. Not by pattern-matching from old code. Read the file every time.**

---

## What kept going wrong (7 May 2026 session and earlier)

Duncan called this out **multiple times** during the 7 May session:

> *"i think if any design work comes up you need to say as it must be carried out in the new colour palette - you have reverted to making boxes fucking yellow and that fucking horrible space font"*

> *"FUCKING STOP DOING IT"*

The pattern: Claude pattern-matched visual decisions from older code that itself didn't follow `COLOUR-SYSTEM.md`. Result: drift propagating across the codebase. Yellow `#fef3c7` info backgrounds. `Space Grotesk` on body text. Amber borders on neutral content cards. Using hex values directly instead of `--uxmc-*` variables.

Every freelanced design decision creates work for Duncan to come back and undo. **That is the worst possible outcome and must stop.**

---

## The compliance checklist Claude MUST run before ANY visual change

### 1. Re-read `COLOUR-SYSTEM.md` from disk
Don't trust memory. The colour system is the source of truth. It is NOT cached in Claude's training data.

### 2. Use documented CSS variables, not hex literals

✅ `background: 'var(--uxmc-ice)'`
❌ `background: '#F0F9FF'`

✅ `border: '1px solid var(--foundation-pale)'`
❌ `border: '1px solid #e2e8f0'`

The variables are listed in `COLOUR-SYSTEM.md` Section "CSS VARIABLES BLOCK".

### 3. Use the right colour for the right semantic role

**Foundation:** dark / navy / slate / mid / light / pale / wash / ice / white
**Brand:** indigo (primary, "exploration"), coral (CTA, "conversion")
**Module-specific:** voice / chatbot / crm / booking / invoice / reviews / email / sms / social / seo / print
**Semantic:** success (`#047857`) / warning (`#b45309`) / error (`#dc2626`) / info (`#2563eb`)

**Yellow / amber is ONLY for warnings.** Not for info cards. Not for "expert assessment" panels. Not for verdict displays. Not for tips. **Only for actual warnings.**

If Claude finds itself reaching for `#fef3c7` / `#fde68a` / `#fcd34d` / `#b45309` for anything other than a literal warning state, **stop and pick a foundation colour instead.**

### 4. Typography — `Space Grotesk` is display-only

`Space Grotesk` (`var(--font-display)`) is for:
- Section headings
- Big numbers / KPIs
- Display-style brand text

`Plus Jakarta Sans` (`var(--font-body)`) is for:
- Body copy
- Form labels
- Microcopy
- Help text
- Button labels
- Anything that's not a heading

If Claude is about to apply `var(--font-display)` to anything that isn't a heading, **stop and use the body font instead.**

### 5. Sections — sparingly use dark backgrounds

`COLOUR-SYSTEM.md` says:
> Maximum 2 dark sections per page (hero + final CTA, or 1 mid-page feature)

Don't make every panel dark. Don't make every panel coloured. The site is white-first. Default to white background, `var(--uxmc-pale)` border, dark text. Add tint only when there's a reason.

### 6. Contrast — verified WCAG AA only

Don't pick colours by eye. Every text/background combination in `COLOUR-SYSTEM.md` has a documented contrast ratio. If Claude needs a new combination, it MUST verify the contrast ratio passes AA (4.5:1 for normal text, 3:1 for large text) before shipping.

If Claude can't verify, **flag the design choice and ask the user / wait for Claude Design** rather than freelance.

---

## When Claude must STOP and ask, not freelance

Claude must stop and explicitly ask "should this go to Claude Design first?" when about to:

- Create a new card / panel / surface that doesn't have an obvious counterpart in `COLOUR-SYSTEM.md`
- Style a feature with bespoke visual treatment (gradients, shadows, custom borders)
- Pick a colour for a state that isn't documented (a new warning sub-type, a custom highlight, etc.)
- Build a custom layout that mixes typography weights, sizes, or treatments
- Apply animation, transition, or motion that wasn't already in the codebase

**Per `PROJECT_SOUL.txt` Operational Rule 6 (and audit Op Rule 6):**
> *"Use Claude Design for the master Output Engine template. Claude Code implements, it does not design."*

That rule extends to ALL meaningful visual work, not just the master template.

---

## Specific known violations Claude must fix

These are visible right now in the live wizard and need correcting:

### Chief UX Verdict card (Step 5 sidebar)
- **Current:** custard yellow background (`#fef9c3` or similar), amber border, possibly Space Grotesk on body text
- **Should be:** white background, `var(--foundation-pale)` border, `var(--foundation-dark)` heading in `var(--font-display)`, body in `var(--font-body)`. Score chip uses `--uxmc-success` for good scores, `--uxmc-warning` for genuine warnings, `--uxmc-info` for informational. **No yellow as a default state.**

### Other likely drift instances (audit needed)
- Tooltip backgrounds — if any are yellow/amber/non-system colours
- Persona cards in Step 4
- Archetype tiles in Step 1
- Any "premium" or "tip" boxes throughout the wizard
- Any hover states that introduce non-system colours

---

## Workflow that prevents this from happening again

1. **Before ANY visual change**, Claude:
   a. Re-reads `COLOUR-SYSTEM.md`
   b. States out loud (in the response) which CSS variables it's about to use
   c. Tells Duncan if it's about to make a design choice that should go through Claude Design
   d. Waits for Duncan's confirmation if it's anything novel

2. **For genuinely new visual surfaces**, Claude refuses to freelance and instead writes a Claude Design brief that Duncan can paste into a Claude Design session.

3. **For pure code-implementation work** (someone else's design output), Claude implements faithfully without inserting its own visual decisions.

---

## Why this rule is hard

Honesty about the failure mode: Claude pattern-matches visual decisions from training data and the surrounding codebase. The codebase contains old non-compliant code from before the colour system was locked. Pattern-matching from there produces violations. **The only fix is to break the pattern-match and read the source of truth every time.**

Memory of past projects, intuition about "what looks right", existing components in the same file — none of these are valid sources for visual decisions. Only `COLOUR-SYSTEM.md` and Claude Design output are valid sources.

---

## Penalty for re-violation

Every freelanced design decision creates technical debt that Duncan has to pay back. If Claude continues to violate this rule after this document exists:

- Duncan loses confidence
- The product accumulates inconsistency
- Pre-launch polish work explodes from "fix obvious things" to "audit every component for drift"
- The first paying customer sees an inconsistent product

**There are no shortcuts that justify violating this. There is no "minor freelance" exception. There is no "I had to make a quick choice" exception. Read the colour system. Use the variables. If unsure, ask.**

---

*This document supersedes any prior implicit assumption that Claude has design taste. Claude does not. Claude implements designs from `COLOUR-SYSTEM.md` and Claude Design only.*
