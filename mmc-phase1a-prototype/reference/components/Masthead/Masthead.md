# Masthead

**Import:** `import { Masthead } from "@walmart/ld-kit"`
**Category:** components
**Intent:** PX top-of-app header bar (logo/name, left/center/right slots, opt-in Bell/Help/Account). For the retail site header, use Header

## Props

- `a11yLabel`: string — Accessible name for the `<header>` landmark.
- `appName`: string — App name shown beside the logo.
- `appLogo`: string | ReactNode — Either an image URL (rendered as `<img>`) or a custom node for the logo slot.
- `appLogoAlt`: string — Alt text used when `appLogo` is a string image URL.
- `leftSlot`: ReactNode — Content rendered at the start of the left group, before the app name/logo.
- `centerSlot`: ReactNode — Content rendered between the left and right groups (e.g. a workspace switcher).
- `rightSlot`: ReactNode — Content rendered at the start of the right group, before the built-in actions (e.g.
- `onNotificationClick`: (event: MouseEvent<HTMLButtonElement>) => void — Fires the notification button.
- `notificationDot`: boolean — Show the small red dot on the notification button.
- `notificationLabel`: string — Accessible name for the notification button.
- `notificationUnreadLabel`: string — Visually-hidden text appended to the notification button when `notificationDot` is true.
- `onHelpClick`: (event: MouseEvent<HTMLButtonElement>) => void — Fires the help button.
- `helpLabel`: string — Accessible name for the help button.
- `onAccountClick`: (event: MouseEvent<HTMLButtonElement>) => void — Fires the account button.
- `accountLabel`: string — Accessible name for the account button.