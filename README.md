# JalTrace — Groundwater Accountability & Water Distribution

> **InnovateX project · Early research and validation stage**

JalTrace is a proposed IoT-enabled underground water management system exploring how to reconcile groundwater extraction, tanker loading, transportation, and final delivery records in one traceable workflow.

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

JalTrace is in the **research and problem-validation stage**. The competition requirements and starter workspace have been inspected. The application prototype has not yet been implemented, and implementation is intentionally gated on competitor analysis and a go/no-go decision.

| Workstream | Status |
|---|---|
| Competition requirements review | Initial review complete |
| Workspace and runtime inspection | Initial inspection complete |
| Competitor and market validation | Pending / in progress |
| Customer problem validation | Pending |
| Go/no-go decision | Pending research evidence |
| Web application | Not built yet |
| IoT telemetry simulation | Planned, not implemented |
| Physical sensor integration | Optional future validation; not implemented |
| Automated tests and end-to-end demo | Not implemented |

## Research questions

Before committing to the product scope, the team is investigating:

- Do existing systems already connect extraction readings, tanker loading, and delivery acknowledgement at an individual-event level?
- How much of the proposed workflow is already covered by tanker-booking services, smart-water platforms, or groundwater monitoring products?
- Who experiences the reconciliation problem most often, and what do they currently do to resolve it?
- What evidence would be needed to distinguish a verified source from a location or identifier alone?
- Which hardware, connectivity, calibration, maintenance, and operating costs are supported by sources versus estimates?

The project scope may be narrowed or changed if the research does not establish a meaningful unmet need.

## Planned technical direction

The implementation stack has not yet been finalised. A lightweight web application with a deterministic telemetry simulator is being considered for the first demonstration. Hardware integration would be evaluated separately based on availability, cost, and what it can actually measure.

A future architecture may include:

- A web dashboard for source, tanker, and delivery records.
- An event/data model that links extraction, loading, and delivery events.
- A reconciliation layer for configurable quantity tolerances and missing-event checks.
- A simulated telemetry generator and test scenarios.
- Optional sensor hardware for a later proof of concept.

These are proposed components, not implemented features.

## Roadmap

1. Complete a source-backed competitor matrix and claim register.
2. Conduct customer discovery and define the highest-value user/problem.
3. Record a documented **go/no-go** decision and a narrowly scoped MVP.
4. Implement the data model, simulation scenarios, and dashboard if the research supports proceeding.
5. Test normal operation and failure cases, documenting limitations and assumptions.
6. Evaluate sensor integration and build a 10-minute competition demonstration.

## Team and constraints

JalTrace is being explored by a four-member first-year computer science student team for InnovateX. The project is designed around a near-zero initial budget, so the first milestone prioritises research, software simulation, and a reproducible demo over unverified hardware claims.

## Contributing and project status

This repository is currently a project workspace, not a released product. Technical choices, requirements, and feature status may change as evidence is collected. Please treat the roadmap and proposed architecture as plans until implementation and testing are documented.

## Disclaimer

JalTrace is a student project and is not an official groundwater regulator, water-quality certification system, or proof of legal compliance. Any future alerts are intended to support review by responsible operators, not to make automatic accusations or regulatory determinations.
