# JalTrace Impact and Validation Plan

**Status:** proposed validation plan; no field impact has been measured.  
**Central rule:** a deterministic software demo validates rule behavior, not water savings, legal compliance, sensor accuracy or market demand.

## Intended impact pathway

1. A source, loading event and delivery acknowledgement are recorded with IDs, timestamps and quantities.
2. JalTrace links the records and shows the calculation, freshness and missing-data state.
3. An operator spends less time searching across disconnected records.
4. The operator investigates an exception using the supporting evidence.
5. Only after a real pilot could the team test whether review quality, response time or operational loss changes.

The current project demonstrates steps 1–2 with synthetic fixtures. Steps 3–5 are hypotheses.

## What the current prototype proves

- The event model can represent source, load and delivery records.
- Cumulative telemetry can be converted into a non-negative delta.
- The engine can distinguish a match, mismatch, missing link, stale reading, duplicate/out-of-order reading, impossible reading, threshold review and recovery.
- The UI exposes the denominator, difference, issue reasons and audit trail.
- The result is deterministic and repeatable without external services.

## What it does not prove

- It does not prove that the market gap exists or that a buyer will pay.
- It does not prove that a source is legal, permitted or potable.
- It does not prove that any water was lost, stolen or saved.
- It does not prove meter accuracy, calibration stability, connectivity reliability or field installation safety.
- It does not prove city-wide scalability or integration with BWSSB, private suppliers or regulators.

## Validation stages

### Stage 1 — problem and workflow discovery

**Target:** five conversations before the final novelty claim is locked.

Potential participants:

- apartment or campus facility manager;
- private tanker supplier or dispatcher;
- borewell operator or maintenance contractor;
- water-operations software user;
- utility, groundwater or compliance practitioner.

Ask about:

- how source, load and delivery records are created today;
- who investigates mismatches and how long it takes;
- which records are trusted and which are disputed;
- whether permits/NOCs are available and who may share them;
- whether stale or missing telemetry is common;
- what an acceptable pilot would cost and who would own it.

**Success condition:** at least three participants describe a recurring reconciliation task and identify the person who owns the decision.  
**Failure condition:** the task is rare, already solved in the target workflow, or no one will share the required evidence. Narrow or pivot.

### Stage 2 — product and competitor validation

- Request one product clarification or demonstration from a close alternative, especially WEGoT or STARS.
- Ask whether source-to-delivery linkage, permit metadata and exception review are already available.
- Preserve a “null result” if the provider does not respond.

**Success condition:** a specific workflow remains unresolved for a named operator after the comparison.  
**Failure condition:** the workflow is already integrated and accessible; remove novelty language and pivot to a narrower user/problem.

### Stage 3 — bench measurement validation

Use one safe, accessible test setup with a reference measurement.

Minimum checks:

- compare the candidate meter with the reference over several flow rates;
- test zero, start/stop, stable flow and interrupted connectivity;
- record timestamps, cumulative readings, pump state and sequence numbers;
- inject duplicate, out-of-order, stale and impossible readings;
- document installation orientation, pipe conditions and calibration method.

**Success condition:** the team can state the observed error and operating envelope for the selected setup.  
**Failure condition:** the team cannot calibrate or explain the measurement chain; do not present field accuracy.

### Stage 4 — limited operator pilot

With permission, observe a small number of real flows without making regulatory determinations.

Measure:

- **Linkage rate:** percentage of deliveries with source/load/delivery IDs linked.
- **Freshness:** time from event occurrence to usable record.
- **Review time:** time to explain or classify an exception.
- **False-alert rate:** alerts that the operator resolves as expected variation or data error.
- **Reference error:** difference between the selected meter and reference measurement.
- **Missing-event rate:** events that cannot be linked or are absent.
- **Operator adoption:** whether the workflow is actually used after training.

Do not use “litres saved” unless there is a controlled baseline and a documented intervention.

## Data and safety boundaries

- Label every synthetic fixture and screenshot `SIMULATED`.
- Do not collect personal data unless necessary and consented.
- Do not expose private permit documents in a public demo.
- Treat location and source information as sensitive operational data.
- Keep a human reviewer in the loop for every exception.
- Do not use the system to accuse a supplier, operator or source based on one mismatch.

## Impact statement allowed today

> JalTrace may help an operator make source-to-delivery evidence easier to review. The current prototype has demonstrated deterministic software logic only. Any claim about water saved, illegal extraction prevented, compliance improved or operator time reduced requires field validation.

## Evidence log to maintain

| Item | Owner | Status | Required before a strong impact claim |
|---|---|---|---|
| Five discovery interviews | Research/product | Pending | Notes, consent and synthesized findings |
| Product clarification/demo | Research/product | Pending | Written capability comparison |
| Permit/NOC workflow confirmation | Research/product | Pending | Authoritative source or qualified advisor |
| Current meter quote | Integration | Pending | Dated quote and datasheet |
| Bench calibration comparison | Simulation/integration | Pending | Reference readings and error summary |
| Operator pilot | Whole team | Future | Site permission, protocol and measured outcomes |
