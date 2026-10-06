# Form

**Import:** `import { Form } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Form wrapper

## Composition

`Form` is part of a compound component. Use together with: `FormField`, `FormItem`, `SharedFormLabel`, `FormControl`, `FormDescription`, `FormMessage`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `children`: ReactNode (required)
- `onSubmit`: (values: Record<string, string>, event: FormEvent<HTMLFormElement>) => void