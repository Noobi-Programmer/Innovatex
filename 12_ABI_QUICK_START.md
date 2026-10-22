# Abi's Quick Start — What To Do First

## Before the exam

1. Extract `JalTrace_OmniRush_Starter_Kit.zip` into a dedicated folder.
2. Open that exact folder as the OmniRush workspace.
3. Set the main model to **GPT 6 Astra / Max** (as in your screenshot).
4. If selecting sub-agent options, use only two initially:
   - Research: **GPT 6.1 Sol / High**.
   - Simulation/tests: **GPT 6 Sol / High**.
   - If either option is missing, use **Same as main agent**; do not waste time troubleshooting the picker.
5. Open `08_MASTER_ONE_SHOT_PROMPT.md`, copy the whole prompt, and send it to OmniRush.
6. Let it inspect the files, MCP settings and competitor sources. It should save research notes and a checkpoint. Do not spend exam-prep time manually installing every MCP server.

## MCP choice

Use the OmniRush Settings → MCP screen to see what's actually available. Prefer its built-in filesystem/project access, Git and supported local Playwright MCP if offered. Do not try to force Canva's remote/OAuth MCP into the desktop app if its current version doesn't support remote MCPs. The web-based deck can be built directly in the project; a PPTX export is optional.

## After the exam

1. Read `research/market-gap-report.md` (the agent creates it). If it says `CROWDED / WEAK`, do not ignore that result just because the deck is already styled.
2. Confirm the chosen, evidence-backed narrow use case with the team.
3. Run the app and demo normal → discrepancy → missing record → reset.
4. Check all simulated content has visible labels.
5. Rehearse the 10-minute pitch and prepare a recorded demo/screenshot backup.

## Four-person split

- Member 1: web deck and dashboard UI.
- Member 2: deterministic simulation, reconciliation logic and tests.
- Member 3: competitor research, source citations, economics and risks.
- Member 4: integration, speaker notes, Q&A and final demo.

## Non-negotiable

Do not claim JalTrace is first/unique until the research supports it. Do not call a quantity mismatch fraud. Do not call simulated readings real. The point of the first phase is to find a defensible gap and demonstrate a complete, honest workflow—not to install lots of tools.
