# JalTrace Market Gap Report

**Date:** 2026-10-21  
**Verdict:** **INCONCLUSIVE — proceed only with a narrow validation prototype; do not claim the market gap is proven or that JalTrace is unique.**

## Executive verdict

The broad JalTrace idea—“a smart tanker app with GPS, water quantities and a dashboard”—is **crowded / weak**. Bengaluru already has public and private tanker booking/tracking, BWSSB’s IoT tanker-management narrative, delivery-record/billing software, building-level multi-source metering and borewell telemetry. **S004–S012.**

The narrowest plausible wedge is a **permit-aware compliance and evidence ledger** for a private bulk-water delivery:

`source permit/NOC record → extraction/load measurement → tanker/order identity → delivery acknowledgement → explainable reconciliation and exception evidence`

Public sources reviewed here do not explicitly show this entire chain as a shared, human-reviewable workflow. That is an **unproven evidence gap**, not a verified absence. WEGoT is the closest adjacent competitor and may already support more than its public pages disclose. **S008–S009.**

### Recommendation in one sentence

**GO for a competition-ready software simulation of this narrow workflow; NO-GO for production build, “first/unique” claims, or impact claims until five user conversations and one product/operator validation confirm the gap.**

## Who has the problem?

The proposed first user is an apartment, campus or commercial-facility manager receiving private bulk water, paired with a tanker supplier or source operator. The specific task is not finding a vehicle. It is explaining whether a particular delivery has sufficient evidence of:

- an authorised/recorded source;
- a comparable measured load;
- a distinct tanker/order identity;
- a delivery quantity or receiver acknowledgement;
- a reasoned exception when records disagree or go stale.

The likely buyer is not yet proven. Possibilities are a facility operator, supplier, property-management company, auditor, utility or future regulator-facing service. No interviews were available.

## What the reviewed market already does

| Existing layer | Evidence | What it makes non-novel |
|---|---|---|
| Booking / nearby tanker / live movement | TankerTap and GoTanker advertise these; Kaveri on Wheels advertises tracked public deliveries; BWSSB describes IoT-enabled tanker tracking. **S004–S006, S010.** | “Uber for tankers,” live map, ETA, capacity selection and notifications. |
| Delivery record / billing | STARS records photo, time, vehicle and quantity, shares deliveries and builds bills; offline sync is advertised. **S007.** | A gate register, delivery list or monthly tanker reconciliation by itself. |
| Multi-source building water intelligence | WEGoT advertises municipal/tanker/borewell source tracking, per-load tanker quantity, borewell optimisation, meter/LoRa/cloud dashboards and bill auditing. **S008–S009.** | A generic apartment water ledger or dashboard. |
| Borewell telemetry | BWSSB’s reported programme captures depth, extracted quantity and pump hours; expansion was planned. **S011.** | Adding sensors, pump hours or a generic borewell chart without a distinct decision workflow. |
| Regulatory context | Karnataka Act 63 of 2025 says private tankers abstracting groundwater for bulk water supply shall have a No Objection Certificate. **S013, pp. 27–30 of accessible mirror.** | A compliance-aware workflow has a real policy context, but the law does not itself prove a software market or required interface. |

## The proposed gap and its counter-evidence

### Gap hypothesis

Existing products may collect related events, but the reviewed public material does not explicitly demonstrate a common evidence chain where:

1. a specific source is identified and its permit/NOC status is recorded;
2. a calibrated extraction or loading measurement is linked to a tanker/order;
3. a delivery acknowledgement or downstream meter is linked to the same chain;
4. the system explains the quantity denominator and measurement method;
5. missing, stale, duplicate, out-of-order or impossible readings become reviewable exceptions;
6. the result is an evidence packet rather than an accusation.

### Counter-evidence

- WEGoT says its sensors can track water from source to usage and its building solution tracks tanker quantity, borewells and supply. **S008–S009.**
- STARS already solves a meaningful portion of the delivery record and billing problem. **S007.**
- BWSSB publicly describes RFID/GPS or IoT tanker management, so tanker identity/location is not a differentiator. **S010–S012.**
- BWSSB’s reported borewell telemetry covers depth, extraction quantity and pump hours, so generic extraction monitoring is not a differentiator. **S011.**

These counterpoints are why the verdict is **inconclusive**, not promising by default.

## What JalTrace must demonstrate

The first prototype should demonstrate one decision, not a platform:

> “For this simulated tanker/order, which source/load/delivery evidence is present, how comparable are the quantities, and what needs human review?”

Required visible behaviours:

- normal matched chain with arithmetic and tolerance;
- quantity discrepancy with a stated denominator;
- missing load or delivery evidence;
- stale/duplicate/out-of-order/impossible telemetry;
- source permit/NOC marked as verified, unverified or missing—never inferred from a QR code;
- audit timeline showing what is simulated, user-entered, derived or unverified;
- no automatic “illegal,” “fraud” or “stolen” conclusion.

## Evidence of improvement

The product should measure:

- percentage of deliveries with linked source/load/delivery evidence;
- percentage of records with explicit measurement method and timestamp;
- time to explain or route a discrepancy for review;
- duplicate/out-of-order/stale reading detection rate on labelled test cases;
- false-alert rate on normal synthetic scenarios;
- field pilot difference between reference-meter and installed-meter readings;
- NOC/permit evidence completeness, not “legality” inferred from telemetry.

## Three minimum validation questions

1. How do apartment or facility managers currently verify tanker source and delivered quantity, and how long does month-end reconciliation take?
2. Do private tanker suppliers have a source NOC/permit and source/load records that can be shared with a buyer or auditor?
3. Does the current metering or tanker software already bind those records, and what exception cases remain unresolved?

## Confidence and limits

| Finding | Confidence | Why |
|---|---|---|
| Tanker booking/tracking is already available | High | Multiple first-party pages/app listings and BWSSB statement. |
| Delivery-record/billing workflows already exist | High | STARS listing is explicit. |
| Building-level multi-source metering exists | High as a vendor capability claim | WEGoT pages are explicit; independent deployment outcomes were not audited. |
| Generic borewell telemetry is active in Bengaluru | Medium-high | Reported BWSSB chairperson programme; not an audited deployment dataset. |
| Private tanker NOC is a Karnataka legal requirement under Act 63 of 2025 | High for the reproduced text; implementation detail remains open | Accessible legal text plus official Gazette URL; legal advice is outside scope. |
| No competitor has the full permit-aware source-to-delivery chain | Low | Public sources do not show it, but private integrations and undisclosed features may exist. |
| Users will pay | None / unverified | No interviews or commercial quotes. |

## Decision

Use the phrase **“narrow gap hypothesis”** in the pitch. Do not use “first,” “only,” “unique,” “prevents illegal extraction,” “saves X litres” or “verified source” unless later evidence supports the exact statement.

Full evidence and links: `research/source_register.md` and `research/competitor_matrix.md`.
