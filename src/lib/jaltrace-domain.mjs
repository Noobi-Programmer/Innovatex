/**
 * Deterministic JalTrace domain engine.
 *
 * The module intentionally has no browser, network, or clock dependencies.
 * Callers provide all readings, tolerances, timestamps, and scenario clocks.
 */

/** @typedef {'simulated'|'device'|'operator-entry'|'receiver-acknowledgement'} SourceLabel */
/** @typedef {'matched'|'warning'|'critical'|'missing'|'unverified'|'stale'|'threshold-review'|'recovered'} DomainStatus */
/** @typedef {{id:string, wellId:string, timestamp:string, cumulativeLitres:number, flowRateLpm:number, pumpState:'on'|'off', source:SourceLabel, provenance:object}} ExtractionEvent */
/** @typedef {{id:string, wellId:string, tankerId:string, timestamp:string, startLitres:number, endLitres:number, reportedLitres:number, measurementMethod:string, sourceEventIds:string[], source:SourceLabel, provenance:object}} LoadingEvent */
/** @typedef {{id:string, tankerId:string, orderId:string, recipientId:string, timestamp:string, acknowledgedLitres:number, measurementMethod:string, sourceEventIds:string[], source:SourceLabel, provenance:object}} DeliveryEvent */

export const DEFAULT_RECONCILIATION_OPTIONS = Object.freeze({
  tolerance: 0.05,
  criticalThreshold: 0.10,
});

export const DEFAULT_STALE_AFTER_MS = 5 * 60 * 1000;

const finiteNumber = (value) => typeof value === 'number' && Number.isFinite(value);

const numberFromReading = (value) => {
  if (finiteNumber(value)) return value;
  if (value && finiteNumber(value.cumulativeLitres)) return value.cumulativeLitres;
  return null;
};

const isoTimestampMs = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};

const normalizeFraction = (value, fallback) => {
  if (!finiteNumber(value) || value < 0) return fallback;
  if (value <= 1) return value;
  return value <= 100 ? value / 100 : fallback;
};

const sourceOf = (value, fallback = 'simulated') => (
  value && typeof value.source === 'string' ? value.source : fallback
);

/**
 * Calculate the delta between two cumulative meter readings.
 * Negative starts, negative ends, decreasing meters, and non-numeric values
 * are invalid and never produce a usable volume.
 *
 * @param {number|{cumulativeLitres:number}} startReading
 * @param {number|{cumulativeLitres:number}} endReading
 * @returns {{valid:boolean, litres:number|null, reason:string|null}}
 */
export function cumulativeDelta(startReading, endReading) {
  const start = numberFromReading(startReading);
  const end = numberFromReading(endReading);

  if (start === null || end === null) {
    return { valid: false, litres: null, reason: 'Cumulative readings must be finite numbers.' };
  }
  if (start < 0 || end < 0) {
    return { valid: false, litres: null, reason: 'Cumulative readings cannot be negative.' };
  }
  if (end < start) {
    return { valid: false, litres: null, reason: 'Cumulative meter moved backwards.' };
  }

  return { valid: true, litres: end - start, reason: null };
}

export const calculateCumulativeDelta = cumulativeDelta;

/**
 * Return linkage gaps between loading and delivery. It does not infer legal or
 * permit status.
 * @param {{loading?: object|null, delivery?: object|null}} records
 */
export function findMissingLinkage({ loading = null, delivery = null } = {}) {
  const reasons = [];

  if (!loading) reasons.push('No loading record is linked to the delivery.');
  if (!delivery) reasons.push('No delivery record is available.');
  if (loading && !loading.id) reasons.push('Loading record is missing an id.');
  if (delivery && !delivery.id) reasons.push('Delivery record is missing an id.');
  if (loading && !loading.tankerId) reasons.push('Loading record is missing tanker linkage.');
  if (delivery && !delivery.tankerId) reasons.push('Delivery record is missing tanker linkage.');
  if (loading && delivery && loading.tankerId && delivery.tankerId && loading.tankerId !== delivery.tankerId) {
    reasons.push('Loading and delivery tanker IDs do not match.');
  }
  if (delivery && !delivery.orderId) reasons.push('Delivery record is missing order linkage.');
  if (loading && (!Array.isArray(loading.sourceEventIds) || loading.sourceEventIds.length === 0)) {
    reasons.push('Loading record has no source event linkage.');
  }
  if (delivery && (!Array.isArray(delivery.sourceEventIds) || delivery.sourceEventIds.length === 0)) {
    reasons.push('Delivery record has no source event linkage.');
  }

  return { linked: reasons.length === 0, status: reasons.length === 0 ? 'matched' : 'missing', reasons };
}

const loadingLitresFrom = (loading) => {
  if (!loading) return { valid: false, litres: null, reason: 'Loading record is missing.' };
  if (finiteNumber(loading.reportedLitres)) {
    if (loading.reportedLitres < 0) return { valid: false, litres: null, reason: 'Loading volume cannot be negative.' };
    return { valid: true, litres: loading.reportedLitres, reason: null };
  }
  if (finiteNumber(loading.startLitres) && finiteNumber(loading.endLitres)) {
    return cumulativeDelta(loading.startLitres, loading.endLitres);
  }
  return { valid: false, litres: null, reason: 'Loading record has no usable volume.' };
};

const deliveryLitresFrom = (delivery) => {
  if (!delivery) return { valid: false, litres: null, reason: 'Delivery record is missing.' };
  if (!finiteNumber(delivery.acknowledgedLitres)) return { valid: false, litres: null, reason: 'Delivery acknowledgement has no usable volume.' };
  if (delivery.acknowledgedLitres < 0) return { valid: false, litres: null, reason: 'Delivery volume cannot be negative.' };
  return { valid: true, litres: delivery.acknowledgedLitres, reason: null };
};

const safeReconciliationLimits = (tolerance, criticalThreshold) => {
  const safeTolerance = normalizeFraction(tolerance, DEFAULT_RECONCILIATION_OPTIONS.tolerance);
  const safeCriticalThreshold = Math.max(
    safeTolerance,
    normalizeFraction(criticalThreshold, DEFAULT_RECONCILIATION_OPTIONS.criticalThreshold),
  );
  return { safeTolerance, safeCriticalThreshold };
};

const compareVolumes = ({ referenceLitres, observedLitres, referenceLabel, observedLabel, tolerance, criticalThreshold }) => {
  const { safeTolerance, safeCriticalThreshold } = safeReconciliationLimits(tolerance, criticalThreshold);
  const signedDifferenceLitres = referenceLitres - observedLitres;
  const differenceLitres = Math.abs(signedDifferenceLitres);
  const differenceRatio = referenceLitres === 0
    ? (observedLitres === 0 ? 0 : Infinity)
    : differenceLitres / referenceLitres;
  const differencePercent = differenceRatio * 100;

  let status = 'matched';
  if (differenceRatio > safeTolerance && differenceRatio < safeCriticalThreshold) status = 'warning';
  if (differenceRatio >= safeCriticalThreshold) status = 'critical';

  const reasons = [];
  const nextActions = [];
  if (status === 'matched') {
    reasons.push(`${observedLabel} is within ${(safeTolerance * 100).toFixed(2)}% tolerance of ${referenceLabel}.`);
  } else {
    const direction = signedDifferenceLitres >= 0 ? 'below' : 'above';
    reasons.push(`${observedLitres} L ${observedLabel} is ${direction} ${referenceLabel}; difference is ${differencePercent.toFixed(6)}% of ${referenceLabel}.`);
    if (status === 'critical') reasons.push(`Difference meets or exceeds the ${(safeCriticalThreshold * 100).toFixed(2)}% critical threshold.`);
    nextActions.push(`Check ${referenceLabel} and ${observedLabel} meter calibration and units.`);
    nextActions.push('Confirm the timestamps and event IDs refer to the same fill or delivery.');
    nextActions.push('Check retained water, spills, line storage and manual-entry errors before escalating.');
  }

  return {
    signedDifferenceLitres,
    differenceLitres,
    differenceRatio,
    differencePercent,
    status,
    reasons,
    nextActions,
    tolerance: safeTolerance,
    criticalThreshold: safeCriticalThreshold,
  };
};

/**
 * Reconcile loading quantity against delivery acknowledgement.
 * differenceLitres is absolute; signedDifferenceLitres is loading minus delivery.
 * @param {{loading?: object|null, delivery?: object|null, tolerance?: number, criticalThreshold?: number}} input
 */
export function reconcileLoadingDelivery({
  loading = null,
  delivery = null,
  tolerance = DEFAULT_RECONCILIATION_OPTIONS.tolerance,
  criticalThreshold = DEFAULT_RECONCILIATION_OPTIONS.criticalThreshold,
} = {}) {
  const linkage = findMissingLinkage({ loading, delivery });
  const loadingValue = loadingLitresFrom(loading);
  const deliveryValue = deliveryLitresFrom(delivery);
  const reasons = [...linkage.reasons];

  if (!loadingValue.valid && loadingValue.reason && !reasons.includes(loadingValue.reason)) reasons.push(loadingValue.reason);
  if (!deliveryValue.valid && deliveryValue.reason && !reasons.includes(deliveryValue.reason)) reasons.push(deliveryValue.reason);

  if (!loadingValue.valid || !deliveryValue.valid || !linkage.linked) {
    return {
      loadingLitres: loadingValue.litres,
      deliveryLitres: deliveryValue.litres,
      differenceLitres: null,
      signedDifferenceLitres: null,
      differencePercent: null,
      status: 'missing',
      reasons,
      tolerance,
      criticalThreshold,
      source: sourceOf(loading || delivery),
      provenance: { loadingId: loading?.id ?? null, deliveryId: delivery?.id ?? null },
    };
  }

  const comparison = compareVolumes({
    referenceLitres: loadingValue.litres,
    observedLitres: deliveryValue.litres,
    referenceLabel: 'loading volume',
    observedLabel: 'delivery acknowledgement',
    tolerance,
    criticalThreshold,
  });
  reasons.push(...comparison.reasons);

  return {
    loadingLitres: loadingValue.litres,
    deliveryLitres: deliveryValue.litres,
    differenceLitres: comparison.differenceLitres,
    signedDifferenceLitres: comparison.signedDifferenceLitres,
    differencePercent: comparison.differencePercent,
    differenceRatio: comparison.differenceRatio,
    status: comparison.status,
    reasons,
    nextActions: comparison.nextActions,
    tolerance: comparison.tolerance,
    criticalThreshold: comparison.criticalThreshold,
    source: sourceOf(loading || delivery),
    provenance: {
      loadingId: loading.id,
      deliveryId: delivery.id,
      loadingSourceEventIds: [...loading.sourceEventIds],
      deliverySourceEventIds: [...delivery.sourceEventIds],
    },
  };
}

/**
 * Reconcile accepted extraction telemetry against a linked loading event.
 * The loading event must name the source telemetry IDs; the engine never
 * guesses which readings belong to a fill.
 * @param {{telemetry?: object|null, loading?: object|null, tolerance?: number, criticalThreshold?: number}} input
 */
export function reconcileExtractionLoading({
  telemetry = null,
  loading = null,
  tolerance = DEFAULT_RECONCILIATION_OPTIONS.tolerance,
  criticalThreshold = DEFAULT_RECONCILIATION_OPTIONS.criticalThreshold,
} = {}) {
  const reasons = [];
  const sourceEventIds = Array.isArray(loading?.sourceEventIds) ? loading.sourceEventIds : [];
  const acceptedReadings = Array.isArray(telemetry?.acceptedReadings) ? telemetry.acceptedReadings : [];

  if (!loading) reasons.push('No loading record is available to reconcile against extraction telemetry.');
  if (sourceEventIds.length === 0) reasons.push('Loading record has no source telemetry linkage.');

  const acceptedById = new Map(acceptedReadings.map((reading) => [reading.id, reading]));
  const linkedReadings = sourceEventIds.map((id) => acceptedById.get(id)).filter(Boolean);
  const missingSourceIds = sourceEventIds.filter((id) => !acceptedById.has(id));
  if (missingSourceIds.length > 0) reasons.push(`Loading record references unavailable source telemetry: ${missingSourceIds.join(', ')}.`);
  if (linkedReadings.length < 2) reasons.push('At least two accepted source telemetry readings are required to calculate extraction volume.');

  if (!loading || sourceEventIds.length === 0 || missingSourceIds.length > 0 || linkedReadings.length < 2) {
    return {
      sourceLitres: null,
      loadingLitres: null,
      differenceLitres: null,
      signedDifferenceLitres: null,
      differencePercent: null,
      status: 'missing',
      reasons,
      nextActions: [
        'Confirm the loading record exists and contains the source telemetry IDs for the same fill.',
        'Restore or review rejected source readings before treating the chain as complete.',
      ],
      tolerance,
      criticalThreshold,
      source: loading?.source ?? telemetry?.source ?? 'simulated',
      provenance: { loadingId: loading?.id ?? null, sourceEventIds, acceptedTelemetryIds: linkedReadings.map((reading) => reading.id) },
    };
  }

  const sourceDelta = cumulativeDelta(linkedReadings[0].cumulativeLitres, linkedReadings.at(-1).cumulativeLitres);
  if (!sourceDelta.valid) {
    return {
      sourceLitres: null,
      loadingLitres: null,
      differenceLitres: null,
      signedDifferenceLitres: null,
      differencePercent: null,
      status: 'unverified',
      reasons: [...reasons, sourceDelta.reason],
      nextActions: ['Review the linked source readings for meter resets, clock problems or impossible cumulative values.'],
      tolerance,
      criticalThreshold,
      source: loading?.source ?? telemetry?.source ?? 'simulated',
      provenance: { loadingId: loading.id, sourceEventIds, acceptedTelemetryIds: linkedReadings.map((reading) => reading.id) },
    };
  }

  const loadingValue = loadingLitresFrom(loading);
  if (!loadingValue.valid) {
    return {
      sourceLitres: sourceDelta.litres,
      loadingLitres: null,
      differenceLitres: null,
      signedDifferenceLitres: null,
      differencePercent: null,
      status: 'missing',
      reasons: [...reasons, loadingValue.reason],
      nextActions: ['Add a usable loading quantity or loading-meter delta before comparing source and load.'],
      tolerance,
      criticalThreshold,
      source: loading?.source ?? telemetry?.source ?? 'simulated',
      provenance: { loadingId: loading.id, sourceEventIds, acceptedTelemetryIds: linkedReadings.map((reading) => reading.id) },
    };
  }

  const comparison = compareVolumes({
    referenceLitres: sourceDelta.litres,
    observedLitres: loadingValue.litres,
    referenceLabel: 'extraction volume',
    observedLabel: 'loading volume',
    tolerance,
    criticalThreshold,
  });
  return {
    sourceLitres: sourceDelta.litres,
    loadingLitres: loadingValue.litres,
    differenceLitres: comparison.differenceLitres,
    signedDifferenceLitres: comparison.signedDifferenceLitres,
    differencePercent: comparison.differencePercent,
    differenceRatio: comparison.differenceRatio,
    status: comparison.status,
    reasons: [...reasons, ...comparison.reasons],
    nextActions: comparison.nextActions,
    tolerance: comparison.tolerance,
    criticalThreshold: comparison.criticalThreshold,
    source: loading?.source ?? telemetry?.source ?? 'simulated',
    provenance: { loadingId: loading.id, sourceEventIds, acceptedTelemetryIds: linkedReadings.map((reading) => reading.id) },
  };
}

/**
 * Validate telemetry in arrival order. Duplicate IDs and out-of-order readings
 * are rejected from accumulation, so they cannot double-count a meter.
 * @param {Array<object>} readings
 * @param {{maxFlowRateLpm?: number}} options
 */
export function validateTelemetry(readings = [], { maxFlowRateLpm = Infinity } = {}) {
  const issues = [];
  const acceptedReadings = [];
  const seenIds = new Set();
  let previous = null;
  let totalDeltaLitres = 0;

  if (!Array.isArray(readings)) {
    return {
      valid: false,
      acceptedReadings,
      issues: [{ code: 'invalid-input', message: 'Telemetry readings must be an array.' }],
      totalDeltaLitres,
      duplicateCount: 0,
      outOfOrderCount: 0,
      impossibleCount: 1,
    };
  }

  for (const reading of readings) {
    const id = reading?.id ?? null;
    if (!id) {
      issues.push({ code: 'impossible', readingId: id, message: 'Telemetry reading is missing an id.' });
      continue;
    }
    if (seenIds.has(id)) {
      issues.push({ code: 'duplicate', readingId: id, message: `Duplicate telemetry id: ${id}.` });
      continue;
    }
    seenIds.add(id);

    const timestampMs = isoTimestampMs(reading.timestamp);
    const cumulative = reading.cumulativeLitres;
    const flowRate = reading.flowRateLpm;
    if (timestampMs === null || !finiteNumber(cumulative) || !finiteNumber(flowRate) || cumulative < 0 || flowRate < 0 || flowRate > maxFlowRateLpm) {
      issues.push({ code: 'impossible', readingId: id, message: `Impossible telemetry reading: ${id}.` });
      continue;
    }
    if (reading.pumpState !== 'on' && reading.pumpState !== 'off') {
      issues.push({ code: 'impossible', readingId: id, message: `Unknown pump state for telemetry id: ${id}.` });
      continue;
    }
    if (reading.pumpState === 'off' && flowRate > 0) {
      issues.push({ code: 'impossible', readingId: id, message: `Pump is off while flow is ${flowRate} L/min.` });
      continue;
    }
    if (previous && timestampMs < previous.timestampMs) {
      issues.push({ code: 'out-of-order', readingId: id, message: `Telemetry timestamp is earlier than the preceding accepted reading: ${id}.` });
      continue;
    }
    if (previous && cumulative < previous.cumulativeLitres) {
      issues.push({ code: 'impossible', readingId: id, message: `Cumulative meter moved backwards at telemetry id: ${id}.` });
      continue;
    }

    const delta = previous ? cumulativeDelta(previous.cumulativeLitres, cumulative) : { valid: true, litres: 0 };
    if (!delta.valid) {
      issues.push({ code: 'impossible', readingId: id, message: delta.reason });
      continue;
    }
    acceptedReadings.push({ ...reading });
    totalDeltaLitres += delta.litres;
    previous = { timestampMs, cumulativeLitres: cumulative };
  }

  const duplicateCount = issues.filter((issue) => issue.code === 'duplicate').length;
  const outOfOrderCount = issues.filter((issue) => issue.code === 'out-of-order').length;
  const impossibleCount = issues.filter((issue) => issue.code === 'impossible').length;
  return {
    valid: issues.length === 0,
    acceptedReadings,
    issues,
    totalDeltaLitres,
    duplicateCount,
    outOfOrderCount,
    impossibleCount,
    source: acceptedReadings[0]?.source ?? readings[0]?.source ?? 'simulated',
  };
}

/** Detect stale telemetry against a caller-supplied scenario clock. */
export function detectStaleTelemetry(lastTimestamp, scenarioNow, maxAgeMs = DEFAULT_STALE_AFTER_MS) {
  const lastMs = isoTimestampMs(lastTimestamp);
  const nowMs = isoTimestampMs(scenarioNow);
  const safeMaxAge = finiteNumber(maxAgeMs) && maxAgeMs >= 0 ? maxAgeMs : DEFAULT_STALE_AFTER_MS;

  if (lastMs === null || nowMs === null) {
    return { stale: true, status: 'stale', ageMs: null, maxAgeMs: safeMaxAge, reason: 'Telemetry or scenario clock timestamp is invalid.' };
  }
  const ageMs = Math.max(0, nowMs - lastMs);
  if (nowMs < lastMs) {
    return { stale: false, status: 'fresh', ageMs: 0, maxAgeMs: safeMaxAge, reason: 'Scenario clock precedes the last telemetry reading.' };
  }
  const stale = ageMs > safeMaxAge;
  return {
    stale,
    status: stale ? 'stale' : 'fresh',
    ageMs,
    maxAgeMs: safeMaxAge,
    reason: stale ? `Last telemetry is ${ageMs} ms old.` : `Last telemetry is ${ageMs} ms old and within freshness window.`,
  };
}

/** Permit information is carried as metadata only and is never inferred. */
export function permitStatusMetadata(permit = null) {
  if (!permit) return { status: 'not-provided', verified: false, source: 'not-provided' };
  return {
    status: typeof permit.status === 'string' ? permit.status : 'unknown',
    verified: permit.verified === true,
    source: typeof permit.source === 'string' ? permit.source : 'unknown',
    ...(finiteNumber(permit.limitLitres) ? { limitLitres: permit.limitLitres } : {}),
  };
}

export function evaluateExtractionThreshold({ extractedLitres, thresholdLitres, permit = null } = {}) {
  const safePermit = permitStatusMetadata(permit);
  if (!finiteNumber(extractedLitres) || !finiteNumber(thresholdLitres) || extractedLitres < 0 || thresholdLitres < 0) {
    return {
      breached: false,
      status: 'unverified',
      extractedLitres: null,
      thresholdLitres: null,
      permitStatus: safePermit,
      reasons: ['Extraction and threshold values must be finite, non-negative numbers.'],
    };
  }
  const breached = extractedLitres > thresholdLitres;
  return {
    breached,
    status: breached ? 'threshold-review' : 'matched',
    extractedLitres,
    thresholdLitres,
    permitStatus: safePermit,
    reasons: [breached ? 'Demo threshold crossed — review required.' : 'Extraction is at or below the demo threshold.'],
    thresholdBasis: 'demo-threshold',
  };
}

const STATUS_PRIORITY = Object.freeze({
  critical: 70,
  missing: 60,
  'threshold-review': 50,
  stale: 45,
  warning: 40,
  unverified: 30,
  recovered: 20,
  matched: 10,
});

const mostSevereStatus = (statuses) => statuses
  .filter(Boolean)
  .sort((left, right) => (STATUS_PRIORITY[right] ?? 0) - (STATUS_PRIORITY[left] ?? 0))[0] ?? 'matched';

/** Evaluate one deterministic fixture into renderable evidence. */
export function evaluateScenario(fixture, options = {}) {
  const telemetry = validateTelemetry(fixture.telemetry ?? [], options.telemetry);
  const result = {
    scenarioId: fixture.id,
    scenario: fixture.name,
      source: fixture.source ?? 'simulated',
      provenance: fixture.provenance ?? null,
      telemetry,
  };

  if (fixture.loading) {
    result.sourceLoading = reconcileExtractionLoading({
      telemetry,
      loading: fixture.loading,
      tolerance: options.tolerance,
      criticalThreshold: options.criticalThreshold,
    });
  }
  if (fixture.loading || fixture.delivery) {
    result.reconciliation = reconcileLoadingDelivery({
      loading: fixture.loading ?? null,
      delivery: fixture.delivery ?? null,
      tolerance: options.tolerance,
      criticalThreshold: options.criticalThreshold,
    });
  }
  if (fixture.clock?.lastTimestamp && fixture.clock?.scenarioNow) {
    result.freshness = detectStaleTelemetry(fixture.clock.lastTimestamp, fixture.clock.scenarioNow, fixture.clock.maxAgeMs);
  }
  if (fixture.threshold) result.threshold = evaluateExtractionThreshold(fixture.threshold);
  if (fixture.recovery) {
    result.recovery = {
      before: detectStaleTelemetry(fixture.recovery.before.lastTimestamp, fixture.recovery.before.scenarioNow, fixture.recovery.before.maxAgeMs),
      after: detectStaleTelemetry(fixture.recovery.after.lastTimestamp, fixture.recovery.after.scenarioNow, fixture.recovery.after.maxAgeMs),
    };
    result.status = result.recovery.after.stale ? 'stale' : 'recovered';
  } else {
    result.status = mostSevereStatus([
      result.sourceLoading?.status,
      result.reconciliation?.status,
      result.threshold?.status,
      result.freshness?.stale ? 'stale' : null,
      telemetry.issues.length > 0 ? 'unverified' : null,
    ]);
  }

  return result;
}
