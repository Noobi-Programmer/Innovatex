# JalTrace — 10-Minute Pitch Script and Judge Q&A

This script is aligned with `index.html`, `demo.html`, the deterministic fixtures and the research gate. Replace no numbers without changing the fixture and tests that support them.

## Run of show

### 0:00–1:30 — Slide 1: the broken water trail

> Good morning, judges. JalTrace is a Bengaluru-first research prototype for one specific accountability question: can we connect groundwater extraction, tanker loading and delivery records well enough to make a difficult manual review explainable?
>
> A source meter, a tanker record and a receiver acknowledgement each tell part of the story. Our prototype tests whether linking those events can expose missing links and quantity discrepancies without pretending that an anomaly proves theft or illegal extraction.
>
> This is a problem hypothesis, not a measured city-wide loss rate. Every number in the demo is synthetic.

**Action:** point to source → load → delivery and the `SIMULATION MODE` label.

### 1:30–3:00 — Slide 2: existing alternatives and the gap hypothesis

> We started with research rather than assuming novelty. Public material already shows tanker booking and live tracking, delivery records and billing, building-level water intelligence, and public tanker-management programmes. Kaveri on Wheels, TankerTap and GoTanker cover booking or movement. STARS covers delivery records and offline capture. WEGoT advertises municipal, tanker and borewell source tracking with meters and dashboards.
>
> So we are not claiming to be the first tanker app or first smart-water dashboard. Our narrower hypothesis is that a permit/NOC-aware link between source evidence, a loading event and a delivery acknowledgement may be useful to an operator. Public material reviewed so far does not explicitly prove that the exact chain is absent — therefore our verdict is INCONCLUSIVE and the next step is validation.

**Action:** name at least two competitors and point to the `INCONCLUSIVE / VALIDATE` chip.

### 3:00–5:00 — Slide 3: architecture

> The field version would accept a cumulative source reading, pump state, a loading event linked to a tanker and order, and a delivery acknowledgement. A gateway could buffer readings when connectivity is unavailable. JalTrace stores identity and provenance, calculates deltas, checks tolerances, detects stale data and maintains an audit trail.
>
> The product is an evidence layer, not an accusation engine. A permit status is stored as metadata. A QR code, GPS coordinate or source identifier alone cannot establish legality, and a flow meter does not establish water quality.

**Action:** distinguish `PLANNED FIELD INPUTS` from `JALTRACE EVIDENCE LAYER`.

### 5:00–7:30 — Slide 4: deterministic simulation

> This screen is simulation mode. First, the normal fixture shows a matched chain. Now we select quantity mismatch: 6,000 litres loaded and 5,300 litres acknowledged. The difference is 700 litres. Using loading as the denominator, 700 divided by 6,000 is 11.67 percent.
>
> The engine calls this critical because it exceeds the configured review threshold. It does not call it theft. Calibration, timing, line storage, spills, manual entry or an unlinked event could all explain a difference.
>
> Next, we remove the loading record. The engine does not fabricate a match; it marks the chain missing. Finally, recovery shows fresh telemetry clearing the current stale state while preserving the historical anomaly in the audit trail.

**Action:** open the demo; show `normal-match`, `quantity-mismatch`, `missing-load`, then `recovery`. Point to the formula and audit trail.

### 7:30–10:00 — Slide 5: feasibility and next gate

> The software demonstration is feasible at an incremental ₹0 because it uses local files, deterministic fixtures and no paid API or cloud database. That does not mean a physical deployment costs ₹0. A pilot would add a compatible flow meter, gateway, installation, calibration, connectivity and maintenance.
>
> Our next validation gate is deliberately concrete: five conversations with facility, tanker or utility operators; one product clarification or demonstration; confirmation of the current permit/NOC workflow; and at least one current hardware quote. We will measure evidence linkage, freshness, false-alert rate and reference-meter error — not claim water saved before measuring it.
>
> JalTrace is ready to be tested, not yet ready to be called unique. Thank you.

## Judge Q&A

### “Isn’t Sanchari Kaveri already doing this?”

Public material describes IoT tanker management with GPS/RFID, so live movement tracking is not our claimed novelty. We are testing the narrower source-meter → loading-event → delivery-acknowledgement reconciliation workflow. If an operator confirms that it is already solved, we will narrow or pivot rather than ignore that evidence.

### “Does WEGoT already do source-to-consumption tracking?”

WEGoT is the closest public adjacent product we found: it advertises water metering, tanker-lorry management and supply tracking from municipal, tanker and borewell sources. A generic supply dashboard would not differentiate us. Our unresolved question is whether the permit-aware, event-linked evidence chain is available to the target operator and how it is reconciled in practice.

### “Why not just build another tanker marketplace?”

Because booking, capacity selection, provider discovery and live tracking are already visible in the market scan. Our prototype intentionally avoids that crowded surface and tests a back-office evidence/review workflow.

### “Does a mismatch mean theft?”

No. It means linked records do not reconcile within a configured tolerance. Meter error, timing, retained water, spills, unlinked use and manual entry can all contribute. The output is a review queue item, never an automatic accusation.

### “How do you establish legal source provenance?”

An ID, QR code or GPS coordinate is not enough. A real deployment would need authenticated source records and a permitted connection to the relevant authority or utility information. The current demo uses fictional metadata and does not certify legality.

### “What about water quality?”

The prototype does not measure or certify potability. Water-quality claims require appropriate validated tests and traceable results. We do not infer quality from a location, permit field or flow reading.

### “Where is the IoT hardware?”

No hardware is confirmed yet. The current software demonstrates the event and exception logic with deterministic fixtures. A field pilot needs a compatible meter, pump-state signal, gateway, connectivity and comparison against a reference measurement.

### “Why is the demo ₹0?”

₹0 refers only to the current software milestone using the team’s existing computers and local runtime. It excludes physical hardware, installation, calibration, data plans and maintenance. The cost model separates those phases and labels unquoted items as estimates or quote-required.

### “What is your business model?”

That is not validated. Possible future buyers include facility operators, tanker suppliers or utilities, but the next gate is discovery: identify who owns the reconciliation job, what evidence they already collect and whether the workflow saves enough review time or risk to justify deployment.

### “How will you measure success?”

First, software success is deterministic correctness across matched, mismatch, missing, stale, duplicate, impossible, threshold and recovery fixtures. Field success would be linkage rate, data freshness, false-alert rate, reference-meter error, time-to-review and operator adoption. Water saved is not a current metric because we have no field intervention data.

### “Can this scale city-wide?”

The rule engine is local and portable, but city-wide deployment depends on source records, compatible meters, connectivity, data-sharing authority, installation and operations. Scalability is a future integration question, not a claim made by this prototype.

### “What happens when connectivity fails?”

The proposed gateway buffers readings and includes sequence numbers. The demo explicitly tests stale telemetry and separates current freshness from historical anomalies. A real pilot must test buffer limits, clock drift and reconciliation after reconnection.

### “What if the market gap is already solved?”

Then the research gate worked. We would either position JalTrace as an educational prototype, narrow to a specific operator or workflow, or pivot to the strongest adjacent problem, ExtractionGuard. We will not preserve a novelty claim that the evidence disproves.

## Backup close if time is short

> JalTrace does not claim a new tanker app or automatic proof of illegal extraction. It demonstrates one testable evidence workflow, with deterministic rules and explicit uncertainty. The next step is not more dashboard polish; it is operator validation and a measured hardware pilot.
