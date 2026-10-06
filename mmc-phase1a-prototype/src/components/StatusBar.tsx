import * as React from "react";
import { Icon, VisuallyHidden } from "@walmart/ld-kit";

/**
 * Decorative iOS-style status bar so the phone frame reads as a device
 * screen rather than a bare web page — purely cosmetic chrome, not part of
 * the Community Home information architecture. Signal/battery are drawn
 * with plain CSS shapes (never unicode glyphs — see rules/icons.md#rules).
 */
export function StatusBar({ time = "10:42" }: { time?: string }) {
  return (
    <div className="phase1a-status-bar">
      <VisuallyHidden>Status bar: {time}, full signal, Wi-Fi connected, battery charged</VisuallyHidden>
      <span aria-hidden="true">{time}</span>
      <span aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 10 }}>
          {[4, 6, 8, 10].map((barHeight, index) => (
            <span
              key={index}
              style={{
                width: 3,
                height: barHeight,
                borderRadius: 1,
                background: "currentColor",
              }}
            />
          ))}
        </span>
        <Icon name="Wifi" decorative size="small" />
        <span
          style={{
            width: 22,
            height: 11,
            border: "1px solid currentColor",
            borderRadius: 2,
            padding: 1,
            display: "inline-flex",
          }}
        >
          <span style={{ background: "currentColor", borderRadius: 1, flex: 1 }} />
        </span>
      </span>
    </div>
  );
}
