# JalTrace — Competitor Research and Source Register

**Research snapshot:** 21–22 October 2026 context. Web pages and product features change; re-open each source before finalising the pitch. This is a focused public scan, not a complete patent search, customer study or proof that no other product exists.

## Current hypothesis

JalTrace should not compete as only another tanker booking/live-map app. The plausible differentiation to test is an event-linked chain:

`borewell extraction meter → tanker fill meter + source ID → delivery quantity / receiver acknowledgement → exception review`

The product would report mismatches and missing evidence, not declare guilt. The prototype will use simulated telemetry; future installation requires calibrated, suitable meters and supplier/operator participation.

## Direct and adjacent competitors

### 1. TankerTap — direct tanker-booking/tracking overlap

Website: https://tankertap.com/

Its website markets Bengaluru tanker booking, capacity options, nearby service-provider allocation, transparent pricing and real-time order tracking. This is enough to reject “Uber for water tankers” as the sole novelty claim.

### 2. Kaveri on Wheels — public water tanker booking

Google Play: https://play.google.com/store/apps/details?id=com.bwssb.user.app
Official portal: https://kaverionwheels.bwssb.gov.in/

The app listing from BWSSB describes booking deliveries from BWSSB GLRs/Cauvery Connect centres with fixed/discounted rates, tracked tankers and OTP-protected delivery. Do not imply it covers every private tanker; the listing specifies BWSSB supply centres.

### 3. Sanchari Kaveri — tanker management and GPS/RFID overlap

BWSSB social post: https://www.linkedin.com/posts/bwssbbengaluru_bwssb-nationalaisummitonwater2026-ai-activity-7464918936950661120-3CCo
Secondary coverage: https://egov.eletsonline.com/2026/04/building-bengalurus-water-future-technology-climate-resilience-and-citizen-centric-governance/

The BWSSB post says the board is showcasing IoT-enabled tanker tracking among its digital water initiatives. Secondary coverage calls Sanchari Kaveri an IoT-based smart tanker-management system using RFID and GPS. Verify how it operates and whether the name applies to the same service currently branded Kaveri on Wheels before describing it as one platform.

### 4. STARS — delivery recording and billing

Google Play: https://play.google.com/store/apps/details?id=com.simplifyplanetlabs.stars

The listing describes recording each tanker arrival with photo, time, vehicle and quantity; a shared delivery list; supplier/customer console; orders; and bills generated from recorded deliveries. This is a direct overlap with any simple tanker delivery ledger.

### 5. WEGoT Aqua — source tracking, metering and apartment water intelligence

Residential product page: https://www.wegot.in/residential.html
Main site: https://www.wegot.in/

The product pages describe IoT water metering, consumption and leakage insights, dashboards and tracking supply across municipal sources, tanker lorries and borewells. The residential page says tanker-lorry management can track the quantity delivered in each load. This is a serious adjacent competitor to source-to-consumption reconciliation; research the exact end-to-end capabilities before claiming a gap.

### 6. Groundwater telemetry / extraction monitoring

A Bengaluru news report (30 Sep 2026): https://www.newindianexpress.com/cities/bengaluru/2026/Sep/30/by-march-27-bwssb-to-install-iot-devices-on-its-6000-borewells

The report says BWSSB planned IoT installations for 6,000 borewells by March 2027 and mentions monitoring of borewell performance. This establishes that generic borewell telemetry is already an active public-sector direction. Reconfirm updated figures and do not use planned numbers as achieved deployments.

General official water-quality/surface data source (research starting point): https://cgwb.gov.in/
National Water Data Portal (potential groundwater datasets): https://www.nwdp.nwic.gov.in/

### 7. General source-to-use smart water metering

WEGoT commercial page: https://www.wegot.in/commercial.html

WEGoT markets building/campus metering, multi-inlet supply tracking, leak alerts and central dashboards. That means a generic “combine water-source readings in one dashboard” also needs a strong differentiation argument.

## What to investigate next

The research agent should answer these questions, with direct citations and dates:

1. Does any public/private solution explicitly link one borewell extraction meter event to one tanker fill event to the downstream delivery record, with traceable quantity reconciliation?
2. Does WEGoT already reconcile municipal + tanker + borewell supply with end-user consumption in a way that materially overlaps the proposed product?
3. Does Sanchari Kaveri track every tanker, or a defined fleet / public booking workflow? Is real-time location exposed to users, operators, regulators, or only internally?
4. Which actor experiences the problem (apartment manager, tanker supplier, borewell owner, auditor, utility), how often, and what evidence proves the pain?
5. What does “source verified” actually mean in a valid deployment? A source registry/QR code alone is not proof of legitimacy.
6. What are the actual sensor, meter, communication, calibration and operating costs? Don't repeat generic price claims without a supplier/source.

## Required research output

Create `research/market-gap-report.md` containing:
- executive verdict (`PROMISING GAP`, `CROWDED / WEAK`, or `INCONCLUSIVE`);
- feature-level comparison table with links;
- what is already commoditised;
- the narrowest supported gap;
- counter-evidence against our idea;
- three questions for prospective users;
- confidence level and limits of this research.

## Evidence hygiene

- Prefer first-party company/official product pages and official agency sources.
- A vendor claim is a vendor claim; label it as such.
- Do not state “no competitors” or “first in India” without very strong evidence.
- Distinguish current deployments, pilots, goals and plans.
- Put source links immediately beside claims in both the report and slide speaker notes.
- If browsing fails, say so; never invent source contents.
