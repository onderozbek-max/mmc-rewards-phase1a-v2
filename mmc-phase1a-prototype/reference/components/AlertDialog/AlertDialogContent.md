# AlertDialogContent

**Import:** `import { AlertDialogContent } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Confirmation dialog (destructive flows)

## Composition

`AlertDialogContent` is part of a compound component. Use together with: `AlertDialog`, `AlertDialogTrigger`, `AlertDialogAction`, `AlertDialogCancel`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `children`: ReactNode (required) — The body content for the alert dialog.
- `title`: ReactNode (required) — The title for the alert dialog.
- `actions`: ReactNode — The actions (buttons) rendered in the footer area.
- `size`: ModalSize — The size for the alert dialog.