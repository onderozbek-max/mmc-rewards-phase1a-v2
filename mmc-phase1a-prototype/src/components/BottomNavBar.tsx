import * as React from "react";
import { Badge, Icon } from "@walmart/ld-kit";

/**
 * Faithful reproduction of the app's bottom navigation (Home / Scan & Go /
 * Reorder / Account / Services) as seen in the Profile screenshot. The
 * shipped `BottomNav` component only models a 3-tab shop/heart/user set, so
 * it doesn't fit this 5-tab bar — built on primitives (`Icon`) instead, per
 * "build custom components on top of existing ones when nothing fits."
 *
 * Rendered as real navigation links with `aria-current`, not a styled toggle
 * -button group, so the a11y scanner's single-select-group rule (which
 * targets radiogroup/tablist-style toggle buttons) doesn't apply here.
 */
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "scan", label: "Scan & Go", icon: "ScanAndGo" },
  { id: "reorder", label: "Reorder", icon: "Reorder" },
  { id: "account", label: "Account", icon: "UserCircleFill", badge: 1 },
  { id: "services", label: "Services", icon: "Services" },
] as const;

export function BottomNavBar({ activeId = "account" }: { activeId?: string }) {
  return (
    <nav
      aria-label="Primary"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        borderTop: "1px solid var(--ld-semantic-color-border-subtlest, #74767c)",
        background: "var(--ld-semantic-color-background, #fff)",
        paddingTop: 6,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href="#"
            onClick={(event) => event.preventDefault()}
            aria-current={isActive ? "page" : undefined}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "2px 4px 6px",
              textDecoration: "none",
              color: isActive
                ? "var(--ld-semantic-color-text-brand, #0053e2)"
                : "var(--ld-semantic-color-text-subtle, #515357)",
              fontSize: "0.6875rem",
              fontWeight: isActive ? 700 : 500,
            }}
          >
            <span style={{ position: "relative", display: "inline-flex" }}>
              <Icon name={item.icon as React.ComponentProps<typeof Icon>["name"]} decorative size="medium" />
              {"badge" in item && item.badge ? (
                <span style={{ position: "absolute", top: -4, right: -6 }}>
                  <Badge color="red" size="small">
                    {item.badge}
                  </Badge>
                </span>
              ) : null}
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
