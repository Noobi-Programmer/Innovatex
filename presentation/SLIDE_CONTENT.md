# JalTrace — Five-Slide Presentation Content

**Competition:** InnovateX, Theme 1 — Underground Water Management  
**Presentation limit:** 10 minutes  
**Current evidence date:** 2026-10-21 for the research register; implementation checked 2026-10-22  
**Positioning:** a narrow, honest prototype and gap hypothesis — not a proven market gap or production system.

## Slide 1 — The question: can we reconcile a tanker’s water journey?

**On-slide content**

- JalTrace
- “Can we reconcile a tanker’s water journey?”
- Source extraction → tanker loading → delivery acknowledgement
- One line: “A Bengaluru-first research prototype.”
- CTA: **Run the simulation**
- Footer: `PROBLEM HYPOTHESIS — ALL DEMO VALUES ARE SYNTHETIC`

**Presenter message**

Water events are often split across meters, operator records and delivery acknowledgements. JalTrace tests whether linking those records can make a difficult manual review explainable. We are not claiming a measured city-wide loss rate.

**Evidence / guardrail**

- The challenge framing comes from the supplied brief, S001.
- The problem frequency and severity still require customer discovery.

**Timing:** 0:00–1:30

## Slide 2 — Existing pieces exist; the chain is unproven

**On-slide content**

Four cards:

1. **Tanker platforms** — booking, providers, live tracking and alerts. Examples: Kaveri on Wheels, TankerTap, GoTanker.
2. **Delivery records** — photo, time, vehicle, quantity, offline capture and bills. Example: STARS.
3. **Water intelligence** — municipal, tanker and borewell sources, meters and dashboards. Example: WEGoT Aqua.
4. **JalTrace tests** — permit/NOC metadata plus linked source/load/delivery evidence and explainable exceptions.

**Verdict chip:** `INCONCLUSIVE / VALIDATE`

**Presenter message**

The broad tanker-app and dashboard categories are already occupied. Our research did not prove that the event-linked chain is absent; it only showed that public product material does not explicitly demonstrate the exact workflow. The honest claim is a gap hypothesis.

**Evidence / guardrail**

- Competitor claims and limitations: S004–S012, `research/competitor_matrix.md`.
- Never say “first,” “only,” or “no one does this.”

**Timing:** 1:30–3:00

## Slide 3 — Measure the event; explain the exception

**On-slide content**

Left: planned field inputs:

- Source: flow meter + pump state
- Gateway: buffer + sequence number
- Tanker / delivery: order ID + acknowledgement

Right: JalTrace evidence layer:

- Event registry — identity and provenance
- Rule engine — delta, tolerance and stale-data checks
- Review queue — matched, missing, warning and critical

Footer: `NO AUTOMATIC “ILLEGAL” CONCLUSION`

**Presenter message**

The prototype uses a deterministic event model. Cumulative readings are converted into deltas; loading and delivery are linked by IDs; tolerances are explicit; stale, duplicate, out-of-order and impossible readings are surfaced. The proposed gateway may buffer readings until connectivity returns. A future field system would need calibrated meters, durable installation, security and privacy controls.

**Evidence / guardrail**

- Current app is local, deterministic and simulated.
- Permit status is metadata only. A QR code, GPS coordinate or identifier does not prove legal provenance.

**Timing:** 3:00–5:00

## Slide 4 — Watch the evidence chain break, then recover

**On-slide content**

- `SIMULATION MODE — DEMO DATA`
- Loading: **6,000 L**
- Delivery acknowledgement: **5,300 L**
- Difference: **700 L / 11.67%**
- Chain: source → load → delivery
- Status: `CRITICAL / HUMAN REVIEW`
- Scenario controls: quantity mismatch, missing load, recovery

**Presenter message**

Every value is synthetic. First show the matched case. Then select the quantity mismatch: 6,000 litres loaded and 5,300 litres acknowledged. The engine calculates 700 litres divided by the 6,000-litre loading denominator, or 11.67%. That is an exception to investigate, not evidence of theft. Remove the loading record to show an unverified chain. Finish on recovery to show that fresh telemetry can clear the current stale state while preserving the prior anomaly in the audit trail.

**Demo checklist**

1. Open `/demo` or use the pitch’s Slide 4 controls.
2. Show normal match.
3. Show quantity mismatch and formula.
4. Show missing-load case.
5. Show recovery.
6. Point to the `SIMULATED` label and the guardrail copy.

**Timing:** 5:00–7:30

## Slide 5 — ₹0 software demo; not ₹0 deployment

**On-slide content**

Four cards:

- **NOW:** local web prototype; no API key or cloud database.
- **NEXT:** five operator conversations; test frequency, NOC evidence and willingness to share data.
- **FIELD:** compatible flow meter, ESP32-class gateway, buffering, calibration and maintenance.
- **IMPACT:** measure linkage rate, detection delay, false alerts and reference-meter error — not claimed water saved.

Verdict: `GO / NARROW / VALIDATE`

Closing line: “JalTrace is ready to be tested — not yet ready to be called unique.”

**Presenter message**

The software milestone is feasible with the team’s current budget. A physical pilot is a separate cost and validation problem. The next gate is five user conversations, one product clarification, an authoritative permit-workflow check and at least one current hardware quote. We will measure evidence quality before making any impact claim.

**Timing:** 7:30–10:00

## Speaker handoff

| Segment | Owner | Handoff sentence |
|---|---|---|
| Problem and competition | Member 3 | “Now that we have scoped the question, Member 2 will show how the evidence is represented.” |
| Architecture | Member 2 | “The rule engine is deterministic, so Member 1 will show the same rules running in the interface.” |
| Simulation | Member 1 | “The demo shows what the software can flag; Member 4 will close with what still needs validation.” |
| Feasibility and close | Member 4 | “We are asking for a chance to test the workflow, not permission to overclaim the market.” |

## If the live demo fails

Use the static Slide 4 card and say:

> “The live control is unavailable in this environment, so we are showing the same deterministic fixture: 6,000 litres loaded, 5,300 litres acknowledged, 700 litres difference, 11.67% using loading as the denominator. The unit tests cover this rule and the missing-data and recovery boundaries.”

Do not imply that a screenshot is a live sensor or field deployment.
