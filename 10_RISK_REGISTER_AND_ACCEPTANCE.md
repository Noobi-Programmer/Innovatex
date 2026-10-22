# Risks, Guardrails and Definition of Done

## Main risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Existing products already combine the proposed flow | Weak novelty/pitch case | Competitor research before freezing claims; acknowledge counter-evidence; narrow supported gap |
| Extraction and delivery measurements are not comparable | False discrepancy alerts | Link events to a specific fill/order; identify measurement methods; handle unlinked volumes as unverified |
| Meter errors/calibration drift | Incorrect volume differences | State calibration requirements; test against a reference meter in the pilot |
| Missing or delayed connectivity | Stale data looks live | Show last-update time, staleness state and local buffering in future design |
| QR/GPS claimed as proof | False source legitimacy | Treat as identifiers/location signals only; source verification requires authenticated records |
| Privacy/sensitive locations | Tanker locations and infrastructure can be sensitive | Consent, minimum retention/access, role controls; use fictional markers in demo |
| Potability confusion | Flow does not prove safe water | Keep water-quality testing distinct and label records as verified/unverified |
| ₹0 prototype overstated as ₹0 deployment | Misleading economics | Separate free software prototype from future hardware/operations cost |
| Time lost to MCP setup | Exam and deadline risk | Inspect supported list first; install only Playwright if available/needed; skip remote Canva MCP |
| Web map/API key failure | Demo may fail offline | Use SVG schematic fallback; test on the intended venue network; capture backup screenshots/video |

## Definition of done for this phase

### Research
- [ ] PDF read and requirements summarised accurately.
- [ ] Competitors compared at the feature level with current links/dates.
- [ ] Gap verdict and counter-evidence documented.
- [ ] All factual claims cited; estimates labelled.

### App
- [ ] Five-slide deck navigates by keyboard and buttons.
- [ ] Speaker notes exist, not all exposed in audience view.
- [ ] Simulator has deterministic Normal, Mismatch, Missing, Duplicate/Out-of-order, Threshold and Stale-data scenarios.
- [ ] Volume and percentage calculations have tests and visible explanations.
- [ ] All simulated entities/locations/readings are clearly labelled SIMULATED.
- [ ] No secret, paid service or remote database is required.

### Delivery
- [ ] README has exact install/run/test/export instructions.
- [ ] Lint/typecheck/build/test results are reported honestly.
- [ ] Browser screenshots/evidence included if tooling permits.
- [ ] Speaker script stays near 10 minutes and matches the app.
- [ ] Risks and next hardware steps are stated.
- [ ] Optional PPTX was actually generated and checked; otherwise mark it not delivered.
