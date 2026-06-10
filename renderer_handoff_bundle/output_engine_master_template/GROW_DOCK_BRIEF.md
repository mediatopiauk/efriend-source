# Grow Dock & Module Panels — Design Brief

**Package date:** 12 May 2026
**Source:** `Master Template - Brightside.html` (Grow widgets section)
**Status:** Visual + interaction direction. Production wiring lives in companion specs.
**Companion docs:** `OUTPUT_ENGINE_MASTER_TEMPLATE_BRIEF.md`, `TYPOGRAPHY_MOOD_LIBRARY_BRIEF.md`, `README.md` (this folder)

---

## Context for the next session

The Output Engine master template already exists in this folder:
- `Master Template - Brightside.html` — full rendered comp (Modern preset, Brightside fixture)
- `src/components/output-engine/` — 12 section components + 2 widget components (Voice AI, Chatbot)
- `presets/*.css` — 6 visual presets, switchable via `[data-preset]` on `<body>`

**Current Grow module state:** widgets render as two separate floating elements — Voice AI bottom-left, Chatbot bottom-right. Per the locked architecture (`OUTPUT_ENGINE_MASTER_TEMPLATE_BRIEF.md` §7).

**What's changing:** the user has consolidated the floating widgets into a **single bottom-centre dock** with three coloured icon slots (Call · Book · Reviews) and an X to dismiss. Clicking each icon opens a small modal panel anchored above the dock. This is the new direction. **Your job is to take it from working-pattern to production-quality design.**

Current screenshots of the working pattern are in conversation history — three panels: Call Us (magenta), Book an Appointment (teal), Customer Reviews (orange).

---

## The locked pattern (don't reopen)

1. **Single dock, bottom-centre.** Dark pill, ~3–5 circular icon slots, dismissable.
2. **One panel per module.** Opens above the dock, anchored to its trigger icon.
3. **Colour per module.** Each module has a brand-accent colour (Voice = magenta, Booking = teal, Reviews = orange, Chat = purple). Used sparingly inside the panel; do not make the entire panel chrome that colour.
4. **Mobile = bottom sheet.** Same triggers, but panels slide up from the dock as a sheet (not floating modal).
5. **Each module is independently enabled.** Wizard Step 9 controls which appear. The dock auto-sizes; if only Booking is enabled, the dock shows one slot. If all four are enabled, four slots.

---

## Dock — production styling

Current state: dark pill, three solid-coloured icon circles (magenta phone, teal calendar, orange star), grey X.

### Fixes

| Issue | Resolution |
|---|---|
| Three brand-saturated colours compete | One **primary** slot (booking) at full brand colour and 4px larger. Other slots = neutral dark circles with white icon, brand-coloured ring on hover/active. |
| No labels | On hover (desktop): label appears above the icon as a small dark tooltip with arrow. Mobile: tap-and-hold for label, single tap opens panel. |
| X is too prominent | X becomes a small ghost button (24px, low-contrast) at the right end of the pill, outside the icon row. Or replace with chevron-down to signal "collapse." |
| No state when panel open | Active icon gets a brand-coloured ring + filled background. Inactive icons dim to 60%. |
| Pill height inconsistent | Lock to 64px tall, icons 44px (hit-target compliant). |
| Chatbot is separate | **Add chatbot as 4th slot in the dock.** Speech-bubble icon, purple ring. Retire the standalone bubble. |

### Dock states

- **Default:** dock visible, all enabled icons shown, no panel open.
- **Hover (desktop):** icon scales 1.05, tooltip label appears.
- **Active:** icon ring filled with module colour, other icons dim.
- **Dismissed:** dock collapses to single small circular FAB (bottom-right) with module count badge. Tap to re-expand.
- **Scrolled past hero:** dock fades in. Below hero only — don't compete with first impression.

---

## Module panels — shared system

All four panels share a layout skeleton. Only content + accent colour differs.

### Anatomy

```
┌──────────────────────────────────┐
│ ▍ Module title         × close   │  ← Header: 4px coloured top border,
│                                   │     white background, dark title,
│                                   │     close button right-aligned
├──────────────────────────────────┤
│                                   │
│ [hero element of the module]      │  ← e.g. phone number, calendar,
│                                   │     review average
│                                   │
│ [secondary content]               │  ← form, time slots, review cards
│                                   │
│ [primary action]                  │  ← brand-coloured CTA
│                                   │
├──────────────────────────────────┤
│ Powered by Brightside · Privacy   │  ← Footer: 11px, slate-500, optional
└──────────────────────────────────┘
```

### Dimensions

- Desktop: 380–440px wide, content-driven height, max 80vh with scroll.
- Mobile: full-width bottom sheet, 90vh max, scroll inside.
- Anchored 12px above dock with 12px arrow pointing down to the active icon.
- Backdrop on mobile: dim everything except dock + sheet (rgba(15,25,35,0.4)).

### Style rules

1. **White panel background.** No coloured chrome filling the panel.
2. **4px coloured top border** for accent (magenta / teal / orange / purple). Replaces the heavy solid headers.
3. **Title in foundation-dark.** Not white-on-colour.
4. **Brand colour is for actions and signals only** — primary CTA, selected states, status dots, star icons. Not chrome.
5. **Footer "powered by"** line — subtle, 11px, slate-500. Builds trust ("is this real?"). Optional per panel but standardised.
6. **Close button** is a 32px ghost button, top-right of header. Hits 44px tap area via padding.
7. **Border radius** uses `--preset-radius-lg` (varies by preset). Don't hardcode.
8. **Shadow** uses `--preset-shadow-lift`.

---

## Module 1 — Voice AI (Call Us) · magenta

**Trigger icon:** phone receiver
**Accent colour:** `--site-cta` family (magenta default; fully overrideable per customer brand)

### Panel contents

1. **Status pill** (below header)
   - Green dot + "Available now — tap to call"
   - Or amber dot + "AI answering tonight · team back 8am"
   - Logic: based on customer's business hours from Wizard Step 7.

2. **Hero: phone number**
   - Large (32px), brand-coloured, monospace-feeling type (tabular-nums)
   - Desktop: click-to-copy with "Copied ✓" toast
   - Mobile: `tel:` link, full-width tappable

3. **AI receptionist explainer**
   - "Sarah, our AI receptionist, answers 24/7"
   - 3 capability chips: `Pricing` `Availability` `Bookings`
   - Tells visitors what AI can/can't do, removes black-box anxiety

4. **Divider:** "Or request a callback"

5. **Callback form**
   - Name (text, required)
   - Phone (tel, required)
   - "How can we help?" (textarea, optional)
   - Submit: "Request callback"
   - Below button: "Usually called back within 2 hours" (or set per customer)

6. **Footer:** "Voice by Brightside · Privacy"

### Behaviour

- If business is closed and AI is disabled: status pill goes red, hero number replaced with "We're closed — leave a callback request below."
- After successful submission: replace form with success state — "Got it. Sarah will call you back within 2 hours."
- Honour `prefers-reduced-motion`.

### Wizard data

```ts
voiceAI: {
  enabled: boolean;
  phoneNumber: string;      // E.164 format
  aiName: string;           // default "Sarah"
  capabilities: string[];   // chips, max 4
  callbackEnabled: boolean;
  callbackPromise: string;  // "within 2 hours" etc.
  hours: BusinessHours;     // from Step 7
}
```

---

## Module 2 — Booking · teal

**Trigger icon:** calendar
**Accent colour:** `--site-primary` family (teal default)

### Panel contents

1. **Header progress stepper**
   - 4 steps: Service · Date · Time · Details
   - Active step filled with brand colour, completed = dark, upcoming = grey

2. **"Next available" shortcut** (top of step 1)
   - "Next available: Thu 14 May, 10:30am — Book this →"
   - Brand-coloured outlined card
   - Skips to step 4 with that slot preselected
   - 60% of bookers take this path; it's the highest-value affordance

3. **Step 1 — Service**
   - Vertical list of services from `services[]`
   - Each row: name · duration · price · short description (one line)
   - Selecting advances to step 2

4. **Step 2 — Date**
   - Month calendar, weekday columns
   - Today: ringed
   - Selected: filled brand-coloured circle
   - Unavailable: grey, unclickable
   - Month nav: arrow buttons
   - **Desktop:** time slots show in right column as date is hovered (split pane)
   - **Mobile:** advances to step 3 on tap

5. **Step 3 — Time**
   - Grid of time pills, grouped morning / afternoon / evening
   - Greyed if booked
   - Tap = advance to step 4

6. **Step 4 — Details**
   - Name, email, phone, notes
   - Service + slot summary card at top (editable: tap to go back to that step)
   - "Confirm booking" CTA

7. **Footer:** "Booking by Brightside · Privacy · Cancellation policy"

### Behaviour

- Live availability fetched from booking edge function (already noted in `src/components/output-engine/README.md`).
- Disabled days computed from rota + bookings.
- Optimistic UI: confirm booking shows success immediately, queues retry on network failure.
- Email + SMS confirmation handled server-side.

### Wizard data

```ts
booking: {
  enabled: boolean;
  services: BookingService[]; // already in WizardData.services
  rota: Rota;                  // from Step 7
  cancellationPolicy: string;
  emailConfirmation: boolean;
}
```

---

## Module 3 — Reviews · orange

**Trigger icon:** star
**Accent colour:** orange (`#c2410c` family) — or warm gold for Classic preset

### Panel contents

1. **Aggregate score block**
   - 5 stars (filled to average) + "4.7" + "(47 reviews)"
   - Stars: orange/gold, large (24px)
   - Below: distribution bar
     ```
     5 ★ ████████████  38
     4 ★ ███           6
     3 ★ ▌             2
     2 ★               1
     1 ★               0
     ```
     Bars use brand colour, label = slate-600, count = slate-500 right-aligned.

2. **Filter chips row**
   - `All` `Google` `Facebook` `Trustpilot` `5★ only`
   - Active chip = brand-coloured outline + filled background
   - Dynamic based on which sources have reviews

3. **Review cards**
   - Author name, source badge (Google / Facebook / etc), star rating, body, date
   - Owner response if exists: indented, italic, "Reply from Brightside" label
   - Sort: most recent default; toggle for "highest rated"

4. **Bottom CTA**
   - "Leave a review on Google →" (deep-links to customer's Google business profile)
   - Brand-coloured outlined button
   - Single source CTA based on most-common review source

5. **Footer:** "Reviews from Google · Facebook · Trustpilot"

### Behaviour

- Live feed from Reviews Grow module (pulls every N hours, cached).
- Empty state: "No reviews yet — be the first to leave one."
- Loading state: 3 skeleton cards.

### Wizard data

```ts
reviews: {
  enabled: boolean;
  sources: ('google' | 'facebook' | 'trustpilot')[];
  primarySource: string;  // for "Leave a review" CTA
  feed: Review[];          // live, not stored in wizard
  aggregate: {
    average: number;
    total: number;
    distribution: Record<1|2|3|4|5, number>;
  };
}
```

---

## Module 4 — Chatbot · purple

**Trigger icon:** speech bubble
**Accent colour:** purple (`#7c3aed` family)

**Status:** currently floats as separate bubble. **Move it into the dock as the 4th slot.**

### Panel contents

1. **Welcome message** (bot, top of thread)
   - "Hi! I'm Brightside's chatbot. Ask me about pricing, services, or availability."

2. **Suggested prompts** (chips, below welcome)
   - "What does a full groom cost?"
   - "When's your next availability?"
   - "Do you take nervous dogs?"
   - Customer-configurable in Wizard Step 9

3. **Thread**
   - User messages: right-aligned, brand-coloured bubble
   - Bot messages: left-aligned, slate-100 bubble
   - Typing indicator: 3-dot animation
   - Timestamps: subtle, on hover

4. **Input row** (sticky bottom of panel)
   - Text input, send button
   - "Powered by AI · responses may be inaccurate" 11px disclaimer below

5. **Escalation affordance**
   - If bot can't answer or user types "human": surface a card mid-thread offering "Switch to phone" / "Request callback" — both deep-link to the Voice AI panel pre-filled.

### Behaviour

- Persists thread per session in localStorage.
- Hands off to Voice AI module if escalation triggered.
- Unread indicator on dock icon (red dot) if bot sends a proactive message and panel is closed.

### Wizard data

```ts
chatbot: {
  enabled: boolean;
  welcomeMessage: string;
  suggestedPrompts: string[];
  proactiveMessage?: { delay: number; text: string };
  escalationEnabled: boolean;
}
```

---

## Cross-cutting requirements

### Accessibility

- Dock is `role="toolbar"` with `aria-label="Quick actions"`.
- Each icon is `role="button"` with `aria-label` and `aria-expanded` state.
- Panel is `role="dialog"` with `aria-modal="true"` when open.
- Focus trap inside open panel; Escape closes.
- First focusable element receives focus on open; focus returns to trigger on close.
- All hit targets 44×44 minimum.
- All text/background pairs meet WCAG AA (4.5:1).

### Performance

- Lazy-load panel contents (don't render Booking calendar until panel opens).
- Suspense fallback: skeleton matching the panel skeleton.
- Don't ship chat thread history beyond last 20 messages.

### Mobile

- Panels become bottom sheets — full-width, slide up with backdrop.
- Dock stays visible above the sheet (or fades behind the active state — pick one and document).
- Swipe-down to dismiss the sheet.
- Sheets are scrollable internally; no body scroll lock issues.

### Theming

- Module accent colours come from `--site-primary`, `--site-cta`, `--review-color`, `--chat-color` — overrideable per customer brand. Document the four CSS custom properties.
- All radii, shadows, fonts inherit from the active preset (`[data-preset]` on body). Don't hardcode.
- Bold preset: increase border weight + drop shadow intensity per its tokens. Minimal preset: drop the 4px top border to 1px. Classic: header may be solid in muted brand for that preset specifically.

---

## Component structure (suggested)

```
src/components/output-engine/dock/
├── GrowDock.tsx              ← the bottom dock, renders enabled slots
├── DockSlot.tsx              ← single icon + tooltip + active state
├── ModulePanel.tsx           ← shared panel skeleton (header, footer, anchor arrow)
├── panels/
│   ├── VoiceAIPanel.tsx
│   ├── BookingPanel.tsx
│   ├── ReviewsPanel.tsx
│   └── ChatbotPanel.tsx
├── hooks/
│   ├── useDockState.ts       ← active panel, dismiss state, mobile detection
│   └── useFocusTrap.ts
└── styles/
    └── dock.css
```

Replace existing `widgets/VoiceAIWidget.tsx` and `widgets/ChatbotWidget.tsx` with the new `panels/` files; keep the same public interface (`<GrowDock data={wizardData} />`) so `MasterTemplate.tsx` only changes its import.

---

## Definition of done

- [ ] Single dock replaces two separate floating widgets.
- [ ] Dock renders 1–4 slots based on `wizardData.growModules` enabled flags.
- [ ] Hover labels (desktop), tap to open panel (all).
- [ ] All 4 panels built per anatomy above; white background + 4px coloured top border, not solid-coloured headers.
- [ ] Each panel includes the additions listed in its module section (status pill, suggested chips, distribution bar, etc).
- [ ] Mobile = bottom sheets with backdrop.
- [ ] Focus trap, Escape to close, focus returns to trigger.
- [ ] WCAG AA verified on each panel's text/background pairs.
- [ ] All radii / shadows / fonts come from preset tokens, not hardcoded.
- [ ] `MasterTemplate.tsx` import unchanged (drop-in replacement).
- [ ] Demo: open `Master Template - Brightside.html` and the dock + all 4 panels work end-to-end with the Brightside fixture.

---

## Out of scope (don't expand)

- Settings / preferences inside panels (handled in Wizard).
- Multi-language i18n (separate brief).
- Voice AI's actual telephony wiring (Twilio integration — separate spec).
- Booking's actual availability backend (edge function — separate spec).
- Reviews ingestion pipeline (separate spec).
- Chatbot LLM choice / prompt engineering (separate spec).
- Notification badges beyond unread chat dot.
- Cross-module deep-linking beyond the chat→voice escalation noted.

You are designing the **visible surface and interaction** — production wiring is documented elsewhere and the component interfaces are stable.
