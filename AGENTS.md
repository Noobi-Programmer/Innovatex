# AGENTS.md — permanent instructions for coding agents

These rules apply to every agent working in this repository (OpenCode, Astra, or any
other). Keep them short, true, and repository-relative. Never record machine-specific
absolute paths, usernames, or secrets here.

Current project state lives in `AGENT_HANDOVER.md` — read it before starting work and
update it after every task, including a task that fails.

## Project

JalTrace is a deterministic, browser-run prototype for the InnovateX competition: it
reconciles groundwater extraction → tanker loading → delivery records and flags missing
events and quantity discrepancies for human review. All demo data is synthetic.

Repository: https://github.com/Noobi-Programmer/Innovatex

## Stack and architecture

- Static site: `index.html`, `demo.html`, `research.html`, `about.html` + `src/` (plain
  ES modules, no framework, no bundler, no runtime dependencies).
- Domain logic: `src/lib/jaltrace-domain.mjs` — pure functions, no DOM, no network, no
  clock. Callers supply readings, tolerances, timestamps and the scenario clock.
- Re-exports: `src/lib/jaltrace-engine.mjs` is the public entry point for the domain and
  fixtures modules. UI code imports from it (plus feature-specific modules directly).
- Fixtures: `src/lib/jaltrace-fixtures.mjs` — deterministic, source-labelled scenarios.
- UI: `src/app.js` (pitch deck), `src/demo.js` (evidence ledger), `src/research.js`
  (source table). Rendering is string-template based; escape any operator-entered text.
- Server: `server.mjs` — dependency-free local static server on `127.0.0.1:4173`.
- Tests: `node --test tests/*.test.mjs` (Node built-in runner, zero dependencies).

## Commands

- `npm test` — run the test suite (no install step; there are no dependencies).
- `npm run check` — verify required files and `package.json` parse.
- `npm run build` — rebuild static output into `dist/` (generated, git-ignored).
- `npm start` — run the local server at http://127.0.0.1:4173/

## Conventions

- Keep new domain logic in pure, dependency-free modules under `src/lib/` so it can be
  unit-tested with `node --test`. UI modules may touch the DOM only.
- Use relative URLs (`./src/...`, `demo.html`, `index.html`). Root-absolute paths
  (`/src/...`, `/demo`) break the GitHub Pages project site at
  `https://noobi-programmer.github.io/Innovatex/`.
- Add new required files to the list in `scripts/check.mjs`.
- Reuse the existing design tokens and classes in `src/styles.css` before inventing new
  ones (`--aqua`, `--amber`, `--coral`, `--muted`, `.panel`, `.tag`, `.status-summary`).
- No dependencies without an explicit human decision. No bundler, no CDN scripts.

## Truthfulness rules (non-negotiable)

- Never fabricate functionality, test results, screenshots, benchmark numbers, market
  claims or telemetry. Run the commands and report what actually happened.
- Every demo value is `SIMULATED` or `OPERATOR-ENTRY`; never present it as a sensor
  measurement, and never claim a physical sensor is connected.
- A discrepancy is an exception for human review — never proof of fraud, theft, illegal
  extraction or contamination. Permit/NOC fields are metadata only; legality is never
  inferred.
- If a check could not run (e.g. no browser binary for visual validation), record it as
  blocked. Do not weaken a test to make it pass.

## Git workflow

- One task = one dedicated branch. Never `reset`, `clean`, `--force` checkout, force-push
  or rewrite history; other sessions and humans have uncommitted work in this tree.
- Preserve all pre-existing changes. Re-read a file immediately before editing it —
  another agent session may be editing the same tree concurrently.
- Commit, push, and only then claim the work is available on another machine.
- Never commit API keys, tokens, `.env` values or other secrets. Environment variable
  names may be listed; values never.
- After every task (including a failed one), update `AGENT_HANDOVER.md` with the branch,
  commit hash, real verification results, and the next task.
- `AGENT_HANDOVER.md` is shared: merge your section into it, never replace it wholesale,
  and re-read it immediately before editing — another session may have just updated it.
  Confirm your update survived (`git status` clean for the file) before claiming it.
