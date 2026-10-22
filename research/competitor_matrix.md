# JalTrace Competitor and Alternative Matrix

**Research access date:** 2026-10-21. This is a feature-level public scan, not a patent search, customer study or private product demo.

## Status key

- **Verified:** explicitly stated in a first-party page, official app listing or official agency source reviewed.
- **Not found in reviewed material:** no public evidence found in the reviewed material; it is not a claim of absence.
- **Confirmed unavailable:** the source explicitly says the feature is unavailable. No major product below was assigned this status for a core feature.
- **Vendor / agency claim:** the source describes what the organisation says its product or programme does; it is not automatically an independent outcome measurement.

## Summary matrix

| Product / programme | Target user and geography | Verified capabilities | Not found in reviewed material | Overlap with JalTrace | What JalTrace would need to demonstrate |
|---|---|---|---|---|---|
| **TankerTap** | Homes, apartments, construction and commercial users in Bengaluru | Booking; nearby-provider discovery; 5,000/6,000/9,000 L options; real-time order/live tanker tracking; status notifications; payments; supplier/partner claims. **Verified from S005/S006.** | Borewell extraction meter; pump hours; fill-meter delta; source permit/NOC record; source-to-tanker-to-delivery event chain; measurement-method metadata; anomaly/evidence queue; regulatory integration; multi-source building ledger. | Directly overlaps tanker discovery, booking and tracking. | Do not present a marketplace or live map as the innovation. Demonstrate a permit-aware, event-linked evidence chain and explain why existing booking data is not enough. |
| **GoTanker** | Homes, offices and construction sites across Bangalore | Booking by quantity; advertised 2-hour delivery; live GPS tracking; alerts; delivery-status updates; hygiene/sanitisation claims. **Verified as advertised from S006.** | Extraction telemetry; source identity/permit; flow-based loading measurement; receiver quantity reconciliation; billing audit trail; anomaly handling; groundwater-regulator integration. | Directly overlaps delivery booking and live tracking. | Show a decision that GoTanker’s public feature set does not claim to support: reconciling measured source extraction/load evidence against the receiving event. Do not repeat “safe/clean” as a verified water-quality result. |
| **Kaveri on Wheels / BWSSB-MIS** | BWSSB public supply users; booking from BWSSB GLRs/Cauvery Connect centres | Booking at fixed/discounted rates; tracked tankers; OTP-protected delivery; BWSSB app and portal. **Verified from S004.** | Private-tanker source registry; private borewell meter; flow-based extraction/load; cross-party source-to-delivery reconciliation; public permit evidence; facility water ledger. | Strong overlap with public tanker booking and tracked delivery. | Position outside public tanker booking: an evidence/audit layer for private bulk-water supply and institutional receiving sites, subject to validation. |
| **Sanchari Kaveri / BWSSB tanker-management programme** | BWSSB utility operations / Bengaluru public water governance | BWSSB first-party post says IoT-enabled tanker tracking; BWSSB chairperson interview reports RFID/GPS smart tanker management. **S010/S012.** | Public technical schema, data access, coverage of every tanker, private-supplier coverage, extraction-meter binding, delivery quantity reconciliation, calibration or permit workflow. | Strong counter-evidence against novelty of IoT tanker tracking, RFID or GPS. | Treat tanker tracking as a commodity input. Demonstrate the missing-data, measurement-method and permit-aware reconciliation layer, and label the gap as a hypothesis until BWSSB/private operators confirm it. |
| **STARS: Smart Tanker Records** | Apartment societies, factories, hotels, hospitals, commercial sites and suppliers | Gate record with photo, time, vehicle and quantity; shared delivery list; orders; supplier/customer console; bills/statements from delivery records; offline capture/sync. **Verified from S007.** | Borewell/source extraction; pump state; loading flow meter; source ID; permit/NOC; delivery meter; discrepancy rules between source and receipt; regulatory integration. | Very close overlap with a basic tanker delivery ledger, receipt evidence and billing reconciliation. | The prototype must not be a gate register with nicer UI. It must link a specific measured extraction/load event to a delivery, preserve measurement provenance and explain exceptions. |
| **WEGoT Aqua** | Residential communities, large buildings, campuses and commercial sites in India | Supply tracking from municipal sources, tanker lorries and borewells; tanker quantity per load; count of tankers; borewell pump/sump/yield/dry-run optimisation; ultrasonic meters; LoRa option; cloud dashboards; alerts; bill auditing; source-to-usage monitoring claims. **Verified from S008/S009.** | In reviewed public material: explicit one-to-one extraction event → tanker fill event → receiver acknowledgement with shared chain ID; permit/NOC verification; cross-party evidence package; duplicate/out-of-order/stale-data rules; public regulator integration. | Closest adjacent commercial product. It may already satisfy many apartment-manager needs for supply/consumption visibility. | Narrow to an auditable, explainable reconciliation protocol and evidence pack, or pivot if a WEGoT demo/customer confirms that capability already exists. Any differentiation must be tested directly. |
| **BWSSB borewell IoT / SCADA programme** | Public utility borewells and city water operations | Reported monitoring of groundwater depth, extraction quantity and pump operating hours; real-time dashboards; planned SCADA integration; reported plan to expand to 6,000 borewells by March 2027. **Verified as a reported programme from S011; strategic digital context also in S010/S012.** | Private tanker supply; apartment receiving site; source/load/delivery event identity; public evidence of cross-party reconciliation; independent deployment results. | Overlaps generic borewell telemetry, pump monitoring and government digital water management. | Avoid pitching “we add IoT to borewells” as original. Show how a lightweight evidence layer could sit beside existing telemetry without replacing SCADA. |
| **Generic smart-meter / telemetry vendors** | Buildings, campuses, utilities and industrial sites | Metering, dashboards, alerts, LoRa/cloud connectivity and pump or flow monitoring are established product patterns; WEGoT is a concrete India example. **S008/S009.** | A complete public inventory of all India suppliers and their private capabilities was not attempted. | Hardware and dashboards are not defensible novelty by themselves. | Demonstrate workflow, data provenance, failure handling and measurable reconciliation quality—not merely sensor icons. |

## Feature-by-feature view

| Capability | TankerTap | GoTanker | Kaveri on Wheels | Sanchari Kaveri / BWSSB programme | STARS | WEGoT Aqua | BWSSB borewell IoT |
|---|---|---|---|---|---|---|---|
| Tanker booking | **Verified** | **Verified** | **Verified** | Not found in reviewed material | **Verified** (orders) | Not found as a marketplace | Not found |
| Nearby-provider discovery | **Verified** | Not found in reviewed material | Not found | Not found | Not found | Not found | Not found |
| Live vehicle GPS / tracked tanker | **Verified** | **Verified** | **Verified** (tracked tanker in listing) | **Verified** (RFID/GPS or IoT tracking claim) | Not found | Not found | Not found |
| Delivery quantity record | Not found in reviewed material | Not found | Not found in public description | Not found | **Verified** | **Verified** per load | Not found |
| Photo/time/vehicle delivery evidence | Not found | Not found | OTP delivery, but public description does not say photo | Not found | **Verified** | Not found | Not found |
| Borewell extraction measurement | Not found | Not found | Not found | Not found in reviewed material | Not found | **Verified** as source/pump/usage monitoring claims | **Verified** as reported programme |
| Pump operating hours / state | Not found | Not found | Not found | Not found | Not found | **Verified** | **Verified** as reported programme |
| Flow-based source/load measurement | Not found | Not found | Not found | Not found | Not found | Metering exists, but one tanker-load linkage is **not found** | Extraction quantity reported; load linkage not found |
| Source ID / permit / NOC evidence | Not found | Not found | Public source is BWSSB GLR/Cauvery Connect, but a permit evidence workflow is not described | Not found | Not found | Not found | Not found |
| Source-to-delivery chain reconciliation | Not found | Not found | Not found | Not found in reviewed material | Not found | Not found explicitly | Not found |
| Water-quality laboratory record | Not found | Hygiene/clean-water claims, but no lab record found | Not found | Not found | Not found | Not found in reviewed material | Not found |
| Billing reconciliation | Not found in reviewed material | Payments are advertised | Fixed/discounted rates and payment | Not found | **Verified** | **Verified** bill auditing / usage billing | Not found |
| Anomaly / stale / duplicate telemetry logic | Not found | Not found | Not found | Not found | Offline sync, but anomaly rules not found | Alerts exist; exact event-quality rules not found | Monitoring dashboards; exact rules not found |
| Regulator / permit integration | Not found | Not found | BWSSB-operated public service, but permit integration not described | BWSSB programme; public integration not documented | Not found | Not found | Government programme, but public product interface not documented |
| Multi-source building ledger | Not found | Not found | Not found | Not found | Delivery ledger, not full supply ledger | **Verified** as a product claim | Not found |

## What is already commoditised or crowded

1. **Tanker booking and live location:** TankerTap, GoTanker and Kaveri on Wheels publicly advertise this; BWSSB also describes IoT tanker tracking.
2. **Tanker arrival records and billing:** STARS explicitly covers this.
3. **Building water metering and multi-source visibility:** WEGoT explicitly covers municipal/tanker/borewell supply tracking, per-load tanker quantity, borewell optimisation and building dashboards.
4. **Borewell telemetry:** BWSSB’s reported programme and commercial smart-meter products show that depth, extraction quantity, pump hours, flow, LoRa and dashboards are not novel individually.

## Narrowest plausible gap

The public evidence does **not prove** that an existing product lacks the following combined workflow:

`permit/NOC-aware source record → calibrated extraction/load measurement → immutable source/tanker/order identity → delivery acknowledgement or meter → explainable reconciliation and exception evidence`

That is a **gap hypothesis**, not a verified market fact. The closest counter-evidence is WEGoT’s source-to-usage monitoring and tanker-management claims, plus BWSSB’s RFID/GPS tanker programme. The team must validate the hypothesis with a WEGoT/product demo or direct operator conversation before using “unique” or “first.”

## Differentiation test for the competition pitch

JalTrace should only claim differentiation if it can answer all seven questions:

1. **User:** apartment/facility manager and private bulk-water supplier operating under a Karnataka NOC/permit context.
2. **Difficult task:** prove that a specific delivered tanker load is supported by a specific measured source/load event and record why a mismatch needs investigation.
3. **Existing products:** booking/tracking, gate records/billing, building metering, borewell telemetry and public tanker management already exist separately and partly together.
4. **Unresolved gap:** public material does not explicitly show the permit-aware, event-linked evidence chain with measurement provenance and missing-data logic.
5. **Adoption reason:** reduces manual reconciliation and produces an evidence packet for investigation/audit without declaring fraud or illegality.
6. **Improvement evidence:** linkage rate, percentage of loads with comparable source/load/delivery evidence, time to explain a discrepancy, stale/duplicate detection rate and false-alert rate on labelled test cases.
7. **Team fit:** a deterministic software simulation can demonstrate the workflow without buying hardware; a field pilot can later validate meters and NOC records.

## Unresolved questions requiring validation

- Does WEGoT already bind tanker identity and source meter readings to a downstream receiving record in deployed customer workflows?
- Does Sanchari Kaveri expose quantity reconciliation or source evidence beyond RFID/GPS internally?
- Do private tanker suppliers and apartment managers actually experience source-to-delivery reconciliation as a frequent, costly task, and who would pay?
- What authenticated record proves a source is legal/current: NOC, permit, water-source registry, meter certificate, inspection record or a combination?
- What calibration and installation process is acceptable for a low-cost field pilot?
