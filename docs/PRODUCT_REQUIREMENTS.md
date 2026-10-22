# JalTrace Product Requirements

**Decision basis:** `research/GO_NO_GO.md` and `research/market_gap_report.md`.  
**Product name for the prototype:** **JalTrace — permit-aware evidence ledger for groundwater-to-delivery events**.

## 1. Product promise

JalTrace helps a facility manager or bulk-water supplier answer:

> “For this simulated delivery, which source, loading and receiving evidence is present, how comparable are the quantities, and what requires human review?”

It is an **evidence-linking and reconciliation prototype**, not a tanker marketplace, regulator, water-quality certification system or fraud detector.

## 2. Target users

### Primary user — facility / apartment water manager

Needs to reconcile incoming tanker deliveries with source and load records, investigate quantity discrepancies and keep an auditable explanation for suppliers or internal review.

### Secondary user — private bulk-water supplier / operator

Needs to associate a tanker/order with a source and loading record and provide a defensible delivery packet without exposing more location data than necessary.

### Future user — auditor / utility / regulator

Could review evidence completeness and configured permit/NOC metadata. This is future validation work, not a current integration.

## 3. Core problem

Booking, GPS tracking, gate records, billing, building metering and borewell telemetry are available in separate or overlapping products. The research did not prove that the full permit-aware chain is missing, so JalTrace treats it as a gap hypothesis.

The prototype focuses on the narrow workflow:

`source record + permit status → extraction/load measurement → tanker/order ID → delivery acknowledgement → reconciliation → reviewable exception`

## 4. MVP user workflow

1. Select a deterministic demo scenario.
2. Inspect the simulated source record, including permit/NOC status as `verified`, `unverified` or `missing`.
3. Inspect extraction and loading readings, units, timestamps, cumulative-meter delta and measurement method.
4. Inspect the tanker/order and delivery record; distinguish `acknowledgedLitres` from `measuredLitres`.
5. Run reconciliation.
6. See the result: `MATCHED`, `WARNING`, `CRITICAL`, `MISSING`, `STALE`, `INVALID` or `UNVERIFIED`.
7. Read the arithmetic explanation and evidence gaps.
8. Open the audit timeline to see what is simulated, user-entered, derived or unverified.
9. Reset and replay the same scenario deterministically.

## 5. In scope for the first application

- Five-slide browser presentation at `/`.
- Interactive simulator at `/demo`.
- Research/evidence view at `/research`.
- Optional architecture/limitations view at `/about`.
- Typed deterministic fixtures for at least seven scenarios.
- Pure reconciliation and telemetry-validation functions with automated tests.
- Scenario controls: play, pause, step, reset, next scenario and clear/recover anomaly.
- Visible `SIMULATION MODE — DEMO DATA` label on every simulator screen.
- Provenance badges for `simulated`, `user-entered`, `derived`, `device-planned`, `verified` and `unverified`.
- Local-only implementation with no account, API key, database or external map dependency.

## 6. Explicit non-goals

- No real tanker booking, supplier marketplace or live vehicle availability.
- No real GPS or location claim; any route is schematic and synthetic.
- No production cloud ingestion, MQTT broker, authentication or multi-tenant access control.
- No automatic declaration of illegal extraction, fraud, theft or contamination.
- No claim that a source is legal because it has a QR code, GPS point or name.
- No claim that flow measurement proves potable water.
- No automatic permit lookup or regulator integration.
- No trained ML/AI model; transparent rules are sufficient for the first demo.
- No physical sensor connection in Round 1 unless the team later documents an actual test.

## 7. Acceptance criteria

The MVP is acceptable when:

1. A normal scenario produces a matched result within tolerance and shows the arithmetic.
2. A mismatch scenario shows 6,000 L loading, 5,300 L acknowledgement, a 700 L difference and `700 / 6,000 × 100 = 11.67%`.
3. Missing load/delivery evidence is visible and not silently treated as zero.
4. Cumulative meter values are converted to deltas exactly once.
5. Duplicate IDs are not double-counted.
6. Negative, impossible or out-of-order readings are marked invalid/review-required.
7. Stale telemetry shows last update age and is not presented as live.
8. Alerts can clear after recovery/reset.
9. Every synthetic entity, location, reading and chart is labelled simulated or illustrative.
10. The presentation can launch the demo without external service dependency.
11. Unit tests pass for the pure calculations and scenario invariants.
12. The team can explain planned hardware separately from what is built.

## 8. Measurement and evidence vocabulary

| Term | Meaning in this product |
|---|---|
| `measuredLitres` | A quantity supplied by a calibrated device in a real or planned deployment. The MVP uses `simulated-meter` only. |
| `acknowledgedLitres` | A quantity entered or confirmed by a receiver/operator; it is not automatically a meter measurement. |
| `cumulativeLitres` | A monotonically increasing meter reading; volume is the delta between linked start/end readings. |
| `permitStatus` | A metadata field stating what evidence is present; it is not a legal conclusion. |
| `source: simulated` | Synthetic fixture data for the demo. |
| `source: device` | Reserved for future field telemetry; not used to imply hardware exists now. |
| `derived` | A calculation performed by the local rule engine, such as delta, difference or percentage. |
| `verified` | Evidence has been supplied and checked for the stated field; never inferred from an identifier alone. |
| `unverified` | Evidence is missing, self-asserted or not independently checked. |

## 9. Product success metrics for a future pilot

The prototype does not claim these results. A field pilot could measure:

- event linkage completeness;
- percentage of deliveries with comparable source/load/delivery quantities;
- time to explain a discrepancy;
- stale/duplicate/impossible reading detection rate;
- false-alert rate on labelled normal events;
- meter-versus-reference volume error after calibration;
- NOC/permit evidence completeness;
- cost per monitored source and delivery.
