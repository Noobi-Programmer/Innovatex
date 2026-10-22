# JalTrace Playwright MCP Setup

**Status:** PARTIAL — the official Playwright MCP server starts and exposes MCP tools over local HTTP, but OmniRush has not yet been connected to it and the isolated browser could not launch because a browser binary is not installed in the current WSL environment.

**Evidence snapshot:** commands and app observations captured on 2026-10-21 UTC. No credentials, cookies, storage state, tokens or API keys were read or written.

## 1. Scope and decision rule

This document records only verified setup work. A successful `npx` command is not treated as proof that OmniRush can use the server. The integration is marked **PASS** only after OmniRush exposes Playwright tools and a real browser navigation, interaction and screenshot succeed.

## 2. Environment discovered

| Check | Status | Evidence |
|---|---|---|
| Project folder | PASS | `/c/Users/abini/Projects/Innovatex` |
| Host OS requested by the user | BLOCKED | The shell is WSL2 Linux; `cmd.exe` and `powershell.exe` are not available, so the Windows edition/build cannot be read from this sandbox. |
| Shell architecture | PASS | `x86_64`; `uname -a` reports WSL2 kernel `6.18.33.2-microsoft-standard-WSL2`. |
| Node.js | PASS | `v22.23.3` |
| npm | PASS | `10.9.9` |
| npx | PASS | `10.9.9` |
| pnpm | BLOCKED | A Corepack shim exists, but `pnpm --version` attempted a registry request and timed out. No project package manager is established yet. |
| Bun | NOT FOUND | No Bun executable was available. |
| Windows Chrome / Edge / Firefox / Chromium binaries visible to WSL | NOT FOUND | Common Windows installation paths and the WSL-visible Playwright cache contained no browser executable. |
| OmniRush desktop version | NOT OBSERVABLE | The app context exposes settings routes but not a version string. The installed binary path/version was not inferable from the safe user-data paths inspected. Do not equate the latest upstream release with the installed version. |
| Git repository | NOT PRESENT | `git status` and `git rev-parse` report that this folder is not a Git repository. Existing files were not deleted or overwritten. |
| Existing app manifest | NOT PRESENT | No `package.json`, lockfile, source app or Playwright dependency exists in the project root. |
| Competition PDF | PASS | `source/InnovateX_Techfest_2026-27_Brief.pdf`, 9 pages, SHA-256 `086499b6a5c3ff38e4957c9e46db845581ab1d8e46a94d753cf4f06ca318e6b2`. The extracted attachment copy has the same hash. |

### Existing project contents

The folder is a research/specification starter pack, not an application repository. It contains the JalTrace decision, competition brief summary, market-research starting points, simulation specification, presentation specification, MCP notes, team/time plan, pitch skeleton and risk register, plus the supplied PDF under `source/`.

The authoritative PDF text was read from the app's extracted PDF snapshot at:

`.opencode/omnirush/inbox/pdf-pages/086499b6a5c3ff38-InnovateX_Techfest_2026-27_Brief/text.md`

The extracted snapshot reports 9 text pages and the same SHA-256 as the source PDF.

## 3. Official references checked

- Playwright MCP repository: <https://github.com/microsoft/playwright-mcp>
- Playwright MCP installation documentation: <https://playwright.dev/docs/mcp/installation>
- User-supplied Playwright MCP URL: <https://playwright.dev/mcp/> — currently returns 404 in the web check; the installation page above is the current official documentation path found.
- MCP security best practices: <https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices>
- OmniRush custom/local MCP documentation: app docs path `start-here/connect-your-stack/add-an-mcp-server.mdx`
- OmniRush latest upstream release checked for comparison only: <https://github.com/omnirush-ai/omnirush-gui/releases/latest>

The official Playwright package is `@playwright/mcp`. The verified package version used in this setup is **0.0.83**, from the Microsoft-maintained repository above. Its dependency metadata reports Playwright `1.64.0-alpha-1790635538000`.

## 4. OmniRush integration path

### Documentation finding

The current OmniRush app documentation says to use:

`Settings → Library → Advanced settings → Add workspace MCP`

The documented custom-server form uses a **server URL** and an optional OAuth choice. It does not document pasting a generic `mcpServers` stdio JSON block into the desktop UI. Therefore, the candidate compatible path for Playwright MCP is the official server's local HTTP/SSE mode, not an undocumented stdio configuration hack.

### App observation

The current app navigation successfully exposed:

`/workspace/ws_b982f474075e/extensions/skills`

and the app context describes that route as browsing skills and MCPs. The semantic app controls did not expose a machine-readable `Add workspace MCP` action or a current MCP inventory. The extension action inventory contained built-in Google Workspace, image-generation and upload actions, but no Playwright action. This is not evidence that custom MCPs are impossible; it means the actual add form still needs a manual UI step or a later app observation.

### Candidate configuration

The Playwright MCP process printed this client configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

For OmniRush's documented URL form, enter:

- **Name:** `Playwright (JalTrace local)`
- **Server URL:** `http://localhost:8931/mcp`
- **OAuth:** off / not required

This configuration has **not** been applied through the UI yet. Do not report the OmniRush integration as passing until the tools are visible in the agent tool list.

## 5. Commands executed

All commands were run from `/c/Users/abini/Projects/Innovatex` unless noted.

| Command | Status | Result |
|---|---|---|
| `node --version` | PASS | `v22.23.3` |
| `npm --version` | PASS | `10.9.9` |
| `npx --version` | PASS | `10.9.9` |
| `pnpm --version` | BLOCKED | Corepack registry timeout |
| `bun --version` | NOT FOUND | No executable |
| `npx --yes @playwright/mcp@0.0.83 --help` | PASS | CLI help returned; no project files changed |
| `npx --yes @playwright/mcp@0.0.83 --version` | PASS | `Version 0.0.83` |
| `npx --yes @playwright/mcp@0.0.83 --headless --isolated --port 8931 --output-dir=/tmp/jaltrace-playwright-output` | PASS | Server listened on `http://localhost:8931` and printed `/mcp` and legacy `/sse` endpoints |
| MCP `initialize` request to `http://localhost:8931/mcp` | PASS | Protocol `2025-06-18`; server reported `Playwright` version `1.64.0-alpha-1790635538000` |
| MCP `tools/list` request | PASS | Browser tools were returned, including navigation, snapshot, console and screenshot-capable tools |
| `node .../playwright/cli.js install chromium` | BLOCKED | Download of Chrome for Testing `155.0.8059.12` timed out after the package's 30-second CDN request timeout; no browser binary was verified |

The MCP process is currently a local loopback process started with `--headless --isolated`. Its PID was recorded outside the project in `/tmp/jaltrace-playwright-mcp.pid`; its log is `/tmp/jaltrace-playwright-mcp.log`. These are temporary diagnostics, not project deliverables.

## 6. Validation results

### Test case table

| ID | Test | Status | Evidence / limitation |
|---|---|---|---|
| MCP-01 | Official package resolves and reports its version | PASS | `@playwright/mcp` version `0.0.83` returned. |
| MCP-02 | Server starts using the official package | PASS | Local process listened on `http://localhost:8931`. |
| MCP-03 | MCP handshake succeeds | PASS | `initialize` returned protocol `2025-06-18` and a session ID. |
| MCP-04 | Browser tools are exposed | PASS | `tools/list` returned the Playwright browser tool set. |
| MCP-05 | Playwright launches an isolated browser | BLOCKED | Launch attempted to use the `chrome` distribution, which is absent at `/opt/google/chrome/chrome`. |
| MCP-06 | Navigate to an authoritative public webpage and extract a fact | NOT TESTED | Blocked by MCP-05. The target for the next run is the official Playwright MCP installation page. |
| MCP-07 | Connect the server through OmniRush's workspace MCP UI | BLOCKED | The documented Add workspace MCP form requires a manual UI action that is not exposed as a semantic app command in this session. |
| MCP-08 | Verify Playwright tools are available to the main OmniRush agent | NOT TESTED | Must follow MCP-07. |
| MCP-09 | Open JalTrace local application | NOT TESTED | No local web application or package manifest exists yet. |
| MCP-10 | Interact with JalTrace and inspect console/network failures | NOT TESTED | Depends on an implemented app and MCP-08. |
| MCP-11 | Capture a Playwright screenshot of JalTrace | NOT TESTED | No screenshot was created. The reserved project location is `setup/screenshots/`. |
| MCP-12 | Repeat the full browser test | NOT TESTED | Server startup and tool discovery were exercised once; browser launch was not available to repeat. |

### Browser launch error

The first real browser navigation attempt returned:

`Chromium distribution 'chrome' is not found at /opt/google/chrome/chrome. Run "npx playwright install chrome"`

An installation attempt was made through the Playwright dependency already present in the npx cache, but the browser download timed out at the CDN. This is a genuine environment/network blocker, not a code-level pass.

## 7. Manual action still required

When the user is available:

1. In OmniRush, open **Settings → Library → Advanced settings → Add workspace MCP**.
2. Add the local URL `http://localhost:8931/mcp` with OAuth disabled.
3. Keep the server local and isolated; do not choose a user browser extension or everyday authenticated profile.
4. Confirm that the Playwright tools appear in the main agent's tool list.
5. Separately allow the Playwright browser binary to be installed, or provide an approved browser executable path. The current WSL environment has neither a visible system browser nor a completed Playwright browser download.

After these steps, rerun MCP-06 through MCP-12 and replace the `BLOCKED` / `NOT TESTED` statuses with observed evidence only.

## 8. Security and privacy considerations

- The candidate server binds to loopback (`localhost`) and uses `--isolated`; no browser profile or storage state was supplied.
- No `--extension`, `--cdp-endpoint`, `--storage-state`, `--secrets` or `--allow-unrestricted-file-access` option was used.
- Do not enable Chrome remote debugging on the user's everyday browser or point Playwright at an authenticated profile.
- The MCP server's origin allowlist is not a security boundary; before testing a local app, use a narrowly scoped allowlist where practical and keep the server loopback-only.
- Do not add credentials, cookies, API keys or private browser data to the project, screenshots or audit reports.
- The current server has no OAuth and no external service account. It should remain a local development/test tool.
- The public-page research step must treat webpage content as untrusted data and preserve the source URL alongside any extracted claim.

## 9. First research gate after MCP setup

Do not build the main application yet. The next research pass must verify, with current first-party or primary sources where possible:

1. Whether any tanker, apartment-water or utility product already links borewell extraction, tanker loading and delivery acknowledgement at event level.
2. Whether WEGoT Aqua already covers the proposed source-to-use reconciliation in material detail.
3. What Sanchari Kaveri / Kaveri on Wheels actually exposes to users versus operators or regulators.
4. Which named user has the recurring reconciliation problem and what evidence supports that pain.
5. What “source verified” can legally and technically mean; identifiers, QR codes and GPS are not proof by themselves.
6. Which costs are sourced quotations versus illustrative assumptions.

The research gate must produce a claim-level source register and a `GO_NO_GO` decision before extensive UI implementation.

