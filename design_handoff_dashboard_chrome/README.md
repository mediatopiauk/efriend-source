# Dashboard top chrome — header-toolbar reskin

Redesigned right-side chrome for every dashboard page. Open `DashboardChrome.html`
to interact; the chrome layer itself lives in `components/`.

## Final chrome inventory (left → right)

**Bullhorn** (default-visible ticker) · **Command palette** (⌘K) · **Mobile**
(honest "Open on your phone" modal) · **Reports**

Removed per brief: the dead **dark-mode toggle** and the unwired **+ Add** button.

## Files

| File | Role |
|---|---|
| `components/dashboard-chrome-data.jsx` | Locked data constants — `ANNOUNCEMENTS`, `COMMAND_GROUPS`, `MOBILE_MODAL_COPY`. Cleanly separable from the view. |
| `components/DashboardChrome.jsx` | The chrome layer: toolbar items, ticker, command palette, mobile modal, toast. |
| `components/Shared.jsx`, `components/SettingsShared.jsx` | Inherited primitives (`GMIcon`, `SettingsActionButton`). Copied unchanged. |
| `colors_and_type.css` | Locked design tokens. |

## Production wiring

In `header-toolbar.tsx`, slot **`<DashboardChrome.Actions … />`** into the existing
right group, and render **`<DashboardChrome.Ticker … />`** directly beneath the
header. The breadcrumb / page title / "Welcome back, Duncan" block are owned by the
existing header and are unchanged — the demo breadcrumb in `DashboardChrome.html`
is context only. `<DashboardChrome>` wraps all of this together for the demo.

## Behaviour notes (honesty contract)

- **Ticker** is visible by default on first load. The bullhorn (and the bar's ×)
  toggles it off; the preference persists in `localStorage["bullhorn.tickerOpen"]`.
  Per-item dismiss persists as `localStorage["bullhorn.dismissed.<id>"]`, so closing
  one item never kills the ticker forever. The bullhorn shows an indigo dot only
  when the ticker is hidden **and** undismissed items remain.
- **Command palette**: ⌘K / Ctrl+K toggles it. ↑↓ navigate, ↵ select, Esc close.
  Selecting a row calls `onNavigate(item)` (wired to the real router in production).
- **Mobile modal**: no QR, no session ID, no fake status pills. "Email me the link"
  is a real `mailto:` with the URL pre-filled; "Copy URL" writes to the clipboard and
  confirms with a toast. The "coming soon" disclosure flags the logged PWA work.
- **Reports** is unchanged in behaviour.

## Visual tokens

Every colour is a `var(--*)` token. Indigo is the chrome accent; coral is never used
here (conversion-only). Amber (`var(--color-warning)`) appears only on the "New"
feature pill and the honest "coming soon" disclosure. `var(--font-display)` is used on
titles only.
