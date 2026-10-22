# JalTrace Candidate Direction Comparison

**Decision-gate status:** analytical comparison based on the evidence register through 2026-10-21. Scores are team judgements, not objective facts, market-size estimates or predictions of judging results.

## Scoring rubric

Each criterion is rated 1–5. A weighted score is `rating ÷ 5 × weight`; maximum is 100.

| Criterion | Weight | What a high score means |
|---|---:|---|
| Problem severity and specificity | 20 | A concrete failure affects a named actor and matters to groundwater protection or cost/accountability. |
| Local evidence | 15 | Bengaluru-specific official, scientific or operational evidence exists. |
| Buyer / user clarity | 15 | A credible paying or adopting actor can be named, even if willingness-to-pay remains unvalidated. |
| Unresolved gap after competitor review | 20 | Existing alternatives do not visibly solve the narrow workflow; counter-evidence is limited. |
| Demonstrability within the competition window | 10 | A deterministic software proof can show the key decision without purchased hardware. |
| Data and technical feasibility | 10 | Inputs, units, failure modes and validation steps are practical for a four-person team. |
| IoT fit and alignment with Theme 1 | 5 | Sensors/telemetry are necessary rather than decorative. |
| Regional scalability | 3 | The data model can adapt to different cities, sources and rules. |
| Measurable impact | 2 | Success can be measured without claiming unearned water savings. |

## Candidate scores

| Candidate | Severity | Local evidence | Buyer | Gap | Demo | Tech/data | IoT fit | Scale | Impact | Weighted score /100 | Interpretation |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| **A. JalTrace Source-to-Tanker** — link extraction, loading and delivery | 4 | 4 | 3 | 3 | 5 | 4 | 5 | 4 | 4 | **76.0** | Strong demo and IoT fit, but WEGoT, STARS and BWSSB tanker programmes make the broad idea crowded. |
| **B. ExtractionGuard** — flag unusual extraction behaviour for review | 5 | 5 | 4 | 3 | 4 | 4 | 5 | 4 | 4 | **84.0** | Serious local/regulatory problem and clear telemetry inputs; generic anomaly monitoring already exists, so the wedge must be explainable, offline-tolerant and permit-aware. |
| **C. RechargeWatch** — monitor recharge structures and inflow behaviour | 4 | 3 | 2 | 4 | 3 | 2 | 4 | 4 | 5 | **65.4** | Potentially high environmental impact, but recharge is hard to measure in a two-day demo, ground truth is scarce and the buyer/decision workflow is unclear. |
| **D. WaterLedger** — reconcile municipal, borewell, tanker and consumption flows | 4 | 4 | 4 | 2 | 5 | 5 | 4 | 4 | 4 | **76.0** | Highly demonstrable and useful, but WEGoT publicly markets multi-source supply tracking, tanker quantity and building analytics. |
| **E. JalTrace Compliance Ledger** — permit/NOC-aware evidence chain for private bulk-water supply | 5 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 4 | **85.0** | Best current direction: combines a concrete Karnataka regulatory context with an unproven but narrow evidence gap. Must not claim novelty until operator/product validation. |

## Candidate analysis

### A — Source-to-Tanker evidence chain

**User and task:** an apartment/facility manager or bulk-water supplier needs to explain whether a particular tanker delivery is supported by a source/load record, not merely whether a vehicle arrived.

**Evidence that the problem matters:** Bengaluru has public tanker booking/tracking, a reported BWSSB tanker-management programme, building metering products and borewell telemetry. The existence of multiple partial systems supports the possibility of fragmented records, but it does not prove that managers experience source-to-delivery reconciliation as a costly recurring problem. **S004–S012.**

**What already exists:** booking/tracking (TankerTap, GoTanker, Kaveri on Wheels), gate/delivery records and billing (STARS), building supply/consumption tracking and borewell optimisation (WEGoT), and public utility tanker/borewell monitoring (BWSSB). **S004–S012.**

**Unresolved gap:** the reviewed public materials do not explicitly show a shared event ID binding a source extraction meter, a tanker loading measurement, a delivery record and permit/NOC evidence with missing-data and duplicate/out-of-order handling. This remains a **gap hypothesis**, not a verified absence.

**Minimum demonstration:** one normal chain, one quantity discrepancy, one missing load, one stale reading and a human-reviewable evidence trail. This fits the team and shows more than a static dashboard.

### B — ExtractionGuard

**User and task:** a regulator, utility or institutional operator needs to identify unusual pump/flow/volume patterns for investigation without automatically declaring extraction illegal.

**Evidence:** Karnataka’s Ground Water Act provides a permit/NOC and authority framework; Act 63 of 2025 expressly addresses private bulk-water tankers. BWSSB’s reported programme already captures groundwater depth, extracted quantity and pump hours. **S011, S013.**

**Existing alternatives:** generic borewell telemetry and utility dashboards already cover depth, extraction quantity and pump hours. WEGoT also advertises borewell yield, pump and dry-run optimisation. **S008, S009, S011.**

**Potential wedge:** an explainable, configurable review workflow that combines extraction telemetry with source permit/NOC metadata, distinguishes stale/impossible/duplicate readings from threshold crossings, and stores evidence for a human. The product must say “demo threshold crossed” or “review required,” not “illegal.”

**Risk:** if the team cannot obtain a real permit schema or operator workflow, the rule set remains illustrative. The same sensor data may be available in existing utility systems.

### C — RechargeWatch

**User and task:** a site operator or utility needs to know whether a recharge structure is receiving water and functioning normally, rather than only being present on a map.

**Evidence:** the competition brief explicitly names aquifer recharge analysis and the Bengaluru context has active recharge/lake interventions in reported BWSSB strategy. **S001, S012.**

**Why it scores lower:** recharge is spatially and temporally complex; inflow, ponding, soil infiltration and aquifer-level response are not interchangeable. A two-day simulation could show instrumentation but not prove recharge. No prospective buyer or operational decision-maker has been interviewed.

### D — WaterLedger

**User and task:** an apartment or campus wants one ledger for municipal, tanker, borewell and consumption flows.

**Evidence and alternatives:** WEGoT publicly markets exactly this broad building-level visibility, including municipal/tanker/borewell sources, tanker quantity and supply-to-usage monitoring. STARS covers tanker deliveries and billing. **S007–S009.**

**Why it is not the lead:** the workflow is easy to demonstrate, but the differentiation is weak unless narrowed to a specific audit or compliance decision. A ledger-only pitch risks being judged as a dashboard replacement rather than a groundwater solution.

### E — JalTrace Compliance Ledger (recommended scope)

**User and task:** a facility manager and private bulk-water supplier need to assemble an evidence packet for one delivery: source identity and permit/NOC status, extraction/load measurement provenance, tanker/order identity, delivery acknowledgement and exception reasons.

**Evidence:** Act 63 of 2025 says private tankers abstracting groundwater for bulk water supply shall have a No Objection Certificate. Public products already track movement, deliveries, billing, building supply and some borewell data, but the reviewed material does not explicitly show the complete permit-aware chain. **S004–S013.**

**Why it is more defensible:** it does not claim to replace booking, GPS, meters or utility SCADA. It is a narrow evidence/reconciliation layer that can accept those systems’ events. It directly addresses a compliance/accountability decision and has a credible deterministic demonstration.

**What is not proven:** customer pain frequency, willingness to pay, access to NOC data, existing WEGoT deployment details and whether a private supplier would permit a source meter. The market gap is therefore **INCONCLUSIVE** until validation.

## High-level check of the other permitted themes

### Theme 2 — Rising AQI

The supplied brief describes monitoring, forecasting and reduction of pollution sources such as vehicles, industry, construction dust and waste burning. CPCB maintains a national AQI portal, real-time air-quality data and monitoring-network documentation. **S001 and CPCB National Air Quality Index page, https://cpcb.gov.in/National-Air-Quality-Index/, checked 2026-10-21.**

This makes air monitoring and AQI dashboards a clearly established ecosystem. A defensible AQI concept would need a specific local source, an intervention and a measurable reduction—not another sensor dashboard. The team’s current web/simulation strength could build a demo, but the groundwater direction has a closer Bengaluru-specific regulatory hook and no need to switch immediately.

### Theme 3 — Coastal plastic pollution

The supplied brief is explicitly Mumbai-oriented and asks for monitoring, interception and reduction of plastic leakage in coastal and drainage networks. **S001, PDF pp. 3–5.** A credible prototype would likely require site-specific drainage/coastal data, mechanical interception or field operations, monsoon/overflow considerations and a Mumbai stakeholder. Those are larger validation and hardware burdens for this team’s current time and ₹0 starting budget.

### Theme decision

Do **not** switch themes at this gate. Continue with Theme 1, but narrow JalTrace to the compliance/evidence workflow. Re-open the theme choice only if a short operator/product validation shows that existing systems already provide the full chain or that no user values it.

## Required validation before claiming a market gap

Ask at least five prospective users or operators, without fabricating responses:

1. “When a tanker arrives, how do you verify the source, the quantity loaded and the quantity received? Which records are used and how long does reconciliation take?”
2. “Do you have access to a borewell/source permit or NOC, and would you share it with a supplier/customer system?”
3. “Which existing app, meter or register do you already use? What does it fail to explain when data disagree or a reading is missing?”
4. “Would you pay for an evidence report, or would the buyer be a regulator, utility or supplier?”
5. “What measurement and calibration evidence would you trust enough to act on a discrepancy?”

Until those answers exist, the product should say **“research-backed hypothesis”** and **“prototype for validation,”** not **“market-proven unique solution.”**
