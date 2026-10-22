const sources = [
  { id: 'S001', title: 'InnovateX 2026–27 competition brief', note: 'Official Theme 1 challenge, 10-minute pitch, Round 2 prototype and judging criteria.', url: 'https://techfest.org/competitions/innovatex' },
  { id: 'S004', title: 'Kaveri on Wheels', note: 'BWSSB booking, tracked tanker and OTP-protected delivery listing.', url: 'https://play.google.com/store/apps/details?id=com.bwssb.user.app&hl=en_IN' },
  { id: 'S007', title: 'STARS: Smart Tanker Records', note: 'Photo/time/vehicle/quantity records, offline sync and billing.', url: 'https://play.google.com/store/apps/details?id=com.simplifyplanetlabs.stars&hl=en_IN' },
  { id: 'S008', title: 'WEGoT Aqua residential', note: 'Municipal/tanker/borewell supply tracking, tanker quantity and borewell optimisation.', url: 'https://www.wegot.in/residential.html' },
  { id: 'S010', title: 'BWSSB digital-water post', note: 'Official post describing IoT-enabled tanker tracking.', url: 'https://www.linkedin.com/posts/bwssbbengaluru_bwssb-nationalaisummitonwater2026-ai-activity-7464918936950661120-3CCo' },
  { id: 'S013', title: 'Karnataka Ground Water Act / amendments', note: 'Act 63 of 2025 text includes private bulk-water tanker NOC context.', url: 'https://prsindia.org/files/bills_acts/acts_states/karnataka/2011/2011KR25.pdf' },
  { id: 'S011', title: 'BWSSB borewell IoT report', note: 'Reported depth, extracted quantity and pump-hours monitoring programme.', url: 'https://www.newindianexpress.com/cities/bengaluru/2026/Sep/30/by-march-27-bwssb-to-install-iot-devices-on-its-6000-borewells' },
];

const table = document.querySelector('#source-table');
if (table) table.innerHTML = sources.map((source) => `<div class="source-row"><code>${source.id}</code><div><strong>${source.title}</strong><span>${source.note}</span></div><a href="${source.url}" target="_blank" rel="noreferrer">Open source ↗</a></div>`).join('');
