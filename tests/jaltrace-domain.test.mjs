import test from 'node:test';
import assert from 'node:assert/strict';

import {
  cumulativeDelta,
  detectStaleTelemetry,
  evaluateScenario,
  findMissingLinkage,
  getScenarioFixture,
  reconcileExtractionLoading,
  reconcileLoadingDelivery,
  SCENARIO_NAMES,
  validateTelemetry,
} from '../src/lib/jaltrace-engine.mjs';

const linkedRecords = (loadingLitres, deliveryLitres) => ({
  loading: { id: 'loading-test-001', tankerId: 'tanker-test-001', reportedLitres: loadingLitres, sourceEventIds: ['telemetry-test-001'] },
  delivery: { id: 'delivery-test-001', tankerId: 'tanker-test-001', orderId: 'order-test-001', acknowledgedLitres: deliveryLitres, sourceEventIds: ['loading-test-001'] },
});

test('cumulative delta handles exact values, zero, and invalid negative boundaries', () => {
  assert.deepEqual(cumulativeDelta(1000, 1700), { valid: true, litres: 700, reason: null });
  assert.deepEqual(cumulativeDelta(0, 0), { valid: true, litres: 0, reason: null });
  assert.equal(cumulativeDelta(-1, 0).valid, false);
  assert.equal(cumulativeDelta(0, -1).valid, false);
  assert.equal(cumulativeDelta(700, 699).valid, false);
});

test('quantity mismatch reports exactly 700 L and 11.666...% using loading as denominator', () => {
  const result = reconcileLoadingDelivery(linkedRecords(6000, 5300));
  assert.equal(result.loadingLitres, 6000);
  assert.equal(result.deliveryLitres, 5300);
  assert.equal(result.differenceLitres, 700);
  assert.equal(result.signedDifferenceLitres, 700);
  assert.equal(result.differencePercent, (700 / 6000) * 100);
  assert.equal(result.status, 'critical');
});

test('source-to-load reconciliation uses linked telemetry and exposes investigation actions', () => {
  const result = evaluateScenario(getScenarioFixture('source-load-mismatch'));
  assert.equal(result.sourceLoading.sourceLitres, 10000);
  assert.equal(result.sourceLoading.loadingLitres, 8800);
  assert.equal(result.sourceLoading.differenceLitres, 1200);
  assert.equal(result.sourceLoading.differencePercent, 12);
  assert.equal(result.sourceLoading.status, 'critical');
  assert.match(result.sourceLoading.nextActions.join(' '), /calibration/);
  assert.equal(result.reconciliation.status, 'matched');
  assert.equal(result.status, 'critical');
});

test('source-to-load reconciliation refuses unlinked source telemetry instead of guessing', () => {
  const result = reconcileExtractionLoading({
    telemetry: { acceptedReadings: [{ id: 'telemetry-only-001', cumulativeLitres: 1000 }] },
    loading: { id: 'loading-unlinked-001', reportedLitres: 1000, sourceEventIds: ['missing-source-001'] },
  });
  assert.equal(result.status, 'missing');
  assert.match(result.reasons.join(' '), /unavailable source telemetry/);
  assert.equal(result.sourceLitres, null);
});

test('tolerance defaults to 5 percent and 4 percent does not create a false alarm', () => {
  const result = reconcileLoadingDelivery(linkedRecords(6000, 5760));
  assert.equal(result.differencePercent, 4);
  assert.equal(result.status, 'matched');
});

test('reconciliation honors configured tolerance and critical threshold boundaries', () => {
  const warning = reconcileLoadingDelivery({ ...linkedRecords(1000, 940), tolerance: 0.05, criticalThreshold: 0.10 });
  assert.equal(warning.differencePercent, 6);
  assert.equal(warning.status, 'warning');

  const critical = reconcileLoadingDelivery({ ...linkedRecords(1000, 900), tolerance: 0.05, criticalThreshold: 0.10 });
  assert.equal(critical.differencePercent, 10);
  assert.equal(critical.status, 'critical');
});

test('permit status is metadata only when a demo threshold is crossed', () => {
  const result = evaluateScenario(getScenarioFixture('threshold-review'));
  assert.equal(result.status, 'threshold-review');
  assert.deepEqual(result.threshold.permitStatus, { status: 'unknown', verified: false, source: 'not-provided' });
  assert.equal(result.threshold.thresholdBasis, 'demo-threshold');
});

test('cumulative telemetry does not double-count duplicates or out-of-order readings', () => {
  const result = evaluateScenario(getScenarioFixture('duplicate-out-of-order'));
  assert.equal(result.telemetry.duplicateCount, 1);
  assert.equal(result.telemetry.outOfOrderCount, 1);
  assert.equal(result.telemetry.totalDeltaLitres, 600);
  assert.equal(result.telemetry.acceptedReadings.length, 2);
});

test('impossible telemetry is rejected and cannot become a cumulative baseline', () => {
  const result = evaluateScenario(getScenarioFixture('impossible-reading'));
  assert.equal(result.telemetry.impossibleCount, 1);
  assert.equal(result.telemetry.totalDeltaLitres, 0);
  assert.equal(result.status, 'unverified');
});

test('stale detection uses the supplied scenario clock only', () => {
  const stale = detectStaleTelemetry('2026-10-21T08:00:00.000Z', '2026-10-21T08:15:00.000Z', 5 * 60 * 1000);
  assert.equal(stale.stale, true);
  assert.equal(stale.ageMs, 15 * 60 * 1000);
  const fresh = detectStaleTelemetry('2026-10-21T08:10:00.000Z', '2026-10-21T08:15:00.000Z', 5 * 60 * 1000);
  assert.equal(fresh.stale, false);
});

test('missing linkage is explicit and does not fabricate a match', () => {
  const fixture = getScenarioFixture('missing-load');
  const result = evaluateScenario(fixture);
  assert.equal(result.status, 'missing');
  assert.match(result.reconciliation.reasons.join(' '), /No loading record/);
  assert.equal(findMissingLinkage({ delivery: fixture.delivery }).linked, false);
});

test('all named fixtures are deterministic, source-labelled, and stable across runs', () => {
  assert.deepEqual(SCENARIO_NAMES, ['normal-match', 'quantity-mismatch', 'source-load-mismatch', 'missing-load', 'duplicate-out-of-order', 'impossible-reading', 'stale-telemetry', 'threshold-review', 'recovery', 'normal-no-false-alarm']);
  for (const name of SCENARIO_NAMES) {
    const first = evaluateScenario(getScenarioFixture(name));
    const second = evaluateScenario(getScenarioFixture(name));
    assert.deepEqual(first, second, name);
    assert.equal(first.source, 'simulated', name);
    assert.equal(first.provenance.label, 'deterministic-fixture', name);
  }
});

test('scenario outcomes cover match, mismatch, stale, threshold review, recovery, and no false alarm', () => {
  assert.equal(evaluateScenario(getScenarioFixture('normal-match')).status, 'matched');
  assert.equal(evaluateScenario(getScenarioFixture('quantity-mismatch')).status, 'critical');
  assert.equal(evaluateScenario(getScenarioFixture('source-load-mismatch')).status, 'critical');
  assert.equal(evaluateScenario(getScenarioFixture('stale-telemetry')).status, 'stale');
  assert.equal(evaluateScenario(getScenarioFixture('threshold-review')).status, 'threshold-review');
  assert.equal(evaluateScenario(getScenarioFixture('recovery')).status, 'recovered');
  assert.equal(evaluateScenario(getScenarioFixture('normal-no-false-alarm')).status, 'matched');
});

test('telemetry validation accepts zero readings and rejects negative flow', () => {
  const result = validateTelemetry([
    { id: 'zero-001', timestamp: '2026-10-21T16:00:00.000Z', cumulativeLitres: 0, flowRateLpm: 0, pumpState: 'off', source: 'simulated' },
    { id: 'negative-flow-002', timestamp: '2026-10-21T16:01:00.000Z', cumulativeLitres: 0, flowRateLpm: -1, pumpState: 'on', source: 'simulated' },
  ]);
  assert.equal(result.acceptedReadings.length, 1);
  assert.equal(result.totalDeltaLitres, 0);
  assert.equal(result.impossibleCount, 1);
});
