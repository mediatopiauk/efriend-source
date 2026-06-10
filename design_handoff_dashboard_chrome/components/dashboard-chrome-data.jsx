// =============================================================================
// dashboard-chrome-data.jsx — locked data constants for the dashboard top
// chrome (header-toolbar layer).
//
// Cleanly separable from DashboardChrome.jsx so the component file stays a
// pure view layer. In production these map to:
//   • ANNOUNCEMENTS    → product-news feed (changelog / release notes)
//   • COMMAND_GROUPS   → the same Build / Grow route registry the sidebar uses
//   • MOBILE_MODAL_COPY→ static copy for the honest "Open on your phone" modal
//
// Honesty contract: no fake links. An announcement is only clickable when it
// carries a real `href`. Items without an href render as static product news.
//
// All colour decisions live in DashboardChrome.jsx via var(--*) tokens — this
// file is data only.
// =============================================================================

// -----------------------------------------------------------------------------
// ANNOUNCEMENTS — the bullhorn ticker feed.
//
// category drives the pill treatment in DashboardChrome.jsx:
//   'New'    → genuine new feature      → amber  (var(--color-warning))
//   'Update' → improvement to existing  → indigo (var(--brand-indigo))
//   'Tip'    → guidance / how-to         → neutral (var(--foundation-slate))
//
// `href` is OPTIONAL. Present only when the item links to a real destination.
// `id` is the dismiss key — localStorage flag is `bullhorn.dismissed.<id>`.
// -----------------------------------------------------------------------------
const ANNOUNCEMENTS = [
  {
    id: 'wizard-2-4',
    category: 'New',
    headline: 'Wizard v2.4 parses your brand data 15% faster',
  },
  {
    id: 'sarah-welsh',
    category: 'Update',
    headline: 'Sarah now handles inbound calls in Welsh',
  },
  {
    id: 'print-cmyk',
    category: 'Tip',
    headline: 'Print & Flyers: CMYK calibration improved for truer colour',
  },
  {
    id: 'sage-sync',
    category: 'New',
    headline: 'Sage 50 auto-sync is live — connect it in Settings',
    href: '../design_handoff_settings_v2/Settings.html?tab=connections',
  },
];

// -----------------------------------------------------------------------------
// COMMAND_GROUPS — the ⌘K command palette registry.
//
// iconKey maps to a GMIcon glyph. `module` is informational only (kept for
// parity with the route registry); the palette renders monochrome rows so the
// list reads calmly. Selecting a row calls onNavigate(item) — wired to the
// real router in production.
// -----------------------------------------------------------------------------
const COMMAND_GROUPS = [
  {
    key: 'build',
    label: 'Build',
    items: [
      { key: 'brand-dna',  label: 'Brand DNA',  iconKey: 'sparkles'   },
      { key: 'structure',  label: 'Structure',  iconKey: 'globe'      },
      { key: 'content',    label: 'Content',    iconKey: 'fileText'   },
      { key: 'deploy',     label: 'Deploy',     iconKey: 'zap'        },
    ],
  },
  {
    key: 'grow',
    label: 'Grow',
    items: [
      { key: 'voice',     label: 'Voice AI (Sarah)', iconKey: 'phone',         module: 'voice'     },
      { key: 'crm',       label: 'CRM',              iconKey: 'users',         module: 'crm'       },
      { key: 'chatbot',   label: 'Chatbot (Max)',    iconKey: 'message',       module: 'chatbot'   },
      { key: 'booking',   label: 'Booking',          iconKey: 'calendar',      module: 'booking'   },
      { key: 'invoicing', label: 'Invoicing',        iconKey: 'receipt',       module: 'invoicing' },
      { key: 'reviews',   label: 'Reviews',          iconKey: 'star',          module: 'reviews'   },
      { key: 'email',     label: 'Email',            iconKey: 'mail',          module: 'email'     },
      { key: 'sms',       label: 'SMS',              iconKey: 'messageSquare', module: 'sms'       },
      { key: 'social',    label: 'Social',           iconKey: 'share',         module: 'social'    },
      { key: 'seo',       label: 'SEO Coach',        iconKey: 'trendingUp',    module: 'seo'       },
    ],
  },
];

// -----------------------------------------------------------------------------
// MOBILE_MODAL_COPY — the honest "Open on your phone" modal.
//
// Replaces the dead QR / session-pairing panel. Both actions are real:
//   • Email me the link → mailto: with the URL pre-filled
//   • Copy URL         → navigator.clipboard.writeText + toast
//
// comingSoon is an honest disclosure (placeholder for the logged PWA work),
// rendered as an amber warning pill.
// -----------------------------------------------------------------------------
const MOBILE_MODAL_COPY = {
  title: 'Open on your phone',
  body:
    "Visit app.uxmasterchief.com on your phone and sign in — you'll see your " +
    'Mobile Field Kit with leads, bookings, and notifications optimised for ' +
    'one-handed use.',
  url: 'https://app.uxmasterchief.com',
  emailSubject: 'Open UX Master Chief on my phone',
  emailBody:
    "Here's the link to open UX Master Chief on your phone — sign in with your " +
    'usual details:\n\nhttps://app.uxmasterchief.com\n',
  comingSoon: 'Push notifications and one-tap pairing — coming soon',
};

Object.assign(window, {
  ANNOUNCEMENTS,
  COMMAND_GROUPS,
  MOBILE_MODAL_COPY,
});
