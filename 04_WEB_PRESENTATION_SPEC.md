# Web-Native Pitch Deck — 10 Minutes / Recommended Five Slides

The competition PDF specifies a 10-minute pitch and the content to cover; it does **not** require exactly five slides. This pack recommends five widescreen slides plus an integrated web simulation, so the judges get a concise story and a concrete demo.

## Presentation product

Build a browser-first presentation application, not merely a static PDF embedded in a page. Prefer React/Next.js if there is no existing project, using TypeScript. It must run locally, with no account/API key required.

### App behaviour

- Route `/` is a 5-slide deck in 16:9 canvas/viewport presentation mode.
- Arrow keys, Space, PageUp/PageDown, on-screen Previous/Next, slide overview and progress indicator.
- Presenter notes accessible via a separate panel or keyboard toggle, hidden from the audience view.
- Slide 4 embeds or launches the interactive simulation at `/demo`.
- A “Pitch Mode” control can hide browser-like chrome and enlarge content.
- Add print stylesheet for clean PDF export. If straightforward, create an editable `.pptx` export with PptxGenJS from the same slide content. Do not compromise the reliable web deck just to add export.
- Include image/source credits in small footnotes where visuals or factual claims need them.
- Keep all factual claims sourced and clearly label projected values/illustrative quantities.

## Narrative and timing

### Slide 1 — The broken water trail (0:00–1:30)

**Headline:** “Can we reconcile a tanker’s water journey—from borewell to delivery?”

Illustrate a simple chain: extraction → tanker loading → delivery. Explain that separate readings/records can be hard to reconcile. This is the problem hypothesis; avoid stating a measured loss rate unless a source supports it.

Speaker: pitch lead.

### Slide 2 — Why a new layer? (1:30–3:00)

Show a restrained competitor comparison: TankerTap (booking/tracking), Kaveri on Wheels/Sanchari Kaveri (public tanker management/tracking), STARS (delivery record and billing), WEGoT Aqua (water-source and consumption monitoring), groundwater telemetry. Acknowledge they already solve important pieces.

**Gap hypothesis:** JalTrace links extraction, loading and delivery events with a shared identity chain and human-reviewable discrepancy evidence. Mark this as “to validate”, unless research confirms it.

Speaker: research/product lead.

### Slide 3 — JalTrace architecture (3:00–5:00)

Diagram:
`Borewell flow meter + pump state → local gateway/connectivity → event registry → reconciliation rules → dashboard/exception alert`

`Loading meter + tanker ID → event link → delivery record + receiver acknowledgement/GPS → reconciliation`

Explain connectivity, calibration, privacy, data loss, meter error and what happens when an event is missing. Show which components are planned vs simulated.

Speaker: technical lead.

### Slide 4 — Live simulation (5:00–7:30)

Run the deterministic simulation: normal matched delivery → quantity mismatch → missing load event or stale meter → show exception reason and audit chain. Example volumes are explicitly synthetic. Demonstrate one calculation and its denominator.

Speaker: software/simulation lead. Keep a backup screen recording and screenshots.

### Slide 5 — Feasibility, economics, impact, next steps (7:30–10:00)

Present:
- prototype status (software simulated; no physical sensors connected unless actually tested);
- minimum field pilot plan;
- cost structure with sourced component estimates or “quote required”—no made-up total installed cost;
- success metrics: event linkage rate, reconciliation exception precision, detection delay, measured-vs-reference volume difference, data availability, field cost per monitored point;
- limitations and next milestones;
- how it could generalise to other cities with local compliance/source registries.

Speaker: pitch lead.

## Style system

- Feel: premium, utilitarian civic-tech; not generic AI-hackathon neon.
- Palette: near-black/navy, clean white, restrained teal/aqua, amber for warning, red for critical only.
- One main message per slide; very few bullets; large legible diagrams/charts.
- Avoid stock photos filling slides. Use original SVG architecture, dashboard screenshots and the actual built simulation.
- Charts should use consistent units, axes and timestamps. No unlabelled percentages or unsupported impact numbers.
- Include slide numbers and subtle JalTrace / InnovateX tags.
- Use official Techfest/IIT Bombay branding only if permissible; don't counterfeit an official logo. Title the deck “InnovateX — Theme 1: Underground Water Management”.

## Pitch assets to deliver

- `src/app/page.tsx` or equivalent web-deck entry point.
- `src/app/demo/page.tsx` or equivalent interactive simulator.
- `research/market-gap-report.md` and `research/source-notes.md`.
- `pitch/speaker-notes.md` with timed 10-minute script, slide transitions, and Q&A.
- `pitch/figures/` for original architecture and system diagrams.
- `exports/JalTrace_InnovateX.pptx` if it can be exported and opened successfully; `exports/JalTrace_Presentation.pdf` or print instructions.
- `README.md` with exact run/test/export commands.
