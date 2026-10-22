# JalTrace — Presentation Source Notes

**Access date for live sources:** 2026-10-21, Asia/Calcutta.  
**Implementation status checked:** 2026-10-22.  
**Use:** keep this file with the slide deck so every external claim has a traceable source and a limitation.

## Competition and evaluation

| ID | Source | Use | Limitation |
|---|---|---|---|
| S001 | `source/InnovateX_Techfest_2026-27_Brief.pdf` | Theme 1 wording, Round 1 ten-minute presentation, Round 2 prototype/report expectations, evaluation criteria and originality rule. | Supplied PDF is the team’s source of truth; the live portal can change. |
| S002 / S003 / S016 | [Techfest InnovateX](https://techfest.org/competitions/innovatex) and [Techfest competitions](https://techfest.org/competitions) | Current registration and Bangalore schedule checks used for planning only. | Dynamic pages/search indexing may lag; Team Leader must verify the registered portal before presenting. |

## Market and competitor evidence

| ID | Source | Claim supported in the pitch | Limitation |
|---|---|---|---|
| S004 | [Kaverionwheels / Kaveri on Wheels](https://play.google.com/store/apps/details?id=com.bwssb.user.app&hl=en_IN) | BWSSB app listing describes booking, tracked tankers and OTP-protected delivery. | First-party listing; does not prove private-tanker coverage or source-meter linkage. |
| S005 | [TankerTap](https://tankertap.com/) and [Google Play listing](https://play.google.com/store/apps/details?id=com.tankertap&hl=en_IN) | Booking, capacity selection, nearby providers and live tracking are advertised. | Vendor claims; no independent audit of the advertised workflow. |
| S006 | [GoTanker](https://www.gotanker.com/) | Bangalore delivery, quantity booking, GPS tracking and alerts are advertised. | Vendor marketing; no public proof of source permits or extraction-to-delivery reconciliation. |
| S007 | [STARS: Smart Tanker Records](https://play.google.com/store/apps/details?id=com.simplifyplanetlabs.stars&hl=en_IN) | Photo/time/vehicle/quantity records, offline sync, orders and billing are advertised. | Public listing does not prove groundwater source telemetry or permit linkage. |
| S008 / S009 | [WEGoT residential](https://www.wegot.in/residential.html), [WEGoT commercial](https://www.wegot.in/commercial.html) and [WEGoT main site](https://www.wegot.in/) | Municipal/tanker/borewell tracking, tanker quantity, meters, borewell optimisation and dashboards are advertised. | Public pages do not prove or disprove the exact proposed chain; “not found” is not “unavailable.” |
| S010 | [BWSSB National AI & Digital Water Summit post](https://www.linkedin.com/posts/bwssbbengaluru_bwssb-nationalaisummitonwater2026-ai-activity-7464918936950661120-3CCo) | BWSSB publicly mentions IoT-enabled tanker tracking and smart metering. | Social post; no detailed system specification or coverage data. |
| S011 | [The New Indian Express report](https://www.newindianexpress.com/cities/bengaluru/2026/Sep/30/by-march-27-bwssb-to-install-iot-devices-on-its-6000-borewells) | Reported BWSSB borewell IoT plan and the distinction between installed and planned devices. | News report of an official statement; not an audited deployment dataset. |
| S012 | [Elets eGov interview](https://egov.eletsonline.com/2026/04/building-bengalurus-water-future-technology-climate-resilience-and-citizen-centric-governance/) | Reported RFID/GPS tanker-management context. | Secondary interview report, not a technical specification. |

## Regulation and data context

| ID | Source | Claim supported in the pitch | Limitation |
|---|---|---|---|
| S013 | [PRS mirror of the Karnataka Ground Water Act](https://prsindia.org/files/bills_acts/acts_states/karnataka/2011/2011KR25.pdf); official links recorded in `research/source_register.md` | Act 63 of 2025 is the compliance hook for private tankers abstracting groundwater for bulk supply. | PRS is not the authoritative gazette; confirm the current text and implementation guidance before legal advice or a compliance claim. |
| S014 | [data.gov.in](https://www.data.gov.in/), [India-WRIS](https://indiawris.gov.in/wris/), [NWDP](https://www.nwdp.nwic.gov.in/) | Relevant government data-discovery portals for a future integration investigation. | No dataset/API is assumed from portal presence alone. |
| S015 | [Groundwater level dynamics in Bengaluru city](https://doi.org/10.3390/su9090689) | Scientific context that Bengaluru groundwater dynamics are a legitimate research problem. | Exact numerical findings are not used in the pitch because the original paper was not independently reopened in the research session. |

## Local evidence files

- `research/source_register.md` — full claim register with access dates, excerpts, confidence and limitations.
- `research/competitor_matrix.md` — feature-level competitor comparison.
- `research/market_gap_report.md` — gap evidence and uncertainty.
- `research/GO_NO_GO.md` — final research gate and pivot trigger.
- `docs/PRODUCT_REQUIREMENTS.md` — scoped product requirements.
- `docs/SYSTEM_ARCHITECTURE.md` — planned architecture and trust boundaries.
- `docs/SIMULATION_DESIGN.md` — fixture design and scenario semantics.

## Claim discipline

- Say **advertises**, **public material shows**, or **reviewed source did not show** for vendor pages.
- Say **gap hypothesis** and **inconclusive**; do not say **unique**, **first**, or **only**.
- Say **simulated**, **synthetic** and **deterministic** for every demo value.
- Say **review required**, not **fraud**, **theft**, **illegal**, or **contaminated**.
- Treat schedule pages, pricing pages and product listings as time-sensitive and re-check them immediately before the event.
