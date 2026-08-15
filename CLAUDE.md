# CLAUDE.md

Guidance for AI agents (and humans) working in this repository. This is the
canonical onboarding doc — `AGENTS.md`, `README.md`, and `CONTRIBUTING.md` point here.

## What this is

`react-native-user-avatar` is a **pure-JavaScript React Native component** (no native
code) that renders a user avatar: a remote image when `src` resolves to one, a custom
element when `component` is given, or otherwise the user's initials on a deterministic
colored background. Published to npm as
[`react-native-user-avatar`](https://www.npmjs.com/package/react-native-user-avatar).

Public API (see `src/index.tsx`):

| Export | Notes |
| --- | --- |
| `default` (`UserAvatar`) | The component. Props are documented in `README.md` and typed by `UserAvatarProps`. |
| `UserAvatarProps` | The prop type. |
| `generateBackgroundColor(name, bgColor?, bgColors?)` | Helper to compute the deterministic color for a name. |
| `DEFAULT_BG_COLORS` | The default background palette. |

## Architecture

```
src/index.tsx            ← UserAvatar: chooses image / custom / initials, resolves src async
src/helpers.ts           ← abbr(), sumChars(), fetchImage(), color + container styles
src/types.ts             ← UserAvatarProps + DEFAULT_BG_COLORS
src/components/
  TextAvatar.tsx         ← initials text
  ImageAvatar.tsx        ← <Image>
  CustomAvatar.tsx       ← wraps an arbitrary element
  index.ts               ← barrel
```

- `UserAvatar` renders synchronously. It picks the variant from props; the only async
  work is validating a remote `src` via `fetchImage`, tracked by a single `isImage`
  state flag (reset whenever `src`/`component`/`ignoreContentType` change).
- `fetchImage` uses the global `fetch`/`AbortController` (no polyfill). Intentional
  aborts (unmount / `src` change) resolve to `false` without logging.

## Repository map

| Path | What it is |
| --- | --- |
| `src/` | TypeScript source (the only hand-edited code). |
| `src/**/__tests__/` | Jest tests (behavior-focused, `react-test-renderer`). |
| `lib/` | **Build output** from `react-native-builder-bob` — do not hand-edit. |
| `badges/` | Auto-generated coverage badges (`npm test`) — do not hand-edit. |
| `Example/` | Expo app that consumes the library (iOS/Android/Web). |
| `.github/workflows/` | CI (`ci.yml`), CodeQL (`codeql.yml`), release (`publish.yml`). |

## Common commands

| Command | What it does |
| --- | --- |
| `npm test` | Jest with coverage, then regenerates coverage badges. |
| `npm run typescript` | Type-check with `tsc --noEmit`. |
| `npm run lint` | ESLint over `.js/.jsx/.ts/.tsx`. |
| `npm run prepack` (`bob build`) | Compile `src/` → `lib/` (commonjs, module, typescript). |
| `npm run example <cmd>` | Run a script in the `Example/` app (e.g. `npm run example start`). |
| `npm run bootstrap` | Install root + `Example/` deps and copy `.env`. |

Run `npm run lint && npm run typescript && npm test` before committing — the same
checks the pre-commit hook and CI run.

## Build & publish

- **Build**: `react-native-builder-bob` compiles `src/` → `lib/` in three targets:
  `commonjs`, `module`, `typescript`. `package.json` `main`/`module`/`types` point into
  `lib/`; the `react-native` field points at `src/index.tsx` so Metro reads source.
- **Packaged files**: controlled by the `files` allowlist in `package.json` (`src`,
  `lib`, with `__tests__`/`__mocks__`/`__snapshots__` negated).
- **Release**: `npm run release` (`release-it` + conventional-changelog) bumps the
  version, updates `CHANGELOG.md`, commits, tags `vX.Y.Z`, and creates the GitHub
  release. Pushing that tag triggers `.github/workflows/publish.yml`, which publishes to
  npm with provenance and then verifies the published tarball.

## Conventions

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/), enforced by
  commitlint via husky (`.husky/commit-msg`). Types: `feat`, `fix`, `refactor`, `docs`,
  `test`, `chore`, `perf`, `ci`, plus `BREAKING CHANGE`.
- **Pre-commit** (`.husky/pre-commit`): runs lint + typecheck + tests.
- **Formatting**: Prettier — single quotes, 2-space indent, ES5 trailing commas, no tabs.
- **Immutability / no mutation**, small focused files, explicit error handling.

## Gotchas

- **Never hand-edit `lib/` or `badges/`.** Both are generated (`bob build` / `npm test`).
- **`react`/`react-native` are peer dependencies** (wildcard). Don't add them back as
  hard dependencies.
- **No polyfills.** Use the global `fetch`/`AbortController`; don't reintroduce
  `node-fetch`/`abortcontroller-polyfill`.
- **Test in `Example/`** for visual/behavior changes before opening a PR.
