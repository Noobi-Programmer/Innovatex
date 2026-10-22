# OmniRush Setup & Sub-Agent Recommendations

## UI settings based on the supplied screenshot

The screenshot shows the main composer set to **GPT 6 Astra · Max**. The sub-agent model menu offers “Same as main agent”, “GPT 6 Astra”, “GPT 6.1 Sol”, “GPT 6 Sol”; the sub-agent effort menu offers “Same as main agent”, “Low”, “High”, “Xhigh”, “Max”. Names/options may vary by account/version.

## Recommended configuration

### Main agent

- **Model:** GPT 6 Astra
- **Effort:** Max
- **Role:** project orchestrator, final editor, integration owner and reviewer.
- Reason: this task has intertwined competition requirements, competitor research, app architecture, visual storytelling and a high-stakes time constraint.

### Sub-agent A — market/competition research

- **Model:** GPT 6.1 Sol (if selectable; otherwise GPT 6 Sol)
- **Effort:** High
- **Task:** verify competitor capability claims from first-party sources, create feature-level comparison and source-linked gap verdict. It must not code the app.

### Sub-agent B — simulation logic/testing

- **Model:** GPT 6 Sol (if selectable; otherwise Same as main agent)
- **Effort:** High
- **Task:** design/test the pure event-reconciliation engine, edge cases and deterministic scenarios. It must report tests actually run.

### Optional sub-agent C — design/slide critique

- **Model:** GPT 6.1 Sol or Same as main
- **Effort:** High
- **Task:** review five-slide story for clarity, factual defensibility, judge objections and legibility. Use only after a draft exists.

## Concurrency

Start with two sub-agents maximum (research and simulation/tests). Let the main agent build/integrate. Add the slide critic only after a complete draft. Too many agents can cause duplicate files, conflicting architecture and token waste.

## Work protocol

1. Main agent reads every `.md` file in the project root and the PDF in `source/`.
2. Produce a short initial plan and inspect the current workspace before changing files.
3. Delegate research and simulation spec/test review to independent agents, with outputs placed in separate files.
4. Main agent consolidates research findings before fixing slide claims.
5. Implement the smallest complete vertical slice first: slide deck opens → demo scenario runs → discrepancy is calculated → result appears.
6. Run checks; review screenshots; fix issues; document failures honestly.
7. Deliver final file tree, run commands, source list, actual test results, export locations and known limitations.

## Protect exam time

The user reports an end-term exam tomorrow. Do not demand frequent interaction. Do not start long dependency installs unless needed and approved. First use a bounded research/planning phase, preserve everything to disk, then implement in focused blocks after the exam. If the user must approve an install, continue independent work while awaiting approval rather than repeatedly interrupting them.

## If using the CLI instead of desktop

OmniRush official docs say the CLI requires Node.js 22.19 or newer and is installed via `npm i -g omnirush@latest`; commands include `omnirush doctor`, and `/subagents` checks which model sub-agents use. This team is using the desktop app per screenshot, so do not require CLI installation unless the agent finds a specific need.
