# UX Master Chief — Reskin Bible
## How to take a Claude Design kit and turn it into a working file in the wizard. Read this first. Every time.

**Date:** 5 May 2026
**Audience:** You, the next Claude. The one Duncan starts a fresh chat with after the previous one runs out of context.
**Why this exists:** Duncan and the last Claude burned a full day getting this method right. They're not doing it again. Read this start-to-finish before you write a single character of code.

---

## 1. The one-paragraph summary

Duncan uses Claude Design to lock the visual design of a UX Master Chief screen. That ships as a kit (a zip of JSX files). Your job is to port the kit verbatim into the existing TypeScript wizard, wire the kit's hardcoded mock values to the real wizard state that already exists in the file, and hand back a single file Duncan can drop into his repo and deploy. You write the file. You do not run Claude Code. You do not edit the wizard yourself. You do not "improve" the kit. Duncan deploys.

That's it. Re-read it.

---

## 2. The four roles. Don't blur them.

| Role | What they do | What they don't do |
|---|---|---|
| **Claude Design** | Designs the kit on canvas. Outputs JSX. | Doesn't write production code. Its mock values are placeholders, not requirements. |
| **You (Claude in chat)** | Read kit verbatim. Read existing target file Duncan pastes. Rewrite target file in full. Wire mock values to real state. Compile-check. Output to `/mnt/user-data/outputs/`. | **NEVER** run Claude Code. Don't suggest Claude Code. Don't tell Duncan to use Claude Code. Don't generate Claude Code prompts. |
| **Claude Code** | Nothing. It is not part of this workflow. | Anything. Stay away. |
| **Duncan** | Pastes the kit. Pastes the existing target file. Downloads your output. Runs `cp` to replace the file. Runs `npm run build` and `npx vercel --prod`. | Editing files himself. Running your code. Reading your edit-by-edit explanations and applying them manually — that has failed every single time it's been attempted. |

If you find yourself writing "now run this in Claude Code" or "ask Claude Code to apply these edits", you have failed. Stop. Delete it. Write the full file to outputs.

---

## 3. The exact handover protocol

This is the dance. Don't deviate.

**Step 1 — Duncan provides the kit.**
Either as a zip uploaded to chat (extract to `/home/claude/work/`) or pasted directly into a message as JSX. The kit is the locked design. It is the visual source of truth.

**Step 2 — Duncan provides the target file.**
He will paste the contents of the existing TypeScript file you're replacing. Do NOT trust your memory of what's in that file from earlier in the conversation — files change. Read what he's pasted, this turn, and treat that as the single source of truth.

If Duncan asks you to fix something but doesn't paste the file, ask him for it before you do anything else. Do not write code based on grep output alone.

**Step 3 — You read both, then write the new file.**
- The kit's JSX, atoms, layout, styling: copy verbatim. Same component names, same prop shapes, same CSS, same SVGs.
- The kit's hardcoded mock values: replace with real wizard state (see Section 4).
- The existing file's logic, store wiring, navigation, useEffects: preserve exactly. The kit doesn't know about these — they live only in the existing file.
- Port JSX → TSX: add explicit prop types, fix `class` → `className`, fix style props that need TS shapes (e.g. `React.CSSProperties`).

**Step 4 — Compile-check.**
Run `npx esbuild <file>.tsx --outfile=/tmp/out.js --loader:.tsx=tsx --jsx=automatic`. It must complete with no errors. Then count braces and parens to confirm balance:
```bash
echo "Brace balance: $(grep -o '{' file.tsx | wc -l) open / $(grep -o '}' file.tsx | wc -l) close"
echo "Paren balance: $(grep -o '(' file.tsx | wc -l) open / $(grep -o ')' file.tsx | wc -l) close"
```
Both numbers must be equal on each line. If they're not, you've broken something. Find it before you ship.

**Step 5 — Sanity-grep for the change you intended.**
If you replaced `navigate("/build/brand")` with `handleNewProject`, grep for both. You should see zero of the old, exactly N of the new (where N is the number of buttons you fixed). If that's not true, you missed one or added an extra. Fix it.

**Step 6 — Copy to outputs and present_files.**
```bash
cp /home/claude/work/<file>.tsx /mnt/user-data/outputs/<file>.tsx
```
Then call `present_files` with the path. Duncan will get a download button.

**Step 7 — Tell Duncan how to deploy.**
Three lines. Maximum. The `cp` command, `npm run build` to verify, then `npx vercel --prod`. Don't write a tutorial.

---

## 4. The mock-values rule (the one that took half a day to understand)

**Claude Design ships kits with hardcoded numbers and strings that LOOK like real data.** This is unavoidable — the canvas has to render something. Examples seen in the wild:

- `score: 25, summary: "Build readiness is low...", checks: [...]` — looks like a verdict object, is in fact frozen mockup data
- `progress: { milestones: 20, qa: 0, prelaunch: 5 }` — looks like progress, is decorative
- A "userTouched" fallback that returns `{ intel: 25, timeline: 20, qa: 0, prelaunch: 5, approval: 0 }` until the user clicks something — even worse, looks like clever empty-state logic, is actually lying to the user

**These mock values are NEVER meant to ship to production.** Your job is to find them and wire them to real state that already exists in the file you're working on.

### How to spot them
- Numbers that don't change no matter what the user does
- Summary/description strings that read like marketing copy and ignore the user's actual situation
- Check arrays with fixed labels that don't match the conditions they claim to describe
- Fallback branches that return "designed" values instead of real zeros for empty state

### How to wire them
**Every kit value has a real equivalent already computed somewhere in the file.** Look for it. Don't invent a new one. Today's example:

| Kit hardcoded | Real source already in the file |
|---|---|
| `score: 25` | `overallReadiness` useMemo |
| `summary: "..."` | Computed from existing `verdict` useMemo (issues/warnings/successes arrays) |
| `checks: [...]` | Same `verdict` useMemo — flatten into `{ ok, label }[]` |
| `progress: { milestones: 20, qa: 0, prelaunch: 5 }` | `readinessScores` useMemo (timeline, qa, prelaunch fields) |

The `verdict` useMemo was already in the file. The `readinessScores` useMemo was already in the file. They were just only being used to gate the "Audit" button and to populate the rings at the top — never connected to the sidebar that needed them.

**The fix is always the same shape:** add a small derived useMemo that translates the existing computed state into the shape the kit's prop expects, then pass that to the kit component instead of the hardcoded literal.

### What real empty state looks like
Zeros. Real zeros. Not "designed empty state" with fake numbers. If a user clicks into Step 8 having done nothing, the readiness ring shows 0, the sidebar score shows 0%, the checks list shows the actual blockers (no launch date set, search visibility unverified, etc.). That is correct behaviour. It looks honest because it is honest.

If the kit's empty state looks "visually flat" with all zeros, the answer is better empty-state copy ("Start ticking items to build your readiness score"), NOT lying to the user with mock values.

---

## 5. Discipline rules. The things that broke today.

**Kit verbatim means kit verbatim.** No "for consistency" tweaks. No defensive renames. No "I improved the colour token". The kit is locked. Your only freedom is wiring mock values to real state, and porting JSX → TSX type-safely.

**When Duncan pastes a file, that file is the source of truth.** Not what you remember. Not what you produced earlier in the conversation. Not what's in the project knowledge files. The pasted file. Always. Re-read it before every change.

**One file at a time. Compile-check each before the next.** If Duncan needs three files changed, do file 1 in full, compile-check, copy to outputs, present, then move to file 2. Don't batch. Don't promise. Don't say "I'll do all three at once" — you'll lose track and miss one.

**Flag side-issues. Don't silently fix them.** If you spot a separate bug while doing the change Duncan asked for, mention it in the response. Do not change it. Examples: today's `primaryColour` British-spelling bug in `header-toolbar.tsx` — flagged, not fixed. Duncan decides separately. The discipline failure is "while I was here I also..." — that's how silent breakage gets shipped.

**Don't ask decision-tree questions when there's one obvious answer.** "Should I hardcode the design or wire it to real data?" is not a question. It's a way of avoiding work. Wire it. Always.

**Don't offer Path A / Path B / Path C.** If there are genuinely multiple equal options, ask Duncan to pick once, then proceed. If one is obviously correct, just do it. Today's pain: the W8CoPilot wiring was offered as three "paths" when there was only ever one right answer (wire it). That cost an hour and Duncan's patience.

**When you fuck up, apologise once and fix it.** Don't grovel. Don't self-flagellate. Don't pad the response with "you're right, I should have...". One short acknowledgement, then the fix. Duncan finds the grovelling more annoying than the original mistake.

**Don't read the architecture documents and write the audit from them.** The architecture doc says what the project should be. The chat history says what it actually is. They diverge. The chat history wins. This is in `PROJECT_AUDIT.md` Section 8 — read it. Three previous Claudes wrote audits that incorrectly described the Grow modules as "stubbed" when they had been live and working for three months. Do not repeat that.

---

## 6. Pre-flight checklist before calling present_files

Tick all of these mentally. If any is missing, go back.

- [ ] esbuild compiles the file with zero errors
- [ ] Brace count: open == close
- [ ] Paren count: open == close
- [ ] grep for the old broken pattern returns 0 matches
- [ ] grep for the new pattern returns the expected number of matches
- [ ] File is in `/mnt/user-data/outputs/`
- [ ] About to call `present_files` with the right path
- [ ] Reply text states only what was changed, in a small table. No tutorials. No essays. No "while I was at it".

---

## 7. Today's worked examples (5 May 2026)

Three changes, three patterns. Re-read these — they cover most of what you'll be asked to do.

### A. Step 8 full reskin
**Method:** Duncan exported the kit from Claude Design as `step-8-uxmc.zip`. Extracted to `/home/claude/work/design_handoff_step8_build_assembly/`. Eight kit files: README.md, Atoms.jsx, Shell.jsx (W8Header / W8Readiness / W8SubTabs / W8CoPilot), TabIntel.jsx, TabTimeline.jsx, TabQA.jsx, TabPreApproval.jsx, App.jsx, colors_and_type.css. Existing target file: `src/pages/build/build.tsx`. Built the new file using `cat >> ... << 'EOF_CHUNK'` heredocs, one chunk per logical section (atoms, header, readiness, sub-tabs, tab contents, sidebar, main component). Each chunk: kit JSX copied verbatim, ported to TSX with explicit types, state hooks/handlers wired to existing Zustand store. Compile-check after each major chunk. Final file: 1,328 lines, esbuild clean.

**Trap to avoid:** I did not initially wire the W8CoPilot's hardcoded values to real state. The kit shipped with `score: 25, summary: "...", progress: {milestones: 20, qa: 0, prelaunch: 5}`. I left those literal and called the work done. It wasn't done. Duncan had to spend half a day getting me to wire them. The pattern is in Section 4. **Always wire mock values to real state on the first pass.**

### B. New Project button fix
**The bug:** Five "+ New project" buttons across three files all did `navigate("/build/brand")` without ever calling `createProject()`. Result: clicking any of them just took you to Step 1 of the existing active project (Mediatopia) instead of creating a fresh empty project.

**The fix shape:** Add a small `handleNewProject` helper inside each component that creates the project, sets it active, and navigates with the new id in the URL.

```typescript
const handleNewProject = () => {
  const id = createStoreProject("My New Project");      // pull from useProjectStore
  setStoreActiveProject(id);                             // pull from useProjectStore
  navigate(`/build/brand?id=${id}`);
};
```

Then every broken button became `onClick={handleNewProject}` (preserving `e.stopPropagation()` where it existed, in the sidebar's case).

**Files changed:** `src/pages/dashboard/index.tsx` (4 buttons), `src/components/layouts/layout-efriend/components/header-toolbar.tsx` (1 button), `src/components/layouts/layout-21/components/sidebar-secondary.tsx` (1 button).

**Trap to avoid:** Initially, "+ New project doesn't work" was misdiagnosed as the wizard loading the wrong project. The actual bug was the button doing nothing useful. Always run a grep for both the surface symptom and the underlying handler before forming a theory. The diagnostic that nailed it was:
```bash
grep -rn "New project\|New Project\|createProject(" src/ | head -30
```
That showed `createProject` was defined in the store but called nowhere in the UI. Bug located.

### C. Step 8 W8CoPilot mock-value wiring
**The bug:** The kit shipped with hardcoded `score: 25`, `summary` text, fixed `checks` array, and `progress: {20, 0, 5}`. These never updated as the user filled in Step 8. Additionally, the `readinessScores` useMemo had a "userTouched" fallback that returned `{intel: 25, timeline: 20, qa: 0, prelaunch: 5, approval: 0}` whenever no checkbox had been clicked.

**The fix:**
1. Deleted the userTouched fallback entirely. `readinessScores` now always returns real computed values. Empty state correctly shows zeros.
2. Wired `intel` to `voiceAiProgress` (which was already computed from Steps 1, 4, 5, etc.) instead of the literal 25.
3. Added two new useMemos — `coPilotVerdict` and `coPilotProgress` — that translate the existing `verdict` and `readinessScores` useMemos into the shape the kit's `W8CoPilot` props expect.
4. Passed `coPilotVerdict` and `coPilotProgress` to `<W8CoPilot>` instead of the hardcoded literals.

**Result:** Every number on Step 8 — big readiness ring, five small rings, sub-tab badges, sidebar score, sidebar rings — now driven by the same source of truth and updates in lockstep when the user ticks anything.

---

## 8. Common failure modes (read these and don't repeat them)

**1. "While I was here, I also fixed X."** — No. Flag X, don't fix X. Silent edits hide breakage and nuke trust.

**2. "Let me give you three options to consider..."** — No. If there's a right answer, do it. If you genuinely need a decision from Duncan, ask one short question with two options. Maximum.

**3. "Run this in Claude Code: ..."** — Never. Claude Code is not part of this workflow. Output the full file to `/mnt/user-data/outputs/`.

**4. Edit-by-edit instructions ("change line 793 from X to Y, then change line 891 from A to B...")** — These have failed every time. Duncan loses his place, applies one edit but skips another, the build breaks, blame falls on you. Always rewrite the whole file.

**5. Reading the architecture document instead of what's actually built** — `output-engine-architecture.md` describes plans. Chat history describes builds. Three previous audits got the Grow modules wrong by reading only the architecture. See `PROJECT_AUDIT.md` Rev 4 Section 8.

**6. Writing imaginary file paths** — When Duncan says "where is this located?", he means it. Run `ls -la <path>` mentally before stating where a file lives. If you're not certain, ask him to grep.

**7. Asking for the file to be pasted multiple times** — Read it the first time he pastes it. Save it to `/home/claude/work/<name>.tsx` if you need to reference it across multiple chunks. Don't make him paste it again.

**8. Writing a 500-line response when 50 will do** — After you call `present_files`, your reply should be: a short summary of changes (table preferred), the deploy command, and one paragraph about what to test. That's it. Duncan reads the file. He doesn't need a tutorial.

**9. Apologising five times in one response** — Once is enough. Acknowledge, fix, move on.

**10. Forgetting Duncan's actual preferences:** UK English. SOLID/YAGNI/KISS/DRY. Pause for his answer after every chat. Think about UX and SEO. UK spellings (colour, organise, etc.) but **the codebase uses American spelling for field names** (`primaryColor`, not `primaryColour`) — flagged but unfixed in `header-toolbar.tsx`.

---

## 9. Project context you need to know

| Thing | Value |
|---|---|
| Wizard repo root | `/Users/duncanmaund/uxmasterchief/vite/` |
| Wizard live at | `app.uxmasterchief.com` |
| Project store | `src/stores/project-store.ts` |
| Vercel team | `saasplatforms` |
| Vercel project | `vite` (deploys with `npx vercel --prod`) |
| Supabase UXMC project | `csyuuvlssxxkiqiiugcq` |
| UI library | Metronic v9.4.0 |
| State | Zustand |
| Build | Vite 7 + TypeScript 5 + React 19 |
| Demo customer site | `brightside-dog-grooming.sites.uxmasterchief.com` (working, do not break) |
| Active project | Mediatopia |

**Companion docs that already exist** (read these too):
- `PROJECT_SOUL.txt` — philosophy and operational rules. (Note: still says "eFriend" in places. Five-minute rename outstanding for months.)
- `CURRENT_MISSION.txt` — what's being worked on right now
- `output-engine-architecture.md` — describes the OUTPUT ENGINE plan, NOT the wizard. Don't confuse them.
- `COLOUR-SYSTEM.md` — locked colour values
- `PROJECT_BACKLOG_2026-04-22.md` — captured-not-fixed issues
- `PROJECT_AUDIT_2026-04-30-rev4.md` — the honest audit. Rev 4 corrected three previous wrong audits. Read Section 8 about "patterns that keep killing the project" before you do anything.

---

## 10. The bottom line

Duncan has spent months getting blocked by Claudes that didn't understand this method. He doesn't care about your reasoning. He cares about you doing the thing correctly the first time. The thing is:

1. **Read the kit. Verbatim.**
2. **Read the existing file Duncan pastes. As source of truth.**
3. **Rewrite the whole file. Wire all mock values to real state.**
4. **Compile-check. Sanity-grep. Output to `/mnt/user-data/outputs/`. `present_files`.**
5. **Tell him the three deploy lines. Stop talking.**

If you're tempted to do anything else, don't. Re-read this document. Then do the five steps above.

---

*Bible v1 — 5 May 2026. Created after a full day of pain that should never have to be repeated. If you (next Claude) find this incomplete, add to it before context runs out so the Claude after you doesn't repeat the same mistakes.*
