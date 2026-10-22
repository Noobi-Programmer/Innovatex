# JalTrace System Architecture

## 1. Architecture decision

The first release is a **local deterministic web application**. The domain engine is pure TypeScript and is independent of React/UI rendering. This minimizes failure modes and makes the demo reproducible without a backend, credentials or network access.

```text
Presentation deck (/)
        │ launch /demo
        ▼
Simulator UI ──────────────── Research / limitations views
        │
        ▼
Pure domain engine
  - scenario fixtures
  - event validation
  - cumulative-meter deltas
  - linkage checks
  - reconciliation rules
  - audit/provenance derivation
        │
        ▼
Typed in-memory state only

Future field path (planned, not implemented)
ESP32 + flow/pump sensors → local gateway/buffer → authenticated API/MQTT → event registry → same rule engine → dashboard
```

## 2. Proposed application modules

```text
src/
  app/                 routes and presentation shell
  components/          reusable UI cards, timeline, charts, badges
  lib/
    domain.ts          event and status types
    reconciliation.ts  pure calculations and rules
    scenarios.ts       deterministic fixtures and scenario reducers
    provenance.ts      source/evidence labels
    format.ts          units, timestamps and explanations
  styles/              global theme and print styles
tests/                 unit and integration tests
```

The exact framework can adapt to the environment, but the domain module must remain importable without a browser.

## 3. Domain entities

### Source record

```ts
type PermitStatus = 'verified' | 'unverified' | 'missing';

interface SourceRecord {
  id: string;
  label: string;
  geography: string; // fictional demo label, not a real location claim
  permitStatus: PermitStatus;
  permitReference?: string;
  evidenceNote: string;
  provenance: 'simulated' | 'user-entered' | 'verified' | 'unverified';
}
```

### Extraction event

```ts
interface ExtractionEvent {
  id: string;
  sourceId: string;
  timestamp: string;
  cumulativeLitres: number;
  flowRateLpm: number;
  pumpState: 'on' | 'off';
  telemetrySequence: number;
  source: 'simulated' | 'device';
}
```

### Loading event

```ts
interface LoadingEvent {
  id: string;
  orderId: string;
  tankerId: string;
  sourceId: string;
  startCumulativeLitres: number;
  endCumulativeLitres: number;
  reportedLitres: number;
  measurementMethod: 'simulated-meter' | 'operator-entry';
  timestamp: string;
  sourceEventIds: string[];
  provenance: 'simulated' | 'user-entered' | 'derived';
}
```

### Delivery event

```ts
interface DeliveryEvent {
  id: string;
  orderId: string;
  tankerId: string;
  recipientId: string;
  acknowledgedLitres: number;
  measurementMethod: 'simulated-meter' | 'receiver-acknowledgement';
  timestamp: string;
  routeStep?: number;
  sourceEventIds: string[];
  provenance: 'simulated' | 'user-entered' | 'derived';
}
```

### Reconciliation result

```ts
type ResultStatus =
  | 'matched' | 'warning' | 'critical' | 'missing'
  | 'stale' | 'invalid' | 'unverified';

interface ReconciliationResult {
  orderId: string;
  loadingLitres: number | null;
  deliveryLitres: number | null;
  differenceLitres: number | null;
  differencePercent: number | null;
  denominator: 'loadingLitres' | null;
  status: ResultStatus;
  reasons: string[];
  evidence: EvidenceItem[];
}
```

## 4. Rule engine

1. Validate numeric fields are finite and non-negative.
2. Validate cumulative readings are linked to the same source and have `end >= start`.
3. Calculate `loadingLitres = endCumulativeLitres - startCumulativeLitres`.
4. Refuse to compare quantities if the source/order/tanker linkage is missing.
5. Compare loading and delivery quantities only when their methods and linkage are explicit.
6. Calculate `differenceLitres = loadingLitres - deliveryLitres`.
7. Calculate `differencePercent = abs(differenceLitres) / loadingLitres × 100` and label the denominator.
8. Use configurable demo thresholds: `tolerancePercent = 5`, `criticalPercent = 10`.
9. Mark stale telemetry when the last reading age exceeds `staleAfterMinutes = 15` in the deterministic scenario clock.
10. Flag duplicate IDs and out-of-order sequence/timestamps; do not double-count duplicates.
11. Flag configured extraction threshold crossings as `THRESHOLD BREACH — REVIEW`; never translate them into a legal conclusion.
12. Allow a recovery event or reset to clear the alert when the condition is resolved.

## 5. Future hardware interface

The planned hardware path is intentionally an interface boundary, not a dependency:

- ESP32-class controller.
- Compatible flow sensor/flow meter with a documented pulse or serial interface.
- Pump current/state input or relay-state signal.
- Local timestamp and sequence number.
- Local buffering during network outage.
- Gateway upload through an authenticated API or MQTT bridge.
- Device identity and calibration metadata.

The first demo does not specify a brand, sensor, installation cost or calibration accuracy as if selected. A future pilot must choose a meter based on pipe size, pressure, fluid conditions, accuracy class, tamper resistance, power and field calibration.

## 6. Failure handling

| Failure | UI behaviour | Domain behaviour |
|---|---|---|
| Missing load event | Show broken chain link and `MISSING` | Return null quantities; do not treat missing as zero. |
| Stale telemetry | Show last update age and amber status | Mark source state stale; do not call it live. |
| Duplicate event ID | Show duplicate badge | Keep first valid event; exclude duplicate from totals; add reason. |
| Out-of-order timestamp | Show ordering warning | Preserve raw event but mark sequence invalid for automatic reconciliation. |
| Negative delta | Show invalid reading | Reject volume calculation. |
| Impossible flow/rate | Show invalid reading | Keep raw value for audit; exclude from derived volume. |
| No permit evidence | Show `UNVERIFIED` | Do not infer legality; add evidence gap. |
| Connectivity gap | Show buffered/stale state | Future gateway would buffer and replay; simulator shows the state explicitly. |

## 7. Security and privacy

- Use fictional IDs and schematic locations only.
- Do not store real addresses, tanker plates, phone numbers or GPS trails.
- Keep all state in memory for the demo.
- If a future backend is added, use authenticated device identities, role-based access, minimal retention, audit logs and encrypted transport.
- Treat permit/NOC files and source locations as sensitive operational data.
