# MCP & Agent Skills — Safe Setup for OmniRush Desktop

## Critical compatibility note

OmniRush's current desktop project README says its Settings → MCP surface supports local MCP servers from its supported list (examples include filesystem, git, SQLite, memory, sequential thinking, time and Playwright on local pages). It also states that remote and account-linked MCP servers are not supported in this desktop surface. Confirm this against the installed version because software changes.

Official product/repository documentation:
- OmniRush install docs: https://omnirush.ai/docs
- OmniRush desktop repository/readme: https://github.com/omnirush-ai/omnirush-gui
- Microsoft Playwright MCP: https://github.com/microsoft/playwright-mcp
- MCP Market directory: https://mcpmarket.com/
- MCP.so directory: https://mcp.so/
- Canva MCP docs: https://www.canva.dev/docs/apps/quickstart/
- Canva MCP actions: https://www.canva.com/help/mcp-canva-usage/

## Discovery directories are not installers

Use `mcpmarket.com` and `mcp.so` to *discover and compare* servers and skills, not to blindly install the most popular entry. A directory listing doesn't guarantee OmniRush compatibility, safety, maintenance or permissions.

Before proposing any MCP/skill, check:
1. Is the publisher official or identifiable and the source repository linked?
2. Is it compatible with the installed OmniRush desktop version and its supported transport?
3. Is it maintained and licensed clearly?
4. What filesystem/network/browser/credential permissions does it need?
5. Does it materially help this project in the next 48 hours?
6. Is there a lower-risk built-in capability already available?

## Recommended minimal MCP set

### Required if available in OmniRush's MCP UI

- **Filesystem/project file access:** already inherent to workspace, or supported filesystem MCP if listed.
- **Git:** for safe checkpointing/version control if available.
- **Playwright MCP:** for testing the local deck/simulation in a real browser, if the OmniRush Settings → MCP picker supports it.

### Optional only if present and useful

- Sequential thinking for complex decomposition, if the supported list offers it.
- SQLite only if a local database materially helps; the MVP should work without one.

### Don't install for this task

- **Canva remote MCP by default.** Canva publishes a remote MCP service with OAuth, but OmniRush's current desktop docs state that remote/account-linked MCP servers aren't supported by that surface. Don't waste time bypassing the limitation. Build the deck as a web app and optionally export PPTX/PDF.
- Multiple similar browser servers.
- Cloud browser services needing accounts/keys.
- Scrapers requiring broad credentials.
- Any random server from a directory that requests secrets or elevated permissions.

## Playwright MCP

Microsoft's documented configuration for general MCP clients is:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

This is a reference configuration, **not a promise that it can be pasted into OmniRush**. Use it only if the installed OmniRush Settings → MCP surface explicitly supports that server and transport. The browser binary may be installed on first use. Do not run installers without checking Node availability and user permissions.

If the UI does not offer Playwright or installation requires an unsupported remote transport, do not hack app configuration. Continue with local build checks and ordinary Playwright test scripts if dependencies are already available; clearly note that MCP automation was unavailable.

## Browser MCP purpose

The high-value use is testing the locally running deck/simulator:
- open `http://localhost:<port>`;
- navigate slides and test keyboard controls;
- trigger each demo scenario;
- check layout at 16:9 and browser console for errors;
- capture screenshots as validation evidence.

Don't assume browser MCP automatically gives unrestricted web research access. For competitor research, use the agent's available web search capability and cited source URLs; if it lacks external browsing, record that limitation and leave a verified manual source list.

## Skills

Inspect OmniRush's built-in Library first. Search for skill names/capabilities such as web research/citation, frontend design, TypeScript testing, browser testing, presentation/storytelling, and accessibility. Use only existing or vetted skills that directly help. Do not bulk-install “all skills”.

If the workspace supports project-local instructions, create `AGENTS.md` with the essentials from the master prompt. Do not edit global configuration blindly.

## Permissions and secrets

- Prefer normal/careful permissions during setup.
- Never request or write tokens into source code, markdown files, screenshots or commits.
- No Canva API key, database key, paid API or OAuth connection should be necessary for the core deliverables.
- Ask the user before global installs, elevated privileges, deletion, changing global settings, or pushing commits.
- Stop if a server asks for unrelated credentials.
- Record all installed packages and why they were needed.
