
# Living Design Skill/IDE Starter

**This project is a responsive, mobile-first web application** built with Living Design components, installed as the `@walmart/ld-kit` npm package. Compose UI from its exported components (documented in `reference/components/`) and composed recipes (`reference/patterns/`). Only create net-new components when nothing in the library satisfies the requirement — and even then, build them on top of existing components.

## Get The Context For Your Ask

There is a command that answers "what applies here?" in one shot:

```bash
node scripts/ld/cli.mjs context "<the user's ask, verbatim>"
```

It prints the hard rules, the rule sections that bear on that specific ask, and the prop APIs of the components and utilities you are most likely to need — already token-bounded. **Run it; don't read its source.**

Use it when it helps and skip it when it doesn't. Building or changing UI, picking a component, touching product data, laying out a page — worth a call. Renaming a local variable or fixing a comment — not worth a call. It's a reference you can pull, not a gate you have to pass.

It's worth re-running on a *new* ask rather than once per session: guidance that was in your context twenty turns ago is no longer steering you, which is the whole reason this command exists.

| Need | Command |
|------|---------|
| Which component or utility does X? | `node scripts/ld/cli.mjs search <keywords>` — ranked over rule sections *and* the catalogue |
| Full API for one thing | `node scripts/ld/cli.mjs show <Name>` |
| One rule section in full | `node scripts/ld/cli.mjs rule <id>` |
| What runtime services exist? | `node scripts/ld/cli.mjs utils` |
| Is any of this wired up? | `node scripts/ld/cli.mjs doctor` |

## Working From Another Directory?

`scripts/ld/cli.mjs` works out its own project root from its own location, so **an absolute path works from anywhere**:

```bash
node <absolute-path-to-this-project>/scripts/ld/cli.mjs context "<ask>"
```

`ld-kit init` printed that absolute path, and every run echoes the resolved project back to you. If your working directory is the parent of this project — common when it was scaffolded into a subfolder — use the absolute form, or `cd` in first. Paths in this file and in the rule files are relative to **this file's location, the project root**.

## Hard Rules — always in force

- **MUST** search before you build. Run `node scripts/ld/cli.mjs search <keywords>` for every UI
  requirement. Fall back to a custom component only once the search turns up
  nothing that fits.
- **NEVER** edit library internals or generated `reference/` documentation — compose the public `@walmart/ld-kit` exports in app-owned source instead.
- **MUST** import Living Design components and patterns from `@walmart/ld-kit` — **NEVER** from `@livingdesign/react` directly, and never via ad-hoc relative paths into a local copy (none exists).
- **NEVER** recreate an existing Living Design component with raw HTML or another UI library.
- **NEVER** hand-write product data (names, SKUs, prices, images). It comes from `ProductService`.
- **MUST** put pages in `src/pages/` and your own components in `src/components/`.
- Set the active theme before rendering anything.

Each of these has a rule file that owns the detail. `node scripts/ld/cli.mjs context` pulls the
relevant slice for you; `node scripts/ld/cli.mjs rule <topic>` pulls the whole topic.

## Verify Your Work

Accessibility rules are binding and **machine-checked**. A runtime scanner covers the app with an unmissable overlay during `npm run dev`, and a Stop hook re-engages you with a fix list. Read `node scripts/ld/cli.mjs rule a11y` before writing UI — it is cheaper than fighting the scanner afterwards.

## The Rule Files

One topic, one owner. `node scripts/ld/cli.mjs context` selects among these for you; pull a whole
one with `node scripts/ld/cli.mjs rule <id>` when you want the topic rather than the slice.

| Rule | Owns |
|------|------|
| `theming` | brand themes, the theme runtime, how to set one |
| `a11y` | accessibility invariants and the verification loop |
| `living-design-guidelines` | choosing a component, where new files go, composition policy |
| `spacing` | layout, breakpoints, `Container`, `Grid`, page rhythm |
| `component-communication` | shared state, cart, header bindings |
| `utilities` | product data, media, illustrations, runtime services |
| `icons` | icon lookup and usage |
| `components-index` | the whole catalogue, for browsing by eye |
| `tokens-reference` | generated token and breakpoint values |

The rule files also sit on disk, for tools that attach them automatically:

The canonical copy lives in `rules/` (`.md` files) at the project root — always visible to any tool. The same content is mirrored into hidden per-tool directories for auto-loading:

| Tool | Rules directory |
|------|----------------|
| Any tool (canonical) | `rules/` (`.md` files) |
| Cursor | `.cursor/rules/` (`.mdc` files) |
| Claude Code | `.claude/rules/` (`.md` files) |
| GitHub Copilot (VS Code) | `.github/instructions/` (`.instructions.md` files) |

The dot-directories are hidden — some tools' file listings and searches omit them entirely. If you cannot see them, read `rules/` at the project root.

## Project Layout

- **Living Design**: installed as `@walmart/ld-kit`. Read-only generated docs in `reference/` — components, patterns, utilities, fonts, data.
- **Your code**: `src/pages/` and `src/components/`. The placement rules are in `node scripts/ld/cli.mjs rule living-design-guidelines`.
- **App entry**: `src/App.tsx` — sets the theme, renders the app.
- **Context engine**: `scripts/ld/` — run it, don't read it.
- **Agent rules**: `rules/` at the project root, mirrored per-tool.

## Tech Stack

- React 18 + TypeScript + Vite, NPM
- UI: Living Design (`@walmart/ld-kit`), installed as a package — no local component copies
- Theming: `@walmart/ld-kit/theming` (called from `src/App.tsx`)

## Development Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview the production build
```
