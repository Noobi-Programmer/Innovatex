# JalTrace Test Plan

## 1. Test objectives

Verify the pure reconciliation logic first, then the simulator controls, then the five-slide presentation and finally the actual browser build. A test is only marked passed after the command or interaction has run successfully.

## 2. Unit-test cases

### Volume and percentage calculations

- cumulative delta is `end - start`;
- cumulative values are not summed;
- `6,000` vs `5,300` yields `700` L and `11.666…%` using loading litres as denominator;
- zero or missing loading volume does not divide by zero;
- negative delta is invalid;
- rounding is applied only to display, not to the comparison calculation;
- exactly 5% difference is within tolerance;
- 5.01% is warning; above 10% is critical under demo configuration.

### Event integrity

- duplicate IDs are excluded from totals;
- out-of-order timestamps/sequence numbers produce a reason;
- missing linked events produce `MISSING`/`UNVERIFIED`;
- invalid flow values are rejected;
- stale age uses the scenario clock and configured threshold;
- recovery clears the current alert while preserving prior audit records.

### Provenance and safety

- simulated values are never emitted as `device`;
- an unverified permit status never becomes `verified` through a QR/ID string;
- a threshold crossing emits review copy, not illegal/fraud copy;
- acknowledgement is not displayed as measured unless its method says meter.

## 3. Scenario contract tests

For each scenario fixture, assert:

| Scenario | Required assertion |
|---|---|
| Normal match | `status === matched`; difference within tolerance; no false alarm. |
| Quantity mismatch | exact 700 L difference and percentage close to 11.6667%; critical reason present. |
| Missing load | no loading quantity; missing-link reason present. |
| Duplicate/out-of-order | duplicate not double-counted; ordering reason present. |
| Impossible reading | invalid status; no negative quantity. |
| Stale telemetry | stale status; age visible; no `live` label. |
| Threshold review | review status; configured threshold explanation; no legal conclusion. |
| Recovery | current status clears after valid fresh event; history still contains anomaly. |
| Normal-no-false-alarm | 4% difference remains matched. |

## 4. UI integration checks

- presentation opens on Slide 1;
- Next, Previous, Home, End and Arrow/Page keys work;
- slide progress indicator updates;
- Slide 4 opens or embeds `/demo`;
- selecting a scenario recomputes cards, chart, chain and audit timeline from the same fixture;
- Play/Pause/Step/Reset behave consistently;
- all buttons have accessible names and visible focus;
- `SIMULATION MODE — DEMO DATA` is visible on simulator views;
- charts have units and labels;
- research citations and limitation copy are reachable;
- no external service is required for initial render.

## 5. Build checks

Run only scripts actually present in `package.json`. The intended minimum after implementation is:

```text
npm run lint
npm run typecheck
npm test
npm run build
```

If a script does not exist, add the smallest meaningful equivalent or record it as unavailable; never create a no-op script just to produce a green result.

## 6. Browser validation

Preferred: Playwright MCP after the workspace MCP connection and browser binary are available. Otherwise use a local Playwright script or manual browser inspection.

Required browser checks:

1. Open local app at the actual port.
2. Capture Slide 1 and Slide 4 at 1366×768 or 16:9.
3. Navigate through all slides with keyboard.
4. Run normal → mismatch → missing → stale → recovery.
5. Inspect console for errors and missing assets.
6. Verify print stylesheet or export instructions if implemented.

Current environment limitation: the official Playwright MCP server is running, but OmniRush connection and browser launch are not yet verified. See `setup/MCP_SETUP_REPORT.md`.

## 7. Definition of done for testing

- Pure domain tests run and pass.
- Scenario contract tests run and pass.
- Build/type/lint checks run with recorded results.
- The actual local app is opened in a browser or the browser blocker is documented.
- Screenshots or a backup demo are created only after they are actually captured.
- Any failed or skipped check remains visible in the handoff.
