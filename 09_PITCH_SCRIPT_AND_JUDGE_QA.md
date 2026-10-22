# Pitch Script Skeleton and Judge Q&A

Use as a starting point only. Update after the market research and actual app are complete.

## Five-slide timing

### 1 — The broken water trail (0:00–1:30)

“Good morning, judges. JalTrace is exploring a specific accountability problem in groundwater logistics: can we connect extraction, tanker loading and delivery records well enough to flag missing links and quantity discrepancies? A flow meter at one location, a tanker’s delivery record and a receiver acknowledgement may each tell part of the story. The question is whether linking those events can make exceptions easier to investigate.”

Do not state that the city has a quantified missing-water problem unless the team finds reliable evidence.

### 2 — Existing alternatives and gap (1:30–3:00)

“Booking and tracking products already exist. Delivery logs and water-meter platforms exist too. We are not claiming to be the first tanker app or first smart meter. Our hypothesis is that cross-event traceability from extraction to loading to delivery may be a useful layer. We have compared public product descriptions; the exact market gap and user willingness to pay need validation.”

Name the relevant competitors accurately and show a source-backed comparison, including contrary evidence.

### 3 — Architecture (3:00–5:00)

“An extraction meter reports a cumulative value and pump state. A loading meter or operator record links a fill event to a tanker. A delivery record links that tanker to an order and recipient. JalTrace checks event IDs and timestamps, computes volume deltas, and surfaces mismatch/missing-data reasons. A local gateway may buffer readings until connectivity returns. Field versions require calibrated meters, tamper considerations, durable installation and a security/privacy model.”

### 4 — Simulation (5:00–7:30)

“Every marker and reading on this screen is simulated. First we show a matched delivery. Next we introduce a difference between 6,000 litres loaded and 5,300 litres acknowledged: 700 litres, or 11.7% of loading quantity. That is a discrepancy to investigate—not evidence of theft. We then remove a source/loading record to show an unverified event chain. The interface exposes the calculation and supporting event records.”

Numbers are illustrative and must match the working application. Don't use the example unless that scenario is implemented.

### 5 — Pilot and impact (7:30–10:00)

“The prototype has validated software logic with controlled cases, not the physical measurement chain. Our next phase is to borrow/buy a calibrated flow sensor and ESP32 if feasible, compare it with a reference meter, observe a small number of flows, and test the event links with a real facility or operator. We will measure reconciliation accuracy, missing-event rate, data freshness and cost per monitored point. National rollout would require local source/permit data, compatible meters, operators and integration with city-specific processes. Thank you.”

## Likely judge questions

### “Isn't Sanchari Kaveri already doing this?”

“Public material describes IoT tanker management with GPS/RFID, so live tracking isn't our claimed novelty. We are testing whether the specific source-meter → loading-event → delivery-acknowledgement reconciliation is covered. If our research shows that it is, we need to narrow our contribution rather than ignore that evidence.”

### “Does WEGoT already do source-to-consumption tracking?”

“WEGoT advertises water metering, tanker-lorry management and tracking supply from municipal, tanker and borewell sources, so it is a major adjacent competitor. We need to compare its actual capabilities carefully. A generic supply dashboard would not be enough differentiation.”

### “Does a discrepancy mean theft?”

“No. It means the linked records don't reconcile within a configured tolerance. Meter calibration errors, timing, retained water, line volume, spills, unlinked use or manual-entry error may all contribute. The system flags an exception for human review.”

### “How do you establish legal source provenance?”

“An ID/QR code alone cannot establish legality. A real system would need authenticated operator/source records and a verified connection to the relevant permit/utility information where allowed. Our demo uses fictional records and does not certify legality.”

### “What about water quality?”

“This prototype doesn't measure or certify potability. Water-quality results require appropriate validated tests and traceable records. We won't infer quality from location or flow-meter data.”

### “Where is the IoT prototype?”

“The current demonstration is software simulation because no hardware is available yet. It demonstrates the event and alert logic. A field pilot requires suitable flow meters, pump-state sensing, a device/gateway, connectivity and validation against reference measurements.”

### “What will it cost per well/tanker?”

“We have not validated an installed cost. The final plan will break out the selected flow meter, gateway/device, installation, connectivity, calibration, maintenance and software/operations. Any unquoted item remains an estimate or quote-required.”
