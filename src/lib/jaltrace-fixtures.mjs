const SOURCE = 'simulated';
const provenance = (scenario) => ({ source: SOURCE, label: 'deterministic-fixture', scenario });
const telemetry = (scenario, rows) => rows.map((row) => ({ ...row, source: SOURCE, provenance: provenance(scenario) }));
const loading = (scenario, row) => ({ ...row, source: SOURCE, provenance: provenance(scenario) });
const delivery = (scenario, row) => ({ ...row, source: SOURCE, provenance: provenance(scenario) });

const FIXTURES = {
  'normal-match': {
    id: 'scenario-normal-match', name: 'normal-match', source: SOURCE, provenance: provenance('normal-match'),
    telemetry: telemetry('normal-match', [
      { id: 'telemetry-normal-001', wellId: 'well-demo-01', timestamp: '2026-10-21T08:00:00.000Z', cumulativeLitres: 10000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-normal-002', wellId: 'well-demo-01', timestamp: '2026-10-21T08:10:00.000Z', cumulativeLitres: 16000, flowRateLpm: 100, pumpState: 'on' },
    ]),
    loading: loading('normal-match', { id: 'loading-normal-001', wellId: 'well-demo-01', tankerId: 'tanker-demo-01', timestamp: '2026-10-21T08:11:00.000Z', startLitres: 10000, endLitres: 16000, reportedLitres: 6000, measurementMethod: 'simulated-meter', sourceEventIds: ['telemetry-normal-001', 'telemetry-normal-002'] }),
    delivery: delivery('normal-match', { id: 'delivery-normal-001', tankerId: 'tanker-demo-01', orderId: 'order-demo-01', recipientId: 'recipient-demo-01', timestamp: '2026-10-21T08:30:00.000Z', acknowledgedLitres: 6000, measurementMethod: 'receiver-acknowledgement', sourceEventIds: ['loading-normal-001'] }),
  },
  'quantity-mismatch': {
    id: 'scenario-quantity-mismatch', name: 'quantity-mismatch', source: SOURCE, provenance: provenance('quantity-mismatch'),
    telemetry: telemetry('quantity-mismatch', [
      { id: 'telemetry-mismatch-001', wellId: 'well-demo-01', timestamp: '2026-10-21T09:00:00.000Z', cumulativeLitres: 20000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-mismatch-002', wellId: 'well-demo-01', timestamp: '2026-10-21T09:10:00.000Z', cumulativeLitres: 26000, flowRateLpm: 100, pumpState: 'on' },
    ]),
    loading: loading('quantity-mismatch', { id: 'loading-mismatch-001', wellId: 'well-demo-01', tankerId: 'tanker-demo-02', timestamp: '2026-10-21T09:11:00.000Z', startLitres: 20000, endLitres: 26000, reportedLitres: 6000, measurementMethod: 'simulated-meter', sourceEventIds: ['telemetry-mismatch-001', 'telemetry-mismatch-002'] }),
    delivery: delivery('quantity-mismatch', { id: 'delivery-mismatch-001', tankerId: 'tanker-demo-02', orderId: 'order-demo-02', recipientId: 'recipient-demo-02', timestamp: '2026-10-21T09:30:00.000Z', acknowledgedLitres: 5300, measurementMethod: 'receiver-acknowledgement', sourceEventIds: ['loading-mismatch-001'] }),
  },
  'source-load-mismatch': {
    id: 'scenario-source-load-mismatch', name: 'source-load-mismatch', source: SOURCE, provenance: provenance('source-load-mismatch'),
    telemetry: telemetry('source-load-mismatch', [
      { id: 'telemetry-source-load-001', wellId: 'well-demo-08', timestamp: '2026-10-21T09:45:00.000Z', cumulativeLitres: 40000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-source-load-002', wellId: 'well-demo-08', timestamp: '2026-10-21T10:05:00.000Z', cumulativeLitres: 50000, flowRateLpm: 500, pumpState: 'on' },
    ]),
    loading: loading('source-load-mismatch', { id: 'loading-source-load-001', wellId: 'well-demo-08', tankerId: 'tanker-demo-08', timestamp: '2026-10-21T10:06:00.000Z', startLitres: 40000, endLitres: 50000, reportedLitres: 8800, measurementMethod: 'simulated-meter', sourceEventIds: ['telemetry-source-load-001', 'telemetry-source-load-002'] }),
    delivery: delivery('source-load-mismatch', { id: 'delivery-source-load-001', tankerId: 'tanker-demo-08', orderId: 'order-demo-08', recipientId: 'recipient-demo-08', timestamp: '2026-10-21T10:25:00.000Z', acknowledgedLitres: 8800, measurementMethod: 'receiver-acknowledgement', sourceEventIds: ['loading-source-load-001'] }),
  },
  'missing-load': {
    id: 'scenario-missing-load', name: 'missing-load', source: SOURCE, provenance: provenance('missing-load'), telemetry: [],
    delivery: delivery('missing-load', { id: 'delivery-missing-load-001', tankerId: 'tanker-demo-03', orderId: 'order-demo-03', recipientId: 'recipient-demo-03', timestamp: '2026-10-21T10:30:00.000Z', acknowledgedLitres: 4000, measurementMethod: 'receiver-acknowledgement', sourceEventIds: ['unresolved-loading-demo-03'] }),
  },
  'duplicate-out-of-order': {
    id: 'scenario-duplicate-out-of-order', name: 'duplicate-out-of-order', source: SOURCE, provenance: provenance('duplicate-out-of-order'),
    telemetry: telemetry('duplicate-out-of-order', [
      { id: 'telemetry-sequence-001', wellId: 'well-demo-02', timestamp: '2026-10-21T11:00:00.000Z', cumulativeLitres: 1000, flowRateLpm: 100, pumpState: 'on' },
      { id: 'telemetry-sequence-001', wellId: 'well-demo-02', timestamp: '2026-10-21T11:01:00.000Z', cumulativeLitres: 1000, flowRateLpm: 100, pumpState: 'on' },
      { id: 'telemetry-sequence-003', wellId: 'well-demo-02', timestamp: '2026-10-21T10:59:00.000Z', cumulativeLitres: 900, flowRateLpm: 100, pumpState: 'on' },
      { id: 'telemetry-sequence-004', wellId: 'well-demo-02', timestamp: '2026-10-21T11:02:00.000Z', cumulativeLitres: 1600, flowRateLpm: 100, pumpState: 'on' },
    ]),
  },
  'impossible-reading': {
    id: 'scenario-impossible-reading', name: 'impossible-reading', source: SOURCE, provenance: provenance('impossible-reading'),
    telemetry: telemetry('impossible-reading', [
      { id: 'telemetry-impossible-001', wellId: 'well-demo-03', timestamp: '2026-10-21T12:00:00.000Z', cumulativeLitres: 3000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-impossible-002', wellId: 'well-demo-03', timestamp: '2026-10-21T12:01:00.000Z', cumulativeLitres: -50, flowRateLpm: 50, pumpState: 'on' },
    ]),
  },
  'stale-telemetry': {
    id: 'scenario-stale-telemetry', name: 'stale-telemetry', source: SOURCE, provenance: provenance('stale-telemetry'),
    telemetry: telemetry('stale-telemetry', [{ id: 'telemetry-stale-001', wellId: 'well-demo-04', timestamp: '2026-10-21T08:00:00.000Z', cumulativeLitres: 7000, flowRateLpm: 0, pumpState: 'off' }]),
    clock: { lastTimestamp: '2026-10-21T08:00:00.000Z', scenarioNow: '2026-10-21T08:15:00.000Z', maxAgeMs: 5 * 60 * 1000 },
  },
  'threshold-review': {
    id: 'scenario-threshold-review', name: 'threshold-review', source: SOURCE, provenance: provenance('threshold-review'),
    telemetry: telemetry('threshold-review', [
      { id: 'telemetry-threshold-001', wellId: 'well-demo-05', timestamp: '2026-10-21T13:00:00.000Z', cumulativeLitres: 10000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-threshold-002', wellId: 'well-demo-05', timestamp: '2026-10-21T13:30:00.000Z', cumulativeLitres: 22000, flowRateLpm: 400, pumpState: 'on' },
    ]),
    threshold: { extractedLitres: 12000, thresholdLitres: 10000, permit: { status: 'unknown', verified: false, source: 'not-provided' } },
  },
  recovery: {
    id: 'scenario-recovery', name: 'recovery', source: SOURCE, provenance: provenance('recovery'),
    telemetry: telemetry('recovery', [
      { id: 'telemetry-recovery-001', wellId: 'well-demo-06', timestamp: '2026-10-21T14:00:00.000Z', cumulativeLitres: 5000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-recovery-002', wellId: 'well-demo-06', timestamp: '2026-10-21T14:16:00.000Z', cumulativeLitres: 5000, flowRateLpm: 0, pumpState: 'off' },
    ]),
    recovery: {
      before: { lastTimestamp: '2026-10-21T14:00:00.000Z', scenarioNow: '2026-10-21T14:15:00.000Z', maxAgeMs: 5 * 60 * 1000 },
      after: { lastTimestamp: '2026-10-21T14:16:00.000Z', scenarioNow: '2026-10-21T14:17:00.000Z', maxAgeMs: 5 * 60 * 1000 },
    },
  },
  'normal-no-false-alarm': {
    id: 'scenario-normal-no-false-alarm', name: 'normal-no-false-alarm', source: SOURCE, provenance: provenance('normal-no-false-alarm'),
    telemetry: telemetry('normal-no-false-alarm', [
      { id: 'telemetry-no-alarm-001', wellId: 'well-demo-07', timestamp: '2026-10-21T15:00:00.000Z', cumulativeLitres: 30000, flowRateLpm: 0, pumpState: 'off' },
      { id: 'telemetry-no-alarm-002', wellId: 'well-demo-07', timestamp: '2026-10-21T15:10:00.000Z', cumulativeLitres: 36000, flowRateLpm: 100, pumpState: 'on' },
    ]),
    loading: loading('normal-no-false-alarm', { id: 'loading-no-alarm-001', wellId: 'well-demo-07', tankerId: 'tanker-demo-07', timestamp: '2026-10-21T15:11:00.000Z', startLitres: 30000, endLitres: 36000, reportedLitres: 6000, measurementMethod: 'simulated-meter', sourceEventIds: ['telemetry-no-alarm-001', 'telemetry-no-alarm-002'] }),
    delivery: delivery('normal-no-false-alarm', { id: 'delivery-no-alarm-001', tankerId: 'tanker-demo-07', orderId: 'order-demo-07', recipientId: 'recipient-demo-07', timestamp: '2026-10-21T15:30:00.000Z', acknowledgedLitres: 5760, measurementMethod: 'receiver-acknowledgement', sourceEventIds: ['loading-no-alarm-001'] }),
  },
};

export const SCENARIO_NAMES = Object.freeze(Object.keys(FIXTURES));
const clone = (value) => structuredClone(value);
export function getScenarioFixture(name) {
  if (!Object.prototype.hasOwnProperty.call(FIXTURES, name)) throw new Error(`Unknown JalTrace scenario: ${name}`);
  return clone(FIXTURES[name]);
}
export function getAllScenarioFixtures() { return SCENARIO_NAMES.map(getScenarioFixture); }
export const JALTRACE_FIXTURES = Object.freeze(Object.fromEntries(SCENARIO_NAMES.map((name) => [name, getScenarioFixture(name)])));
