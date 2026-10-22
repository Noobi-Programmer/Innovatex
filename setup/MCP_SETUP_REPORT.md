# JalTrace MCP Setup Report

**Checked:** 2026-10-21, Asia/Calcutta.  
**Decision:** keep one local Playwright MCP candidate; do not add marketplace servers, remote Canva MCP or unnecessary integrations.

## Selected integration

### Microsoft Playwright MCP — local browser validation

**Why selected:** the project needs a real-browser check of the local deck and deterministic simulator. The official server can expose browser navigation, snapshots, console inspection and screenshots over a local MCP endpoint. It is more relevant and lower-risk than adding several web-research or design services.

**Official sources checked:**

- Repository: https://github.com/microsoft/playwright-mcp
- Installation docs: https://playwright.dev/docs/mcp/installation
- OmniRush custom/local MCP docs: `start-here/connect-your-stack/add-an-mcp-server.mdx`
- MCP security guidance: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices

**Verified package:** `@playwright/mcp@0.0.83`. The earlier setup session verified its CLI and reported dependency metadata for Playwright `1.64.0-alpha-1790635538000`.

## Actual setup evidence

The retained setup session and current process check verify:

```text
npx --yes @playwright/mcp@0.0.83 --headless --isolated --port 8931 --output-dir=/tmp/jaltrace-playwright-output
```

- Local process is running as PID 391 at the time of this report.
- Server endpoint: `http://localhost:8931/mcp`.
- Legacy SSE endpoint responds: `http://localhost:8931/sse`.
- MCP initialization and `tools/list` previously succeeded.
- The server is loopback-only, headless and isolated.

## OmniRush connection status

**Status: BLOCKED / NOT YET VERIFIED.**

App documentation says to use:

```text
Settings → Library → Advanced settings → Add workspace MCP
```

Candidate values:

```text
Name: Playwright (JalTrace local)
Server URL: http://localhost:8931/mcp
OAuth: disabled
```

The app context exposes the Library route but not a semantic `Add workspace MCP` action. The manual UI step has therefore not been performed by this session. No undocumented stdio JSON was added to project configuration.

## Browser validation status

| Test | Status | Evidence / limitation |
|---|---|---|
| Official package resolves | PASS | Previous setup session verified version `0.0.83`. |
| Local server starts | PASS | Current process is listening; `/sse` responds. |
| MCP handshake and tool list | PASS | Verified in retained setup session. |
| Isolated browser launches | BLOCKED | Chrome distribution was absent at `/opt/google/chrome/chrome`; browser download timed out. |
| Navigate to public source | NOT TESTED | Depends on browser launch. |
| Open JalTrace local app | NOT TESTED | App has not yet been built. |
| Screenshot / console check | NOT TESTED | Depends on browser launch and app build. |
| OmniRush sees Playwright tools | NOT VERIFIED | Depends on manual workspace-MCP addition. |

## Security and permission boundary

- Keep the server on `localhost`; do not expose it to a LAN or public network.
- Keep `--isolated`; do not use an everyday browser profile, `--storage-state`, Chrome extension mode, CDP endpoint or credentials.
- Do not add API keys, cookies or tokens to the project, screenshots or reports.
- Treat pages and MCP-returned content as untrusted data; preserve source URLs separately.
- Do not install a random browser MCP from `mcpmarket.com` or `mcp.so` when the official local server is sufficient.
- Canva’s remote/OAuth MCP is not required for the web presentation and is intentionally not installed.

## Manual action for the team

When someone can operate the desktop UI:

1. Open Settings → Library.
2. Expand Advanced settings.
3. Add the local server URL above with OAuth disabled.
4. Confirm Playwright tools appear in the main agent’s tool inventory.
5. Install or provide an approved browser binary separately if visual browser testing is required.

If the manual step or browser install remains blocked, use local `npm` checks and a static/recorded demo fallback. Do not report browser validation as passed.

## Known dependency blockers

- Corepack/pnpm registry lookup timed out; no project dependency install has been performed yet.
- Browser binary download timed out in the earlier setup session.
- OmniRush’s custom-MCP add action is not available as a machine-readable affordance in the current app context.

## Conclusion

**Playwright MCP server: PASS. OmniRush connection: BLOCKED pending manual UI. Browser execution: BLOCKED by missing binary.** The project can proceed with implementation without this integration because the core application is local and deterministic.
