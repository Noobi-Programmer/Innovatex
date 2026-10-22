import {
  SCENARIO_NAMES,
  getScenarioFixture,
  evaluateScenario,
} from './lib/jaltrace-engine.mjs';

const select = document.querySelector('#scenario-select');
const resetButton = document.querySelector('#reset-scenario');
const stepButton = document.querySelector('#step-scenario');
const playButton = document.querySelector('#play-scenario');
const scenarioTitle = document.querySelector('#scenario-title');
const scenarioClock = document.querySelector('#scenario-clock');
const statusSummary = document.querySelector('#status-summary');
const sourceLabel = document.querySelector('#source-label');
const eventChain = document.querySelector('#event-chain');
const metricsGrid = document.querySelector('#metrics-grid');
const volumeChart = document.querySelector('#volume-chart');
const resultHeading = document.querySelector('#result-heading');
const explanationCopy = document.querySelector('#explanation-copy');
const formulaBox = document.querySelector('#formula-box');
const permitTag = document.querySelector('#permit-tag');
const permitCopy = document.querySelector('#permit-copy');
const sourceDetails = document.querySelector('#source-details');
const auditList = document.querySelector('#audit-list');
const issueCount = document.querySelector('#issue-count');
const toast = document.querySelector('#demo-toast');

const labels = {
  'normal-match': 'Normal matched delivery',
  'quantity-mismatch': 'Quantity discrepancy',
  'missing-load': 'Missing loading record',
  'duplicate-out-of-order': 'Duplicate / out-of-order telemetry',
  'impossible-reading': 'Impossible telemetry reading',
  'stale-telemetry': 'Stale telemetry',
  'threshold-review': 'Threshold crossed — review',
  recovery: 'Recovery after anomaly',
  'normal-no-false-alarm': 'Normal variation / no false alarm',
};

const statusLabels = {
  matched: 'MATCHED',
  warning: 'WARNING',
  critical: 'CRITICAL',
  missing: 'MISSING',
  stale: 'STALE',
  invalid: 'INVALID',
  unverified: 'UNVERIFIED',
  'threshold-review': 'REVIEW REQUIRED',
  recovered: 'RECOVERED',
};

let selectedScenario = new URLSearchParams(location.search).get('scenario') || 'normal-match';
if (!SCENARIO_NAMES.includes(selectedScenario)) selectedScenario = 'normal-match';
let playbackStep = 0;
let playTimer = null;

for (const name of SCENARIO_NAMES) {
  const option = document.createElement('option');
  option.value = name;
  option.textContent = labels[name] || name;
  select?.append(option);
}

function formatLitres(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return `${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)} L`;
}

function formatPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return `${value.toFixed(2)}%`;
}

function formatTime(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC' }).format(new Date(value));
}

function displayStatus(status) { return statusLabels[status] || String(status || '—').toUpperCase(); }

function getPrimarySource(fixture) {
  const firstTelemetry = fixture.telemetry?.[0];
  return {
    id: firstTelemetry?.wellId || fixture.loading?.wellId || 'source-demo-01',
    permitStatus: fixture.threshold?.permit?.status || 'unverified',
    lastTimestamp: fixture.clock?.lastTimestamp || fixture.recovery?.after?.lastTimestamp || firstTelemetry?.timestamp || null,
  };
}

function renderScenario() {
  const fixture = getScenarioFixture(selectedScenario);
  const result = evaluateScenario(fixture);
  const source = getPrimarySource(fixture);
  select.value = selectedScenario;
  scenarioTitle.textContent = labels[selectedScenario] || selectedScenario;
  sourceLabel.textContent = `${fixture.source.toUpperCase()} / ${fixture.id}`;
  statusSummary.textContent = displayStatus(result.status);
  statusSummary.className = `status-summary ${result.status}`;
  scenarioClock.textContent = formatTime(fixture.clock?.scenarioNow || fixture.recovery?.after?.scenarioNow || fixture.delivery?.timestamp || fixture.loading?.timestamp || fixture.telemetry?.at(-1)?.timestamp);
  renderChain(fixture, result);
  renderMetrics(fixture, result);
  renderChart(fixture, result);
  renderExplanation(fixture, result);
  renderPermit(fixture, source);
  renderAudit(fixture, result);
}

function renderChain(fixture, result) {
  const items = [
    { title: 'Source', label: fixture.telemetry?.length ? 'extraction telemetry' : 'source record', value: fixture.telemetry?.length ? formatLitres(fixture.telemetry.at(-1).cumulativeLitres) : 'no reading', alert: result.telemetry?.issues?.length > 0 || result.status === 'stale' },
    { title: 'Load', label: fixture.loading ? 'tanker / order' : 'loading event', value: fixture.loading ? formatLitres(fixture.loading.reportedLitres) : 'missing', alert: !fixture.loading },
    { title: 'Delivery', label: fixture.delivery ? fixture.delivery.measurementMethod.replaceAll('-', ' ') : 'delivery event', value: fixture.delivery ? formatLitres(fixture.delivery.acknowledgedLitres) : 'missing', alert: result.status === 'critical' || !fixture.delivery },
  ];
  eventChain.classList.toggle('has-alert', result.status !== 'matched' && result.status !== 'recovered');
  eventChain.innerHTML = items.map((item) => `<div class="chain-event-card ${item.alert ? 'alert' : ''}"><strong>${item.title}</strong><small>${item.label}</small><b>${item.value}</b></div>`).join('');
}

function renderMetrics(fixture, result) {
  const reconciliation = result.reconciliation;
  const telemetry = result.telemetry;
  const rows = [
    ['LOADING', reconciliation?.loadingLitres ?? fixture.loading?.reportedLitres ?? null, 'L', ''],
    ['DELIVERY ACK', reconciliation?.deliveryLitres ?? fixture.delivery?.acknowledgedLitres ?? null, 'L', ''],
    ['DIFFERENCE', reconciliation?.differenceLitres, 'L', reconciliation?.differenceLitres ? 'alert' : ''],
    ['DIFFERENCE %', reconciliation?.differencePercent, '%', reconciliation?.differencePercent > 5 ? 'amber' : ''],
  ];
  metricsGrid.innerHTML = rows.map(([label, value, unit, className]) => `<div class="metric-card ${className}"><span>${label}</span><strong>${unit === '%' ? formatPercent(value) : formatLitres(value)}</strong></div>`).join('');
  if (telemetry?.issues?.length) metricsGrid.insertAdjacentHTML('beforeend', `<div class="metric-card alert"><span>TELEMETRY ISSUES</span><strong>${telemetry.issues.length}</strong></div>`);
}

function renderChart(fixture, result) {
  const readings = fixture.telemetry || [];
  const width = 620;
  const height = 185;
  const padding = { top: 20, right: 20, bottom: 28, left: 42 };
  const allValues = readings.map((row) => row.cumulativeLitres).filter((value) => Number.isFinite(value) && value >= 0);
  const maxValue = Math.max(...allValues, 1);
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const points = readings.map((row, index) => {
    const x = padding.left + (readings.length <= 1 ? chartWidth / 2 : (index / (readings.length - 1)) * chartWidth);
    const y = padding.top + chartHeight - (Math.max(0, row.cumulativeLitres || 0) / maxValue) * chartHeight;
    const issue = result.telemetry?.issues?.some((candidate) => candidate.readingId === row.id);
    return { x, y, issue, value: row.cumulativeLitres, timestamp: row.timestamp };
  });
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  const area = points.length ? `${path} L ${points.at(-1).x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z` : '';
  const circles = points.map((point) => `<circle class="chart-point ${point.issue ? 'invalid' : ''}" cx="${point.x}" cy="${point.y}" r="4"><title>${formatLitres(point.value)} at ${formatTime(point.timestamp)}</title></circle>`).join('');
  volumeChart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#43dfc1" stop-opacity=".35"/><stop offset="1" stop-color="#43dfc1" stop-opacity="0"/></linearGradient></defs><line class="chart-axis" x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}"/><line class="chart-axis" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartHeight}"/><text class="chart-label" x="5" y="${padding.top + 4}">${formatLitres(maxValue)}</text><text class="chart-label" x="12" y="${padding.top + chartHeight}">0 L</text>${area ? `<path class="chart-fill" d="${area}"/>` : ''}${path ? `<path class="chart-line" d="${path}"/>` : ''}${circles}</svg>`;
}

function renderExplanation(fixture, result) {
  const reconciliation = result.reconciliation;
  resultHeading.textContent = displayStatus(result.status);
  const reasons = [];
  if (result.telemetry?.issues?.length) reasons.push(`${result.telemetry.issues.length} telemetry issue${result.telemetry.issues.length === 1 ? '' : 's'} flagged; invalid or duplicate values are excluded from derived volume.`);
  if (result.freshness?.stale) reasons.push(`Last telemetry is stale: ${Math.round(result.freshness.ageMs / 60000)} minutes old in the scenario clock.`);
  if (reconciliation?.reasons?.length) reasons.push(...reconciliation.reasons);
  if (result.threshold?.reasons?.length) reasons.push(...result.threshold.reasons);
  if (result.recovery) reasons.push(result.recovery.after.stale ? 'Recovery is incomplete.' : 'Fresh telemetry received; the current stale state clears while the prior anomaly remains in the audit trail.');
  if (reasons.length === 0) reasons.push('No rule fired. The event chain is ready for review.');
  explanationCopy.innerHTML = reasons.slice(0, 4).map((reason) => `<p>↳ ${reason}</p>`).join('');
  if (reconciliation?.loadingLitres !== null && reconciliation?.deliveryLitres !== null) {
    formulaBox.innerHTML = `${formatLitres(reconciliation.loadingLitres)} − ${formatLitres(reconciliation.deliveryLitres)} = <b>${formatLitres(reconciliation.differenceLitres)}</b><br /><span>${formatLitres(reconciliation.differenceLitres)} ÷ ${formatLitres(reconciliation.loadingLitres)} × 100 = <b>${formatPercent(reconciliation.differencePercent)}</b></span>`;
  } else if (result.threshold) {
    formulaBox.textContent = `${formatLitres(result.threshold.extractedLitres)} > ${formatLitres(result.threshold.thresholdLitres)} demo threshold → review`;
  } else if (result.freshness) {
    formulaBox.textContent = `last update age = ${Math.round(result.freshness.ageMs / 60000)} min; freshness window = ${Math.round(result.freshness.maxAgeMs / 60000)} min`;
  } else {
    formulaBox.textContent = 'No comparable quantities available.';
  }
}

function renderPermit(fixture, source) {
  const permit = fixture.threshold?.permit || { status: 'unverified', verified: false, source: 'simulated metadata only' };
  const status = permit.status || 'unverified';
  permitTag.textContent = status;
  permitTag.className = `tag ${status === 'verified' ? 'tag-match' : status === 'missing' ? 'tag-critical' : 'tag-warning'}`;
  permitCopy.textContent = status === 'verified' ? 'A supplied record is marked verified for this field. The demo does not infer legality.' : 'This synthetic demo has no verified permit/NOC document. A QR, ID or location would not be enough on its own.';
  sourceDetails.innerHTML = [['Source ID', source.id], ['Last reading', formatTime(source.lastTimestamp)], ['Data state', 'SIMULATED'], ['Legal conclusion', 'NOT INFERRED']].map(([key, value]) => `<div class="data-row"><span>${key}</span><b>${value}</b></div>`).join('');
}

function renderAudit(fixture, result) {
  const items = [];
  for (const reading of fixture.telemetry || []) items.push({ title: `Telemetry ${reading.id}`, text: `${formatLitres(reading.cumulativeLitres)} cumulative · ${reading.source.toUpperCase()}`, alert: result.telemetry?.issues?.some((issue) => issue.readingId === reading.id) });
  if (fixture.loading) items.push({ title: `Loading ${fixture.loading.id}`, text: `${formatLitres(fixture.loading.reportedLitres)} · ${fixture.loading.measurementMethod}`, alert: false });
  if (fixture.delivery) items.push({ title: `Delivery ${fixture.delivery.id}`, text: `${formatLitres(fixture.delivery.acknowledgedLitres)} acknowledged · ${fixture.delivery.measurementMethod}`, alert: result.status === 'critical' });
  if (result.freshness?.stale) items.push({ title: 'Freshness rule', text: result.freshness.reason, alert: true });
  if (result.threshold?.breached) items.push({ title: 'Threshold rule', text: 'Demo threshold crossed — review required.', alert: true });
  items.push({ title: 'Engine result', text: `${displayStatus(result.status)} · derived locally`, alert: !['matched', 'recovered'].includes(result.status) });
  issueCount.textContent = `${result.telemetry?.issues?.length || 0} telemetry issue${result.telemetry?.issues?.length === 1 ? '' : 's'}`;
  auditList.innerHTML = items.map((item) => `<div class="audit-item ${item.alert ? 'alert' : ''}"><i></i><div><strong>${item.title}</strong><span>${item.text}</span></div></div>`).join('');
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(notify.timeout);
  notify.timeout = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function setScenario(name) {
  selectedScenario = SCENARIO_NAMES.includes(name) ? name : 'normal-match';
  playbackStep = 0;
  history.replaceState(null, '', `demo.html?scenario=${encodeURIComponent(selectedScenario)}`);
  renderScenario();
}

select?.addEventListener('change', () => setScenario(select.value));
resetButton?.addEventListener('click', () => { stopPlayback(); playbackStep = 0; renderScenario(); notify('Scenario reset to deterministic start state.'); });
stepButton?.addEventListener('click', () => { playbackStep += 1; notify(`Step ${playbackStep} — same fixture, presenter-controlled.`); });
playButton?.addEventListener('click', () => {
  if (playTimer) { stopPlayback(); notify('Scenario playback paused.'); return; }
  notify('Scenario playback started.');
  playTimer = setInterval(() => {
    playbackStep += 1;
    if (playbackStep >= 3) { stopPlayback(); notify('Scenario complete — inspect the audit trail.'); }
  }, 700);
});
function stopPlayback() { if (playTimer) clearInterval(playTimer); playTimer = null; playButton.textContent = 'Play scenario'; }

renderScenario();
