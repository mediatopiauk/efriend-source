# Mega-menu — interaction spec

**Companion to:** `mega-menu-spec.html` (visual)
**Status:** Phase A · locked
**Companion docs:** `MODAL_DRAWER_BRIEF.md` §6 (lens-by-lens behaviour table — now refined here)

The mega-menu is a single shared shell with **three behaviours**. Same DOM structure, same animation timing, same focus contract — what differs is what happens when you click a link.

---

## 1. The three variants

| # | Variant | Click does | Lenses |
|---|---|---|---|
| **1** | **Jump-anchor** | Smooth-scrolls to `#section` on the current page · URL hash updates · no network request | 1, 2, 3, 4, 5, 7, 8 |
| **2** | **In-page filter** | Filters the grid in place · URL gains `?category=…` · no page reload · mega stays open during drill | 6 (Shop) |
| **3** | **Routed nav** | Browser navigation to Template A (item detail) or Template B (area / category landing) | 9 (Directory) |

Variants are picked **per lens type**, not per fixture. The shell itself does not change.

---

## 2. Open & close

| Trigger | Behaviour |
|---|---|
| Hover top-nav item (desktop) | Open with 120 ms hover-intent delay |
| Click top-nav item (desktop) | Open immediately, focus first link |
| Tap top-nav item (mobile) | Expand inline (accordion under nav) |
| `mouseleave` panel + 240 ms | Close |
| Click outside panel | Close |
| Press `Esc` | Close · focus returns to trigger |
| Click a link (variants 1, 3) | Close on navigation |
| Click a link (variant 2) | **Stay open** so the user can drill further |
| Route change | Close |

**Hover-intent delay** is deliberately short — most users hover-and-commit; the 120 ms guards against accidental opens when sweeping the mouse across the nav.

---

## 3. Animation tokens

Reuse the modal system tokens so the whole product feels coherent.

```css
--mega-anim-in:  240ms cubic-bezier(0.16, 1, 0.3, 1);   /* same as --m-anim-in */
--mega-anim-out: 180ms cubic-bezier(0.4, 0, 1, 1);      /* same as --m-anim-out */
--mega-shadow:   0 24px 48px -12px rgba(20,17,13,0.18); /* cast downward */
```

**On open:** opacity 0 → 1, translateY -4 → 0. No scale.
**On close:** reverse.

---

## 4. Keyboard navigation

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Cycle focusable elements inside the open panel (focus is trapped) |
| `↓` / `↑` | Move within a column |
| `←` / `→` | Move between columns (desktop only) |
| `Esc` | Close the panel · return focus to the trigger |
| `Enter` / `Space` | Activate the focused link |

Closing always returns focus to the top-nav trigger that opened the panel.

---

## 5. Mobile reflow (below 720 px)

The hover model doesn't survive on mobile. On small screens:

- Top-nav collapses to a hamburger (the **mobile-nav drawer**, `drawer-loaded-showcase §3`).
- The mega-menu becomes a **section inside that drawer**, expanded via accordion.
- All three variants share the same accordion shape — the link behaviour at the leaf is still the variant-specific behaviour (jump / filter / routed).

So on Lens 6 mobile, tapping "Shop by" inside the nav drawer reveals an accordion of categories; tapping a category filters the grid and closes the drawer. Same model on Lens 9 — tapping an area routes to that area's Template B and closes the drawer.

---

## 6. Accessibility contract

Mirrors the modal/drawer accessibility contract.

- Panel root has `role="menu"` (or `role="dialog"` if it contains complex content like featured listings); each link has `role="menuitem"`.
- Trigger has `aria-haspopup="true"` and `aria-expanded="true|false"` reflecting current state.
- Focus is trapped while open.
- WCAG AA on every text/background pair · 3:1 minimum focus ring.
- Screen-reader announcement on open: trigger label + "menu expanded".
- All hover affordances are also keyboard-accessible (no hover-only interactions).

---

## 7. Per-lens behaviour map (locked)

| Lens | Mega-menu does | Click target → |
|---|---|---|
| 1 · Editorial | Jump-anchor | `#services` · `#process` · `#about` · `#booking` |
| 2 · Showcase Grid | Jump-anchor | `#grid` (with optional `?filter=` for category) |
| 3 · Marketing Tiles | Jump-anchor | `#features` · `#pricing` · `#faq` |
| 4 · Creative Immersive | Jump-anchor (or skipped — hero often replaces top-nav) | `#chapter-1` · `#chapter-2` … |
| 5 · Local Authority | Jump-anchor | `#services` · `#area` · `#reviews` · `#booking` |
| 6 · Shop | **In-page filter** | `?cat=classic` · `?cat=spicy` · featured product → Modal L quick-view |
| 7 · Menu & Reservations | Jump-anchor | `#menu-lunch` · `#menu-dinner` · `#reserve` (opens Drawer L) |
| 8 · Quote / Custom Build | Jump-anchor | `#capabilities` · `#work` · `#process` · `#quote` |
| 9 · Directory | **Routed nav** | `/clifton` (Template B) · `/listings/{slug}` (Template A) |

---

## 8. Implementation notes for Claude Code

- One component, three configurations. Don't fork the shell per variant — pass a `mode` prop (or equivalent) and a link-resolver function. The link-resolver returns either an anchor, a query-param patch, or a route.
- Wire `aria-expanded` to actual state, not just CSS class.
- For variant 2 (filter), the grid below the fold is the listener. The mega-menu component should fire a `categoryChanged` event (or update a shared store / search-params); it does not own the grid.
- For variant 3 (routed), use the framework's `<Link>` (or equivalent) — do not call `window.location =` (breaks SPA routing).
- The featured-content slot (rightmost column in all three variants) is content-managed per fixture. Wizard Step 3 should be able to populate it.

---

## 9. Acceptance criteria

1. Single shell renders correctly across all three variants.
2. Hover, click, keyboard, and Esc all behave per §2 and §4.
3. Mobile reflows into the nav drawer with the same content + behaviour.
4. WCAG AA on every variant.
5. Animation timing matches `--mega-anim-in/out`.
6. Per-lens behaviour map (§7) is honoured.
