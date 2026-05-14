# Handover for next Claude — UXMC Brand reskin & deploy
## Created 1 May 2026, ~16:40 by previous Claude (the one Duncan was rightly fed up with)

---

## TL;DR for next Claude — read this first

1. **Don't trust the previous Claude's session memory. Read git logs and files before doing anything.**
2. **The Brand reskin work is good and committed.** Both inner and outer repos have it. Backups exist.
3. **The deploy chain is the only unfinished thing.** Vercel webhook is broken or disconnected. Tonight's push to GitHub didn't trigger a build. CLI deploy from the outer folder ALSO fails because the outer folder has no `package.json`.
4. **Don't run `vercel` CLI from the outer folder again.** It links the wrong project, fails with `vite build: command not found`, and leaves a mess.

---

## Project layout (re-verify before trusting)

- **Outer repo:** `/Users/duncanmaund/uxmasterchief/` — branch `reskin/dashboard-mockup-port` — pushes to `git@github.com:mediatopiauk/efriend-source.git`
- **Inner submodule:** `/Users/duncanmaund/uxmasterchief/vite/` — branch `feat/dashboard-reskin` — has NO git remote configured (this is the gotcha)
- **No `.gitmodules` file** in outer repo — vite is recorded as a gitlink (mode 160000) without standard submodule machinery
- **No `package.json`, no `vercel.json`, no build config** in outer repo — only `supabase/`, `vite/`, `.gitignore`
- The actual buildable Vite app lives at `/Users/duncanmaund/uxmasterchief/vite/`

---

## What got done tonight (1 May 2026, all committed)

### Inner repo `feat/dashboard-reskin`:
- **`dca7dc1f`** — Brand identity tab full visual port from `/ui_kits 4/wizard_step1/`. 7 SectionCards (Essentials, Palette, Archetype, Vibe, Tone, Personality, Advanced), TOC rail, Inspector, action bar. Wired to existing `useProjectStore` — no schema changes. Duncan: "absolutely brilliant"
- **`72fada7c`** — Brand polish: Inspector rebuilt as one bordered panel (header strip + 3 sections), centre column capped at 720px, TOC and Inspector flexed to fill freed space, disabled Next button no longer grey-on-grey

### Outer repo `reskin/dashboard-mockup-port`:
- **`7c097d0`** — Bumps vite submodule pointer from `eb559cdd` to `72fada7c`. Pushed to GitHub successfully. Vercel did not pick it up.

### Backup safety nets (DO NOT DELETE)
- Outer tag `backup/outer-pre-brand-push-1-may-1430` → outer commit `20d9a33`
- Inner branch `backup/inner-pre-brand-push-1-may-1430` → inner commit `72fada7c`

If anything goes wrong: `cd /Users/duncanmaund/uxmasterchief && git reset --hard backup/outer-pre-brand-push-1-may-1430`

---

## The blocker — Vercel deploy

### What we know
- GitHub got the push. Outer commit `7c097d0` is on `reskin/dashboard-mockup-port` upstream.
- Vercel "Active Branches" page (Duncan's screenshot earlier) shows last activity on `reskin/dashboard-mockup-port` as "1d ago" → Vercel never registered tonight's push.
- All branches show as "Preview" badges, none marked Production. Suggests the live URL is pinned to a specific deployment, not following any branch.
- Production deployment currently serving live `app.uxmasterchief.com` is `2qVcQtwLW` (per Duncan's screenshot of Vercel deployments) — built ~24 hours ago, source `vercel deploy` (so it was a CLI deploy, not webhook).
- Live HTTP headers confirm: `last-modified: Thu, 30 Apr 2026 08:34:37 GMT`, `age: ~110000s`, no fresh build today.

### What we tried that didn't work
- `git push origin reskin/dashboard-mockup-port` (outer) — push succeeded, no Vercel webhook fired
- `npx vercel --prod` from `/Users/duncanmaund/uxmasterchief/` — linked outer folder to `vite` Vercel project, build failed with `vite build: exit 127` (no package.json in outer)

### Cleanup done
- Removed `/Users/duncanmaund/uxmasterchief/.vercel/` folder created by the failed CLI run

### What to try next (in this order)
1. **Look at how production deployment `2qVcQtwLW` was configured.** In Vercel UI: Deployments → click `2qVcQtwLW` → look at "Source" / "Root Directory" / build command. If Root Directory is `vite/`, the right CLI command is from inside the inner folder.
2. **Try CLI deploy from inner folder:** `cd /Users/duncanmaund/uxmasterchief/vite && npx vercel --prod` — if linked correctly, this should deploy.
3. **If that fails too: check Vercel Project Settings → Git** — see if GitHub integration is enabled, and confirm which branch it watches. The webhook may have been silently disconnected.
4. **Last resort: re-link the GitHub integration** in Vercel Settings → Git → Connect Git Repository.

---

## What Duncan wants next (after deploy works)

Continue the wizard reskin tour, in order: Domain → Structure → Audience → Content → Design → SEO → Build → Audit → Deploy. UI kits exist at `/Users/duncanmaund/Documents/Work/Misc/UXMC Marketing /ui_kits 4/wizard_stepN/`.

**Reskin Rule (non-negotiable):**
1. Read the entire existing `.tsx` file end-to-end first.
2. List every feature, every input, every panel, every conditional render in plain English.
3. Show Duncan that list before writing any code.
4. Apply ONLY visual treatment from the kit's design.
5. Do not remove, rename, simplify, or reorganise any feature.
6. If kit doesn't include something from your list, ASK — never silently delete.
7. Always cap centre column at ~720px max-width and flex sidebars.
8. Never use grey-on-grey for disabled states.

---

## Patterns Duncan does NOT want

- Cards-in-cards-in-cards. One bordered panel with sectioned content is fine. Triple-nested padding is not.
- Decorative eyebrow labels with little dashes. Just label + content.
- Same colour on same background. Always check contrast.
- Editing files without reading them first.
- Saying "stop" all the time. He noticed.
- Saying "tonight" when it's morning, and vice versa.

---

## Files committed but not yet on the live site

`/Users/duncanmaund/uxmasterchief/vite/src/pages/build/brand.tsx` — 1276 lines, full reskin
`/Users/duncanmaund/uxmasterchief/vite/src/components/build/brand/` — folder of helper components from earlier in session, not currently imported by `brand.tsx` but kept for future steps to reuse

---

## Stashes still on disk (untouched)
- inner `stash@{0}`: `dashboard-icon-button-wiring-untested-1-may` — chevron/X buttons on dashboard widgets, never tested
- inner `stash@{1}`: `tonight-mess-1-may-bin-when-confirmed-good` — earlier v2 dashboard mess
- inner `stash@{2}`: `WIP brand reskin and legacy dashboard — investigate`

---

*End of handover.*
