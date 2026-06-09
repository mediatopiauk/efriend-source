# LAUNCH STATE — 2026-06-08

**Single source of truth.** Supersedes: the email-lens handoff status notes,
`vite/CURRENT_MISSION.txt`, `PROJECT_BACKLOG.md`, and the 30 April audit — those
are stale; do not act on them.

**Still BINDING (NOT superseded — these are principles, not status):**
`PROJECT_SOUL.txt`, `DESIGN_COMPLIANCE_HARD_RULE.md`, `RESKIN_COMPLIANCE_SHEET.md`,
`COLOUR-SYSTEM.md`. Any UI/design work still goes through Claude Design per the hard rule.

Every line below is grounded in disk/live evidence gathered in the 2026-06-08
session (live probes, DB queries, git, edge-fn checks) — not memory or planning docs.

---

## Subsystem status

| Subsystem | Status | Evidence (live/disk) |
|---|---|---|
| **Money path — wiring** | ✅ DONE | `create-checkout` mints **`cs_live_…`** for all 7 tiers/add-ons → `STRIPE_SECRET_KEY=sk_live_` + 7 live `STRIPE_PRICE_*` set + deployed (probed 2026-06-08). |
| **Money path — logic proven (test)** | ✅ DONE | DB shows webhook-written subs: `sites` `910a1293` (`sub_1TeIsO…`, small-business, active) + `cdebf6b3` (`sub_1TeKUs…`, small-business, active) on acct `acct_1T0rxiCj3TM3kGLT`. Checkout→webhook→customer+subscription+tier-write all confirmed. |
| **Money path — LIVE webhooks (G1 item 3)** | ✅ DONE | Proven by the live charge: the live `checkout.session.completed` was delivered to the live `stripe-webhook` endpoint and wrote the subscription chain → endpoint registered + `whsec_` correct. |
| **Money path — products/metadata (G1 item 1)** | ✅ DONE | Live charge wrote `subscription_tier=small-business` → the Small Business product's `metadata.tier` is correct. (Stale-product archival tidy via `scripts/stripe-live-check.mjs` — not a blocker.) |
| **Money path — physical LIVE charge** | ✅ DONE + REFUNDED | 2026-06-08 ~21:00 — real £29 Small Business charge on admin `be0fb368` → live `sub_1Tg9Ik…` + `subscription_tier=small-business` + `status=active` written → **refunded 21:02**. |
| **Automation AE-1 (queue + cron)** | ✅ DONE | `automation_jobs` has `done` rows with `processed_at` (autonomous minute sweep); `claim_automation_jobs` RPC → 200. |
| **Automation AE-2 (event triggers)** | ✅ DONE | Migration `20260607130000_ae2_event_triggers.sql` applied; E2E this session: invoice→`paid` auto-enqueued a review job → cron sent it. |
| **Automation AE-4 (rules ON)** | ✅ DONE | Server-side seed migration applied → every project has 1× `invoice_paid` + 3× `invoice_overdue` (enabled); new-project trigger auto-seeds. Toggles ungated for all plans; off-switch proven E2E (disable → 0 enqueued), incl. free-tier. |
| **Tenant isolation (RLS)** | ✅ DONE | Authenticated read returns only owned projects; `bookings` enforce `user_owns_site(site_id)` (authenticated read = 0 for mis-keyed rows); `contacts`/`invoices` on `auth.uid()=user_id`; client localStorage cross-account bleed fixed (`vite 48be1ccf`). |
| **Output / lenses / renderer** | ✅ DONE | Pilot renders live + dynamic (no-store); content edits go live (~2.5s FAQ test); 9 website lenses + shop (SHOP-2c/3) deployed; 5 email lenses sent 200 (branded). |
| **Content freshness / revalidation** | ✅ DONE (webhook moot) | Pages dynamic → always fresh; `notify_site_revalidation` returns 401 (secret mismatch) but has no effect (nothing to revalidate). |
| **Email / comms — send** | ✅ DONE | Real SendGrid sends (5 lenses + booking) returned 200; branded lenses wired into `send-email` + `booking-create` (`renderEmailLens`). |
| **Email / comms — domain auth** | ⚠️ CONFIRM | SPF/DKIM for the sending domain not verified this session — confirm in SendGrid before bulk marketing. |
| **Wizard + CMS + deploy** | ✅ DONE | `app.uxmasterchief.com` live (route code-split; no-cache HTML + immutable-asset headers); wizard routes render; pilot deployed (`is_deployed=true`, site serving); CMS live with walk-in booking editor; deploy creates the `sites` row. |

---

## G1 (live Stripe) — final state

- **DONE — fully proven (2026-06-08):** live secret key + all 7 live price IDs (`cs_live_`); `create-checkout`/`stripe-webhook`/`product-payment-webhook` deployed live; and a **real £29 Small Business charge** on admin `be0fb368` drove the full chain — live `checkout.session.completed` → live webhook → `sub_1Tg9Ik…` + customer + `subscription_tier=small-business` + `status=active` → **refunded ~21:02**. Live webhook endpoint + `whsec_` confirmed working; Small Business product metadata correct.
- **Tidy (not a blocker):** archive any remaining stale live products — confirm/clean via `scripts/stripe-live-check.mjs`.
- **Failsafe:** the webhook resolves tier from **product `metadata.tier/addon`** (so a mis-mapped price can't silently grant the wrong tier); tier caps enforced in `send-email`/`send-sms` via `_shared/tier-limits.ts`.

---

## Genuinely-open items (honest)

| Item | Status | Note |
|---|---|---|
| Manual-booking `site_id` RLS | ✅ DONE | `createBooking` now writes the real `sites.id` → 42501 + empty-list cleared (proven). **Remaining (not a blocker):** existing rows still have `site_id=project_id` → a one-off backfill makes old bookings visible in the authenticated list (logged). |
| AE-4 invoice-rule seeding | ✅ DONE | `20260609120000_ae4_seed_invoice_rules.sql` applied + tracked; all projects seeded (enabled) + new-project trigger; toggles ungated for all plans; off-switch proven incl. free-tier. |
| Existing-bookings `site_id` backfill | OPEN (logged, not a blocker) | Old bookings (widget + pre-fix manual) have `site_id=project_id` → hidden from the authenticated list until backfilled. New bookings are correct. |
| Email domain auth (SPF/DKIM) | CONFIRM | Verify in SendGrid before any bulk marketing send. |
| Stale Stripe products archival | Tidy (not a blocker) | Confirm/clean via `scripts/stripe-live-check.mjs`; the correct 7 are live + proven by the charge. |
| Per-invoice Pay link | Fast-follow (logged) | Invoice email "Pay" CTA currently falls back to the website. |
| Marketing unsubscribe | Fast-follow (logged) | Required before bulk marketing (`contacts.do_not_email` exists). |
| Booking reschedule reminder | Fast-follow (logged) | Rescheduling a confirmed booking doesn't move the queued reminder. |
| `automation_jobs` test rows | Cosmetic | 2 leftover test rows (`ae1-*`) — delete when convenient. |

**Known infra gotcha (resolved, documented so it isn't re-debugged):** this Supabase
project uses the new API-key system — edge functions get the `sb_secret_…` key
injected, which is rejected as a JWT bearer by `verify_jwt`-on functions. Function-to-
function calls must use a legacy service-role JWT (`INTERNAL_SERVICE_JWT`, already set
on `automation-run`).

---

## Phase 2 (separate — NOT launch blockers)

- **Social auto-posting** — gated on platform API approval (AE-3 deferred). Draft + schedule exist; the push is the gated piece.
- **Full automation rules editor** — create/edit UI (toggle-only today).
- **Sarah auto-booking** — voice intent → booking not built.
- **Inbound SMS-confirm** (CONFIRM/RESCHEDULE) — needs an inbound webhook.
- **Missed-call SMS** (`manual` trigger) — needs the voice module to enqueue.

---

## What's next (accurate)

1. **Existing-bookings `site_id` backfill** — make old bookings visible in the authenticated list (logged; not a blocker).
2. **Proof run** — full end-to-end customer-journey rehearsal.
3. **First customer.**

G1, FIX 1 (booking `site_id`) and FIX 2 (AE-4 seed + universal off-switch) are all **DONE** (see above). Optional tidy: archive stale Stripe products; confirm SPF/DKIM before bulk email. Everything else above is settled — do not re-tread it. Phase-2 items are explicitly out of scope for launch.

---

*Updated 2026-06-09: G1 proven + refunded; FIX 1 + FIX 2 shipped (vite `5cab7677`, deployed to `app.uxmasterchief.com`). Migration `20260609120000` applied + tracked.*
