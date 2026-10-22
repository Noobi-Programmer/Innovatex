# JalTrace GO / NO-GO Decision Gate

**Date:** 2026-10-21  
**Decision:** **GO for a narrow, honest competition prototype; NO-GO for an unvalidated production or novelty claim.**  
**Market-gap verdict:** **INCONCLUSIVE.**

## 1. Strongest candidate and why

### Recommended: JalTrace Compliance Ledger

A permit/NOC-aware evidence and reconciliation layer for private bulk-water supply to apartments, campuses or commercial facilities.

It combines:

- a concrete Karnataka regulatory context: Act 63 of 2025 says private tankers abstracting groundwater for bulk water supply shall have an NOC;
- an IoT-appropriate event model: source/extraction, loading, delivery and optional GPS/receiver evidence;
- a narrow operator decision: “is this delivery sufficiently evidenced, and what needs review?”;
- a deterministic software demonstration that can be built without hardware or paid services;
- a plausible path to integrate with existing meters, tanker software or utility telemetry instead of replacing them.

The public market scan does **not** prove that this workflow is missing. It only shows that the full chain is not explicit in the reviewed material. **S007–S013.**

## 2. Strongest alternative

### ExtractionGuard

Explainable extraction-anomaly review for a utility, regulator or institutional operator. It has strong problem severity, regulatory relevance and existing telemetry inputs. It is slightly less attractive for the first pitch because generic borewell telemetry and pump monitoring are already active, and a real permit/threshold workflow would need an operator or regulator to validate.

If the team obtains evidence that private tanker source-to-delivery records are already integrated, pivot to ExtractionGuard with the same guardrails: flag for investigation, never automatically declare illegal extraction.

## 3. Closest existing competitors and alternatives

1. **WEGoT Aqua:** closest adjacent product; public pages cover municipal/tanker/borewell source tracking, tanker quantity per load, borewell optimisation and building dashboards.
2. **STARS:** close alternative for tanker arrival records, photo/time/vehicle/quantity, offline capture and billing reconciliation.
3. **Sanchari Kaveri / BWSSB digital tanker programme:** counter-evidence against novelty of RFID/GPS/IoT tanker tracking.
4. **Kaveri on Wheels:** public BWSSB booking, tracked deliveries and OTP-protected delivery.
5. **TankerTap and GoTanker:** private Bengaluru tanker booking, live tracking, capacity and alerts.
6. **BWSSB borewell IoT programme:** counter-evidence against generic borewell depth/extraction/pump telemetry as a new idea.

Evidence: `research/competitor_matrix.md`, sources S004–S012.

## 4. Proven gap or explicit uncertainty

### What is proven

- The broad “tanker app + map + dashboard” category is already occupied.
- Karnataka law creates a current compliance context for private bulk-water tanker abstraction.
- Existing systems cover important fragments: booking/tracking, delivery/billing, building metering, borewell telemetry and public utility monitoring.
- A prototype must distinguish simulated data from verified evidence and must not treat mismatches as proof of fraud or illegality.

### What is not proven

- No source reviewed proves that the full permit/NOC-aware source extraction → tanker loading → delivery chain is absent from existing deployments.
- No direct user evidence proves that the task is frequent, painful or budgeted.
- No evidence proves a buyer will pay for a standalone evidence layer.

Therefore the gap is **INCONCLUSIVE**, not “PROMISING GAP.”

## 5. Most important evidence supporting the decision

| Evidence | Decision impact |
|---|---|
| InnovateX rewards problem-centric understanding, technical feasibility, cost/market value, scalability and impact. **S001.** | A narrow, honest workflow is stronger than a generic dashboard and fits the judging criteria. |
| BWSSB/Kaveri on Wheels and private tanker apps already cover booking/tracking. **S004–S006, S010–S012.** | Reject tanker marketplace/live-map novelty. |
| STARS covers delivery records, offline sync and billing. **S007.** | Reject a simple tanker register as the product. |
| WEGoT covers municipal/tanker/borewell supply tracking, tanker quantity and borewell optimisation. **S008–S009.** | Keep the gap narrow and disclose the closest commercial overlap. |
| BWSSB’s reported borewell IoT plan covers depth, extraction quantity and pump hours. **S011.** | Reject generic “we add IoT to borewells” novelty. |
| Karnataka Act 63 of 2025 requires NOC for private tankers abstracting groundwater for bulk supply. **S013.** | Gives the narrow evidence/compliance workflow a real local policy hook, subject to implementation validation. |

## 6. Technical risks

- Extraction and delivery quantities may not be comparable unless linked to the same fill/order interval.
- Meter calibration, installation position, air in line, sensor drift, pump cycling and line storage can create real discrepancies.
- Missing connectivity can make a stale source look live unless last-update age and buffering are explicit.
- GPS/QR codes identify an event or location; they do not prove legal source or potable water.
- Private NOC/permit records may be unavailable, inconsistent or sensitive.
- A software simulation cannot establish field accuracy or water savings.

## 7. Market and adoption risks

- WEGoT or another vendor may already provide the full workflow behind a demo or custom integration.
- Facility managers may prefer one existing vendor rather than a new audit layer.
- Tanker suppliers may resist source measurement or permit sharing.
- Regulatory adoption and data-sharing authority are unknown.
- ₹0 development cost does not mean ₹0 deployment cost.

## 8. Minimum demonstrable prototype

Build only this vertical slice:

1. Three simulated entities: source, tanker/order and recipient.
2. Source record with explicit `permitStatus: verified | unverified | missing` and no automatic inference.
3. Extraction/load event with cumulative-meter delta and measurement method.
4. Delivery event with acknowledged or simulated-meter quantity.
5. Reconciliation result with denominator, tolerance and reasons.
6. Scenario controls: normal, mismatch, missing load, stale telemetry, duplicate/out-of-order/impossible reading and recovery.
7. Exception queue and audit trail with `SIMULATED` labels.
8. One architecture diagram showing future ESP32/flow-meter/gateway interfaces, clearly marked planned.

## 9. Recommendation to proceed, narrow or pivot

### Proceed, but narrow

Proceed with the software prototype and five-slide web pitch under the name:

> **JalTrace — a permit-aware evidence ledger for groundwater-to-delivery events.**

The pitch should say:

> “We found a narrow workflow gap hypothesis, not proof that no product exists. Existing systems track movement, deliveries, buildings and wells; JalTrace tests whether linking their evidence into one reviewable chain helps a facility manager and supplier explain discrepancies.”

### Pivot trigger

Pivot to ExtractionGuard if a direct product/operator check confirms that source-to-delivery linkage is already solved. Do not switch to AQI or coastal plastic at this stage; the groundwater direction has better fit with the team’s Bengaluru context, current legal hook and software-simulation budget.

## 10. Immediate validation gate before final claims

Before the final deck is locked:

- speak to five prospective users/operators;
- request one WEGoT/STARS/product demonstration or public technical clarification;
- confirm the current Karnataka NOC/permit workflow with an authoritative source or qualified advisor;
- obtain at least one current hardware/meter quote for the future pilot;
- write all null responses and inaccessible sources as limitations.

If these checks fail, retain the educational prototype but label it **INCONCLUSIVE market validation** and remove all novelty claims.
