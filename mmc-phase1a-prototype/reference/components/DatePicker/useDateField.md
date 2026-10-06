# useDateField

**Import:** `import { useDateField } from "@walmart/ld-kit"`
**Category:** components · React hook
**Intent:** Calendar-style date selector

## Signature

```ts
useDateField(options: DateFieldOptions)
```

## Related hooks

From the same module (`@walmart/ld-kit`): `useCalendar`, `useCalendarDayUtilities`, `useLocale`, `useLocalizedFormatters`.

## Options

- `format`: string (required)
- `onSelect`: (value: Date) => void
- `renderError`: (error: DateFieldError, value: string) => string (required)
- `setError`: Dispatch<SetStateAction<string>> (required)
- `disabledDateFilter`: DatePickerDisabledDateFilterSignature — The filter function to indicate disabled dates in the date picker.
- `maxDate`: Date — The maximum selectable date in the date picker.
- `minDate`: Date — The minimum selectable date in the date picker.
