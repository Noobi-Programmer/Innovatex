import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CUSTOM_LINKAGE_MODES,
  CUSTOM_PROVENANCE,
  DEFAULT_CUSTOM_INPUT,
  buildCustomRecords,
  parseLitresInput,
  parseToleranceInput,
  runCustomCheck,
} from '../src/lib/jaltrace-custom-check.mjs';

test('default operator input reproduces the critical quantity mismatch', () => {
  const checked = runCustomCheck(DEFAULT_CUSTOM_INPUT);
  assert.equal(checked.ok, true);
  assert.equal(checked.result.status, 'critical');
  assert.equal(checked.result.differenceLitres, 700);
  assert.equal(checked.result.differencePercent, (700 / 6000) * 100);
  assert.equal(checked.result.source, 'operator-entry');
});

test('operator check inside tolerance is matched, not a false alarm', () => {
  const checked = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, deliveryLitres: '5760' });
  assert.equal(checked.ok, true);
  assert.equal(checked.result.differencePercent, 4);
  assert.equal(checked.result.status, 'matched');
});

test('tolerance band is honoured: 6 percent warns, 10 percent goes critical', () => {
  const warning = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, loadingLitres: '1000', deliveryLitres: '940' });
  assert.equal(warning.result.status, 'warning');
  const critical = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, loadingLitres: '1000', deliveryLitres: '900' });
  assert.equal(critical.result.status, 'critical');
});

test('missing loading linkage reports missing and never fabricates a comparison', () => {
  const checked = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, linkageMode: 'missing-loading' });
  assert.equal(checked.ok, true);
  assert.equal(checked.result.status, 'missing');
  assert.equal(checked.result.differenceLitres, null);
  assert.match(checked.result.reasons.join(' '), /No loading record/);
});

test('tanker mismatch is an explicit linkage reason', () => {
  const checked = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, linkageMode: 'tanker-mismatch' });
  assert.equal(checked.result.status, 'missing');
  assert.match(checked.result.reasons.join(' '), /tanker IDs do not match/i);
  assert.deepEqual(CUSTOM_LINKAGE_MODES, ['linked', 'missing-loading', 'tanker-mismatch']);
});

test('invalid input fails loudly instead of guessing a value', () => {
  const empty = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, loadingLitres: '' });
  assert.equal(empty.ok, false);
  assert.equal(empty.result, null);
  assert.match(empty.errors.join(' '), /Loading volume must be a number/);

  const negative = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, deliveryLitres: '-10' });
  assert.equal(negative.ok, false);
  assert.match(negative.errors.join(' '), /cannot be negative/);

  const zeroLoading = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, loadingLitres: '0' });
  assert.equal(zeroLoading.ok, false);
  assert.match(zeroLoading.errors.join(' '), /greater than 0/);

  const badTanker = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, tankerId: 'bad id <script>' });
  assert.equal(badTanker.ok, false);
  assert.match(badTanker.errors.join(' '), /Tanker ID/);

  const badTolerance = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, tolerancePercent: '150' });
  assert.equal(badTolerance.ok, false);
  assert.match(badTolerance.errors.join(' '), /between 0 and 100/);

  const badMode = runCustomCheck({ ...DEFAULT_CUSTOM_INPUT, linkageMode: 'invented' });
  assert.equal(badMode.ok, false);
  assert.match(badMode.errors.join(' '), /Linkage mode/);
});

test('parsers report value and error separately', () => {
  assert.deepEqual(parseLitresInput('1250.5', 'Loading volume'), { value: 1250.5, error: null });
  assert.equal(parseLitresInput('abc', 'Loading volume').error, 'Loading volume must be a number of litres.');
  assert.equal(parseLitresInput(0, 'Delivered volume').value, 0);
  assert.equal(parseLitresInput(0, 'Loading volume', { allowZero: false }).error, 'Loading volume must be greater than 0 litres.');

  assert.deepEqual(parseToleranceInput('5'), { value: 0.05, error: null, usedDefault: false });
  assert.deepEqual(parseToleranceInput(''), { value: null, error: null, usedDefault: true });
  assert.equal(parseToleranceInput('ten').error, 'Tolerance must be a number between 0 and 100.');
});

test('provenance always marks the result as operator-entered and uncertified', () => {
  const built = buildCustomRecords(DEFAULT_CUSTOM_INPUT);
  assert.equal(built.errors.length, 0);
  assert.equal(built.loading.source, 'operator-entry');
  assert.equal(built.delivery.source, 'operator-entry');
  assert.equal(CUSTOM_PROVENANCE.measured, false);
  assert.equal(CUSTOM_PROVENANCE.certified, false);
  assert.equal(CUSTOM_PROVENANCE.source, 'operator-entry');
  const checked = runCustomCheck(DEFAULT_CUSTOM_INPUT);
  assert.deepEqual(checked.result.provenance, CUSTOM_PROVENANCE);
  assert.equal(checked.result.basis, 'operator-entered values compared with the standard reconciliation rules');
});
