# JalTrace Project Decision — Read Before Coding

## Current working concept

**JalTrace: Source-to-Tanker Groundwater Traceability**

A proposed IoT + web system to associate three classes of operational event:

1. **Extraction event:** a borewell flow meter records a change in cumulative extracted volume and pump state.
2. **Loading event:** a fill-point or loading flow meter records volume associated with a specific tanker and source well.
3. **Delivery event:** an operator/receiver records the destination, delivery time and measured or acknowledged quantity. A driver's phone may supply GPS updates during a participating delivery.

The software links the events, checks their timestamps and IDs, compares quantities where comparable measurements exist, and flags discrepancies or missing evidence for human review.

## The main question the project answers

> Can an auditable event chain from groundwater extraction to tanker loading to delivery reveal volume mismatches and missing source evidence that separate records can miss?

This is a hypothesis to test, not an established market gap. Research competitors first. Do not claim that GPS tracking, tanker booking, source registries, IoT flow meters, water-meter dashboards, or delivery logs are novel by themselves.

## Local start, national potential

- **First target context:** apartment communities, campus facilities, commercial sites, or local operators in Bengaluru who receive groundwater via tankers and/or operate borewells.
- **Scale hypothesis:** reuse the event model in other Indian cities with different authorities, water sources, permitted-quantity rules, supplier networks and connectivity conditions.
- **Potential users:** facility managers, tanker suppliers, apartment associations, auditors and water-resource agencies. The team has not yet validated willingness to pay.

## What the first prototype will show

- A fictional/illustrative set of wells, tankers and recipient sites.
- An interactive map or schematic view; markers must be labelled **SIMULATED**.
- Extraction/load/delivery events and their timestamps.
- Expected vs recorded quantities, with transparent mismatch calculations.
- Missing event, duplicate event, delayed telemetry and out-of-order data scenarios.
- An exception queue with reasons and an audit trail.
- A visual system architecture showing the future hardware and communication path.

## What the first prototype will NOT claim

- It is not connected to real tankers or borewells.
- It does not know the real location or availability of private tankers.
- A mismatch is not proof of theft, fraud, illegal extraction or water contamination.
- A flow meter does not prove that water is potable.
- GPS and QR codes alone do not prove source legitimacy.
- It does not replace permits, legal review, meter calibration, laboratory tests or field validation.
- The ₹0 development budget refers only to a no-cost software simulation using existing tools. Hardware, deployment, calibration, data connectivity, maintenance and verification have future costs.

## Market reality to keep in view

Known competitors/adjacent systems include:
- **TankerTap:** Bengaluru tanker booking and advertised live order tracking.
- **Kaveri on Wheels:** BWSSB water tanker booking with tracked deliveries and OTP-protected delivery.
- **Sanchari Kaveri:** described by BWSSB-related material and secondary coverage as an IoT-based tanker-management programme using RFID/GPS.
- **STARS:** logs tanker deliveries, quantities and related billing/reconciliation.
- **WEGoT Aqua:** tracks sources including municipal supply, tanker lorries and borewells; offers water-metering, usage analytics, tanker management and alerts.
- **Groundwater telemetry products/programmes:** track borewell level, extraction, pump hours and/or water usage.

The agent must open the sources in `02_MARKET_RESEARCH_AND_SOURCES.md`, verify their current claims, add any new findings, and clearly separate facts from assumptions.

## Decision gate

Before investing effort in styling, the agent must produce a **gap verdict**:

- `PROMISING GAP`: credible research suggests event-linked reconciliation across extraction, loading and delivery is materially missing in direct products and is useful to a named user.
- `CROWDED / WEAK`: one or more products already combine the core proposed workflow, or evidence of user pain is absent.
- `INCONCLUSIVE`: available public evidence cannot decide.

Even if the verdict is crowded/inconclusive, build a competition-ready educational simulation of the working concept, but prominently report the uncertainty. Do not silently rename a duplicate feature as innovation. Recommend a narrower differentiator only if research supports it.
