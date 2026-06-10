# Lens 8 — Quote / Custom Build · Section Spec

**Shape:** Utility bar → nav → hero (process-led) → services grid → process steps (1·2·3·4) → materials & finishes gallery → past projects → quote form (the heart, mid-page) → about → FAQ → reviews → footer.

**Best fits:** CNC routing, laser cutting, sign-makers, joiners, fabricators, architectural metalwork, monumental masons, custom printers, bespoke builders, prop-makers, sign-writers — any service priced per-job, not per-SKU.

## Sections (per brief §4)

| # | Section | Purpose | Min content | Ideal content |
|---|---------|---------|-------------|---------------|
| 1 | Utility bar | Trade credibility line | location + delivery radius | + lead time + accreditations |
| 2 | Nav | Brand + jump links + "Get a quote" CTA | brand + 3 anchors + CTA | brand + 5 anchors + phone + CTA |
| 3 | Hero | Sets confidence — process-led not catalogue-led | photo + headline + 1 CTA | photo + eyebrow + headline + sub + 2 CTAs (Get quote / See work) + accreditation strip |
| 4 | Services | What we actually do | 3 service cards | 4–6 service cards with thumbnail + capabilities list |
| 5 | Process | 1·2·3·4 steps — converts uncertainty | 3 steps | 4 steps: Brief → Quote → Make → Deliver (with timings) |
| 6 | Materials & finishes | Tactile credibility | 4 swatches | 8–12 swatches with material name + properties (thickness, finish, price band) |
| 7 | Past projects | Portfolio of bespoke work | 3 projects | 6+ projects with brief / material / lead-time / photo |
| 8 | Quote form | The whole point of the page | name + email + brief + submit | + phone + drawing upload + material preference + quantity + timeline + budget band |
| 9 | About | Credibility — workshop, machines, team | 1 photo + 80 words | + machine list + capabilities + workshop tour photos |
| 10 | FAQ | De-risks the enquiry | 4 Qs | 6–8 Qs (drawings, lead times, delivery, revisions, payment, IP) |
| 11 | Reviews | Social proof — B2B + consumer | 3 reviews | 4+ reviews with company name where applicable |
| 12 | Footer | Multi-column + accreditations + legal | 3 cols | 4 cols with newsletter + accreditation logos row |

## Wizard data → visual slot mapping

| Slot | WizardData field | Notes |
|------|------------------|-------|
| Utility bar accreditations | `accreditations[]` *(new)* | "ISO 9001", "FSC", "CHAS" etc — chip row |
| Hero photo | `hero.image` *(existing)* | workshop-in-action shot preferred over static product |
| Services | `services[]` *(existing)* + `capabilities[]` *(new per service)* | each card: thumbnail + name + 3-bullet capability list |
| Process steps | `processSteps[]` *(new — exactly 3 or 4)* | `{number, title, body, timing?}` |
| Materials | `materials[]` *(new)* | `{name, thickness?, finish?, priceBand?, swatch image}` |
| Past projects | `projects[]` *(new — distinct from `gallery`)* | `{title, brief, material, leadTime, photo}` — captioned, not a raw grid |
| Quote form fields | `quoteFormFields[]` *(new — configurable)* | always: name, email, brief; configurable: phone, file upload, material, quantity, timeline, budget |
| File upload behaviour | `quoteFormUpload: 'optional' \| 'required' \| 'off'` | drop-zone with accepted types (.pdf .dxf .dwg .svg .ai .jpg .png) |
| About / workshop | `aboutLong` *(existing)* + `workshopPhotos[]` *(new, 2–4 images)* | |
| Machine list | `equipment[]` *(new, optional)* | "3-axis CNC 1500×3000mm", "100W CO2 laser" — credibility list |
| FAQ | `faq[]` *(existing)* | quote-relevant questions surface first |
| Reviews | Reviews module *(existing)* | B2B reviews show company name in subtitle |
| Footer accreditations | `accreditations[]` | rendered as logo row in footer |

## Quote form (Deliverable A — the heart)

The single most important section on the page. Treatment:

- **Full-width band** with brand-primary background + cream form card floating on top
- Left column: pitch ("Get a quote within 1 working day"), 3 trust bullets (free delivery on £500+, ISO 9001, 27 years' experience), "Or call us" with phone
- Right column: the form
- Form fields (default order): Name · Company (optional) · Email · Phone · Project brief (textarea, 200-char hint) · File upload (drop-zone, optional) · Material preference (select) · Quantity (number) · Timeline (radio: ASAP / 2 weeks / 1 month / Flexible) · Budget band (radio: <£500 / £500–2k / £2k–10k / £10k+) · Submit
- **File upload zone:** dashed border, "Drop drawings or click to upload — PDF / DXF / DWG / SVG / AI / JPG / PNG · max 25MB"
- Multiple files allowed; show filename chips below the zone after selection
- **Submit handler:** sends to CRM as "Quote enquiry" priority lead + sends email to owner with all fields + attachments + (if `quoteFormUpload === 'required'`) blocks submit until ≥ 1 file attached

**Mobile layout:** pitch stacks above form, fields full-width.

## Process steps (Deliverable B)

Visual rules:

- **Numbered cards** (1·2·3·4) in a row — large numerals, brand-primary
- Each card: number · title · 2-line body · timing badge (e.g. "Same day", "2–5 days", "1–3 weeks")
- Connecting line between cards (subtle, brand-primary dashed) so the sequence reads
- Mobile: vertical stack with connector becoming a left rail
- Last card always lands on **"Delivery"** with a tracking-aware copy line if relevant

## Materials & finishes (Deliverable C)

The tactile credibility section. Two valid renders:

**Swatch grid (default):** 4-column grid, each tile is a photographed material swatch (~300×300) with overlay caption (material name + thickness + finish). Hover reveals price band ("£" / "££" / "£££").

**Detailed list (for venues with < 8 materials):** 2-column with photo left + spec sheet right (thickness, finish, price band, lead time).

## Past projects (Deliverable D)

Distinct from `gallery` — these are **captioned case studies**, not a photo wall:

- 3-column grid, each card: photo + project title + brief (1 line) + material + lead time + optional "View case study →" link
- Mix of project scales (small commission ↔ large architectural)
- Best-effort fixture: ≥ 6 projects

## Dark-section rhythm

Three intentional dark moments:
1. Hero (image-led, overlay)
2. Quote form band (brand-primary — the moment of conversion)
3. Footer (near-black)

Services, process, materials, projects, about, FAQ, reviews all run on cream/warm-white so the workshop photography pops.
