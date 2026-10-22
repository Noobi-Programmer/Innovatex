# JalTrace × OmniRush Starter Kit

**Purpose:** A ready-to-use project brief and one-shot execution prompt for OmniRush (main model: GPT 6 Astra, effort Max) to research, build, validate and present a JalTrace concept for Techfest IIT Bombay's InnovateX challenge.

**Context supplied by the team:** Bengaluru-first, potential India-wide scale; four members; strong web development; no hardware currently available; ₹0 initial budget; optional borrowing of ESP32/flow-sensor hardware later. The team says an end-term exam is tomorrow (22 Oct 2026 context), so do not demand constant attention or pull the team into unnecessary setup work.

## Start here

1. Extract this folder somewhere easy to find, e.g. `Documents/InnovateX/JalTrace`.
2. Open this exact folder as the OmniRush workspace.
3. Read `06_OMNIRUSH_SETUP_AND_AGENT_ROLES.md` and choose the model settings listed there.
4. Open `08_MASTER_ONE_SHOT_PROMPT.md`, copy its **entire prompt**, and paste it into OmniRush.
5. Let the agent inspect the project and its MCP settings. Do **not** blindly install every MCP server from a directory.
6. Keep `source/InnovateX_Techfest_2026-27_Brief.pdf` in the workspace. It is the source of truth for the competition rules.

## Files in this pack

- `00_PROJECT_DECISION.md` — what JalTrace should mean, what is and isn't proven, and the no-overclaim rules.
- `01_COMPETITION_BRIEF.md` — the PDF requirements relevant to the presentation.
- `02_MARKET_RESEARCH_AND_SOURCES.md` — competitor map, what the market already offers, research links, and the gap to test.
- `03_SIMULATION_SPEC.md` — virtual system, data model, scenarios, calculations, demo mode and acceptance tests.
- `04_WEB_PRESENTATION_SPEC.md` — five-slide, 10-minute web presentation with speaker notes and embedded interactive demo.
- `05_MCP_AND_SKILLS_SETUP.md` — OmniRush-compatible MCP setup strategy and safe discovery rules.
- `06_OMNIRUSH_SETUP_AND_AGENT_ROLES.md` — main/sub-agent model and effort recommendations.
- `07_TEAM_AND_TIME_PLAN.md` — exam-safe workflow and team split.
- `08_MASTER_ONE_SHOT_PROMPT.md` — the single copy-paste prompt to give OmniRush.
- `09_PITCH_SCRIPT_AND_JUDGE_QA.md` — draft pitch, demo narration and questions to prepare for.
- `10_RISK_REGISTER_AND_ACCEPTANCE.md` — feasibility risks and definition of done.
- `source/` — the competition PDF and the OmniRush model-selection screenshot supplied by the team.

## Important product truth

JalTrace is **not yet validated as a novel market opportunity**. Bengaluru already has tanker booking/tracking products and a public tanker-management programme, and existing products cover delivery records, water metering and consumption analytics. The core differentiation hypothesis is the **event-linked reconciliation of borewell extraction → tanker loading → delivery**, including missing-data and quantity-discrepancy flags. OmniRush must validate that gap rather than claim it is first or unique.

## Desired end state

A polished browser-run web presentation, an integrated and clearly labelled virtual simulation, source-linked research and a reproducible project. An editable `.pptx` export is a useful extra if it can be generated reliably without derailing the web deck. All simulation data must be labelled as simulated. Never imply any physical sensor is connected unless the team actually connects one.
