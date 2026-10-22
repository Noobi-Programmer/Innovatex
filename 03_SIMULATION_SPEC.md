# JalTrace Virtual Simulation — Product & Engineering Spec

## Purpose

Build a reliable, demonstrable software simulation to show how event-linked groundwater extraction, tanker loading and delivery reconciliation could work. It is **not real telemetry**. Prominently show `SIMULATION MODE — DEMO DATA` on all simulator screens and map markers.

## Core user story

As a Bengaluru apartment/facility manager, I need to see whether the recorded volume extracted at a source, loaded into a tanker and acknowledged at delivery is consistent, so I can investigate missing measurements or discrepancies instead of reconciling multiple records manually.

## MVP pages

1. **Presentation (`/`)** — five full-screen slides with keyboard and on-screen navigation, progress indicator and presenter notes.
2. **Live Demo (`/demo`)** — interactive simulation and visual event chain; embed/launch it from Slide 4.
3. **Evidence (`/research`)** — compact competitor comparison, references and simulated-vs-verified data note.
4. **Optional setup (`/about`)** — architecture, limitations and future hardware plan.

Do not add authentication, payments, multi-tenant accounts, production cloud infrastructure or live user GPS for the demo. No API keys should be needed.

## Proposed event model

```ts
export type PumpState = 'off' | 'on';
export type EventStatus = 'matched' | 'warning' | 'critical' | 'missing' | 'unverified';

export interface ExtractionEvent {
  id: string;
  wellId: string;
  timestamp: string; // ISO 8601
  cumulativeLitres: number;
  flowRateLpm: number;
  pumpState: PumpState;
  source: 'simulated' | 'device';
}

export interface LoadingEvent {
  id: string;
  wellId: string;
  tankerId: string;
  timestamp: string;
  startLitres: number;
  endLitres: number;
  reportedLitres: number;
  measurementMethod: 'simulated-meter' | 'operator-entry';
  sourceEventIds: string[];
}

export interface DeliveryEvent {
  id: string;
  tankerId: string;
  orderId: string;
  recipientId: string;
  timestamp: string;
  acknowledgedLitres: number;
  measurementMethod: 'simulated-meter' | 'receiver-acknowledgement';
  latitude?: number;
  longitude?: number;
  sourceEventIds: string[];
}

export interface ReconciliationResult {
  loadingLitres: number | null;
  deliveryLitres: number | null;
  differenceLitres: number | null;
  differencePercent: number | null;
  status: EventStatus;
  reasons: string[];
}
```

## Important measurement semantics

- A cumulative meter's delta is `endLitres - startLitres`; never sum cumulative values as if they were individual volumes.
- Don't compare total extraction volume directly against one tanker delivery unless the extraction interval is attributable to that tanker fill. Other extraction, line volume, losses, calibration error and concurrent use can explain differences.
- A loading/fill meter and a delivery/receipt measure are needed to compare loading against delivery directly. The first simulation can represent both as simulated events.
- If the receiver quantity is entered manually, call it `acknowledgedLitres` not `measuredLitres`.
- If records don't share a valid source/tanker/order linkage, return `unverified` or `missing`; don't fabricate a confident match.
- A mismatch is an exception requiring investigation—not a declaration of theft or illegal extraction.

## Demo scenarios (all must work deterministically)

### Scenario A — Normal matched delivery
- A simulated well's extraction delta and tanker-load event are linked.
- A delivery record acknowledges a comparable quantity within a configurable tolerance.
- Result: `MATCHED`, with a visible arithmetic explanation.

### Scenario B — Quantity mismatch
- Loading event is 6,000 L and delivery acknowledgement is 5,300 L (illustrative numbers only).
- Difference = 700 L; percentage difference should state its denominator. Prefer `difference / loadingLitres * 100`.
- Result: `WARNING` or `CRITICAL` based on a clearly labelled configurable demo threshold; never say fraud.

### Scenario C — Missing loading record
- Delivery references a tanker/order but no matched source/loading event.
- Result: `MISSING` / `UNVERIFIED`; show the missing link.

### Scenario D — Duplicate/out-of-order telemetry
- Duplicate ID or timestamp earlier than preceding record appears.
- Flag duplicate/out-of-order data; don't double-count its volume.

### Scenario E — Excessive extraction rule
- Simulated flow/cumulative delta exceeds a demo-configured alert threshold or a configured limit field.
- Result: `THRESHOLD BREACH — REVIEW`. Only show “permit exceedance” if an actual permit limit was supplied and verified; otherwise say “demo threshold crossed”.

### Scenario F — Sensor stale/offline
- No new reading for a configurable interval.
- Result: `DATA STALE`; show last update and do not present a stale location as live.

## Efficient implementation strategy

- Use deterministic fixtures in `src/lib/demo-data.ts` and one pure simulation/reconciliation module with unit tests.
- Use an explicit `DemoScenario` state rather than random noise. A `Play scenario` button should produce the same sequence every run.
- Use a small event reducer/state machine; avoid backend infrastructure until UI + logic work locally.
- The simulator can use a timer only while the demo is running; provide pause/reset and deterministic one-step mode for a presentation.
- Derive chart series and KPI cards from the same typed event source to avoid inconsistent numbers.
- Store optional in-session choices in React state. No credentials or remote DB required.
- Prefer a schematic/vector map with clearly fictional markers if a real basemap introduces reliability, key or network issues. If using OpenStreetMap/Leaflet, attribute tiles and gracefully fall back offline; never imply markers are actual trucks.

## UI design direction

- Dark navy/graphite + aqua/teal accent; restrained, clean, engineering-forward.
- Strong type hierarchy; large quantity metrics; status labels must include text/icon, not colour alone.
- Use real chart axes/units; litres and L/min labels; distinguish level/volume and extraction/loading/delivery.
- Map, event chain, discrepancy card and audit timeline should be legible at 1366×768 and 16:9 presentation dimensions.
- Mobile responsiveness is secondary; 1366×768 and 1920×1080 are primary, with a small-screen smoke check.

## Acceptance tests

- `MATCHED` scenario returns zero/within-tolerance discrepancy.
- Scenario B returns expected delta and percentage; formatting does not silently round inputs used by logic.
- Duplicate events never double-count.
- Missing link creates a human-readable reason.
- Stale source state is visible; no fake live claim.
- Reset restores the initial state; next/pause controls work.
- Keyboard navigation works in presentation; links and buttons are accessible.
- All screens carry simulation labeling.
- No console errors and no missing assets; project lint/typecheck/tests/build run successfully if the environment supports them.
- Deliver screenshots or Playwright evidence; do not report tests as passing unless they ran.
