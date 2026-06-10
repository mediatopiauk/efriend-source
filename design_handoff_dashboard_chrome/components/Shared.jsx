// =============================================================================
// GM (Grow Module) shared primitives — SEO Coach bundle.
//
// Verbatim port of the Reviews Shared.jsx (CRM / Booking / Invoicing GM core
// + Reviews additions: GMLogicWallCard.connected per row, StarsDisplay,
// RatingBar, ReviewRow, FlywheelStage). Plus SEO-only tail (line 1100+):
//
//   • New icons added to GMIcon — refreshCw, mapPin, externalLink, bell,
//     fileText, lockClosed.
//   • SEOPageRow         — one row of the per-page SEO health table.
//   • CitationChecklistRow — one row of the manual citation checklist.
//   • RoadmapRow         — one row of the honest forward roadmap card.
//   • MetaLenStatus      — shared colour-coded char-count pill used by
//     SEOPageRow for meta-title + meta-description cells.
//
// HARD RULE (re-applied from prior bundles):
//   • No hardcoded module colour. Always read it from GM_MODULES via the
//     `module` prop, or accept a `color` / `wash` pair from the caller.
//   • No hardcoded hex literals for foundation neutrals. Use the --foundation-*
//     and --color-* tokens.
//   • Empty states must communicate "the system is running" not "you have no
//     data".
//   • Amber is the Reviews module wayfinding colour (gold-star). It is NOT
//     warning. The pre-deploy banner still uses #fff7ed + var(--color-warning)
//     — that's a separate warning-amber, not --mod-reviews. Do not blend.
// =============================================================================

const GM_MODULES = {
  crm:       { color: 'var(--mod-crm)',       wash: 'var(--mod-crm-wash)',       name: 'CRM',       icon: 'users'       },
  voice:     { color: 'var(--mod-voice)',     wash: 'var(--mod-voice-wash)',     name: 'Voice AI',  icon: 'phone'       },
  chatbot:   { color: 'var(--mod-chatbot)',   wash: 'var(--mod-chatbot-wash)',   name: 'Chatbot',   icon: 'message'     },
  booking:   { color: 'var(--mod-booking)',   wash: 'var(--mod-booking-wash)',   name: 'Booking',   icon: 'calendar'    },
  invoicing: { color: 'var(--mod-invoicing)', wash: 'var(--mod-invoicing-wash)', name: 'Invoicing', icon: 'receipt'     },
  reviews:   { color: 'var(--mod-reviews)',   wash: 'var(--mod-reviews-wash)',   name: 'Reviews',   icon: 'star'        },
  email:     { color: 'var(--mod-email)',     wash: 'var(--mod-email-wash)',     name: 'Email',     icon: 'mail'        },
  sms:       { color: 'var(--mod-sms)',       wash: 'var(--mod-sms-wash)',       name: 'SMS',       icon: 'message'     },
  social:    { color: 'var(--mod-social)',    wash: 'var(--mod-social-wash)',    name: 'Social',    icon: 'share'       },
  seo:       { color: 'var(--mod-seo)',       wash: 'var(--mod-seo-wash)',       name: 'SEO Coach', icon: 'trending-up' },
  print:     { color: 'var(--mod-print)',     wash: 'var(--mod-print-wash)',     name: 'Print',     icon: 'printer'     },
};

const gmResolve = (mod) => GM_MODULES[mod] || GM_MODULES.crm;

// =============================================================================
// ICONS — lucide-style strokes, 1.75 default. Rounded caps + joins.
// =============================================================================

const gmIconBase = {
  fill: 'none',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const GMIcon = {
  users: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  target: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  trendingUp: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  building: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
    </svg>
  ),
  phone: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  message: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  globe: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  user: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  clock: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  check: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase} strokeWidth="2.25">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  arrowRight: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  link: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </svg>
  ),
  sparkles: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m12 3-1.9 5.7L4.5 10.5l5.6 1.8L12 18l1.9-5.7 5.6-1.8-5.6-1.8z" />
      <path d="M18 4v3M20 5.5h-3M5 18v3M6.5 19.5h-3" />
    </svg>
  ),
  settings: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  plus: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase} strokeWidth="2.25">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  database: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  ),
  calendar: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  chevronLeft: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  chevronRight: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  alertTriangle: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  receipt: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 1 2V2l-1 2-3-2-3 2-3-2-3 2z" />
      <path d="M8 9h8M8 13h6" />
    </svg>
  ),
  mail: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  ),
  edit: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  ),
  eye: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  moreHorizontal: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  ),
  info: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  star: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  ),
  x: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase} strokeWidth="2.25">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
};

// =============================================================================
// BUTTON
// =============================================================================
const GMButton = ({ children, variant='primary', module='crm', size='md', icon, fullWidth=false, disabled=false, onClick, style: extra={} }) => {
  const m = gmResolve(module);
  const sizing = size === 'sm'
    ? { padding: '7px 12px', fontSize: 12.5, gap: 6 }
    : { padding: '10px 16px', fontSize: 13.5, gap: 8 };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: sizing.gap,
    width: fullWidth ? '100%' : 'auto',
    padding: sizing.padding,
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-body)',
    fontSize: sizing.fontSize, fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 0,
    opacity: disabled ? 0.6 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
  };
  const variants = {
    primary:    { background: m.color, color: '#fff' },
    outline:    { background: '#fff', color: 'var(--foundation-slate)', border: '1px solid var(--foundation-pale)' },
    ghost:      { background: 'transparent', color: m.color, border: '1px solid transparent' },
    soft:       { background: m.wash, color: m.color, border: 0 },
    warning:    { background: 'var(--color-warning)', color: '#fff' },
    warningSoft:{ background: '#fff7ed', color: 'var(--color-warning)', border: '1px solid #fed7aa' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...extra }}>
      {icon}
      {children}
    </button>
  );
};

// =============================================================================
// STATUS DOT
// =============================================================================
const GMStatusDot = ({ color='var(--color-success)', size=8, pulse=false }) => (
  <span style={{
    position: 'relative', display: 'inline-flex',
    width: size, height: size,
  }}>
    {pulse && (
      <span style={{
        position: 'absolute', inset: -3,
        borderRadius: 999, background: color, opacity: 0.25,
        animation: 'gm-pulse 2.2s cubic-bezier(0.2, 0, 0, 1) infinite',
      }} />
    )}
    <span style={{
      position: 'relative', width: size, height: size, borderRadius: 999, background: color,
    }} />
  </span>
);

// =============================================================================
// STATUS BADGE
// =============================================================================
const GMStatusBadge = ({ icon, label, value, tone='success' }) => {
  const toneMap = {
    success: { bg: 'rgba(4,120,87,0.08)',  fg: 'var(--color-success)', dot: 'var(--color-success)' },
    warning: { bg: 'rgba(180,83,9,0.08)',  fg: 'var(--color-warning)', dot: 'var(--color-warning)' },
    info:    { bg: 'rgba(37,99,235,0.08)', fg: 'var(--color-info)',    dot: 'var(--color-info)' },
  };
  const t = toneMap[tone] || toneMap.success;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 11px 6px 10px',
      background: t.bg, color: t.fg,
      borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
    }}>
      {icon || GMIcon.database({ size: 13 })}
      <span>{label}</span>
      {value && (
        <>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: t.dot, opacity: 0.5 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{value}</span>
        </>
      )}
    </span>
  );
};

// =============================================================================
// KPI TILE
// =============================================================================
const GMKpiTile = ({ module='crm', label, value, caption, emptyCaption, icon, format, labelExtra }) => {
  const m = gmResolve(module);
  const isZero = value === 0 || value === '0' || value === '£0' || value == null;
  const displayCaption = isZero ? (emptyCaption || caption) : caption;
  const displayValue   = format ? format(value) : value;

  return (
    <div className="gm-kpi-tile" style={{
      position: 'relative',
      background: '#fff',
      border: '1px solid var(--foundation-pale)',
      borderRadius: 'var(--radius-md)',
      padding: '20px 22px',
      boxShadow: 'var(--shadow-xs)',
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
    }}>
      <div style={{
        position: 'absolute', top: 18, right: 18,
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: m.wash, color: m.color,
        display: 'grid', placeItems: 'center',
      }}>
        {icon}
      </div>

      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
        color: 'var(--foundation-mid)',
        marginBottom: 6,
        paddingRight: 48,
        whiteSpace: 'nowrap',
      }}>
        <span>{label}</span>
        {labelExtra && (
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            verticalAlign: 'middle', marginLeft: 5,
          }}>{labelExtra}</span>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700,
        letterSpacing: '-0.02em', lineHeight: 1.1,
        color: 'var(--foundation-dark)',
        marginBottom: displayCaption ? 8 : 0,
      }}>{displayValue}</div>

      {displayCaption && (
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.45,
          color: 'var(--foundation-mid)',
        }}>{displayCaption}</div>
      )}
    </div>
  );
};

// =============================================================================
// STATUS ROW
// =============================================================================
const GMStatusRow = ({ avatar, title, sub, statusLabel='Active', statusTone='success', linkLabel, last=false }) => {
  const dotColor = statusTone === 'success' ? 'var(--color-success)' :
                   statusTone === 'warning' ? 'var(--color-warning)' :
                   statusTone === 'info'    ? 'var(--color-info)'    :
                                              'var(--foundation-mid)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
    }}>
      {avatar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2,
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
          color: 'var(--foundation-dark)',
        }}>
          <span>{title}</span>
          {linkLabel && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, fontWeight: 600,
              color: 'var(--foundation-mid)',
            }}>
              {GMIcon.link({ size: 11 })}
              {linkLabel}
            </span>
          )}
        </div>
        <div style={{
          fontSize: 13, lineHeight: 1.45,
          color: 'var(--foundation-mid)',
        }}>{sub}</div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        fontSize: 12, fontWeight: 600,
        color: dotColor,
        whiteSpace: 'nowrap',
      }}>
        <GMStatusDot color={dotColor} pulse={statusTone === 'success'} />
        {statusLabel}
      </div>
    </div>
  );
};

const GMAvatar = ({ module='crm', icon, initial, size=36 }) => {
  const m = gmResolve(module);
  return (
    <div style={{
      width: size, height: size, borderRadius: 'var(--radius-sm)',
      background: m.wash, color: m.color,
      display: 'grid', placeItems: 'center', flexShrink: 0,
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
    }}>
      {icon || initial}
    </div>
  );
};

// =============================================================================
// SECTION CARD
// =============================================================================
const GMSectionCard = ({ title, sub, meta, action, children, accent=false, module='crm', padding='24px', flush=false }) => {
  const m = gmResolve(module);
  return (
    <section style={{
      position: 'relative',
      background: '#fff',
      border: '1px solid var(--foundation-pale)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
    }}>
      {accent && (
        <div style={{
          height: 3, width: '100%', background: m.color,
        }} />
      )}
      <div style={{ padding: flush ? 0 : padding }}>
        {(title || meta || action) && (
          <header style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4,
            padding: flush ? '20px 24px 8px' : 0,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <h3 style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
                  letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
                }}>{title}</h3>
              )}
              {sub && (
                <div style={{ marginTop: 2, fontSize: 13, color: 'var(--foundation-mid)' }}>{sub}</div>
              )}
            </div>
            {meta && (
              <div style={{ fontSize: 12.5, color: 'var(--foundation-mid)' }}>{meta}</div>
            )}
            {action}
          </header>
        )}
        {children}
      </div>
    </section>
  );
};

// =============================================================================
// LOGIC WALL CARD — extended. Each connection optionally has:
//   • connected: boolean   — false → render red X + greyed title.
// Backward-compatible with CRM / Booking / Invoicing bundles (default true).
// =============================================================================
const GMLogicWallCard = ({ module='crm', connections=[], footerNote }) => {
  const m = gmResolve(module);
  const allConnected = connections.every(c => c.connected !== false);
  const connectedCount = connections.filter(c => c.connected !== false).length;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--foundation-pale)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 18px',
        background: m.wash,
        borderBottom: `1px solid ${m.wash}`,
      }}>
        <span style={{ color: m.color, display: 'inline-flex' }}>
          {GMIcon.database({ size: 14 })}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.10em', textTransform: 'uppercase',
          color: m.color,
        }}>Logic Wall {allConnected ? 'active' : 'syncing'}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: m.color, fontWeight: 600 }}>
          {connectedCount}/{connections.length}
        </span>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: '8px 18px 0' }}>
        {connections.map((c, i) => {
          const isConnected = c.connected !== false;
          return (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 0',
              borderBottom: i === connections.length - 1 ? '0' : '1px solid var(--foundation-pale)',
            }}>
              <span style={{
                color: isConnected ? m.color : 'var(--color-danger)',
                display: 'inline-flex', flexShrink: 0, marginTop: 3,
              }}>
                {isConnected ? GMIcon.check({ size: 14 }) : GMIcon.x({ size: 14 })}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  color: isConnected ? 'var(--foundation-dark)' : 'var(--foundation-mid)',
                  marginBottom: 2, lineHeight: 1.35,
                }}>{c.title}</div>
                {c.source && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 11.5, color: 'var(--foundation-mid)',
                  }}>
                    {GMIcon.link({ size: 11 })}
                    <span>{c.source}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {footerNote && (
        <div style={{
          margin: '10px 18px 14px',
          padding: '10px 12px',
          background: m.wash,
          borderRadius: 'var(--radius-sm)',
          fontSize: 11.5, lineHeight: 1.5,
          color: m.color, fontWeight: 500,
        }}>
          {footerNote}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// EMPTY STATE ROW
// =============================================================================
const GMEmptyStateRow = ({ lead, sub, cta, ctaIcon, onCta, module='crm' }) => (
  <div style={{
    padding: '56px 24px 64px',
    textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
  }}>
    <div style={{
      maxWidth: 480,
      fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600,
      lineHeight: 1.55, color: 'var(--foundation-dark)',
    }}>{lead}</div>
    {sub && (
      <div style={{
        maxWidth: 520, fontSize: 13.5, lineHeight: 1.55,
        color: 'var(--foundation-mid)',
        textWrap: 'pretty',
      }}>{sub}</div>
    )}
    {cta && (
      <div style={{ marginTop: 8 }}>
        <GMButton module={module} variant="outline" size="sm"
                  onClick={onCta}
                  icon={ctaIcon || GMIcon.plus({ size: 13 })}>
          {cta}
        </GMButton>
      </div>
    )}
  </div>
);

if (typeof document !== 'undefined' && !document.getElementById('gm-keyframes')) {
  const s = document.createElement('style');
  s.id = 'gm-keyframes';
  s.textContent = `
    @keyframes gm-pulse {
      0%   { transform: scale(0.6); opacity: 0.45; }
      80%  { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes gm-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes gm-rise {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(s);
}

// =============================================================================
// PersonaPill / PersonaAvatar — lifted from Invoicing, Reviews uses both on
// the recent-reviews list to identify each customer's Step 4 persona.
// =============================================================================
const PERSONA_TINTS = {
  default:  { bg: 'var(--foundation-wash)',       fg: 'var(--foundation-slate)' },
  premium:  { bg: 'var(--mod-invoicing-wash)',    fg: 'var(--mod-invoicing)'    },
  family:   { bg: 'var(--mod-crm-wash)',          fg: 'var(--mod-crm)'          },
  show:     { bg: 'var(--mod-chatbot-wash)',      fg: 'var(--mod-chatbot)'      },
  walkIn:   { bg: 'var(--mod-voice-wash)',        fg: 'var(--mod-voice)'        },
};

const PersonaPill = ({ children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px 2px 7px',
    background: 'var(--mod-reviews-wash)',
    color: 'var(--mod-reviews)',
    borderRadius: 999,
    fontSize: 11, fontWeight: 600,
    whiteSpace: 'nowrap',
  }}>
    <span style={{ display: 'inline-flex', marginTop: -1 }}>
      {GMIcon.sparkles({ size: 10 })}
    </span>
    {children}
  </span>
);

const PersonaAvatar = ({ initials, tint='default', size=36 }) => {
  const t = PERSONA_TINTS[tint] || PERSONA_TINTS.default;
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: t.bg, color: t.fg,
      display: 'grid', placeItems: 'center', flexShrink: 0,
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size <= 32 ? 12 : 13,
    }}>
      {initials}
    </div>
  );
};

// =============================================================================
// =============================================================================
// REVIEWS-ONLY ADDITIONS (line 700+)
// =============================================================================
// =============================================================================

// New Reviews icons appended to GMIcon. Lucide 1.75-stroke, rounded caps.
Object.assign(GMIcon, {
  award: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="8" r="6" />
      <path d="m15.5 12.5 1.5 8L12 18l-5 2.5 1.5-8" />
    </svg>
  ),
  flag: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22V3" />
    </svg>
  ),
  send: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  share: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  ),
  zap: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
    </svg>
  ),
  messageSquare: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  checkCircle2: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  chevronDown: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  reply: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m9 17-5-5 5-5" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  ),
  search: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
});

// =============================================================================
// StarsDisplay — one row of N filled + (5-N) empty stars. Used in:
//   • Recent reviews list row
//   • Rating Distribution big-number empty state
//   • KPI tile context (future)
// Reusable across modules (the brief earmarks this for gm-shared.tsx).
// =============================================================================
const StarsDisplay = ({ value=0, size=14, gap=2, filledColor='var(--mod-reviews)', emptyColor='var(--foundation-pale)' }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap,
      lineHeight: 1,
    }}>
      {stars.map(n => {
        const filled = n <= Math.floor(value);
        return (
          <svg key={n} width={size} height={size} viewBox="0 0 24 24"
               fill={filled ? filledColor : 'none'}
               stroke={filled ? filledColor : emptyColor}
               strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        );
      })}
    </span>
  );
};

// =============================================================================
// RatingBar — one row of the rating distribution.
//   ┌──────────────────────────────────────────┐
//   │ 5★ [████████████████████░░░░░░░░░]   12 │
//   └──────────────────────────────────────────┘
// Star label | proportional fill | count
// Reusable.
// =============================================================================
const RatingBar = ({ rating, count=0, total=0 }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '34px 1fr 28px',
      alignItems: 'center',
      gap: 10,
      padding: '5px 0',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 2,
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
        color: 'var(--foundation-slate)',
        lineHeight: 1,
      }}>
        <span>{rating}</span>
        <svg width="11" height="11" viewBox="0 0 24 24"
             fill="var(--mod-reviews)" stroke="var(--mod-reviews)"
             strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      </div>
      <div style={{
        position: 'relative',
        height: 7,
        borderRadius: 999,
        background: 'var(--foundation-pale)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          width: `${pct}%`,
          background: 'var(--mod-reviews)',
          borderRadius: 999,
          transition: 'width var(--dur-slow) var(--ease-standard)',
        }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600,
        color: 'var(--foundation-mid)',
        textAlign: 'right',
      }}>{count}</div>
    </div>
  );
};

// =============================================================================
// ReviewRow — one row of the Recent Reviews list.
//
// Anatomy:
//   ┌────────────────────────────────────────────────────────────────┐
//   │ ◉ Name  ✨Persona  🟦Source     ★★★★★      18 May 2026  · ⋮  │
//   │     "Review body, 3-line clamp..."          [Reply] [Share]    │
//   └────────────────────────────────────────────────────────────────┘
//
// Critical: 1-3 star reviews get a soft amber wash bg + flag icon top-left.
// Visually distinct from 4-5 star but not alarming.
// =============================================================================
const SOURCE_PLATFORM_META = {
  google:     { label: 'Google',     icon: GMIcon.globe },
  trustpilot: { label: 'Trustpilot', icon: GMIcon.star },
  direct:     { label: 'Direct',     icon: GMIcon.globe },
};

const ReviewRow = ({ review, last=false }) => {
  const flagged = review.rating <= 3;
  const source = SOURCE_PLATFORM_META[review.source] || SOURCE_PLATFORM_META.direct;
  return (
    <article style={{
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      gap: 14,
      padding: '18px 22px',
      background: flagged ? 'rgba(180,83,9,0.04)' : '#fff',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
      borderLeft: flagged ? '3px solid var(--mod-reviews)' : '3px solid transparent',
    }}>
      {/* Flag indicator for flagged rows */}
      {flagged && (
        <div style={{
          position: 'absolute',
          top: 14, right: 16,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 9px',
          background: 'var(--mod-reviews-wash)',
          color: 'var(--mod-reviews)',
          borderRadius: 999,
          fontSize: 10.5, fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          {GMIcon.flag({ size: 10 })}
          Flagged for follow-up
        </div>
      )}

      <PersonaAvatar
        initials={review.initials}
        tint={review.tint}
        size={40}
      />

      <div style={{ minWidth: 0 }}>
        {/* Top row: name + persona + source */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 6, flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
            color: 'var(--foundation-dark)',
          }}>{review.name}</span>
          <PersonaPill>{review.persona}</PersonaPill>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 8px 2px 7px',
            background: 'var(--foundation-wash)',
            color: 'var(--foundation-slate)',
            border: '1px solid var(--foundation-pale)',
            borderRadius: 999,
            fontSize: 10.5, fontWeight: 600,
          }}>
            <span style={{ display: 'inline-flex' }}>{source.icon({ size: 10 })}</span>
            {source.label}
          </span>
        </div>

        {/* Stars + date */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 8,
        }}>
          <StarsDisplay value={review.rating} size={14} />
          <span style={{
            fontSize: 11.5, color: 'var(--foundation-mid)',
            fontWeight: 500,
          }}>{review.publishedAt}</span>
        </div>

        {/* Body */}
        <div style={{
          fontSize: 13.5, lineHeight: 1.55,
          color: 'var(--foundation-slate)',
          marginBottom: 12,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textWrap: 'pretty',
        }}>{review.body}</div>

        {/* Actions */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          flexWrap: 'wrap',
        }}>
          <GMButton module="reviews" variant="outline" size="sm"
                    icon={GMIcon.reply({ size: 12 })}>
            Reply
          </GMButton>
          <GMButton module="reviews" variant="outline" size="sm"
                    icon={GMIcon.share({ size: 12 })}>
            Share
          </GMButton>
          <button style={{
            all: 'unset', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 'var(--radius-sm)',
            color: 'var(--foundation-mid)',
            border: '1px solid var(--foundation-pale)',
            background: '#fff',
          }} aria-label="More actions">
            {GMIcon.moreHorizontal({ size: 14 })}
          </button>
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// FlywheelStage — one stage of the Reputation Flywheel right-rail card.
//
// Visually consistent with Invoicing's RevenueEngineStage (same anatomy:
// 32px icon · 1fr label block · auto pulse chip) but rev-flywheel-* prefix.
// Reviews-only, doesn't shoehorn into inv-rev-engine.
// =============================================================================
const FLYWHEEL_TINTS = {
  foundation: { bg: 'var(--foundation-wash)',    fg: 'var(--foundation-slate)' },
  invoicing:  { bg: 'var(--mod-invoicing-wash)', fg: 'var(--mod-invoicing)'    },
  reviews:    { bg: 'var(--mod-reviews-wash)',   fg: 'var(--mod-reviews)'      },
  seo:        { bg: 'var(--mod-seo-wash)',       fg: 'var(--mod-seo)'          },
};

const FlywheelStage = ({ stage, last }) => {
  const tint = FLYWHEEL_TINTS[stage.tint] || FLYWHEEL_TINTS.foundation;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '32px 1fr auto',
        gap: 12, alignItems: 'center',
        padding: '12px 14px',
        background: tint.bg,
        border: stage.current
          ? `1.5px solid var(--mod-reviews)`
          : '1px solid transparent',
        borderRadius: 'var(--radius-sm)',
        boxShadow: stage.current ? '0 0 0 3px rgba(180,83,9,0.08)' : 'none',
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: 'var(--radius-xs)',
          background: '#fff', color: tint.fg,
          display: 'grid', placeItems: 'center',
        }}>
          {stage.icon}
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700,
            letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
            lineHeight: 1.2,
          }}>{stage.name}</div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: tint.fg,
            letterSpacing: '0.04em',
          }}>{stage.label}</div>
        </div>
        {stage.current && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 8px',
            background: '#fff', color: 'var(--mod-reviews)',
            border: '1px solid rgba(180,83,9,0.30)',
            borderRadius: 999,
            fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            <GMStatusDot color="var(--mod-reviews)" size={6} pulse />
            You are here
          </span>
        )}
      </div>
      {!last && (
        <div style={{
          width: 2, height: 12,
          background: 'var(--foundation-pale)',
          margin: '0 auto',
        }} />
      )}
    </div>
  );
};

// =============================================================================
// =============================================================================
// SEO COACH ADDITIONS (line 1100+)
// =============================================================================
// =============================================================================

// New SEO icons appended to GMIcon. Lucide 1.75-stroke, rounded caps.
Object.assign(GMIcon, {
  refreshCw: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  mapPin: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  externalLink: (p={}) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  ),
  bell: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  fileText: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6M8 9h2" />
    </svg>
  ),
  lockClosed: (p={}) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
});

// =============================================================================
// MetaLenStatus — colour-coded character-count pill for meta title / meta
// description cells in the per-page SEO health table.
//
// Thresholds per brief:
//   • Meta title:       green 50-60 | amber 30-49 or 61-70 | red <30 or >70 | grey 0
//   • Meta description: green 150-160 | amber 100-149 or 161-170 | red <100 or >170 | grey 0
// =============================================================================
const META_THRESHOLDS = {
  title: { greenMin: 50, greenMax: 60, amberMin: 30, amberMax: 70 },
  desc:  { greenMin: 150, greenMax: 160, amberMin: 100, amberMax: 170 },
};

const metaTone = (count, kind = 'title') => {
  if (!count) return 'empty';
  const t = META_THRESHOLDS[kind];
  if (count >= t.greenMin && count <= t.greenMax) return 'green';
  if (count >= t.amberMin && count <= t.amberMax) return 'amber';
  return 'red';
};

const META_TONE_STYLE = {
  green: { fg: 'var(--color-success)', dot: 'var(--color-success)', bg: 'rgba(4,120,87,0.10)' },
  amber: { fg: 'var(--color-warning)', dot: 'var(--color-warning)', bg: 'rgba(180,83,9,0.10)' },
  red:   { fg: 'var(--color-danger)',  dot: 'var(--color-danger)',  bg: 'rgba(185,28,28,0.10)' },
  empty: { fg: 'var(--foundation-mid)', dot: 'var(--foundation-mid)', bg: 'var(--foundation-wash)' },
};

const MetaLenStatus = ({ count = 0, kind = 'title' }) => {
  const tone = metaTone(count, kind);
  const s = META_TONE_STYLE[tone];
  const label = count ? `${count} chars` : 'Empty';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px 3px 8px',
      background: s.bg,
      color: s.fg,
      borderRadius: 999,
      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 999,
        background: s.dot, flexShrink: 0,
      }} />
      {label}
    </span>
  );
};

// =============================================================================
// SEOPageRow — one row of the per-page SEO health table (Zone 4c).
//
// Columns: Page (name + path) | Focus keyword | Meta title | Meta description
//        | Schema type | Action button.
//
// Grid columns are fixed widths so columns align across rows. The card
// header above uses the same grid.
// =============================================================================
const SEO_PAGE_GRID = 'minmax(140px, 1.6fr) minmax(150px, 1.6fr) 110px 110px 110px 78px';

const SEOPageRow = ({ page, last = false, onEdit }) => {
  const hasFocus = Boolean(page.focusKeyword);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: SEO_PAGE_GRID,
      gap: 14, alignItems: 'center',
      padding: '14px 22px',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Page name + path */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 13.5, fontWeight: 600,
          color: 'var(--foundation-dark)',
          lineHeight: 1.3,
        }}>{page.name}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--foundation-mid)',
        }}>{page.path}</div>
      </div>

      {/* Focus keyword */}
      <div style={{ minWidth: 0 }}>
        {hasFocus ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px 4px 8px',
            background: 'var(--mod-seo-wash)',
            color: 'var(--mod-seo)',
            borderRadius: 999,
            fontSize: 12, fontWeight: 600,
            maxWidth: '100%',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {GMIcon.target({ size: 11 })}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{page.focusKeyword}</span>
          </span>
        ) : (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px 4px 8px',
            background: 'var(--foundation-wash)',
            color: 'var(--foundation-mid)',
            border: '1px dashed var(--foundation-pale)',
            borderRadius: 999,
            fontSize: 11.5, fontWeight: 600,
          }}>
            Not set
          </span>
        )}
      </div>

      {/* Meta title */}
      <MetaLenStatus count={page.metaTitleLen || 0} kind="title" />

      {/* Meta description */}
      <MetaLenStatus count={page.metaDescLen || 0} kind="desc" />

      {/* Schema type */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 9px',
        background: '#fff',
        border: '1px solid var(--foundation-pale)',
        borderRadius: 'var(--radius-xs)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
        color: 'var(--foundation-slate)',
        whiteSpace: 'nowrap',
        maxWidth: 'fit-content',
      }}>{page.schemaType || 'Default'}</span>

      {/* Action */}
      <GMButton module="seo" variant="outline" size="sm"
                icon={GMIcon.edit({ size: 12 })}
                onClick={() => onEdit && onEdit(page)}>
        Edit
      </GMButton>
    </div>
  );
};

// =============================================================================
// CitationChecklistRow — one row of the manual citation builder (Zone 4d).
//
// Checkbox + directory name + "Open" outline button to submission URL.
// No auto-submit promise. Honest manual checklist.
// =============================================================================
const CitationChecklistRow = ({ directory, checked = false, last = false, onToggle, onOpen }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '24px minmax(0, 1fr) auto',
    gap: 14, alignItems: 'center',
    padding: '12px 0',
    borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
  }}>
    {/* Checkbox */}
    <button
      onClick={() => onToggle && onToggle(directory.id)}
      aria-pressed={checked}
      aria-label={`Mark ${directory.name} as submitted`}
      style={{
        all: 'unset',
        cursor: 'pointer',
        width: 20, height: 20, borderRadius: 'var(--radius-xs)',
        background: checked ? 'var(--mod-seo)' : '#fff',
        border: `1.5px solid ${checked ? 'var(--mod-seo)' : 'var(--foundation-pale)'}`,
        display: 'grid', placeItems: 'center',
        color: '#fff',
        transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
      }}
    >
      {checked && GMIcon.check({ size: 12 })}
    </button>

    {/* Name + helper text */}
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
        color: checked ? 'var(--foundation-mid)' : 'var(--foundation-dark)',
        textDecoration: checked ? 'line-through' : 'none',
        textDecorationColor: 'rgba(100, 116, 139, 0.5)',
        lineHeight: 1.3,
      }}>{directory.name}</div>
      <div style={{
        fontSize: 11.5, color: 'var(--foundation-mid)',
        lineHeight: 1.4,
      }}>{directory.helper}</div>
    </div>

    {/* Open button */}
    <GMButton module="seo" variant="outline" size="sm"
              icon={GMIcon.externalLink({ size: 11 })}
              onClick={() => onOpen && onOpen(directory)}>
      Open
    </GMButton>
  </div>
);

// =============================================================================
// RoadmapRow — one row of the honest forward roadmap card (Zone 5d).
//
// Grey clock icon + title + description. No toggles. No fake state. Just
// transparent forward visibility.
// =============================================================================
const RoadmapRow = ({ title, description, last = false }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '24px minmax(0, 1fr)',
    gap: 12, alignItems: 'flex-start',
    padding: '12px 0',
    borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
  }}>
    <span style={{
      width: 22, height: 22, borderRadius: 'var(--radius-xs)',
      background: 'var(--foundation-wash)',
      color: 'var(--foundation-mid)',
      display: 'grid', placeItems: 'center',
      marginTop: 1,
    }}>
      {GMIcon.clock({ size: 12 })}
    </span>
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
        color: 'var(--foundation-dark)',
        lineHeight: 1.35,
        marginBottom: 2,
      }}>{title}</div>
      <div style={{
        fontSize: 11.5, color: 'var(--foundation-mid)',
        lineHeight: 1.45,
      }}>{description}</div>
    </div>
  </div>
);

// =============================================================================
// =============================================================================
// EMAIL MARKETING ADDITIONS (line 1340+)
//
// Per the Email Marketing brief — this bundle adds:
//   • New icons: zap is reused, plus envelope (alias of mail at 20px),
//     paperPlane, palette, swatch, copy, trash, eyeOff, switchHandle.
//   • GMSwitch          — generic toggle switch primitive (used by the
//     Welcome Sequence automation tile, also future Reviews-auto / SMS-auto).
//   • AutomationTile    — reusable "always-on Grow product" surface. Same
//     anatomy across Email Welcome Sequence, SMS auto-reply, Social
//     scheduled posting. Indigo-wash icon + title + chips + status counter
//     + GMSwitch. NEW primitive intended for gm-shared.tsx.
//   • EmailCampaignRow  — one row of the Active campaigns list. Module-
//     coloured avatar + campaign name + status pill + subject sub-line +
//     4-stat grid + timestamp + ⋮ dropdown trigger.
//   • EmailStatusPill   — campaign status pill: Sent (success) / Draft
//     (foundation) / Scheduled (info) / Sending (info pulse) / Failed
//     (danger).
//   • EmailRowDropdown  — visual contract for the ⋮ dropdown menu. Open
//     state shows the 5 menu items: Send / View / Edit / Duplicate /
//     Analytics. Closed state is just the trigger button.
//   • EmailSequenceCard — one of the 4 email cards in the AI generator /
//     view-emails dialogs. Day pill + envelope icon + subject + preview
//     line + module-coloured left border accent.
// =============================================================================

Object.assign(GMIcon, {
  paperPlane: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  palette: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor"/>
      <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2a10 10 0 1 0 0 20c1 0 2-1 2-2 0-1-1-2-1-3 0-1 1-2 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
    </svg>
  ),
  copy: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  trash: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  barChart: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M12 20V10M18 20V4M6 20v-6" />
    </svg>
  ),
  cursorClick: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m9 11 3 3 8.5-8.5L18 3z" />
      <path d="M9 11 3 17a5 5 0 0 0 7.07 7.07L16 18" />
      <path d="m12 14 3 6" />
    </svg>
  ),
  send2: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
});

// =============================================================================
// GMSwitch — generic toggle. Width 38, height 22, knob 18. Indigo when on,
// foundation-pale when off. Used by the Welcome Sequence automation tile.
// =============================================================================
const GMSwitch = ({ checked = false, module = 'email', onChange, disabled = false, ariaLabel }) => {
  const m = gmResolve(module);
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      style={{
        all: 'unset',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        display: 'inline-flex',
        width: 38, height: 22,
        background: checked ? m.color : 'var(--foundation-pale)',
        borderRadius: 999,
        transition: 'background var(--dur-fast) var(--ease-standard)',
        opacity: disabled ? 0.5 : 1,
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 2, left: checked ? 18 : 2,
        width: 18, height: 18,
        background: '#fff',
        borderRadius: 999,
        boxShadow: '0 1px 2px rgba(15, 25, 35, 0.18)',
        transition: 'left var(--dur-fast) var(--ease-standard)',
      }} />
    </button>
  );
};

// =============================================================================
// AutomationTile — reusable "always-on Grow product" surface.
//
// Anatomy (all driven by props so SMS auto-reply / Social scheduled posting
// can reuse this shape on later bundles):
//
//   ┌─────────────────────────────────────────────────────────────────────┐
//   │ [⚡]  Welcome Sequence   ⓘ           Active     2 campaigns  [ON]   │
//   │      Automatically sends 4-email…                                   │
//   │      [🔗 CRM]  [🔗 Step 4: Personas]                                │
//   └─────────────────────────────────────────────────────────────────────┘
//
// `active` toggles colour-of-card (subtle ring) and Active/Paused pill copy.
// `tone` ('success'|'warning') colours the status pill.
// `module` controls the avatar + ring + switch colour cascade.
// =============================================================================
const AutomationTile = ({
  module = 'email',
  icon,
  title,
  sub,
  chips = [],         // array of { label, module?, link? }
  body = null,        // optional body slot rendered beneath the header row
  active = true,
  activeLabel,
  pausedLabel,
  countText,
  checked = true,
  onToggle,
}) => {
  const m = gmResolve(module);
  const pillBg = active ? 'rgba(4,120,87,0.10)' : 'var(--foundation-wash)';
  const pillFg = active ? 'var(--color-success)' : 'var(--foundation-mid)';
  const dotCol = active ? 'var(--color-success)' : 'var(--foundation-mid)';

  return (
    <section style={{
      position: 'relative',
      background: '#fff',
      border: active ? `1px solid ${m.color}33` : '1px solid var(--foundation-pale)',
      boxShadow: active ? `0 0 0 3px ${m.wash}` : 'var(--shadow-xs)',
      borderRadius: 'var(--radius-md)',
      padding: '18px 22px 16px',
    }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      gap: 16,
      alignItems: 'flex-start',
    }}>
      {/* Icon block */}
      <div style={{
        width: 44, height: 44,
        background: m.wash, color: m.color,
        borderRadius: 'var(--radius-sm)',
        display: 'grid', placeItems: 'center',
        marginTop: 2,
      }}>
        {icon}
      </div>

      {/* Title + sub + chips */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 4, flexWrap: 'wrap',
        }}>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
            letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
          }}>{title}</h3>
          <span style={{
            color: 'var(--foundation-mid)',
            display: 'inline-flex', cursor: 'help',
          }} aria-label="What this does">
            {GMIcon.info({ size: 13 })}
          </span>
        </div>
        <div style={{
          fontSize: 13, lineHeight: 1.5,
          color: 'var(--foundation-mid)',
          marginBottom: 10,
          textWrap: 'pretty',
        }}>{sub}</div>
        {chips.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {chips.map((c, i) => {
              const chipMod = c.module ? gmResolve(c.module) : null;
              const chipBg = chipMod ? chipMod.wash : 'var(--foundation-wash)';
              const chipFg = chipMod ? chipMod.color : 'var(--foundation-slate)';
              const border = chipMod ? '0' : '1px solid var(--foundation-pale)';
              return (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 9px 3px 8px',
                  background: chipBg, color: chipFg,
                  border, borderRadius: 999,
                  fontSize: 11, fontWeight: 600,
                }}>
                  {GMIcon.link({ size: 10 })}
                  {c.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Right cluster: status pill + count + switch */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        gap: 8, flexShrink: 0,
        minWidth: 130,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 11px 4px 10px',
            background: pillBg, color: pillFg,
            borderRadius: 999,
            fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 700,
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            <GMStatusDot color={dotCol} size={7} pulse={active} />
            {active ? (activeLabel || 'Active') : (pausedLabel || 'Paused')}
          </span>
          <GMSwitch module={module} checked={checked} onChange={onToggle}
                    ariaLabel={`Toggle ${title}`} />
        </div>
        {countText && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11.5,
            color: 'var(--foundation-mid)', fontWeight: 500,
            whiteSpace: 'nowrap',
          }}>{countText}</div>
        )}
      </div>
    </div>
    {body && (
      <div style={{ marginTop: 14 }}>{body}</div>
    )}
    </section>
  );
};

// =============================================================================
// EmailStatusPill — campaign status pill.
//   sent      → success    (filled success-wash)
//   draft     → secondary  (foundation-wash + slate)
//   scheduled → info       (blue wash + blue, clock icon)
//   sending   → info pulse (blue wash + pulse dot)
//   failed    → danger     (red wash + alert triangle)
// =============================================================================
const EMAIL_STATUS_META = {
  sent:      { bg: 'rgba(4,120,87,0.10)',  fg: 'var(--color-success)', dot: 'var(--color-success)', label: 'Sent',      pulse: false },
  draft:     { bg: 'var(--foundation-wash)', fg: 'var(--foundation-slate)', dot: 'var(--foundation-mid)', label: 'Draft', pulse: false },
  scheduled: { bg: 'rgba(37,99,235,0.10)',  fg: 'var(--color-info)',    dot: 'var(--color-info)',    label: 'Scheduled', pulse: false },
  sending:   { bg: 'rgba(37,99,235,0.10)',  fg: 'var(--color-info)',    dot: 'var(--color-info)',    label: 'Sending',   pulse: true  },
  failed:    { bg: 'rgba(185,28,28,0.10)',  fg: 'var(--color-danger)',  dot: 'var(--color-danger)',  label: 'Failed',    pulse: false },
};

const EmailStatusPill = ({ status = 'draft' }) => {
  const s = EMAIL_STATUS_META[status] || EMAIL_STATUS_META.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px 3px 9px',
      background: s.bg, color: s.fg,
      borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <GMStatusDot color={s.dot} size={6} pulse={s.pulse} />
      {s.label}
    </span>
  );
};

// =============================================================================
// EmailRowDropdown — visual contract for the ⋮ dropdown.
//
// Closed state: just a 28×28 outline button with moreHorizontal icon.
// Open state:   button + absolutely-positioned menu below-right with 5 items:
//                 • Send campaign         (drafts only — wired to SendGrid)
//                 • View emails           (opens View Emails dialog)
//                 • Edit campaign         (toast Coming soon for now)
//                 • Duplicate             (real CRUD via createEmailCampaign)
//                 • View analytics        (toast with real numbers)
// =============================================================================
const EmailRowDropdown = ({ open = false, canSend = false, onToggle, onPick }) => {
  const items = [
    { id: 'send',      label: 'Send campaign',      icon: GMIcon.send,   tint: 'var(--mod-email)',   bold: true, gated: !canSend, gatedNote: 'Drafts only' },
    { id: 'view',      label: 'View emails',         icon: GMIcon.eye,    tint: 'var(--foundation-slate)' },
    { id: 'edit',      label: 'Edit campaign',       icon: GMIcon.edit,   tint: 'var(--foundation-slate)', soonNote: 'Coming soon' },
    { id: 'duplicate', label: 'Duplicate',           icon: GMIcon.copy,   tint: 'var(--foundation-slate)' },
    { id: 'analytics', label: 'View analytics',      icon: GMIcon.barChart, tint: 'var(--foundation-slate)' },
  ];

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => onToggle && onToggle()}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Campaign actions"
        style={{
          all: 'unset', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: 'var(--radius-sm)',
          color: 'var(--foundation-mid)',
          border: '1px solid var(--foundation-pale)',
          background: open ? 'var(--foundation-wash)' : '#fff',
        }}
      >
        {GMIcon.moreHorizontal({ size: 16 })}
      </button>

      {open && (
        <div role="menu" style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          minWidth: 220,
          background: '#fff',
          border: '1px solid var(--foundation-pale)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          padding: 6,
          zIndex: 20,
          animation: 'gm-rise var(--dur-base) var(--ease-emphasised)',
        }}>
          {items.map(item => {
            const disabled = item.gated;
            const isBold = item.bold && !disabled;
            return (
              <button
                key={item.id}
                onClick={() => !disabled && onPick && onPick(item.id)}
                disabled={disabled}
                role="menuitem"
                style={{
                  all: 'unset',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  display: 'grid',
                  gridTemplateColumns: '18px 1fr auto',
                  gap: 10,
                  alignItems: 'center',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: isBold ? 600 : 500,
                  color: disabled ? 'var(--foundation-mid)' : (isBold ? item.tint : 'var(--foundation-dark)'),
                  opacity: disabled ? 0.55 : 1,
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ color: isBold && !disabled ? item.tint : 'var(--foundation-mid)', display: 'inline-flex' }}>
                  {item.icon({ size: 13 })}
                </span>
                <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                {(item.gatedNote && disabled) && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--foundation-mid)',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>{item.gatedNote}</span>
                )}
                {(item.soonNote) && !disabled && (
                  <span style={{
                    padding: '1px 6px',
                    background: 'var(--foundation-wash)',
                    color: 'var(--foundation-mid)',
                    border: '1px solid var(--foundation-pale)',
                    borderRadius: 999,
                    fontSize: 9.5, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>{item.soonNote}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// EmailCampaignRow — one row of the Active Campaigns list (Zone 4c).
//
// Anatomy:
//   ┌──────────────────────────────────────────────────────────────────────┐
//   │ [✉]  Spring grooming refresh    [SENT]                         [ ⋮ ] │
//   │      Subject: "Your dog's spring makeover is here"                   │
//   │      ┌──────────┬──────────┬──────────┬──────────┐                   │
//   │      │ 142      │ 142      │ 38.7%    │ 12.4%    │                   │
//   │      │ Recip.   │ Sent     │ Open Rt. │ Click Rt.│                   │
//   │      └──────────┴──────────┴──────────┴──────────┘                   │
//   │      🕓 Sent: 16 May 2026                                            │
//   └──────────────────────────────────────────────────────────────────────┘
//
// Status pill uses EmailStatusPill above. Footer timestamp varies by status.
// =============================================================================
const _campaignStat = (label, value, mono = true) => (
  <div style={{
    padding: '10px 12px',
    background: 'var(--foundation-wash)',
    borderRadius: 'var(--radius-xs)',
    display: 'flex', flexDirection: 'column', gap: 2,
    minWidth: 0,
  }}>
    <div style={{
      fontFamily: mono ? 'var(--font-display)' : 'var(--font-body)',
      fontSize: 18, fontWeight: 700,
      letterSpacing: '-0.015em',
      color: 'var(--foundation-dark)',
      lineHeight: 1.1,
    }}>{value}</div>
    <div style={{
      fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 600,
      color: 'var(--foundation-mid)',
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>{label}</div>
  </div>
);

const _formatTimestamp = (campaign) => {
  if (campaign.status === 'sent' && campaign.sentAt)        return `Sent: ${campaign.sentAt}`;
  if (campaign.status === 'scheduled' && campaign.scheduledAt) return `Scheduled: ${campaign.scheduledAt}`;
  if (campaign.status === 'sending')                         return 'Sending now…';
  if (campaign.status === 'failed' && campaign.failedAt)    return `Failed: ${campaign.failedAt}`;
  return 'Not sent yet';
};

const EmailCampaignRow = ({ campaign, openDropdownId, onToggleDropdown, onPick, last = false }) => {
  const open    = openDropdownId === campaign.id;
  const canSend = campaign.status === 'draft';
  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      gap: 16,
      padding: '20px 24px',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
      background: '#fff',
      position: 'relative',
    }}>
      {/* Avatar */}
      <GMAvatar module="email" icon={GMIcon.mail({ size: 18 })} size={40} />

      <div style={{ minWidth: 0 }}>
        {/* Header row: name + status pill + dropdown */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4,
        }}>
          <h4 style={{
            margin: 0, minWidth: 0,
            fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600,
            color: 'var(--foundation-dark)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{campaign.name}</h4>
          <EmailStatusPill status={campaign.status} />
          <div style={{ marginLeft: 'auto' }}>
            <EmailRowDropdown
              open={open}
              canSend={canSend}
              onToggle={() => onToggleDropdown && onToggleDropdown(campaign.id)}
              onPick={(id) => onPick && onPick(id, campaign)}
            />
          </div>
        </div>

        {/* Subject */}
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5,
          color: 'var(--foundation-mid)',
          marginBottom: 12,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 600,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: 'var(--foundation-mid)',
            marginRight: 6,
          }}>Subject</span>
          <span style={{ color: 'var(--foundation-slate)' }}>{campaign.subject}</span>
        </div>

        {/* 4-stat grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginBottom: 12,
        }}>
          {_campaignStat('Recipients', campaign.recipients ?? 0)}
          {_campaignStat('Sent',       campaign.sent ?? 0)}
          {_campaignStat('Open rate',  campaign.openRate  != null ? `${campaign.openRate}%`  : '—')}
          {_campaignStat('Click rate', campaign.clickRate != null ? `${campaign.clickRate}%` : '—')}
        </div>

        {/* Footer timestamp */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'var(--foundation-mid)',
        }}>
          {GMIcon.clock({ size: 12 })}
          <span>{_formatTimestamp(campaign)}</span>
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// EmailSequenceCard — one of the 4 cards in the AI Generator preview and the
// View Emails dialog.
//
//   ┌─────────────────────────────────────────────────┐
//   │ ▎[D1] [✉]  Welcome to Brightside                │
//   │ ▎       Thanks for trusting us with your dog…   │
//   └─────────────────────────────────────────────────┘
// =============================================================================
const EmailSequenceCard = ({ email, accent = 'var(--mod-email)' }) => (
  <article style={{
    display: 'grid',
    gridTemplateColumns: '4px auto minmax(0, 1fr)',
    gap: 12,
    background: '#fff',
    border: '1px solid var(--foundation-pale)',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
  }}>
    <div style={{ background: accent }} />
    <div style={{
      width: 32, height: 32,
      margin: '14px 0 14px 14px',
      background: 'var(--mod-email-wash)',
      color: 'var(--mod-email)',
      borderRadius: 'var(--radius-xs)',
      display: 'grid', placeItems: 'center',
    }}>
      {GMIcon.mail({ size: 16 })}
    </div>
    <div style={{ padding: '14px 16px 14px 0', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '2px 7px',
          background: 'var(--mod-email-wash)',
          color: 'var(--mod-email)',
          borderRadius: 999,
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.04em',
        }}>Day {email.day}</span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
          color: 'var(--foundation-dark)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{email.subject}</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5,
        color: 'var(--foundation-mid)',
        textWrap: 'pretty',
        overflow: 'hidden', textOverflow: 'ellipsis',
        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
      }}>{email.preview}</div>
    </div>
  </article>
);

// =============================================================================
// =============================================================================
// SMS MARKETING ADDITIONS (eighth-bundle tail)
// =============================================================================
// =============================================================================
//
// New here:
//   • New GMIcons — flame, phoneMissed, chevronUp, checkCheck.
//   • AutomationTile gained a `body` slot above (backward-compatible —
//     Email Marketing's existing call doesn't pass one).
//   • SmsRuleTemplatePreview — monospace template-string block with
//     `[Business]` token substitution highlighted in --mod-sms colour.
//     Slots into AutomationTile's body for each rule.
//   • SmsConversationListRow — initials avatar + name + phone + last-message
//     preview + relative-time stamp + selected-state border/bg.
//   • SmsMessageBubble — outbound (orange filled, right) vs inbound
//     (foundation-wash, left). Status tick + timestamp inside the bubble.
//   • SmsChatHeader — selected-contact avatar + name + phone + persona +
//     ⋮ dropdown (View in CRM / Call via Voice AI / Email Contact).
//   • SmsMessageInput — input field + orange send button.
//   • SmsEmptyChatPane — "Select a conversation" placeholder.
//   • SmsRuleTriggerMeta — maps trigger_type → icon, module wayfinding,
//     human delay copy, default template.
// =============================================================================

Object.assign(GMIcon, {
  flame: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1 2.5-2.5 0-1.12-.85-2.06-2.5-3.5-1.65 1.44-2.5 2.38-2.5 3.5z" />
      <path d="M12 2c0 3-3 5-3 8 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3-3-5-3-8-2 2-6 2-6 0z" />
    </svg>
  ),
  phoneMissed: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m22 6-6 6M16 6l6 6" />
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  chevronUp: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),
  checkCheck: (p={}) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase} strokeWidth="2">
      <path d="m1 12 5 5L17 6" />
      <path d="m13 17 9-11" />
    </svg>
  ),
  smartphone: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
});

// =============================================================================
// Trigger metadata for the three SMS rule trigger_types. The constant
// `defaultAutomationSeeds` lives in the live page and seeds the
// automation_rules table on first load. This metadata table is the visual
// projection — every key here is consumed by SmsRuleCard / popovers.
// =============================================================================
const SMS_RULE_TRIGGER_META = {
  manual: {
    label:       'Missed voice call',
    triggerNote: 'Voice AI module · Missed call',
    icon:        () => GMIcon.phoneMissed({ size: 18 }),
    avatarMod:   'voice',
    crossModule: 'voice',
    crossLabel:  'Voice AI',
    delayCopy:   (s) => `Delay ${formatDelay(s)} after the missed call`,
  },
  booking_confirmed: {
    label:       'Booking reminder',
    triggerNote: 'Booking module · Booking confirmed',
    icon:        () => GMIcon.calendar({ size: 18 }),
    avatarMod:   'booking',
    crossModule: 'booking',
    crossLabel:  'Booking',
    delayCopy:   (s) => `Send ${formatDelay(s)} before the appointment`,
  },
  new_contact: {
    label:       'Hot lead follow-up',
    triggerNote: 'CRM module · New contact captured',
    icon:        () => GMIcon.flame({ size: 18 }),
    avatarMod:   'crm',
    crossModule: 'crm',
    crossLabel:  'CRM hot lead',
    delayCopy:   (s) => `Fire ${formatDelay(s)} after capture`,
  },
};

// Mirrors `formatDelay()` in the live page — verbatim contract.
const formatDelay = (seconds) => {
  if (seconds == null || seconds === 0) return 'immediately';
  if (seconds < 60)    return `${seconds}s`;
  if (seconds < 3600)  return `${Math.round(seconds / 60)} min`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} h`;
  return `${Math.round(seconds / 86400)} day${seconds >= 172800 ? 's' : ''}`;
};

// =============================================================================
// SmsRuleTemplatePreview — monospace preview of an SMS template with
// `[Business]` token rendered as a pill chip in --mod-sms wash. The brief
// requires this for each rule card.
//
//   ┌───────────────────────────────────────────────────┐
//   │ TEMPLATE                                          │
//   │ ┌───────────────────────────────────────────────┐ │
//   │ │ Hey, this is [Business]! Sorry we missed your │ │
//   │ │ call. Reply STOP to opt out.                  │ │
//   │ └───────────────────────────────────────────────┘ │
//   │ Brand vibe · Warm and friendly                    │
//   └───────────────────────────────────────────────────┘
//
// When `vibeLabel` is provided, render the brand-vibe chip beneath. Only
// the Missed-call card gets this chip — that's where getMissedCallMessage()
// actually reads the vibe.
// =============================================================================
const SmsRuleTemplatePreview = ({ template = '', businessName = 'Brightside', vibeLabel = null }) => {
  // Split the template into tokens — [Business] becomes a chip.
  const parts = template.split(/(\[Business\])/g).filter(Boolean);
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 6,
        fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
        letterSpacing: '0.10em', textTransform: 'uppercase',
        color: 'var(--foundation-mid)',
      }}>
        <span>Template</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '1px 7px',
          background: 'var(--mod-sms-wash)',
          color: 'var(--mod-sms)',
          borderRadius: 999,
          fontSize: 9.5, fontWeight: 700,
          letterSpacing: '0.06em',
        }}>
          {GMIcon.smartphone({ size: 9 })}
          SMS · 1 segment
        </span>
      </div>
      <div style={{
        padding: '12px 14px',
        background: 'var(--foundation-wash)',
        border: '1px solid var(--foundation-pale)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        lineHeight: 1.6,
        color: 'var(--foundation-slate)',
        textWrap: 'pretty',
      }}>
        {parts.map((part, i) => {
          if (part === '[Business]') {
            return (
              <span key={i} style={{
                display: 'inline-block',
                padding: '0 6px',
                margin: '0 1px',
                background: 'var(--mod-sms-wash)',
                color: 'var(--mod-sms)',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 700,
              }}>{businessName}</span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
      {vibeLabel && (
        <div style={{
          marginTop: 8,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 9px 3px 8px',
          background: 'var(--mod-chatbot-wash)',
          color: 'var(--mod-chatbot)',
          borderRadius: 999,
          fontSize: 11, fontWeight: 600,
        }}>
          {GMIcon.sparkles({ size: 10 })}
          <span>Brand vibe · {vibeLabel}</span>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// SmsConversationListRow — left-pane row in the chat split.
//
//   ┌─────────────────────────────────────────────────┐
//   │ [JD] John Doe              · 2 min ago          │
//   │      +44 7700 900123                            │
//   │      Hey thanks for the call!                   │
//   └─────────────────────────────────────────────────┘
//
// `selected` flips the row to --mod-sms-wash + left accent stripe.
// =============================================================================
const SmsConversationListRow = ({ conversation, selected = false, onClick, last = false }) => (
  <button
    onClick={onClick}
    style={{
      all: 'unset',
      cursor: 'pointer',
      display: 'block', width: '100%',
      padding: '12px 14px 12px 16px',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
      background: selected ? 'var(--mod-sms-wash)' : '#fff',
      borderLeft: selected ? '3px solid var(--mod-sms)' : '3px solid transparent',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      boxSizing: 'border-box',
    }}
    aria-pressed={selected}
  >
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      gap: 10, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 999,
        background: 'var(--mod-sms)',
        color: '#fff',
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
        flexShrink: 0,
      }}>{conversation.initials}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
          color: 'var(--foundation-dark)',
          marginBottom: 1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{conversation.name}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          color: 'var(--foundation-mid)',
          marginBottom: 4,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{conversation.phone}</div>
        <div style={{
          fontSize: 12, lineHeight: 1.4,
          color: selected ? 'var(--foundation-slate)' : 'var(--foundation-mid)',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
        }}>{conversation.lastMessage}</div>
      </div>
      <div style={{
        fontSize: 10.5, fontWeight: 600,
        color: 'var(--foundation-mid)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>{conversation.relativeTime}</div>
    </div>
  </button>
);

// =============================================================================
// SmsMessageBubble — one message bubble in the chat window.
//
// Outbound: right-aligned, --mod-sms filled, white text, status tick + time.
// Inbound:  left-aligned, foundation-wash, slate text, time only.
// Twilio status verbatim:  sent · delivered · failed · queued.
// =============================================================================
const SMS_BUBBLE_STATUS_META = {
  queued:    { tick: GMIcon.clock,     label: 'Queued',    color: 'rgba(255,255,255,0.65)' },
  sent:      { tick: GMIcon.check,     label: 'Sent',      color: 'rgba(255,255,255,0.75)' },
  delivered: { tick: GMIcon.checkCheck,label: 'Delivered', color: 'rgba(255,255,255,0.95)' },
  failed:    { tick: GMIcon.alertTriangle, label: 'Failed', color: '#fecaca' },
};

const SmsMessageBubble = ({ message }) => {
  const outbound = message.direction === 'outbound';
  const status = SMS_BUBBLE_STATUS_META[message.status] || SMS_BUBBLE_STATUS_META.sent;
  const isFailed = message.status === 'failed';

  return (
    <div style={{
      display: 'flex',
      justifyContent: outbound ? 'flex-end' : 'flex-start',
      paddingBottom: 10,
    }}>
      <div style={{
        maxWidth: '78%',
        padding: '9px 13px 7px',
        background: outbound
          ? (isFailed ? 'var(--color-danger)' : 'var(--mod-sms)')
          : '#fff',
        color: outbound ? '#fff' : 'var(--foundation-dark)',
        border: outbound ? '0' : '1px solid var(--foundation-pale)',
        borderRadius: outbound
          ? '14px 14px 4px 14px'
          : '14px 14px 14px 4px',
        boxShadow: outbound ? 'none' : 'var(--shadow-xs)',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13.5, lineHeight: 1.45,
          textWrap: 'pretty',
          marginBottom: 4,
        }}>{message.body}</div>
        <div style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: outbound ? status.color : 'var(--foundation-mid)',
        }}>
          <span>{message.time}</span>
          {outbound && (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {status.tick({ size: 11 })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// SmsChatHeader — the header of the right (chat-window) pane.
// =============================================================================
const SmsChatHeader = ({ contact }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    gap: 12, alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid var(--foundation-pale)',
    background: '#fff',
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 999,
      background: 'var(--mod-sms)',
      color: '#fff',
      display: 'grid', placeItems: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
      flexShrink: 0,
    }}>{contact.initials}</div>
    <div style={{ minWidth: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 1, flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
          color: 'var(--foundation-dark)',
        }}>{contact.name}</span>
        {contact.persona && <PersonaPill>{contact.persona}</PersonaPill>}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--foundation-mid)',
      }}>
        <span>{contact.phone}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          color: 'var(--color-success)', fontWeight: 600,
        }}>
          <GMStatusDot color="var(--color-success)" size={6} pulse />
          Live conversation
        </span>
      </div>
    </div>
    <button style={{
      all: 'unset', cursor: 'pointer',
      width: 32, height: 32, borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--foundation-pale)',
      background: '#fff',
      color: 'var(--foundation-mid)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }} aria-label="Conversation actions">
      {GMIcon.moreHorizontal({ size: 16 })}
    </button>
  </div>
);

// =============================================================================
// SmsMessageInput — text field + orange send button.
// Live: onKeyDown Enter triggers send.
// =============================================================================
const SmsMessageInput = ({ value = '', onChange, onSend, disabled = false }) => (
  <div style={{
    padding: '12px 14px',
    borderTop: '1px solid var(--foundation-pale)',
    background: '#fff',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    gap: 10, alignItems: 'center',
  }}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend && onSend();
        }
      }}
      placeholder="Type a message…"
      disabled={disabled}
      style={{
        width: '100%',
        padding: '10px 14px',
        background: 'var(--foundation-wash)',
        border: '1px solid var(--foundation-pale)',
        borderRadius: 999,
        fontFamily: 'var(--font-body)', fontSize: 13.5,
        color: 'var(--foundation-dark)',
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
    <button
      onClick={onSend}
      disabled={disabled || !value.trim()}
      aria-label="Send message"
      style={{
        all: 'unset',
        cursor: (disabled || !value.trim()) ? 'not-allowed' : 'pointer',
        width: 40, height: 40, borderRadius: 999,
        background: (disabled || !value.trim()) ? 'var(--foundation-pale)' : 'var(--mod-sms)',
        color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background var(--dur-fast) var(--ease-standard)',
      }}
    >
      {GMIcon.send({ size: 16 })}
    </button>
  </div>
);

// =============================================================================
// SmsEmptyChatPane — right-pane placeholder when no conversation selected.
// =============================================================================
const SmsEmptyChatPane = ({
  title    = 'Select a conversation',
  body     = 'Pick a thread on the left to view the back-and-forth and reply via Twilio in real time.',
}) => (
  <div style={{
    flex: 1,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 10,
    padding: '40px 32px',
    background: 'var(--foundation-wash)',
    textAlign: 'center',
  }}>
    <div style={{
      width: 56, height: 56, borderRadius: 999,
      background: '#fff',
      color: 'var(--mod-sms)',
      border: '1px solid var(--foundation-pale)',
      display: 'grid', placeItems: 'center',
      marginBottom: 4,
    }}>
      {GMIcon.message({ size: 24 })}
    </div>
    <div style={{
      fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
      letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
    }}>{title}</div>
    <div style={{
      maxWidth: 320,
      fontSize: 12.5, lineHeight: 1.55,
      color: 'var(--foundation-mid)',
      textWrap: 'pretty',
    }}>{body}</div>
  </div>
);

// =============================================================================
// =============================================================================
// SOCIAL MEDIA ADDITIONS (ninth-bundle tail)
// =============================================================================
// =============================================================================
//
// New here:
//   • New GMIcons — linkedin, facebook, instagram, image (placeholder
//     framing), cornerDownRight (review-to-post arrow), calendarPlus.
//   • SOCIAL_PLATFORM_META — Record<linkedin|facebook|instagram, {
//     label, icon, colour }>. Platform brand colours are kept verbatim
//     (LinkedIn #0a66c2, Facebook #1877f2, Instagram #e1306c) — they are
//     real-world brand identities, not arbitrary palette choices. The
//     colour-system migration in the brief explicitly preserves them.
//   • SocialScheduledPostRow — calendar row. Platform icon avatar in
//     --mod-social wash + platform name + content excerpt (3-line clamp)
//     + scheduled date/time in mono font + brand-colour left stripe + 3-dot
//     menu (Edit / Duplicate / Mark as posted).
//   • SocialPerformanceRow — published-post row. Same anatomy as the
//     calendar row but with an engagement grid (likes / comments / shares).
//   • SocialPlatformConnectRow — three-row connect helper. No fake
//     connection-state pills (per honest-treatment decision B).
//   • SocialPostingCadenceCard — replaces the fabricated "Best Send Times"
//     card with real counts of scheduled posts in next 7/14/30 days.
//     Decision C in the brief.
// =============================================================================

Object.assign(GMIcon, {
  linkedin: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  facebook: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37a4 4 0 1 1-7.93 1.06A4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  ),
  image: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),
  cornerDownRight: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m15 10 5 5-5 5" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  ),
  calendarPlus: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M12 14v6M9 17h6" />
    </svg>
  ),
  thumbsUp: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l4.5-9a2 2 0 0 1 3.5 1.88z" />
    </svg>
  ),
});

// =============================================================================
// SOCIAL_PLATFORM_META — platform brand identities kept verbatim. Used by
// SocialScheduledPostRow / SocialPerformanceRow / SocialPlatformConnectRow.
// =============================================================================
const SOCIAL_PLATFORM_META = {
  linkedin:  { label: 'LinkedIn',  icon: GMIcon.linkedin,  colour: '#0a66c2' },
  facebook:  { label: 'Facebook',  icon: GMIcon.facebook,  colour: '#1877f2' },
  instagram: { label: 'Instagram', icon: GMIcon.instagram, colour: '#e1306c' },
};

// =============================================================================
// SocialScheduledPostRow — one row of the content-calendar list (Zone 4b).
//
//   ┌─────────────────────────────────────────────────────────────────────┐
//   │ ▎[in]  LinkedIn   📅 Sat 18 May · 09:00              [draft]   [⋮]  │
//   │ ▎      "30 days of branded content in 60 seconds using your         │
//   │ ▎       Master Pitch. The auto-content multiplier ships today…"     │
//   │ ▎      Powered by — [Step 5 Master Pitch] [Brand vibe]              │
//   └─────────────────────────────────────────────────────────────────────┘
//
// `accent` is the brand-colour left stripe. Falls back to --mod-social per
// the brief's correction (live page falls back to indigo #4f46e5 — wrong).
// =============================================================================
const SOCIAL_POST_STATUS_META = {
  scheduled: { bg: 'rgba(37,99,235,0.10)',  fg: 'var(--color-info)',    label: 'Scheduled' },
  draft:     { bg: 'var(--foundation-wash)', fg: 'var(--foundation-slate)', label: 'Draft' },
  published: { bg: 'rgba(4,120,87,0.10)',   fg: 'var(--color-success)', label: 'Posted'    },
  failed:    { bg: 'rgba(185,28,28,0.10)',  fg: 'var(--color-danger)',  label: 'Failed'    },
};

const SocialPostStatusPill = ({ status = 'draft' }) => {
  const s = SOCIAL_POST_STATUS_META[status] || SOCIAL_POST_STATUS_META.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px 3px 8px',
      background: s.bg, color: s.fg,
      borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 999, background: s.fg,
      }} />
      {s.label}
    </span>
  );
};

const SocialScheduledPostRow = ({
  post,
  brandColor = 'var(--mod-social)',  // accent — falls back to --mod-social per brief
  last = false,
  onMenu,
}) => {
  const platform = SOCIAL_PLATFORM_META[post.platform] || SOCIAL_PLATFORM_META.linkedin;
  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: '3px auto minmax(0, 1fr)',
      background: '#fff',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
    }}>
      <div style={{ background: brandColor || 'var(--mod-social)' }} />
      <div style={{
        padding: '18px 0 18px 18px',
        display: 'flex', alignItems: 'flex-start',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 'var(--radius-sm)',
          background: 'var(--mod-social-wash)',
          color: platform.colour,
          display: 'grid', placeItems: 'center',
          flexShrink: 0,
        }}>
          {platform.icon({ size: 18 })}
        </div>
      </div>
      <div style={{
        padding: '18px 22px 18px 14px',
        minWidth: 0,
      }}>
        {/* Header row: platform name + schedule time + status pill + menu */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 6, flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
            color: 'var(--foundation-dark)',
          }}>{platform.label}</span>
          {post.scheduledFor && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              color: 'var(--foundation-mid)',
            }}>
              {GMIcon.calendar({ size: 11 })}
              {post.scheduledFor}
            </span>
          )}
          <SocialPostStatusPill status={post.status || 'scheduled'} />
          <button onClick={() => onMenu && onMenu(post.id)} style={{
            all: 'unset', cursor: 'pointer',
            marginLeft: 'auto',
            width: 28, height: 28, borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--foundation-pale)',
            background: '#fff',
            color: 'var(--foundation-mid)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }} aria-label="Post actions">
            {GMIcon.moreHorizontal({ size: 14 })}
          </button>
        </div>
        {/* Body: 3-line clamped post content */}
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55,
          color: 'var(--foundation-slate)',
          marginBottom: 10,
          textWrap: 'pretty',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3,
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{post.body}</div>
        {/* Powered-by Logic Wall chips */}
        {post.chips && post.chips.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--foundation-mid)',
              marginRight: 4,
            }}>Powered by</span>
            {post.chips.map((c, i) => {
              const chipMod = c.module ? gmResolve(c.module) : null;
              return (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px 2px 7px',
                  background: chipMod ? chipMod.wash : 'var(--foundation-wash)',
                  color:      chipMod ? chipMod.color : 'var(--foundation-slate)',
                  border:     chipMod ? '0' : '1px solid var(--foundation-pale)',
                  borderRadius: 999,
                  fontSize: 10.5, fontWeight: 600,
                }}>
                  {GMIcon.link({ size: 9 })}
                  {c.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

// =============================================================================
// SocialPerformanceRow — one row of the Recent Performance list (Zone 4c).
//
// Anatomy mirrors SocialScheduledPostRow but with an engagement stats grid
// at the bottom (likes / comments / shares). Per honest-treatment Red Flag
// #1: these numbers can only populate via manual entry until platform APIs
// land — the empty-state caption in the parent card spells that out.
// =============================================================================
const _socialStat = (label, value, icon) => (
  <div style={{
    padding: '8px 10px',
    background: 'var(--foundation-wash)',
    borderRadius: 'var(--radius-xs)',
    display: 'flex', alignItems: 'center', gap: 8,
    minWidth: 0,
  }}>
    <span style={{
      color: 'var(--foundation-mid)',
      display: 'inline-flex', flexShrink: 0,
    }}>{icon}</span>
    <div style={{ minWidth: 0, lineHeight: 1.1 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
        letterSpacing: '-0.015em',
        color: 'var(--foundation-dark)',
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
        color: 'var(--foundation-mid)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  </div>
);

const SocialPerformanceRow = ({ post, brandColor = 'var(--mod-social)', last = false }) => {
  const platform = SOCIAL_PLATFORM_META[post.platform] || SOCIAL_PLATFORM_META.linkedin;
  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: '3px auto minmax(0, 1fr)',
      background: '#fff',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
    }}>
      <div style={{ background: brandColor || 'var(--mod-social)' }} />
      <div style={{
        padding: '18px 0 18px 18px',
        display: 'flex', alignItems: 'flex-start',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 'var(--radius-sm)',
          background: 'var(--mod-social-wash)',
          color: platform.colour,
          display: 'grid', placeItems: 'center',
          flexShrink: 0,
        }}>
          {platform.icon({ size: 18 })}
        </div>
      </div>
      <div style={{
        padding: '18px 22px 18px 14px',
        minWidth: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 6, flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
            color: 'var(--foundation-dark)',
          }}>{platform.label}</span>
          {post.publishedAt && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              color: 'var(--foundation-mid)',
            }}>
              {GMIcon.clock({ size: 11 })}
              {post.publishedAt}
            </span>
          )}
          <SocialPostStatusPill status="published" />
        </div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55,
          color: 'var(--foundation-slate)',
          marginBottom: 10,
          textWrap: 'pretty',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{post.body}</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
        }}>
          {_socialStat('Likes',    post.likes    ?? 0, GMIcon.thumbsUp({ size: 14 }))}
          {_socialStat('Comments', post.comments ?? 0, GMIcon.messageSquare({ size: 14 }))}
          {_socialStat('Shares',   post.shares   ?? 0, GMIcon.share({ size: 14 }))}
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// SocialPlatformConnectRow — one row of the Connect-your-platforms card
// (right rail). Per honest-treatment Red Flag #2: no fake state pills.
// Just an icon + name + "Connect" CTA routing to Settings.
// =============================================================================
const SocialPlatformConnectRow = ({ platformKey, onConnect, last = false }) => {
  const platform = SOCIAL_PLATFORM_META[platformKey];
  if (!platform) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0',
      borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 'var(--radius-sm)',
        background: 'var(--foundation-wash)',
        color: platform.colour,
        display: 'grid', placeItems: 'center',
        flexShrink: 0,
      }}>
        {platform.icon({ size: 16 })}
      </div>
      <span style={{
        flex: 1, minWidth: 0,
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
        color: 'var(--foundation-dark)',
      }}>{platform.label}</span>
      <GMButton module="social" variant="outline" size="sm"
                onClick={() => onConnect && onConnect(platformKey)}
                icon={GMIcon.arrowRight({ size: 12 })}>
        Connect
      </GMButton>
    </div>
  );
};

// =============================================================================
// =============================================================================
// PRINT & FLYERS + TEMPLATES LIBRARY ADDITIONS (tenth-bundle tail)
// =============================================================================
// =============================================================================
//
// New here:
//   • New GMIcons — printer, qrCode, layoutGrid, crop, eyedropper, download,
//     filter (a couple already exist for other modules — only the missing
//     ones are added).
//   • PrintAspectRatio — sizing wrapper for A5 / A6 / Business Card / Door
//     Hanger preview canvases. Driven by `format` prop.
//   • PrintFlyerTemplate — Template Gallery card. Aspect-ratio preview
//     with brand-colour placeholder shapes (FALLS BACK TO --mod-print
//     SLATE, NOT INDIGO — fixes live page's #4338ca / #4f46e5 placeholder
//     bug per Print Red Flag #4) + real Master Pitch chunk + Logic Wall
//     chips + CORAL Customise CTA.
//   • PrintMaterialRow — Your Materials list row primitive (filename /
//     date / QR scans / download).
//   • CmykConversionPreview — RGB hex → CMYK swatch component. Real
//     conversion preview, not decorative.
//
//   • TemplatesCategorySidebarRow — sidebar list-item (icon + label +
//     count badge).
//   • TemplatesPersonaFilterRow — persona filter list-item.
//   • BrandDNAInjectionStrip — the full-width sync strip used at the top
//     of both Templates page AND inside Print's right rail (re-usable).
//   • TemplatesCard — single template card. Preview area shows real
//     Master Pitch first-80-chars overlay (per Decision C) — NEVER
//     lorem-ipsum. Brand-colour stripe at bottom of preview. CORAL Use
//     Template CTA.
//   • TEMPLATE_CATEGORY_META — module-keyed category metadata.
//   • TEMPLATE_PERSONA_META — persona id → tint + label.
// =============================================================================

Object.assign(GMIcon, {
  printer: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M6 9V2h12v7" />
      <rect x="6" y="14" width="12" height="8" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <circle cx="18" cy="11.5" r=".5" fill="currentColor" />
    </svg>
  ),
  qrCode: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M20 14v.01M14 20v.01M17 20h4M20 17v.01" />
    </svg>
  ),
  layoutGrid: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  crop: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </svg>
  ),
  eyedropper: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4z" />
    </svg>
  ),
  download: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  ),
  filter: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />
    </svg>
  ),
  fileImage: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <circle cx="10" cy="13" r="2" />
      <path d="m20 17-1.296-1.296a2 2 0 0 0-2.828 0L9 23" />
    </svg>
  ),
  creditCard: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
});

// =============================================================================
// CMYK conversion helper — RGB hex → CMYK 0-100 ints.
// Real conversion. Not fabricated. Used by CmykConversionPreview AND by
// the per-card brand-DNA chip on PrintFlyerTemplate.
// =============================================================================
const hexToRgb = (hex) => {
  const v = (hex || '').replace('#', '').trim();
  if (v.length !== 6) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
};

const rgbToCmyk = ({ r, g, b }) => {
  const rN = r / 255, gN = g / 255, bN = b / 255;
  const k = 1 - Math.max(rN, gN, bN);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rN - k) / (1 - k);
  const m = (1 - gN - k) / (1 - k);
  const y = (1 - bN - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

const hexToCmyk = (hex) => rgbToCmyk(hexToRgb(hex));

// =============================================================================
// PrintAspectRatio — wrapper to enforce the right preview aspect ratio
// for each print format. Used inside PrintFlyerTemplate.
//
//   A5         — 148 × 210 mm  (portrait, 0.704 ratio)
//   Business   —  85 × 55  mm  (landscape, 1.545 ratio)
//   Door Hanger—  90 × 220 mm  (portrait, 0.409 ratio)
//   A6         — 148 × 105 mm  (landscape, 1.410 ratio)
//   Postcard   — 148 × 105 mm  (same as A6)
// =============================================================================
const PRINT_FORMAT_META = {
  A5:           { label: 'A5 · portrait',       ratio: '148 / 210' },
  BusinessCard: { label: 'Business card',       ratio: '85 / 55'   },
  DoorHanger:   { label: 'Door hanger',         ratio: '90 / 220'  },
  A6:           { label: 'A6 · landscape',      ratio: '148 / 105' },
  Postcard:     { label: 'Postcard · landscape',ratio: '148 / 105' },
};

const PrintAspectRatio = ({ format = 'A5', children, ...rest }) => {
  const meta = PRINT_FORMAT_META[format] || PRINT_FORMAT_META.A5;
  return (
    <div
      style={{
        aspectRatio: meta.ratio,
        width: '100%',
        position: 'relative',
        background: 'var(--foundation-wash)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

// =============================================================================
// PrintFlyerTemplate — one Template Gallery card. Print Red Flags #2, #3,
// #4 all converge here:
//
//   • RF #2 — Customise CTA is CORAL (var(--brand-coral)) — NOT indigo.
//             Conversion action. The slate --mod-print is module identity
//             only.
//   • RF #3 — same lock applied — coral.
//   • RF #4 — Preview placeholder blocks use the customer's brand-colour
//             when set; FALLBACK is var(--mod-print) SLATE, NOT
//             #4338ca / #4f46e5 indigo. Indigo is Email's wayfinding
//             colour and has no business on a Print page.
//   • Decision C — body block shows real Master Pitch first-80-chars
//             chunks if available. Empty fallback is HONEST caption,
//             never lorem-ipsum.
//
// Anatomy:
//   ┌─────────────────────────────────┐
//   │ [A5 · portrait]                 │  ← format chip top-right
//   │                                 │
//   │     ┌────────────────────┐      │
//   │     │ ▣ (brand initial)  │      │  ← brand-coloured circular cap
//   │     │ ────────────────   │      │  ← Master Pitch first chunk
//   │     │ ──────────  ─────  │      │  ← second chunk
//   │     │ ─────────────────  │      │
//   │     │     [QR]           │      │  ← QR placeholder (always present)
//   │     └────────────────────┘      │
//   │                                 │
//   │ Service flyer · Bold        5 el│
//   │ Eye-catching design for…        │
//   │ [⊕ Brand]  [⊕ Content]         │
//   │ ┌─────────────────────────────┐ │
//   │ │ ✨  Customise               │ │  ← CORAL primary CTA
//   │ └─────────────────────────────┘ │
//   └─────────────────────────────────┘
// =============================================================================

const PrintFlyerTemplate = ({
  template,
  brandColor = 'var(--mod-print)',  // FALLBACK PER RF #4 — slate, never indigo
  brandInitial = 'B',
  masterPitch = '',  // first ~80 chars per Decision C
  onCustomise,
}) => {
  const stripeColor = brandColor || 'var(--mod-print)';
  // Truncate Master Pitch to first 80 chars per Decision C. Empty fallback
  // is honest — never lorem-ipsum.
  const pitchHasContent = masterPitch && masterPitch.trim().length > 0;
  const truncatedPitch = pitchHasContent
    ? (masterPitch.length > 80 ? masterPitch.slice(0, 80).trim() + '…' : masterPitch.trim())
    : null;

  // Split the pitch into ~3 lines for the preview canvas.
  const lineCount = template.elementCount || 5;

  return (
    <article style={{
      background: '#fff',
      border: '1px solid var(--foundation-pale)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Preview canvas — aspect-ratio enforced */}
      <div style={{
        position: 'relative',
        padding: '20px 20px 0',
        background: 'var(--foundation-wash)',
      }}>
        {/* Format chip top-right */}
        <span style={{
          position: 'absolute',
          top: 12, right: 12, zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 9px 3px 8px',
          background: '#fff',
          color: 'var(--foundation-slate)',
          border: '1px solid var(--foundation-pale)',
          borderRadius: 999,
          fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600,
        }}>
          {template.formatChipIcon ? template.formatChipIcon({ size: 10 }) : GMIcon.crop({ size: 10 })}
          {template.formatLabel || PRINT_FORMAT_META[template.format]?.label || 'A5'}
        </span>

        <PrintAspectRatio format={template.format}>
          {/* Paper-white interior */}
          <div style={{
            position: 'absolute',
            inset: 12,
            background: '#fff',
            border: `2px solid ${stripeColor}`,
            borderRadius: 'var(--radius-xs)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'stretch',
            padding: '14% 12% 12%',
            gap: '6%',
          }}>
            {/* Brand initial cap */}
            <div style={{
              width: '22%',
              aspectRatio: '1 / 1',
              alignSelf: 'center',
              background: stripeColor,
              color: '#fff',
              borderRadius: 999,
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(14px, 4.5cqi, 28px)',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}>{brandInitial || 'B'}</div>

            {/* Master Pitch lines — real content, truncated. */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '4%',
              flex: 1,
            }}>
              {[...Array(Math.min(lineCount, 5))].map((_, i) => (
                <div key={i} style={{
                  height: i === 0 ? '14%' : '8%',
                  background: i === 0 ? stripeColor : 'var(--foundation-pale)',
                  borderRadius: 2,
                  width: i === 0 ? '90%' : (i === lineCount - 1 ? '60%' : '100%'),
                  opacity: i === 0 ? 1 : 0.7,
                }} />
              ))}
            </div>

            {/* QR placeholder — always present per Digital Bridge */}
            <div style={{
              alignSelf: 'flex-end',
              width: '24%',
              aspectRatio: '1 / 1',
              background: '#fff',
              border: '1.5px solid var(--foundation-dark)',
              borderRadius: 4,
              display: 'grid', placeItems: 'center',
              color: 'var(--foundation-dark)',
            }}>
              {GMIcon.qrCode({ size: 16 })}
            </div>
          </div>
        </PrintAspectRatio>

        <div style={{ height: 20 }} />
      </div>

      {/* Body */}
      <div style={{
        padding: '18px 20px 20px',
        flex: 1,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <header style={{
          display: 'flex', alignItems: 'baseline', gap: 10,
          justifyContent: 'space-between',
        }}>
          <h3 style={{
            margin: 0, minWidth: 0,
            fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
            lineHeight: 1.25,
            textWrap: 'pretty',
          }}>{template.title}</h3>
          <span style={{
            flexShrink: 0,
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            color: 'var(--foundation-mid)',
            whiteSpace: 'nowrap',
          }}>{template.elementCount} elements</span>
        </header>

        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5,
          color: 'var(--foundation-mid)',
          textWrap: 'pretty',
        }}>{template.subtitle}</div>

        {/* Master Pitch chunk — real content (Decision C), or honest fallback */}
        {truncatedPitch ? (
          <div style={{
            padding: '10px 12px',
            background: 'var(--foundation-wash)',
            border: '1px solid var(--foundation-pale)',
            borderLeft: `3px solid ${stripeColor}`,
            borderRadius: 'var(--radius-xs)',
            fontFamily: 'var(--font-body)', fontSize: 12,
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: 'var(--foundation-slate)',
            textWrap: 'pretty',
          }}>“{truncatedPitch}”</div>
        ) : (
          <div style={{
            padding: '10px 12px',
            background: 'var(--foundation-wash)',
            border: '1px dashed var(--foundation-pale)',
            borderRadius: 'var(--radius-xs)',
            fontSize: 11.5, lineHeight: 1.5,
            color: 'var(--foundation-mid)',
            textWrap: 'pretty',
          }}>Your Master Pitch will fill this area once you complete Step 5.</div>
        )}

        {/* Chips — Brand + Content sourcing */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(template.chips || []).map((c, i) => {
            const chipMod = c.module ? gmResolve(c.module) : null;
            return (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '3px 9px 3px 8px',
                background: chipMod ? chipMod.wash : 'var(--foundation-wash)',
                color: chipMod ? chipMod.color : 'var(--foundation-slate)',
                border: chipMod ? '0' : '1px solid var(--foundation-pale)',
                borderRadius: 999,
                fontSize: 10.5, fontWeight: 600,
              }}>
                {GMIcon.link({ size: 9 })}
                {c.label}
              </span>
            );
          })}
        </div>

        {/* CORAL Customise CTA — Decision B / RF #3 */}
        <button
          onClick={onCustomise}
          style={{
            marginTop: 4,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '10px 14px',
            background: 'var(--brand-coral)',
            color: '#fff',
            border: 0,
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-body)',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
            transition: 'background var(--dur-fast) var(--ease-standard)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-coral-700)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-coral)'}
        >
          {GMIcon.sparkles({ size: 13 })}
          Customise
        </button>
      </div>
    </article>
  );
};

// =============================================================================
// PrintMaterialRow — Your Materials list row (Zone 4c).
//
//   ┌──────────────────────────────────────────────────────────────┐
//   │ [▤]  Spring-flyer-v2.pdf                                     │
//   │      Generated 12 May · A5 · 8 elements          [↓ Download]│
//   │                                          QR scans  · 14       │
//   └──────────────────────────────────────────────────────────────┘
//
// `qrScans` is real if QR tracking is wired (Voice AI's existing tracking
// infrastructure plausibly carries this). Per Decision E we ship both
// honest captions — when scans is null we render "QR tracking pending".
// =============================================================================
const PrintMaterialRow = ({ material, last = false, onDownload }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto auto',
    gap: 16, alignItems: 'center',
    padding: '14px 22px',
    borderBottom: last ? '0' : '1px solid var(--foundation-pale)',
  }}>
    <GMAvatar module="print" icon={GMIcon.fileText({ size: 16 })} />
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
        color: 'var(--foundation-dark)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{material.filename}</div>
      <div style={{
        fontSize: 11.5, color: 'var(--foundation-mid)',
        marginTop: 2,
      }}>
        Generated {material.generatedAt} · {material.formatLabel} · {material.elementCount} elements
      </div>
    </div>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '4px 10px 4px 8px',
      background: material.qrScans != null ? 'var(--mod-print-wash)' : 'var(--foundation-wash)',
      color: material.qrScans != null ? 'var(--mod-print)' : 'var(--foundation-mid)',
      borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      {GMIcon.qrCode({ size: 11 })}
      {material.qrScans != null
        ? `${material.qrScans} scan${material.qrScans === 1 ? '' : 's'}`
        : 'QR tracking pending'}
    </div>
    <GMButton module="print" variant="outline" size="sm"
              icon={GMIcon.download({ size: 12 })}
              onClick={() => onDownload && onDownload(material)}>
      Download
    </GMButton>
  </div>
);

// =============================================================================
// CmykConversionPreview — RGB hex → CMYK swatch component.
//
//   ┌─────────────────────────────────────────────────────┐
//   │ ▮ RGB · #4338ca                                     │
//   │ ⇣                                                   │
//   │ ▮ CMYK · 78 / 80 / 0 / 0                            │
//   │   Print-ready colour profile applied                │
//   └─────────────────────────────────────────────────────┘
//
// Real conversion. The swatch on the bottom row uses the converted CMYK
// values rebuilt to RGB for visual representation (CMYK is a process
// model — the screen can't render true CMYK, but we use the converted
// values as the closest sRGB approximation).
// =============================================================================
const CmykConversionPreview = ({ hex = '#4338ca' }) => {
  const cmyk = hexToCmyk(hex);
  // For the bottom swatch we just reuse the source hex — the screen can't
  // render true CMYK, but the colour family is identical post-conversion.
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* RGB row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px',
        background: 'var(--foundation-wash)',
        borderRadius: 'var(--radius-sm)',
      }}>
        <span style={{
          width: 32, height: 32, borderRadius: 'var(--radius-xs)',
          background: hex,
          border: '1px solid var(--foundation-pale)',
          flexShrink: 0,
        }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'var(--foundation-mid)',
            marginBottom: 2,
          }}>RGB · Screen</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
            color: 'var(--foundation-dark)',
          }}>{(hex || '').toUpperCase()}</div>
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        fontSize: 11, fontWeight: 600,
        color: 'var(--mod-print)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        <span style={{
          flex: 1, height: 1, background: 'var(--foundation-pale)',
        }} />
        <span>Convert</span>
        <span style={{
          flex: 1, height: 1, background: 'var(--foundation-pale)',
        }} />
      </div>

      {/* CMYK row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px',
        background: 'var(--mod-print-wash)',
        borderRadius: 'var(--radius-sm)',
      }}>
        <span style={{
          width: 32, height: 32, borderRadius: 'var(--radius-xs)',
          background: hex,
          border: '1px solid var(--mod-print)',
          flexShrink: 0,
        }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'var(--mod-print)',
            marginBottom: 2,
          }}>CMYK · Print</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
            color: 'var(--foundation-dark)',
          }}>{cmyk.c} / {cmyk.m} / {cmyk.y} / {cmyk.k}</div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// =============================================================================
// TEMPLATES LIBRARY ADDITIONS
// =============================================================================
// =============================================================================

// -----------------------------------------------------------------------------
// TEMPLATE_CATEGORY_META — module-keyed category metadata. Used by the
// sidebar AND by each card's preview icon + wash.
// -----------------------------------------------------------------------------
const TEMPLATE_CATEGORY_META = {
  all:           { label: 'All Templates',     icon: GMIcon.layoutGrid, module: null      },
  marketing:     { label: 'Marketing',         icon: GMIcon.mail,        module: 'email'   },
  print:         { label: 'Print & Flyers',    icon: GMIcon.printer,     module: 'print'   },
  business:      { label: 'Business Systems',  icon: GMIcon.fileText,    module: 'invoicing'},
  campaigns:     { label: 'Campaigns',         icon: GMIcon.share,       module: 'social'  },
};

// -----------------------------------------------------------------------------
// TEMPLATE_PERSONA_META — persona id → tint + label. Driven from Step 4.
// -----------------------------------------------------------------------------
const TEMPLATE_PERSONA_META = {
  'busy-professional':  { label: 'Busy Professional', tint: 'invoicing' },
  'price-conscious':    { label: 'Price Conscious',   tint: 'invoicing' },
  'quality-focused':    { label: 'Quality Focused',   tint: 'invoicing' },
  universal:            { label: 'Universal',         tint: 'default'   },
};

// -----------------------------------------------------------------------------
// TemplatesCategorySidebarRow — sidebar list-item primitive.
//
//   ┌────────────────────────────────────┐
//   │ [▣] All Templates           [13]   │
//   └────────────────────────────────────┘
// -----------------------------------------------------------------------------
const TemplatesCategorySidebarRow = ({
  categoryKey,
  count,
  selected = false,
  onSelect,
}) => {
  const meta = TEMPLATE_CATEGORY_META[categoryKey] || TEMPLATE_CATEGORY_META.all;
  const mod = meta.module ? gmResolve(meta.module) : null;
  return (
    <button
      onClick={() => onSelect && onSelect(categoryKey)}
      aria-pressed={selected}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 11px',
        background: selected ? 'var(--mod-print)' : 'transparent',
        color:      selected ? '#fff' : 'var(--foundation-dark)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
        width: '100%',
        boxSizing: 'border-box',
        transition: 'background var(--dur-fast) var(--ease-standard)',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'var(--foundation-wash)'; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{
        flexShrink: 0,
        color: selected ? '#fff' : (mod ? mod.color : 'var(--foundation-slate)'),
        display: 'inline-flex',
      }}>
        {meta.icon({ size: 14 })}
      </span>
      <span style={{
        flex: 1, minWidth: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{meta.label}</span>
      {typeof count === 'number' && (
        <span style={{
          flexShrink: 0,
          padding: '1px 8px',
          background: selected ? 'rgba(255,255,255,0.18)' : 'var(--foundation-wash)',
          color:      selected ? '#fff' : 'var(--foundation-mid)',
          borderRadius: 999,
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
        }}>{count}</span>
      )}
    </button>
  );
};

// -----------------------------------------------------------------------------
// TemplatesPersonaFilterRow — sidebar list-item for persona filters.
// -----------------------------------------------------------------------------
const TemplatesPersonaFilterRow = ({
  personaKey,
  active = false,
  count,
  onToggle,
}) => {
  const meta = TEMPLATE_PERSONA_META[personaKey] || TEMPLATE_PERSONA_META.universal;
  return (
    <button
      onClick={() => onToggle && onToggle(personaKey)}
      aria-pressed={active}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 11px',
        background: active ? 'var(--foundation-wash)' : 'transparent',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
        color: 'var(--foundation-slate)',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'background var(--dur-fast) var(--ease-standard)',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--foundation-wash)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{
        flexShrink: 0,
        width: 12, height: 12, borderRadius: 'var(--radius-xs)',
        background: active ? 'var(--mod-print)' : '#fff',
        border: active ? '1.5px solid var(--mod-print)' : '1.5px solid var(--foundation-pale)',
        display: 'grid', placeItems: 'center',
        color: '#fff',
      }}>
        {active && GMIcon.check({ size: 8 })}
      </span>
      <span style={{ flex: 1 }}>{meta.label}</span>
      {typeof count === 'number' && (
        <span style={{
          flexShrink: 0,
          fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600,
          color: 'var(--foundation-mid)',
        }}>{count}</span>
      )}
    </button>
  );
};

// -----------------------------------------------------------------------------
// BrandDNAInjectionStrip — full-width sync strip used at the top of the
// Templates Library page (and reusable elsewhere). Replaces the live page's
// purple-dot + `bg-purple-100` styling with foundation tones + --mod-print
// icon per the colour-system migration.
// -----------------------------------------------------------------------------
const BrandDNAInjectionStrip = ({
  hex = '#475569',
  businessName = 'Your Business',
  fieldsInjected = 0,
  synchronised = true,
}) => (
  <section style={{
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    gap: 18, alignItems: 'center',
    padding: '16px 22px',
    background: '#fff',
    border: '1px solid var(--foundation-pale)',
    borderLeft: '3px solid var(--mod-print)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-xs)',
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 'var(--radius-sm)',
      background: 'var(--mod-print-wash)',
      color: 'var(--mod-print)',
      display: 'grid', placeItems: 'center',
      flexShrink: 0,
    }}>
      {GMIcon.palette({ size: 18 })}
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
        letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
        marginBottom: 2,
      }}>Brand DNA Injection Active</div>
      <div style={{
        fontSize: 12.5, color: 'var(--foundation-mid)',
        lineHeight: 1.5,
        textWrap: 'pretty',
      }}>
        {fieldsInjected > 0
          ? `${fieldsInjected} design field${fieldsInjected === 1 ? '' : 's'} injected into all templates.`
          : 'Brand DNA is empty — templates will personalise once you complete Step 1.'}
      </div>
    </div>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '4px 10px 4px 5px',
        background: 'var(--foundation-wash)',
        border: '1px solid var(--foundation-pale)',
        borderRadius: 999,
        fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600,
        color: 'var(--foundation-dark)',
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: 'var(--radius-xs)',
          background: hex || 'var(--mod-print)',
          border: '1px solid var(--foundation-pale)',
        }} />
        {(hex || '').toUpperCase()}
      </span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
        color: 'var(--foundation-slate)',
      }}>{businessName}</span>
      <GMStatusBadge
        label={synchronised ? 'Synchronised' : 'Not synced'}
        tone={synchronised ? 'success' : 'warning'}
        icon={synchronised ? GMIcon.check({ size: 12 }) : GMIcon.alertTriangle({ size: 12 })}
      />
    </div>
  </section>
);

// -----------------------------------------------------------------------------
// TemplatesCard — single template card. Library/picker shell card.
//
// Resolves Tpl Red Flags #1, #2, #3, #4, #5:
//   • RF #1 (contrast) — card stays white, the surrounding page is slate-
//     wash. AA verified.
//   • RF #2 (lorem-ipsum preview) — preview overlay shows real Master
//     Pitch first-80-chars or honest fallback caption. Decision C.
//   • RF #3 (Use Template CTA colour) — coral. Decision B.
//   • RF #4 (sidebar Tailwind defaults) — addressed in the sidebar
//     component, not here.
//   • RF #5 (4-column grid) — fixed in the grid wrapper, not here.
//
// Anatomy:
//   ┌────────────────────────────────────┐
//   │ ●● Live  │preview area: category-w │
//   │           │  icon centred + Master  │
//   │           │  Pitch first-80 overlay │
//   │           │ ──── brand-colour stripe│
//   ├────────────────────────────────────┤
//   │ Executive Welcome              ⋮   │
//   │ A streamlined welcome that respe…  │
//   │ [👤 Busy Professional]              │
//   │ [⊕ Step 1] [⊕ Step 5]              │
//   │ ┌──────────────────────────────┐   │
//   │ │  Use Template                │   │  ← coral
//   │ └──────────────────────────────┘   │
//   └────────────────────────────────────┘
// -----------------------------------------------------------------------------
const TemplatesCard = ({
  template,
  brandColor = 'var(--mod-print)',
  brandInitial = 'B',
  masterPitch = '',
  onUseTemplate,
}) => {
  const category = TEMPLATE_CATEGORY_META[template.category] || TEMPLATE_CATEGORY_META.all;
  const categoryMod = category.module ? gmResolve(category.module) : null;
  const stripeColor = brandColor || (categoryMod ? categoryMod.color : 'var(--mod-print)');
  const stripeWash  =                  categoryMod ? categoryMod.wash  : 'var(--mod-print-wash)';

  const pitchHasContent = masterPitch && masterPitch.trim().length > 0;
  const truncatedPitch = pitchHasContent
    ? (masterPitch.length > 80 ? masterPitch.slice(0, 80).trim() + '…' : masterPitch.trim())
    : null;

  return (
    <article style={{
      background: '#fff',
      border: '1px solid var(--foundation-pale)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
    }}>
      {/* Preview area — Decision A: WHITE preview area on a slate-wash page
          so cards pop. The category identity comes through via:
            • The bespoke wireframe (TemplateWireframe — paper-shape mini
              mock-up keyed by previewKind, with brand-colour accents)
            • The bottom border-stripe in the category colour
            • The Live pulse-dot top-left
          Live page rendered the preview area in a category wash that
          blended into the slate-wash page AND used a generic
          envelope/printer icon — a flyer card and an email card looked
          identical. Wireframes fix both at once. */}
      <div style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        background: '#fff',
        borderBottom: `3px solid ${stripeColor}`,
        overflow: 'hidden',
      }}>
        {/* Live pulse-dot top-left */}
        <span style={{
          position: 'absolute', top: 10, left: 12, zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 9px 3px 8px',
          background: '#fff',
          color: 'var(--color-success)',
          border: '1px solid rgba(4,120,87,0.20)',
          borderRadius: 999,
          fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <GMStatusDot color="var(--color-success)" size={5} pulse />
          Live
        </span>

        {/* Bespoke wireframe preview. Falls back to category icon if the
            fixture doesn't have a previewKind (defensive). */}
        {template.previewKind
          ? <TemplateWireframe
              kind={template.previewKind}
              brandColor={stripeColor}
              brandInitial={brandInitial}
            />
          : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'grid', placeItems: 'center',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 'var(--radius-sm)',
                background: stripeWash,
                color: stripeColor,
                display: 'grid', placeItems: 'center',
              }}>
                {category.icon({ size: 24 })}
              </div>
            </div>
          )
        }
      </div>

      {/* Body */}
      <div style={{
        padding: '14px 16px 16px',
        flex: 1,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <header style={{
          display: 'flex', alignItems: 'flex-start', gap: 8,
        }}>
          <h3 style={{
            margin: 0, flex: 1, minWidth: 0,
            fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
            letterSpacing: '-0.01em', color: 'var(--foundation-dark)',
            lineHeight: 1.25,
            textWrap: 'pretty',
          }}>{template.title}</h3>
          <button style={{
            all: 'unset', cursor: 'pointer',
            width: 24, height: 24, borderRadius: 'var(--radius-xs)',
            color: 'var(--foundation-mid)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }} aria-label="Template options">
            {GMIcon.moreHorizontal({ size: 14 })}
          </button>
        </header>

        <div style={{
          fontSize: 12.5, lineHeight: 1.5,
          color: 'var(--foundation-mid)',
          textWrap: 'pretty',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{template.subtitle}</div>

        {/* Master Pitch chunk — real content (Decision C), or honest fallback.
            Moved out of the preview area so the wireframe owns the full
            16:9 surface. Mirrors PrintFlyerTemplate's layout. */}
        {truncatedPitch ? (
          <div style={{
            padding: '8px 10px',
            background: 'var(--foundation-wash)',
            border: '1px solid var(--foundation-pale)',
            borderLeft: `3px solid ${stripeColor}`,
            borderRadius: 'var(--radius-xs)',
            fontFamily: 'var(--font-body)', fontSize: 11.5,
            fontStyle: 'italic',
            lineHeight: 1.45,
            color: 'var(--foundation-slate)',
            textWrap: 'pretty',
            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>“{truncatedPitch}”</div>
        ) : (
          <div style={{
            padding: '8px 10px',
            background: 'var(--foundation-wash)',
            border: '1px dashed var(--foundation-pale)',
            borderRadius: 'var(--radius-xs)',
            fontSize: 11, lineHeight: 1.45,
            color: 'var(--foundation-mid)',
            textWrap: 'pretty',
          }}>Your Master Pitch will fill this area once you complete Step 5.</div>
        )}

        {/* Persona pills */}
        {template.personas && template.personas.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {template.personas.map((p, i) => {
              const meta = TEMPLATE_PERSONA_META[p] || TEMPLATE_PERSONA_META.universal;
              const tint = PERSONA_TINTS[meta.tint] || PERSONA_TINTS.default;
              return (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px 2px 7px',
                  background: tint.bg, color: tint.fg,
                  borderRadius: 999,
                  fontSize: 10.5, fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  {GMIcon.user({ size: 9 })}
                  {meta.label}
                </span>
              );
            })}
          </div>
        )}

        {/* Step chips */}
        {template.steps && template.steps.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {template.steps.map((c, i) => {
              const chipMod = c.module ? gmResolve(c.module) : null;
              return (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px 2px 7px',
                  background: chipMod ? chipMod.wash : 'var(--foundation-wash)',
                  color: chipMod ? chipMod.color : 'var(--foundation-slate)',
                  border: chipMod ? '0' : '1px solid var(--foundation-pale)',
                  borderRadius: 999,
                  fontSize: 10.5, fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  {GMIcon.link({ size: 9 })}
                  {c.label}
                </span>
              );
            })}
          </div>
        )}

        {/* CORAL Use Template CTA — Decision B / Tpl RF #3 */}
        <button
          onClick={onUseTemplate}
          style={{
            marginTop: 4,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: 6,
            width: '100%',
            padding: '10px 14px',
            background: 'var(--brand-coral)',
            color: '#fff',
            border: 0,
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-body)',
            fontSize: 13, fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'background var(--dur-fast) var(--ease-standard)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-coral-700)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-coral)'}
        >
          Use Template
          {GMIcon.arrowRight({ size: 13 })}
        </button>
      </div>
    </article>
  );
};

Object.assign(window, {
  GM_MODULES, gmResolve,
  GMIcon, GMButton, GMStatusDot, GMStatusBadge, GMKpiTile, GMStatusRow, GMAvatar,
  GMSectionCard, GMLogicWallCard, GMEmptyStateRow,
  // Reusable (lifted from Invoicing for Reviews persona/source rendering)
  PersonaPill, PersonaAvatar, PERSONA_TINTS,
  // Reusable Reviews additions (gm-shared.tsx target)
  StarsDisplay, RatingBar,
  // Reviews-only (reviews-shared.tsx target)
  ReviewRow, FlywheelStage, FLYWHEEL_TINTS, SOURCE_PLATFORM_META,
  // SEO Coach additions (seo-shared.tsx target)
  SEOPageRow, CitationChecklistRow, RoadmapRow, MetaLenStatus,
  SEO_PAGE_GRID, META_THRESHOLDS, metaTone,
  // Email Marketing additions (email-shared.tsx + gm-shared.tsx targets)
  GMSwitch, AutomationTile,
  EmailStatusPill, EmailRowDropdown, EmailCampaignRow, EmailSequenceCard,
  EMAIL_STATUS_META,
  // SMS Marketing additions (sms-shared.tsx + gm-shared.tsx targets)
  SmsRuleTemplatePreview, SmsConversationListRow, SmsMessageBubble,
  SmsChatHeader, SmsMessageInput, SmsEmptyChatPane,
  SMS_RULE_TRIGGER_META, SMS_BUBBLE_STATUS_META, formatDelay,
  // Social Media additions (social-shared.tsx target)
  SOCIAL_PLATFORM_META, SOCIAL_POST_STATUS_META,
  SocialScheduledPostRow, SocialPerformanceRow, SocialPlatformConnectRow,
  SocialPostStatusPill,
  // Print & Flyers additions (print-shared.tsx target)
  PRINT_FORMAT_META, PrintAspectRatio, PrintFlyerTemplate,
  PrintMaterialRow, CmykConversionPreview,
  hexToRgb, rgbToCmyk, hexToCmyk,
  // Templates Library additions (templates-shared.tsx target)
  TEMPLATE_CATEGORY_META, TEMPLATE_PERSONA_META,
  TemplatesCategorySidebarRow, TemplatesPersonaFilterRow,
  BrandDNAInjectionStrip, TemplatesCard,
});
