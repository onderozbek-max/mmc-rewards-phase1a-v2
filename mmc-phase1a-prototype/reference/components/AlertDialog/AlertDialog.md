# AlertDialog

**Import:** `import { AlertDialog } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Confirmation dialog (destructive flows)

## Composition

`AlertDialog` is part of a compound component. Use together with: `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogAction`, `AlertDialogCancel`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `open`: boolean
- `defaultOpen`: boolean
- `onOpenChange`: (open: boolean) => void
- `children`: ReactNode (required)