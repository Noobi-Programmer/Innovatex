# JalTrace — Groundwater Accountability & Water Distribution

> **InnovateX project · Local prototype, research-gated and not production-ready**

JalTrace is a deterministic software prototype exploring how to reconcile groundwater extraction, tanker loading, transportation, and final delivery records in one traceable workflow. The physical IoT layer is planned, not installed.

**Project repository:** https://github.com/Noobi-Programmer/Innovatex

## The problem we are investigating

Groundwater extraction, tanker loading, and delivery records can be maintained in separate systems or recorded manually. When the recorded quantities or events do not match, it can be difficult for an operator to identify where the discrepancy occurred and which records need review.

JalTrace is investigating whether connecting these events can make water movement easier to track and discrepancies easier to investigate. This is a problem hypothesis that we are validating through competitor research and customer discovery—not a claim that all existing systems have this gap.

## Proposed approach

The intended workflow connects records from source to destination:

1. **Extraction:** record a borewell/source identifier, timestamp, and measured or simulated volume.
2. **Tanker loading:** associate a tanker with a loading event and record the quantity.
3. **Transit:** associate relevant status and location events with the tanker, where available.
4. **Delivery:** record destination, acknowledgement, timestamp, and reported delivered quantity.
5. **Reconciliation:** compare related records and flag missing events, stale telemetry, or quantity differences for human review.

The prototype may initially use deterministic **simulated IoT telemetry** so the workflow can be tested without purchasing hardware. Simulated data will be labelled clearly and will not be presented as real sensor measurements.

## What JalTrace is—and is not

**The project aims to:**

- Explore source-to-delivery traceability and water-quantity reconciliation.
- Make discrepancies visible through a clear operator dashboard.
- Test edge cases such as missing records, delayed readings, and mismatched quantities.
- Assess a realistic path to affordable sensor integration.

**The project will not assume that:**

- A QR code, GPS coordinate, or registry entry alone proves a source is authorised.
- An anomaly proves illegal extraction, fraud, or misconduct.
- A flow sensor establishes that water is potable or safe to drink.
- JalTrace is novel until the existing-product research supports a defensible differentiation.

## Current status

JalTrace has passed the research gate for a **narrow competition prototype**. The market-gap verdict remains **INCONCLUSIVE**: the public scan found strong adjacent products, but did not prove whether the exact permit-aware source → load → delivery evidence chain is already solved.

| Workstream | Status |
|---|---|
| Competition requirements review | Complete; see `research/competition_requirements.md` |
| Workspace and runtime inspection | Complete; see `setup/ENVIRONMENT_REPORT.md` |
| Competitor and market validation | Public scan complete; gap remains inconclusive |
| Customer problem validation | Pending five operator/product conversations |
| Go/no-go decision | GO for narrow prototype; NO-GO for unsupported novelty/production claims |
| Web application | Implemented: pitch, demo, research and architecture pages |
| IoT telemetry simulation | Implemented as deterministic synthetic fixtures |
| Physical sensor integration | Not implemented; quote and safe test site required |
| Automated domain tests | Implemented: 12 Node built-in tests |
| Browser visual validation | Blocked in current environment; no browser binary available |

## Research and validation questions

Before committing to the product scope, the team is investigating:

- Do existing systems already connect extraction readings, tanker loading, and delivery acknowledgement at an individual-event level?
- How much of the proposed workflow is already covered by tanker-booking services, smart-water platforms, or groundwater monitoring products?
- Who experiences the reconciliation problem most often, and what do they currently do to resolve it?
- What evidence would be needed to distinguish a verified source from a location or identifier alone?
- Which hardware, connectivity, calibration, maintenance, and operating costs are supported by sources versus estimates?

The project must be narrowed, repositioned or pivoted if direct operator/product evidence does not establish a useful unresolved workflow.

## Current technical direction

The first demonstration is a zero-dependency local web application using Node.js, plain HTML/CSS, browser ESM modules and deterministic synthetic fixtures. It requires no API key, cloud database or paid service.

The current application includes:

- A five-slide web pitch at `/`.
- An evidence-chain simulator at `/demo`.
- A source register and competitor page at `/research`.
- An architecture and limitations page at `/about`.
- An event/data model that links extraction, loading, and delivery events.
- A reconciliation layer for configurable quantity tolerances and missing-event checks.
- Nine deterministic scenarios and Node built-in tests.

A future field architecture may add compatible flow meters, pump-state sensing, a gateway with buffering, connectivity, calibration, security and operator integrations. Those components are planned and quote-required.

## Roadmap

1. Run the local app and manually validate the visible deck and all nine scenarios in a real browser.
2. Conduct five operator/product conversations and record null results.
3. Request one current hardware quote and confirm the permit/NOC workflow with an authoritative source or qualified advisor.
4. Rehearse the ten-minute pitch with the static fallback ready.
5. Only after the evidence gate, consider a borrowed-hardware bench test with reference calibration.

## Team and constraints

JalTrace is being explored by a four-member first-year computer science student team for InnovateX. The project is designed around a near-zero initial budget, so the first milestone prioritises research, software simulation, and a reproducible demo over unverified hardware claims.

## Useful files and commands

- `IMPLEMENTATION_STATUS.md` — current acceptance state, checks and blockers.
- `research/GO_NO_GO.md` — research decision and pivot trigger.
- `research/source_register.md` — cited claims, dates, confidence and limitations.
- `presentation/SLIDE_CONTENT.md` — exact five-slide content and fallback narration.
- `presentation/PITCH_SCRIPT.md` — timed script and judge Q&A.
- `docs/COST_MODEL.md` — ₹0 software distinction and quote-required pilot costs.
- `docs/IMPACT_AND_VALIDATION.md` — what the demo proves and how to validate impact.
- `docs/TEAM_PLAN.md` — four-person ownership, two-day plan and fallbacks.

Run the project locally:

```bash
npm test
npm run check
npm run build
npm start
```

Then open `http://localhost:4173/`. The server also exposes `/demo`, `/research` and `/about`.

## Contributing and project status

This repository is a local competition workspace, not a released product. The deterministic software behavior is tested, but market validation, browser visual validation in the current environment, hardware integration and production deployment remain open.

## Disclaimer

JalTrace is a student project and is not an official groundwater regulator, water-quality certification system, or proof of legal compliance. Any future alerts are intended to support review by responsible operators, not to make automatic accusations or regulatory determinations.
