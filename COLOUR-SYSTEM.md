# UX Master Chief — Colour System
## Source of Truth — Locked. No Deviation.

**Date:** 10 February 2026
**Status:** APPROVED — Every page must use these exact values
**Standard:** WCAG AA compliant — every text/background combination tested

---

## DESIGN PHILOSOPHY

White-first, colour-rich, premium software feel. The site breathes — generous white space with vibrant colour that each serves a psychological purpose. Dark sections are used sparingly for dramatic contrast (max 2 per page), not as the default. Every colour has a job. No colour is decorative-only.

---

## FOUNDATION COLOURS

| Variable | Hex | Purpose | Notes |
|---|---|---|---|
| `--uxmc-dark` | `#0f1923` | Dark section bg, headings on light bg | 17.74:1 on white |
| `--uxmc-navy` | `#1a2736` | Footer bg, secondary dark bg | 15.14:1 white text |
| `--uxmc-slate` | `#2d3d4f` | Body text on light backgrounds | 11.10:1 on white |
| `--uxmc-mid` | `#64748b` | Secondary text on LIGHT bg only | 4.76:1 on white ✅ |
| `--uxmc-light` | `#94a3b8` | Secondary text on DARK bg only | 6.92:1 on dark ✅ |
| `--uxmc-pale` | `#e2e8f0` | Borders, dividers, text on dark bg | 14.39:1 on dark |
| `--uxmc-wash` | `#f1f5f9` | Light section backgrounds | — |
| `--uxmc-ice` | `#F0F9FF` | Soft blue tint sections (from brand) | — |
| `--uxmc-white` | `#ffffff` | Primary background | — |

### CRITICAL RULES:
- `--uxmc-mid` (#64748b): NEVER use on dark backgrounds (fails at 3.73:1)
- `--uxmc-light` (#94a3b8): NEVER use on light backgrounds (fails at 2.56:1)
- Text on `--uxmc-ice` sections: use same colours as on white — all pass

---

## PRIMARY BRAND COLOURS

| Variable | Hex | Role | Psychology |
|---|---|---|---|
| `--uxmc-indigo` | `#4f46e5` | Primary brand, headings, links, primary buttons | Intelligence, trust, premium, creativity |
| `--uxmc-indigo-light` | `#818cf8` | Indigo text on dark backgrounds | 5.95:1 on dark ✅ |
| `--uxmc-indigo-wash` | `#e0e7ff` | Indigo tint backgrounds, badges | — |
| `--uxmc-coral` | `#be185d` | CTA buttons, action triggers, urgency | Energy, excitement, "do this now" |
| `--uxmc-coral-light` | `#ec4899` | Coral on dark backgrounds, decorative | 5.03:1 on dark ✅ |
| `--uxmc-coral-wash` | `#fce7f3` | Coral tint backgrounds, badges | — |

### USAGE:
- **Indigo** = the brand. Nav active states, section labels, text links, "See more" actions, primary buttons where action is informational (e.g. "See the Platform", "Learn More")
- **Coral** = the conversion colour. "Get Started", "Start Now", "Run Free Audit" — anything that moves the user towards signup/purchase. Used sparingly so it always stands out.

### CONTRAST VERIFICATION:
- `#4f46e5` on white: **6.29:1** ✅ (normal text)
- `#4f46e5` on ice blue: **5.90:1** ✅ (normal text)
- White on `#4f46e5` btn: **6.29:1** ✅ (normal text)
- `#be185d` on white: **6.04:1** ✅ (normal text)
- `#be185d` on ice blue: **5.66:1** ✅ (normal text)
- White on `#be185d` btn: **6.04:1** ✅ (normal text)
- `#818cf8` on dark: **5.95:1** ✅ (normal text)
- `#ec4899` on dark: **5.03:1** ✅ (normal text)

---

## MODULE COLOURS

Each of the 11 modules has its own colour for wayfinding and instant recognition. All pass AA on white AND ice blue backgrounds.

| Module | Variable | Hex | Icon | Rationale | On White | On Ice |
|---|---|---|---|---|---|---|
| Voice AI (Sarah) | `--mod-voice` | `#be185d` | fa-phone | Coral/warm — human connection, conversation | 6.04:1 ✅ | 5.66:1 ✅ |
| Chatbot (Max) | `--mod-chatbot` | `#7c3aed` | fa-comment-dots | Violet — AI, digital intelligence | 5.70:1 ✅ | 5.35:1 ✅ |
| CRM | `--mod-crm` | `#2563eb` | fa-address-book | Blue — trust, reliability, relationships | 5.17:1 ✅ | 4.85:1 ✅ |
| Booking | `--mod-booking` | `#0f766e` | fa-calendar-check | Teal — calm, organised, scheduled | 5.47:1 ✅ | 5.13:1 ✅ |
| Invoicing | `--mod-invoice` | `#047857` | fa-file-invoice-dollar | Emerald — money, growth, financial | 5.48:1 ✅ | 5.14:1 ✅ |
| Reviews | `--mod-reviews` | `#b45309` | fa-star | Amber — gold stars, premium, social proof | 5.02:1 ✅ | 4.71:1 ✅ |
| Email | `--mod-email` | `#4f46e5` | fa-envelope | Indigo — brand consistency, professional | 6.29:1 ✅ | 5.90:1 ✅ |
| SMS | `--mod-sms` | `#c2410c` | fa-message | Orange — urgent, immediate, attention | 5.18:1 ✅ | 4.86:1 ✅ |
| Social | `--mod-social` | `#0e7490` | fa-share-nodes | Cyan — connection, network, sharing | 5.36:1 ✅ | 5.03:1 ✅ |
| SEO | `--mod-seo` | `#047857` | fa-chart-line | Emerald — growth, climbing, results | 5.48:1 ✅ | 5.14:1 ✅ |
| Print | `--mod-print` | `#475569` | fa-print | Slate — physical, grounded, professional | 7.58:1 ✅ | 7.11:1 ✅ |

### MODULE WASH COLOURS (for icon backgrounds, badges, tinted sections):

| Module | Wash Hex |
|---|---|
| Voice AI | `#fce7f3` |
| Chatbot | `#ede9fe` |
| CRM | `#dbeafe` |
| Booking | `#ccfbf1` |
| Invoicing | `#d1fae5` |
| Reviews | `#fef3c7` |
| Email | `#e0e7ff` |
| SMS | `#ffedd5` |
| Social | `#cffafe` |
| SEO | `#d1fae5` |
| Print | `#f1f5f9` |

---

## BUTTON SYSTEM

| Button Type | Background | Text | Hover BG | Use For |
|---|---|---|---|---|
| Primary CTA | `--uxmc-coral` (#be185d) | White | `#9f1239` | Get Started, Sign Up, Run Audit — conversion actions |
| Secondary | `--uxmc-indigo` (#4f46e5) | White | `#4338ca` | See Platform, Learn More, View All — exploration actions |
| Dark | `--uxmc-dark` (#0f1923) | White | `#4f46e5` | Alternative primary on light sections |
| Outline | transparent | `--uxmc-dark` | `--uxmc-ice` bg | Secondary actions, "Preview First", paired with CTA |
| Ghost (on dark bg) | rgba(255,255,255,.08) | White | rgba(255,255,255,.15) | Secondary action on dark sections |

### BUTTON CONTRAST VERIFICATION:
- White on coral (#be185d): **6.04:1** ✅
- White on coral hover (#9f1239): **8.02:1** ✅
- White on indigo (#4f46e5): **6.29:1** ✅
- White on indigo hover (#4338ca): **7.90:1** ✅
- White on dark (#0f1923): **17.74:1** ✅

---

## SECTION BACKGROUNDS

| Section Type | Background | Text Colour | Heading Colour | Accent Text |
|---|---|---|---|---|
| Default | `--uxmc-white` | `--uxmc-slate` | `--uxmc-dark` | `--uxmc-indigo` |
| Soft | `--uxmc-wash` | `--uxmc-slate` | `--uxmc-dark` | `--uxmc-indigo` |
| Ice | `--uxmc-ice` | `--uxmc-slate` | `--uxmc-dark` | `--uxmc-indigo` |
| Dark (sparingly) | `--uxmc-dark` | `--uxmc-pale` | `--uxmc-white` | `--uxmc-indigo-light` |
| Navy (footer) | `--uxmc-navy` | `--uxmc-light` | `--uxmc-white` | `--uxmc-coral-light` |

### RULES:
- Maximum 2 dark sections per page (hero + final CTA, or 1 mid-page feature)
- Alternate between white, wash, and ice for light sections — never 2 identical in a row
- Module feature sections can use the module's wash colour as background

---

## SEMANTIC COLOURS

| Purpose | Hex | Variable |
|---|---|---|
| Success / Active | `#047857` | `--uxmc-success` |
| Warning / Pending | `#b45309` | `--uxmc-warning` |
| Error / Required | `#dc2626` | `--uxmc-error` |
| Info | `#2563eb` | `--uxmc-info` |

---

## STARS / RATINGS

| Element | Colour | On White | On Ice |
|---|---|---|---|
| Filled star | `#b45309` | 5.02:1 ✅ | 4.71:1 ✅ |
| Empty star | `#d1d5db` | Decorative | Decorative |

---

## CSS VARIABLES BLOCK

Copy this exact block into every page's `<style>`:

```css
:root {
  /* Foundation */
  --uxmc-dark: #0f1923;
  --uxmc-navy: #1a2736;
  --uxmc-slate: #2d3d4f;
  --uxmc-mid: #64748b;
  --uxmc-light: #94a3b8;
  --uxmc-pale: #e2e8f0;
  --uxmc-wash: #f1f5f9;
  --uxmc-ice: #F0F9FF;
  --uxmc-white: #ffffff;

  /* Brand */
  --uxmc-indigo: #4f46e5;
  --uxmc-indigo-light: #818cf8;
  --uxmc-indigo-wash: #e0e7ff;
  --uxmc-coral: #be185d;
  --uxmc-coral-light: #ec4899;
  --uxmc-coral-wash: #fce7f3;

  /* Module colours */
  --mod-voice: #be185d;
  --mod-chatbot: #7c3aed;
  --mod-crm: #2563eb;
  --mod-booking: #0f766e;
  --mod-invoice: #047857;
  --mod-reviews: #b45309;
  --mod-email: #4f46e5;
  --mod-sms: #c2410c;
  --mod-social: #0e7490;
  --mod-seo: #047857;
  --mod-print: #475569;

  /* Semantic */
  --uxmc-success: #047857;
  --uxmc-warning: #b45309;
  --uxmc-error: #dc2626;
  --uxmc-info: #2563eb;

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  /* Spacing */
  --section-pad: 120px;
  --section-pad-sm: 70px;
  --nav-h: 68px;
}
```

---

## NEVER DO

- ❌ Use `--uxmc-mid` on dark backgrounds
- ❌ Use `--uxmc-light` on light backgrounds
- ❌ Use any colour as text without checking this document first
- ❌ Use `#10b981` (old green) — replaced by `#047857`
- ❌ Use `#6366f1` (old indigo) — replaced by `#4f46e5`
- ❌ Use `#f59e0b` (old amber) — replaced by `#b45309`
- ❌ Use `#059669` (old accent-dark) — replaced by module-specific colours
- ❌ Put vibrant colour text on vibrant colour backgrounds
- ❌ Use more than 2 dark sections per page
- ❌ Invent new colours — if a new colour is needed, test AA first and add here

---

## COMPANION DOCUMENTS

| Document | Updates Needed |
|---|---|
| NAV-CANONICAL.html | Update CSS variables + button colour to coral |
| FOOTER-CANONICAL.html | Update CSS variables |
| index.html | Full rebuild with new palette |
| All module pages | Update accent colours to module-specific |
| META-TEMPLATES.md | Update theme-color meta tag |
