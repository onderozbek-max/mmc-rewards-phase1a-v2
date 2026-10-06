# SidebarShell

**Import:** `import { SidebarShell } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** App navigation sidebar — composable kit (SidebarProvider + parts) or data-driven SidebarShell with hover-expand, lock, resize

## Composition

`SidebarShell` is part of a compound component. Use together with: `SidebarProvider`, `SidebarTrigger`, `SidebarRail`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `Sidebar`, `SidebarInset`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `activeMenuItem`: string
- `onMenuItemClick`: (itemId: string, route: string) => void
- `menuItems`: SidebarShellMenuItem[] (required)
- `defaultLocked`: boolean
- `expanded`: boolean
- `'aria-label'`: string — Accessible label for the sidebar landmark.