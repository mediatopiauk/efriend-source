# Lens 8 — Quote / Custom Build · Gap-analysis rules

Quote / Custom Build is **enquiry-led** — the whole page exists to make the quote form feel safe to fill in. Gap analysis is harshest on credibility signals and the quote form itself.

## Required (lens refuses to render without)
- `brand.name`, `brand.primary`
- `hero.image`
- `services[]` ≥ 2
- `processSteps[]` ≥ 3
- `quoteFormFields[]` defined (defaults to: name, email, brief)
- `phone` (configurable quote work is phone-validated)

## Minimum viable (renders, looks intentional)
- 3 services with thumbnails
- 4 process steps with timings
- 4 materials with swatches
- 3 past projects
- Quote form with file upload enabled
- 3 reviews
- 4 FAQ entries

## Comfortable (recommended)

| Check | Rule | Message |
|-------|------|---------|
| Services | ≥ 4 with capability bullets | "Each service needs a capability list (3 bullets) so customers self-qualify before enquiring." |
| Process timings | every step has a `timing` field | "Process step N has no timing. Uncertainty kills enquiries — add lead times." |
| Materials depth | ≥ 8 materials with photos | "Materials grid wants 8+ swatches. You have N — looks like a hobby." |
| Past projects | ≥ 6 with captions | "Past projects shows you can do the job. 6+ with material + lead-time captions reads professional." |
| Workshop photos | ≥ 2 workshop shots in About | "Quote enquirers want to see real machines + a real workshop. Add 2 photos to About." |
| Equipment list | `equipment[]` populated | "Machine list answers 'can you actually make this?' — list your kit." |
| File upload | `quoteFormUpload === 'optional'` or `'required'` | "Drawings unlock 10× faster quotes. Enable the file upload field." |
| Accreditations | ≥ 1 in `accreditations[]` | "ISO / FSC / CHAS / RIBA chips lift perceived tier. Add any you hold." |
| FAQ depth | ≥ 6 quote-relevant Qs | "FAQ should answer: drawings, lead times, delivery, revisions, payment, IP. You have N — fill the gaps." |
| Reviews with company | ≥ 1 B2B review showing company name | "B2B reviews convert B2B enquiries. Get one from a recent commercial client." |

## Loaded (the lens at its best)

| Check | Rule | Message |
|-------|------|---------|
| Project diversity | past projects span ≥ 3 service types | "Mix of project scales/types reads as 'can do anything'. You're showing only 1 type." |
| Material price bands | every material has a `priceBand` | "Price bands ('£' / '££' / '£££') help customers self-budget before enquiring." |
| Hero accreditation strip | accreditations chip row in hero | "Show 2–3 accreditations in hero strip — sets confidence instantly." |
| Quote SLA | "1 working day" line in form pitch | "Quote SLAs convert. Promise a turnaround." |
| Lead-time visibility | every past project has `leadTime` | "Lead times set expectations. Show them on every project card." |
| Workshop tour video | `workshopVideo` set | "30-second workshop tour video on the about section converts 2× over photos." |

## Conditional gates (lens self-heals)

| Condition | Effect |
|-----------|--------|
| `quoteFormUpload === 'off'` | File upload drop-zone hidden. Form notes "Reply with drawings via email." |
| < 4 materials | Materials section switches from grid to detailed-list layout (2-col photo + spec). |
| < 3 past projects | Projects section hides. About section gets the photo budget. |
| No `equipment[]` | Equipment list panel in About hides; About becomes single-column story. |
| No accreditations | Utility bar accreditation chips hide; footer logo row hides. |
| No reviews | Reviews section hides; FAQ moves up; trust shifts to accreditations + project captions. |
| `services.length` < 2 | Services grid hides; hero CTA becomes "Tell us what you need" (linking to form). |

## Deep-link targets

Every ✗ in the gap-analysis panel deep-links to its source wizard step:

| Gap | Deep-link target |
|-----|------------------|
| Services + capabilities | Wizard Content step → Services |
| Process steps | Wizard Content step → Process builder |
| Materials | Wizard Content step → Materials & finishes |
| Past projects | Wizard Content step → Past projects |
| Quote form fields | Wizard Settings step → Quote form builder |
| File upload toggle | Wizard Settings step → Quote form · Uploads |
| Equipment / workshop | Wizard Content step → About · Workshop |
| Accreditations | Wizard Settings step → Accreditations |
| FAQ | Wizard Content step → FAQ |
