# AgentChatSidebarTextItem

**Import:** `import { AgentChatSidebarTextItem } from "@walmart/ld-kit"`
**Category:** patterns

## Composition

`AgentChatSidebarTextItem` is part of a compound component. Use together with: `AgentChatSidebarSeparator`, `AgentChatSidebarProvider`, `AgentChatSidebar`, `AgentChatSidebarTrigger`, `AgentChatSidebarLockToggle`, `AgentChatSidebarHeader`, `AgentChatSidebarContent`, `AgentChatSidebarItem`, `AgentChatSidebarSection`, `AgentChatSidebarSegment`, `AgentChatSidebarFooter`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `children`: string (required)
- `href`: string
- `isCurrent`: boolean
- `onRename`: (next: string) => void — When set, clicking the label renames it inline; called on commit.
- `overflow`: AgentChatSidebarOverflowItem[] — Items for a trailing "…" overflow menu.
- `isPinned`: boolean — Marks the chat as pinned.
- `pinIcon`: "bookmark" | "pin" — Glyph used for the pinned indicator (only meaningful when `isPinned`). - `'bookmark'` (default) —...
- `onPinToggle`: (nextPinned: boolean) => void — Called when the user toggles the pinned state via the overflow menu.
- `pinnedLabel`: string — Overrides the visually-hidden "Pinned chat" suffix announced as part of the label's accessible na...
- `onClick`: (event: MouseEvent<HTMLElement>) => void
- `target`: string