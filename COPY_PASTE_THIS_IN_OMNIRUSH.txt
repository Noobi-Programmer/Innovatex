# COPY EVERYTHING BELOW INTO OMNIRUSH

You are the lead builder and research orchestrator for our four-person Techfest IIT Bombay InnovateX team. Your main model is GPT 6 Astra at Max effort. Work from the folder containing this file. Read **all Markdown files in this folder**, and read `source/InnovateX_Techfest_2026-27_Brief.pdf` before finalising the deck. Also inspect `source/OmniRush_Model_Settings_Screenshot.png` for our current OmniRush configuration.

We want a **browser-based five-slide, 10-minute presentation app with an integrated, working JalTrace virtual simulation**. We also want an editable `.pptx` export if it can be generated reliably. Today is 22 October 2026 in our planning context and one team member has an end-term exam tomorrow. Keep setup low-friction, save all progress, minimize interruptions, and do not require us to supervise every action. We have four members, strong web/dashboard skills, no confirmed hardware, and a ₹0 initial budget. Borrowing hardware may be possible later.

## Mission

Produce a research-backed, visually polished, technically honest InnovateX Round 1 entry for **Theme 1: Underground Water Management**, under the working name **JalTrace — Source-to-Tanker Groundwater Traceability**.

The proposed workflow links three kinds of events:
1. Borewell extraction event (cumulative flow-meter delta and pump state).
2. Tanker-loading event (measured/simulated quantity, source-well ID and tanker ID).
3. Delivery event (tanker/order/receiver ID, delivery time and measured or acknowledged quantity; phone GPS only if available/consented).

JalTrace's hypothesis is that connecting these event records can surface quantity discrepancies, missing evidence, stale telemetry and broken source-to-delivery links that separate records may fail to reveal. A discrepancy is a flag for investigation, **not proof of theft, fraud, contamination or illegal extraction**.

## Phase 1 — Inspect and research before locking claims

1. Read all local project Markdown and the supplied competition PDF.
2. Inspect the workspace and current installed tools. Do not overwrite existing work blindly.
3. Research current products with citations: TankerTap, Kaveri on Wheels, Sanchari Kaveri, STARS, WEGoT Aqua, and relevant groundwater telemetry/flow-meter products. Use the provided source register as a start, not as unquestioned truth.
4. Verify exactly what current products do. In particular, compare feature-by-feature: public/driver GPS tracking, tanker booking, source registration, extraction measurement, loading measurement, delivery record/acknowledgement, cross-event reconciliation, source evidence, alerting and auditability.
5. Create `research/market-gap-report.md` with a clear verdict: `PROMISING GAP`, `CROWDED / WEAK`, or `INCONCLUSIVE`. The gap is not validated yet. State counter-evidence against JalTrace, source dates and confidence. Do not claim “first in India”, “zero maintenance”, “20 years”, or an invented deployment cost.
6. If the generic end-to-end reconciliation idea is already materially covered by existing competitors, do not conceal that. Identify a narrower evidence-backed wedge within groundwater management and write the decision/rationale. Keep the requested deck JalTrace-branded unless the evidence strongly indicates a rename/reframe is needed; do not silently change the concept.
7. Browse `https://mcpmarket.com/` and `https://mcp.so/` only to discover potentially useful MCP servers/skills; use official repositories/docs to verify them.

## Phase 2 — MCP and skills (minimum, verified, safe)

Before installing anything, inspect OmniRush **Settings → MCP** and its built-in Library. Its current desktop README states that the desktop surface supports a curated set of local MCP servers and says remote/account-linked MCP servers are not supported. Confirm what is actually available in this installed version.

- Prefer existing filesystem/project access and git support.
- Enable/use Playwright MCP for **local app browser testing** only if it is listed/supported by this OmniRush desktop version. Official reference: `https://github.com/microsoft/playwright-mcp`. Do not assume generic JSON config is accepted by OmniRush.
- Do not install Canva's remote MCP: Canva's official MCP is remote/OAuth and may not be compatible with this desktop surface. Build the slides as a web-native deck. Optionally use PptxGenJS to export `.pptx` locally.
- Do not bulk-install MCP servers or skills. Do not install duplicate browser MCPs, cloud browser accounts, paid services, databases or credential-dependent integrations unless research shows a necessity and you get approval.
- Do not run global installs, elevated commands, destructive changes, or touch credentials without approval. Prefer repo-local dependencies and the existing environment. If MCP isn't available, continue using local build/test scripts and state the limitation.
- Capture in `research/tooling-setup.md` what was available, what was enabled/installed, why, and any blocker. Do not report an MCP server as installed unless verified.

## Phase 3 — Build the first useful vertical slice

First inspect files and decide whether a project already exists. Reuse existing structure if sensible. If no project exists, use TypeScript + React/Next.js. Prefer the package manager already present; otherwise prefer pnpm or Bun if available. Do not create an unnecessary backend. The MVP must run locally without secrets, paid API keys, login, or a cloud database.

Build:
- `/` — five-slide presentation, 16:9-oriented, arrow/space navigation, on-screen controls, slide progress, presenter notes toggle, and a clear path into the simulation.
- `/demo` — functional deterministic simulation with `SIMULATION MODE — DEMO DATA` always visible.
- `research/market-gap-report.md`, `research/source-notes.md`, `research/tooling-setup.md`.
- `pitch/speaker-notes.md` — complete timed ten-minute pitch plus transitions, demo narration and Q&A.
- `README.md` — exact dev/test/build/export commands and limitations.
- optional `exports/JalTrace_InnovateX.pptx` and a PDF/print-export path if reliable.

## Phase 4 — Build the simulation with explicit semantics

Implement well, tanker, loading, delivery, and reconciliation event types as specified in `03_SIMULATION_SPEC.md`. Use typed deterministic fixtures and a pure reconciliation function. Create working scenarios:
1. Normal matched delivery.
2. Loading-vs-delivery quantity discrepancy.
3. Missing loading/source record.
4. Duplicate or out-of-order event.
5. Illustrative threshold breach.
6. Stale/offline sensor.

Every scenario must explain why it received its status. Calculate `difference = loadingLitres - acknowledgedLitres`; calculate percentage using a stated denominator (default absolute difference / loading litres × 100). Do not treat cumulative meter readings as per-event volume. Do not compare unrelated total extraction with one delivery unless the linkage is defined. If delivery is an operator/receiver entry, label it `acknowledged`, not `measured`. Use configurable **illustrative demo thresholds**, not claims of scientific validation or legal limits.

Demo UI should show:
- event chain: well → loading → tanker → recipient;
- a fictional schematic map or map with markers explicitly marked as simulated;
- extraction/load/delivery quantities, timestamps and event IDs;
- discrepancy calculation, status reason and audit timeline;
- controls: Play scenario, pause/step, reset and scenario selector.

Don't add actual GPS streaming; do not place fake markers on a map without a `SIMULATED` indicator. If real basemap/network setup is unreliable, use an original SVG schematic and avoid external map credentials.

## Phase 5 — Web presentation and export

Make the web app presentation the primary artifact. The PDF requires a 10-minute pitch and asks for a clear problem, existing-solution context, proposed technology, impact/scalability, feasibility, cost, operational challenges and benefits; it does **not** prescribe exactly five slides. Use the five-slide timing in `04_WEB_PRESENTATION_SPEC.md`:
1. The broken water trail / problem (0:00–1:30).
2. Existing alternatives and a defensible gap (1:30–3:00).
3. JalTrace architecture and IoT path (3:00–5:00).
4. Live virtual simulation (5:00–7:30).
5. Feasibility, cost, impact, pilot and scale (7:30–10:00).

Visual style: clean premium civic-tech, dark navy/graphite, aqua/teal, white, restrained amber/red states, strong typography and original diagrams. Avoid generic stock-photo slides. Use legible labels and consistent litres/L/min units. No fabricated impact numbers. Cite claims in slide footnotes/speaker notes.

Write the full timed script, but ensure it matches the actual software and current research. If research leaves the gap inconclusive, say so accurately and explain what a pilot would validate.

## Phase 6 — Verification and final output

- Run available lint, typecheck, test and production build commands. Fix failures you can fix within scope.
- Use Playwright MCP or local Playwright if already supported/available to verify slides and all simulation states. If not available, use ordinary browser/manual checks and say exactly what couldn't be tested.
- Capture screenshots of the title, architecture, normal state, mismatch state, missing-data state and final slide if tooling allows.
- Validate that reset/step/keyboard controls work, layouts do not overflow at 1366×768, no fake real-world data is shown, all claims have sources, and no secret is required.
- If PPTX export is implemented, verify it exists and opens or at least validate generation output. If it cannot be verified, don't claim it works.
- Do not stop at a plan; build the working app and artifacts. If a hard blocker exists, finish all independent work and document a precise workaround.
- Keep dependencies lean; do not add fancy features before the end-to-end flow works.

## Required final response from you

1. The market-gap verdict and what evidence supports it.
2. A concise project structure/tree.
3. Exact commands to run locally and export presentation.
4. What MCP/skills were actually enabled or unavailable.
5. The four-person task split and next steps after the exam.
6. Tests actually run and results; list unrun tests honestly.
7. Actual paths to the web presentation, simulation, `.pptx` (if created), research report and screenshots.
8. Known risks, assumptions and what hardware would be needed for Round 2.

Prioritise a complete, honest, demoable project over a grand but unverified promise. Proceed without asking questions unless an action needs explicit user approval or a genuine blocker makes progress impossible.
