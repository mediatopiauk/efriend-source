# Quote / Custom Build Lens — Claude Design Brief

**Date:** May 2026
**Status:** Standalone brief. Lens 8 in the output engine library.

---

## 1. Why this is a separate brief

Shop (Lens 6) sells catalogue items. Local Authority (Lens 5) sells trust + a phone number. **Neither serves businesses where every job is custom and price is "depends on the brief."**

A CNC shop, a sign-maker, a joiner, a fabricator, a custom-print supplier, an architectural metalwork firm, a bespoke kitchen builder, a stonemason — all need the same shape: **show what you can do + show how the process works + collect a brief + send a quote.** This is enquiry-led, not catalogue-led, but more transactional than a generic service business.

---

## 2. The locked premise

UK manufacturing + skilled trades = roughly 250,000 SMBs. Most of them are currently served by:
- **Wix/Squarespace** — looks like a portfolio, no real quote pipeline, file uploads are clunky
- **Shopify** — completely wrong shape, forces them to fake-product their custom work
- **Bespoke quote-system SaaS** (e.g. Buildxact for builders) — expensive, vertical-locked
- **Email + spreadsheets** — most common, by far

**What's missing:** a quote-shaped lens that handles the upload-a-brief flow, materials/finishes gallery, process explainer, past-projects portfolio, and an enquiry pipeline that lands in CRM with the file attached. Inside a general-purpose SaaS, not a vertical specialist.

---

## 3. What this reuses from the existing wizard

| Already in wizard | Source |
|---|---|
| CRM module (lead capture) | `/grow/crm/` |
| Portfolio / projects as a content kind | `content.tsx` |
| Email module (auto-reply, lead routing) | `/grow/email/` |
| Sarah (qualification chat) | Logic Wall |
| Photo gallery | existing |

**Adds to the wizard (small):**
- `services[]` — array of `{name, description, image, leadTime, materials[]}` (a "service" is e.g. "CNC routing" or "Laser engraving")
- `materials[]` — array of `{name, image, samples?, leadTime}`
- `process[]` — array of `{step, title, description}` (3–5 steps typical)
- `quoteForm` — `{fields[], fileTypes[], maxFileSize, autoReply}` — drives the upload-brief form
- `pastProjects[]` — uses existing portfolio kind, with new fields `{client, brief, outcome, leadTime}`

---

## 4. The Quote / Custom Build lens — full anatomy

### §1 Nav (standard)
- Logo, services drop-down, materials, process, projects, contact, "Get a quote" CTA (prominent)

### §2 Hero — Process-led
- Headline: outcome-focused ("Whatever you can draw, we can cut.")
- Sub: 1-line process summary
- **Primary CTA: "Upload your brief" → opens quote form modal directly**
- Secondary: "See past projects"
- Background: action shot (machine in operation / craftsperson at work)

### §3 What we make — services grid
- 4–8 cards: "CNC routing", "Laser cutting", "Engraving", "Anodising", etc.
- Each: image, name, 1-line description, "Get a quote for this →"

### §4 The process strip
- 1·2·3·4 horizontal numbered steps:
  - "1 · Send us your brief or drawing"
  - "2 · We review and quote within 24hrs"
  - "3 · We make it"
  - "4 · Collection or UK delivery"
- Visual: line connector between numbers, icon per step
- Sets expectations — critical for trust

### §5 Materials & finishes
- Visual grid of materials they work with (aluminium / brass / oak / acrylic / mild steel etc.)
- Click → modal with sample swatches + grades + lead times
- For sign-makers this is paint/vinyl/substrate types

### §6 Past projects
- Card grid — image + client + brief summary + outcome
- "See full project →" expands to detail
- Filter by service if catalogue is large

### §7 The quote form (the heart of the lens)
- Embedded in-page section (not just a modal trigger)
- Fields: name, email, phone, project type (dropdown from `services[]`), describe-your-brief (textarea), **file upload** (multiple files, configurable types — typically PDF, DWG, DXF, AI, JPG, PNG), preferred timeline, budget range
- Drag-and-drop file zone, clear file-type + size guidance
- Privacy line + auto-reply commitment ("We'll reply within 1 working day")

### §8 About / Workshop / Capability
- Short paragraph about the team, machines owned, certifications (ISO, FSC, etc.)
- Photo of the workshop or machines
- Builds trust — buyers of custom work want to know who's making it

### §9 FAQ
- Process-specific Qs: minimum order, lead times, drawing formats, delivery, materials sourcing, payment terms

### §10 Reviews / Testimonials
- B2B-friendly — quotes from named clients + their company
- Verified-buyer badges replaced with "Repeat customer since 2022" style

### §11 Footer
- Standard, with quote CTA reinforced

### Floating widgets
- Sarah (chat) — qualifies leads, asks the upload question if customer hasn't already
- Max (voice) — handles phone enquiries
- "Get a quote" floating button on mobile

---

## 5. The quote form — implementation detail

The form is the conversion engine. Treat with care.

**File upload:**
- Configurable accepted types per business (`quoteForm.fileTypes`)
- Max file size per business (default 25MB, configurable up to 100MB)
- Drag-and-drop AND click-to-browse
- Show file thumbnail + name + size after selection
- Multiple files supported
- Files stored in Supabase storage, linked to CRM lead

**Auto-reply mechanic:**
- Submission → CRM lead created with attached files
- Email module fires `quoteForm.autoReply` template to customer
- Email module fires `quoteForm.notifyOwner` to business owner
- Sarah optionally follows up if qualification is incomplete (no budget, vague brief)

**Lead routing:**
- Tags lead by `service` selected
- Owner sees in CRM with file attachments inline

---

## 6. Deliverables

1. **Full desktop comp** populated with a realistic UK manufacturing/trades fixture (propose: a CNC shop in the Midlands, e.g. "Severn Cut" — invent if needed)
2. **Section spec** per §4
3. **Quote form spec** — fields, file upload UX, validation, success state
4. **Materials gallery design** — grid + modal pattern
5. **Process strip design** — numbered horizontal steps, icon style
6. **Past projects card + detail spec**
7. **Mobile reflow** — hero CTA stays prominent, form becomes full-screen
8. **Gap analysis rules** — min/comfortable/loaded tiers
9. **Lens 8 card for the gallery**

---

## 7. NOT in scope

- Real-time pricing calculator (massively different lens — Phase 3)
- 3D model viewer / AR preview (Phase 3)
- Drawing markup / annotation tools (Phase 3)
- Multi-currency / multi-region quoting (Phase 2)
- ERP/MRP integration (out of scope forever — that's not what UXMC is)

---

## 8. Acceptance criteria

1. "Upload your brief" is reachable from the hero in ≤1 click
2. Quote form supports the file types real manufacturers receive (DXF, DWG, PDF, STEP for some)
3. Past projects make it obvious this is a real shop, not a marketing front
4. Process strip removes the "how does this work?" friction that kills custom-build conversion
5. Self-heals: no past projects yet → process strip + materials gallery carry the page
6. Schema.org Service markup + Organization with sameAs links to trade associations
