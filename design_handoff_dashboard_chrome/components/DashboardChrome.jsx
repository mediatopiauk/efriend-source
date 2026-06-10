// =============================================================================
// DashboardChrome.jsx — redesigned dashboard top chrome (header-toolbar layer).
//
// Replaces the legacy 6-item right-chrome with the four surviving items, in
// locked left-to-right order:
//
//   Bullhorn (default-visible ticker) · Command palette (⌘K) ·
//   Mobile (honest "Open on your phone" modal) · Reports
//
// Removed per brief: dark-mode toggle (dead) and "+ Add" (dead Metronic
// boilerplate). No QR / session / fake-status panel — the mobile glyph now
// opens an honest modal. No fake-success interactions anywhere.
//
// In production, slot <DashboardChrome.Actions/> into header-toolbar.tsx's
// right group and render <DashboardChrome.Ticker/> directly beneath the
// header. For the self-contained demo, <DashboardChrome/> renders the whole
// layer (breadcrumb is demo context only — the real header owns it).
//
// VISUAL TOKENS — all via var(--*) per COLOUR-SYSTEM.md / DESIGN_COMPLIANCE:
//   • Chrome accent: --brand-indigo (never coral — coral is conversion-only)
//   • Icon buttons:  --foundation-slate idle, --foundation-wash hover,
//                    --brand-indigo-100 + --brand-indigo when open/active
//   • Ticker:        --foundation-wash bar, --foundation-slate body text
//   • New pill:      amber --color-warning (genuine new-feature only)
//   • Update pill:   --brand-indigo ; Tip pill: neutral --foundation-slate
//   • Modals:        --foundation-white shell, --foundation-pale border,
//                    --shadow-lg (palette) / --shadow-xl (mobile modal)
//   • --font-display on TITLES ONLY; --font-body everywhere else
// =============================================================================

// -----------------------------------------------------------------------------
// New GMIcon glyphs for the chrome. Lucide 1.75-stroke, rounded — matches set.
// -----------------------------------------------------------------------------
Object.assign(GMIcon, {
  megaphone: (p = {}) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  command: (p = {}) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M15 6a3 3 0 1 0 3 3h-3V6zM9 6a3 3 0 1 1-3 3h3V6zM9 18a3 3 0 1 0-3-3h3v3zM15 18a3 3 0 1 1 3-3h-3v3zM9 9h6v6H9z" />
    </svg>
  ),
  smartphone: (p = {}) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M12 18h.01" />
    </svg>
  ),
  clipboardList: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 11h6M9 15h4M9 7h.01" />
    </svg>
  ),
  copy: (p = {}) => (
    <svg width={p.size || 15} height={p.size || 15} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  printer: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" stroke="currentColor" {...gmIconBase}>
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  ),
});

// =============================================================================
// Toast — minimal honest confirmation. White card, pale border, shadow-lg,
// success-tick. Dispatched imperatively via showToast(msg). No fake success;
// only fires on genuinely completed actions (clipboard write, etc).
// =============================================================================
function showToast(message) {
  window.dispatchEvent(new CustomEvent('dash-toast', { detail: { message, ts: Date.now() } }));
}

const ToastHost = () => {
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => {
    const onToast = (e) => {
      const t = { id: e.detail.ts + Math.random(), message: e.detail.message };
      setToasts((prev) => [...prev, t]);
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 2800);
    };
    window.addEventListener('dash-toast', onToast);
    return () => window.removeEventListener('dash-toast', onToast);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
      zIndex: 1200, pointerEvents: 'none',
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '11px 16px 11px 13px',
          background: 'var(--foundation-white)',
          border: '1px solid var(--foundation-pale)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
          color: 'var(--foundation-dark)',
        }}>
          <span style={{
            width: 20, height: 20, borderRadius: 999,
            background: 'rgba(4,120,87,0.12)', color: 'var(--color-success)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>{GMIcon.check({ size: 12 })}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
};

// =============================================================================
// IconButton — the chrome icon affordance. Square, transparent idle, wash on
// hover, indigo-wash when its panel is open. Optional notification dot.
// =============================================================================
const ChromeIconButton = ({ icon, label, onClick, active = false, dot = false }) => {
  const [hover, setHover] = React.useState(false);
  const bg = active ? 'var(--brand-indigo-100)' : hover ? 'var(--foundation-wash)' : 'transparent';
  const fg = active ? 'var(--brand-indigo)' : hover ? 'var(--foundation-dark)' : 'var(--foundation-slate)';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: 'unset', cursor: 'pointer', position: 'relative',
        width: 38, height: 38, borderRadius: 'var(--radius-sm)',
        display: 'grid', placeItems: 'center',
        background: bg, color: fg,
        transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)',
      }}
    >
      {typeof icon === 'function' ? icon({ size: 18 }) : icon}
      {dot && (
        <span style={{
          position: 'absolute', top: 7, right: 8,
          width: 7, height: 7, borderRadius: 999,
          background: 'var(--brand-indigo)',
          border: '1.5px solid var(--foundation-white)',
        }} />
      )}
    </button>
  );
};

// =============================================================================
// Announcement ticker — VISIBLE BY DEFAULT. Bullhorn click toggles it off.
// Soft foundation-wash bar, indigo leading label, per-item dismiss persisted
// to localStorage (bullhorn.dismissed.<id>). Marquee pauses on hover so items
// stay clickable. WCAG AA: slate text on wash bar.
// =============================================================================
const PILL_TREATMENT = {
  New:    { bg: 'rgba(180,83,9,0.10)',     fg: 'var(--color-warning)' },
  Update: { bg: 'var(--brand-indigo-100)', fg: 'var(--brand-indigo)'  },
  Tip:    { bg: 'var(--foundation-pale)',  fg: 'var(--foundation-slate)' },
};

const TickerItem = ({ item, onDismiss }) => {
  const pill = PILL_TREATMENT[item.category] || PILL_TREATMENT.Tip;
  const clickable = Boolean(item.href);
  const inner = (
    <>
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '2px 8px',
        background: pill.bg, color: pill.fg,
        borderRadius: 999,
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        flexShrink: 0,
      }}>{item.category}</span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
        color: 'var(--foundation-slate)', whiteSpace: 'nowrap',
      }}>{item.headline}</span>
      {clickable && (
        <span style={{ color: 'var(--brand-indigo)', display: 'inline-flex', flexShrink: 0 }}>
          {GMIcon.externalLink({ size: 12 })}
        </span>
      )}
    </>
  );

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      {clickable ? (
        <a href={item.href} style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          textDecoration: 'none', color: 'inherit',
        }}>{inner}</a>
      ) : (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>{inner}</span>
      )}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDismiss(item.id); }}
        aria-label={`Dismiss: ${item.headline}`}
        title="Dismiss this announcement"
        style={{
          all: 'unset', cursor: 'pointer', flexShrink: 0,
          width: 18, height: 18, borderRadius: 'var(--radius-xs)',
          display: 'grid', placeItems: 'center',
          color: 'var(--foundation-mid)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--foundation-pale)'; e.currentTarget.style.color = 'var(--foundation-dark)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--foundation-mid)'; }}
      >{GMIcon.x({ size: 11 })}</button>
      <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--foundation-pale)' }} />
    </span>
  );
};

const AnnouncementTicker = ({ items, onDismiss, onClose }) => {
  if (!items.length) return null;
  // Duplicate the run so the marquee loops seamlessly; -50% lands on the copy.
  const renderRun = (keyPrefix) =>
    items.map((it) => (
      <TickerItem key={`${keyPrefix}-${it.id}`} item={it} onDismiss={onDismiss} />
    ));

  return (
    <div className="dash-ticker" role="region" aria-label="Product announcements" style={{
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      alignItems: 'center', gap: 0,
      background: 'var(--foundation-wash)',
      borderBottom: '1px solid var(--foundation-pale)',
    }}>
      {/* Leading label */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '0 16px', height: 44,
        borderRight: '1px solid var(--foundation-pale)',
        flexShrink: 0,
      }}>
        <span style={{ color: 'var(--brand-indigo)', display: 'inline-flex' }}>
          {GMIcon.megaphone({ size: 15 })}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.10em', textTransform: 'uppercase',
          color: 'var(--brand-indigo)', whiteSpace: 'nowrap',
        }}>What's new</span>
      </div>

      {/* Marquee track */}
      <div className="dash-ticker-viewport" style={{ overflow: 'hidden', height: 44, display: 'flex', alignItems: 'center' }}>
        <div className="dash-ticker-track" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          paddingLeft: 18, whiteSpace: 'nowrap',
        }}>
          {renderRun('a')}
          {renderRun('b')}
        </div>
      </div>

      {/* Close whole ticker (same effect as bullhorn toggle-off) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Hide announcements"
        title="Hide announcements"
        style={{
          all: 'unset', cursor: 'pointer', flexShrink: 0,
          width: 44, height: 44,
          display: 'grid', placeItems: 'center',
          color: 'var(--foundation-mid)',
          borderLeft: '1px solid var(--foundation-pale)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--foundation-dark)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--foundation-mid)'; }}
      >{GMIcon.x({ size: 14 })}</button>
    </div>
  );
};

// =============================================================================
// Command palette — ⌘K. Foundation-white shell, pale border, shadow-lg.
// Title in --font-display (only). Eyebrow section headers. Keyboard-driven:
// ↑↓ navigate, ↵ select, Esc close. Hover/focus rows wash.
// =============================================================================
const KbdChip = ({ children }) => (
  <kbd style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 18, height: 18, padding: '0 5px',
    background: 'var(--foundation-white)',
    border: '1px solid var(--foundation-pale)',
    borderRadius: 'var(--radius-xs)',
    boxShadow: '0 1px 0 var(--foundation-pale)',
    fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600,
    color: 'var(--foundation-slate)', lineHeight: 1,
  }}>{children}</kbd>
);

const CommandPalette = ({ onClose, onNavigate }) => {
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(0);
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);

  // Filter groups by query; build a flat list for keyboard navigation.
  const filteredGroups = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMAND_GROUPS
      .map((g) => ({ ...g, items: g.items.filter((it) => !q || it.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const flat = React.useMemo(() => filteredGroups.flatMap((g) => g.items), [filteredGroups]);

  React.useEffect(() => { setSelected(0); }, [query]);
  React.useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);

  const choose = (item) => { onNavigate(item); onClose(); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, flat.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (flat[selected]) choose(flat[selected]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  let runningIndex = -1;

  return (
    <div
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Command palette"
      style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        background: 'rgba(15,25,35,0.55)',
        display: 'grid', placeItems: 'start center',
        padding: '12vh 24px 24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        style={{
          width: 'min(620px, 100%)',
          background: 'var(--foundation-white)',
          border: '1px solid var(--foundation-pale)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          maxHeight: '70vh',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '18px 20px 14px',
        }}>
          <span style={{ color: 'var(--brand-indigo)', display: 'inline-flex', marginTop: 2 }}>
            {GMIcon.command({ size: 20 })}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              margin: 0,
              fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
              letterSpacing: '-0.02em', color: 'var(--foundation-dark)', lineHeight: 1.15,
            }}>Command Palette</h2>
            <div style={{
              marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 12.5,
              color: 'var(--foundation-mid)',
            }}>Quick jump to any module or feature</div>
          </div>
          <button
            type="button" onClick={onClose} aria-label="Close" title="Close"
            style={{
              all: 'unset', cursor: 'pointer',
              width: 28, height: 28, borderRadius: 'var(--radius-xs)',
              display: 'grid', placeItems: 'center', color: 'var(--foundation-mid)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--foundation-wash)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >{GMIcon.x({ size: 16 })}</button>
        </div>

        {/* Search input (matches settings input recipe) */}
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)',
            gap: 10, alignItems: 'center',
            padding: '0 12px',
            background: 'var(--foundation-white)',
            border: '1px solid var(--foundation-pale)',
            borderRadius: 'var(--radius-xs)',
          }}>
            <span style={{ color: 'var(--foundation-mid)', display: 'inline-flex' }}>
              {GMIcon.search({ size: 15 })}
            </span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search…"
              style={{
                all: 'unset', width: '100%', padding: '11px 0',
                fontFamily: 'var(--font-body)', fontSize: 14,
                color: 'var(--foundation-dark)',
              }}
            />
          </div>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ overflowY: 'auto', padding: '0 12px 8px', flex: 1 }}>
          {flat.length === 0 ? (
            <div style={{
              padding: '28px 12px', textAlign: 'center',
              fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--foundation-mid)',
            }}>No matches for “{query.trim()}”.</div>
          ) : (
            filteredGroups.map((g) => (
              <div key={g.key} style={{ marginBottom: 6 }}>
                <div style={{
                  padding: '12px 12px 6px',
                  fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--foundation-mid)',
                }}>{g.label}</div>
                {g.items.map((it) => {
                  runningIndex += 1;
                  const idx = runningIndex;
                  const isSel = idx === selected;
                  const iconFn = GMIcon[it.iconKey] || GMIcon.arrowRight;
                  return (
                    <button
                      key={it.key}
                      type="button"
                      onClick={() => choose(it)}
                      onMouseEnter={() => setSelected(idx)}
                      aria-selected={isSel}
                      style={{
                        all: 'unset', cursor: 'pointer', width: '100%',
                        boxSizing: 'border-box',
                        display: 'grid', gridTemplateColumns: '22px minmax(0,1fr) auto',
                        gap: 12, alignItems: 'center',
                        padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                        background: isSel ? 'var(--foundation-wash)' : 'transparent',
                        color: isSel ? 'var(--foundation-dark)' : 'var(--foundation-slate)',
                      }}
                    >
                      <span style={{ display: 'inline-flex', color: isSel ? 'var(--brand-indigo)' : 'var(--foundation-mid)' }}>
                        {iconFn({ size: 17 })}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{it.label}</span>
                      {isSel && (
                        <span style={{ color: 'var(--foundation-mid)', display: 'inline-flex' }}>
                          {GMIcon.arrowRight({ size: 14 })}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer keyboard hints */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '11px 18px',
          borderTop: '1px solid var(--foundation-pale)',
          background: 'var(--foundation-wash)',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--foundation-mid)', fontWeight: 500 }}>
            <KbdChip>↑</KbdChip><KbdChip>↓</KbdChip> Navigate
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--foundation-mid)', fontWeight: 500 }}>
            <KbdChip>↵</KbdChip> Select
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--foundation-mid)', fontWeight: 500, marginLeft: 'auto' }}>
            <KbdChip>Esc</KbdChip> Close
          </span>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Mobile modal — honest "Open on your phone". No QR, no session, no fake pills.
// Shell matches the Settings billing modal pattern (white / pale / shadow-xl).
// =============================================================================
const MobileModal = ({ onClose }) => {
  const c = MOBILE_MODAL_COPY;
  const mailto = `mailto:?subject=${encodeURIComponent(c.emailSubject)}&body=${encodeURIComponent(c.emailBody)}`;

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(c.url);
      showToast('Link copied to clipboard');
    } catch {
      // Honest fallback — selection prompt, no fake success.
      window.prompt('Copy this link:', c.url);
    }
  };

  return (
    <div
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={c.title}
      style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        background: 'rgba(15,25,35,0.55)',
        display: 'grid', placeItems: 'center', padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(460px, 100%)',
          background: 'var(--foundation-white)',
          border: '1px solid var(--foundation-pale)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 14,
          padding: '22px 24px 16px',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-sm)',
            background: 'var(--brand-indigo-100)', color: 'var(--brand-indigo)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>{GMIcon.smartphone({ size: 20 })}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
              letterSpacing: '-0.02em', color: 'var(--foundation-dark)', lineHeight: 1.2,
            }}>{c.title}</h2>
          </div>
          <button
            type="button" onClick={onClose} aria-label="Close" title="Close"
            style={{
              all: 'unset', cursor: 'pointer',
              width: 28, height: 28, borderRadius: 'var(--radius-xs)',
              display: 'grid', placeItems: 'center', color: 'var(--foundation-mid)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--foundation-wash)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >{GMIcon.x({ size: 16 })}</button>
        </div>

        {/* Body */}
        <div style={{ padding: '0 24px' }}>
          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6,
            color: 'var(--foundation-slate)',
          }}>{c.body}</p>

          {/* URL chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            margin: '16px 0 4px', padding: '11px 14px',
            background: 'var(--foundation-wash)',
            border: '1px solid var(--foundation-pale)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <span style={{ color: 'var(--foundation-mid)', display: 'inline-flex' }}>
              {GMIcon.globe({ size: 15 })}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
              color: 'var(--foundation-dark)',
            }}>app.uxmasterchief.com</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 24px 14px' }}>
          <a href={mailto} style={{ textDecoration: 'none', display: 'block' }}>
            <SettingsActionButton role="primary" icon={GMIcon.mail} fullWidth ariaLabel="Email me the link">
              <span style={{ whiteSpace: 'nowrap' }}>Email me the link</span>
            </SettingsActionButton>
          </a>
          <SettingsActionButton role="outline" icon={GMIcon.copy} fullWidth onClick={copyUrl} ariaLabel="Copy the link">
            <span style={{ whiteSpace: 'nowrap' }}>Copy URL</span>
          </SettingsActionButton>
        </div>

        {/* Honest disclosure */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          margin: '0 24px 22px', padding: '9px 12px',
          background: 'rgba(180,83,9,0.10)',
          borderRadius: 'var(--radius-xs)',
        }}>
          <span style={{ color: 'var(--color-warning)', display: 'inline-flex', flexShrink: 0 }}>
            {GMIcon.clock({ size: 13 })}
          </span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
            color: 'var(--color-warning)', lineHeight: 1.45,
          }}>{c.comingSoon}</span>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Actions group — the four surviving items. Slot this into header-toolbar.tsx.
// =============================================================================
const ChromeActions = ({ onToggleTicker, tickerOpen, undismissedCount, onOpenCommand, commandOpen, onOpenMobile, mobileOpen, onReports }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <ChromeIconButton
      icon={GMIcon.megaphone}
      label={tickerOpen ? 'Hide announcements' : 'Show announcements'}
      onClick={onToggleTicker}
      active={tickerOpen}
      dot={!tickerOpen && undismissedCount > 0}
    />
    <ChromeIconButton
      icon={GMIcon.command}
      label="Command palette (⌘K)"
      onClick={onOpenCommand}
      active={commandOpen}
    />
    <ChromeIconButton
      icon={GMIcon.smartphone}
      label="Open on your phone"
      onClick={onOpenMobile}
      active={mobileOpen}
    />
    <div style={{ width: 1, height: 22, background: 'var(--foundation-pale)', margin: '0 6px' }} />
    <SettingsActionButton role="outline" icon={GMIcon.clipboardList} onClick={onReports} ariaLabel="Open Reports">
      Reports
    </SettingsActionButton>
  </div>
);

// =============================================================================
// DashboardChrome — the full chrome layer. Owns ticker / command / mobile
// state. Renders demo header context (breadcrumb is demo-only).
// =============================================================================
const TICKER_PREF_KEY = 'bullhorn.tickerOpen';

const DashboardChrome = ({ breadcrumb }) => {
  // Ticker visible by default on first load; toggle preference persists.
  const [tickerOpen, setTickerOpen] = React.useState(() => {
    const stored = localStorage.getItem(TICKER_PREF_KEY);
    return stored === null ? true : stored === '1';
  });
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Per-announcement dismiss state from localStorage (bullhorn.dismissed.<id>).
  const [dismissed, setDismissed] = React.useState(() => {
    const set = {};
    ANNOUNCEMENTS.forEach((a) => {
      if (localStorage.getItem(`bullhorn.dismissed.${a.id}`) === '1') set[a.id] = true;
    });
    return set;
  });

  const visible = ANNOUNCEMENTS.filter((a) => !dismissed[a.id]);

  const setTicker = (open) => {
    setTickerOpen(open);
    localStorage.setItem(TICKER_PREF_KEY, open ? '1' : '0');
  };

  const dismissItem = (id) => {
    localStorage.setItem(`bullhorn.dismissed.${id}`, '1');
    setDismissed((prev) => ({ ...prev, [id]: true }));
  };

  // ⌘K / Ctrl+K opens the command palette from anywhere.
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header style={{
        display: 'flex', alignItems: 'center', gap: 16,
        height: 64, padding: '0 24px',
        background: 'var(--foundation-white)',
        borderBottom: visible.length && tickerOpen ? 'none' : '1px solid var(--foundation-pale)',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>{breadcrumb}</div>
        <ChromeActions
          tickerOpen={tickerOpen}
          undismissedCount={visible.length}
          onToggleTicker={() => setTicker(!tickerOpen)}
          commandOpen={commandOpen}
          onOpenCommand={() => setCommandOpen(true)}
          mobileOpen={mobileOpen}
          onOpenMobile={() => setMobileOpen(true)}
          onReports={() => showToast('Opening Reports')}
        />
      </header>

      {tickerOpen && (
        <AnnouncementTicker
          items={visible}
          onDismiss={dismissItem}
          onClose={() => setTicker(false)}
        />
      )}

      {commandOpen && (
        <CommandPalette
          onClose={() => setCommandOpen(false)}
          onNavigate={(item) => showToast(`Jumping to ${item.label}`)}
        />
      )}
      {mobileOpen && <MobileModal onClose={() => setMobileOpen(false)} />}

      <ToastHost />
    </>
  );
};

// Default demo breadcrumb (production header owns the real one).
const DashboardBreadcrumb = () => (
  <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <a href="#" style={{
      fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
      letterSpacing: '-0.01em', color: 'var(--brand-indigo)', textDecoration: 'none',
    }}>UX Master Chief</a>
    <span style={{ color: 'var(--foundation-pale)' }}>/</span>
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
      color: 'var(--foundation-dark)',
    }}>Dashboard</span>
  </nav>
);

DashboardChrome.Actions = ChromeActions;
DashboardChrome.Ticker = AnnouncementTicker;
DashboardChrome.CommandPalette = CommandPalette;
DashboardChrome.MobileModal = MobileModal;

Object.assign(window, {
  DashboardChrome, DashboardBreadcrumb, ChromeActions, AnnouncementTicker,
  CommandPalette, MobileModal, ToastHost, ChromeIconButton, showToast,
});
