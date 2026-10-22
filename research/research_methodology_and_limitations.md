# Research Methodology and Limitations

**Research checkpoint:** 2026-10-21, Asia/Calcutta.

## Scope

The research tested whether JalTrace should be built as a defensible Theme 1 solution, rather than accepting the original source-to-tanker concept as novel. It covered:

- the supplied InnovateX PDF and current Techfest web schedule;
- Bengaluru groundwater policy, telemetry and tanker-management context;
- public products and apps for tanker booking, tracking, delivery recording, billing, metering and borewell monitoring;
- the five candidate problem directions plus a compliance-led narrowing;
- a high-level check of AQI and coastal-plastic alternatives.

## Research process

1. Read all prior project notes listed in the master prompt and extracted the full local PDF text page by page.
2. Treated existing project notes as hypotheses and looked for primary or first-party sources.
3. Checked official Techfest pages for live schedule information; kept the supplied PDF as the competition requirement source.
4. Reviewed official/agency pages and app listings for BWSSB, Kaveri on Wheels, CPCB and Karnataka groundwater legislation.
5. Reviewed first-party pages for TankerTap, GoTanker and WEGoT, and the Google Play listing for STARS.
6. Reviewed an official BWSSB LinkedIn post and an interview reporting BWSSB’s Sanchari Kaveri and digital-water claims.
7. Used a current news report only for the reported BWSSB borewell-IoT deployment plan, explicitly labelling it as a plan/report rather than an audited dataset.
8. Used Google Scholar only to locate relevant scientific work; exact scientific numbers were not used where the original paper could not be reopened.
9. Recorded source title, publisher, date, URL/path, supporting location, confidence and limitations in `research/source_register.md`.
10. Compared candidates with a weighted rubric in `research/idea_comparison.md`.

## Search and source strategy

The search was primary-source-first, not source-count-first:

- **Official competition/government:** Techfest, CPCB, Karnataka government legal/gazette files, BWSSB app and official social account, data portals.
- **First-party products:** vendor product pages and official app listings.
- **Scientific evidence:** paper metadata and scholarly index records; original paper access was required before using precise results.
- **Secondary corroboration:** reputable news/interview coverage only when a first-party technical document was unavailable; such claims are labelled accordingly.

The work did not use vendor marketing numbers as independent impact evidence. It did not infer a feature was absent merely because a homepage omitted it.

## Evidence labels

- **Verified:** source explicitly states the capability or rule.
- **Vendor/agency claim:** source is first-party marketing or an agency statement; no independent outcome audit is implied.
- **Not found in reviewed material:** no evidence in the reviewed public material; not proof of absence.
- **Confirmed unavailable:** only used if a source explicitly says unavailable; not assigned to core competitors in this pass.
- **Plan/target:** future or intended deployment, not completed deployment.
- **Simulation/illustrative:** synthetic data, never field measurement.

## Important limitations

### No direct customer validation

No interviews, site visits, purchase orders, supplier calls or signed pilot commitments were available. This is the largest business-risk limitation. The reports therefore identify a **gap hypothesis**, not a proven willingness-to-pay or frequency-of-pain result.

### Public product visibility is incomplete

Public pages cannot reveal private integrations, customer-specific configuration, internal regulatory workflows or features hidden behind demos. In particular, WEGoT may have capabilities not described on the reviewed public pages; Sanchari Kaveri’s public data model and coverage could not be inspected.

### Government website access was inconsistent

CGWB, NWDP, BWSSB and Karnataka groundwater pages were partly JavaScript-driven or returned transport/TLS errors in static fetches. The existence of the official portals was confirmed through search and linked material, but exact CGWB groundwater statistics were deliberately not used when the underlying PDF could not be reopened. The accessible PRS mirror was used to inspect Karnataka Act 2011 and its appended 2025 amendments; the official Gazette URLs are recorded for later legal confirmation.

### Vendor claims are not field results

Claims such as “verified partners,” “>99% accuracy,” “water saved,” “clean/safe supply” and download/user counts are treated as advertising or listing metadata. They are not used as proof of water conservation, potability, calibration quality, or market adoption.

### No complete competitor inventory

The scan is not a patent search, procurement database, private SaaS market study or exhaustive India-wide inventory. It is sufficient to reject simplistic novelty claims and to define a validation wedge, not sufficient to conclude that no competitor implements the proposed chain.

### No live sensor or field-quality evidence

The team has no confirmed hardware deployment. No claim is made about meter accuracy, calibration drift, connectivity, source legitimacy, water quality or physical water savings.

### Prices and operating economics remain open

No supplier quote or procurement-grade hardware bill was verified in this research checkpoint. Cost modelling must be a separate task using current supplier prices, installation, calibration, connectivity, maintenance and replacement assumptions.

## What would change the decision

The decision should be revisited if any of the following is found:

1. WEGoT or another deployed system already binds source extraction, tanker load, delivery and permit/NOC evidence with comparable measurement methods.
2. Apartment managers or suppliers say the task is rare, low-value or already solved by their current system.
3. A regulator/utility requires a different data standard or does not recognise the proposed evidence.
4. The required field hardware, calibration or connectivity cost is incompatible with the pilot.
5. A competitor or government programme provides a public API/data feed that makes JalTrace’s evidence layer redundant.

## Immediate next validation

Within the first post-exam work block, conduct five short, honest conversations with apartment/facility managers, tanker suppliers or water-operations staff. Ask the five questions in `research/idea_comparison.md`. Record responses with consent and mark non-responses as missing; do not create synthetic interview evidence.
