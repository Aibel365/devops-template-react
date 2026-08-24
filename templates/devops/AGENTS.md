# AGENTS

Use this file as the shortest useful guide for making changes in this repo.

## Repo Layout

- File-based routing lives in `src/routes`.
- `src/router.tsx` wires the route tree and shared router context.
- `src/routes/__root.tsx` owns the app shell and global providers.
- `src/components` is shared UI; route-local UI belongs under `src/routes/**/-components`.

## Change Rules

- Prefer strict TypeScript and avoid `any` unless there is no better option.
- Prefer `#/...` or `@/...` imports over deep relative paths.
- Keep route files focused on routing and layout; move complex UI logic into local components.
- Follow existing async UI patterns, including Suspense and error boundaries, where they already fit.
- Preserve the existing style: 4-space indentation, semicolons, and double quotes.
- Prefer to use components from @aibel365/devops-designsystem
- When styling with colors, prefer Aibel design-system tokens and classes, such as border-aibel-bright-blue-border-default, instead of hex values or generic Tailwind colors.

## Guardrails

- Route file names define URL structure.
- Avoid changing `src/integrations` unless the task depends on auth, API, or platform behavior.
