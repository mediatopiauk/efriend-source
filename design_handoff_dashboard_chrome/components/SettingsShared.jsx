// =============================================================================
// SettingsShared.jsx — Settings & Operations bundle.
//
// FIRST non-Grow surface where the non-Grow shell is invented. This file
// owns:
//   • New GMIcon glyphs not already in Shared.jsx (creditCard, barChart3,
//     plug, toggleLeft, crown, activity, moon, sun, plane, lock, keyRound,
//     eyeOff, monitor, trash2, building2, instagram, facebook, linkedin,
//     camera, xCircle, link2, calendarDays).
//
//   • The non-Grow shell primitives that every downstream non-Grow surface
//     (Help & Guides, Export, Reports, future account surfaces) will
//     inherit:
//       NonGrowPage          — full page wrapper (breadcrumb + header +
//                              optional tab strip + content area)
//       SettingsHeader       — h1 + sub-line ("Settings & Operations" /
//                              "Manage your account, billing, reports,
//                              and operational rules")  — NO pills, NO
//                              info icon, NO platform popover.  Per §3.1
//                              the header is functional, not narrative.
//       SettingsTabStrip     — 6-tab pill strip (Account / Billing /
//                              Reports / Connections / Operational /
//                              Security).  Same visual treatment as
//                              HelpTabStrip but accommodates more tabs;
//                              wraps to two rows on narrow viewports.
//
//   • Locked data — tab metadata, plan tiers, connection rows, automation
//     defaults, and the locked copy lines from §5.
//
// LOCKS recited verbatim from the brief:
//   §2.2  Indigo is the premium-positioning colour for non-Grow surfaces.
//         Amber is reserved for genuine warnings only.
//   §2.3  Coral is reserved for genuine conversion CTAs only:
//           • Upgrade Plan (Freelancer card + Trial-expired Reactivate)
//           • Add Payment Method (empty state)
//         Nothing else is coral.  Every other action is indigo or outline.
//   §2.4  --mod-*, --foundation-*, --brand-* CSS variables only.  No raw
//         Tailwind colour classes.  No indigo hex literals.
//   §2.5  Six tabs in the exact order Account / Billing / Reports /
//         Connections / Operational / Security.
//   §2.7  "Logic Wall Active" pill and platform info popover removed
//         from this surface.  Page header is functional, not chrome.
//   §2.8  Honesty contract — every status reflects real state or is
//         honestly disclosed "Coming soon".
//   §5.7  Right-rail relabel on Operational: "Automations Configured",
//         NOT "Active Automations".
// =============================================================================

// -----------------------------------------------------------------------------
// New GMIcon additions.  All Lucide 1.75-stroke, rounded caps + joins,
// matching the existing icon set.
// -----------------------------------------------------------------------------
Object.assign(GMIcon, {
  shield: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  creditCard: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h2" />
    </svg>
  ),
  barChart3: (p = {}) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M3 3v18h18" />
      <path d="M7 16V10" />
      <path d="M12 16V6" />
      <path d="M17 16v-4" />
    </svg>
  ),
  plug: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M12 22v-5" />
      <path d="M9 7V2" />
      <path d="M15 7V2" />
      <path d="M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z" />
    </svg>
  ),
  toggleLeft: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="7" width="20" height="10" rx="5" />
      <circle cx="8" cy="12" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  crown: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M2 18h20" />
      <path d="M3 8l5 4 4-7 4 7 5-4-2 10H5z" />
    </svg>
  ),
  activity: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M22 12h-4l-3 9-6-18-3 9H2" />
    </svg>
  ),
  moon: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  sun: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  plane: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  ),
  lock: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  keyRound: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M2 18a4 4 0 0 1 4-4h12v8H6a4 4 0 0 1-4-4z" transform="rotate(-45 12 16)" />
      <circle cx="16.5" cy="7.5" r="4.5" />
      <path d="M14 10l-8 8" />
    </svg>
  ),
  eyeOff: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M9.88 5.08A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <path d="M9.9 10a3 3 0 0 0 4.24 4.24" />
      <path d="M2 2l20 20" />
    </svg>
  ),
  monitor: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  trash2: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  ),
  building2: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
    </svg>
  ),
  instagram: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  ),
  facebook: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  linkedin: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  camera: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  ),
  xCircle: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
  link2: (p = {}) => (
    <svg width={p.size || 12} height={p.size || 12} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
      <path d="M8 12h8" />
    </svg>
  ),
  calendarDays: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  ),
  helpCircle: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  upload: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  ),
});

// -----------------------------------------------------------------------------
// SETTINGS_TABS — locked order from §2.5. Each tab carries its Lucide icon
// + label.  Order is the contract: never re-order, never re-name.
// -----------------------------------------------------------------------------
const SETTINGS_TABS = [
  { key: 'account',     label: 'Account',     icon: GMIcon.user        },
  { key: 'billing',     label: 'Billing',     icon: GMIcon.creditCard  },
  { key: 'reports',     label: 'Reports',     icon: GMIcon.barChart3   },
  { key: 'connections', label: 'Connections', icon: GMIcon.plug        },
  { key: 'operational', label: 'Operational', icon: GMIcon.toggleLeft  },
  { key: 'security',    label: 'Security',    icon: GMIcon.shield      },
];

// -----------------------------------------------------------------------------
// NonGrowBreadcrumb — minimal, single-line, last segment in display weight.
// Reused by all 5 non-Grow surfaces.
// -----------------------------------------------------------------------------
const NonGrowBreadcrumb = ({ trail = [] }) => (
  <nav aria-label="Breadcrumb" style={{
    display: 'flex', alignItems: 'center', gap: 8,
    marginBottom: 14,
    fontFamily: 'var(--font-body)',
    fontSize: 12.5,
    color: 'var(--foundation-mid)',
  }}>
    {trail.map((seg, i) => {
      const last = i === trail.length - 1;
      return (
        <React.Fragment key={i}>
          {last ? (
            <span style={{
              color: 'var(--foundation-dark)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>{seg.label}</span>
          ) : (
            <a href={seg.href || '#'} style={{
              color: 'var(--foundation-mid)',
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>{seg.label}</a>
          )}
          {!last && <span style={{ opacity: 0.5 }}>›</span>}
        </React.Fragment>
      );
    })}
  </nav>
);

// -----------------------------------------------------------------------------
// SettingsHeader — §3.1 + §5.1.  No pills, no info icon, no popover.
// Just h1 + sub-line, left-aligned, bottom border for separation.
//
// Optional `actions` slot — when a surface has top-right header controls
// (Reports' date-range select + Export PDF, future Export's "Schedule
// auto-export", etc.), pass them here.  The shell stays right-aligned and
// vertically centred against the h1.  Most surfaces leave it undefined.
// -----------------------------------------------------------------------------
const SettingsHeader = ({ title, sub, actions }) => (
  <header style={{
    display: 'grid',
    gridTemplateColumns: actions ? 'minmax(0, 1fr) auto' : '1fr',
    gap: 24, alignItems: 'flex-end',
    padding: '0 0 22px',
    marginBottom: 24,
    borderBottom: '1px solid var(--foundation-pale)',
  }}>
    <div style={{ minWidth: 0 }}>
      <h1 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 30, fontWeight: 700,
        letterSpacing: '-0.025em',
        color: 'var(--foundation-dark)',
        lineHeight: 1.1,
      }}>{title}</h1>
      <div style={{
        marginTop: 6,
        fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5,
        color: 'var(--foundation-mid)',
        maxWidth: 720,
      }}>{sub}</div>
    </div>
    {actions && (
      <div style={{ flexShrink: 0 }}>{actions}</div>
    )}
  </header>
);

// -----------------------------------------------------------------------------
// SettingsTabStrip — §3.2.  Centred pill strip.  Six tabs side-by-side at
// desktop; wraps onto two rows at narrow widths (cleaner than horizontal
// scroll for an account surface).  When `tabs.length === 1`, the strip
// is suppressed entirely — that's the contract for downstream single-tab
// surfaces (Reports gateway-style, Export, Help & Guides on narrow).
// -----------------------------------------------------------------------------
const SettingsTabStrip = ({ tabs = SETTINGS_TABS, active, onSelect }) => {
  if (!tabs || tabs.length <= 1) return null;
  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      marginBottom: 28,
    }}>
      <div style={{
        display: 'inline-flex', gap: 2,
        padding: 4,
        background: 'var(--foundation-wash)',
        borderRadius: 999,
        border: '1px solid var(--foundation-pale)',
        flexWrap: 'wrap',
        maxWidth: '100%',
      }}>
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onSelect && onSelect(t.key)}
              aria-pressed={isActive}
              className={`settings-tab ${isActive ? 'is-active' : ''}`}
            >
              <span style={{ display: 'inline-flex' }}>{t.icon({ size: 14 })}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// NonGrowPage — full page wrapper.  Takes:
//   • breadcrumb: array of {label, href}
//   • title:      string (h1)
//   • sub:        string (one-line under h1)
//   • tabs:       array of {key, label, icon}  (omit or single-item for no tabs)
//   • active:     active tab key
//   • onTab:      tab-change handler
//   • children:   the tab body
//
// This is the load-bearing shell.  When ported, Help & Guides / Export /
// Reports all instantiate this with their own props.
// -----------------------------------------------------------------------------
const NonGrowPage = ({ breadcrumb, title, sub, headerActions, tabs, active, onTab, children, screenLabel }) => (
  <div className="settings-page" data-screen-label={screenLabel || title}>
    {breadcrumb && <NonGrowBreadcrumb trail={breadcrumb} />}
    <SettingsHeader title={title} sub={sub} actions={headerActions} />
    {tabs && tabs.length > 1 && (
      <SettingsTabStrip tabs={tabs} active={active} onSelect={onTab} />
    )}
    {children}
  </div>
);

// -----------------------------------------------------------------------------
// SettingsCard — section card primitive.  §3.4.
//   • White background, foundation-pale border, 10px radius, shadow-xs.
//   • Header zone with title + optional sub-line + optional right-aligned
//     actions.  No icon by default (§3.4: "No icons in section card titles
//     by default").  Pass `icon` only for the Operational mode cards.
// -----------------------------------------------------------------------------
const SettingsCard = ({ title, sub, icon, iconColor, iconWash, actions, children, padding = '24px', flush = false }) => (
  <section style={{
    background: '#fff',
    border: '1px solid var(--foundation-pale)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-xs)',
    overflow: 'hidden',
  }}>
    {(title || actions) && (
      <header style={{
        display: 'flex', alignItems: 'flex-start', gap: 14,
        padding: '18px 24px 16px',
        borderBottom: children ? '1px solid var(--foundation-pale)' : '0',
      }}>
        {icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-sm)',
            background: iconWash || 'var(--brand-indigo-100)',
            color: iconColor || 'var(--brand-indigo)',
            display: 'grid', placeItems: 'center',
            flexShrink: 0,
          }}>{icon}</div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <h3 style={{
              margin: 0,
              fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
              letterSpacing: '-0.01em',
              color: 'var(--foundation-dark)',
              lineHeight: 1.25,
            }}>{title}</h3>
          )}
          {sub && (
            <div style={{
              marginTop: 4,
              fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45,
              color: 'var(--foundation-mid)',
              textWrap: 'pretty',
            }}>{sub}</div>
          )}
        </div>
        {actions && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </header>
    )}
    <div style={{ padding: flush ? 0 : padding }}>
      {children}
    </div>
  </section>
);

// -----------------------------------------------------------------------------
// SettingsTwoCol — main column + right rail.  §3.3.  Collapses to single
// column under 1100px.  Mirrors the Grow-shell 8/12 + 4/12 ratio but the
// right column is OPTIONAL (gateway surfaces pass only the main column).
// -----------------------------------------------------------------------------
const SettingsTwoCol = ({ main, rail, gap = 24, ratio = '8fr 4fr' }) => {
  if (!rail) {
    return <div style={{ display: 'flex', flexDirection: 'column', gap }}>{main}</div>;
  }
  return (
    <div className="settings-two-col" style={{
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${ratio.split(' ')[0]}) minmax(0, ${ratio.split(' ')[1]})`,
      gap,
      alignItems: 'start',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>{main}</div>
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 16 }}>
        {rail}
      </aside>
    </div>
  );
};

// -----------------------------------------------------------------------------
// SettingsActionButton — the locked-role action button.  §3.6.
//   role='conversion' → coral filled.  ONLY for §2.3 conversion CTAs.
//   role='primary'    → indigo filled.  Save / Update / Connect Now /
//                       Open Full Report / exploration actions.
//   role='secondary'  → outline indigo border.  Manage, Change Plan,
//                       Cancel in dialog.
//   role='ghost'      → text only.  Cancel subscription link, "How this
//                       works" disclosure.
//   role='danger'     → red-outline.  Delete Account, Disconnect.
//   role='disabled'   → outline + disabled cursor.  Coming Soon.
// -----------------------------------------------------------------------------
const SettingsActionButton = ({ role = 'primary', children, icon, size = 'md', fullWidth = false, disabled = false, onClick, ariaLabel, style: extra = {} }) => {
  const sizing = size === 'sm'
    ? { padding: '7px 12px', fontSize: 12.5, gap: 6, iconSize: 13 }
    : size === 'lg'
      ? { padding: '12px 22px', fontSize: 14.5, gap: 9, iconSize: 16 }
      : { padding: '10px 16px', fontSize: 13.5, gap: 8, iconSize: 14 };

  const roleStyles = {
    conversion: {
      background: 'var(--brand-coral)', color: '#fff',
      border: '1px solid var(--brand-coral)',
    },
    primary: {
      background: 'var(--brand-indigo)', color: '#fff',
      border: '1px solid var(--brand-indigo)',
    },
    secondary: {
      background: '#fff', color: 'var(--brand-indigo)',
      border: '1px solid var(--foundation-pale)',
    },
    outline: {
      background: '#fff', color: 'var(--foundation-slate)',
      border: '1px solid var(--foundation-pale)',
    },
    ghost: {
      background: 'transparent', color: 'var(--foundation-mid)',
      border: '1px solid transparent',
    },
    danger: {
      background: '#fff', color: 'var(--color-danger)',
      border: '1px solid rgba(185,28,28,0.30)',
    },
    disabled: {
      background: '#fff', color: 'var(--foundation-mid)',
      border: '1px solid var(--foundation-pale)',
    },
  };

  const isDisabled = disabled || role === 'disabled';

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: sizing.gap,
        padding: sizing.padding,
        width: fullWidth ? '100%' : 'auto',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)',
        fontSize: sizing.fontSize, fontWeight: 600,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.55 : 1,
        transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
        ...roleStyles[role],
        ...extra,
      }}
      onMouseEnter={(e) => {
        if (isDisabled) return;
        if (role === 'conversion') e.currentTarget.style.background = 'var(--brand-coral-700)';
        else if (role === 'primary') e.currentTarget.style.background = 'var(--brand-indigo-700)';
        else if (role === 'secondary') { e.currentTarget.style.background = 'var(--brand-indigo-100)'; e.currentTarget.style.borderColor = 'var(--brand-indigo)'; }
        else if (role === 'outline') { e.currentTarget.style.background = 'var(--foundation-wash)'; }
        else if (role === 'ghost')   { e.currentTarget.style.color = 'var(--foundation-dark)'; }
        else if (role === 'danger')  { e.currentTarget.style.background = 'rgba(185,28,28,0.06)'; e.currentTarget.style.borderColor = 'var(--color-danger)'; }
      }}
      onMouseLeave={(e) => {
        if (isDisabled) return;
        if (role === 'conversion') e.currentTarget.style.background = 'var(--brand-coral)';
        else if (role === 'primary') e.currentTarget.style.background = 'var(--brand-indigo)';
        else if (role === 'secondary') { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--foundation-pale)'; }
        else if (role === 'outline') { e.currentTarget.style.background = '#fff'; }
        else if (role === 'ghost')   { e.currentTarget.style.color = 'var(--foundation-mid)'; }
        else if (role === 'danger')  { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(185,28,28,0.30)'; }
      }}
    >
      {icon && (
        <span style={{ display: 'inline-flex' }}>
          {typeof icon === 'function' ? icon({ size: sizing.iconSize }) : icon}
        </span>
      )}
      {children}
    </button>
  );
};

// -----------------------------------------------------------------------------
// SettingsToggle — visual toggle switch.  Used everywhere on Operational +
// in the Legal Synchronisation panel on Account + Notifications card.
// Indigo when on (not amber!), foundation-pale rail when off.
// -----------------------------------------------------------------------------
const SettingsToggle = ({ checked = false, onChange, ariaLabel, size = 'md' }) => {
  const dims = size === 'sm'
    ? { w: 32, h: 18, t: 14, gap: 2 }
    : { w: 40, h: 22, t: 18, gap: 2 };
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange && onChange(!checked)}
      style={{
        all: 'unset', cursor: 'pointer',
        width: dims.w, height: dims.h,
        borderRadius: 999,
        background: checked ? 'var(--brand-indigo)' : 'var(--foundation-pale)',
        position: 'relative',
        transition: 'background var(--dur-base) var(--ease-standard)',
        flexShrink: 0,
        display: 'inline-block',
      }}
    >
      <span style={{
        position: 'absolute',
        top: dims.gap, left: checked ? dims.w - dims.t - dims.gap : dims.gap,
        width: dims.t, height: dims.t,
        borderRadius: 999,
        background: '#fff',
        boxShadow: '0 1px 2px rgba(15,25,35,0.18)',
        transition: 'left var(--dur-base) var(--ease-standard)',
      }} />
    </button>
  );
};

// -----------------------------------------------------------------------------
// SettingsField — labelled form field.  Label above, helper text below.
//   variant='text' | 'email' | 'tel' | 'textarea' | 'select'
// -----------------------------------------------------------------------------
const SettingsField = ({ label, helper, error, children, badge }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <label style={{
        fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
        color: 'var(--foundation-slate)',
        letterSpacing: '0.01em',
      }}>{label}</label>
      {badge}
    </div>
    {children}
    {helper && !error && (
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.5,
        color: 'var(--foundation-mid)',
      }}>{helper}</div>
    )}
    {error && (
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.5,
        color: 'var(--color-danger)',
      }}>{error}</div>
    )}
  </div>
);

const SettingsInput = ({ value, onChange, placeholder, type = 'text', readOnly = false, suffix, prefix, monospace = false }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `${prefix ? 'auto ' : ''}minmax(0, 1fr)${suffix ? ' auto' : ''}`,
    gap: 8, alignItems: 'center',
    padding: prefix || suffix ? '0 12px 0 12px' : '0',
    background: readOnly ? 'var(--foundation-wash)' : '#fff',
    border: '1px solid var(--foundation-pale)',
    borderRadius: 'var(--radius-xs)',
    transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
  }}>
    {prefix && <span style={{ color: 'var(--foundation-mid)', display: 'inline-flex' }}>{prefix}</span>}
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{
        all: 'unset',
        width: '100%',
        padding: prefix || suffix ? '10px 0' : '10px 12px',
        fontFamily: monospace ? 'var(--font-mono)' : 'var(--font-body)',
        fontSize: 13.5,
        color: readOnly ? 'var(--foundation-mid)' : 'var(--foundation-dark)',
      }}
    />
    {suffix && <span style={{ color: 'var(--foundation-mid)', display: 'inline-flex' }}>{suffix}</span>}
  </div>
);

const SettingsSelect = ({ value, onChange, options = [] }) => (
  <select
    value={value || ''}
    onChange={(e) => onChange && onChange(e.target.value)}
    style={{
      width: '100%',
      padding: '10px 12px',
      background: '#fff',
      border: '1px solid var(--foundation-pale)',
      borderRadius: 'var(--radius-xs)',
      fontFamily: 'var(--font-body)', fontSize: 13.5,
      color: 'var(--foundation-dark)',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      paddingRight: 36,
    }}
  >
    {options.map(o => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
);

// -----------------------------------------------------------------------------
// SourceOfTruthBadge — §5.3, the pill that lives next to "Business Details"
// indicating that field changes flow to the Logic Wall.  Indigo wash + indigo
// text + link2 icon, NEVER purple (the old code shipped purple).
// -----------------------------------------------------------------------------
const SourceOfTruthBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '3px 9px 3px 8px',
    background: 'var(--brand-indigo-100)',
    color: 'var(--brand-indigo)',
    borderRadius: 999,
    fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }}>
    {GMIcon.link2({ size: 10 })}
    Source of Truth
  </span>
);

// -----------------------------------------------------------------------------
// LogicWallBadge — single Grow-module wayfinding badge.  Used inline next to
// Business Details fields to show which Grow modules consume them, and on
// Operational toggle rows.  Re-tokened from the legacy purple to indigo-wash
// per §11.6.
// -----------------------------------------------------------------------------
const LogicWallBadge = ({ icon, children, tone = 'indigo', module }) => {
  let bg, fg;
  if (module && GM_MODULES[module]) {
    bg = GM_MODULES[module].wash;
    fg = GM_MODULES[module].color;
  } else if (tone === 'indigo') {
    bg = 'var(--brand-indigo-100)';
    fg = 'var(--brand-indigo)';
  } else {
    bg = 'var(--foundation-wash)';
    fg = 'var(--foundation-slate)';
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px 3px 7px',
      background: bg, color: fg,
      borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {icon && <span style={{ display: 'inline-flex' }}>{typeof icon === 'function' ? icon({ size: 10 }) : icon}</span>}
      {children}
    </span>
  );
};

// -----------------------------------------------------------------------------
// HonestyDisclosure — pale-grey strip used to mark "Configure now, activation
// when ready" or "Coming soon" rows.  Foundation-wash bg, foundation-mid
// icon + text.  Never amber (amber is reserved for genuine warnings).
// -----------------------------------------------------------------------------
const HonestyDisclosure = ({ icon, children, tone = 'neutral' }) => {
  const toneStyles = {
    neutral: { bg: 'var(--foundation-wash)', fg: 'var(--foundation-slate)', dot: 'var(--foundation-mid)' },
    success: { bg: 'rgba(4,120,87,0.08)',    fg: 'var(--color-success)',    dot: 'var(--color-success)' },
    info:    { bg: 'var(--brand-indigo-100)', fg: 'var(--brand-indigo)',    dot: 'var(--brand-indigo)' },
    warning: { bg: 'rgba(180,83,9,0.08)',    fg: 'var(--color-warning)',    dot: 'var(--color-warning)' },
  };
  const s = toneStyles[tone] || toneStyles.neutral;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 12px',
      background: s.bg, color: s.fg,
      borderRadius: 'var(--radius-xs)',
      fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.45,
      fontWeight: 500,
    }}>
      {icon && <span style={{ display: 'inline-flex', color: s.dot }}>{typeof icon === 'function' ? icon({ size: 13 }) : icon}</span>}
      <span>{children}</span>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Locked active-project mock data.  This is the demo project the page is
// rendered against.  In the wizard port it gets replaced with the real
// project store via useProjectStore().
// -----------------------------------------------------------------------------
const SETTINGS_PROJECT = {
  profile: {
    firstName:   'Duncan',
    lastName:    'Maund',
    email:       'duncan@uxmasterchief.com',
    mobile:      '+44 7700 900 123',
    avatarUrl:   null,
    emailSource: 'Google',
  },
  business: {
    companyName:   'Brightside Hospitality Ltd',
    brandName:     'Brightside',
    address:       '12 Marshall Street',
    city:          'London',
    postcode:      'W1F 7BR',
    country:       'United Kingdom',
    vatId:         'GB 123 4567 89',
    companyReg:    '09876543',
    currency:      'GBP',
    timezone:      'Europe/London',
    legalSyncOn:   true,
  },
  brandDna: {
    primary:   '#0e7490',
    secondary: '#be185d',
    font:      'Playfair Display',
    tagline:   'Independent neighbourhood hospitality.',
    stepOneComplete: true,
  },
  domain: {
    configured: true,
    domain:     'brightsidehospitality.co.uk',
    sslStatus:  'verified',
    dnsStatus:  'verified',
  },
  subscription: {
    state: 'active',          // 'free' | 'trial' | 'active' | 'expired'
    plan:  'Freelancer',
    price: '£59',
    cycle: 'monthly',         // 'monthly' | 'annual'
    nextBilling: '14 Jun 2026',
    trialDaysLeft: 0,
    hasPaymentMethod: true,
    cardBrand: 'visa',
    cardLast4: '4242',
    cardExp:   '07/28',
  },
  usage: {
    voiceMinutes: { used: 142, limit: 300 },
    sms:          { used: 318, limit: 500 },
    email:        { used: 1240, limit: 5000 },
    storage:      { used: 1.2, limit: 5, unit: 'GB' },
  },
  passwordLastUpdated: null,   // null → "Password not changed since signup"
};

// Locked plan tiers — §4.2.  Pricing copy verbatim.
const SETTINGS_PLANS = [
  {
    key:        'free',
    name:       'Free',
    price:      '£0',
    cycle:      '/mo',
    desc:       'Build and explore. One published page, no Grow modules.',
    features:   ['1 published page', '0 of 11 Grow Modules', 'Community support', 'Brightside watermark'],
    cta:        'Current plan',
    ctaRole:    'outline',
  },
  {
    key:        'small-business',
    name:       'Small Business',
    price:      '£29',
    cycle:      '/mo',
    desc:       'Five pages, three modules, real customer-facing site.',
    features:   ['5 published pages', '3 Grow Modules', 'Email support', 'Watermark removed'],
    cta:        'Get Small Business',
    ctaRole:    'primary',
  },
  {
    key:        'freelancer',
    name:       'Freelancer',
    price:      '£59',
    cycle:      '/mo',
    desc:       'Unlimited pages and the full 11-module stack.',
    features:   ['Unlimited pages', 'All 11 Grow Modules', '300 Voice AI mins / 500 SMS', 'Priority email support'],
    cta:        'Get Freelancer',
    ctaRole:    'conversion',     // The ONE coral CTA on the Free / Trial state.
    mostPopular: true,
  },
  {
    key:        'agency',
    name:       'Agency',
    price:      '£299',
    cycle:      '/mo',
    desc:       'For freelancers running multiple client sites at once.',
    features:   ['Up to 10 client projects', 'All 11 Grow Modules per project', '2000 Voice AI mins / 5000 SMS', 'Priority phone support'],
    cta:        'Get Agency',
    ctaRole:    'primary',
  },
];

// Locked Grow module status for the Billing tab grid — §4.2 State 2.
const SETTINGS_GROW_STATUS = [
  { key: 'crm',       label: 'CRM',         status: 'Active',          tone: 'success', usage: '42 leads' },
  { key: 'voice',     label: 'Voice AI',    status: 'Active',          tone: 'success', usage: '142 mins' },
  { key: 'chatbot',   label: 'Chatbot',     status: 'Setup required',  tone: 'warning', usage: 'Connect Twilio' },
  { key: 'booking',   label: 'Booking',     status: 'Active',          tone: 'success', usage: '18 bookings' },
  { key: 'invoicing', label: 'Invoicing',   status: 'Setup required',  tone: 'warning', usage: 'Connect Stripe' },
  { key: 'reviews',   label: 'Reviews',     status: 'Active',          tone: 'success', usage: '4.7 ★ avg' },
  { key: 'email',     label: 'Email',       status: 'Active',          tone: 'success', usage: '1,240 sent' },
  { key: 'sms',       label: 'SMS',         status: 'Setup required',  tone: 'warning', usage: 'Connect Twilio' },
  { key: 'social',    label: 'Social',      status: 'Available',       tone: 'info',    usage: 'Configure' },
  { key: 'seo',       label: 'SEO Coach',   status: 'Active',          tone: 'success', usage: '23 keywords' },
  { key: 'print',     label: 'Print',       status: 'Available',       tone: 'info',    usage: 'Browse templates' },
];

// Locked connection rows — §4.4.  Each row carries its provider name,
// module the colour comes from, status, "Why I need this" copy, and the
// list of Grow modules it powers (Logic Wall badges).
const SETTINGS_CONNECTIONS = {
  'connect-first': {
    label: 'Connect These First',
    sub:   'These unlock your most powerful revenue and lead-capture modules',
    critical: true,
    icon:  GMIcon.zap,
    rows: [
      {
        key: 'stripe', label: 'Stripe', module: 'invoicing',
        desc: 'Accept card payments and manage subscriptions',
        why:  'Stripe is required to accept payments through your Invoicing and Booking modules. Without it, you cannot get paid online.',
        status: 'connected', powers: ['Invoicing', 'Booking'],
      },
      {
        key: 'twilio', label: 'Twilio', module: 'voice',
        desc: 'Voice AI receptionist and automated SMS follow-ups',
        why:  'Twilio is required to activate Voice AI (Sarah) and enable automated SMS follow-ups. Without it, these modules cannot send or receive.',
        status: 'not-connected', powers: ['Voice AI', 'SMS'],
      },
      {
        key: 'google-business', label: 'Google Business Profile', module: 'reviews',
        desc: 'Reviews and local SEO data',
        why:  'Google Business Profile powers your Reviews module and provides local SEO data to the SEO Coach. Essential for local businesses.',
        status: 'awaiting', powers: ['Reviews', 'SEO Coach'],
      },
    ],
  },
  'payment': {
    label: 'Payment Gateways',
    sub:   'Additional ways to take payment from customers',
    icon:  GMIcon.creditCard,
    rows: [
      {
        key: 'paypal', label: 'PayPal', module: null, customColor: '#003087',
        desc: 'Accept PayPal payments alongside Stripe',
        why:  'PayPal will give your customers an additional checkout option for invoicing and booking.',
        status: 'coming-soon', powers: ['Invoicing'],
      },
    ],
  },
  'google': {
    label: 'Google & Local SEO',
    sub:   'Search visibility and analytics signals',
    icon:  GMIcon.search,
    rows: [
      {
        key: 'analytics', label: 'Google Analytics', module: 'seo',
        desc: 'Page-level traffic and conversion analytics',
        why:  'Analytics feeds visitor numbers and conversion paths into your Business Performance Report.',
        status: 'coming-soon', powers: ['Reports', 'SEO Coach'],
      },
      {
        key: 'search-console', label: 'Google Search Console', module: 'seo',
        desc: 'Search impressions, queries, and indexation health',
        why:  'Search Console gives the SEO Coach what users actually type to find you, so we can sharpen meta and keyword strategy.',
        status: 'coming-soon', powers: ['SEO Coach'],
      },
    ],
  },
  'social': {
    label: 'Social Media',
    sub:   'Connect at least one to activate the Social module',
    icon:  GMIcon.share,
    rows: [
      {
        key: 'instagram', label: 'Instagram', module: 'social', customColor: '#e1306c',
        desc: 'Post and pull your IG feed into Social',
        why:  'Instagram lets the Social module post on a schedule and pull your latest posts into your website footer.',
        status: 'coming-soon', powers: ['Social'],
      },
      {
        key: 'facebook', label: 'Facebook', module: 'social', customColor: '#1877f2',
        desc: 'Page posting and review pull-through',
        why:  'Facebook lets the Social module schedule posts to your business Page.',
        status: 'coming-soon', powers: ['Social'],
      },
      {
        key: 'linkedin', label: 'LinkedIn', module: 'social', customColor: '#0a66c2',
        desc: 'Company-page posts for B2B-leaning brands',
        why:  'LinkedIn lets the Social module post to your company page for any B2B-facing communications.',
        status: 'coming-soon', powers: ['Social'],
      },
    ],
  },
  'email-provider': {
    label: 'Email Provider',
    sub:   'For sending transactional and marketing email',
    icon:  GMIcon.mail,
    rows: [
      {
        key: 'sendgrid', label: 'SendGrid', module: 'email',
        desc: 'Reliable email delivery for the Email module',
        why:  'SendGrid handles deliverability for your transactional emails and marketing sequences.',
        status: 'connected', powers: ['Email'],
      },
    ],
  },
  'calendar': {
    label: 'Calendar Sync',
    sub:   'Two-way calendar sync for Booking availability',
    icon:  GMIcon.calendar,
    rows: [
      {
        key: 'google-calendar', label: 'Google Calendar', module: 'booking',
        desc: 'Sync bookings with your Google Calendar',
        why:  'Calendar sync keeps Booking availability accurate based on the events already on your Google Calendar.',
        status: 'coming-soon', powers: ['Booking'],
      },
    ],
  },
};

const CONNECTION_STATUS_META = {
  'connected':     { label: 'Connected',          tone: 'success', dot: 'var(--color-success)' },
  'awaiting':      { label: 'Awaiting connection', tone: 'warning', dot: 'var(--color-warning)' },
  'not-connected': { label: 'Not connected',      tone: 'danger',  dot: 'var(--color-danger)'  },
  'coming-soon':   { label: 'Coming soon',        tone: 'neutral', dot: 'var(--foundation-mid)' },
};

// Locked global automation defaults — §4.5 + §5.7.
const SETTINGS_AUTOMATIONS = {
  primary: [
    {
      key: 'review-request', title: 'Auto-request Reviews',
      desc: 'Send a review-request SMS or email after a completed booking or invoice.',
      modules: [{ label: 'Reviews', module: 'reviews' }, { label: 'SMS', module: 'sms' }],
      defaultOn: true,
      how: 'Triggered 24 hours after a booking is marked complete or an invoice is paid. The message includes a one-tap link to your Google Business Profile review page.',
    },
    {
      key: 'ai-draft', title: 'AI Response Drafts',
      desc: 'Sarah drafts replies to inbound enquiries — you review before sending.',
      modules: [{ label: 'Voice AI', module: 'voice' }, { label: 'Chatbot', module: 'chatbot' }],
      defaultOn: true,
      how: 'Inbound emails and chatbot conversations get a draft reply that picks up your brand tone from Step 1. You see the draft in the CRM inbox and either send, edit, or discard.',
    },
    {
      key: 'booking-reminder', title: 'Appointment Reminders',
      desc: 'Two reminders before each booking: 24 hours and 1 hour before.',
      modules: [{ label: 'Booking', module: 'booking' }, { label: 'SMS', module: 'sms' }, { label: 'Email', module: 'email' }],
      defaultOn: true,
      how: 'Sent automatically based on booking time. Customer can cancel or reschedule from the reminder. SMS used during waking hours, email overnight.',
    },
    {
      key: 'payment-reminder', title: 'Payment Reminders',
      desc: 'Polite nudges 3 days, 7 days, and 14 days after an invoice goes overdue.',
      modules: [{ label: 'Invoicing', module: 'invoicing' }, { label: 'Email', module: 'email' }],
      defaultOn: false,
      how: 'Three escalating reminder emails are scheduled when an invoice is created. Each one stops sending the moment the invoice is paid.',
    },
    {
      key: 'lead-notification', title: 'Lead Notifications',
      desc: 'Get pinged the moment a new lead lands — by email, SMS, or both.',
      modules: [{ label: 'CRM', module: 'crm' }, { label: 'SMS', module: 'sms' }],
      defaultOn: true,
      how: 'Every new lead from contact forms, Voice AI call-backs, or chatbot captures fires a notification to the address and number set in the Notifications card.',
    },
  ],
  followUp: [
    {
      key: 'new-lead-followup', title: 'New Lead Follow-up',
      desc: 'Three-step sequence after a new lead is captured.',
      modules: [{ label: 'CRM', module: 'crm' }, { label: 'Email', module: 'email' }],
      defaultOn: true,
      how: 'Step 1 fires immediately with a friendly intro. Step 2 lands 2 days later with a soft pitch. Step 3 lands 7 days later as a final check-in. Pauses if the lead replies.',
    },
    {
      key: 'post-service', title: 'Post-Service Thank You',
      desc: 'Thank-you message 1 day after a service is delivered.',
      modules: [{ label: 'Booking', module: 'booking' }, { label: 'Email', module: 'email' }],
      defaultOn: false,
      how: 'Triggered 24 hours after a booking is marked complete. The message asks how things went and offers a 10% rebooking discount if you have one configured.',
    },
  ],
};

// -----------------------------------------------------------------------------
// EXPORTS — everything the per-tab files need.
// -----------------------------------------------------------------------------
Object.assign(window, {
  SETTINGS_TABS, SETTINGS_PROJECT, SETTINGS_PLANS, SETTINGS_GROW_STATUS,
  SETTINGS_CONNECTIONS, CONNECTION_STATUS_META, SETTINGS_AUTOMATIONS,
  NonGrowBreadcrumb, SettingsHeader, SettingsTabStrip, NonGrowPage,
  SettingsCard, SettingsTwoCol, SettingsActionButton, SettingsToggle,
  SettingsField, SettingsInput, SettingsSelect,
  SourceOfTruthBadge, LogicWallBadge, HonestyDisclosure,
});
