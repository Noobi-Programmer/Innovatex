# JalTrace Deterministic Simulation Design

## 1. Purpose

The simulator demonstrates the evidence-linking decision, not a static set of cards. Every reset must return to the same fixture values so the presenter can repeat the sequence reliably.

All values, entities, locations and routes are **SIMULATED / DEMO DATA**.

## 2. Simulation clock and units

- Base simulated time: `2026-10-23T08:00:00+05:30`.
- Unit of stored volume: litres (`L`).
- Flow rate: litres per minute (`L/min`).
- Timestamps: ISO 8601 with an explicit offset.
- Age: calculated against the scenario clock, not the user’s real wall clock.
- Cumulative volume: monotonically increasing litres.
- Difference percentage denominator: loading litres.

## 3. Scenario catalogue

| ID | Scenario | Key fixture | Expected result |
|---|---|---|---|
| `normal-match` | Normal extraction/load/delivery | Start 120,000 L; end 126,000 L; delivery 5,980 L | `MATCHED`; 20 L / 6,000 L = 0.33%, within 5% tolerance. |
| `quantity-mismatch` | Delivery acknowledgement differs | Loading 6,000 L; delivery acknowledgement 5,300 L | `CRITICAL`; 700 L; 11.67% of loading volume. |
| `missing-load` | Delivery references order but no loading event | Delivery exists; loading event absent | `MISSING`; no fabricated zero. |
| `duplicate-out-of-order` | Duplicate and sequence error | Same event ID appears twice; later sequence timestamp is earlier | `INVALID` / `WARNING`; duplicate excluded from totals. |
| `impossible-reading` | Negative delta or impossible flow | End cumulative less than start, or flow rate below zero | `INVALID`; no derived volume. |
| `stale-telemetry` | Source stops reporting | Last reading older than 15 simulated minutes | `STALE`; last update age visible. |
| `threshold-review` | Configured extraction threshold crossed | Simulated interval exceeds demo threshold | `WARNING`; copy says “threshold crossed — review,” not illegal. |
| `recovery` | Anomaly resolves | Stale source receives fresh valid reading and matching delivery | Status clears to `MATCHED` or `REVIEWED`; audit trail retains prior alert. |
| `normal-no-false-alarm` | Normal variation inside tolerance | Loading 6,000 L; delivery 5,760 L | `MATCHED` at exactly 4%, proving tolerance does not over-alert. |

## 4. Scenario state machine

```text
RESET
  └─ SELECT_SCENARIO
       └─ READY
            ├─ PLAY → STEP* → COMPLETE
            ├─ PAUSE ↔ PLAY
            ├─ INJECT_EVENT → RECOMPUTE
            └─ RESET → READY
```

The reducer is pure. The timer, if used, only advances the presentation state; it does not create random readings.

## 5. Deterministic fixture requirements

- Stable IDs such as `SRC-EC-01`, `TANKER-07`, `ORD-1001` and `DEL-1001` are fictional.
- Every fixture contains source, load, delivery and evidence metadata needed by the rule engine.
- Every scenario has a human-readable expected outcome used by unit tests.
- Scenario transitions never mutate the original fixture object.
- Reset recreates the exact initial object values.
- No `Math.random()` or wall-clock dependency appears in the domain layer.

## 6. Visual demo sequence

Recommended presenter sequence:

1. Start `normal-match`; show the three linked cards and a green `MATCHED` result.
2. Select `quantity-mismatch`; point to `6,000 L loaded`, `5,300 L acknowledged`, `700 L difference`, `11.67% of loading volume`.
3. Select `missing-load`; show the broken link and the `MISSING` explanation.
4. Select `stale-telemetry`; show last update age and no live claim.
5. Select `recovery`; show a fresh reading clearing the stale status while preserving the audit history.

## 7. Provenance display

Each card and timeline row should expose a compact provenance badge:

- `SIMULATED` — all current fixture measurements.
- `USER ENTERED` — future/manual acknowledgement input.
- `DERIVED` — calculation produced by the rule engine.
- `VERIFIED EVIDENCE` — only for a future supplied/checked record; none in the synthetic demo.
- `UNVERIFIED` — missing or self-asserted permit/source data.

## 8. Offline demo rules

- Use local SVG/HTML diagrams instead of required map tiles.
- Do not fetch an external font, image or API at runtime if avoidable.
- Provide a static fallback screenshot/recording plan in the pitch folder after the app is built.
- If an external browser is used for testing, the product itself must still run with network disabled.
