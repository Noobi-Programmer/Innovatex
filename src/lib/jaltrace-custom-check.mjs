/**
 * Operator custom check.
 *
 * Lets a person enter loading/delivery values and run the same reconciliation
 * rules the fixtures use. The module is pure: no DOM, network, or clock access,
 * so it can be tested with `node --test`.
 *
 * Entered values are operator input, never sensor measurements. Nothing here
 * certifies legality, quantity transfer, or water quality.
 */

import { reconcileLoadingDelivery } from './jaltrace-domain.mjs';

export const CUSTOM_LINKAGE_MODES = Object.freeze(['linked', 'missing-loading', 'tanker-mismatch']);

export const DEFAULT_CUSTOM_INPUT = Object.freeze({
  loadingLitres: '6000',
  deliveryLitres: '5300',
  tolerancePercent: '5',
  tankerId: 'TKR-DEMO-01',
  linkageMode: 'linked',
});

export const CUSTOM_PROVENANCE = Object.freeze({
  source: 'operator-entry',
  label: 'operator-entered demo input',
  measured: false,
  certified: false,
  note: 'Values typed by the operator. Not a sensor measurement and not proof that any physical transfer happened.',
});

const TANKER_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{0,19}$/;

const parseNumber = (raw) => {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string' && raw.trim() !== '') {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : NaN;
  }
  return NaN;
};

/** Parse a litres field. Returns {value, error}; error is null when usable. */
export function parseLitresInput(raw, label, { allowZero = true } = {}) {
  const value = parseNumber(raw);
  if (Number.isNaN(value)) {
    return { value: null, error: `${label} must be a number of litres.` };
  }
  if (value < 0) return { value: null, error: `${label} cannot be negative.` };
  if (value === 0 && !allowZero) return { value: null, error: `${label} must be greater than 0 litres.` };
  return { value, error: null };
}

/** Parse a tolerance percentage (0-100) into a fraction. Empty falls back to the default. */
export function parseToleranceInput(raw) {
  if (raw === undefined || raw === null || String(raw).trim() === '') {
    return { value: null, error: null, usedDefault: true };
  }
  const percent = parseNumber(raw);
  if (Number.isNaN(percent)) return { value: null, error: 'Tolerance must be a number between 0 and 100.', usedDefault: false };
  if (percent < 0 || percent > 100) return { value: null, error: 'Tolerance must be between 0 and 100 percent.', usedDefault: false };
  return { value: percent / 100, error: null, usedDefault: false };
}

/**
 * Validate raw operator input into records the domain engine can reconcile.
 * @param {{loadingLitres?:*, deliveryLitres?:*, tolerancePercent?:*, tankerId?:*, linkageMode?:string}} input
 */
export function buildCustomRecords(input = {}) {
  const errors = [];
  const loading = parseLitresInput(input.loadingLitres, 'Loading volume', { allowZero: false });
  const delivery = parseLitresInput(input.deliveryLitres, 'Delivered volume');
  const tolerance = parseToleranceInput(input.tolerancePercent);

  if (loading.error) errors.push(loading.error);
  if (delivery.error) errors.push(delivery.error);
  if (tolerance.error) errors.push(tolerance.error);

  const tankerId = typeof input.tankerId === 'string' ? input.tankerId.trim() : '';
  if (!TANKER_ID_PATTERN.test(tankerId)) {
    errors.push('Tanker ID must be 1-20 letters, digits or hyphens.');
  }

  const linkageMode = input.linkageMode ?? 'linked';
  if (!CUSTOM_LINKAGE_MODES.includes(linkageMode)) {
    errors.push(`Linkage mode must be one of: ${CUSTOM_LINKAGE_MODES.join(', ')}.`);
  }

  if (errors.length > 0) return { errors, loading: null, delivery: null, options: null, linkageMode };

  const safeTolerance = tolerance.value ?? 0.05;
  const loadingRecord = {
    id: 'custom-loading-001',
    tankerId,
    reportedLitres: loading.value,
    measurementMethod: 'operator-entry',
    sourceEventIds: ['operator-entry'],
    source: 'operator-entry',
  };
  const deliveryRecord = {
    id: 'custom-delivery-001',
    tankerId: linkageMode === 'tanker-mismatch' ? `${tankerId}-OTHER` : tankerId,
    orderId: 'custom-order-001',
    acknowledgedLitres: delivery.value,
    measurementMethod: 'operator-entry',
    sourceEventIds: ['custom-loading-001'],
    source: 'operator-entry',
  };

  return {
    errors: [],
    loading: linkageMode === 'missing-loading' ? null : loadingRecord,
    delivery: deliveryRecord,
    options: {
      tolerance: safeTolerance,
      criticalThreshold: Math.max(safeTolerance, 0.10),
    },
    linkageMode,
  };
}

/**
 * Run one operator check end to end.
 * @returns {{ok:boolean, errors:string[], result:object|null, provenance:object, linkageMode:string}}
 */
export function runCustomCheck(input = {}) {
  const built = buildCustomRecords(input);
  if (built.errors.length > 0) {
    return { ok: false, errors: built.errors, result: null, provenance: CUSTOM_PROVENANCE, linkageMode: built.linkageMode };
  }

  const result = reconcileLoadingDelivery({
    loading: built.loading,
    delivery: built.delivery,
    ...built.options,
  });

  return {
    ok: true,
    errors: [],
    result: {
      ...result,
      provenance: CUSTOM_PROVENANCE,
      linkageMode: built.linkageMode,
      basis: 'operator-entered values compared with the standard reconciliation rules',
    },
    provenance: CUSTOM_PROVENANCE,
    linkageMode: built.linkageMode,
  };
}
