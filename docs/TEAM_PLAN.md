# JalTrace Four-Person Team Plan

**Constraint:** four students, strong web skills, no hardware confirmed, near-zero initial software budget, and exam preparation takes priority.  
**Rule:** no overnight build promise; use bounded blocks, checkpoints and a tested backup demo.

## Ownership

| Owner | Primary responsibility | Deliverables | Review partner |
|---|---|---|---|
| Member 1 — Frontend | Web presentation, visual system, responsive layout, accessibility and demo controls | `index.html`, `demo.html`, `src/app.js`, `src/demo.js`, `src/styles.css` | Member 4 |
| Member 2 — Simulation/data | Fixtures, event model, reconciliation rules, edge cases and tests | `src/lib/*`, `tests/*`, `docs/SIMULATION_DESIGN.md` | Member 1 |
| Member 3 — Research/product | Competition requirements, competitor evidence, user discovery, cost and risk framing | `research/*`, `presentation/SOURCES.md`, `docs/COST_MODEL.md`, `docs/IMPACT_AND_VALIDATION.md` | Member 4 |
| Member 4 — Integration/pitch | Story, speaker notes, merge/integration, rehearsal, judge Q&A and fallback | `presentation/*`, `README.md`, `IMPLEMENTATION_STATUS.md`, final runbook | Everyone |

Each artifact has one owner, but everyone reviews the final ten-minute story and the claims that affect safety, legality or originality.

## Two-day execution plan after the exam

### Day 1 — freeze the claim and rehearse the vertical slice

| Block | Duration | Owner | Output | Dependency |
|---|---:|---|---|---|
| Read GO/NO-GO and freeze scope | 30 min | All | One-sentence problem and no-go claims | `research/GO_NO_GO.md` |
| Run tests/check/build | 30 min | Member 2 | Green local checks | Node/npm available |
| Inspect every demo scenario | 60 min | Members 1–2 | Scenario checklist and fixture notes | local server |
| Update evidence and cost caveats | 60 min | Member 3 | Sources and cost model ready | source register |
| Rehearse five-slide story | 60 min | Member 4 | Timed pitch and Q&A answers | slides + demo |
| Make fallback assets | 45 min | Members 1–4 | screenshots/recorded walkthrough if feasible | stable build |

### Day 2 — validate claims and package delivery

| Block | Duration | Owner | Output | Dependency |
|---|---:|---|---|---|
| Conduct five operator/product conversations | 2–3 h | Member 3 | notes, null results and pivot evidence | contacts |
| Request one current hardware quote | 30 min | Member 3 | dated quote or documented non-response | supplier contact |
| Re-check competition schedule | 15 min | Member 4 | portal-confirmed date/time | Team Leader access |
| Run final checks and smoke test | 30 min | Member 2 | test/check/build output | final files |
| Full timed rehearsal | 45 min | All | <=10 minutes, clean handoffs | final pitch |
| Freeze and export | 30 min | Member 4 | presentation files, URL and backup | all blockers resolved |

## Dependencies and fallbacks

- **No hardware:** keep the deterministic software demo; say explicitly that the field layer is planned.
- **No browser automation:** use the local server plus static screenshots or a recorded walkthrough; do not claim browser validation passed.
- **No operator interviews:** label market validation as pending/inconclusive and remove stronger demand claims.
- **No supplier quote:** retain “quote required”; do not invent installed costs.
- **Schedule conflict:** Team Leader verifies the portal; the PDF is not assumed to be current.
- **Live demo failure:** use the static Slide 4 content and explain the exact deterministic fixture.

## Definition of done

- `npm test`, `npm run check` and `npm run build` pass.
- The app serves `/`, `/demo`, `/research` and `/about` locally.
- All nine fixtures are deterministic and labeled simulated.
- The pitch names existing alternatives and says the gap is inconclusive.
- The team can explain the 6,000 L / 5,300 L / 700 L / 11.67% example.
- No slide claims legality, water quality, water saved, uniqueness or production readiness.
- A human-review and validation plan is ready for judge questions.
