# Stack & Commands — Guidance, Not Blind Instructions

The agent must inspect the existing environment first and adapt. Do not run every command automatically.

## New web project if the workspace is empty

Recommended: TypeScript + Next.js/React, Tailwind or lightweight CSS, Recharts (or lightweight SVG charts) and Lucide icons. Prefer the package manager already present; if none, check whether `pnpm` or `bun` is available. Avoid introducing several UI libraries for a 5-slide product.

Potential setup (only if truly needed):

```bash
pnpm create next-app jaltrace --ts --tailwind --eslint --app --src-dir
cd jaltrace
pnpm add recharts lucide-react
```

If Bun is the available/preferred package manager, adapt commands to Bun. Do not rerun project creation inside an existing project. If Next.js setup questions are shown, choose sensible defaults and explain any important choice.

## Validation

Use the commands declared by the actual `package.json`, for example:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```

Only run commands that exist. If no test script exists, add a minimal test setup only if it is worth the time, or create a `node:test`/existing-runner test for the pure reconciliation module. Report actual output rather than assuming success.

## Presentation export

If the app is stable, optionally use PptxGenJS to create editable slides from the same content. Do not introduce an export dependency until core web presentation works. Verify output path and nonzero file size; if possible, open/convert it through an available renderer and inspect slide overflow.

## Do not

- Add a database just to store demo fixtures.
- Add OAuth/login/Canva API keys.
- Install several different browser MCPs.
- Use real user location or actual tanker markers in synthetic demo data.
- add “AI” just to make the pitch sound sophisticated; rules/analytics are sufficient unless an evidence-backed ML task is specified.
