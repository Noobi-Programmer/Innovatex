# JalTrace Cost Model

**Planning date:** 2026-10-22  
**Currency:** Indian rupees (₹)  
**Purpose:** separate the cost of the current software demonstration from the cost of a physical pilot. This is not a purchase order, bill of materials or deployment quote.

## Executive answer

- **Current demo:** ₹0 incremental software cost when run on the team’s existing computers. It uses local files, Node.js, deterministic fixtures and no paid API, cloud database or hosted telemetry.
- **Bench/pilot:** not ₹0. Hardware, installation, calibration, connectivity, maintenance and operator time remain to be priced.
- **Market status:** the installed cost and willingness to pay are unvalidated. The next gate is one current meter quote plus five operator conversations.

## Cost phases

| Phase | What is included | Planning cost | Evidence status | Budget decision |
|---|---|---:|---|---|
| Software demo | Existing laptop, local Node/npm runtime, static web server, synthetic fixtures | **₹0 incremental** | Verified from the implementation; no paid services are required | Proceed now |
| Borrowed/bench test | One compatible meter, a small controller, local Wi-Fi, temporary plumbing and reference measurement | **Quote required** | No selected meter or borrowed hardware confirmed | Do not promise until quoted |
| Small field pilot | Meter installation, gateway, enclosure, calibration, connectivity, data handling, operator onboarding and maintenance | **Quote required** | No field supplier or site selected | Gate on hardware and operator access |
| Production rollout | Multiple monitored points, spares, installation team, security, support, integrations and replacement cycle | **Not estimated** | Outside current scope | Do not estimate from the demo |

## Indicative public-listing references

These are examples found during the 2026-10-22 planning check, not selected components and not supplier quotes. Prices can change, shipping/tax can differ, and technical suitability is unverified.

| Component example | Listing observed | How to use it | What is still missing |
|---|---:|---|---|
| [ESP32 development board](https://robu.in/product/esp32-wroom-32-development-board/) | ₹530 on the listing | Lower-bound controller reference for a bench prototype | Enclosure, power, wiring, firmware, installation and suitability for the selected sensor |
| [LoRa gateway example](https://robu.in/product/lora-gateway-8-channel-indoor-lora-iot-gateway-868-mhz/) | ₹18,499 on the listing | Shows that a long-range gateway can dominate a small student pilot budget | Coverage, network plan, antenna, configuration, data service and compatibility |
| [Industrial turbine flow-meter example](https://mumbaipumps.com/product/digital-turbine-flow-meter/) | ₹50,000 on the listing | Illustrates that a field-suitable meter can be materially more expensive than a development board | Accuracy class, pipe size, pressure, fluid conditions, certification, installation and calibration |

The planning references are recorded here so the team does not present a ₹0 software prototype as a ₹0 physical deployment. Re-check the listing, model, taxes and lead time before any procurement decision.

## Cost categories that must appear in a pilot quote

1. **Measurement:** meter type, pipe size, range, accuracy, pressure/temperature limits and whether the meter measures the intended water line.
2. **Controller/gateway:** ESP32-class controller or industrial gateway, enclosure, power, surge protection and local storage.
3. **Connectivity:** Wi-Fi, cellular, LoRa or offline-only operation; data plan and coverage; buffering and backfill behavior.
4. **Installation:** plumbing changes, isolation valves, electrical work, mounting, weather protection and site access.
5. **Calibration and reference:** initial calibration, reference-meter comparison, periodic verification and documentation.
6. **Operations:** batteries or power, spares, cleaning, sensor replacement, troubleshooting and operator training.
7. **Software and security:** hosting, backups, access control, audit retention, integration and support. The current demo is local and has no recurring hosted cost.
8. **Compliance and privacy:** permissions, data-sharing agreements, retention and any required legal or safety review.

## Student-budget plan

### Spend nothing until the software gate passes

- Use the current deterministic simulation for the competition presentation.
- Run the unit tests and local server from the repository.
- Conduct interviews and request a quote before buying hardware.

### If a small bench budget becomes available

Prioritize in this order:

1. A sensor that matches the actual pipe and measurement question.
2. A reference measurement method and calibration check.
3. A controller and simple local logging.
4. Connectivity only after the offline flow is reliable.
5. Enclosure, installation and spares before visual polish.

### Procurement stop conditions

Do not buy a component if:

- its pipe/flow range is unknown;
- the seller cannot provide a datasheet or calibration information;
- the team cannot access a safe test installation;
- the result would be presented as a field result without a reference comparison; or
- the purchase would compete with exam preparation or essential project needs.

## Financial claims allowed in the pitch

**Allowed:** “The software demo has ₹0 incremental cost on existing computers.”  
**Allowed:** “A physical pilot is quote-required and will add meter, gateway, installation, calibration, connectivity and maintenance.”  
**Not allowed:** “Deployment costs ₹0,” “one sensor costs ₹X installed,” or any payback claim without a selected component, site, quote and operating assumptions.

## Source notes

- The public-listing examples are planning references only; they are not incorporated into the product logic.
- Full competitor/regulatory sources are in `research/source_register.md` and `presentation/SOURCES.md`.
- Replace every indicative value with a dated supplier quote before a procurement or business-case claim.
